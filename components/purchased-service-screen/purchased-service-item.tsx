import * as React from 'react'
import { Pressable, View } from 'react-native'
import { Text } from '../../components/ui/text'
import { formatPrice } from '../../util/format-price'
import PurchaseConfirmationModal from '../service-package-screen/purchase-confirmation'
import { PurchasedServicePackage } from '../../assets/types/consult/consultation'
import { GlobalColor } from '../../global-color'
import Tag from '../common/tag'
import { formatDate } from '../../util/format-date'

type Prop = {
    item: PurchasedServicePackage
}

export default function PurchaseServiceItem({ item }: Prop) {

    return (
        <Pressable className='flex-col py-3 gap-5 items-center w-full bg-[var(--blog-bg)] rounded-lg active:bg-[var(--click-bg)]'>
            <View className='flex-row gap-2 w-full justify-between'>
                <View className='flex-col px-2 gap-3 flex-1'>
                    <Text className='text-base font-medium tracking-wider'>
                        {item.packageName}
                    </Text>
                    <Text className='text-lg font-semibold tracking-wider text-[var(--fade-text-color)]'>
                        Giá mua: {formatPrice(item.priceAtPurchased)}đ
                    </Text>
                    <Text
                        style={{ color: GlobalColor.BLUE_NEON_BORDER }}
                        className='text-lg font-semibold tracking-wider text-[var(--fade-text-color)]'
                    >
                        {`Còn ${item.remainingSessions}/${item.totalSessions} lượt`}
                    </Text>
                    <View className='self-start'>
                        <Tag
                            background={GlobalColor.BLUE_NEON_BG}
                            text={`Mua vào ${formatDate(item.purchasedDate)}`}
                            textColor={GlobalColor.BLUE_NEON_BORDER}
                        />
                    </View>
                </View>
            </View>
            <PurchaseConfirmationModal id={item.id} />
        </Pressable>
    )
}