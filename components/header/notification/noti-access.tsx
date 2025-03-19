import * as React from 'react';
import { Dimensions, Modal, Pressable, ScrollView, View } from 'react-native';
import { Bell } from '../../../lib/icons/Bell';
import IconButton from '../../common/icon-button';
import { useState } from 'react';
import { Text } from '../../ui/text'
import { X } from '../../../lib/icons/X';
import NotificationItem from './noti-item';

const { height, width } = Dimensions.get('window');

export default function NotificationAccess() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Modal
                visible={open}
                animationType="fade"
                transparent
                onRequestClose={() => setOpen(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View
                        style={{ width: width * 0.9, height: height * 0.9 }}
                        className="flex-col justify-center items-center bg-[var(--noti-bg)] rounded-2xl"
                    >
                        <View className='flex-row justify-between items-center w-full border-b border-[var(--noti-divider)]'>
                            <IconButton
                                icon={<X className='text-foreground' size={22} />}
                                buttonSize={4}
                                onPress={() => setOpen(false)}
                                possition='other'
                            />
                            <Text className='text-lg tracking-wider font-bold capitalize'>Thông Báo</Text>
                            <View className='p-4 opacity-0'><X size={22} /></View>
                        </View>
                        <ScrollView className='w-full'>
                            <View className='flex-col items-center'>
                                <NotificationItem />
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            <IconButton
                icon={<Bell className="text-foreground" size={21} strokeWidth={1.25} />}
                buttonSize={3}
                onPress={() => setOpen(true)}
                possition='other'
            />
        </>
    );
}
