import * as React from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { Image } from 'expo-image';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { LogIn } from '~/lib/icons/Login';
import { useRouter } from 'expo-router';


const { height } = Dimensions.get('window');

export default function Screen() {

  const router = useRouter()

  // useEffect(() => {
  //   router.push('/(main)/profile')
  // })

  return (
    <View className='flex-1 justify-between gap-5 p-10'>
      <View className='justify-center items-center'>
        <Image
          style={styles.image}
          source={require('../assets/images/authen_image.png')}
          // placeholder={{ blurhash }}
          contentFit="contain"
          transition={Platform.OS == 'ios' ? 1000 : 3000}
        />
        <Text className='text-3xl font-bold'>Bác Sĩ Tiểu Đường</Text>
      </View>
      <View className='flex justify-between items-center'>
        <Button
          className='flex-row gap-3 items-center'
          style={styles.button}
          variant={'ghost'}
          size={'lg'}
          onPress={() => router.push('/(main)')}
        >
          <LogIn className='text-foreground' size={24} />
          <Text style={styles.text} className='font-bold'>Đăng nhập</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: height * 0.6,
  },
  button: {
    height: 60,
    width: '70%'
  },
  text: {
    fontSize: 19,
  }
});
