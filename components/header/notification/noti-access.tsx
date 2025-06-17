import * as React from 'react'
import { Dimensions, Modal, Pressable, RefreshControl, ScrollView, View } from 'react-native'
import { Bell } from '../../../lib/icons/Bell'
import IconButton from '../../common/icon-button'
import { useCallback, useEffect, useState } from 'react'
import { Text } from '../../ui/text'
import { X } from '../../../lib/icons/X'
import NotificationItem from './noti-item'
import useNotificationStore from '../../../store/notificationStore'
import { FlashList } from '@shopify/flash-list'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useNotificationQuery } from '../../../service/query/notification-query'
import { SystemNotification } from '../../../assets/types/notification/notification'
import SpinningIcon from '../../common/icons/spinning-icon'
import { Loader } from '../../../lib/icons/Loader'
import { RefreshCcw } from '../../../lib/icons/RefreshCcw'
import QuickButton from '../../home/quick-access/quick-button'
import NotificationSkeleton from '../../common/skeleton/notification-skeleton'
import { GlobalColor } from '../../../global-color'

const { height, width } = Dimensions.get('window')

type Prop = {
    position: 'header' | 'quick'
}

export default function NotificationAccess({ position }: Prop) {

    const [open, setOpen] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    const {
        notification,
        notiCount,
        setNoti,
        addNoti,
        addNotis,
        removeNoti,
        resetNoti,
        increaseCount,
        decreaseCount,
        clearCount
    } = useNotificationStore()

    const onModalOpen = () => {
        if (!open) {
            setOpen(false)
        }
        setOpen(true)
        clearCount()
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
            const notifications = lastPage.data?.value?.notifications
            return notifications?.hasNextPage ? notifications.nextCursor : undefined
        },
        keepPreviousData: false,
        enabled: open
    })

    useEffect(() => {
        if (!data) return
        const notifications: SystemNotification[] = data.pages.at(-1)?.data?.value?.notifications?.items ?? []
        if (notifications.length) {
            if (data.pages.length === 1) {
                setNoti(notifications)
            } else {
                addNotis(notifications)
            }
        }
    }, [data])

    const handleLoadMore = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage().then(res => {
                const newItems: SystemNotification[] = res.data?.pages?.at(-1)?.data?.value?.notifications?.items || []
                newItems.forEach(item => addNoti(item))
            })
        }
    }

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
                            ) : !notification.length ? (
                                <ScrollView
                                    className="flex-1 w-full"
                                    contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}
                                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                                >
                                    <View className="flex-col gap-2 items-center">
                                        <Text className="text-muted-foreground text-lg font-semibold italic tracking-wider">
                                            Không có thông báo nào
                                        </Text>
                                        <Pressable
                                            className="flex-row gap-3 items-center px-4 py-2 rounded-full active:bg-[var(--click-bg)]"
                                            onPress={onRefresh}
                                        >
                                            <Text className="text-foreground text-base font-semibold tracking-wider capitalize">Thử lại</Text>
                                            {refreshing ? (
                                                <SpinningIcon icon={<RefreshCcw className="text-foreground" size={15} />} />
                                            ) : (
                                                <RefreshCcw className="text-foreground" size={15} />
                                            )}
                                        </Pressable>
                                    </View>
                                </ScrollView>
                            ) : (
                                <View className='flex-1 flex-col w-full'>
                                    <FlashList<SystemNotification>
                                        data={notification}
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
                    {notiCount > 0 && notiCount < 10 && (
                        <View className='absolute top-0 right-0 px-2 py-1 rounded-full bg-red-500 items-center'>
                            <Text className='text-xs font-bold'>{notiCount}</Text>
                        </View>
                    )}
                    {notiCount > 9 && (
                        <View className='absolute top-0 right-[-8] px-2 py-1 rounded-full bg-red-500 items-center'>
                            <Text className='text-xs font-bold'>9 +</Text>
                        </View>
                    )}
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
