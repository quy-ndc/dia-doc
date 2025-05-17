import * as React from 'react';
import { View, StyleSheet, Dimensions, Platform, Pressable, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { Text } from '../components/ui/text';
import Toast from 'react-native-toast-message';
import { CircleAlert } from '../lib/icons/CircleAlert';
import { ArrowRightLeft } from '../lib/icons/ArrowRightLeft';
import { useState } from 'react';
import PatientAuthenModule from '../components/authen-screen/patient-authen-module';
import DoctorAuthenModule from '../components/authen-screen/doctor-authen-module';

const { height } = Dimensions.get('window')

export default function AuthenScreen() {

  const [mode, setMode] = useState<'patient' | 'doctor'>('patient')
  const [notice, setNotice] = useState('Sử dụng lựa chọn thứ 2 nếu bạn không có ứng dụng Zalo hoặc ứng dụng Zalo sai phiên bản')

  const onModeChange = () => {
    mode == 'patient' ? setMode('doctor') : setMode('patient')
    mode == 'patient' ? setNotice('Tài khoản bác sĩ sẽ được cung cấp bởi bệnh viện') : setNotice('Sử dụng lựa chọn thứ 2 nếu bạn không có ứng dụng Zalo hoặc ứng dụng Zalo sai phiên bản')
  }

  const onInfo = () => {
    Toast.show({
      type: 'authInfo',
      text1: notice,
      visibilityTime: 6000
    })
  }

  return (
    <ScrollView>
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

        <View className='absolute top-[50] right-[20] z-10'>
          <Pressable
            className='flex-row px-5 py-3 gap-3 items-center rounded-md active:bg-[var(--click-bg)]'
            onPress={onModeChange}
          >
            {mode == 'doctor' ? (
              <Text className="text-lg font-bold capitalize">Bác Sĩ</Text>
            ) : (
              <Text className="text-lg font-bold capitalize">Bệnh Nhân</Text>
            )}
            <ArrowRightLeft className='text-foreground' size={20} />
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

        {mode == 'patient' ? (
          <PatientAuthenModule />
        ) : (
          <DoctorAuthenModule />
        )}
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: height * 0.55,
  }
});