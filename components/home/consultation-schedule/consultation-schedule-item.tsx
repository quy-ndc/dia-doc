import { View } from "react-native"
import { Text } from "../../../components/ui/text"
import { ConsultationHistory } from "../../../assets/types/consult/doctor-schedule"
import { Image } from 'expo-image'
import { Clock } from "../../../lib/icons/Clock"
import { GlobalColor } from "../../../global-color"
import Tag from "../../common/tag"

type Prop = {
    item: ConsultationHistory
}

export default function ConsultationScheduleItem({ item }: Prop) {
    const getConsultationStatus = (startTime: string, date: string) => {
        const consultationDateTime = new Date(`${date} ${startTime}`)
        const now = new Date()
        const timeDiff = consultationDateTime.getTime() - now.getTime()
        const twoHoursInMs = 2 * 60 * 60 * 1000

        if (consultationDateTime.toDateString() === now.toDateString()) {
            return {
                backgroundColor: GlobalColor.GREEN_NEON_BG,
                borderColor: GlobalColor.GREEN_NEON_BORDER,
                text: 'Hôm nay'
            }
        } else if (timeDiff > 0 && timeDiff < twoHoursInMs) {
            return {
                backgroundColor: GlobalColor.BLUE_NEON_BG,
                borderColor: GlobalColor.BLUE_NEON_BORDER,
                text: 'Sắp diễn ra'
            }
        } else if (timeDiff < 0) {
            return {
                backgroundColor: GlobalColor.RED_NEON_BG,
                borderColor: GlobalColor.RED_NEON_BORDER,
                text: 'Đã qua'
            }
        } else {
            return {
                backgroundColor: GlobalColor.PURPLE_NEON_BG,
                borderColor: GlobalColor.PURPLE_NEON_BORDER,
                text: 'Trong tương lai'
            }
        }
    }

    const status = getConsultationStatus(item.startTime, item.date)

    const formatTimeDisplay = (timeString: string) => {
        return timeString.split(':').slice(0, 2).join(':')
    }

    const formatDateDisplay = (dateString: string) => {
        const parts = dateString.split('-')
        return `${parts[1]}-${parts[2]}`
    }

    return (
        <View className="flex-row justify-between p-3 my-2 bg-[var(--blog-bg)] rounded-xl">
            <View className="flex-col gap-3">
                <View className="flex-row gap-2 items-center">
                    <Image
                        style={{ width: 30, height: 30, borderRadius: 1000 }}
                        source={item.userAvatar}
                        contentFit="contain"
                    />
                    <Text className="text-base font-semibold tracking-wider">{item.userFullName}</Text>
                </View>
                <View className="flex-row gap-2 items-center">
                    <Clock color={GlobalColor.BLUE_NEON_BORDER} size={17} />
                    <Text className="text-sm font-semibold tracking-wider">
                        {`${formatTimeDisplay(item.startTime)} - ${formatTimeDisplay(item.endTime)} (${formatDateDisplay(item.date)})`}
                    </Text>
                </View>
            </View>
            <View>
                <Tag
                    background={status.backgroundColor}
                    text={status.text}
                    textColor={status.borderColor}
                    borderColor={status.borderColor}
                />
            </View>
        </View>
    )
}