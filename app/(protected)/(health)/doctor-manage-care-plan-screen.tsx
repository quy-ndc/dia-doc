import * as React from 'react'
import { Text } from '../../../components/ui/text'
import { useQuery } from '@tanstack/react-query'
import { useCarePlanTemplateDoctor, useCarePlanTemplateQuery } from '../../../service/query/user-query'
import { Pressable, RefreshControl, ScrollView, View } from 'react-native'
import { CarePlanTemplate } from '../../../assets/types/user/care-plan-template'
import { GlobalColor } from '../../../global-color'
import { Plus } from '../../../lib/icons/Plus'
import { Info } from '../../../lib/icons/Info'
import { FlashList } from '@shopify/flash-list'
import CarePlanTemplateItem from '../../../components/manage-care-plan-screen/care-plan-template-item'
import { useCallback, useState } from 'react'
import HealthcarePlanSkeleton from '../../../components/common/skeleton/healthcare-plan-skeleton'
import ErrorDisplay from '../../../components/common/error-display'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import HeaderTitle from '../../../components/common/header-title/header-title'
import IconButton from '../../../components/common/icon-button'

export default function DoctorManageCarePlanScreen() {

    const { id } = useLocalSearchParams()

    const [refreshing, setRefreshing] = useState(false)

    const { data, isLoading, isError, refetch, remove } = useQuery({
        ...useCarePlanTemplateDoctor({
            patientId: id as string,
            sortBy: 'createdDate',
            sortDirection: 1
        }),
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000)
    })

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        remove()
        refetch().finally(() => setRefreshing(false))
    }, [refetch, remove])

    const templateItems: CarePlanTemplate[] = data?.data?.data?.items || []

    return (
        <>
            <Stack.Screen
                name="doctor-manage-care-plan-screen"
                options={{
                    headerTitle: () => <HeaderTitle mainText='Quản lý lịch trình' subText='Thay đổi lịch trình hằng ngày' />,
                    headerShadowVisible: false,
                    headerRight: () =>
                        <IconButton
                            icon={<Plus className='text-foreground' size={18} />}
                            buttonSize={3}
                            possition={'other'}
                            onPress={() => router.push({
                                pathname: 'doctor-add-edit-care-plan-screen',
                                params: {
                                    patient: id,
                                }
                            })}
                        />
                }}
            />
            <View className='flex-1 relative p-3'>
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    <View className='w-full flex-col gap-3'>
                        <View
                            style={{ backgroundColor: GlobalColor.BLUE_NEON_BG }}
                            className='flex-col gap-1 p-4 rounded-xl'
                        >
                            <View className='flex-row gap-2 items-center'>
                                <Info color={GlobalColor.BLUE_NEON_BORDER} size={17} />
                                <Text
                                    style={{ color: GlobalColor.BLUE_NEON_BORDER }}
                                    className='text-lg font-bold tracking-widest'
                                >
                                    Lưu ý
                                </Text>
                            </View>
                            <Text className='text-base tracking-wider'>
                                Sau khi cập nhật, lịch đo mới sẽ được hiển thị vào ngày tiếp theo, lịch đo sẽ được áp dụng hằng ngày, bạn chỉ có thể sửa lịch của bản thân
                            </Text>
                        </View>
                        {isLoading ? (
                            <HealthcarePlanSkeleton />
                        ) : isError || templateItems.length == 0 ? (
                            <ErrorDisplay
                                text={'Không thể lấy lịch đo'}
                                onRefresh={onRefresh}
                                refreshing={refreshing}
                            />
                        ) : (
                            <FlashList<CarePlanTemplate>
                                data={templateItems}
                                renderItem={({ item, index }) => (
                                    <CarePlanTemplateItem key={index} item={item} patientId={id as string} />
                                )}
                                estimatedItemSize={30}
                            />
                        )}
                    </View>
                </ScrollView>
                <Pressable
                    style={{ backgroundColor: GlobalColor.BLUE_NEON_BORDER }}
                    className='flex absolute bottom-5 right-7 p-4 items-center justify-center rounded-full active:opacity-80'
                    onPress={() => router.push({
                        pathname: 'doctor-add-edit-care-plan-screen',
                        params: {
                            patient: id,
                        }
                    })}
                >
                    <Plus className='text-white' size={17} />
                </Pressable>
            </View>
        </>
    )
}