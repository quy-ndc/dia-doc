import * as React from 'react'
import GroupChatModule from '../../../components/message-screen/group-chat-module'
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Text } from '../../../components/ui/text';
import { useLocalSearchParams } from 'expo-router';
import PrivateChatModule from '../../../components/message-screen/private-chat-module';

export default function MessagesScreen() {
    const { type } = useLocalSearchParams();
    const [value, setValue] = useState('group');

    useEffect(() => {
        if (type) {
            setValue(type as string);
        }
    }, [type]);

    return (
        <>
            <View className='px-4'>
                <Tabs
                    value={value}
                    onValueChange={setValue}
                    className='w-full flex-col gap-1.5'
                >
                    <TabsList className='flex-row w-full'>
                        <TabsTrigger value='group' className='flex-1'>
                            <Text className='text-base font-semibold tracking-wider'>Nhóm cộng đồng</Text>
                        </TabsTrigger>
                        <TabsTrigger value='private' className='flex-1'>
                            <Text className='text-base font-semibold tracking-wider'>Tư vấn riêng</Text>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value='group'>
                        <GroupChatModule />
                    </TabsContent>
                    <TabsContent value='private'>
                        <PrivateChatModule />
                    </TabsContent>
                </Tabs>
            </View>
        </>
    )
}
