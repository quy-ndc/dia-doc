import * as React from 'react'
import { ScrollView, RefreshControl } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { Patient } from '../../../assets/types/user/patient'
import PatientProfile from './patient-profile'
import ProfileHealthRecord from './health-record/profile-health-record'
import { useUserProfile } from '../../../service/query/user-query'
import ProfileAction from '../profile-action'

export default function PatientProfileModule() {

    const [refreshing, setRefreshing] = useState(false)
    const { data, isLoading, remove, refetch, isError } = useQuery({
        ...useUserProfile(),
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000)
    })

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        remove()
        refetch().finally(() => setRefreshing(false))
    }, [refetch, remove])

    const profile: Patient | undefined = data?.data?.data ?? undefined

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <PatientProfile
                profile={profile}
                isLoading={isLoading}
                isError={isError}
                refetch={refetch}
                refreshing={refreshing}
                remove={remove}
            />
            <ProfileHealthRecord />
            <ProfileAction />
        </ScrollView>
    )
}
