import * as Ably from 'ably'
import { AblyProvider } from 'ably/react'
import React from 'react'
import { ChatClient, ChatClientProvider } from '@ably/chat'
import useUserStore from '../../store/userStore'
import { ABLY_CLIENT_KEY } from '@env'

export default function AblyWrapper({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {

    const { user } = useUserStore()
    const client = new Ably.Realtime({ key: ABLY_CLIENT_KEY, clientId: user.id })
    const chatClient = new ChatClient(client)

    return (
        <AblyProvider client={client}>
            <ChatClientProvider client={chatClient}>
                {children}
            </ChatClientProvider>
        </AblyProvider>
    )
}