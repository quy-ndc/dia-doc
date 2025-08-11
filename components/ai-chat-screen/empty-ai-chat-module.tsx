import * as React from 'react'
import { Dimensions, Pressable, RefreshControl, ScrollView, View } from 'react-native'
import { useAiChatMutation, useAiSessionQuery } from '../../service/query/ai-query'
import { Input } from '../ui/input'
import { useCallback, useRef, useState } from 'react'
import SpinningIcon from '../common/icons/spinning-icon'
import { SendHorizontal } from '../../lib/icons/SendHorizontal'
import { Loader } from '../../lib/icons/Loader'
import { FlashList } from '@shopify/flash-list'
import { AIMessage } from '../../assets/types/chat/ai-message'
import { AIChatRole } from '../../assets/enum/ai-chat-role'
import useUserStore from '../../store/userStore'
import { AiSuccessResponse } from './ai-success-response'
import { AiFailResponse } from './ai-fail-response'
import { AiLoadingResponse } from './ai-loading-response'
import ErrorDisplay from '../common/error-display'
import { AiMessage } from './ai-message'
import { ScrollableSuggestion } from './ai-suggestion'
import { useAiMessageStore } from '../../store/useAiMessage'
import { useQueryClient } from '@tanstack/react-query'

const { height } = Dimensions.get('window')

type ChatItem =
    | (AIMessage & { type?: 'user' | 'ai' })
    | { type: 'loading' }
    | { type: 'error' }
    | { type: 'success'; content: string }


export default function EmptyAiChatModule() {

    const flashListRef = useRef<FlashList<ChatItem>>(null)
    const { user } = useUserStore()
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
    const [aiMessages, setAiMessages] = useState<ChatItem[]>([])
    const [refreshing, setRefreshing] = useState(false)
    const [newMessage, setNewMessage] = useState('')

    const { addSession, addMessages } = useAiMessageStore()
    const queryClient = useQueryClient()

    const {
        mutateAsync: mutateAiMessage,
        data: aiResponseData,
        isLoading: isLoadingAiResponseData,
        isError: isErrorAiResponseData
    } = useAiChatMutation()

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        setAiMessages([])
        setCurrentSessionId(null)
        setRefreshing(false)
    }, [])

    const handleSend = async () => {
        const messageContent = newMessage
        const userMessage: ChatItem = {
            id: `temp_user_${Date.now()}`,
            session_id: currentSessionId || '',
            user_id: user.id || '',
            content: messageContent,
            role: AIChatRole.USER,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            type: 'user'
        }

        setAiMessages(prev => [
            ...prev,
            userMessage,
            { type: 'loading' }
        ])
        setNewMessage('')

        try {
            const response = await mutateAiMessage({
                content: messageContent,
                user_id: user.id,
                session_id: currentSessionId || ''
            })

            if (response?.data && response.status === 200) {
                const responseData = response?.data?.data
                const sessionId = responseData.session_id

                const aiMessage: ChatItem = {
                    id: responseData.id || `ai_${Date.now()}`,
                    session_id: sessionId,
                    user_id: responseData.user_id || '',
                    content: responseData.content || '',
                    role: responseData.role || AIChatRole.ASSISTANT,
                    created_at: responseData.created_at || new Date().toISOString(),
                    updated_at: responseData.updated_at || new Date().toISOString(),
                    type: 'ai'
                }

                setAiMessages(prev => [
                    ...prev.slice(0, -1),
                    aiMessage
                ])

                if (!currentSessionId && sessionId) {
                    setCurrentSessionId(sessionId)

                    const newSession = {
                        id: sessionId,
                        user_id: user.id,
                        title: 'Cuộc trò chuyện mới',
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                    }

                    addSession(newSession)

                    const userMessageForStore: AIMessage = {
                        id: userMessage.id,
                        session_id: sessionId,
                        user_id: userMessage.user_id,
                        content: userMessage.content,
                        role: userMessage.role,
                        created_at: userMessage.created_at,
                        updated_at: userMessage.updated_at
                    }

                    const aiMessageForStore: AIMessage = {
                        id: aiMessage.id,
                        session_id: sessionId,
                        user_id: aiMessage.user_id,
                        content: aiMessage.content,
                        role: aiMessage.role,
                        created_at: aiMessage.created_at,
                        updated_at: aiMessage.updated_at
                    }

                    addMessages(sessionId, [userMessageForStore, aiMessageForStore])

                    queryClient.invalidateQueries({
                        queryKey: useAiSessionQuery({ user_id: user.id }).queryKey
                    })
                }
            } else {
                setAiMessages(prev => [
                    ...prev.slice(0, -1),
                    { type: 'error' } as ChatItem
                ])
            }
        } catch (error) {
            setAiMessages(prev => [
                ...prev.slice(0, -1),
                { type: 'error' } as ChatItem
            ])
        }
    }



    return (
        <View className='flex-1'>
            <View className='relative h-full w-full items-center justify-center'>
                <View className='flex-1 flex-col w-full px-3'>
                    {aiMessages.length == 0 ? (
                        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                            <View className='flex-1 items-center justify-center' style={{ height: height * 0.7 }}>
                                <ErrorDisplay
                                    onRefresh={onRefresh}
                                    refreshing={refreshing}
                                    text='Bắt đầu trò chuyện nào'
                                />
                            </View>
                        </ScrollView>
                    ) : (
                        <FlashList<ChatItem>
                            ref={flashListRef}
                            data={aiMessages}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) => {
                                if (item.type === 'loading') return <AiLoadingResponse />
                                if (item.type === 'error') return <AiFailResponse />
                                if (item.type === 'success') return <AiSuccessResponse content={item.content} />
                                if (item.type === 'user' || item.type === 'ai') {
                                    return (
                                        <AiMessage
                                            image={item.role == AIChatRole.USER ? user.avatar : require('../../assets/images/ai-helper-avatar.png')}
                                            content={item.content}
                                            isOwn={item.role == AIChatRole.USER}
                                        />
                                    )
                                }
                                return null
                            }}
                            estimatedItemSize={200}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                            keyboardShouldPersistTaps="handled"
                            scrollEventThrottle={16}
                            onContentSizeChange={() => {
                                flashListRef.current?.scrollToEnd({ animated: true })
                            }}
                            onEndReachedThreshold={0.5}
                        />
                    )}
                </View>
                <ScrollableSuggestion setMessage={setNewMessage} />
                <View className='flex-row gap-1 justify-center items-center p-2'>
                    <Input
                        className='flex-1 rounded-full bg-[var(--input-bg)]'
                        value={newMessage}
                        onChangeText={setNewMessage}
                        placeholder="Aa"
                        returnKeyType="send"
                        multiline
                        autoCapitalize='sentences'
                    />
                    <Pressable
                        className={`
                            p-4 rounded-full active:bg-[var(--click-bg)] disabled:opacity
                            ${newMessage == '' && 'opacity-50'}
                        `}
                        onPress={handleSend}
                        disabled={newMessage == '' || isLoadingAiResponseData}
                    >
                        {isLoadingAiResponseData ? (
                            <SpinningIcon icon={<Loader className='text-foreground' size={20} />} />
                        ) : (
                            <SendHorizontal className='text-foreground' size={20} />
                        )}
                    </Pressable>
                </View>
            </View>
        </View>
    )
}