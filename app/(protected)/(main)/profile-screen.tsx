import * as React from 'react'
import { View, ScrollView, RefreshControl } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { useUserProfile } from '../../../service/query/user-query'
import { useCallback, useState } from 'react'
import { Patient } from '../../../assets/types/user/patient'
import ProfileSkeleton from '../../../components/common/skeleton/profile-skeleton'
import ErrorDisplay from '../../../components/common/error-display'
import GeneralInfo from '../../../components/profile-screen/general-info'
import Complication from '../../../components/profile-screen/complication'
import DiabetesInfo from '../../../components/profile-screen/diabetes-info'
import MedicalHistories from '../../../components/profile-screen/medical-histories'
import BasicInfo from '../../../components/profile-screen/basic-infor'

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
    }, [refetch])

    const profile: Patient | undefined = data?.data?.data ?? undefined

    if (isLoading) {
        return (
            <ProfileSkeleton />
        )
    }

    if (!profile || isError) {
        return (
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View className="flex-1 justify-center items-center">
                    <ErrorDisplay
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                        text='Không thể lấy hồ sơ người dùng'
                    />
                </View>
            </ScrollView>
        )
    }

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <View className='flex-col gap-4 px-3 pb-3'>
                <BasicInfo profile={profile} />
                <DiabetesInfo profile={profile} />
                <GeneralInfo profile={profile} />
                {profile.diabetesCondition.hasComplications && (
                    <Complication profile={profile} />
                )}
                {profile.medicalHistories.length !== 0 && (
                    <MedicalHistories profile={profile} />
                )}
            </View>
        </ScrollView>
    )
}
