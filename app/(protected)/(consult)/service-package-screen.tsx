import * as React from 'react'
import { useCallback, useState } from 'react'
import { Dimensions, RefreshControl, ScrollView, View } from 'react-native'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useServicePackageQuery } from '../../../service/query/user-query'
import { ServicePackage } from '../../../assets/types/consult/consultation'
import { FlashList } from '@shopify/flash-list'
import ServicePackageItem from '../../../components/service-package-screen/service-package-item'
import ServicePackageSkeleton from '../../../components/common/skeleton/service-package-skeleton'
import ErrorDisplay from '../../../components/common/error-display'

const { width, height } = Dimensions.get('window')

export default function ServicePackageScreen() {

    const [refreshing, setRefreshing] = useState(false)

    const { data, isError, hasNextPage, isFetchingNextPage, fetchNextPage, refetch, remove, isLoading } = useInfiniteQuery({
        ...useServicePackageQuery({
            PageSize: 10,
            SortBy: 'name',
            SortDirection: 0
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

    const items: ServicePackage[] = data ? data?.pages?.flatMap(page => page.data?.data?.items) : []

    return (
        <>
            <ScrollView
                className='w-full pb-5'
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
                        <View
                            style={{ width: width, height: height * 0.9 }}
                            className='flex-1 justify-center items-center'
                        >
                            <ErrorDisplay
                                text={'Không thể hiển thị các gói tư vấn'}
                                onRefresh={onRefresh}
                                refreshing={refreshing}
                                showRefresh
                            />
                        </View>
                    ) : (
                        <FlashList<ServicePackage>
                            data={items}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View className='my-2'>
                                    <ServicePackageItem item={item} />
                                </View>
                            )}
                            estimatedItemSize={100}
                            onEndReached={() => {
                                if (hasNextPage && !isFetchingNextPage) fetchNextPage()
                            }}
                            onEndReachedThreshold={0.5}
                        />
                    )}
                </View>
            </ScrollView>
        </>
    )
}
