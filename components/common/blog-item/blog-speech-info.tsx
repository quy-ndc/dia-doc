import * as React from 'react'
import IconButton from '../icon-button'
import { CircleAlert } from '../../../lib/icons/CircleAlert'
import Toast from 'react-native-toast-message'
import { Dimensions, Modal, Pressable, View } from 'react-native'
import { useState, useRef, useCallback } from 'react'
import { Text } from '../../../components/ui/text'
import { FlashList, ViewToken } from '@shopify/flash-list'
import { Image } from 'expo-image'
import { ChevronLeft } from '../../../lib/icons/ChevronLeft'
import { ChevronRight } from '../../../lib/icons/ChevronRight'
import { ThumbsUp } from '../../../lib/icons/ThumbsUp'
import { GlobalColor } from '../../../global-color'

const { height, width } = Dimensions.get('window')

type TTSGuideStep = {
    text: string;
    image: React.ReactElement;
}

const ttsGuideSteps = [
    {
        text: "Mở cài đặt của điện thoại",
        image:
            <Image
                style={{ width: width * 0.8, height: width * 0.8 }}
                contentFit='contain'
                source={require(`../../../assets/images/tts-guide-step-1.jpg`)}
            />
    },
    {
        text: "Nhập ngôn ngữ vào ô tìm kiếm",
        image:
            <Image
                style={{ width: width * 0.8, height: width * 0.8 }}
                contentFit='contain'
                source={require(`../../../assets/images/tts-guide-step-2.jpg`)}
            />
    },
    {
        text: "Chọn Văn bản sang giọng nói",
        image:
            <Image
                style={{ width: width * 0.8, height: width * 0.8 }}
                contentFit='contain'
                source={require(`../../../assets/images/tts-guide-step-3.jpg`)}
            />
    },
    {
        text: "Chọn Công cụ yêu thích",
        image:
            <Image
                style={{ width: width * 0.8, height: width * 0.8 }}
                contentFit='contain'
                source={require(`../../../assets/images/tts-guide-step-4.jpg`)}
            />
    },
    {
        text: "Chọn lựa chọn của Googles",
        image:
            <Image
                style={{ width: width * 0.8, height: width * 0.8 }}
                contentFit='contain'
                source={require(`../../../assets/images/tts-guide-step-5.jpg`)}
            />
    }
]

export default function SpeechInfoButton() {
    const [open, setOpen] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const listRef = useRef<FlashList<TTSGuideStep>>(null)

    const handlePrevious = () => {
        if (currentIndex > 0) {
            listRef.current?.scrollToIndex({
                index: currentIndex - 1,
                animated: true
            })
            setCurrentIndex(currentIndex - 1)
        }
    }

    const handleNext = () => {
        if (currentIndex < ttsGuideSteps.length - 1) {
            listRef.current?.scrollToIndex({
                index: currentIndex + 1,
                animated: true
            })
            setCurrentIndex(currentIndex + 1)
        }
    }

    const onViewableItemsChanged = useCallback(({ viewableItems }: {
        viewableItems: ViewToken[]
    }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index ?? 0)
        }
    }, [])

    return (
        <>
            <IconButton
                icon={<CircleAlert color={GlobalColor.BLUE_NEON_BORDER} size={16} />}
                buttonSize={3}
                possition={'other'}
                onPress={() => setOpen(true)}
            />
            <Modal
                visible={open}
                animationType="fade"
                transparent
                onRequestClose={() => setOpen(false)}
            >
                <Pressable
                    className="flex-1 justify-center items-center bg-black/50"
                    onPress={() => setOpen(false)}
                >
                    <Pressable
                        style={{ width: width * 0.9, minHeight: height * 0.6 }}
                        className="flex-col justify-center items-center px-5 pb-5 pt-10 bg-[var(--noti-bg)] rounded-2xl"
                    >
                        <View className='flex-1 w-full items-center justify-center gap-5'>
                            <Text className='text-lg tracking-widest font-semibold text-center'>Hướng dẫn sử dụng cho chức năng văn bản sang giọng nói</Text>
                            <View className='flex-1 flex-col w-full'>
                                <FlashList
                                    ref={listRef}
                                    data={ttsGuideSteps}
                                    keyExtractor={(_, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <View className='flex-col w-full items-center gap-2 relative'>
                                            <Text className='text-base tracking-widest text-center'>{item.text}</Text>
                                            {item.image}
                                        </View>
                                    )}
                                    estimatedItemSize={100}
                                    scrollEventThrottle={16}
                                    showsHorizontalScrollIndicator={false}
                                    horizontal
                                    pagingEnabled
                                    onViewableItemsChanged={onViewableItemsChanged}
                                    viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
                                />
                            </View>
                        </View>

                        <View className='flex-row justify-between items-center w-full'>
                            <View className='flex-row gap-2 items-center'>
                                <IconButton
                                    icon={<ChevronLeft className='text-foreground' size={22} />}
                                    buttonSize={2}
                                    onPress={handlePrevious}
                                    possition='other'
                                />
                                <IconButton
                                    icon={<ChevronRight className='text-foreground' size={22} />}
                                    buttonSize={2}
                                    onPress={handleNext}
                                    possition='other'
                                />
                            </View>
                            <View />
                        </View>

                        <View className='flex-row justify-between items-center w-full'>
                            <View />
                            <View className='flex-row items-center gap-3'>
                                <Pressable
                                    className='flex-row items-center gap-2 px-5 py-2 rounded-full bg-[var(--oppo-theme-col)] active:bg-opacity-60'
                                    onPress={() => setOpen(false)}
                                >
                                    <Text className='text-sm text-[var(--same-theme-col)] tracking-widest font-semibold'>Đã Hiểu</Text>
                                    <ThumbsUp className='text-[var(--same-theme-col)]' size={15} />
                                </Pressable>
                            </View>
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    )
}