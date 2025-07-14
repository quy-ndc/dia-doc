import * as React from 'react'
import { Dimensions, View } from "react-native"
import { Activity } from "../../../lib/icons/Activity"
import { GlobalColor } from "../../../global-color"
import { useCallback } from 'react'
import HealthTrackingSkeleton from '../../common/skeleton/health-tracking-skeleton'
import ErrorDisplay from '../../common/error-display'
import { HealthTrackItem } from '../../../assets/types/user/health-track'
import { FlashList } from '@shopify/flash-list'
import ProfileHealthRecordItem from './profile-health-record-item'
import SectionTitle from '../../home/common/section-title'
import { Cross } from '../../../lib/icons/Cross'

const { width } = Dimensions.get('window')

type Prop = {
    items: HealthTrackItem[]
    isLoading: boolean
    isError: boolean
    refetch: () => void
    remove: () => void
    refreshing: boolean
}

export default function ProfileHealthRecord({ items, isLoading, isError, refetch, remove, refreshing }: Prop) {

    const onRefresh = useCallback(() => {
        remove()
        refetch()
    }, [refetch])

    return (
        <View className='flex-col gap-1 pt-2 px-3'>
            <SectionTitle
                icon={<Cross color={GlobalColor.EMERALD_NEON_BORDER} size={18} />}
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
                                <ProfileHealthRecordItem
                                    key={index}
                                    item={item}
                                />
                            </View>
                        )}
                        estimatedItemSize={10}
                    />
                </View>
            )}
        </View>
    )
}
