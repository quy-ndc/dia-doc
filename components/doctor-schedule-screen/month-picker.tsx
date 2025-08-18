import * as React from 'react'
import { Dimensions, Modal, Pressable, View } from "react-native"
import { Text } from "../../components/ui/text"
import { ChevronDown } from '../../lib/icons/ChevronDown'
import { useState } from 'react'

type Prop = {
    choosenMonth: string
    setChoosenMonth: (month: string) => void
}

const { height, width } = Dimensions.get('window')

export default function MonthPicker({ choosenMonth, setChoosenMonth }: Prop) {

    const [visible, setVisible] = useState(false)
    const currentMonth = new Date().getMonth() + 1

    const handleSelectMonth = (month: string) => {
        if (month == choosenMonth) {
            setChoosenMonth('')
        } else {
            setChoosenMonth(month)
            setVisible(false)
        }
    }

    return (
        <>
            <Pressable
                className='flex-row items-center gap-2 px-4 py-2 rounded-xl active:bg-[var(--click-bg)]'
                onPress={() => setVisible(true)}
            >
                <Text className='text-lg font-bold tracking-wider'>Lịch trong tháng {choosenMonth}</Text>
                <ChevronDown className='text-foreground' size={17} />
            </Pressable>
            <Modal
                visible={visible}
                animationType="fade"
                transparent
                onRequestClose={() => setVisible(false)}
            >
                <Pressable
                    className='flex-1 justify-center items-center bg-black/50'
                    onPress={() => setVisible(false)}
                >
                    <Pressable
                        style={{ width: width * 0.6, height: height * 0.3 }}
                        className='flex-col gap-2 items-center bg-[var(--noti-bg)] rounded-xl p-4'
                    >
                        <Text className='text-lg font-bold tracking-widest'>Chọn tháng</Text>
                        <View className='flex-row gap-2 items-center justify-center'>
                            {[1, 2, 3, 4].map((item) => (
                                <Pressable
                                    key={item}
                                    style={{ width: 40, height: 40 }}
                                    className={`flex items-center justify-center rounded-full active:bg-[var(--click-bg)] ${choosenMonth == item.toString() ? 'bg-[var(--oppo-theme-col)]' : ''} ${item < currentMonth ? 'opacity-50' : ''}`}
                                    onPress={() => handleSelectMonth(item.toString())}
                                    disabled={item < currentMonth}
                                >
                                    <Text className={`text-lg tracking-widest ${choosenMonth == item.toString() ? 'font-bold text-[var(--same-theme-col)]' : ''}`}>
                                        {item}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                        <View className='flex-row gap-2 items-center justify-center'>
                            {[5, 6, 7, 8].map((item) => (
                                <Pressable
                                    key={item}
                                    style={{ width: 40, height: 40 }}
                                    className={`flex items-center justify-center rounded-full active:bg-[var(--click-bg)] ${choosenMonth == item.toString() ? 'bg-[var(--oppo-theme-col)]' : ''} ${item < currentMonth ? 'opacity-50' : ''}`}
                                    onPress={() => handleSelectMonth(item.toString())}
                                    disabled={item < currentMonth}
                                >
                                    <Text className={`text-lg tracking-widest ${choosenMonth == item.toString() ? 'font-bold text-[var(--same-theme-col)]' : ''}`}>
                                        {item}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                        <View className='flex-row gap-2 items-center justify-center'>
                            {[9, 10, 11, 12].map((item) => (
                                <Pressable
                                    key={item}
                                    style={{ width: 40, height: 40 }}
                                    className={`flex items-center justify-center rounded-full active:bg-[var(--click-bg)] ${choosenMonth == item.toString() ? 'bg-[var(--oppo-theme-col)]' : ''} ${item < currentMonth ? 'opacity-50' : ''}`}
                                    onPress={() => handleSelectMonth(item.toString())}
                                    disabled={item < currentMonth}
                                >
                                    <Text className={`text-lg tracking-widest ${choosenMonth == item.toString() ? 'font-bold text-[var(--same-theme-col)]' : ''}`}>
                                        {item}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    )
}
