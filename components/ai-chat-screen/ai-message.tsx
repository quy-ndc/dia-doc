import * as React from 'react'
import { View } from 'react-native'
import { Image } from 'expo-image'
import Markdown from 'react-native-markdown-display'
import { useColorScheme } from '../../lib/useColorScheme'
import { GlobalColor } from '../../global-color'

type Prop = {
    image: string
    content: string
    isOwn: boolean
}

export function AiMessage({ image, content, isOwn }: Prop) {

    const { colorScheme } = useColorScheme()

    const ownTextColor = colorScheme == 'dark' ? GlobalColor.DARK_THEME_COL : GlobalColor.LIGHT_THEME_COL
    const oppoTextColor = colorScheme == 'dark' ? GlobalColor.LIGHT_THEME_COL : GlobalColor.DARK_THEME_COL

    return (
        <View className="flex-row justify-between w-full my-2">
            {isOwn && <View />}
            <View className='flex-col gap-2 max-w-[85%]'>
                {!isOwn && (
                    <Image
                        style={{ width: 30, height: 30, borderRadius: 1000 }}
                        source={image == '' ? require('../../assets/images/default-user.jpg') : image}
                        contentFit='contain'
                    />
                )}
                <View className={`flex-row items-center px-4 py-1.5 rounded-2xl ${isOwn ? 'bg-[--own-message-bg]' : 'bg-[--ownt-message-bg]'}`}>
                    <Markdown
                        style={{
                            body: {
                                letterSpacing: 0.6,
                                color: isOwn ? ownTextColor : oppoTextColor,
                            },
                        }}
                    >
                        {content}
                    </Markdown>
                </View>
            </View>
            {!isOwn && <View />}
        </View>
    )
}
