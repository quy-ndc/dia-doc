import * as React from 'react';
import { View, StyleSheet, ScrollView, Dimensions, RefreshControl } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { useMediaByIdQuery } from '../service/query/media-query';
import { BlogPost } from '../assets/types/media/blog-post';
import BlogDetailItem from '../components/common/blog-item/blog-detail';
import { Skeleton } from '../components/ui/skeleton';
import { useCallback, useState } from 'react';


const { width } = Dimensions.get('window');

export default function BlogDetailScreen() {

    const { id } = useLocalSearchParams()

    // const blogImages: string[] = JSON.parse(images as string) || []
    // const isLiked = liked == 'true'

    const { data, isLoading, refetch, remove } = useQuery(
        useMediaByIdQuery({
            Id: id as string
        })
    )

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        remove();
        refetch().finally(() => setRefreshing(false));
    }, [refetch]);

    const item: BlogPost = data ? data?.data.value.data : null

    if (isLoading) {
        return (
            <View className='flex-1 w-full flex-col gap-3 items-center'>
                <Skeleton className='h-6 w-full' />
                <Skeleton className='h-6 w-full' />
                <Skeleton className='h-6 w-full' />
                <Skeleton className='h-6 w-full' />
                <Skeleton className='h-6 w-full' />
                <Skeleton className='h-6 w-full' />
                <Skeleton className='h-6 w-full' />
                <Skeleton className='h-6 w-full' />
            </View>
        )
    }

    return (
        <>
            <ScrollView
                className='w-full'
                contentContainerStyle={styles.container}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View className='flex-col gap-5 justify-center w-full px-3 pb-10'>
                    {data && (
                        <BlogDetailItem
                            id={item.id}
                            avatar={item.user.imageUrl}
                            name={item.user.fullName}
                            title={item.title}
                            content={item.content}
                            image={item.imageUrl}
                            liked={true}
                            createDate={item.createdDate}
                            category={item.category.name}
                            bookmarked={false}
                            detailed={false}
                        />
                    )}

                    <View className='flex-col gap-7'>
                        {/* <BlogComment /> */}
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        // position: 'absolute',
        // bottom: 0,
        // left: 0,
        // right: 0,
    }
});