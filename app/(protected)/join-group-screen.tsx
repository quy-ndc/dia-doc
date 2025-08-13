import * as React from 'react'
import { Text } from '../../components/ui/text'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { useJoinAGroupMutation } from '../../service/query/chat-query'
import { View } from 'react-native'
import SpinningIcon from '../../components/common/icons/spinning-icon'
import { Loader } from '../../lib/icons/Loader'

export default function JoinGroupScreen() {

    const { group, user } = useLocalSearchParams()

    const { mutateAsync, data, isLoading, isError } = useJoinAGroupMutation()

    const handleJoin = async () => {
        await mutateAsync({
            conversationId: group as string,
            invitedBy: user as string
        })
    }

    useEffect(() => {
        handleJoin()
    }, [])

    useEffect(() => {
        if (!data || data.status !== 200 || isError) {
            router.replace('/(protected)/(main)')
        } else {
            router.replace({
                pathname: '/message-screen',
                params: { type: 'group' }
            })
        }
    }, [data, isLoading])


    return (
        <View className='flex-1 items-center justify-center gap-4'>
            <SpinningIcon icon={<Loader className='text-foreground' size={20} />} />
            <Text className='text-lg font-bold'>Đang tham gia nhóm...</Text>
            <Text className='text-sm text-[var(--fade-text-color)]'>Vui lòng đợi...</Text>
        </View>
    )
}