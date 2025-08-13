import * as React from 'react'
import { View, Text, Pressable } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { CheckCircle, XCircle } from 'lucide-react-native'
import { GlobalColor } from '../../../global-color'
import { ChevronLeft } from '../../../lib/icons/ChevronLeft'
import { ChevronRight } from '../../../lib/icons/ChevronRight'
import { useQueryClient } from '@tanstack/react-query'
import { QueryKeys } from '../../../assets/enum/query'
import { useEffect } from 'react'

export default function PaymentStatusScreen() {
    const { code } = useLocalSearchParams()
    const router = useRouter()
    const queryClient = useQueryClient()

    const isSuccess = code === '00'

    const invalidate = async () => {
        await queryClient.invalidateQueries({ queryKey: [QueryKeys.PURCHASED_SERVICE_PACKAGES] })
        await queryClient.invalidateQueries({ queryKey: [QueryKeys.SESSION_AMOUNT] })
    }

    useEffect(() => {
        if (queryClient) {
            invalidate()
        }
    }, [queryClient])

    return (
        <View className="flex-1 p-6 justify-center items-center">
            <View className="flex-col gap-5 items-center">
                <View
                    style={{ backgroundColor: isSuccess ? GlobalColor.GREEN_NEON_BG : GlobalColor.RED_NEON_BG }}
                    className="p-5 rounded-full items-center justify-center"
                >
                    {isSuccess ? (
                        <CheckCircle size={48} color={GlobalColor.GREEN_NEON_BORDER} />
                    ) : (
                        <XCircle size={48} color={GlobalColor.RED_NEON_BORDER} />
                    )}
                </View>

                <Text className="text-2xl font-bold tracking-wider">
                    {isSuccess ? 'Giao dịch thành công' : 'Giao dịch thất bại'}
                </Text>

                <View className="flex-col gap-3 items-center w-full">
                    {isSuccess && (
                        <Pressable
                            onPress={() => router.replace('/purchased-service-screen')}
                            className="flex-row gap-2 w-full px-4 py-2 rounded-full items-center border border-[var(--oppo-theme-col)] active:opacity-70 acitve:bg-[var(--click-bg)]"
                        >
                            <Text className="font-semibold text-lg">
                                Lịch sử giao dịch
                            </Text>
                            <ChevronRight className='text-foreground' size={17} />
                        </Pressable>
                    )}
                    <Pressable
                        onPress={() => router.replace('/(protected)/(main)')}
                        className="flex-row gap-2 w-full px-4 py-2 rounded-full items-center bg-[var(--oppo-theme-col)] active:opacity-70"
                    >
                        <ChevronLeft className='text-[var(--same-theme-col)]' size={17} />
                        <Text className="text-[var(--same-theme-col)] font-semibold text-lg">
                            Quay lại trang chủ
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}