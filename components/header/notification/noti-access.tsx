import * as React from 'react'
import { Dimensions, Modal, Pressable, RefreshControl, ScrollView, View } from 'react-native'
import { Bell } from '../../../lib/icons/Bell'
import IconButton from '../../common/icon-button'
import { useCallback, useState } from 'react'
import { Text } from '../../ui/text'
import { X } from '../../../lib/icons/X'
import NotificationItem from './noti-item'
import { FlashList } from '@shopify/flash-list'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useNotificationQuery } from '../../../service/query/notification-query'
import QuickButton from '../../home/quick-access/quick-button'
import NotificationSkeleton from '../../common/skeleton/notification-skeleton'
import { GlobalColor } from '../../../global-color'
import ErrorDisplay from '../../common/error-display'
import { Notification } from '../../../assets/types/notification/notification'

const { height, width } = Dimensions.get('window')

type Prop = {
    position: 'header' | 'quick'
}

export default function NotificationAccess({ position }: Prop) {

    const [open, setOpen] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    const onModalOpen = () => {
        if (!open) {
            setOpen(false)
        }
        setOpen(true)
    }

    const {
        data,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
        refetch,
        remove,
        isLoading,
    } = useInfiniteQuery({
        ...useNotificationQuery({
            PageSize: 20
        }),
        getNextPageParam: (lastPage) => {
            const notifications = lastPage.data?.data?.notifications
            return notifications?.hasNextPage ? notifications.nextCursor : undefined
        },
        keepPreviousData: false,
        enabled: open
    })

    const notifications: Notification[] = data?.pages.at(-1)?.data?.data?.items ?? []

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        remove()
        refetch().finally(() => setRefreshing(false))
    }, [refetch])

    return (
        <>
            <Modal
                visible={open}
                animationType="fade"
                transparent
                onRequestClose={() => setOpen(false)}
            >
                <Pressable
                    className="flex-1 justify-center items-center bg-black/50"
                    onPress={() => setOpen(false)}
                >
                    <Pressable
                        style={{ width: width * 0.9, height: height * 0.9 }}
                        className="flex-col justify-center items-center bg-[var(--noti-bg)] rounded-2xl"
                    >
                        <View className='flex-row justify-between items-center w-full py-1 px-1 border-b border-[var(--noti-divider)]'>
                            <IconButton
                                icon={<X className='text-foreground' size={22} />}
                                buttonSize={4}
                                onPress={() => setOpen(false)}
                                possition='other'
                            />
                            <Text className='text-lg tracking-wider font-bold capitalize'>Thông Báo</Text>
                            <View className='p-4 opacity-0'><X size={22} /></View>
                        </View>
                        <View className='flex-1 w-full items-center justify-center'>
                            {isLoading ? (
                                <NotificationSkeleton />
                            ) : !notifications.length ? (
                                <ScrollView
                                    className="flex-1 w-full"
                                    contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}
                                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                                >
                                    <ErrorDisplay
                                        text='Không có thông báo nào'
                                        onRefresh={onRefresh}
                                        refreshing={refreshing}
                                        showRefresh
                                    />
                                </ScrollView>
                            ) : (
                                <View className='flex-1 flex-col w-full'>
                                    <FlashList<Notification>
                                        data={notifications}
                                        keyExtractor={(_, index) => index.toString()}
                                        renderItem={({ item }) => <NotificationItem notification={item} />}
                                        estimatedItemSize={100}
                                        onEndReached={() => {
                                            if (hasNextPage && !isFetchingNextPage) {
                                                fetchNextPage()
                                            }
                                        }}
                                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                                        scrollEventThrottle={16}
                                    />
                                </View>
                            )}
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>

            {position == 'header' ? (
                <View className='relative'>
                    <Pressable
                        className={`p-3 items-center justify-center rounded-full active:bg-[var(--click-bg)]`}
                        onPress={onModalOpen}
                    >
                        <Bell className="text-foreground" size={21} strokeWidth={1.25} />
                    </Pressable>
                </View>
            ) : (
                <QuickButton
                    icon={
                        <View
                            style={{ backgroundColor: GlobalColor.YELLOW_NEON_BG }}
                            className='flex p-3 justify-center items-center rounded-full'
                        >
                            <Bell color={GlobalColor.YELLOW_NEON_BORDER} size={17} />
                        </View>
                    }
                    title='Thông báo'
                    onPress={onModalOpen}
                />
            )}

        </>
    )
}
