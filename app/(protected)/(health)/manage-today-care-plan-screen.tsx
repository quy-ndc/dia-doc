import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useUserHealthCarePlan } from '../../../service/query/user-query'
import { Pressable, RefreshControl, ScrollView, View } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { useCallback, useState } from 'react'
import HealthcarePlanSkeleton from '../../../components/common/skeleton/healthcare-plan-skeleton'
import ErrorDisplay from '../../../components/common/error-display'
import { HealthCarePlan } from '../../../assets/types/user/healthcare-plan'
import HealthcarePlanItem from '../../../components/home/healthcare-plan/healthcare-plan-item'
import { GlobalColor } from '../../../global-color'
import { router } from 'expo-router'
import { Plus } from '../../../lib/icons/Plus'
import { Info } from '../../../lib/icons/Info'
import { Text } from '../../../components/ui/text'

export default function ManageTodayCarePlanScreen() {

    const [refreshing, setRefreshing] = useState(false)

    const { data, isLoading, isError, refetch, remove } = useQuery({
        ...useUserHealthCarePlan({}),
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000),
    })

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        remove()
        refetch().finally(() => setRefreshing(false))
    }, [refetch, remove])

    const items: HealthCarePlan[] = data?.data?.data || []

    return (
        <>
            <View className='flex-1 relative p-3'>
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    <View className='w-full flex-col gap-3'>
                        <View
                            style={{ backgroundColor: GlobalColor.BLUE_NEON_BG }}
                            className='flex-col gap-1 p-4 rounded-xl'
                        >
                            <View className='flex-row gap-2 items-center'>
                                <Info color={GlobalColor.BLUE_NEON_BORDER} size={17} />
                                <Text
                                    style={{ color: GlobalColor.BLUE_NEON_BORDER }}
                                    className='text-lg font-bold tracking-widest'
                                >
                                    Lưu ý
                                </Text>
                            </View>
                            <Text className='text-base tracking-wider'>
                                Sau khi cập nhật, lịch đo mới sẽ được cập nhật ngay lập tức, bạn có thể tiếp tục theo dõi sức khỏe của mình
                            </Text>
                        </View>
                        {isLoading ? (
                            <HealthcarePlanSkeleton />
                        ) : isError || items.length === 0 ? (
                            <View className='py-10'>
                                <ErrorDisplay
                                    text='Không có lịch chăm sóc sức khỏe'
                                    onRefresh={onRefresh}
                                    refreshing={refreshing}
                                />
                            </View>
                        ) : (
                            <FlashList<HealthCarePlan>
                                data={items}
                                renderItem={({ item }) => (
                                    <HealthcarePlanItem item={item} display='manage' />
                                )}
                                estimatedItemSize={100}
                            />
                        )}
                    </View>
                </ScrollView >
                <Pressable
                    style={{ backgroundColor: GlobalColor.BLUE_NEON_BORDER }}
                    className='flex absolute bottom-5 right-7 p-4 items-center justify-center rounded-full active:opacity-80'
                    onPress={() => router.push('add-edit-today-care-plan-screen')}
                >
                    <Plus className='text-white' size={17} />
                </Pressable>
            </View>
        </>
    )
}