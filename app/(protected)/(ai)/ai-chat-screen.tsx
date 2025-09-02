import * as React from 'react'
import AiChatModule from '../../../components/ai-chat-screen/ai-chat-module'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { truncateText } from '../../../util/truncate-text'
import EmptyAiChatModule from '../../../components/ai-chat-screen/empty-ai-chat-module'
import IconButton from '../../../components/common/icon-button'
import { History } from '../../../lib/icons/History'
import ExternalSwitch from '../../../components/ai-chat-screen/external-switch'
import { useState } from 'react'

export default function AiChatScreen() {

    const { id, title, external } = useLocalSearchParams()

    const [useExternal, setUseExternal] = useState(external == 'true')

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: truncateText(title as string, 20) || '',
                    headerShadowVisible: false,
                    headerRight: () => id == undefined ?
                        <IconButton
                            icon={<History className='text-foreground' size={18} />}
                            buttonSize={3}
                            possition={'other'}
                            onPress={() => {
                                router.push("/ai-chat-session-screen")
                            }}
                        /> :
                        null
                }}
            />
            {id == undefined ? (
                <EmptyAiChatModule useExternal={useExternal} />
            ) : (
                <AiChatModule
                    session_id={id as string}
                    useExternal={useExternal}
                />
            )}
        </>
    )
}