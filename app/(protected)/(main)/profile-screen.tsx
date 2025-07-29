import * as React from 'react'
import { ScrollView, RefreshControl } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { useUserProfile } from '../../../service/query/user-query'
import { useCallback, useState } from 'react'
import { Patient } from '../../../assets/types/user/patient'
import ProfileModule from '../../../components/profile-screen/profile-module'
import ProfileHealthRecord from '../../../components/profile-screen/health-record/profile-health-record'

export default function ProfileScreen() {

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
            <ProfileModule
                profile={profile}
                isLoading={isLoading}
                isError={isError}
                refetch={refetch}
                refreshing={refreshing}
                remove={remove}
            />
            <ProfileHealthRecord />
        </ScrollView>
    )
}
