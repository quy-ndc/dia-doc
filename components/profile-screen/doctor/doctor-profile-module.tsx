import * as React from 'react'
import { ScrollView, RefreshControl } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { useDoctorProfile, useUserProfile } from '../../../service/query/user-query'
import ProfileAction from '../profile-action'
import DoctorProfile from './doctor-profile'
import { Doctor } from '../../../assets/types/user/doctor'

export default function DoctorProfileModule() {

    const [refreshing, setRefreshing] = useState(false)
    const { data, isLoading, remove, refetch, isError } = useQuery({
        ...useDoctorProfile(),
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000)
    })

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        remove()
        refetch().finally(() => setRefreshing(false))
    }, [refetch, remove])

    const profile: Doctor | undefined = data?.data?.data ?? undefined

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <DoctorProfile
                profile={profile}
                isLoading={isLoading}
                isError={isError}
                refetch={refetch}
                refreshing={refreshing}
                remove={remove}
            />
            <ProfileAction />
        </ScrollView>
    )
}
