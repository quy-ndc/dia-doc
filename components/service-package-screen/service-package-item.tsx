import * as React from 'react'
import { Pressable, View } from 'react-native'
import { Text } from '../../components/ui/text'
import { ServicePackage } from '../../assets/types/consult/consultation'
import Tag from '../common/tag'
import { GlobalColor } from '../../global-color'
import PackageFeatureItem from './package-feature'
import RoundedIcon from '../common/icons/rouned-icon'
import { Check } from '../../lib/icons/Check'
import { formatPrice } from '../../util/format-price'
import PurchaseConfirmationModal from './purchase-confirmation'

type Prop = {
    item: ServicePackage
}

export default function ServicePackageItem({ item }: Prop) {

    return (
        <View className='flex-col p-3 gap-5 items-center w-full border border-[var(--blog-bg)] rounded-lg'>
            <View className='flex-row gap-2 w-full justify-between'>
                <View className='flex-col px-2 gap-2 flex-1'>
                    <Text className='text-base font-medium tracking-wider'>
                        {item.name}
                    </Text>
                    <Text className='text-xl font-semibold tracking-wider text-[var(--fade-text-color)]'>
                        {formatPrice(item.price)}đ
                    </Text>
                </View>
                <View />
            </View>

            <View className='flex-col gap-2 w-full'>
                <View className='flex-row gap-2 items-center'>
                    <RoundedIcon
                        icon={<Check color={GlobalColor.GREEN_NEON_BORDER} size={14} />}
                        background={GlobalColor.GREEN_NEON_BG}
                        size={2}
                    />
                    <Text className='text-sm font-medium tracking-wider'>{item.sessions} lần tư vấn</Text>
                </View>
                <View className='flex-row gap-2 items-center'>
                    <RoundedIcon
                        icon={<Check color={GlobalColor.GREEN_NEON_BORDER} size={14} />}
                        background={GlobalColor.GREEN_NEON_BG}
                        size={2}
                    />
                    <Text className='text-sm font-medium tracking-wider'>Thời lượng {item.durationInMonths} tháng</Text>
                </View>
                <View className='flex-row gap-2 items-center'>
                    <RoundedIcon
                        icon={<Check color={GlobalColor.GREEN_NEON_BORDER} size={14} />}
                        background={GlobalColor.GREEN_NEON_BG}
                        size={2}
                    />
                    <Text className='text-sm font-medium tracking-wider'>Bác sĩ chuyên nghiệp</Text>
                </View>
                <View className='flex-row gap-2 items-center'>
                    <RoundedIcon
                        icon={<Check color={GlobalColor.GREEN_NEON_BORDER} size={14} />}
                        background={GlobalColor.GREEN_NEON_BG}
                        size={2}
                    />
                    <Text className='text-sm font-medium tracking-wider'>Gọi điện video</Text>
                </View>
            </View>
            <PurchaseConfirmationModal id={item.id} />
        </View>
    )
}