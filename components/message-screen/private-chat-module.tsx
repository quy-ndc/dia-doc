import React, { useCallback, useEffect, useState } from 'react'
import { View, ScrollView, RefreshControl, Dimensions, Pressable } from 'react-native'
import { useGroupChatQuery } from '../../service/query/chat-query'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ConversationType } from '../../assets/enum/conversation-type'
import { QueryKeys } from '../../assets/enum/query'
import { FlashList } from '@shopify/flash-list'
import { GroupChat } from '../../assets/types/chat/group'
import ChatItem from '../chat-screen/chat-item'
import GroupChatSkeleton from '../common/skeleton/chat-group-skeleton'
import ErrorDisplay from '../common/error-display'
import { usePrivateMessageStore } from '../../store/usePrivateMessage'
import { Text } from '../../components/ui/text'
import { GlobalColor } from '../../global-color'
import { router } from 'expo-router'
import useUserStore from '../../store/userStore'
import { UserRole } from '../../assets/enum/user-role'

const { width, height } = Dimensions.get('window')

export default function PrivateChatModule() {
    const queryClient = useQueryClient()
    const { user } = useUserStore()
    const [refreshing, setRefreshing] = useState(false)
    const { setGroups, setLatestMessage, setGroupStatus } = usePrivateMessageStore()

    const { data, isLoading, isError, remove, refetch } = useQuery({
        ...useGroupChatQuery({
            Type: ConversationType.PRIVATE_CHAT
        }),
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000),
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) =>
                    query.queryKey[0] === QueryKeys.CHAT_MESSAGES,
            })
            queryClient.removeQueries({
                predicate: (query) => query.queryKey[0] === QueryKeys.CHAT_MESSAGES
            })
            queryClient.refetchQueries({
                predicate: (query) => query.queryKey[0] === QueryKeys.CHAT_MESSAGES
            })
        }
    })
    const groups: GroupChat[] = data?.data?.data?.items || []
    const groupIds: string[] = groups.map(group => group.id)

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        queryClient.invalidateQueries({ queryKey: [QueryKeys.CHAT_MESSAGES] })
        remove()
        refetch().finally(() => setRefreshing(false))
    }, [queryClient, refetch])

    useEffect(() => {
        if (groupIds.length > 0 && data && !isLoading) {
            setGroups(groupIds)

            groups.forEach(group => {
                if (group.status === 0) {
                    setGroupStatus(group.id, false)
                }
                if (group.lastMessage) {
                    setLatestMessage(group.id, group.lastMessage)
                }
            })
        }
    }, [data])

    return (
        <>
            {isLoading ? (
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    <View
                        style={{ width: width, height: height * 0.8 }}
                        className="flex-1 justify-center items-center"
                    >
                        <GroupChatSkeleton />
                    </View>
                </ScrollView>
            ) : isError || groups.length === 0 ? (
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    <View
                        style={{ width: width, height: height * 0.8 }}
                        className="flex-1 justify-center items-center"
                    >
                        <ErrorDisplay
                            onRefresh={onRefresh}
                            refreshing={refreshing}
                            text='Không có cuộc tư vấn nào.'
                        />
                    </View>
                </ScrollView>
            ) : (
                <ScrollView
                    className="w-full pb-5"
                    contentContainerStyle={{ alignItems: 'center' }}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    decelerationRate={'normal'}
                >
                    <View
                        className='pt-2 px-2'
                        style={{ width: width, height: height * 0.8 }}
                    >
                        <FlashList<GroupChat>
                            data={groups}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) => (
                                <ChatItem item={item} />
                            )}
                            estimatedItemSize={100}
                        />
                    </View>
                </ScrollView>
            )}
            {user.role == UserRole.PATIENT && (
                <View className='absolute flex-col gap-3 bottom-11 right-0'>
                    <Pressable
                        style={{ backgroundColor: GlobalColor.BLUE_NEON_BORDER }}
                        className='flex-row items-center px-4 py-2 rounded-full active:opacity-60 self-end'
                        onPress={() => router.push('/service-package-screen')}
                    >
                        <Text className='text-base text-white font-semibold tracking-wider'>Mua gói tư vấn</Text>
                    </Pressable>
                    <Pressable
                        style={{ backgroundColor: GlobalColor.BLUE_NEON_BORDER }}
                        className='flex-row items-center px-4 py-2 rounded-full active:opacity-60 self-end'
                        onPress={() => router.push('/doctor-list-screen')}
                    >
                        <Text className='text-base text-white font-semibold tracking-wider'>Đặt lịch với bác sĩ</Text>
                    </Pressable>
                </View>
            )}
        </>
    )
}
