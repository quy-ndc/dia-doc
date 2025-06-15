import { FlashList } from '@shopify/flash-list'
import * as React from 'react'
import BlogSkeleton from '../common/skeleton/blog-skeleton'
import { BlogPost } from '../../assets/types/media/blog-post'
import ErrorDisplay from '../common/error-display'
import BlogItem from '../common/blog-item/blog-item'

type Prop = {
    isLoading: boolean
    isError: boolean
    allItems: BlogPost[]
    onRefresh: () => void
    refreshing: boolean
    hasNextPage: boolean
    isFetchingNextPage: boolean
    fetchNextPage: () => void
    handleScroll: (event: any) => void
}

export default function BlogList({
    isLoading,
    isError,
    allItems,
    onRefresh,
    refreshing,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    handleScroll
}: Prop) {

    if (isLoading) return <BlogSkeleton />

    if (isError || !allItems || allItems.length == 0) return (
        <ErrorDisplay
            onRefresh={onRefresh}
            refreshing={refreshing}
            text='Không có bài viết để hiển thị'
        />
    )

    return (

        <FlashList<BlogPost>
            data={allItems}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) =>
                <BlogItem blogPost={item} />
            }
            estimatedItemSize={100}
            scrollEventThrottle={16}
            onScroll={handleScroll}
            onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage) {
                    fetchNextPage()
                }
            }}
            onEndReachedThreshold={0.5}
        />
    )
}


