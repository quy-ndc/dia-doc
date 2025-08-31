import * as React from 'react'
import { View } from 'react-native'
import { Text } from '../../../components/ui/text'
import { PurchasedServicePackage } from '../../../assets/types/consult/consultation'
import { formatDate } from '../../../util/format-date'
import { Calendar } from '../../../lib/icons/Calendar'
import { Clock } from '../../../lib/icons/Clock'
import { GlobalColor } from '../../../global-color'

type Prop = {
    item: PurchasedServicePackage
}

export default function AvailableServiceItem({ item }: Prop) {

    return (
        <View className='flex-col px-1 gap-5 items-center w-full rounded-lg'>
            <View className='flex-row gap-2 w-full justify-between'>
                <View className='flex-col px-2 gap-4 flex-1'>
                    <Text className='text-lg font-semibold tracking-wider'>
                        {item.packageName} - &nbsp;
                        <Text className='text-base font-semibold tracking-wider text-[var(--fade-text-color)]'>
                            {`Còn ${item.remainingSessions}/${item.totalSessions} lượt`}
                        </Text>
                    </Text>
                    <View
                        style={{ height: 12 }}
                        className='w-full bg-[var(--input-bg)] rounded-full overflow-hidden'
                    >
                        <View
                            className='h-full bg-[var(--oppo-theme-col)] rounded-full'
                            style={{ width: `${(item.remainingSessions / item.totalSessions) * 100}%` }}
                        />
                    </View>
                    <View className='flex-row justify-between items-center'>
                        <View className='flex-row items-center gap-4'>
                            <Calendar color={GlobalColor.BLUE_NEON_BORDER} size={17} />
                            <View className='flex-col gap-1'>
                                <Text className='text-sm font-medium traking-wider text-[var(--fade-text-color)]'>Ngày mua</Text>
                                <Text className='text-base font-semibold traking-wider'>{formatDate(item.purchasedDate)}</Text>
                            </View>
                        </View>
                        <View className='flex-row items-center gap-4'>
                            <Clock color={GlobalColor.RED_NEON_BORDER} size={17} />
                            <View className='flex-col gap-1'>
                                <Text className='text-sm font-medium traking-wider text-[var(--fade-text-color)]'>Ngày hết hạn</Text>
                                <Text className='text-base font-semibold traking-wider'>{formatDate(item.expireDate)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}