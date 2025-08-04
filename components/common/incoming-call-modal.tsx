import React, { useState } from 'react'
import { View, Text, Dimensions, Modal, Pressable, } from 'react-native'
import { GlobalColor } from '../../global-color'
import { PhoneOff } from '../../lib/icons/PhoneOff'
import { Phone } from '../../lib/icons/Phone'

export default function IncomingCallModal() {

    const [visible, setVisible] = useState(true)

    return (
        <Modal visible={visible}>
            <View className='flex-col h-full justify-between items-center p-5 bg-[var(--same-theme-col)]'>
                <View className='flex-row justify-between items-center'>
                    <Text className='text-white text-2xl font-bold text-[var(--oppo-theme-col)]'>Incoming Call</Text>
                </View>
                <View className='flex-row gap-10 justify-center items-center'>
                    <Pressable
                        style={{ backgroundColor: GlobalColor.RED_NEON_BORDER }}
                        className='flex p-7 items-center justify-center rounded-full active:opacity-70'
                        onPress={() => setVisible(false)}
                    >
                        <PhoneOff className='text-white' size={20} />
                    </Pressable>
                    <Pressable
                        style={{ backgroundColor: GlobalColor.GREEN_NEON_BORDER }}
                        className='flex p-7 items-center justify-center rounded-full active:opacity-70'
                    >
                        <Phone className='text-white' size={20} />
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}
