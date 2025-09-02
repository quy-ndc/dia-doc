import * as React from 'react'
import { Dimensions, Pressable, View } from "react-native"
import { Text } from "../../../components/ui/text"
import { getHealthRecordDisplay } from '../../../assets/data/health-record-type'
import { formatDateBlog } from '../../../util/format-date-post'
import { BmiRecord, HealthTrackItem } from '../../../assets/types/user/health-track'
import { router } from 'expo-router'
import { ChevronRight } from '../../../lib/icons/ChevronRight'
import RoundedIcon from '../../common/icons/rouned-icon'
import useUserStore from '../../../store/userStore'
import { UserRole } from '../../../assets/enum/user-role'
import { getBmiLevelInfo } from '../../../assets/enum/bmi-level'

type Prop = {
    item: HealthTrackItem
    patientId?: string
}

const { width } = Dimensions.get('window')

export default function BmiItem({ item, patientId }: Prop) {
    const { user } = useUserStore()
    const recordDisplay = getHealthRecordDisplay(item.recordType)
    const shouldDisplayData = item.healthRecord

    const getValue = () => {
        if (!shouldDisplayData) return '0'
        const record = item.healthRecord as BmiRecord
        return record.bmi ?? 'N/A'
    }

    const getWeight = () => {
        if (!shouldDisplayData) return '0'
        const record = item.healthRecord as BmiRecord
        return record.weightValue ?? 'N/A'
    }

    const getHeight = () => {
        if (!shouldDisplayData) return '0'
        const record = item.healthRecord as BmiRecord
        return record.heightValue ?? 'N/A'
    }

    const getBmiStatus = () => {
        if (!shouldDisplayData) return null
        const record = item.healthRecord as BmiRecord
        const levelInfo = getBmiLevelInfo(record.level)
        return (
            <Text
                style={{ color: levelInfo.color }}
                className='text-sm font-semibold tracking-wider'
            >
                {levelInfo.label}
            </Text>
        )
    }

    const getTimeText = () => {
        if (item.mesurementAt) {
            const date = new Date(item.mesurementAt)
            const now = new Date()
            if (date > now) {
                return 'Đã đo'
            } else {
                return `Đo ${formatDateBlog(item.mesurementAt)}`
            }
        } else {
            return 'Chưa có dữ liệu'
        }
    }

    const handlePress = () => {
        if (user.role == UserRole.DOCTOR) {
            router.push({
                pathname: "/health-record-history-screen",
                params: { type: item.recordType, id: patientId }
            })
        } else {
            router.push({
                pathname: "/update-record-screen",
                params: { type: item.recordType, lastMesurement: `${getWeight()}/${getHeight()}` }
            })
        }
    }

    return (
        <Pressable
            style={{
                backgroundColor: recordDisplay.backgroundColor,
                width: width * 0.44
            }}
            className={`p-4 gap-2 rounded-xl w-full active:opacity-60`}
            onPress={handlePress}
        >
            <View className='flex-row items-center gap-2 mb-3'>
                <RoundedIcon
                    background={recordDisplay.iconColor}
                    size={2}
                    icon={recordDisplay.icon}
                />
                <Text className='text-base font-semibold tracking-wider'>{recordDisplay.name}</Text>
            </View>
            <View className='flex-col gap-2'>
                {shouldDisplayData ? (
                    <>
                        <View className='flex-row items-center justify-between'>
                            <View className='flex-col gap-1'>
                                <Text className='text-base font-bold tracking-widest'>
                                    {getValue()}
                                    <Text className='text-sm font-normal text-[var(--fade-text-color)]'> {recordDisplay.unit}</Text>
                                </Text>
                                {getBmiStatus()}
                            </View>
                            {/* <View className='items-end'>
                                <Text className='text-sm text-[var(--fade-text-color)] font-semibold tracking-wider'>
                                    {getWeight()} kg • {getHeight()} cm
                                </Text>
                            </View> */}
                        </View>
                        <Text className='text-sm text-[var(--fade-text-color)] font-semibold tracking-wider'>
                            {getWeight()} kg • {getHeight()} cm
                        </Text>
                    </>
                ) : (
                    <Text className='text-base font-bold tracking-widest'>
                        {getValue()}
                        <Text className='text-sm font-normal text-[var(--fade-text-color)]'> {recordDisplay.unit}</Text>
                    </Text>
                )}
                <View className='flex-row items-center w-full justify-between'>
                    <Text className='text-sm text-[var(--fade-text-color)] tracking-wider'>
                        {getTimeText()}
                    </Text>
                    <ChevronRight className='text-foreground' size={15} />
                </View>
            </View>
        </Pressable>
    )
}
