import * as React from 'react'
import { View } from 'react-native'
import { useCallback } from 'react'
import { Patient } from '../../../assets/types/user/patient'
import ProfileSkeleton from '../../common/skeleton/profile-skeleton'
import ErrorDisplay from '../../common/error-display'
import GeneralInfo from './general-info'
import Complication from './complication'
import DiabetesInfo from './diabetes-info'
import MedicalHistories from './medical-histories'
import BasicInfo from '../basic-infor'

type Prop = {
    profile?: Patient
    isLoading: boolean
    isError: boolean
    refetch: () => void
    remove: () => void
    refreshing: boolean
}

export default function PatientProfile({ profile, isLoading, isError, refetch, refreshing, remove }: Prop) {

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
            <DiabetesInfo profile={profile} />
            <GeneralInfo profile={profile} />
            {profile.diabetesCondition.hasComplications && (
                <Complication profile={profile} />
            )}
            {profile.medicalHistories.length !== 0 && (
                <MedicalHistories profile={profile} />
            )}
        </View>
    )
}
