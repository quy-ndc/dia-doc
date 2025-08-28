import { Pressable, View } from "react-native"
import { Text } from "../../../components/ui/text"
import { ConsultationHistory } from "../../../assets/types/consult/doctor-schedule"
import { Image } from 'expo-image'
import { Clock } from "../../../lib/icons/Clock"
import { GlobalColor } from "../../../global-color"
import Tag from "../../common/tag"
import { ConsultationStatus, getConsultationStatusDisplay } from "../../../assets/enum/consultation-status"
import { useState } from "react"
import React from "react"
import useUserStore from "../../../store/userStore"
import { UserRole } from "../../../assets/enum/user-role"
import { router } from "expo-router"
import { ConversationType } from "../../../assets/enum/conversation-type"
import PatientProfileModal from "../../chat-screen/patient-profile-modal"
import ScheduleCancelModal from "./schedule-cancel-modal"

type Prop = {
    item: ConsultationHistory
}

export default function ConsultationScheduleItem({ item }: Prop) {

    const { user } = useUserStore()
    const status = getConsultationStatusDisplay(item.status)

    const [profileVisible, setProfileVisible] = useState(false)

    const formatTimeDisplay = (timeString: string) => {
        return timeString.split(':').slice(0, 2).join(':')
    }

    const formatDateDisplay = (dateString: string) => {
        const parts = dateString.split('-')
        return `${parts[1]}-${parts[2]}`
    }

    const onPress = () => {
        const currentTime = new Date();
        const [hours, minutes, seconds] = item.startTime.split(':').map(Number);
        const [endHours, endMinutes, endSeconds] = item.endTime.split(':').map(Number);

        const startTimeToday = new Date();
        startTimeToday.setHours(hours, minutes, seconds);

        const endTimeToday = new Date();
        endTimeToday.setHours(endHours, endMinutes, endSeconds);

        if (user.role === UserRole.DOCTOR) {
            setProfileVisible(true)
            return
        }

        if (user.role === UserRole.PATIENT && item.status == ConsultationStatus.BOOKED) {
            if (currentTime > endTimeToday) {
                return
            }

            router.push({
                pathname: '/chat-screen',
                params: {
                    id: item.conversationId,
                    title: item.userFullName,
                    image: item.userAvatar,
                    type: ConversationType.PRIVATE_CHAT,
                    active: currentTime >= startTimeToday ? 'true' : 'false',
                    target: item.userId
                }
            });
        }
    }


    return (
        <>
            <Pressable
                className="flex-row justify-between p-3 my-2 bg-[var(--blog-bg)] rounded-xl active:bg-[var(--click-bg)]"
                onPress={onPress}
            >
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
                <View className="flex-col gap-3">
                    <Tag
                        background={status.backgroundColor}
                        text={status.label}
                        textColor={status.color}
                        borderColor={status.color}
                    />
                    {item.status === ConsultationStatus.BOOKED && (
                        <ScheduleCancelModal id={item.id} />
                    )}
                </View>
            </Pressable>
            <PatientProfileModal
                id={item.userId}
                visible={profileVisible}
                setVisible={setProfileVisible}
            />
        </>
    )
}