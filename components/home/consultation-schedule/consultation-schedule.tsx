import { Dimensions, View } from "react-native"
import { FlashList } from "@shopify/flash-list"
import ErrorDisplay from "../../common/error-display"
import { GlobalColor } from "../../../global-color"
import { useCallback } from "react"
import { Users } from "../../../lib/icons/Users"
import ConsultationScheduleSkeleton from "../../common/skeleton/consultation-schedule-skeleton"
import { ConsultationHistory } from "../../../assets/types/consult/doctor-schedule"
import ConsultationScheduleItem from "./consultation-schedule-item"
import { Text } from "../../../components/ui/text"
import IconButton from "../../common/icon-button"
import { History } from "../../../lib/icons/History"
import { router } from "expo-router"
import useUserStore from "../../../store/userStore"
import { UserRole } from "../../../assets/enum/user-role"
import { Plus } from "../../../lib/icons/Plus"

const { height, width } = Dimensions.get('window')

type Prop = {
    isLoading: boolean
    isError: boolean
    items: ConsultationHistory[]
    refetch: () => void
    remove: () => void
    refreshing: boolean
}

export default function ConsultationSchedule({ isLoading, isError, items, refetch, remove, refreshing }: Prop) {

    const { user } = useUserStore()

    const onRefresh = useCallback(() => {
        remove()
        refetch()
    }, [refetch])

    return (
        <View
            style={{ width: width * 0.95 }}
            className="flex-col gap-3 justify-center items-center"
        >
            <View className="flex-row justify-between items-center w-full">
                <View className='flex-row px-2 gap-3 items-center text-center'>
                    <Users color={GlobalColor.INDIGO_NEON_BORDER} size={18} />
                    <Text className='text-lg font-bold tracking-widest capitalize'>Lịch tư vấn</Text>
                </View>
                <View className="flex-row gap-2 items-center">
                    <IconButton
                        icon={<History className="text-foreground" size={17} />}
                        buttonSize={3}
                        possition={"other"}
                        onPress={() => router.push('/consultation-history-screen')}
                    />
                    {user.role == UserRole.PATIENT && (
                        <IconButton
                            icon={<Plus color={GlobalColor.BLUE_NEON_BORDER} size={17} />}
                            buttonSize={3}
                            possition={"other"}
                            onPress={() => router.push('/doctor-list-screen')}
                        />
                    )}
                </View>
            </View>
            {isLoading ? (
                <ConsultationScheduleSkeleton />
            ) : isError || items.length === 0 ? (
                <View style={{ height: height * 0.13 }} className="flex justify-center items-center">
                    <ErrorDisplay
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                        text="Không có buổi tư vấn sắp tới"
                    />
                </View>
            ) : (
                <View style={{ width: width }} className="px-2">
                    <FlashList<ConsultationHistory>
                        data={items}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) =>
                            <ConsultationScheduleItem item={item} />
                        }
                        estimatedItemSize={100}
                    />
                </View>
            )}
        </View>
    )
}