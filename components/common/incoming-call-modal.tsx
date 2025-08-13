import React, { useEffect } from 'react'
import { Modal, View, Text, StyleSheet, TouchableOpacity, Vibration, Pressable } from 'react-native'
import useVideoCallStore from '../../store/videoCallStore'
import { router } from 'expo-router'
import useUserStore from '../../store/userStore'
import { Phone } from '../../lib/icons/Phone'
import { GlobalColor } from '../../global-color'
import { PhoneOff } from '../../lib/icons/PhoneOff'
import { Image } from 'expo-image'

export default function IncomingCallModal() {
    const { incomingCall, declineCall, clearIncomingCall } = useVideoCallStore()
    const { user } = useUserStore()

    useEffect(() => {
        if (incomingCall) {
            const intervalId = setInterval(() => {
                Vibration.vibrate(500)
            }, 1000)
            return () => {
                clearInterval(intervalId)
                Vibration.cancel()
            }
        } else {
            Vibration.cancel()
        }
    }, [incomingCall])

    const handleAccept = async () => {
        if (incomingCall) {
            clearIncomingCall()
            router.push({
                pathname: '/(protected)/video-call-screen',
                params: {
                    userId: user.id,
                    targetUserId: incomingCall.fromUserId,
                    mode: 'answer',
                    offer: JSON.stringify(incomingCall.offer)
                }
            })
        }
    }

    const handleDecline = async () => {
        if (incomingCall) {
            await declineCall(incomingCall.fromUserId)
        }
    }

    if (!incomingCall) return null

    return (
        <Modal
            visible={true}
            animationType="slide"
        >
            <View className='flex-col flex-1 p-5 items-center justify-between bg-[var(--same-theme-col)]'>
                <View className='flex-col gap-10 p-5 items-center justify-between'>
                    <Text className='text-2xl font-bold tracking-wider text-[var(--oppo-theme-col)] capitalize'>Cuộc gọi đến</Text>
                    <Image
                        style={{ width: 200, height: 200, borderRadius: 1000 }}
                        source={incomingCall.avatar}
                        contentFit='cover'
                    />
                    <Text className='text-2xl font-bold tracking-wider text-[var(--oppo-theme-col)]'>{incomingCall?.name}</Text>
                </View>
                <View className='flex-row gap-20 items-center'>
                    <Pressable
                        style={{ backgroundColor: GlobalColor.RED_NEON_BORDER }}
                        className='flex items-center justify-center rounded-full p-6 active:opacity-60'
                        onPress={handleDecline}
                    >
                        <PhoneOff className='text-white' size={23} />
                    </Pressable>

                    <Pressable
                        style={{ backgroundColor: GlobalColor.GREEN_NEON_BORDER }}
                        className='flex items-center justify-center rounded-full p-6 active:opacity-60'
                        onPress={handleAccept}
                    >
                        <Phone className='text-white' size={23} />
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}