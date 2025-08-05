import * as React from 'react'
import { Modal, View } from 'react-native'
import { Image } from 'expo-image'
import { Text } from '../../components/ui/text'
import { Stack, useLocalSearchParams } from 'expo-router'
import ChatModule from '../../components/chat-screen/chat-module'
import { useState } from 'react'
import { AllFeaturesEnabled, ChatRoomProvider } from '@ably/chat'
import { truncateText } from '../../util/truncate-text'
import { ConversationType } from '../../assets/enum/conversation-type'
import IconButton from '../../components/common/icon-button'
import { Phone } from '../../lib/icons/Phone'
import PrivateChatModule from '../../components/chat-screen/private-chat-module'
import { useRouter } from 'expo-router'
import useUserStore from '../../store/userStore'

export default function ChatScreen() {
    const { id, title, image, type } = useLocalSearchParams()
    const router = useRouter()
    const { user } = useUserStore()
    const [isCameraOn, setIsCameraOn] = useState(false)

    const handleStartCall = () => {
        router.push({
            pathname: '/(protected)/video-call-screen',
            params: {
                userId: user.id,
                targetUserId: id as string,
                mode: 'call'
            }
        })
    }

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: () =>
                        <View className={`flex-row gap-4 items-center`}>
                            <Image
                                style={{ width: 30, height: 30, borderRadius: 1000 }}
                                source={image}
                                contentFit='cover'
                            />
                            <Text className='text-lg font-bold tracking-wider'>{truncateText(title as string, 23)}</Text>
                        </View>,
                    headerRight: () => type as string == ConversationType.PRIVATE_CHAT.toString() ?
                        <IconButton
                            icon={<Phone className='text-foreground' size={17} />}
                            buttonSize={3}
                            possition={'other'}
                            onPress={handleStartCall}
                        /> : null
                }}
            />
            {/* <Modal
                visible={isCameraOn}
                animationType='fade'
                onRequestClose={() => setIsCameraOn(false)}
            >
                <CameraModule
                    setIsCameraOn={setIsCameraOn}
                    handleSendImage={handleImageMessage}
                />
            </Modal> */}
            <ChatRoomProvider id={id} options={AllFeaturesEnabled}>
                {type as string === ConversationType.PRIVATE_CHAT.toString() ? (
                    <PrivateChatModule
                        groupId={id as string}
                        setIsCameraOn={setIsCameraOn}
                    />
                ) : (
                    <ChatModule
                        groupId={id as string}
                        setIsCameraOn={setIsCameraOn}
                    />
                )}
            </ChatRoomProvider>
        </>
    )
}