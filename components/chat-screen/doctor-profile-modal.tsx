import * as React from 'react'
import { Modal, View, StyleSheet, Pressable, ScrollView, RefreshControl, Dimensions } from 'react-native'
import useUserStore from '../../store/userStore'
import { QrCode } from '../../lib/icons/QrCode'
import QRCode from 'react-native-qrcode-svg'
import { Text } from '../../components/ui/text'
import { useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useDoctorByIdQuery, usePatientProfileByDoctor, usePatientRecordsByDoctor } from '../../service/query/user-query'
import { User } from '../../lib/icons/User'
import IconButton from '../common/icon-button'
import { Patient } from '../../assets/types/user/patient'
import PatientProfile from '../profile-screen/patient/patient-profile'
import { X } from '../../lib/icons/X'
import { HealthTrackItem } from '../../assets/types/user/health-track'
import { Doctor } from '../../assets/types/user/doctor'
import DoctorProfile from '../profile-screen/doctor/doctor-profile'

type Prop = {
    id: string
}

const { width, height } = Dimensions.get('window')

export default function DoctorProfileModal({ id }: Prop) {

    const [visible, setVisible] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    const { data, isLoading, isError, remove, refetch } = useQuery({
        ...useDoctorByIdQuery(id),
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000),
        enabled: !!id && visible
    })

    const profile: Doctor | undefined = data?.data?.data ?? undefined

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        remove()

        const refreshPromises = [refetch()]

        Promise.all(refreshPromises).finally(() => setRefreshing(false))
    }, [refetch, remove])


    return (
        <>
            <IconButton
                icon={<User className='text-foreground' size={17} />}
                buttonSize={3}
                possition={'other'}
                onPress={() => setVisible(true)}
            />
            <Modal
                visible={visible}
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    <View className='flex-1 flex-col py-5 w-full'>
                        <View className='flex-row items-center justify-between px-3 pb-2'>
                            <IconButton
                                icon={<X className='text-foreground' size={17} />}
                                buttonSize={3}
                                possition={'other'}
                                onPress={() => setVisible(false)}
                            />
                        </View>
                        <DoctorProfile
                            profile={profile}
                            isLoading={isLoading}
                            isError={isError}
                            refetch={refetch}
                            refreshing={refreshing}
                            remove={remove}
                        />
                    </View>
                </ScrollView>
            </Modal>
        </>
    )
}