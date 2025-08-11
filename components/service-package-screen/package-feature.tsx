import * as React from 'react'
import { Pressable, View } from 'react-native'
import { Text } from '../../components/ui/text'
import { PackageFeature } from '../../assets/types/consult/consultation'
import { Check } from '../../lib/icons/Check'
import RoundedIcon from '../common/icons/rouned-icon'
import { GlobalColor } from '../../global-color'
import { getPackageFeatureDisplay } from '../../assets/data/package-feature'

type Prop = {
    item: PackageFeature
}

export default function PackageFeatureItem({ item }: Prop) {

    const label = getPackageFeatureDisplay(item)

    return (
        <View className='flex-row gap-2 items-center'>
            <RoundedIcon
                icon={<Check color={GlobalColor.GREEN_NEON_BORDER} size={14} />}
                background={GlobalColor.GREEN_NEON_BG}
                size={2}
            />
            <Text className='text-sm font-medium tracking-wider'>{label}</Text>
        </View>
    )
}