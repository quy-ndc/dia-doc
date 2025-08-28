
import * as React from 'react'
import { Dimensions, Modal, Pressable, RefreshControl, ScrollView, View } from 'react-native'
import { Text } from '../../ui/text'
import { X } from '../../../lib/icons/X'
import { useDoctorHaveCreatedCarePlan } from '../../../service/query/user-query'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import IconButton from '../../common/icon-button'
import { ListFilter } from '../../../lib/icons/ListFilter'
import BlogSkeleton from '../../common/skeleton/blog-skeleton'
import { Doctor } from '../../../assets/types/user/doctor'
import ErrorDisplay from '../../common/error-display'
import { FlashList } from '@shopify/flash-list'
import { Image } from 'expo-image'

type Prop = {
    doctor: {
        id: string,
        name: string
    } | undefined
    setDoctor: (doctor: {
        id: string,
        name: string
    } | undefined) => void
}

const { width, height } = Dimensions.get('window')

export default function DoctorFilter({ doctor, setDoctor }: Prop) {

    const [visible, setVisible] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    const { data, isLoading, isError, remove, refetch } = useQuery({
        ...useDoctorHaveCreatedCarePlan(),
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000),
    })

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        remove()
        refetch().finally(() => setRefreshing(false))
    }, [refetch, remove])

    const handleSelectDoctor = (selectedDoctor: {
        id: string,
        name: string
    }) => {
        if (selectedDoctor.id == doctor?.id) {
            setDoctor(undefined)
        } else {
            setDoctor({
                id: selectedDoctor.id,
                name: selectedDoctor.name
            })
        }
        setVisible(false)
    }

    const items: Doctor[] = data?.data?.data || []

    return (
        <>
            <IconButton
                icon={<ListFilter className='text-foreground' size={17} />}
                buttonSize={2}
                possition={'other'}
                onPress={() => setVisible(true)}
            />
            <Modal
                visible={visible}
                animationType="fade"
                transparent
                onRequestClose={() => setVisible(false)}
            >
                <Pressable
                    className="flex-1 justify-center items-center bg-black/50"
                    onPress={() => setVisible(false)}
                >
                    <Pressable
                        style={{ width: width * 0.9, height: height * 0.9 }}
                        className="flex-col justify-center items-center bg-[var(--noti-bg)] rounded-2xl"
                    >
                        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                            <View className='flex-row justify-between items-center w-full py-1 px-1 border-b border-[var(--noti-divider)]'>
                                <IconButton
                                    icon={<X className='text-foreground' size={22} />}
                                    buttonSize={4}
                                    onPress={() => setVisible(false)}
                                    possition='other'
                                />
                                <Text className='text-lg tracking-wider font-bold capitalize'>Bác sĩ đã tạo lịch</Text>
                                <View className='p-4 opacity-0'><X size={22} /></View>
                            </View>
                            <View className='flex-1 w-full items-center justify-center'>
                                {isLoading ? (
                                    <BlogSkeleton />
                                ) : !items.length ? (
                                    <ScrollView
                                        className="flex-1 w-full"
                                        contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}
                                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                                    >
                                        <ErrorDisplay
                                            text='Không có thông báo nào'
                                            onRefresh={onRefresh}
                                            refreshing={refreshing}
                                        />
                                    </ScrollView>
                                ) : (
                                    <View className='flex-1 flex-col w-full p-3'>
                                        <FlashList<Doctor>
                                            data={items}
                                            keyExtractor={(_, index) => index.toString()}
                                            renderItem={({ item }) =>
                                                <Pressable
                                                    className={`flex-row gap-4 items-center active:bg-[var(--click-bg)] rounded-lg p-2 ${doctor?.id == item.id ? 'bg-[var(--click-bg)]' : ''}`}
                                                    onPress={() => handleSelectDoctor({
                                                        id: item.id,
                                                        name: item.name
                                                    })}
                                                >
                                                    <Image
                                                        source={item.avatar}
                                                        style={{ width: 50, height: 50, borderRadius: 1000 }}
                                                    />
                                                    <View className='flex-col gap-1'>
                                                        <Text className='text-base font-semibold tracking-wider'>{item.name}</Text>
                                                        <Text className='text-sm font-semibold text-[var(--fade-text-color)] tracking-wider'>Bác sĩ</Text>
                                                    </View>
                                                </Pressable>
                                            }
                                            estimatedItemSize={100}
                                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                                            scrollEventThrottle={16}
                                        />
                                    </View>
                                )}
                            </View>
                        </ScrollView>
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    )
}