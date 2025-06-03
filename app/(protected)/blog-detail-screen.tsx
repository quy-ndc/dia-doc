import * as React from 'react';
import { View, ScrollView, RefreshControl, Text, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { useMediaByIdQuery } from '../../service/query/media-query';
import { BlogPost } from '../../assets/types/media/blog-post';
import BlogDetailItem from '../../components/common/blog-item/blog-detail';
import { useCallback, useState } from 'react';
import { ChevronLeft } from '../../lib/icons/ChevronLeft';
import BlogDetailSkeleton from '../../components/common/skeleton/blog-detail-skeleton';

export default function BlogDetailScreen() {
    const { id } = useLocalSearchParams()

    const { data, isLoading, isError, error, refetch, remove } = useQuery(
        useMediaByIdQuery(id as string)
    )

    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        remove()
        refetch().finally(() => setRefreshing(false))
    }, [refetch])

    const item: BlogPost | null = data?.data?.value?.data ?? null;

    if (isLoading) {
        return (
            <BlogDetailSkeleton />
        )
    }

    if (isError || !item) {
        return (
            <ScrollView
                className='w-full'
                contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View className='flex-col gap-4 items-center'>
                    <Text className='text-[var(--oppo-theme-col)] text-center text-lg px-4 tracking-wider capitalize'>
                        {isError ? 'Đã xảy ra lỗi. Vui lòng thử lại.' : 'Không tìm thấy bài viết.'}
                    </Text>
                    <Pressable
                        className='flex-row justify-center items-center gap-2 px-4 py-2 rounded-full bg-[var(--oppo-theme-col)] border border-[var(--oppe-theme-col)] active:bg-[--oppo-click-bg]'
                        onPress={() => router.push('/(protected)/(main)')}
                    >
                        <ChevronLeft className='text-[var(--same-theme-col)]' size={18} />
                        <Text className='text-[var(--same-theme-col)] text-sm font-semibold tracking-wider'>Quay lại</Text>
                    </Pressable>
                </View>
            </ScrollView>
        )
    }

    return (
        <ScrollView
            className='w-full'
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <View className='flex-col gap-5 justify-center w-full px-3 pb-10'>
                <BlogDetailItem
                    avatar={item.user.imageUrl}
                    name={item.user.fullName}
                    title={item.title}
                    content={item.content}
                    contentHtml={item.contentHtml}
                    image={item.imageUrl}
                    liked={true}
                    createDate={item.createdDate}
                    category={item.category.name}
                    bookmarked={false}
                />
                <View className='flex-col gap-7'>
                    {/* <BlogComment /> */}
                </View>
            </View>
        </ScrollView>
    )
}
