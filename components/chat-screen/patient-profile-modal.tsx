import * as React from 'react'
import { Modal, View, ScrollView, RefreshControl, Pressable } from 'react-native'
import { useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { usePatientProfileByDoctor, usePatientRecordsByDoctor } from '../../service/query/user-query'
import IconButton from '../common/icon-button'
import { Patient } from '../../assets/types/user/patient'
import PatientProfile from '../profile-screen/patient/patient-profile'
import { X } from '../../lib/icons/X'
import { HealthTrackItem } from '../../assets/types/user/health-track'
import HealthTracker from '../home/health-track.tsx/health-track'
import { Calendar } from '../../lib/icons/Calendar'
import { Text } from '../../components/ui/text'

type Prop = {
    id: string
    visible: boolean
    setVisible: (visible: boolean) => void
}

export default function PatientProfileModal({ id, visible, setVisible }: Prop) {

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
            recordTypes: '0,1,2,3,4'
        }),
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000),
        enabled: !!id && visible
    })

    const profile: Patient | undefined = data?.data?.data ?? undefined
    const userRecordItems: HealthTrackItem[] = userRecord?.data?.data?.healthRecords || []

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        remove()
        userRecordRemove()

        const refreshPromises = [refetch(), userRecordRefetch()]

        Promise.all(refreshPromises).finally(() => setRefreshing(false))
    }, [refetch, userRecordRefetch, remove, userRecordRemove])

    return (
        <>
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
                        <HealthTracker
                            items={userRecordItems}
                            isLoading={userRecordLoading}
                            isError={userRecordError}
                            refetch={userRecordRefetch}
                            remove={userRecordRemove}
                            refreshing={refreshing}
                            patientId={id}
                        />
                    </View>
                    <View className='flex w-full items-center justify-center px-3 pb-3'>
                        <Pressable className='flex-row gap-2 items-center px-3 py-2 rounded-full bg-[var(--oppo-theme-col)]'>
                            <Calendar className='text-[var(--same-theme-col)]' size={17} />
                            <Text className='text-base text-[var(--same-theme-col)] font-semibold tracking-wider'>
                                Tạo lịch đo cho bệnh nhân
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </Modal>
        </>
    )
}