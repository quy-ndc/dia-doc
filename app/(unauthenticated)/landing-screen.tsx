import * as React from 'react'
import { View, Pressable, Dimensions } from 'react-native'
import { Image } from 'expo-image'
import { Text } from '../../components/ui/text'
import Toast from 'react-native-toast-message'
import { CircleAlert } from '../../lib/icons/CircleAlert'
import FeatureItem from '../../components/landing-screen/feature-item'
import { Bot } from '../../lib/icons/Bot'
import { Newspaper } from '../../lib/icons/Newspaper'
import { MessageCircleMore } from '../../lib/icons/MessageCircleMore'
import { ThemeToggle } from '../../components/ThemeToggle'
import { useRouter } from 'expo-router'
import { Phone } from '../../lib/icons/Phone'
import { Smile } from '../../lib/icons/Smile'
import useUserStore from '../../store/userStore'
import SpeechInfoButton from '../../components/common/blog-item/blog-speech-info'
import { GlobalColor } from '../../global-color'

const { width } = Dimensions.get('window')

export default function AuthenScreen() {

  const router = useRouter()
  const { user } = useUserStore()
  console.log(user)

  const onInfo = () => {
    Toast.show({
      type: 'authInfo',
      text1: 'Sử dụng lựa chọn thứ 2 nếu bạn không có ứng dụng Zalo hoặc ứng dụng Zalo sai phiên bản',
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
      </View>

      <View className='absolute top-[50] right-[20] z-10'>
        <ThemeToggle />
        <SpeechInfoButton/>
      </View>

      <View className='flex-col gap-2 items-center'>
        <View className="flex-col gap-2 justify-center items-center">
          <Image
            style={{ width: 100, height: 100 }}
            source={require('../../assets/images/logo.png')}
            contentFit="contain"
          />
          <Text className="text-3xl font-bold text-[#248fca] tracking-wider capitalize">Bác Sĩ Tiểu Đường</Text>
        </View>
        <Text className='text-base font-semibold tracking-wider'>Trợ lý AI cho bệnh nhân tiểu đường</Text>
        <Text className='text-sm text-[--fade-text-color] tracking-wider'>Chăm sóc sức khỏe toàn diện và hiệu quả</Text>
      </View>

      <View className='flex-col gap-4 items-center'>
        <FeatureItem
          icon={<Bot color={GlobalColor.BLUE_NEON_BORDER} size={20} />}
          topText='Tư vấn AI thông minh'
          bottomText='Hỗ trợ 24/7 từ trí tuệ nhân tạo'
        />
        <FeatureItem
          icon={<Newspaper color={GlobalColor.BLUE_NEON_BORDER} size={20} />}
          topText='Bài viết y khoa'
          bottomText='Cập nhật kiến thức sức khỏe mới nhất'
        />
        <FeatureItem
          icon={<MessageCircleMore color={GlobalColor.BLUE_NEON_BORDER} size={20} />}
          topText='Nhóm hỗ trợ'
          bottomText='Tham gia cộng đồng bệnh nhân'
        />
      </View>
      <View className="flex gap-4 items-center">
        <Pressable
          style={{ width: width * 0.85 }}
          className="flex-row gap-2 px-4 py-3 justify-center items-center bg-[var(--oppo-theme-col)] border border-[var(--same-theme-col)] rounded-full active:bg-[var(--oppo-click-bg)]"
          onPress={() => router.push('/authen-screen')}
        >
          <Text className="text-base text-[var(--same-theme-col)] font-semibold tracking-wider">Tiếp tục với số điện thoại</Text>
          <Phone className='text-[var(--same-theme-col)]' size={19} />
        </Pressable>
        <View className='flex-row gap-4 items-center'>
          <View style={{ height: 1 }} className='basis-[30%] bg-[var(--oppo-theme-col)]' />
          <Text className='text-base font-semibold tracking-wider uppercase'>Hoặc</Text>
          <View style={{ height: 1 }} className='basis-[30%] bg-[var(--oppo-theme-col)]' />
        </View>
        <Pressable
          style={{ width: width * 0.85 }}
          className="flex-row gap-2 px-4 py-3 justify-center items-center border border-[var(--oppo-theme-col)] rounded-full active:bg-[var(--click-bg)]"
          onPress={() => router.push('/register-screen')}
        >
          <Smile className='text-foreground' size={19} />
          <Text className="text-base font-semibold tracking-wider">Đăng ký tài khoản mới</Text>
        </Pressable>
      </View>
    </View>
  )
}