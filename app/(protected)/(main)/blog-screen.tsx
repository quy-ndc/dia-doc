import { ScrollView, RefreshControl, Pressable, View, NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import { useRef, useCallback, useState } from 'react'
import { Animated as RNAnimated } from 'react-native'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { BlogPost } from '../../../assets/types/media/blog-post'
import { Category } from '../../../assets/types/media/category'
import { useMediaQuery, useTopCategoryQuery } from '../../../service/query/media-query'
import TopBlogTagList from '../../../components/blog-screen/top-tag-list'
import FilterButton from '../../../components/blog-screen/filter-button'
import SearchField from '../../../components/blog-screen/search-field'
import BlogList from '../../../components/blog-screen/blog-list'
import { Text } from '../../../components/ui/text'
import { ChevronUp } from '../../../lib/icons/ChevronUp'
import SortButton from '../../../components/blog-screen/sort-button'

export default function BlogScreen() {

    const scrollViewRef = useRef<ScrollView>(null)
    const opacity = useRef(new RNAnimated.Value(0)).current

    const [refreshing, setRefreshing] = useState(false)
    const [showScrollButton, setShowScrollButton] = useState(false)
    const [categories, setCategories] = useState<string[]>([])
    const [search, setSearch] = useState('')
    const [isAscending, setIsAscending] = useState<boolean>(false)
    const [sortType, setSortType] = useState<string>('')

    const {
        data: categoriesData,
        isLoading: isLoadingCategories,
        refetch: refetchCategories,
        remove: removeCategories
    } = useQuery({
        ...useTopCategoryQuery({ NumberOfCategories: 10 }),
        retry: 2,
        retryDelay: attempt => Math.min(800 * 2 ** attempt, 5000)
    })
    const categoriesList: Category[] = categoriesData?.data?.value?.data || []

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
            CategoryIds: categories,
            SearchContent: search === '' ? undefined : search,
            IsSortASC: isAscending, 
            SortType: sortType === '' ? undefined : sortType
        }),
        getNextPageParam: (lastPage) => {
            const posts = lastPage.data.value.data
            return posts.hasNextPage ? posts.nextCursor : undefined
        },
        keepPreviousData: false,
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000)
    })
    const allItems: BlogPost[] = data?.pages?.flatMap(page => page.data?.value?.data?.items) || []

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
                        <SearchField search={search} setSearch={setSearch} />
                        <View className='flex-row items-center gap-2'>
                            <SortButton
                                sortType={sortType}
                                isAscending={isAscending}
                                setSortType={setSortType}
                                setIsAscending={setIsAscending}
                            />
                            <FilterButton categories={categories} setCategories={setCategories} />
                        </View>
                    </View>
                    <TopBlogTagList
                        items={categoriesList}
                        isLoading={isLoadingCategories}
                        categories={categories}
                        setCategories={setCategories}
                        refreshing={refreshing}
                        refetch={refetchCategories}
                        remove={removeCategories}
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
                        showBookmarkDate={false}
                        showLikeDate={false}
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
