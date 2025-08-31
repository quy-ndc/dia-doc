import * as React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Text } from '../../components/ui/text'
import { RefreshControl, ScrollView, View } from 'react-native'
import { HealthRecordType } from '../../assets/enum/health-record'
import { GlobalColor } from '../../global-color'
import { useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useMediaQuery } from '../../service/query/media-query'
import { BlogPost } from '../../assets/types/media/blog-post'
import BlogItem from '../common/blog-item/blog-item'
import BlogSkeleton from '../common/skeleton/blog-skeleton'
import ErrorDisplay from '../common/error-display'

export default function BloodSugarGuide() {

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
            <View className='flex-col p-2 gap-2 items-center'>
                <Text className='text-xl font-bold tracking-wider px-3'>Ngưỡng đường huyết hiện tại của bạn</Text>
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
                        <Text
                            style={{ backgroundColor: GlobalColor.PURPLE_NEON_BORDER }}
                            className='text-base p-3 text-white font-bold tracking-wider'
                        >
                            Rất thấp
                        </Text>
                    </View>
                    <View className='flex-col'>
                        <Text className='text-base p-3 font-bold tracking-wider bg-[var(--blog-bg)]'>
                            Trước ăn
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.RED_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`>7.2`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.ORANGE_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`>7.2`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.GREEN_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`3.9-7.2`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.YELLOW_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`<3-3.8`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.PURPLE_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`<3-3.8`}
                        </Text>
                    </View>
                    <View className='flex-col'>
                        <Text className='text-base p-3 font-bold tracking-wider bg-[var(--blog-bg)]'>
                            Sau ăn
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.RED_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`>10`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.ORANGE_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`>10`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.GREEN_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`3.9-9.9`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.YELLOW_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`<3-3.8`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.PURPLE_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`<3-3.8`}
                        </Text>
                    </View>
                    <View className='flex-col'>
                        <Text className='text-base p-3 font-bold tracking-wider bg-[var(--blog-bg)]'>
                            Chưa ăn
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.RED_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`>7.2`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.ORANGE_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`>7.2`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.GREEN_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`3.9-7.2`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.YELLOW_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`<3-3.8`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.PURPLE_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`<3-3.8`}
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