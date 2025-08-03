import * as React from 'react'
import { Dimensions, Pressable, View } from "react-native"
import { Text } from "../../../ui/text"
import { getHealthRecordDisplay } from '../../../../assets/data/health-record-type'
import { HealthRecordType } from '../../../../assets/enum/health-record'
import { router } from 'expo-router'
import { ChevronRight } from '../../../../lib/icons/ChevronRight'
import RoundedIcon from '../../../common/icons/rouned-icon'

type Prop = {
    type: HealthRecordType
}

const { width } = Dimensions.get('window')

export default function ProfileHealthRecordItem({ type }: Prop) {

    const recordDisplay = getHealthRecordDisplay(type)

    const handlePress = () => {
        router.push({
            pathname: "/health-record-history-screen",
            params: { type: type }
        })
    }

    return (
        <Pressable
            style={{ width: width * 0.93}}
            className={`flex-row items-center justify-between px-1 py-3 gap-2 rounded-xl active:bg-[var(--click-bg)] w-full`}
            onPress={handlePress}
        >
            <View className='flex-row items-center gap-2'>
                <RoundedIcon
                    background={recordDisplay.backgroundColor}
                    size={2}
                    icon={recordDisplay.coloredIcon}
                />
                <Text
                    style={{ color: recordDisplay.iconColor }}
                    className='text-base font-semibold tracking-wider capitalize'
                >
                    Lịch sử đo {recordDisplay.name}
                </Text>
            </View>
            <ChevronRight className='text-foreground' size={17} />
        </Pressable>
    )
}
