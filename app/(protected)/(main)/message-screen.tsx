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
import { useInfiniteQuery } from '@tanstack/react-query'
import { useServicePackageQuery } from '../../../service/query/user-query'

export default function MessagesScreen() {
    const { type } = useLocalSearchParams()
    const [value, setValue] = useState('group')

    useEffect(() => {
        if (type) {
            setValue(type as string)
        }
    }, [type])

    const {
        data,
        isError,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
        refetch,
        remove,
        isLoading,
    } = useInfiniteQuery({
        ...useServicePackageQuery({
            pageSize: 7,
            sortBy: 'createdAt',
            sortDirection: 1
        }),
        getNextPageParam: (lastPage) => {
            const posts = lastPage?.data?.data || undefined
            return posts?.hasNextPage ? posts.nextCursor : undefined
        },
        keepPreviousData: false,
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000)
    })

    console.log(data)

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
