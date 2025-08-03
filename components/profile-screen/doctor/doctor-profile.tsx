import * as React from 'react'
import { View } from 'react-native'
import { useCallback } from 'react'
import { Patient } from '../../../assets/types/user/patient'
import ProfileSkeleton from '../../common/skeleton/profile-skeleton'
import ErrorDisplay from '../../common/error-display'
import { Doctor } from '../../../assets/types/user/doctor'
import BasicInfo from '../basic-infor'
import ExperienceInfo from './experience-info'
import HospitalInfo from './hospital-info'


type Prop = {
    profile?: Doctor
    isLoading: boolean
    isError: boolean
    refetch: () => void
    remove: () => void
    refreshing: boolean
}

export default function DoctorProfile({ profile, isLoading, isError, refetch, refreshing, remove }: Prop) {

    const onRefresh = useCallback(() => {
        remove()
        refetch()
    }, [refetch])

    if (isLoading) {
        return (
            <ProfileSkeleton />
        )
    }

    if (!profile || isError) {
        return (
            <View className="flex-1 justify-center items-center">
                <ErrorDisplay
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                    text='Không thể lấy hồ sơ người dùng'
                />
            </View>
        )
    }

    return (
        <View className='flex-col gap-4 px-3 pb-3'>
            <BasicInfo profile={profile} />
            <ExperienceInfo profile={profile} />
            <HospitalInfo profile={profile} />
        </View>
    )
}
