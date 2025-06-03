import { FlashList } from '@shopify/flash-list'
import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { Dimensions, RefreshControl, ScrollView, View, Text, Pressable } from 'react-native'
import ChatItem from '../../../components/chat-screen/chat-item'
import { useGroupChatQuery } from '../../../service/query/chat-query'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { GroupChat } from '../../../assets/types/chat/group'
import SpinningIcon from '../../../components/common/icons/spinning-icon'
import { RefreshCcw } from '../../../lib/icons/RefreshCcw'
import { useMessageStore } from '../../../store/useMessage'
import GroupChatSkeleton from '../../../components/common/skeleton/chat-group-skeleton'
import { QueryKeys } from '../../../assets/enum/query'

const { width } = Dimensions.get('window')

export default function MessagesScreen() {

    const queryClient = useQueryClient();
    const [refreshing, setRefreshing] = useState(false)
    const { addGroups, setLatestMessage } = useMessageStore()

    const { data,
        isLoading,
        isError,
        remove,
        refetch,
    } = useQuery(useGroupChatQuery({}))

    const groups: GroupChat[] = data?.data?.value?.groups?.items || []
    const groupIds: string[] = groups.map(group => group.id)

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        queryClient.invalidateQueries({ queryKey: [QueryKeys.CHAT_MESSAGES] })
        remove()
        refetch().finally(() => setRefreshing(false))
    }, [refetch])

    useEffect(() => {
        if (groupIds.length > 0 && data && !isLoading) {
            addGroups(groupIds)

            groups.forEach(group => {
                if (group.message) {
                    setLatestMessage(group.id, group.message)
                }
            })
        }
    }, [data])

    if (isLoading) {
        return (
            <GroupChatSkeleton />
        )
    }

    if (isError || groups.length === 0) {
        return (
            <ScrollView
                className="flex-1 w-full"
                contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View className="flex-col gap-2 items-center">
                    <Text className="text-muted-foreground text-lg font-semibold italic tracking-wider">
                        {isError
                            ? 'Đã xảy ra lỗi khi tải tin nhắn. Vuốt xuống để thử lại.'
                            : 'Không có cuộc trò chuyện nào.'
                        }
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
        )
    }

    return (
        <ScrollView
            className="w-full pb-5"
            contentContainerStyle={{ alignItems: 'center' }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            decelerationRate={'normal'}
        >
            <View style={{ width: width }}>
                <FlashList<GroupChat>
                    data={groups}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <ChatItem
                            id={item.id}
                            img={item.avatar}
                            name={item.name}
                            user={item.message ? item.message.user.fullName : undefined}
                            message={item.message ? item.message.content : undefined}
                            type={item.message ? item.message.type : undefined}
                            time={item.message ? item.message.createdDate : undefined}
                            hasNewMessage={item.message ? item.message.isRead : false}
                        />
                    )}
                    estimatedItemSize={100}
                />
            </View>
        </ScrollView >
    )
}
