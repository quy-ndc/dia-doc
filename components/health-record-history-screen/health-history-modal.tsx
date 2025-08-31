import * as React from 'react'
import { Dimensions, Modal, Pressable, useColorScheme, View } from "react-native"
import { Text } from "../ui/text"
import { getHealthRecordDisplay } from '../../assets/data/health-record-type'
import { HealthRecordType } from '../../assets/enum/health-record'
import { BloodPressureRecord, BmiRecord, HealthTrackItem } from '../../assets/types/user/health-track'
import { Clock } from '../../lib/icons/Clock'
import { formatTime } from '../../util/format-time'
import { formatDate } from '../../util/format-date'
import { PenLine } from '../../lib/icons/PenLine'
import { GlobalColor } from '../../global-color'
import { Bot } from '../../lib/icons/Bot'
import { Check } from '../../lib/icons/Check'
import Markdown from 'react-native-markdown-display'

type Prop = {
    visible: boolean
    setVisible: (visible: boolean) => void
    item: HealthTrackItem
}

const { width } = Dimensions.get('window')

export default function HealthRecordHistoryModal({ visible, setVisible, item }: Prop) {

    if (item.healthRecord == undefined) return null

    const theme = useColorScheme()
    const textColor = theme == 'dark' ? GlobalColor.LIGHT_THEME_COL : GlobalColor.DARK_THEME_COL

    const recordDisplay = getHealthRecordDisplay(item.recordType)

    const getValue = () => {
        if (!item.healthRecord) return '0'

        if (item.recordType === HealthRecordType.BLOOD_PRESSURE) {
            const bpRecord = item.healthRecord as BloodPressureRecord
            return bpRecord?.systolic && bpRecord?.diastolic
                ? `${bpRecord.systolic}/${bpRecord.diastolic}`
                : 'N/A'
        } else if (item.recordType === HealthRecordType.BMI) {
            const bmiRecord = item.healthRecord as BmiRecord
            return bmiRecord?.bmi ?? 'N/A'
        }
        return (item.healthRecord as any).value ?? 'N/A'
    }

    return (
        <Modal
            visible={visible}
            onRequestClose={() => setVisible(false)}
            transparent
            animationType='fade'
        >
            <Pressable
                className='flex-1 justify-center items-center bg-black/50'
                onPress={() => setVisible(false)}
            >
                <Pressable
                    className={`p-4 gap-2 rounded-xl bg-[var(--same-theme-col)]`}
                    style={{ width: width * 0.96 }}
                >
                    <View className='flex-col gap-5'>
                        <View className='flex-row gap-1 items-center'>
                            <Text
                                style={{ color: recordDisplay.iconColor }}
                                className='text-3xl font-bold tracking-widest'
                            >
                                {getValue()}
                            </Text>
                            <Text className='text-base font-medium text-[var(--fade-text-color)]'> {recordDisplay.unit}</Text>
                        </View>
                        {item.mesurementAt ? (
                            <View className='flex-row items-center gap-2'>
                                <Clock className='text-foreground' size={18} />
                                <Text className='text-sm font-bold text-[var(--fade-text-color)] tracking-wider'>
                                    {`${formatDate(item.mesurementAt)}  vào  ${formatTime(item.mesurementAt)}`}
                                </Text>
                            </View>
                        ) : (
                            <Text className='text-sm text-[var(--fade-text-color)] tracking-wider'>
                                Chưa có dữ liệu
                            </Text>
                        )}
                        <View className='flex-row gap-2 items-center'>
                            <PenLine color={GlobalColor.CYAN_NEON_BORDER} size={17} />
                            <Text className='text-base font-medium tracking-wider'>
                                {!item.personNote || item.personNote == '' ? 'Không có ghi chú cá nhân' : item.personNote}
                            </Text>
                        </View>
                        <View className='flex-col gap-2'>
                            <View className='flex-row gap-2 items-center'>
                                <Bot color={GlobalColor.BLUE_NEON_BORDER} size={17} />
                                <Text className='text-base font-medium tracking-wider'>Lời khuyên từ AI</Text>
                            </View>
                            {item.assistantNote && item.assistantNote.length > 0 && (
                                <View className='flex-col'>
                                    {item.assistantNote.map((note, index) => (
                                        <Markdown
                                            key={index}
                                            style={{ body: { letterSpacing: 0.6, color: textColor } }}
                                        >
                                            {note}
                                        </Markdown>
                                    ))}
                                </View>
                            )}
                        </View>
                        <Pressable
                            onPress={() => setVisible(false)}
                            className='flex-row px-4 py-2 items-center justify-center gap-2 rounded-xl bg-[var(--oppo-theme-col)] active:opacity-80'
                        >
                            <Text className='text-base text-[var(--same-theme-col)] font-medium tracking-wider'>Đã hiểu</Text>
                            <Check className='text-[var(--same-theme-col)]' size={17} />
                        </Pressable>
                    </View>
                </Pressable>
            </Pressable>
        </Modal >
    )
}
