import * as React from 'react'
import AiChatModule from '../../../components/ai-chat-screen/ai-chat-module'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { truncateText } from '../../../util/truncate-text'
import EmptyAiChatModule from '../../../components/ai-chat-screen/empty-ai-chat-module'
import IconButton from '../../../components/common/icon-button'
import { History } from '../../../lib/icons/History'
import ExternalSwitch from '../../../components/ai-chat-screen/external-switch'

export default function AiChatScreen() {

    const { id, title } = useLocalSearchParams()

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
                        /> : <ExternalSwitch id={id as string} title={title as string} />
                }}
            />
            {id == undefined ? (
                <EmptyAiChatModule />
            ) : (
                <AiChatModule session_id={id as string} />
            )}
        </>
    )
}