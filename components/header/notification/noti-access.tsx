import * as React from 'react';
import { Dimensions, Modal, Pressable, ScrollView, View } from 'react-native';
import { Bell } from '../../../lib/icons/Bell';
import IconButton from '../../common/icon-button';
import { useState } from 'react';
import { Text } from '../../ui/text'
import { X } from '../../../lib/icons/X';
import NotificationItem from './noti-item';
import useNotificationStore from '../../../store/notificationStore';
import { Button } from '../../ui/button';
import { FlashList } from '@shopify/flash-list';

const { height, width } = Dimensions.get('window');

export default function NotificationAccess() {

    const [open, setOpen] = useState(false);

    const { notification, notiCount, addNoti, removeNoti, resetNoti, increaseCount, decreaseCount, clearCount } = useNotificationStore()

    const onModalOpen = () => {
        setOpen(true)
        clearCount()
    }

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
                    <View
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
                        <View className='flex-1 w-full'>
                            <FlashList
                                data={notification}
                                // ref={listRef}
                                keyExtractor={(_, index) => index.toString()}
                                renderItem={({ item }) => <NotificationItem text={item} />}
                                estimatedItemSize={100}
                                // onScroll={handleScroll}
                                scrollEventThrottle={16}
                            />
                        </View>
                    </View>
                </Pressable>
            </Modal>

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
        </>
    );
}
