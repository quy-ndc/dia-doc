import * as React from 'react';
import { useState } from 'react';
import { Modal, Pressable, View, useColorScheme } from 'react-native';
import { Text } from '../ui/text';
import { formatDateMessage } from '../../util/format-date-message';
import { Image } from 'expo-image';
import { Button } from '../ui/button';
import { X } from '../../lib/icons/X';
import ImageViewer from 'react-native-image-zoom-viewer';
import { ImageZoom } from '@likashefqet/react-native-image-zoom';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GlobalColor } from '../../global-color';


type Prop = {
    content: string;
    time: string;
    isOwn: boolean;
}


export function ImageMessage({ content, time, isOwn }: Prop) {

    const theme = useColorScheme()

    const [showTime, setShowTime] = useState(false)
    const [modallVisible, setModalVisible] = useState(false)
    const [visible, setVisible] = useState(false)

    const onImageClick = () => {
        setModalVisible(!modallVisible)
    }

    const onImageSwipe = () => {
        setModalVisible(!modallVisible)
    }


    return (
        <View className='flex-col gap-4 justify-center items-center'>
            {showTime && (
                <Text className='text-sm text-[--fade-text-color] pt-2'>{formatDateMessage(time)}</Text>
            )}
            <View className='flex-row justify-between w-full my-1'>
                {isOwn && (
                    <View />
                )}
                <Modal visible={modallVisible}>
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
                <Pressable
                    className={`w-[70%] py-4`}
                    onPress={onImageClick}
                >
                    <Image
                        style={{
                            width: '100%',
                            minHeight: 300,
                            maxHeight: 350,
                            borderRadius: 20,
                        }}
                        source={content}
                        contentFit='cover'
                    />
                </Pressable>
                {!isOwn && (
                    <View />
                )}
            </View>
        </View>
    );
}