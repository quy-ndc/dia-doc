import { Stack } from 'expo-router'
import useUserStore from '../../store/userStore'
import { Redirect } from 'expo-router'
import { Text } from '../../components/ui/text'
import { ThemeToggle } from '../../components/ThemeToggle'


export default function ProtectedLayout() {

    const { user } = useUserStore()

    if (user.isAuthenticated && !user.isSetUp) {
        return <Redirect href="/set-up-screen" />
    }

    if (user.isAuthenticated && user.isSetUp) {
        return <Redirect href="/(protected)/(main)" />
    }

    return (
        <Stack>
            <Stack.Screen name='landing-screen' options={{ headerShown: false }} />
            <Stack.Screen name='authen-screen' options={{ headerShown: false }} />
            <Stack.Screen name='register-screen' options={{ headerShown: false }} />
            <Stack.Screen name='otp-screen' options={{ headerShown: false }} />
            <Stack.Screen name='set-up-screen' options={{
                headerTitle: () => <Text className='text-2xl font-bold tracking-wider'>Thiết lập hồ sơ</Text>,
                headerLeft: () => null,
                headerRight: () => <ThemeToggle />,
                headerShadowVisible: false,
                headerBackVisible: false,
                headerTitleAlign: 'center'
            }} />
        </Stack>
    )
}
