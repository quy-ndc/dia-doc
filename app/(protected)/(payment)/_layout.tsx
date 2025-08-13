import { Stack } from 'expo-router'

export default function PaymentLayout() {

    return (
        <Stack>
            <Stack.Screen name="payment-screen" options={{ headerTitle: 'Thanh toán', headerShadowVisible: false }} />
            <Stack.Screen name="payment-status" options={{ headerTitle: ' ', headerShadowVisible: false }} />
        </Stack>
    )
}
