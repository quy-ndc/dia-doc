import * as React from 'react';
import { Text } from '../../ui/text';
import { Dimensions, Pressable, useColorScheme, View } from 'react-native';
import { useState } from 'react';
import { GlobalColor } from '../../../global-color';
import { Clock } from '../../../lib/icons/Clock';
import { Calendar } from '../../../lib/icons/Calendar';
import { Sun } from '../../../lib/icons/Sun';
import { Moon } from '../../../lib/icons/Moon';
import DateTimePicker from '@react-native-community/datetimepicker'
import { formatTime } from '../../../util/format-time';
import SectionTitle from '../../home/common/section-title';
import { Sunrise } from '../../../lib/icons/Sunrise';



const { width } = Dimensions.get('window')

type Props = {
    setSelectedTime: (time: string) => void
}

export default function RecordTimePicker({ setSelectedTime }: Props) {

    const [show, setShow] = useState(false)
    const [selectedItem, setSelectedItem] = useState<number | null>(null)
    const [customTime, setCustomTime] = useState('')

    const theme = useColorScheme()
    const themeColor = theme == 'dark' ? GlobalColor.HALF_LIGHT_THEME_COL : GlobalColor.HALF_DARK_THEME_COL

    const handleSelectTime = (time: string, id: number) => {
        setSelectedTime(time)
        setSelectedItem(id)
    }


    const timeOptions = [
        {
            label: 'Bây giờ',
            icon: <Clock color={selectedItem === 0 ? GlobalColor.EMERALD_NEON_BORDER : themeColor} size={18} />,
            color: GlobalColor.EMERALD_NEON_BORDER,
            onPress: () => handleSelectTime(new Date().toISOString(), 0)
        },
        {
            label: '7 giờ sáng',
            icon: <Sunrise color={selectedItem === 1 ? GlobalColor.YELLOW_NEON_BORDER : themeColor} size={18} />,
            color: GlobalColor.ORANGE_NEON_BORDER,
            onPress: () => {
                const today = new Date()
                today.setHours(7, 0, 0, 0)
                handleSelectTime(today.toISOString(), 1)
            }
        },
        {
            label: '12 giờ trưa',
            icon: <Sun color={selectedItem === 2 ? GlobalColor.YELLOW_NEON_BORDER : themeColor} size={18} />,
            color: GlobalColor.YELLOW_NEON_BORDER,
            onPress: () => {
                const today = new Date()
                today.setHours(12, 0, 0, 0)
                handleSelectTime(today.toISOString(), 2)
            }
        },
        {
            label: '7 giờ tối',
            icon: <Moon color={selectedItem === 3 ? GlobalColor.PURPLE_NEON_BORDER : themeColor} size={18} />,
            color: GlobalColor.PURPLE_NEON_BORDER,
            onPress: () => {
                const today = new Date()
                today.setHours(19, 0, 0, 0)
                handleSelectTime(today.toISOString(), 3)
            }
        }
    ]

    const handleCustomTime = (item: string) => {
        setCustomTime(item)
        setSelectedTime(item)
        setSelectedItem(4)
    }


    return (
        <View className='flex-col gap-2 w-full px-5'>
            <View className='flex-row w-full items-center justify-between'>
                <SectionTitle
                    icon={<Clock color={GlobalColor.CYAN_NEON_BORDER} size={18} />}
                    title='Thời gian đo'
                />
                <View />
            </View>
            <View className='flex-row flex-wrap gap-3 justify-between mt-2'>
                {timeOptions.map((item, index) => {
                    return (
                        <Pressable
                            key={index}
                            onPress={item.onPress}
                            style={{ width: (width - 40 - 12) / 2, borderColor: selectedItem === index ? item.color : themeColor }}
                            className={`py-5 rounded-md border border-[var(--fade-text-color)] items-center justify-center active:scale-95`}
                        >
                            <View className='flex-row items-center gap-3'>
                                {item.icon}
                                <Text
                                    style={{ color: selectedItem === index ? item.color : themeColor }}
                                    className={`text-base tracking-wider capitalize ${selectedItem === index ? 'font-bold' : ''}`}
                                >
                                    {item.label}
                                </Text>
                            </View>
                        </Pressable>
                    )
                })}
                <Pressable
                    onPress={() => setShow(true)}
                    style={{ width: (width - 40 - 12) / 2, borderColor: selectedItem === 4 ? GlobalColor.BLUE_NEON_BORDER : themeColor }}
                    className={`py-5 rounded-md border border-[var(--fade-text-color)] items-center justify-center active:scale-95`}
                >
                    <View className='flex-row items-center gap-3'>
                        <Calendar color={selectedItem === 4 ? GlobalColor.BLUE_NEON_BORDER : themeColor} size={18} />
                        <Text
                            style={{ color: selectedItem === 4 ? GlobalColor.BLUE_NEON_BORDER : themeColor }}
                            className={`text-base tracking-wider capitalize ${selectedItem === 4 ? 'font-bold' : ''}`}
                        >
                            {customTime ? formatTime(customTime) : 'Tùy chỉnh'}
                        </Text>
                    </View>
                </Pressable>
                {show && (
                    <DateTimePicker
                        value={customTime ? new Date(customTime) : new Date()}
                        mode="time"
                        display="clock"
                        onChange={(event, selectedDate) => {
                            setShow(false)
                            if (event.type === 'set' && selectedDate) {
                                handleCustomTime(selectedDate.toISOString())
                            }
                        }}
                    />
                )}
            </View>
        </View>
    );
}