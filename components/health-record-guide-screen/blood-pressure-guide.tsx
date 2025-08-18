import * as React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Text } from '../ui/text'
import { RefreshControl, ScrollView, View } from 'react-native'
import { HealthRecordType } from '../../assets/enum/health-record'
import { GlobalColor } from '../../global-color'
import { useCallback, useState } from 'react'
import { useMediaQuery } from '../../service/query/media-query'
import { useQuery } from '@tanstack/react-query'
import { BlogPost } from '../../assets/types/media/blog-post'
import BlogItem from '../common/blog-item/blog-item'
import BlogSkeleton from '../common/skeleton/blog-skeleton'
import ErrorDisplay from '../common/error-display'

export default function BloodPressureGuide() {

    const { type } = useLocalSearchParams()

    const [refreshing, setRefreshing] = useState(false)

    const { data, isLoading, isError, remove, refetch } = useQuery(useMediaQuery({
        PageSize: 10,
        TutorialType: Number(type) as HealthRecordType
    }))

    console.log(type)

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        remove()
        refetch().finally(() => setRefreshing(false))
    }, [refetch])

    const blogGuide: BlogPost = data?.data?.data?.items[0]

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <View className='flex-col p-2 gap-2 items-center'>
                <Text className='text-xl font-bold tracking-wider px-3'>Ngưỡng huyết áp hiện tại của bạn</Text>
                <View className='flex-row items-center'>
                    <View className='flex-col'>
                        <Text className='text-base p-3 font-bold tracking-wider bg-[var(--blog-bg)]'>
                            Mức độ
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.RED_NEON_BORDER }}
                            className='text-base p-3 text-white font-bold tracking-wider'
                        >
                            Tăng huyết áp độ 3
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.ORANGE_NEON_BORDER }}
                            className='text-base p-3 text-white font-bold tracking-wider'
                        >
                            Tăng huyết áp độ 2
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.YELLOW_NEON_BORDER }}
                            className='text-base p-3 text-white font-bold tracking-wider'
                        >
                            Tăng huyết áp độ 1
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.GREEN_NEON_BORDER }}
                            className='text-base p-3 text-white font-bold tracking-wider'
                        >
                            Bình thường cao
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.EMERALD_NEON_BORDER }}
                            className='text-base p-3 text-white font-bold tracking-wider'
                        >
                            Bình thường
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.PURPLE_NEON_BORDER }}
                            className='text-base p-3 text-white font-bold tracking-wider'
                        >
                            Thấp
                        </Text>
                    </View>
                    <View className='flex-col'>
                        <Text className='text-base p-3 font-bold tracking-wider bg-[var(--blog-bg)]'>
                            Tâm thu
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.RED_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`>180`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.ORANGE_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`>160-180`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.YELLOW_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`140-160`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.GREEN_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`<130-140`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.EMERALD_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`<90-130`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.PURPLE_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`<90`}
                        </Text>
                    </View>
                    <View className='flex-col'>
                        <Text className='text-base p-3 font-bold tracking-wider bg-[var(--blog-bg)]'>
                            Tâm thu
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.RED_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`>110`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.ORANGE_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`>100-110`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.YELLOW_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`90-100`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.GREEN_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`<85-90`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.EMERALD_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`<60-85`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.PURPLE_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`<60`}
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