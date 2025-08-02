import * as React from 'react'
import AiChatItem from '../../../components/ai-chat-screen/ai-chat-item'
import { Pressable, RefreshControl, View } from 'react-native'
import { GlobalColor } from '../../../global-color'
import { Plus } from '../../../lib/icons/Plus'
import { useAiSessionQuery } from '../../../service/query/ai-query'
import { useQuery } from '@tanstack/react-query'
import useUserStore from '../../../store/userStore'
import { AiSession } from '../../../assets/types/chat/ai-session'
import { FlashList } from '@shopify/flash-list'
import { router } from 'expo-router'
import { useCallback, useState, useEffect } from 'react'
import { useAiMessageStore } from '../../../store/useAiMessage'
import AiSessionSkeleton from '../../../components/common/skeleton/ai-session-skeleton'
import ErrorDisplay from '../../../components/common/error-display'


export default function AiChatSessionScreen() {

    const { user } = useUserStore()
    const [refreshing, setRefreshing] = useState(false)
    const { setSessions, sessionsList } = useAiMessageStore()

    const { data, isLoading, isError, refetch, remove } = useQuery({
        ...useAiSessionQuery({
            user_id: user.id
        }),
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000)
    })

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        remove()
        refetch().finally(() => setRefreshing(false))
    }, [refetch])

    const apiSessions: AiSession[] = data?.data?.value?.data || []

    useEffect(() => {
        if (apiSessions.length > 0) {
            setSessions(apiSessions)
        }
    }, [apiSessions, setSessions])

    return (
        <View className='flex-1 relative'>
            {isLoading ? (
                <AiSessionSkeleton />
            ) : sessionsList.length == 0 || isError ? (
                <ErrorDisplay
                    text={'Không có lịch sử chat để hiển thị'}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                />
            ) : (
                <FlashList<AiSession>
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    data={sessionsList}
                    renderItem={({ item }) =>
                        <AiChatItem item={item} />
                    }
                    keyExtractor={item => item.id}
                    estimatedItemSize={100}
                />
            )}
            <Pressable
                style={{ backgroundColor: GlobalColor.BLUE_NEON_BORDER }}
                className='flex absolute bottom-5 right-5 p-4 items-center justify-center rounded-full active:opacity-80'
                onPress={() => router.push({
                    pathname: 'ai-chat-screen',
                    params: {
                        title: 'Cuộc trò chuyện mới'
                    }
                })}
            >
                <Plus className='text-white' size={17} />
            </Pressable>
        </View>
    )
}