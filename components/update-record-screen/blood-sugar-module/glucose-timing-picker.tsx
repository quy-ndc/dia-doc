import * as React from 'react'
import { Text } from '../../ui/text'
import { Dimensions, Pressable, useColorScheme, View } from 'react-native'
import { useState } from 'react'
import { GlobalColor } from '../../../global-color'
import { UtensilsCrossed } from '../../../lib/icons/UtensilsCrossed'
import { Bed } from '../../../lib/icons/Bed'
import { Ham } from '../../../lib/icons/Ham'
import { Bone } from '../../../lib/icons/Bone'
import { MeasureTime } from '../../../assets/data/measure-time'


const { width } = Dimensions.get('window')

type Props = {
    setSelectPeriod: (period: MeasureTime) => void
}

export default function GlucoseTimingPicker({ setSelectPeriod }: Props) {

    const [selectedItem, setSelectedItem] = useState<number | null>(null)

    const theme = useColorScheme()
    const themeColor = theme == 'dark' ? GlobalColor.HALF_LIGHT_THEME_COL : GlobalColor.HALF_DARK_THEME_COL

    const handleSelectPeriod = (period: MeasureTime, id: number) => {
        setSelectPeriod(period)
        setSelectedItem(id)
    }

    const timeOptions = [
        {
            label: 'Chưa ăn',
            description: '8+ tiếng không ăn',
            icon: <UtensilsCrossed color={selectedItem === 0 ? GlobalColor.RED_NEON_BORDER : themeColor} size={18} />,
            color: GlobalColor.RED_NEON_BORDER,
            onPress: () => handleSelectPeriod(MeasureTime.HAVE_NOT_EATEN, 0)
        },
        {
            label: 'Trước bữa ăn',
            description: '15-30p trước bữa ăn',
            icon: <Ham color={selectedItem === 1 ? GlobalColor.YELLOW_NEON_BORDER : themeColor} size={18} />,
            color: GlobalColor.YELLOW_NEON_BORDER,
            onPress: () => handleSelectPeriod(MeasureTime.BEFORE_MEAL, 1)
        },
        {
            label: 'Sau bữa ăn',
            description: '1-2 tiếng sau bữa ăn',
            icon: <Bone color={selectedItem === 2 ? GlobalColor.GREEN_NEON_BORDER : themeColor} size={18} />,
            color: GlobalColor.GREEN_NEON_BORDER,
            onPress: () => handleSelectPeriod(MeasureTime.AFTER_MEAL, 2)
        }
    ]

    return (
        <View className='flex-row flex-wrap gap-3 justify-between mt-2'>
            {timeOptions.map((item, index) => {
                return (
                    <Pressable
                        key={index}
                        onPress={item.onPress}
                        style={{ width: (width - 40 - 12) / 2, borderColor: selectedItem === index ? item.color : themeColor }}
                        className={`px-3 py-5 rounded-md border border-[var(--fade-text-color)] active:scale-95`}
                    >
                        <View className='flex-col gap-2'>
                            <View className='flex-row items-center gap-3'>
                                {item.icon}
                                <Text
                                    style={{ color: selectedItem === index ? item.color : themeColor }}
                                    className={`text-base tracking-wider capitalize ${selectedItem === index ? 'font-bold' : ''}`}
                                >
                                    {item.label}
                                </Text>
                            </View>
                            <Text
                                style={{ color: selectedItem === index ? item.color : themeColor }}
                                className={`text-sm tracking-wider ${selectedItem === index ? 'font-bold' : ''}`}
                            >
                                {item.description}
                            </Text>
                        </View>
                    </Pressable>
                )
            })}
        </View>
    )
}