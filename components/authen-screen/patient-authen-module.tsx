import * as React from 'react';
import { Dimensions, Pressable, View, StyleSheet } from 'react-native';
import { Text } from '../ui/text'
import { Button } from '../ui/button';
import { LogIn } from '../../lib/icons/Login';
import { useRouter } from 'expo-router';
import ZaloKit, { Constants } from 'react-native-zalo-kit';
import SpinningIcon from '../common/icons/spinning-icon';
import { Loader } from '../../lib/icons/Loader';
import { useEffect } from 'react';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useLoginPatientMutation } from '../../service/query/auth-query';
import { LoginPatient } from '../../service/api/auth-service';


const { width } = Dimensions.get('window');

export default function PatientAuthenModule() {

    const { mutateAsync, isLoading, isError, data } = useLoginPatientMutation();

    const router = useRouter();

    const zaloLogin = async () => {
        try {
            const code = await ZaloKit.login(Constants.AUTH_VIA_APP)

            if (code.accessToken) {
                const profile = await ZaloKit.getUserProfile();

                if (profile && profile.id) {

                    const response = await mutateAsync({
                        zaloIdentityId: profile.id,
                        fullName: profile.name,
                        avatar: profile.picture.data.url,
                    });
                    // console.log(response) 
                    // router.push('/(main)');
                }
            }

        } catch (e) {
            console.log(e)
        }
    }

    const zaloLoginWeb = async () => {
        try {
            const code = await ZaloKit.login(Constants.AUTH_VIA_WEB);

            if (code.accessToken) {
                const profile = await ZaloKit.getUserProfile();

                if (profile && profile.id) {

                    const response = await mutateAsync({
                        zaloIdentityId: profile.id,
                        fullName: profile.name,
                        avatar: profile.picture.data.url,
                    });
                    console.log(response)
                    // router.push('/(main)');
                }
            }

        } catch (e) {
            console.log('Zalo login error:', e);
        }
    };

    // useEffect(() => {
    //     if (isError) {
    //         Toast.show({
    //             type: 'error',
    //             text1: 'Có lỗi xảy ra khi đăng nhập',
    //             visibilityTime: 2000
    //         })
    //     }
    //     console.log('iserr', isError)
    //     console.log('data', data)
    // }, [isLoading])


    return (
        <View className="flex gap-3 items-center">
            <Button
                className="flex-row gap-3 items-center"
                style={styles.button}
                variant="ghost"
                size="lg"
                disabled={isLoading}
                onPress={zaloLogin}
            // onPress={() => router.push('/(main)')}
            >
                {isLoading ? (
                    <SpinningIcon icon={<Loader className='text-foreground' size={20} />} />
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
            // onPress={() => router.push('/(main)')}
            >
                {isLoading ? (
                    <SpinningIcon icon={<Loader className='text-foreground' size={20} />} />
                ) : (
                    <LogIn className="text-foreground" size={20} />
                )}
                <Text className="font-bold">Đăng nhập bằng Zalo qua trình duyệt</Text>
            </Button>
            <Pressable onPress={() => router.push('/set-up-screen')}>
                <Text>
                    set up
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: width * 0.9,
    },
});