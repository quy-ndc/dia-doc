import * as React from 'react';
import { View, StyleSheet, Dimensions, Platform, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Button } from '../components/ui/button';
import { Text } from '../components/ui/text';
import { LogIn } from '../lib/icons/Login';
import { useRouter } from 'expo-router';
import ZaloKit, { Constants } from 'react-native-zalo-kit';
import Toast from 'react-native-toast-message';
import { CircleAlert } from '../lib/icons/CircleAlert';

const { width, height } = Dimensions.get('window');

export default function Screen() {

  const router = useRouter();

  const onInfo = () => {
    Toast.show({
      type: 'authInfo',
      text1: 'Sử dụng lựa chọn thứ 2 nếu bạn không có ứng dụng Zalo hoặc ứng dụng Zalo sai phiên bản',
      visibilityTime: 6000
    })
  }


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
    <View className="flex-1 justify-center gap-10 p-10">

      <View className='absolute top-[50] left-[20] z-10'>
        <Pressable
          className='flex-row px-5 py-3 gap-3 items-center rounded-md active:bg-[var(--click-bg)]'
          onPress={onInfo}
        >
          <CircleAlert className='text-[var(--info-text)]' size={19} />
          <Text className="text-lg text-[var(--info-text)] font-bold">Lưu ý</Text>
        </Pressable>
      </View>

      <View className="justify-center items-center">
        <Image
          style={styles.image}
          source={require('../assets/images/authen_image.png')}
          contentFit="contain"
          transition={Platform.OS === 'ios' ? 1000 : 2000}
        />
        <Text className="text-3xl font-bold">Bác Sĩ Tiểu Đường</Text>
      </View>

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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: height * 0.6,
  },
  button: {
    height: 50,
    width: width * 0.9,
  },
});
