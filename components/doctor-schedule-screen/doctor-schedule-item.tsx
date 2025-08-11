import * as React from 'react'
import { Pressable } from "react-native"
import { Text } from "../../components/ui/text"
import { DoctorSchedule } from '../../assets/types/consult/doctor-schedule'
import { formatDate } from '../../util/format-date'

type Prop = {
    item: DoctorSchedule
    choosen: boolean
    setChoosenTimeStamp: (timeStamp: string) => void
    setChoosenTime: (time: string) => void
}

export default function DoctorScheduleItem({ item, choosen, setChoosenTimeStamp, setChoosenTime }: Prop) {

    const handleChooseTimeStamp = () => {
        setChoosenTimeStamp(item.date)
        setChoosenTime('')
    }

    return (
        <Pressable
            className={`flex-col rounded-lg px-4 py-2 border border-[var(--fade-text-color)] active:bg-[var(--click-bg)] ${choosen ? 'bg-[var(--oppo-theme-col)]' : ''}`}
            onPress={handleChooseTimeStamp}
        >
            <Text className={`text-base tracking-wider ${choosen ? 'text-[var(--same-theme-col)] font-bold' : 'text-[var(--fade-text-color)]'}`}>
                {formatDate(item.date)}
            </Text>
        </Pressable>
    )
}
