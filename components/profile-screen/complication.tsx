import * as React from 'react'
import { View } from 'react-native'
import { Text } from '../ui/text'
import SectionTitle from '../home/common/section-title'
import { GlobalColor } from '../../global-color'
import { Patient } from '../../assets/types/user/patient'
import { TriangleAlert } from '../../lib/icons/TriangleAlert'
import { getComplicationsString } from '../../assets/enum/complications'

type Prop = {
    profile: Patient
}

export default function Complication({ profile }: Prop) {

    return (
        <View className='flex-col items-center gap-3 px-2 py-3 bg-[var(--blog-bg)] rounded-lg'>
            <SectionTitle
                icon={<TriangleAlert color={GlobalColor.RED_NEON_BORDER} size={17} />}
                title={'Biến chứng'}
            />
            <View className="flex-row flex-wrap gap-2 w-full">
                {profile.diabetesCondition.complications.map((comp, idx) => (
                    <Text
                        key={idx}
                        style={{ backgroundColor: GlobalColor.RED_NEON_BG, color: GlobalColor.RED_NEON_BORDER }}
                        className="px-4 py-1 rounded-full text-base font-semibold tracking-wider"
                    >
                        {getComplicationsString(comp)}
                    </Text>
                ))}
            </View>
        </View>
    )
}
