import * as React from 'react'
import AiChatItem from '../../../components/ai-chat-screen/ai-chat-item'
import { Dimensions, RefreshControl, ScrollView, View } from 'react-native'
import { useAiSessionQuery } from '../../../service/query/ai-query'
import { useQuery } from '@tanstack/react-query'
import useUserStore from '../../../store/userStore'
import { AiSession } from '../../../assets/types/chat/ai-session'
import { FlashList } from '@shopify/flash-list'
import { useCallback, useState, useEffect } from 'react'
import { useAiMessageStore } from '../../../store/useAiMessage'
import AiSessionSkeleton from '../../../components/common/skeleton/ai-session-skeleton'
import ErrorDisplay from '../../../components/common/error-display'

const { height } = Dimensions.get('window')

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

    const apiSessions: AiSession[] = data?.data?.data || []

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
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    <View
                        style={{ height: height * 0.8 }}
                        className='flex-1 items-center justify-center'
                    >
                        <ErrorDisplay
                            text={'Không có lịch sử chat để hiển thị'}
                            onRefresh={onRefresh}
                            refreshing={refreshing}
                        />
                    </View>
                </ScrollView> 
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
        </View>
    )
}