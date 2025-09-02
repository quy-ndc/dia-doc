import * as React from 'react'
import { Pressable } from 'react-native'
import { Text } from '../ui/text'
import { Image } from 'expo-image'
import { truncateText } from '../../util/truncate-text'
import { GroupChat } from '../../assets/types/chat/group'
import { useAddToGroupMutation } from '../../service/query/chat-query'
import { useEffect } from 'react'

type Prop = {
    item: GroupChat
    patientId: string
    setVisible: (visible: boolean) => void
}

export default function GroupItem({ item, patientId, setVisible }: Prop) {

    const { mutateAsync, data, isError, isLoading } = useAddToGroupMutation()

    const handleAddToGroup = async () => {
        await mutateAsync({
            conversationId: item.id,
            userIds: [patientId]
        })
    }

    useEffect(() => {
        if (!data || data.status !== 200 || isError) return
        setVisible(false)
    }, [data, isLoading])

    return (
        <Pressable
            onPress={handleAddToGroup}
            className={`flex-row items-center gap-3 py-2 px-3 active:bg-[var(--click-bg)] rounded-2xl ${isLoading ? 'opacity-50' : ''}`}
            disabled={isLoading}
        >
            <Image
                style={{ width: 40, height: 40, borderRadius: 1000 }}
                source={item.avatar}
                contentFit='cover'
            />
            <Text className={`font-medium text-base tracking-wider`}>
                {truncateText(item.name, 18)}
            </Text>
        </Pressable>
    )
}