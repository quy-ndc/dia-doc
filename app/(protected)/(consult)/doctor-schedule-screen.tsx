import * as React from 'react'
import { useCallback, useState } from 'react'
import { Dimensions, RefreshControl, ScrollView, View } from 'react-native'
import { Text } from '../../../components/ui/text'
import { Stack, useLocalSearchParams } from 'expo-router'
import { truncateText } from '../../../util/truncate-text'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useDoctorScheduleQuery } from '../../../service/query/user-query'

const { width, height } = Dimensions.get('window')

export default function DoctorScheduleScreen() {

    const { id, name } = useLocalSearchParams()

    const {
        data,
        isError,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
        refetch,
        remove,
        isLoading,
    } = useInfiniteQuery({
        ...useDoctorScheduleQuery({
            doctorId: id as string,
        }),
        getNextPageParam: (lastPage) => {
            const posts = lastPage?.data?.data || undefined
            return posts?.hasNextPage ? posts.nextCursor : undefined
        },
        keepPreviousData: false,
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000)
    })

    console.log(id, name)

    return (
        <>
            <Stack.Screen
                options={{ headerTitle: truncateText(`Lịch hẹn của ${name}`, 25) }}
            />
            <Text>awdaw</Text>
        </>
    )
}
