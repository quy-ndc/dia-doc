import * as React from 'react';
import { Dimensions, Pressable, View, StyleSheet } from 'react-native';
import { Text } from '../ui/text'
import { Button } from '../ui/button';
import { LogIn } from '../../lib/icons/Login';
import { useRouter } from 'expo-router';
import ZaloKit, { Constants } from 'react-native-zalo-kit';


const { width } = Dimensions.get('window');

export default function PaitientAuthenModule() {

    const router = useRouter();

    const zaloLogin = async () => {
        try {
            const code = await ZaloKit.login(Constants.AUTH_VIA_APP)
            console.log('code', code)
        } catch (e) {
            console.log(e)
        }
    }

    const zaloLoginWeb = async () => {
        try {
            const code = await ZaloKit.login(Constants.AUTH_VIA_WEB)
            console.log('code', code)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View className="flex gap-3 items-center">
            <Button
                className="flex-row gap-3 items-center"
                style={styles.button}
                variant="ghost"
                size="lg"
                onPress={zaloLogin}
            // onPress={() => router.push('/(main)')}
            >
                <LogIn className="text-foreground" size={20} />
                <Text className="text-lg font-bold">Đăng nhập bằng Zalo qua ứng dụng</Text>
            </Button>

            <Button
                className="flex-row gap-3 items-center"
                style={styles.button}
                variant="ghost"
                size="lg"
                onPress={zaloLoginWeb}
            // onPress={() => router.push('/(main)')}
            >
                <LogIn className="text-foreground" size={20} />
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