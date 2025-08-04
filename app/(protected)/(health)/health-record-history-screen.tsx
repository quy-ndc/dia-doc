import * as React from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { Text } from '../../../components/ui/text'
import { useQuery } from '@tanstack/react-query'
import { useUserHealthRecordProfile } from '../../../service/query/user-query'
import { BloodPressureRecord, HealthTrackItem } from '../../../assets/types/user/health-track'
import { Dimensions, Pressable, RefreshControl, ScrollView } from 'react-native'
import { View } from 'react-native'
import { HealthRecordType } from '../../../assets/enum/health-record'
import { getHealthRecordDisplay } from '../../../assets/data/health-record-type'
import { FlashList } from '@shopify/flash-list'
import { useCallback, useState } from 'react'
import HealthRecordHistoryItem from '../../../components/health-record-history-screen/health-history-item'
import ProfileHealthTrackingSkeleton from '../../../components/common/skeleton/profile-health-tracking-skeleton'
import ErrorDisplay from '../../../components/common/error-display'
import IconButton from '../../../components/common/icon-button'
import { PencilLine } from '../../../lib/icons/PencilLine'
import { Plus } from '../../../lib/icons/Plus'

const { height } = Dimensions.get('window')

export default function HealthRecordHistoryScreen() {

    const { type } = useLocalSearchParams()

    const [refreshing, setRefreshing] = useState(false)
    const { data, isLoading, isError, refetch, remove } = useQuery({
        ...useUserHealthRecordProfile({
            recordTypes: type as string,
            newest: true,
            onePerType: false
        }),
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000)
    })

    const recordType = type as unknown as HealthRecordType
    const recordDisplay = getHealthRecordDisplay(recordType)
    const healthRecordItems: HealthTrackItem[] = data?.data?.data || []

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        remove()
        refetch().finally(() => setRefreshing(false))
    }, [refetch, remove])

    const getAverageValue = (items: HealthTrackItem[]) => {
        if (items.length == 0) return 0
        if (items[0].healthRecord == undefined) return 0
        if (recordType == HealthRecordType.BLOOD_PRESSURE) {
            let systolicSum = 0, diastolicSum = 0
            for (const item of items) {
                const record = item.healthRecord as any
                systolicSum += record.systolic
                diastolicSum += record.diastolic
            }
            const avgSystolic = (systolicSum / items.length).toFixed(1)
            const avgDiastolic = (diastolicSum / items.length).toFixed(1)
            return `${avgSystolic} / ${avgDiastolic}`
        } else {
            let sum = 0
            for (const item of items) {
                const record = item.healthRecord as any
                sum += record.value
            }
            return (sum / items.length).toFixed(1)
        }
    }

    const getTotal = () => {
        if (healthRecordItems.length == 0 || healthRecordItems[0].healthRecord == undefined) {
            return 0
        }
        return healthRecordItems.length
    }

    const getValue = () => {
        if (!healthRecordItems[0].healthRecord) return '0'

        if (healthRecordItems[0].recordType === HealthRecordType.BLOOD_PRESSURE) {
            const bpRecord = healthRecordItems[0].healthRecord as BloodPressureRecord
            return bpRecord?.systolic && bpRecord?.diastolic
                ? `${bpRecord.systolic}/${bpRecord.diastolic}`
                : 'N/A'
        }
        return (healthRecordItems[0].healthRecord as any).value ?? 'N/A'
    }

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: () =>
                        <View className={`flex-row gap-4 items-center`}>
                            <View
                                style={{ backgroundColor: recordDisplay.iconColor }}
                                className='p-2 rounded-full'
                            >
                                {recordDisplay.icon}
                            </View>
                            <View className='flex-col1'>
                                <Text className='text-lg font-bold tracking-wider capitalize'>
                                    Tổng quan {recordDisplay.name}
                                </Text>
                                <Text className='text-sm text-[var(--fade-text-color)] tracking-wider'>
                                    Lịch sử đo lường
                                </Text>
                            </View>
                        </View>,
                    headerRight: () =>
                        <IconButton
                            icon={<PencilLine className='text-foreground' size={18} />}
                            buttonSize={3}
                            possition={'other'}
                            onPress={() => {
                                router.push({
                                    pathname: "/update-record-screen",
                                    params: { type: recordType, lastMesurement: getValue() }
                                })
                            }}
                        />
                }}
            />
            <View className='flex-1 w-full pb-5 relative'>
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    <View
                        style={{ minHeight: height * 0.8 }}
                        className='flex-col gap-2'
                    >
                        <View className='flex-col gap-4 px-2 py-4'>
                            <View className='flex-row gap-5 items-center justify-center w-full'>
                                <View className='flex-col gap-2 items-center'>
                                    <Text
                                        style={{ color: recordDisplay.iconColor }}
                                        className='text-2xl font-bold'
                                    >
                                        {getAverageValue(healthRecordItems)}
                                    </Text>
                                    <Text className='text-sm text-[var(--fade-text-color)] tracking-wider'>
                                        {`Trung bình (${recordDisplay.unit})`}
                                    </Text>
                                </View>
                                <View className='flex-col gap-2 items-center'>
                                    <Text className='text-2xl font-bold'>{getTotal()}</Text>
                                    <Text className='text-sm text-[var(--fade-text-color)] tracking-wider'>
                                        Tổng số lần đo
                                    </Text>
                                </View>
                            </View>
                        </View>
                        {isLoading ? (
                            <ProfileHealthTrackingSkeleton />
                        ) : isError || healthRecordItems.length == 0 ? (
                            <ErrorDisplay
                                text={'Không có lịch sử để hiển thị'}
                                onRefresh={onRefresh}
                                refreshing={refreshing}
                            />
                        ) : (
                            <FlashList<HealthTrackItem>
                                data={healthRecordItems}
                                renderItem={({ item, index }) => (
                                    <View className='m-2'>
                                        <HealthRecordHistoryItem
                                            key={index}
                                            item={item}
                                        />
                                    </View>
                                )}
                                estimatedItemSize={10}
                            />
                        )}

                    </View>
                </ScrollView>
                <Pressable
                    style={{ backgroundColor: recordDisplay.iconColor }}
                    className='flex absolute bottom-5 right-7 p-4 items-center justify-center rounded-full active:opacity-80'
                    onPress={() => {
                        router.push({
                            pathname: "/update-record-screen",
                            params: { type: recordType, lastMesurement: getValue() }
                        })
                    }}
                >
                    <Plus className='text-white' size={17} />
                </Pressable>
            </View>
        </>
    )
}