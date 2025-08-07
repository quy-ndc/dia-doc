import * as React from 'react'
import useUserStore from '../../../store/userStore'
import { UserRole } from '../../../assets/enum/user-role'
import PatientProfileModule from '../../../components/profile-screen/patient/patient-profile-module'
import DoctorProfileModule from '../../../components/profile-screen/doctor/doctor-profile-module'

export default function ProfileScreen() {

    const { user } = useUserStore()

    if (user.role === UserRole.PATIENT) {
        return <PatientProfileModule />
    } else {
        return <DoctorProfileModule />
    }
}
