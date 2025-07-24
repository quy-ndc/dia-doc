import * as React from 'react'
import { View, ScrollView, RefreshControl } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { useUserHealthRecordProfile, useUserProfile } from '../../../service/query/user-query'
import { useCallback, useState } from 'react'
import { Patient } from '../../../assets/types/user/patient'
import ProfileSkeleton from '../../../components/common/skeleton/profile-skeleton'
import ErrorDisplay from '../../../components/common/error-display'
import ProfileModule from '../../../components/profile-screen/profile-module'
import { HealthTrackItem } from '../../../assets/types/user/health-track'
import ProfileHealthRecord from '../../../components/profile-screen/health-record/profile-health-record'
import LogoutButton from '../../../components/profile-screen/logout-button'

export default function ProfileScreen() {

    const [refreshing, setRefreshing] = useState(false)

    const { data, isLoading, remove, refetch, isError } = useQuery({
        ...useUserProfile(),
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
            onePerType: true
        }),
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000)
    })

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        remove()
        refetch()
        healthRecordRemove()
        healthRecordRefetch().finally(() => setRefreshing(false))
    }, [refetch, remove, healthRecordRefetch, healthRecordRemove])

    const profile: Patient | undefined = data?.data?.data ?? undefined
    const healthRecordItems: HealthTrackItem[] = healthRecordData?.data?.data || []

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <ProfileModule
                profile={profile}
                isLoading={isLoading}
                isError={isError}
                refetch={refetch}
                refreshing={refreshing}
                remove={remove}
            />
            <ProfileHealthRecord
                items={healthRecordItems}
                isLoading={healthRecordLoading}
                isError={healthRecordError}
                refetch={healthRecordRefetch}
                remove={healthRecordRemove}
                refreshing={refreshing}
            />
            <LogoutButton />
        </ScrollView>
    )
}
