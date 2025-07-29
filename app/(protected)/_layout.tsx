import { Stack } from 'expo-router'
import useUserStore from '../../store/userStore'
import { Redirect } from 'expo-router'
import { useChannel } from 'ably/react'
import { GLOBAL_CHAT_EVENT_CHANNEL, GLOBAL_CHAT_EVENT_NAME } from '@env'
import { GlobalMessageEvent, Message } from '../../assets/types/chat/message'
import { useMessageStore } from '../../store/useMessage'
import { MessageType } from '../../assets/enum/message-type'
import { UserRoleNumber } from '../../assets/enum/user-role'
import { View } from 'react-native'
import { Text } from '../../components/ui/text'
import { useSaveFcmTokenMutation } from '../../service/query/auth-query'

export default function ProtectedLayout() {
    const { user } = useUserStore()
    const { addMessage, setLatestMessage } = useMessageStore()
    const { mutateAsync, data } = useSaveFcmTokenMutation()

    if (!user.isAuthenticated) {
        return <Redirect href="/landing-screen" />
    }

    if (user.isAuthenticated && !user.isSetUp) {
        return <Redirect href="/set-up-screen" />
    }

    const { } = useChannel(`${GLOBAL_CHAT_EVENT_CHANNEL}`, `${GLOBAL_CHAT_EVENT_NAME}`, (payload) => {
        const response: GlobalMessageEvent = JSON.parse(payload.data.Value.Message)
        const newMessage: Message = {
            id: response.MessageId,
            content: response.MessageContent,
            type: response.MessageType as MessageType,
            fileAttachment: {
                publicUrl: response.FileAttachment,
                type: 0
            },
            createdDate: response.CreatedDate,
            participant: {
                id: response.Sender.SenderId,
                fullName: response.Sender.FullName,
                avatar: response.Sender.Avatar,
                role: UserRoleNumber.PATIENT
            }
        }

        addMessage(response.Conversation.ConversationId, newMessage)
        setLatestMessage(response.Conversation.ConversationId, newMessage)
    })

    return (
        <Stack>
            <Stack.Screen name="(main)" options={{ headerShown: false }} />
            <Stack.Screen name="chat-screen" options={{ headerTitle: '' }} />
            <Stack.Screen name="edit-profile-screen" options={{ headerTitle: '' }} />
            <Stack.Screen name="ai-chat-screen" options={{ headerTitle: '', headerShadowVisible: false }} />
            <Stack.Screen name="blog-detail-screen" options={{ headerTitle: '', headerShadowVisible: false }} />
            <Stack.Screen name="liked-blog-screen" options={{ headerTitle: 'Bài viết đã thích', headerShadowVisible: false }} />
            <Stack.Screen name="saved-blog-screen" options={{ headerTitle: 'Bài viết đã lưu', headerShadowVisible: false }} />
            <Stack.Screen name="update-record-screen" options={{ headerTitle: '', headerShadowVisible: false }} />
            <Stack.Screen name="health-record-history-screen" options={{ headerTitle: '', headerShadowVisible: false }} />
            <Stack.Screen
                name="manage-care-plan-screen"
                options={{
                    headerTitle: () =>
                        <View className='flex-col'>
                            <Text className='text-lg font-bold tracking-wider capitalize'>
                                Quản lý lịch trình
                            </Text>
                            <Text className='text-sm text-[var(--fade-text-color)] tracking-wider'>
                                Thay đổi lịch trình hằng ngày
                            </Text>
                        </View>,
                    headerShadowVisible: false
                }}
            />
            <Stack.Screen name="add-edit-care-plan-screen" options={{ headerTitle: '', headerShadowVisible: false }} />
        </Stack>
    )
}
