import * as React from 'react'
import { Pressable, useColorScheme, View } from "react-native"
import { Text } from "../../components/ui/text"
import { Doctor } from '../../assets/types/user/doctor'
import { Image } from 'expo-image'
import { getYearOfExpDisplay } from '../../assets/data/year-of-exp'
import Tag from '../common/tag'
import { getDoctorRoleString } from '../../assets/enum/doctor-role'
import { GlobalColor } from '../../global-color'
import { GraduationCap } from '../../lib/icons/GraduationCap'
import { Phone } from '../../lib/icons/Phone'
import { Hospital } from '../../lib/icons/Hospital'
import { Stethoscope } from '../../lib/icons/Stethoscope'
import { getGenderString } from '../../assets/enum/gender'
import { Clock } from '../../lib/icons/Clock'
import { formatDate } from '../../util/format-date'
import { router } from 'expo-router'

type Prop = {
    item: Doctor
}

export default function DoctorItem({ item }: Prop) {

    const theme = useColorScheme()

    const expDisplay = getYearOfExpDisplay(item.numberOfExperiences)
    const borderColor = theme == 'dark' ? GlobalColor.HALF_LIGHT_THEME_COL : GlobalColor.HALF_DARK_THEME_COL
    const textColor = theme == 'dark' ? GlobalColor.LIGHT_THEME_COL : GlobalColor.DARK_THEME_COL

    return (
        <Pressable className='flex-col gap-4 bg-[var(--blog-bg)] rounded-xl p-4'>
            <View className='flex-row gap-2'>
                <Image
                    style={{ width: 50, height: 50, borderRadius: 1000 }}
                    source={item.avatar}
                    contentFit='cover'
                />
                <View className='flex-col gap-2'>
                    <Text className='text-lg font-medium capitalize tracking-wider'>
                        {item.name} ({getGenderString(item.gender)})
                    </Text>
                    <View className='flex-row gap-2 items-center'>
                        <Tag
                            background={expDisplay.backgroundColor}
                            textColor={expDisplay.borderColor}
                            text={`${item.numberOfExperiences} năm KN`}
                        />
                        <Tag
                            background={'transparent'}
                            textColor={textColor}
                            text={expDisplay.text}
                            borderColor={borderColor}
                        />
                    </View>
                </View>
            </View>

            <View className='flex-row gap-3 items-center'>
                <GraduationCap className='text-[var(--fade-text-color)]' size={17} />
                <Text className='text-base font-medium text-[var(--fade-text-color)] tracking-wider'>
                    {getDoctorRoleString(item.position)}
                </Text>
            </View>
            <View className='flex-row gap-3 items-center'>
                <Phone className='text-[var(--fade-text-color)]' size={17} />
                <Text className='text-base font-medium text-[var(--fade-text-color)] tracking-wider'>
                    {item.phoneNumber}
                </Text>
            </View>
            <View className='flex-row gap-3 items-center'>
                <Hospital className='text-[var(--fade-text-color)]' size={17} />
                <Text className='text-base font-medium text-[var(--fade-text-color)] tracking-wider'>
                    {item.hospital.name}
                </Text>
            </View>
            <View className='flex-row gap-3 items-center'>
                <Clock className='text-[var(--fade-text-color)]' size={17} />
                <Text className='text-base font-medium text-[var(--fade-text-color)] tracking-wider'>
                    Tham gia vào {formatDate(item.createdDate)}
                </Text>
            </View>
            <Pressable
                className='flex-row items-center justify-center gap-2 px-4 py-2 rounded-full border border-[var(--fade-text-color)] active:bg-[var(--click-bg)]'
                onPress={() => router.push({
                    pathname: '/doctor-schedule-screen',
                    params: {
                        id: item.id,
                        name: item.name
                    }
                })}
            >
                <Stethoscope className='text-foreground' size={17} />
                <Text className='text-base font-medium tracking-wider'>
                    Đặt lịch
                </Text>
            </Pressable>
        </Pressable>
    )
}
