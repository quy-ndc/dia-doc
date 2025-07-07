import * as React from 'react'
import { Text } from '../../../components/ui/text'
import { Dimensions, Pressable, RefreshControl, ScrollView, View } from 'react-native'
import { useAiChatMutation, useAiChatQuery } from '../../../service/query/ai-query'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Input } from '../../../components/ui/input'
import { useCallback, useEffect, useRef, useState } from 'react'
import SpinningIcon from '../../../components/common/icons/spinning-icon'
import { SendHorizontal } from '../../../lib/icons/SendHorizontal'
import { Loader } from '../../../lib/icons/Loader'
import { FlashList } from '@shopify/flash-list'
import { AIMessage } from '../../../assets/types/chat/ai-message'
import { AIChatRole } from '../../../assets/enum/ai-chat-role'
import { TextMessage } from '../../../components/chat-screen/text-message'
import useUserStore from '../../../store/userStore'
import { AI_SERVICE_ENDPOINT } from '@env'


const { height } = Dimensions.get('window')

export default function AiChatScreen() {
    const flashListRef = useRef<FlashList<AIMessage>>(null)
    const [aiMessages, setAiMessages] = useState<AIMessage[]>([])
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
    } = useAiChatMutation()

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        removeAiChatData()
        refetchAiChatData().finally(() => setRefreshing(false))
    }, [removeAiChatData, refetchAiChatData])

    const handleSend = async () => {
        const userMessage: AIMessage = {
            role: AIChatRole.USER,
            content: newMessage,
            metadata: {
                timestamp: new Date().toISOString()
            },
            createdAt: new Date().toISOString()
        }
        setAiMessages(prev => [...prev, userMessage])

        mutateAiMessage({
            user_id: user.id,
            query: newMessage
        })
    }

    useEffect(() => {
        console.log(aiChatData)
        if (!aiChatData || isErrorAiChatData || aiChatData?.data?.messages.length == 0 || aiChatData.status !== 200) return

        const aiMessages: AIMessage[] = aiChatData?.data?.messages

        setAiMessages(aiMessages)
    }, [aiChatData])

    useEffect(() => {
        console.log(aiResponseData)
        if (!aiResponseData?.data?.message || isErrorAiResponseData || aiResponseData.status !== 200) return

        const newAiMessage: AIMessage = aiResponseData?.data?.message
        setAiMessages(prev => [...prev, newAiMessage])
        setNewMessage('')
    }, [aiResponseData])

    return (
        <View className='flex-1'>
            <View className='relative h-full w-full items-center justify-center'>
                <View className='flex-1 flex-col w-full px-3'>
                    {isLoadingAiChatData ? (
                        <View className='flex-1 w-full items-center justify-center'>
                            <SpinningIcon icon={<Loader className='text-foreground' size={20} />} />
                        </View>
                    ) : aiMessages.length == 0 && !isLoadingAiChatData ? (
                        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                            <View
                                style={{ height: height * 0.8 }}
                                className='flex-1 w-full items-center justify-center'>
                                <Text className='text-lg tracking-widest font-semibold text-center'>Hãy bắt đầu trò chuyện với AI</Text>
                            </View>
                        </ScrollView>
                    ) : (
                        <FlashList<AIMessage>
                            ref={flashListRef}
                            data={aiMessages}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) => {
                                return (
                                    <TextMessage
                                        name={item.role == AIChatRole.USER ? 'Bạn' : 'AI'}
                                        image={item.role == AIChatRole.USER ? user.avatar : 'https://media.licdn.com/dms/image/D4D12AQEvIMjoRlFGZA/article-cover_image-shrink_600_2000/0/1697794459592?e=2147483647&v=beta&t=r-U9j2bHdCsI7vP62SrP6dodTFq_Laj4KQB26c_Zvoo'}
                                        content={item.content}
                                        time={item.createdAt}
                                        isOwn={item.role == AIChatRole.USER}
                                    />
                                )
                            }}
                            estimatedItemSize={200}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                            keyboardShouldPersistTaps="handled"
                            scrollEventThrottle={16}
                            onContentSizeChange={() => {
                                flashListRef.current?.scrollToEnd({ animated: false })
                            }}
                            onEndReachedThreshold={0.5}
                        />
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