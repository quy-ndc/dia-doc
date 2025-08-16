import * as React from 'react'
import { View, KeyboardAvoidingView, Platform, ScrollView, Pressable, RefreshControl } from 'react-native'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { Message } from '../../assets/types/chat/message'
import { TextMessage } from './text-message'
import { SendHorizontal } from '../../lib/icons/SendHorizontal'
import { ImageMessage } from './image-message'
import { Animated as RNAnimated } from 'react-native'
import { ChevronDown } from '../../lib/icons/ChevronDown'
import VoiceRecord from './voice-record'
import { ChevronRight } from '../../lib/icons/ChevronRight'
import useUserStore from '../../store/userStore'
import { Text } from '../ui/text'
import { MessageType } from '../../assets/enum/message-type'
import { useChatMessagesQuery, useSendMessageMutation } from '../../service/query/chat-query'
import Toast from 'react-native-toast-message'
import { useInfiniteQuery } from '@tanstack/react-query'
import SpinningIcon from '../common/icons/spinning-icon'
import { Loader } from '../../lib/icons/Loader'
import { usePrivateMessageStore } from '../../store/usePrivateMessage'
import { FlashList } from '@shopify/flash-list'
import { useDebounce } from '../../util/hook/useDebounce'
import ErrorDisplay from '../common/error-display'
import { useMessages } from '@ably/chat'
import { UserRole, UserRoleNumber } from '../../assets/enum/user-role'

type Prop = {
    groupId: string
    setIsCameraOn: (state: boolean) => void
}

