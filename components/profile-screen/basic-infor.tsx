import * as React from 'react'
import { View } from 'react-native'
import { Text } from '../ui/text'
import { Patient } from '../../assets/types/user/patient'
import { Image } from 'expo-image'
import { Phone } from '../../lib/icons/Phone'
import { User } from '../../lib/icons/User'
import { getGenderString } from '../../assets/enum/gender'
import { getAge } from '../../util/getAge'
import { Doctor } from '../../assets/types/user/doctor'
import { formatPhone } from '../../util/format-phone-number'

type Prop = {
    profile: Patient | Doctor
}

export default function BasicInfo({ profile }: Prop) {

    const name = 'fullName' in profile ? profile.fullName : profile.name

    return (
        <View className='flex-row p-3 justify-between items-center'>
            <View className='flex-row gap-4 items-center'>
                <Image
                    style={{ width: 70, height: 70, borderRadius: 1000 }}
                    source={profile.avatar}
                    contentFit='cover'
                />
                <View className='flex-col gap-2'>
                    <Text className='text-xl font-bold tracking-wider'>{name}</Text>
                    <View className='flex-row gap-2 items-center'>
                        <Phone className='text-[--fade-text-color]' size={14} />
                        <Text className='text-base text-[--fade-text-color] tracking-wider capitalize'>{formatPhone(profile.phoneNumber)}</Text>
                    </View>
                    <View className='flex-row gap-2 items-center'>
                        <User className='text-[--fade-text-color]' size={14} />
                        <Text className='text base text-[--fade-text-color] trakcing-wider'>{getGenderString(profile.gender)} • {getAge(profile.dateOfBirth)}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
