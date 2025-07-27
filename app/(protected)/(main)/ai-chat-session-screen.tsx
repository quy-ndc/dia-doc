import * as React from 'react'
import AiChatItem from '../../../components/ai-chat-screen/ai-chat-item'
import { Pressable, ScrollView, View } from 'react-native'
import { GlobalColor } from '../../../global-color'
import { Plus } from '../../../lib/icons/Plus'


export default function AiChatSessionScreen() {

    return (
        <View className='flex-1 relative'>
            <ScrollView>
                <AiChatItem />
            </ScrollView>
            <Pressable
                style={{ backgroundColor: GlobalColor.BLUE_NEON_BORDER }}
                className='flex absolute bottom-7 right-7 p-4 items-center justify-center rounded-full active:opacity-80'
                onPress={() => { }}
            >
                <Plus className='text-white' size={17} />
            </Pressable>
        </View>
    )
}