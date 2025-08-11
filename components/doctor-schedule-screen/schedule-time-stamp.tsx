import * as React from 'react'
import { Dimensions, Pressable } from "react-native"
import { Text } from "../../components/ui/text"
import { DoctorScheduleTime } from '../../assets/types/consult/doctor-schedule'

type Prop = {
    item: DoctorScheduleTime
    choosen: boolean
    setChoosenTime: (time: string) => void
}

const { width } = Dimensions.get('window')

export default function ScheduleTimeStamp({ item, choosen, setChoosenTime }: Prop) {

    const handleChooseTime = () => {
        setChoosenTime(choosen ? '' : item.id)
    }

    return (
        <Pressable
            style={{ width: width * 0.45 }}
            className={`flex-col rounded-lg p-3 justify-center items-center border border-[var(--fade-text-color)] active:bg-[var(--click-bg)] ${choosen ? 'bg-[var(--oppo-theme-col)]' : ''}`}
            onPress={handleChooseTime}
        >
            <Text className={`text-base ${choosen ? 'text-[var(--same-theme-col)] font-bold' : 'text-[var(--fade-text-color)]'}`}>
                {item.startTime} - {item.endTime}
            </Text>
        </Pressable>
    )
}
