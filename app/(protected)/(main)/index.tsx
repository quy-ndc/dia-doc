import * as React from 'react'
import { View, ScrollView, RefreshControl } from 'react-native'
import QuickAccess from '../../../components/home/quick-access/quick-access'
import HomeBlogSection from '../../../components/home/blog/blog-section'
import { useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTopMediaQuery } from '../../../service/query/media-query'
import { BlogPost } from '../../../assets/types/media/blog-post'
import DailyTip from '../../../components/home/daily-tip.tsx/daily-tip'
import HealthTracker from '../../../components/home/health-track.tsx/health-track'
import { useUserHealthCarePlan, useUserHealthRecordProfile } from '../../../service/query/user-query'
import { HealthTrackItem } from '../../../assets/types/user/health-track'
import HealthcarePlan from '../../../components/home/healthcare-plan/healthcare-plan'
import { HealthCarePlan } from '../../../assets/types/user/healthcare-plan'

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
            newest: true,
            onePerType: true,
        }),
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000)
    })

    const today = new Date();
    const fromDate = new Date(today.getTime() - 24 * 60 * 60 * 1000).toISOString();
    const toDate = new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString();

    const {
        data: healthCarePlanData,
        isLoading: healthCarePlanLoading,
        isError: healthCarePlanError,
        refetch: healthCarePlanRefetch,
        remove: healthCarePlanRemove
    } = useQuery({
        ...useUserHealthCarePlan({
            fromDate: '2025-07-23',
            toDate: '2025-07-25'
        }),
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000)
    })

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        remove()
        healthRecordRemove()
        healthCarePlanRemove()
        Promise.all([refetch(), healthRecordRefetch(), healthCarePlanRefetch()]).finally(() => setRefreshing(false))
    }, [refetch, healthRecordRefetch, healthCarePlanRefetch, remove, healthRecordRemove, healthCarePlanRemove])

    const items: BlogPost[] = data?.data?.data || []
    const healthRecordItems: HealthTrackItem[] = healthRecordData?.data?.data || []
    const healthCarePlanItems: HealthCarePlan[] = healthCarePlanData?.data?.data || []

    return (
        <>
            <ScrollView
                className='w-full py-5'
                contentContainerStyle={{ alignItems: 'center' }}
                decelerationRate={'normal'}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View className='flex-col items-center gap-5'>
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
                    <HealthcarePlan
                        items={healthCarePlanItems}
                        isLoading={healthCarePlanLoading}
                        isError={healthCarePlanError}
                        refetch={healthCarePlanRefetch}
                        remove={healthCarePlanRemove}
                        refreshing={refreshing}
                    />
                    <HomeBlogSection
                        isLoading={isLoading}
                        isError={isError}
                        items={items}
                        refetch={refetch}
                        remove={remove}
                        refreshing={refreshing}
                    />
                </View>
            </ScrollView>
        </>
    )
}