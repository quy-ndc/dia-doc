import * as Ably from 'ably';
import { AblyProvider } from 'ably/react';
import React, { useEffect } from 'react';
import { AllFeaturesEnabled, ChatClient, ChatClientProvider } from '@ably/chat';
import useUserStore from '../../store/userStore';


export default function AblyWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { user } = useUserStore()
    const client = new Ably.Realtime({ key: 'WhRbFA.8aOuBg:FgK9bmZmkI70w_TzKMwlowSKPfzDLy2HB5QAcPNKYYg', clientId: user.id });
    const chatClient = new ChatClient(client,);

    // const registerDevice = async () => {
    //     await client.push.activate()
    // }

    // useEffect(() => {
    //     registerDevice();
    // }, [])

    return (
        <AblyProvider client={client}>
            <ChatClientProvider client={chatClient}>
                {children}
            </ChatClientProvider>
        </AblyProvider>
    );
}