import { Stack } from 'expo-router';
import useUserStore from '../../store/userStore';
import { Redirect } from 'expo-router';
import { useChannel } from 'ably/react';
import { GLOBAL_CHAT_EVENT_CHANNEL, GLOBAL_CHAT_EVENT_NAME } from '@env';
import { GlobalMessageEvent, Message } from '../../assets/types/chat/message';
import { useMessageStore } from '../../store/useMessage';

export default function ProtectedLayout() {
    const { user } = useUserStore();
    const { addMessage, setLatestMessage } = useMessageStore()

    if (!user.isAuthenticated) {
        return <Redirect href="/authen-screen" />;
    }

    if (user.isAuthenticated && !user.isSetUp) {
        return <Redirect href="/set-up-screen" />;
    }

    const { } = useChannel(`${GLOBAL_CHAT_EVENT_CHANNEL}`, `${GLOBAL_CHAT_EVENT_NAME}`, (payload) => {
        const response: GlobalMessageEvent = JSON.parse(payload.data.Value.Message)
        const newMessage: Message = {
            content: response.MessageContent,
            createdDate: response.CreationDate,
            id: response.MessageId,
            isRead: true,
            type: response.Type,
            user: {
                avatar: response.Sender.Avatar,
                fullName: response.Sender.FullName,
                id: response.Sender.SenderId
            }
        }
        console.log('new', newMessage)
        addMessage(response.GroupId, newMessage)
        setLatestMessage(response.GroupId, newMessage)
    })

    return (
        <Stack>
            <Stack.Screen name="(main)" options={{ headerShown: false }} />
            <Stack.Screen name="chat-screen" options={{ headerTitle: '' }} />
            <Stack.Screen name="edit-profile-page" options={{ headerTitle: '' }} />
            <Stack.Screen
                name="blog-detail-screen"
                options={{
                    headerTitle: '',
                    presentation: 'modal',
                    animation: 'slide_from_bottom',
                    gestureDirection: 'horizontal',
                }}
            />
        </Stack>
    );
}
