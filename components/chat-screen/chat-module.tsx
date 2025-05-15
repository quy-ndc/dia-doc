import * as React from 'react'
import { View, KeyboardAvoidingView, Platform, ScrollView, Pressable, RefreshControl } from 'react-native'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Input } from '../../components/ui/input'
import { Message } from '../../assets/types/chat/message'
import { TextMessage } from './text-message'
import { SendHorizontal } from '../../lib/icons/SendHorizontal'
import GalleryAccess from './gallery-access'
import { ImageMessage } from './image-message'
import CameraAccess from './camera-access'
import { Animated as RNAnimated } from 'react-native'
import { ChevronDown } from '../../lib/icons/ChevronDown'
import { OrderBy, useChatConnection, useMessages, useOccupancy, usePresence, usePresenceListener } from '@ably/chat'
import { AtSign } from '../../lib/icons/AtSign'
import VoiceRecord from './voice-record'
import { ChevronRight } from '../../lib/icons/ChevronRight'
import useUserStore from '../../store/userStore'
import { Text } from '../../components/ui/text'
import { UserState } from '../../assets/enum/user-status'
import { useAppState } from '../../util/hook/useAppState'
import { useChannel } from 'ably/react'
import { MessageType } from '../../assets/enum/message-type'
import { useChatMessagesQuery, useSendMessageMutation } from '../../service/query/chat-query'
import Toast from 'react-native-toast-message'
import { useLocalSearchParams } from 'expo-router'
import { useInfiniteQuery } from '@tanstack/react-query'
import SpinningIcon from '../common/icons/spinning-icon'
import { Loader } from '../../lib/icons/Loader'
import { RefreshCcw } from '../../lib/icons/RefreshCcw'
import { CHAT_LATEST_MESSAGE_CHANNEL } from '@env'

type Prop = {
    groupId: string
    setIsCameraOn: (state: boolean) => void
    // newMessage: string
    // setNewMessage: (newMessage: string) => void
    // messages: Message[]
    // handleSendMessage: (newMessage: string) => void
    // handleSendImage: (image: string) => void
    onHistory: (historyItems: Message[]) => void
    onReceived: (message: Message) => void
}

