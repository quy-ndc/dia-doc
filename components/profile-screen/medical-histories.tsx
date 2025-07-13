
import * as React from 'react'
import { View } from 'react-native'
import SectionTitle from '../home/common/section-title'
import { GlobalColor } from '../../global-color'
import { Patient } from '../../assets/types/user/patient'
import { HeartPulse } from '../../lib/icons/HeartPulse'
import { getMedicalHistoriesString } from '../../assets/enum/medical-histories'
import Tag from '../common/tag'

type Prop = {
    profile: Patient
}

export default function MedicalHistories({ profile }: Prop) {

    return (
        <View className='flex-col gap-4 px-2 py-3 bg-[var(--blog-bg)] rounded-lg'>
            <SectionTitle
                icon={<HeartPulse color={GlobalColor.PURPLE_NEON_BORDER} size={17} />}
                title={'Tiền sử bệnh'}
            />
            <View className="flex-row flex-wrap gap-2 w-full">
                {profile.medicalHistories.map((comp, idx) => (
                    <Tag
                        key={idx}
                        background={GlobalColor.PURPLE_NEON_BG}
                        textColor={GlobalColor.PURPLE_NEON_BORDER}
                        text={getMedicalHistoriesString(comp)}
                    />
                ))}
            </View>
        </View>
    )
}
