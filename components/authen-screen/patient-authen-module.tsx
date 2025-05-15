import * as React from 'react'
import { Dimensions, Pressable, View, StyleSheet } from 'react-native'
import { Text } from '../ui/text'
import { Button } from '../ui/button'
import { LogIn } from '../../lib/icons/Login'
import { useRouter } from 'expo-router'
import ZaloKit, { Constants } from 'react-native-zalo-kit'
import SpinningIcon from '../common/icons/spinning-icon'
import { Loader } from '../../lib/icons/Loader'
import { useEffect, useState } from 'react'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useLoginPatientMutation } from '../../service/query/auth-query'
import { User } from '../../assets/types/zustand/user-z'
import useUserStore from '../../store/userStore'

const { width } = Dimensions.get('window')

export default function PatientAuthenModule() {

    const router = useRouter()
    const { user, setUser } = useUserStore()

    console.log(user)

    const {
        mutateAsync,
        data,
        isLoading,
        isSuccess,
        isError
    } = useLoginPatientMutation()

    const [loginTrigger, setLoginTrigger] = useState(false)

    const zaloLogin = async () => {
        try {
            ZaloKit.logout()
            const code = await ZaloKit.login(Constants.AUTH_VIA_APP)
            if (code.accessToken) {
                const profile = await ZaloKit.getUserProfile()
                if (profile && profile.id) {
                    setLoginTrigger(true)
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
                    setLoginTrigger(true)
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
        if (!isSuccess || !data) return

        const result = data.data.value.data
        const userData: User = {
            isAuthenticated: true,
            isSetUp: !result.authUser.isFirstUpdate,
            accessToken: result.authToken.accessToken || '',
            refreshToken: result.authToken.refreshToken || '',
            id: result.authUser.id || '',
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
            router.replace('/(main)')
        } else {
            router.replace('/set-up-screen')
        }

        Toast.show({
            type: 'success',
            text1: 'Đăng nhập thành công',
            visibilityTime: 2000
        })
    }, [isSuccess])

    useEffect(() => {
        if (!isError || !loginTrigger) return

        Toast.show({
            type: 'error',
            text1: 'Đăng nhập thất bại',
            visibilityTime: 2000
        })

        setLoginTrigger(false)
    }, [isError])

    return (
        <View className="flex gap-3 items-center">
            <Button
                className="flex-row gap-3 items-center"
                style={styles.button}
                variant="ghost"
                size="lg"
                disabled={isLoading}
                onPress={zaloLogin}
            >
                {isLoading ? (
                    <SpinningIcon icon={<Loader className="text-foreground" size={20} />} />
                ) : (
                    <LogIn className="text-foreground" size={20} />
                )}
                <Text className="text-lg font-bold">Đăng nhập bằng Zalo qua ứng dụng</Text>
            </Button>

            <Button
                className="flex-row gap-3 items-center"
                style={styles.button}
                variant="ghost"
                size="lg"
                disabled={isLoading}
                onPress={zaloLoginWeb}
            >
                {isLoading ? (
                    <SpinningIcon icon={<Loader className="text-foreground" size={20} />} />
                ) : (
                    <LogIn className="text-foreground" size={20} />
                )}
                <Text className="font-bold">Đăng nhập bằng Zalo qua trình duyệt</Text>
            </Button>
            {/* 
            <Pressable onPress={() => router.push('/set-up-screen')}>
                <Text>set up</Text>
            </Pressable>
            <Pressable onPress={() => router.push('/(main)')}>
                <Text>home</Text>
            </Pressable> */}
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: width * 0.9
    }
})
