import * as React from 'react'
import { Text } from '../../../components/ui/text'
import { Animated, Dimensions, View } from 'react-native'
import { Info } from '../../../lib/icons/Info'
import { GlobalColor } from '../../../global-color'
import { useEffect, useRef } from 'react'

const { width } = Dimensions.get('window')

type Props = {
    text1: string
    text2: string
    loading1?: boolean
    loading2?: boolean
}

export default function LoadingBanner({ text1, text2, loading1, loading2 }: Props) {
    const opacity = useRef(new Animated.Value(1)).current

    useEffect(() => {
        const animate = () => {
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0.5,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                })
            ]).start(() => {
                if (loading1 || loading2) {
                    animate()
                } else {
                    opacity.setValue(1)
                }
            })
        }

        if (loading1 || loading2) {
            animate()
        } else {
            opacity.setValue(1)
        }

        return () => {
            opacity.setValue(1)
        }
    }, [loading1, loading2])

    if (!loading1 && !loading2) return null

    return (
        <Animated.View
            style={{
                backgroundColor: GlobalColor.BLUE_NEON_BG,
                width: width * 0.95,
                opacity
            }}
            className='flex-row gap-2 p-3 rounded-xl'
        >
            <Info
                className='mt-1'
                color={GlobalColor.BLUE_NEON_BORDER}
                size={17}
            />
            <View className='flex-1'>
                <Text className='text-base font-medium tracking-wider flex-wrap'>
                    {loading1 ? text1 : loading2 ? text2 : ''}
                </Text>
            </View>
        </Animated.View>
    )
}