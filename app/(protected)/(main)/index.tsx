import * as React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import QuickAccess from '../../../components/home/quick-access/quick-access';
import HomeBlogSection from '../../../components/home/blog/blog-section';
import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTopMediaQuery } from '../../../service/query/media-query';
import { BlogPost } from '../../../assets/types/media/blog-post';
import DailyTip from '../../../components/home/daily-tip.tsx/daily-tip';
import LogoutButton from '../../../components/profile-screen/logout-button';
import HealthTracker from '../../../components/home/health-track.tsx/health-track';
import { useUserHealthRecordProfile } from '../../../service/query/user-query';
import { HealthTrackItem } from '../../../assets/types/user/health-track';

export default function HomeScreen() {

    const [refreshing, setRefreshing] = useState(false)

    const { data, isLoading, isError, refetch, remove } = useQuery({
        ...useTopMediaQuery({
            NumberOfDays: 30,
            NumberOfPosts: 6
        }),
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000)
    })

    const {
        data: healthRecordData,
        isLoading: healthRecordLoading,
        isError: healthRecordError,
        refetch: healthRecordRefetch,
        remove: healthRecordRemove
    } = useQuery({
        ...useUserHealthRecordProfile({
            recordTypes: '0,1,2,3,4',
            newest: true
        }),
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000)
    })

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        remove()
        healthRecordRemove()
        Promise.all([refetch(), healthRecordRefetch()]).finally(() => setRefreshing(false))
    }, [refetch])

    const items: BlogPost[] = data?.data?.value?.data || []
    const healthRecordItems: HealthTrackItem[] = healthRecordData?.data?.value?.data || []

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
                    <DailyTip />
                    <HealthTracker
                        items={healthRecordItems}
                        isLoading={healthRecordLoading}
                        isError={healthRecordError}
                        refetch={healthRecordRefetch}
                        remove={healthRecordRemove}
                        refreshing={refreshing}
                    />
                    <HomeBlogSection
                        isLoading={isLoading}
                        isError={isError}
                        items={items}
                        refetch={refetch}
                        remove={remove}
                        refreshing={refreshing} />
                    <LogoutButton />
                </View>
            </ScrollView>
        </>
    );
}