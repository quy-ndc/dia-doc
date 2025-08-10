import * as React from 'react'
import { useCallback, useState } from 'react'
import { Dimensions, RefreshControl, ScrollView, View } from 'react-native'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useDoctorListQuery } from '../../../service/query/user-query'
import ServicePackageSkeleton from '../../../components/common/skeleton/service-package-skeleton'
import ErrorDisplay from '../../../components/common/error-display'
import { Doctor } from '../../../assets/types/user/doctor'
import { Text } from '../../../components/ui/text'
import { FlashList } from '@shopify/flash-list'
import DoctorItem from '../../../components/doctor-list-screen/doctor-item'

const { width, height } = Dimensions.get('window')

export default function DoctorListScreen() {

    const [refreshing, setRefreshing] = useState(false)

    const { data, isError, hasNextPage, isFetchingNextPage, fetchNextPage, refetch, remove, isLoading } = useInfiniteQuery({
        ...useDoctorListQuery({
            PageSize: 10,
            SortBy: 'name,',
            SortDirection: 0
        }),
        getNextPageParam: (lastPage) => {
            const doctors = lastPage?.data?.data || undefined
            return doctors?.hasNextPage ? doctors.nextCursor : undefined
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

    const items: Doctor[] = data ? data?.pages?.flatMap(page => page.data?.data?.items) : []

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
                        <ServicePackageSkeleton />
                    ) : isError || !items || items.length === 0 || items[0] === undefined ? (
                        <View style={{ width: width, height: height * 0.9 }}>
                            <ErrorDisplay
                                text={'Không thể hiển thị các gói tư vấn'}
                                onRefresh={onRefresh}
                                refreshing={refreshing}
                                showRefresh
                            />
                        </View>
                    ) : (
                        <FlashList<Doctor>
                            data={items}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View className='my-2'>
                                    <DoctorItem item={item} />
                                </View>
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
