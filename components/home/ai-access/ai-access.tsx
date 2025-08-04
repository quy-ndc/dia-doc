import * as React from 'react'
import { Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { GlobalColor } from '../../../global-color'
import { router } from 'expo-router'
import { Bot } from '../../../lib/icons/Bot'

export default function AiAccess() {

    return (
        <Pressable
            style={{
                shadowColor: GlobalColor.BLUE_NEON_BORDER,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,
                elevation: 8,
            }}
            className='flex absolute bottom-5 right-7 items-center justify-center rounded-full active:opacity-80 overflow-hidden'
            onPress={() => router.push({
                pathname: 'ai-chat-screen',
                params: {
                    title: 'Cuộc trò chuyện mới'
                }
            })}
        >
            <LinearGradient
                colors={[GlobalColor.MORNING_WELCOME_1_DARK, GlobalColor.MORNING_WELCOME_2_DARK, GlobalColor.MORNING_WELCOME_3_DARK]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className='p-4'
            >
                <Bot className='text-white' size={17} />
            </LinearGradient>
        </Pressable>
    )
}