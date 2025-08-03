
import * as React from 'react'
import { View } from 'react-native'
import SectionTitle from '../../home/common/section-title'
import { GlobalColor } from '../../../global-color'
import { Doctor } from '../../../assets/types/user/doctor'
import { Hospital } from '../../../lib/icons/Hospital'
import { ImageBackground } from 'expo-image'
import RoundedIcon from '../../common/icons/rouned-icon'
import { BriefcaseBusiness } from '../../../lib/icons/BriefcaseBusiness'
import { Text } from '../../../components/ui/text'
import { Phone } from '../../../lib/icons/Phone'
import { formatPhone } from '../../../util/format-phone-number'

type Prop = {
    profile: Doctor
}

export default function HospitalInfo({ profile }: Prop) {

    return (
        <View className='flex-col gap-4 px-2 py-3 rounded-lg'>
            <SectionTitle
                icon={<BriefcaseBusiness color={GlobalColor.BLUE_NEON_BORDER} size={17} />}
                title={'Nơi công tác'}
            />
            <ImageBackground
                source={{ uri: profile.hospital.thumbnail }}
                style={{ width: '100%', minHeight: 180 }}
                imageStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                contentFit='cover'
            />
            <View className='flex-row gap-2 items-center'>
                <RoundedIcon
                    background={GlobalColor.ORANGE_NEON_BG}
                    size={3}
                    icon={<Hospital color={GlobalColor.ORANGE_NEON_BORDER} size={17} />}
                />
                <View className='flex-col gap-1'>
                    <Text className='text-base font-medium tracking-wider'>{profile.hospital.name}</Text>
                    <Text className='text-sm text-[var(--fade-text-color)] tracking-wider'>Tên nơi công tác</Text>
                </View>
            </View>
            <View className='flex-row gap-2 items-center'>
                <RoundedIcon
                    background={GlobalColor.GREEN_NEON_BG}
                    size={3}
                    icon={<Phone color={GlobalColor.GREEN_NEON_BORDER} size={17} />}
                />
                <View className='flex-col gap-1'>
                    <Text className='text-base font-medium tracking-wider'>{formatPhone(profile.hospital.phoneNumber)}</Text>
                    <Text className='text-sm text-[var(--fade-text-color)] tracking-wider'>Hotline bệnh viện</Text>
                </View>
            </View>
        </View>
    )
}
