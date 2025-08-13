import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { Pressable, RefreshControl, ScrollView, View } from 'react-native'
import { Text } from '../../../components/ui/text'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { truncateText } from '../../../util/truncate-text'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useCreateBookingMutation, useDoctorScheduleQuery } from '../../../service/query/user-query'
import { FlashList } from '@shopify/flash-list'
import { DoctorSchedule, DoctorScheduleTime } from '../../../assets/types/consult/doctor-schedule'
import DoctorScheduleItem from '../../../components/doctor-schedule-screen/doctor-schedule-item'
import DoctorScheduleSkeleton from '../../../components/common/skeleton/doctor-schedule-skeleton'
import ErrorDisplay from '../../../components/common/error-display'
import ScheduleTimeStamp from '../../../components/doctor-schedule-screen/schedule-time-stamp'
import { Check } from '../../../lib/icons/Check'
import SpinningIcon from '../../../components/common/icons/spinning-icon'
import { Loader } from '../../../lib/icons/Loader'
import { Dimensions } from 'react-native'

const { height } = Dimensions.get('window')

export default function DoctorScheduleScreen() {

    const { id, name } = useLocalSearchParams()
    const [refreshing, setRefreshing] = useState(false)
    const [choosenTimeStamp, setChoosenTimeStamp] = useState('')
    const [choosenTime, setChoosenTime] = useState('')

    const {
        data,
        isError,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
        refetch,
        remove,
        isLoading,
    } = useInfiniteQuery({
        ...useDoctorScheduleQuery({
            doctorId: id as string,
        }),
        getNextPageParam: (lastPage) => {
            const posts = lastPage?.data?.data || undefined
            return posts?.hasNextPage ? posts.nextCursor : undefined
        },
        keepPreviousData: false,
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000)
    })

    const { mutateAsync, data: bookingData, isLoading: bookingLoading } = useCreateBookingMutation()

    const handleBooking = async () => {
        await mutateAsync({
            doctorId: id as string,
            templateId: choosenTime
        })
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        remove()
        refetch().finally(() => setRefreshing(false))
    }, [remove, refetch])

    const allItems: DoctorSchedule[] = data ? data?.pages?.flatMap(page => page.data?.data?.items) : []
    const timeStamp: DoctorScheduleTime[] = allItems.length === 0 || allItems[0] === undefined ? [] : allItems.find(item => item.date === choosenTimeStamp)?.consultationTemplates || []

    useEffect(() => {
        if (isError || allItems.length === 0 || !allItems[0]) return
        setChoosenTimeStamp(allItems[0].date)
    }, [data])

    useEffect(() => {
        if (!bookingData || bookingData.status !== 200) return
        router.push('/')
    }, [bookingData, bookingLoading])

    return (
        <>
            <Stack.Screen options={{ headerTitle: truncateText(`Lịch hẹn của ${name}`, 25) }} />
            <View className='flex-1 relative'>
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    {isLoading ? (
                        <DoctorScheduleSkeleton />
                    ) : isError || allItems.length === 0 || allItems[0] == undefined ? (
                        <View
                            style={{ height: height * 0.8 }}
                            className='flex items-center justify-center'
                        >
                            <ErrorDisplay
                                onRefresh={onRefresh}
                                refreshing={refreshing}
                                text="Không có lịch hẹn"
                            />
                        </View>
                    ) : (
                        <View className='flex-col gap-4 w-full px-2'>
                            <FlashList<DoctorSchedule>
                                data={allItems}
                                keyExtractor={(_, index) => index.toString()}
                                renderItem={({ item }) =>
                                    <View className='mx-2'>
                                        <DoctorScheduleItem
                                            item={item}
                                            choosen={choosenTimeStamp == item.date}
                                            setChoosenTimeStamp={setChoosenTimeStamp}
                                            setChoosenTime={setChoosenTime}
                                        />
                                    </View>
                                }
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                estimatedItemSize={100}
                                scrollEventThrottle={16}
                                onEndReachedThreshold={0.5}
                                extraData={choosenTimeStamp}
                            />
                            <Text className='text-lg font-bold tracking-wider px-2'>
                                Các khung giờ hẹn
                            </Text>
                            <FlashList<DoctorScheduleTime>
                                data={timeStamp}
                                keyExtractor={(_, index) => index.toString()}
                                renderItem={({ item }) =>
                                    <View className='m-2'>
                                        <ScheduleTimeStamp
                                            item={item}
                                            choosen={choosenTime == item.id}
                                            setChoosenTime={setChoosenTime}
                                        />
                                    </View>
                                }
                                numColumns={2}
                                showsHorizontalScrollIndicator={false}
                                estimatedItemSize={100}
                                scrollEventThrottle={16}
                                onEndReachedThreshold={0.5}
                                onEndReached={() => {
                                    if (hasNextPage && !isFetchingNextPage) {
                                        fetchNextPage()
                                    }
                                }}
                                extraData={choosenTime}
                            />
                            <Pressable
                                className={`flex-row gap-2 px-4 py-3 mt-5 items-center justify-center rounded-full bg-[var(--oppo-theme-col)] active:opacity-80 ${choosenTime == '' || bookingLoading ? 'opacity-50' : ''}`}
                                disabled={choosenTime == '' || bookingLoading}
                                onPress={handleBooking}
                            >
                                {bookingLoading ? (
                                    <SpinningIcon icon={<Loader className='text-[var(--same-theme-col)]' size={17} />} />
                                ) : (
                                    <Check className='text-[var(--same-theme-col)]' size={17} />
                                )}
                                <Text className='text-[var(--same-theme-col)] text-base font-bold tracking-wider'>
                                    Đặt lịch hẹn
                                </Text>
                            </Pressable>
                        </View>
                    )}
                </ScrollView>
            </View>
        </>
    )
}
