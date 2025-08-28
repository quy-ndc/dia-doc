import * as React from 'react'
import { Dimensions, Pressable, View } from "react-native"
import SectionTitle from "../common/section-title"
import { GlobalColor } from "../../../global-color"
import { useCallback } from 'react'
import { HandCoins } from '../../../lib/icons/HandCoins'
import { Text } from '../../../components/ui/text'
import { formatPrice } from '../../../util/format-price'
import { router } from 'expo-router'
import HealthcarePlanSkeleton from '../../common/skeleton/healthcare-plan-skeleton'
import ErrorDisplay from '../../common/error-display'

const { width } = Dimensions.get('window')

type Prop = {
    sum: number
    isLoading: boolean
    isError: boolean
    refetch: () => void
    remove: () => void
    refreshing: boolean
}

export default function DoctorIncome({ sum, isLoading, isError, refetch, remove, refreshing }: Prop) {

    const onRefresh = useCallback(() => {
        remove()
        refetch()
    }, [refetch])

    return (
        <View
            style={{ width: width * 0.95 }}
            className='flex-col gap-2 pt-2 rounded-xl'
        >
            <SectionTitle
                icon={<HandCoins color={GlobalColor.GREEN_NEON_BORDER} size={18} />}
                title='Thu nhập'
            />
            {isLoading ? (
                <HealthcarePlanSkeleton />
            ) : isError ? (
                <ErrorDisplay
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                    text='Không thể tải lịch sử thu nhập'
                />
            ) : (
                <>
                    <View className='flex-col gap-2 px-1 w-full items-center'>
                        <Text
                            style={{ color: GlobalColor.GREEN_NEON_BORDER }}
                            className='text-2xl font-bold tracking-widest'
                        >
                            {formatPrice(sum)}₫
                        </Text>
                        <Text className='text-sm text-[var(--fade-text-color)] font-medium tracking-widest'>Tổng thu nhập</Text>
                    </View>
                    <Pressable
                        className='flex-row items-center justify-center px-4 py-3 rounded-full bg-[var(--oppo-theme-col)] w-full active:opacity-80'
                        onPress={() => router.push('/income-history-screen')}
                    >
                        <Text className='text-base font-medium tracking-widest text-[var(--same-theme-col)]'>Xem chi tiết</Text>
                    </Pressable>
                </>
            )}
        </View>
    )
}