export default function ChatModule({
    groupId,
    setIsCameraOn,
    // newMessage,
    // setNewMessage,
    // messages,
    // handleSendMessage,
    // handleSendImage,
    onHistory,
    onReceived
}: Prop) {

    const { publish } = useChannel(CHAT_LATEST_MESSAGE_CHANNEL)

    console.log('room', CHAT_LATEST_MESSAGE_CHANNEL)

    const { user } = useUserStore()
    const [showScrollButton, setShowScrollButton] = useState(false)
    const scrollViewRef = useRef<ScrollView>(null)
    const opacity = useRef(new RNAnimated.Value(0)).current
    const [showUtil, setShowUtil] = useState(true)
    const isBackground = useAppState()

    const [lastOffsetY, setLastOffsetY] = useState(0)
    const [messages, setMessages] = useState<Message[]>([])
    const [newMessage, setNewMessage] = useState('')
    const [refreshing, setRefreshing] = useState(false)

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
            groupId: groupId,
            PageSize: 13
        }),
        getNextPageParam: (lastPage) => {
            const messages = lastPage.data?.value?.messages
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
        const newMessages: Message[] = data.pages.at(-1)?.data?.value?.messages?.items ?? []
        if (newMessages.length) {
            setMessages(prev => [...newMessages, ...prev])
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

        const isScrollingUp = offsetY < lastOffsetY

        if (isScrollingUp && offsetY < 300 && !showScrollButton) {
            toggleVisibility(true)
        } else if (!isScrollingUp && offsetY > 300 && showScrollButton) {
            toggleVisibility(false)
        }

        if (offsetY <= 200) {
            console.log("Top reached")
            if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage()
            }
        }

        setLastOffsetY(offsetY)
    }

    useEffect(() => {
        if (scrollViewRef.current) {
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true })
            }, 10)
        }
    }, [messages])

    const scrollToTop = () => {
        scrollViewRef.current?.scrollToEnd({ animated: true })
    }

    const handleReceive = (receivedMessage: Message) => {
        setMessages((prevMessages) => [...prevMessages, receivedMessage])
    }

    const { mutateAsync, isLoading } = useSendMessageMutation()

    const { send } = useMessages({
        listener: (message) => {
            handleReceive({
                id: message.message.clientId,
                type: message.message.metadata.type as MessageType,
                content: message.message.text,
                createdDate: message.message.createdAt.toISOString(),
                isRead: true,
                user: {
                    avatar: message.message.metadata.avatar as string,
                    fullName: message.message.metadata.name as string,
                    id: message.message.clientId
                }
            })
            console.log('Received message: ', message)
        },
    })

    const handleSend = async () => {
        const response = await mutateAsync({
            content: newMessage,
            groupId: groupId,
            type: MessageType.TEXT
        })
        if (response.success) {
            await send({
                text: newMessage,
                metadata: {
                    type: MessageType.TEXT,
                    name: user.fullname,
                    avatar: user.avatar
                }
            })

            // publish("last_read_message", {
            //     Text: "message text",
            //     Ditme: 'aaaa'
            // })
            setNewMessage('')
        }
        else {
            Toast.show({
                type: 'error',
                text1: 'Có lỗi xảy ra khi gửi tin nhắn',
                visibilityTime: 200
            })
        }
    }

    const { presenceData, error } = usePresenceListener({
        listener: (event) => {
            console.log('Presence event: ', event)
        },
    })

    const { update } = usePresence({
        enterWithData: { status: UserState.ONLINE },
        leaveWithData: { status: UserState.OFFLINE },
    })

    useEffect(() => {
        if (isBackground) {
            update({ status: UserState.OFFLINE })
        } else {
            update({ status: UserState.ONLINE })
        }
    }, [isBackground])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
        >
            <View className='relative h-full w-full items-center justify-center'>

                {/* <Pressable className="absolute top-2 left-1/2 -translate-x-1/2 flex-row gap-2 items-center z-50 px-4 py-2 rounded-full bg-blue-500 active:bg-blue-400">
                    <Text className='text-white text-sm font-semibold tracking-widest'>Tin nhắn mới</Text>
                    <ChevronUp className='text-white' size={17} />
                </Pressable> */}

                {isLoadingMessages ? (
                    <View className='flex-1 w-full h-full justify-center items-center'>
                        <SpinningIcon icon={<Loader className='text-foreground' size={30} />} />
                    </View>
                ) : isError ? (
                    <ScrollView
                        className="flex-1 w-full"
                        contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    >
                        <View className="flex-col gap-2 items-center">
                            <Text className="text-muted-foreground text-lg font-semibold italic tracking-wider">
                                Không có tin nhắn nào
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
                ) : (
                    <ScrollView
                        className='w-full flex-col px-5'
                        ref={scrollViewRef}
                        contentContainerStyle={{
                            flexGrow: 1,
                            justifyContent: 'flex-end'
                        }}
                        keyboardShouldPersistTaps="handled"
                        onScroll={handleScroll}

                    >
                        {messages.map((message, index) => (
                            message.type == MessageType.TEXT ?
                                <TextMessage
                                    key={index}
                                    name={message.user.fullName}
                                    image={message.user.avatar}
                                    content={message.content}
                                    time={message.createdDate}
                                    isOwn={message.user.id == user.id}
                                />
                                :
                                <ImageMessage
                                    key={index}
                                    content={message.content}
                                    name={message.user.fullName}
                                    avatar={message.user.avatar}
                                    time={message.createdDate}
                                    isOwn={message.user.id == user.id}
                                />
                        ))}
                    </ScrollView>
                )}

                <View className='flex-row gap-1 justify-center items-center pt-2 pb-2'>
                    <View className={`flex-row items-center ${!showUtil && 'hidden'}`}>
                        {/* <CameraAccess setIsCameraOn={(state) => setIsCameraOn(state)} /> */}
                        {/* <GalleryAccess onImagePick={(image) => handleSendImage(image)} /> */}
                        <VoiceRecord setNewMessage={setNewMessage} />
                        <Pressable
                            className='px-3 py-4 rounded-xl active:bg-[var(--click-bg)]'
                            onPress={() => setNewMessage(`@AI ${newMessage}`)}
                        >
                            <AtSign className='text-foreground' size={20} />
                        </Pressable>
                    </View>
                    <Pressable
                        className={`px-3 py-4 rounded-xl active:bg-[var(--click-bg)] ${showUtil && 'hidden'}`}
                        onPress={() => setShowUtil(true)}
                    >
                        <ChevronRight className='text-foreground' size={20} />
                    </Pressable>
                    <Input
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

                <RNAnimated.View
                    style={{
                        opacity,
                        position: 'absolute',
                        bottom: 70,
                        left: '50%',
                        transform: [{ translateX: -20 }],
                    }}
                >
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