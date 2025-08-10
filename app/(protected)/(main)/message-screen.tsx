import * as React from 'react'
import GroupChatModule from '../../../components/message-screen/group-chat-module'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { Text } from '../../../components/ui/text'
import { useLocalSearchParams } from 'expo-router'
import PrivateChatModule from '../../../components/message-screen/private-chat-module'
import { Shield } from '../../../lib/icons/Shield'
import { Users } from '../../../lib/icons/Users'

export default function MessagesScreen() {
    const { type } = useLocalSearchParams()
    const [value, setValue] = useState('group')

    useEffect(() => {
        if (type) {
            setValue(type as string)
        }
    }, [type])

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
                            <View className='flex-row gap-2 items-center'>
                                <Users className='text-foreground' size={17} />
                                <Text className='text-sm font-semibold tracking-wider'>Nhóm cộng đồng</Text>
                            </View>
                        </TabsTrigger>
                        <TabsTrigger value='private' className='flex-1'>
                            <View className='flex-row gap-2 items-center'>
                                <Shield className='text-foreground' size={17} />
                                <Text className='text-sm font-semibold tracking-wider'>Tư vấn riêng</Text>
                            </View>
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
