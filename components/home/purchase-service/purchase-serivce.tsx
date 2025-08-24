import { Dimensions, View } from "react-native"
import { FlashList } from "@shopify/flash-list"
import ErrorDisplay from "../../common/error-display"
import { GlobalColor } from "../../../global-color"
import { useCallback } from "react"
import ConsultationScheduleSkeleton from "../../common/skeleton/consultation-schedule-skeleton"
import { Text } from "../../../components/ui/text"
import IconButton from "../../common/icon-button"
import { History } from "../../../lib/icons/History"
import { router } from "expo-router"
import { PurchasedServicePackage } from "../../../assets/types/consult/consultation"
import AvailableServiceItem from "./available-serivce-item"
import { ShoppingCart } from "../../../lib/icons/ShoppingCart"
import { Plus } from "../../../lib/icons/Plus"
import useUserStore from "../../../store/userStore"
import { UserRole } from "../../../assets/enum/user-role"

const { width } = Dimensions.get('window')

type Prop = {
    isLoading: boolean
    isError: boolean
    items: PurchasedServicePackage[]
    refetch: () => void
    remove: () => void
    refreshing: boolean
}

export default function PurchaseService({ isLoading, isError, items, refetch, remove, refreshing }: Prop) {

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
                    <ShoppingCart color={GlobalColor.EMERALD_NEON_BORDER} size={18} />
                    <Text className='text-lg font-bold tracking-widest capitalize'>Dịch vụ đã mua</Text>
                </View>
                <View className="flex-row gap-2 items-center">
                    <IconButton
                        icon={<History className="text-foreground" size={17} />}
                        buttonSize={3}
                        possition={"other"}
                        onPress={() => router.push('/purchased-service-screen')}
                    />
                    {user.role == UserRole.PATIENT && (
                        <IconButton
                            icon={<Plus color={GlobalColor.BLUE_NEON_BORDER} size={17} />}
                            buttonSize={3}
                            possition={"other"}
                            onPress={() => router.push('/service-package-screen')}
                        />
                    )}
                </View>
            </View>
            {isLoading ? (
                <ConsultationScheduleSkeleton />
            ) : isError || items.length === 0 ? (
                <View className="py-6">
                    <ErrorDisplay
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                        text="Bạn chưa mua gói dịch vụ nào"
                    />
                </View>
            ) : (
                <View style={{ width: width }} className="px-2">
                    <FlashList<PurchasedServicePackage>
                        data={items}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) =>
                            <AvailableServiceItem item={item} />
                        }
                        estimatedItemSize={100}
                    />
                </View>
            )}
        </View>
    )
}