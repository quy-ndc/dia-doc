import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Animated as RNAnimated, View, StyleSheet, Pressable, Dimensions, Modal, ScrollView, NativeSyntheticEvent, NativeScrollEvent, Platform } from "react-native";
import { Text } from '~/components/ui/text'
import { formatDateBlog } from "~/util/format-date-post";
import LikeButton from "./like-button";
import CommentButton from "./comment-button";
import { useRef, useState } from "react";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { Button } from "~/components/ui/button";
import { ChevronLeft } from "~/lib/icons/ChevronLeft";
import { ChevronRight } from "~/lib/icons/ChevronRight";
import ImageViewer from "react-native-image-zoom-viewer";
import { X } from "~/lib/icons/X";


type Prop = {
    avatar: string
    name: string
    title: string
    // content: string
    images: string[]
    liked: boolean
}

const { width, height } = Dimensions.get('window');

export default function DetailImage({
    avatar,
    name,
    title,
    //    content,
    images,
    liked,
}: Prop) {

    const [modallVisible, setModalVisible] = useState(false)
    const [visible, setVisible] = useState(false)
    const opacity = useRef(new RNAnimated.Value(1)).current;
    const toggleVisibility = () => {
        RNAnimated.timing(opacity, {
            toValue: visible ? 0 : 1,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setVisible(!visible);
        });
    };

    const scrollViewRef = useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / width);
        setCurrentIndex(index);
    };

    const zoomableImages = images.map((url) => ({
        url,
        props: {}
    }));

    const onImageClick = () => {
        setModalVisible(!modallVisible)
    }

    const onImageSwipe = () => {
        setModalVisible(!modallVisible)
    }


    return (
        <>
            <Modal visible={modallVisible}>
                <View className="flex-row justify-between items-center bg-black">
                    <Button
                        variant={"ghost"}
                        className="bg-black"
                        onPress={onImageSwipe}
                    >
                        <X className="text-white" />
                    </Button>
                    <View />
                </View>
                <ImageViewer
                    imageUrls={zoomableImages}
                    enableSwipeDown
                    onSwipeDown={onImageSwipe}
                    onClick={toggleVisibility}
                />
                <RNAnimated.View
                    className='absolute bottom-0 left-0 right-0 px-4 pb-4'
                    style={[{ opacity }]}
                >
                    <View className={`flex-col gap-3 w-full`}>
                        <View className='flex-row gap-2 items-center'>
                            <Image
                                source={avatar}
                                style={{ width: 30, height: 30, borderRadius: 1000 }}
                                contentFit="cover"
                            />
                            <Text className='text-lg text-white font-bold'>{name}</Text>
                        </View>
                        <Text className='text-lg text-white font-bold'>{title}</Text>
                        <View className={`flex-row gap-1 ${Platform.OS == 'ios' && 'pb-5'}`}>
                            <LikeButton
                                liked={liked}
                                detail
                            />
                            <CommentButton
                                avatar={avatar}
                                title={title}
                                name={name}
                                images={images}
                                liked={liked}
                                detail
                            />
                        </View>
                    </View>
                </RNAnimated.View>
            </Modal>

            <View className='relative'>
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={onScroll}
                    scrollEventThrottle={16}
                    style={{ width: width }}
                >
                    {images.map((image, index) => (
                        <Pressable
                            key={index}
                            style={{ width: width }}
                            onPress={onImageClick}
                        >
                            <Image
                                key={index}
                                source={image}
                                contentFit="contain"
                                style={{ width: '100%', height: 550 }}
                            />
                        </Pressable>
                    ))}
                </ScrollView>

                <View className="absolute bottom-0 left-1/2 -translate-x-1/2 flex-row items-center z-10">
                    {images.map((_, index) => (
                        <View
                            key={index}
                            className={`${currentIndex === index
                                ? 'w-6 h-2 bg-[var(--carousel-color)]'
                                : 'w-2 h-2'
                                } border-2 border-[var(--carousel-color)] rounded-md mx-1`}
                        />
                    ))}
                </View>
            </View>
        </>
    );
}
