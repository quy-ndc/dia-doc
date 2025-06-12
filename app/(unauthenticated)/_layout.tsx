import { Stack } from 'expo-router';
import useUserStore from '../../store/userStore';
import { Redirect } from 'expo-router';

export default function ProtectedLayout() {
    const { user } = useUserStore();

    // if (user.isAuthenticated && !user.isSetUp) {
    //     return <Redirect href="/set-up-screen" />;
    // }

    // if (user.isAuthenticated && user.isSetUp) {
    //     return <Redirect href="/(protected)/(main)" />;
    // }

    return (
        <Stack>
            <Stack.Screen name='authen-screen' options={{ headerShown: false }} />
            <Stack.Screen name='set-up-screen' options={{ headerShown: false }} />
        </Stack>
    );
}
