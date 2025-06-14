import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useWelcomeGradientColors } from '../../../util/get-welcome-bg'

export default function HomeHeaderBg() {
  const welcome = useWelcomeGradientColors()

  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 10000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 10000,
          useNativeDriver: true,
        }),
      ])
    ).start()
  }, [])

  return (
    <>
      <LinearGradient
        colors={welcome.colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: fadeAnim }]}>
        <LinearGradient
          colors={[...welcome.colors.slice(1), welcome.colors[1]] as unknown as [string, string, ...string[]]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </>
  )
}
