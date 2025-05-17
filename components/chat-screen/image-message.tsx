import * as React from 'react';
import { useState } from 'react';
import { Modal, Pressable, View, useColorScheme } from 'react-native';
import { Image } from 'expo-image';
import { X } from '../../lib/icons/X';
import { ImageZoom } from '@likashefqet/react-native-image-zoom';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GlobalColor } from '../../global-color';
import { Text } from '../../components/ui/text'
import { formatDateMessage } from '../../util/format-date-message';

type Prop = {
    content: string
    name: string
    avatar: string
    time: string
    isOwn: boolean
}


export function ImageMessage({ content, name, time, avatar, isOwn }: Prop) {

    const theme = useColorScheme()

    const [modallVisible, setModalVisible] = useState(false)

    const userName = name ? name?.trim().split(' ').pop() : 'N/A'

    const onImageClick = () => {
        setModalVisible(!modallVisible)
    }

    const onImageSwipe = () => {
        setModalVisible(!modallVisible)
    }


    return (
        <View className='flex-col py-1 justify-center items-center'>
            <View
                className={`flex-row w-full justify-between items-center`}
            >
                {isOwn && <View />}
                <View
                    className={`flex-row gap-4`}
                >
                    {!isOwn && (
                        <Text className='text-sm font-semibold tracking-wider'>{userName}</Text>
                    )}
                    <Text className={`text-sm text-[--fade-text-color] tracking-widest`}>
                        {formatDateMessage(time)}
                    </Text>
                </View>
                {!isOwn && <View />}
            </View>

            <View className='flex-row justify-between w-full my-1'>
                {isOwn && (<View />)}
                <Modal visible={modallVisible} animationType='slide'>
                    <View className="flex-row justify-between items-center bg-[var(--same-theme-col)]">
                        <Pressable
                            className="mt-3 ml-3 p-4 rounded-full active:bg-[var(--click-bg)]"
                            onPress={onImageSwipe}
                        >
                            <X className="text-[var(--oppo-theme-col)]" size={24} />
                        </Pressable>
                        <View />
                    </View>
                    <GestureHandlerRootView>
                        <ImageZoom
                            style={{ backgroundColor: theme == 'dark' ? GlobalColor.DARK_THEME_COL : GlobalColor.LIGHT_THEME_COL }}
                            uri={content}
                            minScale={1}
                            maxScale={10}
                            doubleTapScale={3}
                            isDoubleTapEnabled
                            resizeMode={'contain'}
                        />
                    </GestureHandlerRootView>
                </Modal>
                <View className='flex-row gap-2'>
                    {!isOwn && (
                        <Image
                            style={{ width: 30, height: 30, borderRadius: 1000 }}
                            source={avatar}
                            contentFit='contain'
                        />
                    )}
                    <Pressable onPress={onImageClick}>
                        <Image
                            style={{
                                width: '100%',
                                minWidth: 250,
                                minHeight: 300,
                                maxHeight: 350,
                                borderRadius: 20
                            }}
                            source={content}
                            contentFit='cover'
                        />
                    </Pressable>
                </View>
                {!isOwn && (<View />)}
            </View>
        </View>
    );
}