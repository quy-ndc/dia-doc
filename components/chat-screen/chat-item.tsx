import * as React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '../ui/text';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image'
import { truncateText } from '../../util/truncate-text';
import { formatDateBlog } from '../../util/format-date-post';
import { MessageType } from '../../assets/enum/message-type';
import { useMessageStore } from '../../store/useMessage';
import { usePrivateMessageStore } from '../../store/usePrivateMessage';
import { GroupChat } from '../../assets/types/chat/group';
import { ConversationType } from '../../assets/enum/conversation-type';

type Prop = {
    item: GroupChat
}

export default function ChatItem({ item }: Prop) {
    const router = useRouter()
    const { getLatestMessage: getGroupLatestMessage } = useMessageStore()
    const { getLatestMessage: getPrivateLatestMessage } = usePrivateMessageStore()

    const handleChatSelect = () => {
        router.push({
            pathname: '/chat-screen',
            params: {
                id: item.id,
                title: item.name,
                image: item.avatar,
                type: item.conversationType
            }
        })
    }

    const isPrivateChat = item.conversationType === ConversationType.PRIVATE_CHAT
    const latestMessage = isPrivateChat 
        ? getPrivateLatestMessage(item.id)
        : getGroupLatestMessage(item.id)

    const displayMessage = latestMessage
        ? `${latestMessage.participant.fullName}: ${latestMessage.type === MessageType.PICTURE ? 'Đã gửi một ảnh' : truncateText(latestMessage.content as string, 25)}`
        : 'Nhóm này chưa có tin nhắn'

    return (
        <Pressable
            onPress={handleChatSelect}
            className={`flex-row justify-between items-center py-2 px-3 active:bg-[var(--click-bg)] rounded-xl`}
        >
            <Image
                style={{ width: 60, height: 60, borderRadius: 1000 }}
                source={item.avatar}
                contentFit='cover'
            />
            <View className='flex-col justify-center gap-2 w-[80%]'>
                <View className='flex-row justify-between items-center'>
                    <Text className={`text-xl tracking-wider`}>{truncateText(item.name, 18)}</Text>
                    {latestMessage?.createdDate && (
                        <Text className={`text-sm tracking-wider`}>{formatDateBlog(latestMessage.createdDate)}</Text>
                    )}
                </View>
                <Text className={`text-base tracking-wider`}>
                    {displayMessage}
                </Text>
            </View>
        </Pressable>
    );
}