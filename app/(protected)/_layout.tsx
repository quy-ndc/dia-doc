import { Stack } from 'expo-router'
import useUserStore from '../../store/userStore'
import { Redirect } from 'expo-router'

export default function ProtectedLayout() {
    const { user } = useUserStore()

    if (!user.isAuthenticated) {
        return <Redirect href="/authen-screen" />
    }

    if (user.isAuthenticated && !user.isSetUp) {
        return <Redirect href="/set-up-screen" />
    }

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
    )
}
