
import * as React from 'react'
import { View } from 'react-native'
import { Text } from '../ui/text'
import SectionTitle from '../home/common/section-title'
import { GlobalColor } from '../../global-color'
import { Patient } from '../../assets/types/user/patient'
import { HeartPulse } from '../../lib/icons/HeartPulse'
import { getMedicalHistoriesString } from '../../assets/enum/medical-histories'

type Prop = {
    profile: Patient
}

export default function MedicalHistories({ profile }: Prop) {

    return (
        <View className='flex-col gap-4 p-2 bg-[var(--blog-bg)] rounded-lg'>
            <SectionTitle
                icon={<HeartPulse color={GlobalColor.PURPLE_NEON_BORDER} size={17} />}
                title={'Tiền sử bệnh'}
            />
            <View className="flex-row flex-wrap gap-2 w-full">
                {profile.medicalHistories.map((comp, idx) => (
                    <Text
                        key={idx}
                        style={{ backgroundColor: GlobalColor.PURPLE_NEON_BG, color: GlobalColor.PURPLE_NEON_BORDER }}
                        className="px-4 py-1 rounded-full text-base font-semibold tracking-wider"
                    >
                        {getMedicalHistoriesString(comp)}
                    </Text>
                ))}
            </View>
        </View>
    )
}
