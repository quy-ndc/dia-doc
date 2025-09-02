import * as React from 'react'
import { Text } from '../../components/ui/text'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { useJoinAGroupMutation } from '../../service/query/chat-query'
import { View } from 'react-native'
import SpinningIcon from '../../components/common/icons/spinning-icon'
import { Loader } from '../../lib/icons/Loader'
import { Check } from '../../lib/icons/Check'
import { GlobalColor } from '../../global-color'
import { X } from '../../lib/icons/X'
import { ChevronLeft } from '../../lib/icons/ChevronLeft'
import { Pressable } from 'react-native'

export default function JoinGroupScreen() {

    const { group, user } = useLocalSearchParams()
    const [joinStatus, setJoinStatus] = useState(false)

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
            setJoinStatus(false)
        } else {
            setJoinStatus(true)
        }
    }, [data, isLoading])


    return (
        <View className='flex-1 items-center justify-center gap-4'>
            {isLoading ? (
                <>
                    <SpinningIcon icon={<Loader className='text-foreground' size={20} />} />
                    <Text className='text-lg font-bold'>Đang tham gia nhóm...</Text>
                    <Text className='text-sm text-[var(--fade-text-color)]'>Vui lòng đợi...</Text>
                </>
            ) : joinStatus ? (
                <>
                    <Check color={GlobalColor.GREEN_NEON_BORDER} size={20} />
                    <Text className='text-lg font-bold'>Đã tham gia nhóm</Text>
                    <Text className='text-sm text-[var(--fade-text-color)]'>Đang điều hướng về trang chat...</Text>
                </>
            ) : (
                <>
                    <X color={GlobalColor.RED_NEON_BORDER} size={20} />
                    <Text className='text-lg font-bold'>Không thể tham gia nhóm</Text>
                    <Text className='text-sm text-[var(--fade-text-color)]'>Vui lòng thử lại sau</Text>
                    <Pressable
                     className='flex-row items-center gap-2 bg-[var(--oppo-theme-col)] active:bg-[var(--click-bg)] px-4 py-2 rounded-xl'
                     onPress={() => router.replace('/')}
                     >
                    <ChevronLeft className='text-[var(--same-theme-col)]' size={15} />
                    <Text className='text-sm text-[var(--same-theme-col)] font-bold'>Quay lại</Text>
                    </Pressable>
                </>
            )}

        </View>
    )
}