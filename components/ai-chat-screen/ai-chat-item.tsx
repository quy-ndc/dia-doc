import * as React from 'react'
import { Dimensions, Modal, Pressable, View } from 'react-native'
import { Text } from '../../components/ui/text'
import { router } from 'expo-router'
import { AiSession } from '../../assets/types/chat/ai-session'
import { formatDateBlog } from '../../util/format-date-post'
import { useEffect, useState } from 'react'
import { Trash2 } from '../../lib/icons/Trash2'
import { X } from '../../lib/icons/X'
import { useDeleteAiSessionMutation } from '../../service/query/ai-query'
import SpinningIcon from '../common/icons/spinning-icon'
import { Loader } from '../../lib/icons/Loader'
import { useAiMessageStore } from '../../store/useAiMessage'


type Prop = {
    item: AiSession
}

const { width } = Dimensions.get('window')

export default function AiChatItem({ item }: Prop) {

    const [visible, setVisible] = useState(false)
    const { removeSession } = useAiMessageStore()

    const { mutateAsync, isLoading, data, isError } = useDeleteAiSessionMutation()

    const onDelete = async () => {
        await mutateAsync({ session_id: item.id })
    }

    useEffect(() => {
        if (data && data.status === 200) {
            removeSession(item.id)
            setVisible(false)
        } else if (isError) {
            setVisible(false)
        }
    }, [data, isError, removeSession, item.id])

    return (
        <>
            <View className='px-2 py-1'>
                <Pressable
                    className='flex-col w-full p-3 gap-2 bg-[var(--blog-bg)] active:bg-[var(--click-bg)] rounded-md relative'
                    onLongPress={() => setVisible(true)}
                    onPress={() => router.push({
                        pathname: 'ai-chat-screen',
                        params: {
                            title: item.title,
                            id: item.id
                        }
                    })}
                >
                    <Text className='text-lg font-bold capitalize tracking-wider'>{item.title}</Text>
                    <Text className='text-sm tracking-wider'>{formatDateBlog(item.created_at)}</Text>
                </Pressable>
            </View>
            <Modal
                visible={visible}
                transparent
                animationType='fade'
                onRequestClose={() => setVisible(false)}
            >
                <Pressable
                    className='flex-1 justify-center items-center bg-black/50'
                    onPress={() => setVisible(false)}
                >
                    <View
                        className='flex-col bg-[var(--noti-bg)] rounded-md'
                        style={{ minWidth: width * 0.5 }}
                    >
                        <Pressable
                            className={`flex-row gap-3 px-3 py-3 w-full items-center rounded-md active:bg-[var(--click-bg)] ${isLoading ? 'opacity-50' : ''}`}
                            onPress={onDelete}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <SpinningIcon icon={<Loader className='text-foreground' size={17} />} />
                            ) : (
                                <Trash2 className='text-foreground' size={18} />
                            )}
                            <Text className='text-left text-base tracking-widest'>Xóa cuộc trò chuyện</Text>
                        </Pressable>
                        <Pressable
                            className={`flex-row gap-3 px-3 py-3 w-full items-center rounded-md active:bg-[var(--click-bg)] ${isLoading ? 'opacity-50' : ''}`}
                            onPress={() => setVisible(false)}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <SpinningIcon icon={<Loader className='text-foreground' size={17} />} />
                            ) : (
                                <X className='text-foreground' size={18} />
                            )}
                            <Text className='text-left text-base tracking-widest'>Hủy</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>
        </>
    )
}