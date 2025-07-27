import * as React from 'react'
import { Text } from '../../components/ui/text'
import { useQuery } from '@tanstack/react-query'
import { useCarePlanTemplateQuery } from '../../service/query/user-query'
import { Modal, Pressable, RefreshControl, ScrollView, View } from 'react-native'
import { CarePlanTemplate } from '../../assets/types/user/care-plan-template'
import { GlobalColor } from '../../global-color'
import { Plus } from '../../lib/icons/Plus'
import { Info } from '../../lib/icons/Info'
import { FlashList } from '@shopify/flash-list'
import CarePlanTemplateItem from '../../components/manage-care-plan-screen/care-plan-template-item'
import { useCallback, useState } from 'react'
import { Calendar } from '../../lib/icons/Calendar'
import { Dimensions } from 'react-native'
import CarePlanAddEditModal from '../../components/manage-care-plan-screen/add-edit-modal'
import HealthcarePlanSkeleton from '../../components/common/skeleton/healthcare-plan-skeleton'
import ErrorDisplay from '../../components/common/error-display'

const { width } = Dimensions.get('window')

export default function ManageCarePlanScreen() {

    const [refreshing, setRefreshing] = useState(false)
    const [visible, setVisible] = useState(false)

    const { data, isLoading, isError, refetch, remove } = useQuery({
        ...useCarePlanTemplateQuery({
            SortBy: 'createdDate',
            SortDirection: 0
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
                                Sau khi cập nhật lịch đo, lịch đo mới sẽ được hiển thị vào ngày tiếp theo, lịch đo sẽ được áp dụng hằng ngày
                            </Text>
                        </View>
                        <View className="flex-row w-full px-2 pt-2 justify-between items-center">
                            <View className='flex-row gap-3 items-center text-center'>
                                <Calendar color={GlobalColor.PURPLE_NEON_BORDER} size={18} />
                                <Text className='text-lg mb-1 font-bold tracking-widest capitalize'>Lịch trình hiện tại</Text>
                            </View>
                            <View className='flex-row gap-2 items-center rounded-lg'>
                                <Pressable
                                    className={`flex-row items-center gap-2 p-2 rounded-full active:bg-[var(--click-bg)]`}
                                    onPress={() => setVisible(true)}
                                >
                                    <Plus className='text-foreground' size={17} />
                                </Pressable>
                            </View>
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
                                    <CarePlanTemplateItem
                                        key={index}
                                        item={item}
                                        setVisible={setVisible}
                                    />
                                )}
                                estimatedItemSize={30}
                            />
                        )}

                    </View>
                </ScrollView>
                <Pressable
                    style={{ backgroundColor: GlobalColor.BLUE_NEON_BORDER }}
                    className='flex absolute bottom-5 right-7 p-4 items-center justify-center rounded-full active:opacity-80'
                    onPress={() => setVisible(true)}
                >
                    <Plus className='text-white' size={17} />
                </Pressable>
            </View>
            <CarePlanAddEditModal
                visible={visible}
                setVisible={setVisible}
            />
        </>
    )
}