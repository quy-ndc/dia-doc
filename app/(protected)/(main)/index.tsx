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
import { useConsultationListQuery, useUserHealthCarePlan, useUserHealthRecordProfile, useUserSessionAmountQuery } from '../../../service/query/user-query'
import { HealthTrackItem } from '../../../assets/types/user/health-track'
import HealthcarePlan from '../../../components/home/healthcare-plan/healthcare-plan'
import { HealthCarePlan } from '../../../assets/types/user/healthcare-plan'
import useUserStore from '../../../store/userStore'
import { UserRole } from '../../../assets/enum/user-role'
import AiAccess from '../../../components/home/ai-access/ai-access'
import ConsultSession from '../../../components/home/consult-session/consult-session'
import ConsultationSchedule from '../../../components/home/consultation-schedule/consultation-schedule'
import { ConsultationHistory } from '../../../assets/types/consult/doctor-schedule'

export default function HomeScreen() {
    const { user } = useUserStore()
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
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000),
        enabled: user.role === UserRole.PATIENT
    })

    const {
        data: healthCarePlanData,
        isLoading: healthCarePlanLoading,
        isError: healthCarePlanError,
        refetch: healthCarePlanRefetch,
        remove: healthCarePlanRemove
    } = useQuery({
        ...useUserHealthCarePlan({}),
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000),
        enabled: user.role === UserRole.PATIENT
    })

    const {
        data: consultSessionData,
        isLoading: consultSessionLoading,
        isError: consultSessionError,
        refetch: consultSessionRefetch,
        remove: consultSessionRemove
    } = useQuery({
        ...useUserSessionAmountQuery(),
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000),
        enabled: user.role === UserRole.PATIENT
    })

    const {
        data: consultatonList,
        isLoading: consultationListLoading,
        isError: consultationListError,
        refetch: consultationListRefetch,
        remove: consultationListRemove
    } = useQuery({
        ...useConsultationListQuery({
            PageSize: 5
        }),
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000),
    })

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        remove()

        const refreshPromises = [refetch()]

        healthRecordRemove()
        healthCarePlanRemove()
        consultSessionRemove()
        consultationListRemove()
        refreshPromises.push(healthRecordRefetch(), healthCarePlanRefetch(), consultSessionRefetch(), consultationListRefetch())

        Promise.all(refreshPromises).finally(() => setRefreshing(false))
    }, [user.role, refetch, healthRecordRefetch, healthCarePlanRefetch, consultSessionRefetch, remove, healthRecordRemove, healthCarePlanRemove, consultSessionRemove])

    const items: BlogPost[] = data?.data?.data || []
    const healthRecordItems: HealthTrackItem[] = healthRecordData?.data?.data?.healthRecords || []
    const healthCarePlanItems: HealthCarePlan[] = healthCarePlanData?.data?.data || []
    const sessionAmount = consultSessionData?.data?.data || 0
    const consultationHistoryItems: ConsultationHistory[] = consultatonList?.data?.data?.items || []

    return (
        <>
            <View className='flex-1 w-full pb-5 relative'>
                <ScrollView
                    className='w-full py-5'
                    contentContainerStyle={{ alignItems: 'center' }}
                    decelerationRate={'normal'}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    <View className='flex-col items-center gap-5'>
                        <QuickAccess />
                        <DailyTip />
                        {user.role === UserRole.PATIENT && (
                            <>
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
                                <ConsultSession
                                    amount={sessionAmount}
                                    isLoading={consultSessionLoading}
                                    isError={consultSessionError}
                                    refetch={consultSessionRefetch}
                                    remove={consultSessionRemove}
                                    refreshing={refreshing}
                                />
                            </>
                        )}
                        <ConsultationSchedule
                            items={consultationHistoryItems}
                            isError={consultationListError}
                            isLoading={consultationListLoading}
                            refetch={consultationListRefetch}
                            refreshing={refreshing}
                            remove={consultationListRemove}
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
                <AiAccess />
            </View>
        </>
    )
}