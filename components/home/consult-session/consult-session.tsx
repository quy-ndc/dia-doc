import * as React from 'react'
import { Dimensions, Pressable, View } from "react-native"
import SectionTitle from "../common/section-title"
import { GlobalColor } from "../../../global-color"
import { useCallback } from 'react'
import ErrorDisplay from '../../common/error-display'
import { Stethoscope } from '../../../lib/icons/Stethoscope'
import ConsultSessionSkeleton from '../../common/skeleton/consult-session-skeleton'
import { Text } from '../../ui/text'
import { Plus } from 'lucide-react-native'
import { Calendar } from '../../../lib/icons/Calendar'
import { router } from 'expo-router'

const { width } = Dimensions.get('window')

type Prop = {
    amount: number
    isLoading: boolean
    isError: boolean
    refetch: () => void
    remove: () => void
    refreshing: boolean
}

export default function ConsultSession({ amount, isLoading, isError, refetch, remove, refreshing }: Prop) {

    const onRefresh = useCallback(() => {
        remove()
        refetch()
    }, [refetch])

    return (
        <View
            style={{ width: width * 0.95 }}
            className='flex-col gap-1 pt-2 rounded-xl'
        >
            <SectionTitle
                icon={<Stethoscope color={GlobalColor.ROSE_NEON_BORDER} size={18} />}
                title='Lượt tư vấn'
            />
            {isLoading ? (
                <ConsultSessionSkeleton />
            ) : isError ? (
                <ErrorDisplay
                    text={isError ? 'Lỗi khi tải dữ liệu' : 'Không có dữ liệu'}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                />
            ) : (
                <View
                    style={{ backgroundColor: GlobalColor.ROSE_NEON_BG }}
                    className='flex-col items-center gap-2 py-4 px-2 rounded-xl'
                >
                    <Text
                        style={{ color: GlobalColor.ROSE_NEON_BORDER }}
                        className='text-3xl font-bold'
                    >
                        {amount}
                    </Text>
                    <Text className='text-base py-1 font-medium text-[var(--fade-text-color)] tracking-wider'>phiên tư vấn còn lại</Text>
                    <View className='flex-row gap-3 items-center w-full justify-center'>
                        <Pressable
                            className='flex-row w-[45%] gap-2 items-center justify-center bg-[var(--oppo-theme-col)] rounded-full px-4 py-2 active:opacity-80'
                            onPress={() => router.push('/service-package-screen')}
                        >
                            <Text className='text-base text-[var(--same-theme-col)] font-medium capitalize tracking-wider'>
                                Mua thêm
                            </Text>
                            <Plus className='text-[var(--same-theme-col)]' size={18} />
                        </Pressable>
                        <Pressable
                            className='flex-row w-[45%] gap-2 items-center justify-center border border-[var(--fade-text-color)] rounded-full px-4 py-2 active:bg-[var(--click-bg)]'
                            onPress={() => router.push('/doctor-list-screen')}
                        >
                            <Text className='text-base text-foreground font-medium capitalize tracking-wider'>
                                Đặt lịch
                            </Text>
                            <Calendar className='text-foreground' size={18} />
                        </Pressable>
                    </View>
                </View>
            )}
        </View>
    )
}
