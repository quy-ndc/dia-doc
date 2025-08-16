import { FlashList } from '@shopify/flash-list'
import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { Dimensions, RefreshControl, ScrollView, View } from 'react-native'
import ChatItem from '../chat-screen/chat-item'
import { useGroupChatQuery } from '../../service/query/chat-query'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { GroupChat } from '../../assets/types/chat/group'
import { useMessageStore } from '../../store/useMessage'
import GroupChatSkeleton from '../common/skeleton/chat-group-skeleton'
import { QueryKeys } from '../../assets/enum/query'
import ErrorDisplay from '../common/error-display'
import { ConversationType } from '../../assets/enum/conversation-type'

const { width, height } = Dimensions.get('window')

export default function GroupChatModule() {

    const queryClient = useQueryClient()
    const [refreshing, setRefreshing] = useState(false)
    const { setGroups, setLatestMessage } = useMessageStore()

    const { data, isLoading, isError, remove, refetch } = useQuery({
        ...useGroupChatQuery({
            Type: ConversationType.GROUP_CHAT
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
                if (group.lastMessage) {
                    setLatestMessage(group.id, group.lastMessage)
                }
            })
        }
    }, [data])

    if (isLoading) return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <GroupChatSkeleton />
        </ScrollView>
    )

    if (isError || groups.length === 0) {
        return (
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View
                    style={{ width: width, height: height * 0.7 }}
                    className="flex-1 justify-center items-center"
                >
                    <ErrorDisplay
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                        text='Không có cuộc trò chuyện nào.'
                    />
                </View>
            </ScrollView>
        )
    }

    return (
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
    )
}
