import * as React from 'react'
import { View, ScrollView, RefreshControl, Dimensions } from 'react-native'
import { useCallback, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useConsultationListQuery } from '../../../service/query/user-query'
import { ConsultationHistory } from '../../../assets/types/consult/doctor-schedule'
import ConsultationScheduleSkeleton from '../../../components/common/skeleton/consultation-schedule-skeleton'
import ErrorDisplay from '../../../components/common/error-display'
import { FlashList } from '@shopify/flash-list'
import ConsultationScheduleItem from '../../../components/home/consultation-schedule/consultation-schedule-item'

const { width, height } = Dimensions.get('window')

export default function ConsultationHistoryScreen() {
    const [refreshing, setRefreshing] = useState(false)

    const { data, isError, hasNextPage, isFetchingNextPage, fetchNextPage, refetch, remove, isLoading } = useInfiniteQuery({
        ...useConsultationListQuery({
            PageSize: 10,
        }),
        getNextPageParam: (lastPage) => {
            const posts = lastPage?.data?.data || undefined
            return posts?.hasNextPage ? posts.nextCursor : undefined
        },
        keepPreviousData: false,
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000)
    })

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        remove()
        refetch().finally(() => setRefreshing(false))
    }, [remove, refetch])

    const items: ConsultationHistory[] = data?.pages?.flatMap(page => page.data?.data?.items) || []

    return (
        <>
            <ScrollView
                className="w-full pb-5"
                contentContainerStyle={{ alignItems: 'center' }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                decelerationRate={'normal'}
            >
                <View
                    style={{ width: width }}
                    className='pt-2 px-2'
                >
                    {isLoading ? (
                        <ConsultationScheduleSkeleton />
                    ) : isError || !items || items.length === 0 || items[0] === undefined ? (
                        <View
                            style={{ width: width, height: height * 0.9 }}
                            className='flex-1 justify-center items-center'
                        >
                            <ErrorDisplay
                                text={'Không có dữ liệu'}
                                onRefresh={onRefresh}
                                refreshing={refreshing}
                            />
                        </View>
                    ) : (
                        <FlashList<ConsultationHistory>
                            data={items}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) => (
                                <ConsultationScheduleItem item={item} />
                            )}
                            estimatedItemSize={100}
                            onEndReached={() => {
                                if (hasNextPage && !isFetchingNextPage) {
                                    fetchNextPage()
                                }
                            }}
                            onEndReachedThreshold={0.5}
                        />
                    )}
                </View>
            </ScrollView>
        </>
    )
}