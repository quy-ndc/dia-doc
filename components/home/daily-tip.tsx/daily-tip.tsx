import { Dimensions, Pressable, View, Animated, Easing } from "react-native"
import { Text } from "../../../components/ui/text"
import { BookOpenCheck } from "../../../lib/icons/BookOpenCheck"
import { GlobalColor } from "../../../global-color"
import { getRandomDiabeticTip } from "../../../assets/data/daily-tips"
import React, { useRef, useState } from "react"
import { ChevronRight } from "../../../lib/icons/ChevronRight"
import IconButton from "../../common/icon-button"

const { width } = Dimensions.get('window')

export default function DailyTip() {

    const [tip, setTip] = useState(getRandomDiabeticTip())
    const [loading, setLoading] = useState(false)
    const opacity = useRef(new Animated.Value(1)).current

    const animateOpacity = (toValue: number, callback?: () => void) => {
        Animated.timing(opacity, {
            toValue,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.ease,
        }).start(() => {
            if (callback) callback()
        })
    }

    const handlePress = () => {
        if (loading) return
        setLoading(true)
        animateOpacity(0, () => {
            setTimeout(() => {
                setTip(getRandomDiabeticTip())
                animateOpacity(1, () => setLoading(false))
            }, 300)
        })
    }

    return (
        <Pressable
            onPress={handlePress}
            style={{ backgroundColor: GlobalColor.ORANGE_NEON_BG, width: width * 0.95 }}
            className='flex-col gap-4 pt-2 pb-3 rounded-xl active:opacity-70'
        >
            <View className="flex-row w-full px-3 justify-between items-center">
                <View className='flex-row gap-3 items-center text-center'>
                    <BookOpenCheck color={GlobalColor.ORANGE_NEON_BORDER} size={20} />
                    <Text className='text-lg mb-1 font-bold tracking-widest capitalize'>Mẹo sức khỏe</Text>
                </View>
                <IconButton
                    icon={<ChevronRight className="text-foreground" size={17} />}
                    buttonSize={3}
                    possition={"camera"}
                    onPress={handlePress}
                />
            </View>
            <Animated.View style={{ opacity }} className="flex-col items-center gap-3 px-2">
                <View className="flex-row gap-2 items-center">
                    {tip.icon}
                    <Text className="text-lg font-bold tracking-wider capitalize">
                        {tip.title}
                    </Text>
                </View>
                <Text className="text-base text-[var(--fade-text-color)] text-center tracking-wider">
                    {tip.desc}
                </Text>
            </Animated.View>
        </Pressable>
    )
}
