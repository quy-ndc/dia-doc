import * as React from 'react'
import { Dimensions, View } from "react-native"
import SectionTitle from "../common/section-title"
import { Activity } from "../../../lib/icons/Activity"
import { GlobalColor } from "../../../global-color"
import { useCallback } from 'react'
import HealthTrackingSkeleton from '../../common/skeleton/health-tracking-skeleton'
import ErrorDisplay from '../../common/error-display'
import HealthTrackerItem from './health-track-item'
import { HealthTrackItem } from '../../../assets/types/user/health-track'
import { FlashList } from '@shopify/flash-list'

const { width } = Dimensions.get('window')

type Prop = {
    items: HealthTrackItem[]
    isLoading: boolean
    isError: boolean
    refetch: () => void
    remove: () => void
    refreshing: boolean
}

export default function HealthTracker({ items, isLoading, isError, refetch, remove, refreshing }: Prop) {

    const onRefresh = useCallback(() => {
        remove()
        refetch()
    }, [refetch])

    return (
        <View
            style={{ width: width * 0.95 }}
            className='flex-col gap-4 pt-2 pb-3 rounded-xl'
        >
            <SectionTitle
                icon={<Activity color={GlobalColor.BLUE_NEON_BORDER} size={18} />}
                title='Theo dõi sức khỏe'
            />
            {isLoading ? (
                <HealthTrackingSkeleton />
            ) : isError || items.length === 0 ? (
                <ErrorDisplay
                    text={isError ? 'Lỗi khi tải dữ liệu' : 'Không có dữ liệu'}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                />
            ) : (
                <View className='w-full'>
                    <FlashList<HealthTrackItem>
                        data={items}
                        renderItem={({ item, index }) => (
                            <View className='m-2'>
                                <HealthTrackerItem
                                    key={index}
                                    item={item}
                                />
                            </View>
                        )}
                        estimatedItemSize={10}
                        numColumns={2}
                    />
                </View>
            )}
        </View>
    )
}
