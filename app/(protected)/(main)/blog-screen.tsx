import { ScrollView, RefreshControl, Pressable, View, NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import { useRef, useCallback, useState } from 'react'
import { Animated as RNAnimated } from 'react-native'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { BlogPost } from '../../../assets/types/media/blog-post'
import { Category } from '../../../assets/types/media/category'
import { useCategoryQuery, useMediaQuery } from '../../../service/query/media-query'
import TopBlogTagList from '../../../components/blog-screen/top-tag-list'
import FilterButton from '../../../components/blog-screen/filter-button'
import SearchButton from '../../../components/blog-screen/search-button'
import BlogList from '../../../components/blog-screen/blog-list'
import { Text } from '../../../components/ui/text'
import { ChevronUp } from '../../../lib/icons/ChevronUp'

export default function BlogScreen() {

    const scrollViewRef = useRef<ScrollView>(null)
    const opacity = useRef(new RNAnimated.Value(0)).current

    const [refreshing, setRefreshing] = useState(false)
    const [showScrollButton, setShowScrollButton] = useState(false)
    const [category, setCategory] = useState('')
    const [search, setSearch] = useState('')

    const {
        data: categoriesData,
        isLoading: isLoadingCategories,
        refetch: refetchCategories,
        remove: removeCategories
    } = useQuery({
        ...useCategoryQuery(),
        retry: 2,
        retryDelay: attempt => Math.min(800 * 2 ** attempt, 5000)
    })
    const categories: Category[] = categoriesData?.data.value.data || []

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
        ...useMediaQuery({
            PageSize: 7,
            CategoryId: category === '' ? undefined : category,
            SearchContent: search === '' ? undefined : search
        }),
        getNextPageParam: (lastPage) => {
            const posts = lastPage.data.value.data
            return posts.hasNextPage ? posts.nextCursor : undefined
        },
        keepPreviousData: false,
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000)
    })
    const allItems: BlogPost[] = data?.pages.flatMap(page => page.data?.value.data.items) || []

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        remove()
        removeCategories()
        Promise.all([refetch(), refetchCategories()]).finally(() => setRefreshing(false))
    }, [refetch, refetchCategories, remove, removeCategories])

    const scrollToTop = () => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true })
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

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y
        if (offsetY > 400 && !showScrollButton) {
            toggleVisibility(true)
        } else if (offsetY <= 400 && showScrollButton) {
            toggleVisibility(false)
        }
    }

    return (
        <View className='flex-1 w-full pb-5 relative'>
            <ScrollView
                ref={scrollViewRef}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View className='flex-1 flex-col gap-5 px-2 w-full'>
                    <View className='flex-row w-full px-2 justify-between items-center'>
                        <SearchButton search={search} setSearch={setSearch} />
                        <FilterButton category={category} setCategory={setCategory} />
                    </View>
                    <TopBlogTagList
                        items={categories}
                        isLoading={isLoadingCategories}
                        category={category}
                        setCategory={setCategory}
                    />
                    <BlogList
                        isLoading={isLoading}
                        isError={isError}
                        allItems={allItems}
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                        hasNextPage={hasNextPage as boolean}
                        isFetchingNextPage={isFetchingNextPage}
                        fetchNextPage={fetchNextPage}
                        handleScroll={handleScroll}
                    />
                </View>
            </ScrollView>
            <RNAnimated.View style={{ opacity, position: 'absolute', bottom: 10, right: 10 }}>
                <Pressable
                    className='flex flex-row items-center gap-2 p-2 px-3 rounded-full bg-[var(--go-up-btn-bg)] active:bg-[var(--go-up-click-bg)]'
                    onPress={scrollToTop}
                >
                    <Text className='text-sm font-semibold tracking-wider text-[var(--same-theme-col)] capitalize'>Lên đầu</Text>
                    <ChevronUp className='text-[var(--go-up-btn-icon)]' size={18} />
                </Pressable>
            </RNAnimated.View>
        </View>
    )
}
