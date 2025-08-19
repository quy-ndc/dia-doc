import * as React from 'react'
import { Modal, View, StyleSheet, Pressable, ScrollView, RefreshControl, Dimensions } from 'react-native'
import useUserStore from '../../store/userStore'
import { QrCode } from '../../lib/icons/QrCode'
import QRCode from 'react-native-qrcode-svg'
import { Text } from '../../components/ui/text'
import { useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { usePatientProfileByDoctor, usePatientRecordsByDoctor } from '../../service/query/user-query'
import { User } from '../../lib/icons/User'
import IconButton from '../common/icon-button'
import { Patient } from '../../assets/types/user/patient'
import PatientProfile from '../profile-screen/patient/patient-profile'
import { X } from '../../lib/icons/X'
import { HealthTrackItem } from '../../assets/types/user/health-track'

type Prop = {
    id: string
}

const { width, height } = Dimensions.get('window')

export default function PatientProfileModal({ id }: Prop) {

    const [visible, setVisible] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    const { data, isLoading, isError, remove, refetch } = useQuery({
        ...usePatientProfileByDoctor(id),
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000),
        enabled: !!id && visible
    })

    const {
        data: userRecord,
        isLoading: userRecordLoading,
        isError: userRecordError,
        remove: userRecordRemove,
        refetch: userRecordRefetch
    } = useQuery({
        ...usePatientRecordsByDoctor({
            patientId: id,
            recordType: '0,1,2,3,4'
        }),
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000),
        enabled: !!id && visible
    })

    const profile: Patient | undefined = data?.data?.data ?? undefined
    const userRecordItems: HealthTrackItem[] = userRecord?.data?.data?.healthRecords || []

    console.log(userRecordItems)

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        remove()
        userRecordRemove()

        const refreshPromises = [refetch()]

        refreshPromises.push(refetch(), userRecordRefetch())

        Promise.all(refreshPromises).finally(() => setRefreshing(false))
    }, [refetch, userRecordRefetch, remove, userRecordRemove])


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
                        <PatientProfile
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