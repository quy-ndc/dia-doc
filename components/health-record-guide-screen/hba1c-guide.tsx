import * as React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Text } from '../../components/ui/text'
import { RefreshControl, ScrollView, View } from 'react-native'
import { GlobalColor } from '../../global-color'
import { useQuery } from '@tanstack/react-query'
import { useMediaQuery } from '../../service/query/media-query'
import { HealthRecordType } from '../../assets/enum/health-record'
import { BlogPost } from '../../assets/types/media/blog-post'
import BlogItem from '../common/blog-item/blog-item'
import { useCallback, useState } from 'react'
import BlogSkeleton from '../common/skeleton/blog-skeleton'
import ErrorDisplay from '../common/error-display'

export default function Hba1cGuide() {

    const { type } = useLocalSearchParams()

    const [refreshing, setRefreshing] = useState(false)

    const { data, isLoading, isError, remove, refetch } = useQuery(useMediaQuery({
        PageSize: 10,
        TutorialType: Number(type) as HealthRecordType
    }))

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        remove()
        refetch().finally(() => setRefreshing(false))
    }, [refetch])

    const blogGuide: BlogPost = data?.data?.data?.items[0]

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <View className='flex-col p-2 gap-2 items-center w-full'>
                <Text className='text-xl font-bold tracking-wider px-3'>Ngưỡng HBA1C hiện tại của bạn</Text>
                <View className='flex-row items-center'>
                    <View className='flex-col'>
                        <Text className='text-base p-3 font-bold tracking-wider bg-[var(--blog-bg)]'>
                            Mức độ
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.RED_NEON_BORDER }}
                            className='text-base p-3 text-white font-bold tracking-wider'
                        >
                            Rất cao
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.ORANGE_NEON_BORDER }}
                            className='text-base p-3 text-white font-bold tracking-wider'
                        >
                            Cao
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.GREEN_NEON_BORDER }}
                            className='text-base p-3 text-white font-bold tracking-wider'
                        >
                            Bình thường
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.YELLOW_NEON_BORDER }}
                            className='text-base p-3 text-white font-bold tracking-wider'
                        >
                            Thấp
                        </Text>
                    </View>
                    <View className='flex-col'>
                        <Text className='text-base p-3 font-bold tracking-wider bg-[var(--blog-bg)]'>
                            Mức độ
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.RED_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`>6.5`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.ORANGE_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`5.7-6.4`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.GREEN_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`4.0-5.6`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.YELLOW_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`<4.0`}
                        </Text>
                    </View>
                </View>
                <View className='w-full'>
                    {isLoading ? (
                        <BlogSkeleton />
                    ) : isError || !blogGuide ? (
                        <ErrorDisplay
                            onRefresh={onRefresh}
                            refreshing={refreshing}
                            text='Không thể hiển thị bài viết hướng dẫn'
                        />
                    ) : (
                        <BlogItem
                            blogPost={blogGuide}
                            showBookmarkDate={false}
                            showLikeDate={false}
                        />
                    )}
                </View>
            </View>
        </ScrollView>
    )
}