import { router, Stack } from 'expo-router'
import IconButton from '../../../components/common/icon-button'
import { History } from '../../../lib/icons/History'

export default function AiLayout() {

    return (
        <Stack>
            <Stack.Screen name="ai-chat-session-screen" options={{ headerTitle: 'Lịch sử trò chuyện', headerShadowVisible: false }} />
            <Stack.Screen
                name="ai-chat-screen"
                options={{
                    headerTitle: '',
                    headerShadowVisible: false,
                    headerRight: () =>
                        <IconButton
                            icon={<History className='text-foreground' size={18} />}
                            buttonSize={3}
                            possition={'other'}
                            onPress={() => {
                                router.push("/ai-chat-session-screen")
                            }}
                        />
                }}
            />
        </Stack>
    )
}
