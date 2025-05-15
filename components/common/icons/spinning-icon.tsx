import * as React from 'react'
import { Animated, Easing } from 'react-native'
import { useEffect, useRef } from 'react'

type Prop = {
    icon: React.ReactNode
}

export default function SpinningIcon({ icon }: Prop) {

    const spinValue = useRef(new Animated.Value(0)).current

    useEffect(() => {
        const spinAnimation = Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        )
        spinAnimation.start()
    }, [])

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    })


    return (
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
            {icon}
        </Animated.View>
    )
}

