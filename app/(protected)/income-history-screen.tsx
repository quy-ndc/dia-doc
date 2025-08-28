import * as React from 'react'
import { Dimensions, Modal, Pressable, RefreshControl, ScrollView, View } from 'react-native'
import { Image } from 'expo-image'
import { Text } from '../../components/ui/text'
import { Stack, useLocalSearchParams } from 'expo-router'
import ChatModule from '../../components/chat-screen/chat-module'
import { useCallback, useState } from 'react'
import { AllFeaturesEnabled, ChatRoomProvider } from '@ably/chat'
import { useWalletHistoryQuery } from '../../service/query/user-query'
import { useInfiniteQuery } from '@tanstack/react-query'
import { IncomeHistory } from '../../assets/types/user/doctor'
import { FlashList } from '@shopify/flash-list'
import ConsultationScheduleSkeleton from '../../components/common/skeleton/consultation-schedule-skeleton'
import ErrorDisplay from '../../components/common/error-display'
import DoctorIncomeItem from '../../components/home/doctor-income/doctor-income-item'

const { width, height } = Dimensions.get('window')

export default function IncomeHistoryScreen() {

    const [refreshing, setRefreshing] = useState(false)

    const { data, isLoading, isError, refetch, remove, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        ...useWalletHistoryQuery({
            sortBy: 'createdAt',
            sortDirection: 1,
            pageSize: 5
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
        Promise.all([refetch()]).finally(() => setRefreshing(false))
    }, [refetch, remove])

    const items: IncomeHistory[] = data ? data?.pages?.flatMap(page => page.data?.data?.items) : []

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
                        <FlashList<IncomeHistory>
                            data={items}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <DoctorIncomeItem
                                    item={item}
                                    prev={index < items.length - 1 ? items[index + 1].balanceAfterTransaction : undefined}
                                />
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