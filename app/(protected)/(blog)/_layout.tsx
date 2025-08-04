import { Stack } from 'expo-router'

export default function BlogLayout() {

    return (
        <Stack>
            <Stack.Screen name="blog-detail-screen" options={{ headerTitle: '', headerShadowVisible: false }} />
            <Stack.Screen name="liked-blog-screen" options={{ headerTitle: 'Bài viết đã thích', headerShadowVisible: false }} />
            <Stack.Screen name="saved-blog-screen" options={{ headerTitle: 'Bài viết đã lưu', headerShadowVisible: false }} />
        </Stack>
    )
}
