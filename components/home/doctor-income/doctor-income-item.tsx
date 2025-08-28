import * as React from 'react'
import { Dimensions, View } from 'react-native'
import { Text } from '../../ui/text'
import { GlobalColor } from '../../../global-color'
import { IncomeHistory } from '../../../assets/types/user/doctor'
import { formatPrice } from '../../../util/format-price'
import { formatDateBlog } from '../../../util/format-date-post'

type Prop = {
    item: IncomeHistory
    prev?: number
}

export default function DoctorIncomeItem({ item, prev }: Prop) {
    const calculatePercentageChange = () => {
        if (!prev) return null;
        const change = ((item.balanceAfterTransaction - prev) / prev) * 100;
        return change.toFixed(2);
    }

    const percentageChange = calculatePercentageChange();

    return (
        <View className='flex-row justify-between items-center p-2 my-1 rounded-xl bg-[var(--blog-bg)]'>
            <View className='flex-col gap-2'>
                <Text className='text-base font-medium tracking-wider'>
                    {formatDateBlog(item.createdDate)}
                </Text>
                <Text
                    style={{ color: item.direction == 1 ? GlobalColor.GREEN_NEON_BORDER : GlobalColor.RED_NEON_BORDER }}
                    className='text-sm font-bold'
                >
                    {`${item.direction == 1 ? '+' : '-'} ${formatPrice(item.amount)}₫`}
                </Text>
            </View>

            <View className='flex-col gap-2'>
                <Text className='text-base font-medium tracking-wider'>
                    {formatPrice(item.balanceAfterTransaction)}₫
                </Text>
                {percentageChange && (
                    <Text 
                        style={{ color: Number(percentageChange) >= 0 ? GlobalColor.GREEN_NEON_BORDER : GlobalColor.RED_NEON_BORDER }}
                        className='text-xs font-medium text-right'
                    >
                        {Number(percentageChange) >= 0 ? '▲' : '▼'} {Math.abs(Number(percentageChange))}%
                    </Text>
                )}
            </View>
        </View>
    )
}
