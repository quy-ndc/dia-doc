import * as React from 'react'
import AiChatModule from '../../components/ai-chat-screen/ai-chat-module'
import { Stack, useLocalSearchParams } from 'expo-router'
import { truncateText } from '../../util/truncate-text';



export default function AiChatScreen() {

    const { title } = useLocalSearchParams();

    return (
        <>
            <Stack.Screen options={{ headerTitle: truncateText(title as string, 20) || '' }} />
            <AiChatModule />
        </>
    )
}