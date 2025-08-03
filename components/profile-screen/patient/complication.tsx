import * as React from 'react'
import { View } from 'react-native'
import { Text } from '../../ui/text'
import SectionTitle from '../../home/common/section-title'
import { GlobalColor } from '../../../global-color'
import { Patient } from '../../../assets/types/user/patient'
import { TriangleAlert } from '../../../lib/icons/TriangleAlert'
import { getComplicationsString } from '../../../assets/enum/complications'
import Tag from '../../common/tag'

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
                    <Tag
                        key={idx}
                        background={GlobalColor.RED_NEON_BG}
                        textColor={GlobalColor.RED_NEON_BORDER}
                        text={getComplicationsString(comp)}
                    />
                ))}
            </View>
        </View>
    )
}
