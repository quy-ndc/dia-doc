import { Stack } from 'expo-router'
import useUserStore from '../../store/userStore'
import useAppAccessStore from '../../store/appAccessStore'
import { Redirect } from 'expo-router'
import { useChannel } from 'ably/react'
import { GLOBAL_CHAT_EVENT_CHANNEL, GLOBAL_CHAT_EVENT_NAME } from '@env'
import { GlobalMessageEvent, Message } from '../../assets/types/chat/message'
import { useMessageStore } from '../../store/useMessage'
import { ThemeToggle } from '../../components/ThemeToggle'
import { useAppRefetchOnFocus } from '../../util/hook/useAppRefreshOnFocus'

export default function ProtectedLayout() {
    const { user } = useUserStore()
    const { shouldInvalidate } = useAppAccessStore()
    const { addMessage, setLatestMessage } = useMessageStore()
    // useAppRefetchOnFocus()

    if (!user.isAuthenticated) {
        return <Redirect href="/landing-screen" />
    }

    if (user.isAuthenticated && !user.isSetUp) {
        return <Redirect href="/set-up-screen" />
    }

    // const { } = useChannel(`${GLOBAL_CHAT_EVENT_CHANNEL}`, `${GLOBAL_CHAT_EVENT_NAME}`, (payload) => {
    //     const response: GlobalMessageEvent = JSON.parse(payload.data.Value.Message)
    //     const newMessage: Message = {
    //         content: response.MessageContent,
    //         createdDate: response.CreationDate,
    //         id: response.MessageId,
    //         type: response.Type,
    //         user: {
    //             avatar: response.Sender.Avatar,
    //             fullName: response.Sender.FullName,
    //             id: response.Sender.SenderId
    //         }
    //     }
    //     addMessage(response.GroupId, newMessage)
    //     setLatestMessage(response.GroupId, newMessage)
    // })

    return (
        <Stack>
            <Stack.Screen name="(main)" options={{ headerShown: false }} />
            <Stack.Screen name="chat-screen" options={{ headerTitle: '' }} />
            <Stack.Screen name="edit-profile-screen" options={{ headerTitle: '' }} />
            <Stack.Screen name="ai-chat-screen" options={{ headerTitle: '', headerShadowVisible: false }} />
            <Stack.Screen name="blog-detail-screen" options={{ headerTitle: '', headerShadowVisible: false }} />
            <Stack.Screen name="liked-blog-screen" options={{ headerTitle: 'Bài viết đã thích' }} />
            <Stack.Screen name="saved-blog-screen" options={{ headerTitle: 'Bài viết đã lưu' }} />
            <Stack.Screen name="update-record-screen" options={{ headerTitle: '', headerShadowVisible: false, headerRight: () => <ThemeToggle /> }} />
        </Stack>
    )
}
