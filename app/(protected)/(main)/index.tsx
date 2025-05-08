import * as React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import QuickAccess from '../../../components/home/quick-access/quick-access';
import HomeBlogSection from '../../../components/home/blog/blog-section';
import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNewMediaQuery } from '../../../service/query/media-query';
import { BlogPost } from '../../../assets/types/media/blog-post';


export default function HomeScreen() {

    const [refreshing, setRefreshing] = useState(false)

    const { data, isLoading, isError, refetch, remove } = useQuery(
        useNewMediaQuery({
            PageIndex: 1,
            PageSize: 5,
        })
    )

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        remove()
        refetch().finally(() => setRefreshing(false))
    }, [refetch])

    const items: BlogPost[] = data?.data?.value?.data?.items || []

    return (
        <>
            <ScrollView
                className='w-full py-5'
                contentContainerStyle={{ alignItems: 'center' }}
                decelerationRate={'normal'}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View className='flex-col items-center gap-10'>
                    <QuickAccess />
                    <HomeBlogSection
                        isLoading={isLoading}
                        isError={isError}
                        items={items}
                        onRefresh={onRefresh}
                        refreshing={refreshing} />
                </View>
            </ScrollView>
        </>
    );
}