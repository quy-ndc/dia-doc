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
import { Clock } from '../../../lib/icons/Clock'
import IconButton from '../../common/icon-button'
import DoctorFilter from './doctor-filter'
import { User } from '../../../lib/icons/User'
import Tag from '../../common/tag'


const { width } = Dimensions.get('window')

type Prop = {
    items: HealthCarePlan[]
    isLoading: boolean
    isError: boolean
    refetch: () => void
    remove: () => void
    refreshing: boolean
    doctor: {
        id: string,
        name: string
    } | undefined
    setDoctor: (doctor: {
        id: string,
        name: string
    } | undefined) => void
}

const getClosestFutureItem = (items: HealthCarePlan[]): HealthCarePlan | null => {
    const now = new Date()
    return items
        .filter(item => new Date(item.scheduledAt) > now)
        .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())[0] || null
}

export default function HealthcarePlan({ items, isLoading, isError, refetch, remove, refreshing, doctor, setDoctor }: Prop) {

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
                    <IconButton
                        icon={<ArrowRightLeft className='text-foreground' size={17} />}
                        buttonSize={2}
                        possition={'other'}
                        onPress={() => setValue(value == 'detail' ? 'list' : 'detail')}
                    />
                    <DoctorFilter doctor={doctor} setDoctor={setDoctor} />
                </View>
            </View>

            {isLoading ? (
                <HealthcarePlanSkeleton />
            ) : isError || items.length === 0 ? (
                <View className='py-4'>
                    <ErrorDisplay
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                        text='Không thể lấy lịch đo'
                    />
                </View>
            ) : (
                <>
                    {(doctor && value === 'detail') && (
                        <View className='flex-row justify-between items-center w-full px-2'>
                            <Text
                                style={{ backgroundColor: GlobalColor.BLUE_NEON_BG, color: GlobalColor.BLUE_NEON_BORDER }}
                                className={`px-4 py-1 rounded-full text-sm font-semibold tracking-wider`}
                            >
                                {`Lịch của BS.${doctor.name}`}
                            </Text>
                        </View>
                    )}
                    <HealthcarePlanDetailItem
                        item={nextItem || undefined}
                        hidden={value === 'list'}
                    />
                    <View className='flex-col gap-3 py-3 w-full items-center'>
                        <Pressable
                            className='flex-row gap-2 items-center justify-center px-4 py-3 rounded-full border border-[var(--oppo-theme-col)] w-full active:bg-[var(--click-bg)]'
                            onPress={() => router.push('manage-today-care-plan-screen')}
                        >
                            <Clock className='text-[var(--oppo-theme-col)]' size={17} />
                            <Text className='text-sm font-medium tracking-widest'>Sửa lịch ngày hôm nay</Text>
                        </Pressable>

                        <Pressable
                            className='flex-row gap-2 items-center justify-center px-4 py-3 rounded-full bg-[var(--oppo-theme-col)] w-full active:opacity-80'
                            onPress={() => router.push('manage-care-plan-screen')}
                        >
                            <Calendar className='text-[var(--same-theme-col)]' size={17} />
                            <Text className='text-sm font-medium tracking-widest text-[var(--same-theme-col)]'>Sửa lịch cho mọi ngày</Text>
                        </Pressable>
                    </View>
                    {(doctor && value === 'list') && (
                        <View className='flex-row justify-between items-center w-full px-2'>
                            <Text
                                style={{ backgroundColor: GlobalColor.BLUE_NEON_BG, color: GlobalColor.BLUE_NEON_BORDER }}
                                className={`px-4 py-1 rounded-full text-sm font-semibold tracking-wider`}
                            >
                                {`Lịch của BS.${doctor.name}`}
                            </Text>
                        </View>
                    )}
                    <View className={`w-full px-1 ${value === 'detail' ? 'hidden' : ''}`}>
                        <FlashList<HealthCarePlan>
                            data={items}
                            renderItem={({ item }) => (
                                <HealthcarePlanItem item={item} display='view' />
                            )}
                            estimatedItemSize={100}
                        />
                    </View>
                </>
            )
            }
        </View >
    )
}
