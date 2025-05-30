import { FlashList } from '@shopify/flash-list'
import * as React from 'react'
import { useCallback, useRef, useState } from 'react'
import { View, RefreshControl, Pressable } from 'react-native'
import { Animated as RNAnimated } from 'react-native'
import BlogItem from '../../../components/common/blog-item/blog-item'
import { ChevronUp } from '../../../lib/icons/ChevronUp'
import { useMediaQuery } from '../../../service/query/media-query'
import { useInfiniteQuery } from '@tanstack/react-query'
import { BlogPost } from '../../../assets/types/media/blog-post'
import { Text } from '../../../components/ui/text'
import SpinningIcon from '../../../components/common/icons/spinning-icon'
import { Loader } from '../../../lib/icons/Loader'
import FilterButton from '../../../components/blog-screen/filter-button'
import SearchButton from '../../../components/blog-screen/search-button'


export default function BlogScreen() {

    const listRef = useRef<FlashList<BlogPost>>(null)
    const opacity = useRef(new RNAnimated.Value(0)).current

    const [refreshing, setRefreshing] = useState(false)
    const [showScrollButton, setShowScrollButton] = useState(false)

    const [category, setCategory] = useState('')
    const [search, setSearch] = useState('')

    const {
        data,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
        refetch,
        remove,
        isLoading,
    } = useInfiniteQuery({
        ...useMediaQuery({
            PageSize: 7,
            CategoryId: category,
            SearchContent: search
        }),
        getNextPageParam: (lastPage) => {
            const posts = lastPage.data.value.data
            return posts.hasNextPage ? posts.nextCursor : undefined
        },
        keepPreviousData: false
    })

    const allItems: BlogPost[] = data?.pages.flatMap(page => page.data?.value.data.items) || []

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        remove()
        refetch().finally(() => setRefreshing(false))
    }, [refetch])

    const scrollToTop = () => {
        listRef.current?.scrollToIndex({ index: 0, animated: true })
    }

    const toggleVisibility = (visible: boolean) => {
        RNAnimated.timing(opacity, {
            toValue: visible ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setShowScrollButton(visible)
        })
    }

    const handleScroll = (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y
        if (offsetY > 400 && !showScrollButton) {
            toggleVisibility(true)
        } else if (offsetY <= 400 && showScrollButton) {
            toggleVisibility(false)
        }
    }

    return (
        <View className='flex-1 w-full pb-5'>
            {isLoading ? (
                <View className='flex-1 w-full h-full flex-col gap-3 justify-center items-center'>
                    <SpinningIcon icon={<Loader className='text-foreground' size={30} />} />
                    <Text className='text-base font-semibold tracking-wider capitalize'>Đang tải...</Text>
                </View>
            ) : (
                <View className='flex-1 flex-col w-full'>
                    <View className='flex-row w-full justify-between items-center px-4 py-1'>
                        <View className='flex-row gap-2 items-center'>
                            <FilterButton category={category} setCategory={setCategory} />
                            <SearchButton search={search} setSearch={setSearch} />
                        </View>
                    </View>
                    <FlashList<BlogPost>
                        data={allItems}
                        ref={listRef}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) =>
                            <BlogItem blogPost={item} />
                        }
                        estimatedItemSize={100}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                        onEndReached={() => {
                            if (hasNextPage && !isFetchingNextPage) {
                                fetchNextPage()
                            }
                        }}
                        onEndReachedThreshold={0.5}
                    />

                    <RNAnimated.View
                        style={{
                            opacity,
                            position: 'absolute',
                            top: 10,
                            right: 10,
                        }}
                    >
                        <Pressable
                            className='flex flex-row items-center gap-2 p-2 px-3 rounded-full bg-[var(--go-up-btn-bg)] active:bg-[var(--go-up-click-bg)]'
                            onPress={scrollToTop}
                        >
                            <Text className='text-sm font-semibold tracking-wider text-[var(--same-theme-col)] capitalize'>Lên đầu</Text>
                            <ChevronUp className='text-[var(--go-up-btn-icon)]' size={18} />
                        </Pressable>
                    </RNAnimated.View>
                </View>
            )}
        </View>
    )
}


