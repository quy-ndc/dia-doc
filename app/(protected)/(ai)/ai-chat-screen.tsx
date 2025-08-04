import * as React from 'react'
import AiChatModule from '../../../components/ai-chat-screen/ai-chat-module'
import { Stack, useLocalSearchParams } from 'expo-router'
import { truncateText } from '../../../util/truncate-text'
import EmptyAiChatModule from '../../../components/ai-chat-screen/empty-ai-chat-module'

export default function AiChatScreen() {

    const { id, title } = useLocalSearchParams()

    return (
        <>
            <Stack.Screen options={{ headerTitle: truncateText(title as string, 20) || '' }} />
            {id == undefined ? (
                <EmptyAiChatModule />
            ) : (
                <AiChatModule session_id={id as string} />
            )}
        </>
    )
}