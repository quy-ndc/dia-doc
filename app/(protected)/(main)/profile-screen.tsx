import * as React from 'react'
import { ScrollView, RefreshControl } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { useUserProfile } from '../../../service/query/user-query'
import { useCallback, useState } from 'react'
import { Patient } from '../../../assets/types/user/patient'
import ProfileModule from '../../../components/profile-screen/profile-module'
import ProfileHealthRecord from '../../../components/profile-screen/health-record/profile-health-record'
import useUserStore from '../../../store/userStore'
import { UserRole } from '../../../assets/enum/user-role'
import PatientProfileModule from '../../../components/profile-screen/patient-profile-module'
import LogoutButton from '../../../components/profile-screen/logout-button'

export default function ProfileScreen() {

    const { user } = useUserStore()


    if (user.role === UserRole.PATIENT) {
        return <PatientProfileModule />
    } else {
        null
        // return <LogoutButton />
        // return <DoctorProfileModule />
    }
}
