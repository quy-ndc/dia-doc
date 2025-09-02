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
import { useConsultationListQuery, useGetHealthRecordSummaryQuery, usePurchasedServicePackageQuery, useUserHealthCarePlan, useUserHealthRecordProfile, useWalletBalanceQuery, useWalletHistoryQuery } from '../../../service/query/user-query'
import { HealthSummary, HealthTrackItem } from '../../../assets/types/user/health-track'
import HealthcarePlan from '../../../components/home/healthcare-plan/healthcare-plan'
import { HealthCarePlan } from '../../../assets/types/user/healthcare-plan'
import useUserStore from '../../../store/userStore'
import { UserRole } from '../../../assets/enum/user-role'
import AiAccess from '../../../components/home/ai-access/ai-access'
import ConsultationSchedule from '../../../components/home/consultation-schedule/consultation-schedule'
import { ConsultationHistory } from '../../../assets/types/consult/doctor-schedule'
import PurchaseService from '../../../components/home/purchase-service/purchase-serivce'
import { PurchasedServicePackage } from '../../../assets/types/consult/consultation'
import { ConsultationStatus } from '../../../assets/enum/consultation-status'
import DoctorIncome from '../../../components/home/doctor-income/doctor-income'
import HealthSummaries from '../../../components/home/health-summary/health-summary'

export default function HomeScreen() {

    const { user } = useUserStore()
    const [refreshing, setRefreshing] = useState(false)
    const [selectedDate, setSelectedDate] = useState<string | null>(() => {
        const now = new Date()
        const cutoffHour = 20
        if (now.getHours() < cutoffHour) {
            const yesterday = new Date(now)
            yesterday.setDate(yesterday.getDate() - 1)

            const year = yesterday.getFullYear()
            const month = String(yesterday.getMonth() + 1).padStart(2, '0')
            const day = String(yesterday.getDate()).padStart(2, '0')
            return `${year}-${month}-${day}`
        }
        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const day = String(now.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    })
    const [doctor, setDoctor] = useState<{
        id: string,
        name: string
    } | undefined>(undefined)

    const { data, isLoading, isError, refetch, remove } = useQuery({
        ...useTopMediaQuery({
            NumberOfDays: 30,
            NumberOfPosts: 6
        }),
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000)
    })

    const {
        data: healthRecordSummaryData,
        isLoading: healthRecordSummaryLoading,
        isError: healthRecordSummaryError,
        refetch: healthRecordSummaryRefetch,
        remove: healthRecordSummaryRemove
    } = useQuery({
        ...useGetHealthRecordSummaryQuery(
            selectedDate ? { date: selectedDate } : {}
        ),
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000),
        enabled: user.role === UserRole.PATIENT
    })

    const {
        data: healthRecordData,
        isLoading: healthRecordLoading,
        isError: healthRecordError,
        refetch: healthRecordRefetch,
        remove: healthRecordRemove
    } = useQuery({
        ...useUserHealthRecordProfile({
            recordTypes: '2,3,5,4',
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
        ...useUserHealthCarePlan({
            doctorId: doctor?.id || undefined
        }),
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000),
        enabled: user.role === UserRole.PATIENT
    })

    const {
        data: avalableServiceData,
        isError: availableServiceError,
        refetch: availableServiceRefetch,
        remove: availableServiceRemove,
        isLoading: availableServiceLoading
    } = useQuery({
        ...usePurchasedServicePackageQuery({
            SortBy: 'purchasedDate',
            SortDirection: 0,
            IsExistedSessions: true,
            PageSize: 1
        }),
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
            PageSize: 5,
            Status: ConsultationStatus.BOOKED
        }),
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000),
    })

    const {
        data: walletBalanceData,
        isLoading: walletBalanceLoading,
        isError: walletBalanceError,
        refetch: walletBalanceRefetch,
        remove: walletBalanceRemove
    } = useQuery({
        ...useWalletBalanceQuery(),
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000),
        enabled: user.role === UserRole.DOCTOR
    })

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        const refreshPromises = [refetch()]
        remove()
        if (user.role == UserRole.PATIENT) {
            healthRecordSummaryRemove()
            healthRecordRemove()
            healthCarePlanRemove()
            availableServiceRemove()
        }
        if (user.role == UserRole.DOCTOR) {
            walletBalanceRemove()
        }
        consultationListRemove()
        refreshPromises.push(refetch(), consultationListRefetch())
        if (user.role == UserRole.PATIENT) {
            refreshPromises.push(healthRecordRefetch(), healthCarePlanRefetch(), availableServiceRefetch(), healthRecordSummaryRefetch())
        }
        if (user.role == UserRole.DOCTOR) {
            refreshPromises.push(walletBalanceRefetch())
        }

        Promise.all(refreshPromises).finally(() => setRefreshing(false))
    }, [user.role, refetch, healthRecordRefetch, healthCarePlanRefetch, remove, healthRecordRemove, healthCarePlanRemove, walletBalanceRemove, walletBalanceRefetch, healthRecordSummaryRefetch])

    const items: BlogPost[] = data?.data?.data || []
    const healthSummary: HealthSummary = healthRecordSummaryData?.data?.data || undefined
    const healthRecordItems: HealthTrackItem[] = healthRecordData?.data?.data?.healthRecords || []
    const healthCarePlanItems: HealthCarePlan[] = healthCarePlanData?.data?.data || []
    const availableServiceItems: PurchasedServicePackage[] = avalableServiceData?.data?.data?.items || []
    const consultationHistoryItems: ConsultationHistory[] = consultatonList?.data?.data?.items || []
    const sum: number = walletBalanceData?.data?.data?.balance || 0

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
                                <HealthSummaries
                                    items={healthSummary}
                                    isLoading={healthRecordSummaryLoading}
                                    isError={healthRecordSummaryError}
                                    refetch={healthRecordSummaryRefetch}
                                    remove={healthRecordSummaryRemove}
                                    refreshing={refreshing}
                                    date={selectedDate}
                                    setDate={setSelectedDate}
                                />
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
                                    doctor={doctor}
                                    setDoctor={setDoctor}
                                />
                                <PurchaseService
                                    items={availableServiceItems}
                                    isLoading={availableServiceLoading}
                                    isError={availableServiceError}
                                    refetch={availableServiceRefetch}
                                    remove={availableServiceRemove}
                                    refreshing={refreshing}
                                />
                            </>
                        )}
                        {user.role === UserRole.DOCTOR && (
                            <DoctorIncome
                                sum={sum}
                                isLoading={walletBalanceLoading}
                                isError={walletBalanceError}
                                refetch={walletBalanceRefetch}
                                remove={walletBalanceRemove}
                                refreshing={refreshing}
                            />
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