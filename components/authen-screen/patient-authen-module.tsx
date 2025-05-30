import * as React from 'react'
import { Dimensions, Pressable, View, StyleSheet } from 'react-native'
import { Text } from '../ui/text'
import { useRouter } from 'expo-router'
import ZaloKit, { Constants } from 'react-native-zalo-kit'
import SpinningIcon from '../common/icons/spinning-icon'
import { Loader } from '../../lib/icons/Loader'
import { useEffect } from 'react'
import { useLoginPatientMutation } from '../../service/query/auth-query'
import { User } from '../../assets/types/zustand/user-z'
import useUserStore from '../../store/userStore'
import { UserRole } from '../../assets/enum/user-role'


const { width } = Dimensions.get('window')

export default function PatientAuthenModule() {
    const router = useRouter()
    const { user, setUser } = useUserStore()

    console.log(user)

    const { mutateAsync, data, isLoading, isSuccess } = useLoginPatientMutation()

    const zaloLogin = async () => {
        try {
            ZaloKit.logout()
            const code = await ZaloKit.login(Constants.AUTH_VIA_APP)
            if (code.accessToken) {
                const profile = await ZaloKit.getUserProfile()
                if (profile && profile.id) {
                    await mutateAsync({
                        zaloIdentityId: profile.id,
                        fullName: profile.name,
                        avatar: profile.picture.data.url
                    })
                }
            }
        } catch (e) {
            console.log('error logging in', e)
        }
    }

    const zaloLoginWeb = async () => {
        try {
            ZaloKit.logout()
            const code = await ZaloKit.login(Constants.AUTH_VIA_WEB)
            if (code.accessToken) {
                const profile = await ZaloKit.getUserProfile()
                if (profile && profile.id) {
                    await mutateAsync({
                        zaloIdentityId: profile.id,
                        fullName: profile.name,
                        avatar: profile.picture.data.url
                    })
                }
            }
        } catch (e) {
            console.log('Zalo login web error:', e)
        }
    }

    useEffect(() => {
        if (!isSuccess || !data || data.status !== 200) {
            return
        }

        const result = data.data.value.data
        const userData: User = {
            isAuthenticated: true,
            isSetUp: !result.authUser.isFirstUpdate,
            accessToken: result.authToken.accessToken || '',
            refreshToken: result.authToken.refreshToken || '',
            id: result.authUser.id || '',
            role: UserRole.PATIENT,
            fullname: result.authUser.fullName || '',
            avatar: result.authUser.avatarUrl || '',
            phone: '',
            blood: 0,
            diaType: 0,
            gender: 0,
            bod: '',
            weight: 0,
            height: 0
        }

        setUser(userData)

        if (userData.isSetUp) {
            router.replace('/(protected)/(main)')
        } else {
            router.replace('/set-up-screen')
        }
    }, [isSuccess])

    return (
        <View className="flex gap-4 items-center">
            <Pressable
                style={[
                    { width: width * 0.85 },
                    { opacity: isLoading ? 0.5 : 1 }
                ]}
                className="flex-row gap-2 px-4 py-3 justify-center items-center bg-[var(--oppo-theme-col)] border border-[var(--same-theme-col)] rounded-full active:bg-[var(--oppo-click-bg)]"
                disabled={isLoading}
                onPress={zaloLogin}
            >
                <SpinningIcon icon={<Loader className={`text-foreground ${isLoading ? '' : 'hidden'}`} size={19} />} />
                <Text className="text-base text-[var(--same-theme-col)] font-semibold tracking-wider">Tiếp tục với Zalo App</Text>
            </Pressable>
            <Pressable
                style={[
                    { width: width * 0.85 },
                    { opacity: isLoading ? 0.5 : 1 }
                ]}
                className="flex-row gap-2 px-4 py-3 justify-center items-center border border-[var(--oppo-theme-col)] rounded-full active:bg-[var(--click-bg)]"
                disabled={isLoading}
                onPress={zaloLoginWeb}
            >
                <SpinningIcon icon={<Loader className={`text-foreground ${isLoading ? '' : 'hidden'}`} size={19} />} />
                <Text className="text-base font-semibold tracking-wider">Tiếp tục với Zalo trên Web</Text>
            </Pressable>

            {/* <Pressable onPress={() => router.push('/set-up-screen')}>
                <Text>set up</Text>
            </Pressable>
            <Pressable onPress={() => router.push('/(protected)/(main)')}>
                <Text>home</Text>
            </Pressable> */}
        </View>
    )
}