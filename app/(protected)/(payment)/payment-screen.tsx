import * as React from 'react'
import { Linking, View } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { WebView, WebViewNavigation } from 'react-native-webview'

export default function PaymentScreen() {

    const { url } = useLocalSearchParams()

    const handleCallback = async (event: WebViewNavigation) => {
        if (event.url.includes('myapp://payment-status')) {
            Linking.openURL(event.url)
        }
    }

    return (
        <>
            <View className='flex-1 relative p-3'>
                <WebView
                    source={{ uri: url as string }}
                    style={{ flex: 1 }}
                    onNavigationStateChange={handleCallback}
                />
            </View>
        </>
    )
}