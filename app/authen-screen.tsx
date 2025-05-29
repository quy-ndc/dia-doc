import * as React from 'react'
import { View, StyleSheet, Dimensions, Platform, Pressable, ScrollView } from 'react-native'
import { Image } from 'expo-image'
import { Text } from '../components/ui/text'
import Toast from 'react-native-toast-message'
import { CircleAlert } from '../lib/icons/CircleAlert'
import { ArrowRightLeft } from '../lib/icons/ArrowRightLeft'
import { useState } from 'react'
import PatientAuthenModule from '../components/authen-screen/patient-authen-module'
import DoctorAuthenModule from '../components/authen-screen/doctor-authen-module'
import FeatureItem from '../components/authen-screen/feature-item'
import { Bot } from '../lib/icons/Bot'
import { Newspaper } from '../lib/icons/Newspaper'
import { MessageCircleMore } from '../lib/icons/MessageCircleMore'
import { User } from '../lib/icons/User'
// import { ThemeToggle } from '../components/ThemeToggle'

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
    <View
      style={{ paddingTop: 90, paddingBottom: 45 }}
      className="flex-1 justify-between gap-10 px-10"
    >
      <View className='absolute top-[50] left-[20] z-10'>
        <Pressable
          className='flex-row px-5 py-3 gap-3 items-center rounded-md active:bg-[var(--click-bg)]'
          onPress={onInfo}
        >
          <CircleAlert className='text-[var(--info-text)]' size={19} />
          <Text className="text-lg text-[var(--info-text)] font-bold">Lưu ý</Text>
        </Pressable>
        {/* <ThemeToggle /> */}
      </View>

      {/* <View className='absolute top-[50] right-[20] z-10'>
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
      </View> */}

      <View className='flex-col gap-2 items-center'>
        <View className="flex-col gap-2 justify-center items-center">
          <Image
            style={{ width: 100, height: 100 }}
            source={require('../assets/images/logo.png')}
            contentFit="contain"
          />
          <Text className="text-3xl font-bold text-[#248fca] tracking-wider  capitalize">Bác Sĩ Tiểu Đường</Text>
        </View>
        <Text className='text-base font-semibold tracking-wider'>Trợ lý AI cho bệnh nhân tiểu đường</Text>
        <Text className='text-sm text-[--fade-text-color] tracking-wider'>Chăm sóc sức khỏe toàn diện và hiệu quả</Text>
      </View>

      <View className='flex-col gap-4 items-center'>
        <FeatureItem
          icon={<Bot className='text-foreground' size={22} />}
          topText='Tư vấn AI thông minh'
          bottomText='Hỗ trợ 24/7 từ trí tuệ nhân tạo'
        />
        <FeatureItem
          icon={<Newspaper className='text-foreground' size={22} />}
          topText='Bài viết y khoa'
          bottomText='Cập nhật kiến thức sức khỏe mới nhất'
        />
        <FeatureItem
          icon={<MessageCircleMore className='text-foreground' size={22} />}
          topText='Nhóm hỗ trợ'
          bottomText='Tham gia cộng đồng bệnh nhân'
        />
        {/* <FeatureItem
          icon={<User className='text-foreground' size={22} />}
          topText='Hồ sơ cá nhân'
          bottomText='Quản lý thông tin sức khỏe của bạn'
        /> */}
      </View>

      {mode == 'patient' ? (
        <PatientAuthenModule />
      ) : (
        <DoctorAuthenModule />
      )}
    </View>
  )
}