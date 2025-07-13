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
import { TextMessage } from '../chat-screen/text-message'
import useUserStore from '../../store/userStore'
import { AiSuccessResponse } from './ai-success-response'
import { AiFailResponse } from './ai-fail-response'
import { AiLoadingResponse } from './ai-loading-response'
import ErrorDisplay from '../common/error-display'

const { height } = Dimensions.get('window')

type ChatItem =
    | (AIMessage & { type?: 'user' | 'ai' })
    | { type: 'loading' }
    | { type: 'error' }
    | { type: 'success'; content: string }

export default function AiChatModule() {
    const flashListRef = useRef<FlashList<ChatItem>>(null)
    const [aiMessages, setAiMessages] = useState<ChatItem[]>([])
    const [refreshing, setRefreshing] = useState(false)
    const [newMessage, setNewMessage] = useState('')
    const { user } = useUserStore()

    const {
        data: aiChatData,
        isLoading: isLoadingAiChatData,
        isError: isErrorAiChatData,
        refetch: refetchAiChatData,
        remove: removeAiChatData
    } = useQuery(useAiChatQuery(user.id))

    const {
        mutateAsync: mutateAiMessage,
        data: aiResponseData,
        isLoading: isLoadingAiResponseData,
        isError: isErrorAiResponseData,
        reset: resetAiResponse
    } = useAiChatMutation()

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        removeAiChatData()
        refetchAiChatData().finally(() => setRefreshing(false))
    }, [removeAiChatData, refetchAiChatData])

    useEffect(() => {
        if (!aiChatData || isErrorAiChatData || aiChatData?.data?.messages.length == 0 || aiChatData.status !== 200) return
        const chatItems: ChatItem[] = aiChatData.data.messages.map((msg: AIMessage) => ({ ...msg, type: msg.role === AIChatRole.USER ? 'user' : 'ai' }))
        setAiMessages(chatItems)
    }, [aiChatData])

    const handleSend = async () => {
        const userMessage: ChatItem = {
            role: AIChatRole.USER,
            content: newMessage,
            metadata: {
                timestamp: new Date().toISOString()
            },
            createdAt: new Date().toISOString(),
            type: 'user'
        }
        setAiMessages(prev => [
            ...prev,
            userMessage,
            { type: 'loading' }
        ])
        setNewMessage('')
        try {
            await mutateAiMessage({
                user_id: user.id,
                query: newMessage
            })
        } catch (e) {
            console.log("error sending message to ai", e)
        }
    }

    useEffect(() => {
        if (isLoadingAiResponseData) return
        setAiMessages(prev => {
            const lastIdx = prev.length - 1
            if (lastIdx < 0) return prev
            if (prev[lastIdx].type === 'loading') {
                if (aiResponseData?.data?.message && aiResponseData.status === 200) {
                    return [
                        ...prev.slice(0, lastIdx),
                        { type: 'success', content: aiResponseData.data.message.content }
                    ]
                } else {
                    return [
                        ...prev.slice(0, lastIdx),
                        { type: 'error' }
                    ]
                }
            }
            return prev
        })
    }, [aiResponseData, isLoadingAiResponseData])

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
                        <></>
                        // <FlashList<ChatItem>
                        //     ref={flashListRef}
                        //     data={aiMessages}
                        //     keyExtractor={(_, index) => index.toString()}
                        //     renderItem={({ item }) => {
                        //         if (item.type === 'loading') return <AiLoadingResponse />
                        //         if (item.type === 'error') return <AiFailResponse />
                        //         if (item.type === 'success') return <AiSuccessResponse content={item.content} />
                        //         if (item.type === 'user' || item.type === 'ai') {
                        //             return (
                        //                 <TextMessage
                        //                     name={item.role == AIChatRole.USER ? 'Bạn' : 'AI'}
                        //                     image={item.role == AIChatRole.USER ? user.avatar : 'https://media.licdn.com/dms/image/D4D12AQEvIMjoRlFGZA/article-cover_image-shrink_600_2000/0/1697794459592?e=2147483647&v=beta&t=r-U9j2bHdCsI7vP62SrP6dodTFq_Laj4KQB26c_Zvoo'}
                        //                     content={item.content}
                        //                     time={item.createdAt}
                        //                     isOwn={item.role == AIChatRole.USER}
                        //                 />
                        //             )
                        //         }
                        //         return null
                        //     }}
                        //     estimatedItemSize={200}
                        //     refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        //     keyboardShouldPersistTaps="handled"
                        //     scrollEventThrottle={16}
                        //     onContentSizeChange={() => {
                        //         flashListRef.current?.scrollToEnd({ animated: false })
                        //     }}
                        //     onEndReachedThreshold={0.5}
                        // />
                    )}
                </View>
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