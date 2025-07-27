import * as React from 'react'
import { Dimensions, Pressable, View } from 'react-native'
import { Text } from '../../ui/text'
import { GlobalColor } from '../../../global-color'
import { Calendar } from '../../../lib/icons/Calendar'
import { HealthCarePlan } from '../../../assets/types/user/healthcare-plan'
import { FlashList } from '@shopify/flash-list'
import HealthcarePlanItem from './healthcare-plan-item'
import HealthcarePlanSkeleton from '../../common/skeleton/healthcare-plan-skeleton'
import ErrorDisplay from '../../common/error-display'
import { useCallback, useState } from 'react'
import HealthcarePlanDetailItem from './healthcare-plan-detail-item'
import { PencilLine } from '../../../lib/icons/PencilLine'
import { ArrowRightLeft } from '../../../lib/icons/ArrowRightLeft'
import { router } from 'expo-router'


const { width } = Dimensions.get('window')

type Prop = {
    items: HealthCarePlan[]
    isLoading: boolean
    isError: boolean
    refetch: () => void
    remove: () => void
    refreshing: boolean
}

const getClosestFutureItem = (items: HealthCarePlan[]): HealthCarePlan | null => {
    const now = new Date()
    return items
        .filter(item => new Date(item.scheduledAt) > now)
        .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())[0] || null
}

export default function HealthcarePlan({ items, isLoading, isError, refetch, remove, refreshing }: Prop) {

    const [value, setValue] = useState<'detail' | 'list'>('detail')

    const onRefresh = useCallback(() => {
        remove()
        refetch()
    }, [refetch])

    const nextItem = getClosestFutureItem(items)

    return (
        <View
            style={{ width: width * 0.95 }}
            className='flex-col items-center'
        >
            <View className="flex-row w-full px-2 justify-between items-center">
                <View className='flex-row gap-3 items-center text-center'>
                    <Calendar color={GlobalColor.PURPLE_NEON_BORDER} size={18} />
                    <Text className='text-lg mb-1 font-bold tracking-widest capitalize'>Lịch chăm sóc sức khỏe</Text>
                </View>
                <View className='flex-row gap-2 items-center rounded-lg'>
                    <Pressable
                        className={`p-2 rounded-full active:bg-[var(--click-bg)]`}
                        onPress={() => setValue(value == 'detail' ? 'list' : 'detail')}
                    >
                        <ArrowRightLeft className='text-foreground' size={17} />
                    </Pressable>
                    <Pressable
                        className={`p-2 rounded-full active:bg-[var(--click-bg)]`}
                        onPress={() => { router.push('manage-care-plan-screen') }}
                    >
                        <PencilLine color={GlobalColor.BLUE_NEON_BORDER} size={17} />
                    </Pressable>
                </View>
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
                <>
                    <HealthcarePlanDetailItem
                        item={nextItem || undefined}
                        hidden={value === 'list'}
                    />
                    <View className={`w-full px-1 ${value === 'detail' ? 'hidden' : ''}`}>
                        <FlashList<HealthCarePlan>
                            data={items}
                            renderItem={({ item }) => (
                                <HealthcarePlanItem item={item} />
                            )}
                            estimatedItemSize={100}
                        />
                    </View>
                </>
            )}
        </View>
    )
}
