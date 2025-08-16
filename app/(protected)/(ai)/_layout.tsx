import { Stack } from 'expo-router'

export default function AiLayout() {

    return (
        <Stack>
            <Stack.Screen name="ai-chat-session-screen" options={{ headerTitle: 'Lịch sử trò chuyện', headerShadowVisible: false }} />
            <Stack.Screen name="ai-chat-screen" options={{ headerTitle: '', headerShadowVisible: false }} />
        </Stack>
    )
}
