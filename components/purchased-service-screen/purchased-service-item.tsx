import * as React from 'react'
import { Pressable, View } from 'react-native'
import { Text } from '../../components/ui/text'
import { PurchasedServicePackage } from '../../assets/types/consult/consultation'
import Tag from '../common/tag'
import { GlobalColor } from '../../global-color'
import { ChevronRight } from '../../lib/icons/ChevronRight'

type Prop = {
    item: PurchasedServicePackage
}

export default function PurchaseServiceItem({ item }: Prop) {

    return (
        <Pressable className='flex-col py-3 gap-5 items-center w-full bg-[var(--blog-bg)] rounded-lg active:bg-[var(--click-bg)]'>
            <View className='flex-row gap-2 w-full justify-between'>
                <View className='flex-col px-2 gap-3 flex-1'>
                    <Text className='text-base font-medium tracking-wider'>
                        {item.servicePackage.name}
                    </Text>
                    <Text className='text-lg font-semibold tracking-wider text-[var(--fade-text-color)]'>
                        Giá gốc: {item.servicePackage.price}.000đ
                    </Text>
                    <Text className='text-lg font-semibold tracking-wider text-[var(--fade-text-color)]'>
                        Giá đã mua: {item.priceAtPurchased}.000đ
                    </Text>
                </View>
                <View className='flex-shrink-0'>
                    <Tag
                        background={GlobalColor.BLUE_NEON_BG}
                        textColor={GlobalColor.BLUE_NEON_BORDER}
                        text={item.servicePackage.type.name}
                    />
                </View>
            </View>

            <Pressable className='flex-row items-center justify-center gap-2 rounded-full bg-[var(--oppo-theme-col)] px-4 py-2 w-full active:opacity-60'>
                <Text className='text-base text-[var(--same-theme-col)] font-semibold tracking-wider'>Mua lại gói này</Text>
                <ChevronRight className='text-[var(--same-theme-col)]' size={17} />
            </Pressable>
        </Pressable>
    )
}