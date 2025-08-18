import * as React from 'react'
import { Dimensions, Pressable, RefreshControl, ScrollView, View } from 'react-native'
import { useAiChatMutation, useAiChatQuery } from '../../service/query/ai-query'
import { useQuery } from '@tanstack/react-query'
import { Input } from '../ui/input'
import { useCallback, useEffect, useRef, useState } from 'react'
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

const { height } = Dimensions.get('window')

interface BaseMessage extends AIMessage {
    type: 'user' | 'ai';
}

type ChatItem =
    | BaseMessage
    | { type: 'loading' }
    | { type: 'error' }
    | { type: 'success'; content: string }

type Prop = {
    session_id: string
    useExternal: boolean
}

export default function AiChatModule({ session_id, useExternal }: Prop) {
    const flashListRef = useRef<FlashList<ChatItem>>(null)
    const { user } = useUserStore()
    const [refreshing, setRefreshing] = useState(false)
    const [newMessage, setNewMessage] = useState('')
    const [aiMessages, setAiMessages] = useState<ChatItem[]>([])

    const { addMessage, setMessages } = useAiMessageStore()

    const {
        data: aiChatData,
        isLoading: isLoadingAiChatData,
        refetch: refetchAiChatData,
        remove: removeAiChatData
    } = useQuery({
        ...useAiChatQuery({ session_id: session_id! }),
        enabled: !!session_id
    })

    const {
        mutateAsync: mutateAiMessage,
        isLoading: isLoadingAiResponseData,
    } = useAiChatMutation()

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        removeAiChatData()
        refetchAiChatData().finally(() => setRefreshing(false))
    }, [refetchAiChatData])

    const handleSend = async () => {
        const messageContent = newMessage
        setNewMessage('')

        const userMessage: ChatItem = {
            id: `temp_user_${Date.now()}`,
            session_id: session_id!,
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

        // Store the user message
        const userMessageForStore: AIMessage = {
            id: userMessage.id,
            session_id: session_id!,
            user_id: userMessage.user_id,
            content: userMessage.content,
            role: userMessage.role,
            created_at: userMessage.created_at,
            updated_at: userMessage.updated_at
        }
        addMessage(session_id!, userMessageForStore)

        try {
            const response = await mutateAiMessage({
                content: messageContent,
                user_id: user.id,
                session_id: session_id!,
                external_knowledge: useExternal
            })

            if (response?.data && response.status === 200) {
                const responseData = response?.data?.data
                const aiMessage: ChatItem = {
                    id: responseData.id || `ai_${Date.now()}`,
                    session_id: session_id!,
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

                // Store the AI message
                const aiMessageForStore: AIMessage = {
                    id: aiMessage.id,
                    session_id: session_id!,
                    user_id: aiMessage.user_id,
                    content: aiMessage.content,
                    role: aiMessage.role,
                    created_at: aiMessage.created_at,
                    updated_at: aiMessage.updated_at
                }
                addMessage(session_id!, aiMessageForStore)
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

    // Load initial messages from API
    useEffect(() => {
        if (aiChatData?.data && aiChatData.status === 200) {
            const apiMessages: ChatItem[] = aiChatData.data.data.map((message: any) => ({
                id: message.id,
                session_id: message.session_id,
                user_id: message.user_id,
                content: message.content,
                role: message.role,
                created_at: message.created_at,
                updated_at: message.updated_at,
                type: message.role === AIChatRole.USER ? 'user' : 'ai'
            }))

            setAiMessages(apiMessages)

            // Store messages in the global store
            const messagesForStore: AIMessage[] = apiMessages
                .filter((msg): msg is BaseMessage => 'id' in msg)
                .map(msg => ({
                    id: msg.id,
                    session_id: msg.session_id,
                    user_id: msg.user_id,
                    content: msg.content,
                    role: msg.role,
                    created_at: msg.created_at,
                    updated_at: msg.updated_at
                }))
            setMessages(session_id!, messagesForStore)
        }
    }, [aiChatData, session_id])

    return (
        <View className='flex-1'>
            <View className='relative h-full w-full items-center justify-center'>
                <View className='flex-1 flex-col w-full px-3'>
                    {isLoadingAiChatData ? (
                        <View className='flex-1 w-full items-center justify-center'>
                            <SpinningIcon icon={<Loader className='text-foreground' size={20} />} />
                        </View>
                    ) : aiMessages.length == 0 ? (
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