export default function PrivateChatModule({
    groupId,
    setIsCameraOn,
}: Prop) {
    const { groups, setMessages, addMessages, addMessage } = usePrivateMessageStore()
    const { user } = useUserStore()
    const [showScrollButton, setShowScrollButton] = useState(false)
    const listRef = useRef<FlashList<Message>>(null)
    const opacity = useRef(new RNAnimated.Value(0)).current
    const [showUtil, setShowUtil] = useState(true)
    const [newMessage, setNewMessage] = useState('')
    const [refreshing, setRefreshing] = useState(false)
    const [scrollOffsetY, setScrollOffsetY] = useState(0)
    const debouncedOffsetY = useDebounce(scrollOffsetY, 500)
    const [disableSend, setDisableSend] = useState(false)

    const {
        data,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
        refetch,
        remove,
        isError,
        isLoading: isLoadingMessages,
    } = useInfiniteQuery({
        ...useChatMessagesQuery({
            conversationId: groupId,
            PageSize: 20
        }),
        getNextPageParam: (lastPage) => {
            const messages = lastPage.data?.data?.items
            return messages?.hasNextPage ? messages.nextCursor : undefined
        },
        keepPreviousData: false,
    })

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        remove()
        refetch().finally(() => setRefreshing(false))
    }, [refetch])

    useEffect(() => {
        if (!data) return
        const messages: Message[] = data.pages.at(-1)?.data?.data?.items ?? []
        if (messages.length) {
            if (data.pages.length === 1) {
                setMessages(groupId, messages)
            } else {
                addMessages(groupId, messages)
            }
        }
    }, [data])

    const onTextChange = (m: string) => {
        setNewMessage(m)
        if (showUtil && m !== '') {
            setShowUtil(false)
        }
        if (!showUtil && m == '') {
            setShowUtil(true)
        }
    }

    const toggleVisibility = (visible: boolean) => {
        RNAnimated.timing(opacity, {
            toValue: visible ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            setShowScrollButton(visible)
        })
    }

    const handleScroll = (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y
        setScrollOffsetY(offsetY)

        if (offsetY < 400 && !showScrollButton) {
            toggleVisibility(true)
        } else if (offsetY > 400 && showScrollButton) {
            toggleVisibility(false)
        }
    }

    useEffect(() => {
        if (debouncedOffsetY <= 200) {
            if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage()
            }
        }
    }, [debouncedOffsetY, hasNextPage, isFetchingNextPage])

    const scrollToTop = () => {
        listRef.current?.scrollToEnd()
    }

    const { data: messageData, mutateAsync, isLoading } = useSendMessageMutation()
    const { send } = useMessages({
        listener: (event) => {
            addMessage(groupId, event.message.metadata.messageToSend as Message)
        },
    })
    const handleSend = async () => {
        await mutateAsync({
            conversationId: groupId,
            conversationType: 1,
            content: newMessage,
            mediaId: ' ',
            messageType: MessageType.TEXT
        })
    }

    useEffect(() => {
        if (messageData?.data?.code == 'conversation_er_07') {
            setNewMessage('')
            setDisableSend(true)
        }
        if (!messageData || messageData.status !== 200) return
        const messageToSend: Message = {
            id: messageData.data.data.messageId,
            content: newMessage,
            type: MessageType.TEXT,
            fileAttachment: {
                publicUrl: '',
                type: 0
            },
            createdDate: new Date().toISOString(),
            participant: {
                id: user.id,
                fullName: user.fullName,
                avatar: user.avatar,
                role: user.role == UserRole.PATIENT ? UserRoleNumber.PATIENT : UserRoleNumber.DOCTOR
            }
        }
        send({ text: ' ', metadata: { messageToSend } })
        setNewMessage('')
    }, [messageData, isLoading])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
        >
            <View className='relative h-full w-full items-center justify-center'>
                {isLoadingMessages ? (
                    <View className='flex-1 w-full h-full justify-center items-center'>
                        <SpinningIcon icon={<Loader className='text-foreground' size={30} />} />
                    </View>
                ) : isError || groups[groupId].messages.length == 0 ? (
                    <ScrollView
                        className="flex-1 w-full"
                        contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    >
                        <ErrorDisplay
                            text={'Không có tin nhắn nào'}
                            onRefresh={onRefresh}
                            refreshing={refreshing}
                        />
                    </ScrollView>
                ) : (
                    <View className='flex-1 flex-col w-full px-3'>
                        <FlashList<Message>
                            data={groups[groupId].messages}
                            ref={listRef}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) => {
                                if (item.type == MessageType.TEXT) {
                                    return <TextMessage message={item} />
                                } else {
                                    return <ImageMessage message={item} />
                                }
                            }}
                            estimatedItemSize={200}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                            onScroll={handleScroll}
                            keyboardShouldPersistTaps="handled"
                            scrollEventThrottle={16}
                            onEndReachedThreshold={0.5}
                        />
                    </View>
                )}

                <View className='flex-row gap-1 justify-center items-center pt-2 pb-2'>
                    <View className={`flex-row items-center ${!showUtil && 'hidden'}`}>
                        <VoiceRecord setNewMessage={setNewMessage} />
                    </View>
                    <Pressable
                        className={`px-3 py-4 rounded-xl active:bg-[var(--click-bg)] ${showUtil && 'hidden'}`}
                        onPress={() => setShowUtil(true)}
                    >
                        <ChevronRight className='text-foreground' size={20} />
                    </Pressable>
                    <Input
                        style={{ opacity: disableSend ? 0.7 : 1 }}
                        aria-disabled={disableSend}
                        className='flex-1 rounded-full bg-[var(--input-bg)]'
                        value={newMessage}
                        onChangeText={onTextChange}
                        onFocus={() => setShowUtil(false)}
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
                        disabled={newMessage == ''}
                    >
                        {isLoading ? (
                            <SpinningIcon icon={<Loader className='text-foreground' size={20} />} />
                        ) : (
                            <SendHorizontal className='text-foreground' size={20} />
                        )}
                    </Pressable>
                </View>

                <RNAnimated.View style={{ opacity, position: 'absolute', bottom: 70, left: '50%', transform: [{ translateX: -20 }] }}>
                    <Pressable
                        className='p-2 rounded-full justify-center items-center bg-[var(--go-up-btn-bg)] active:bg-[var(--go-up-click-bg)]'
                        onPress={scrollToTop}
                    >
                        <ChevronDown className='text-[var(--go-up-btn-icon)]' size={22} />
                    </Pressable>
                </RNAnimated.View>
            </View>
        </KeyboardAvoidingView>
    )
} 