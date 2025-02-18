import * as React from 'react';
import { View, Dimensions, Animated as RNAnimated, Pressable, StyleSheet, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { Text } from '~/components/ui/text';
import LikeButton from '~/components/common/blog-item/like-button';
import CommentButton from '~/components/common/blog-item/comment-button';
import { useEffect, useRef, useState } from 'react';
import { Button } from '~/components/ui/button';
import { ChevronLeft } from '~/lib/icons/ChevronLeft';
import { ChevronRight } from '~/lib/icons/ChevronRight';
import Animated, { SlideInLeft, SlideOutLeft } from 'react-native-reanimated';
import { useLocalSearchParams } from 'expo-router';


const { width, height } = Dimensions.get('window');

export default function BlogDetailScreen() {

    const { avatar, title, name, images, liked } = useLocalSearchParams();

    const blogImages: string[] = JSON.parse(images as string) || [];
    const isLiked = liked == 'true'

    const carouselRef = useRef<ICarouselInstance>(null)

    const [currentIndex, setCurrentIndex] = useState(0)

    const [visible, setVisible] = useState(true);

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



    return (
        <Pressable
            className="flex-col gap-3 items-center h-full"
            onPress={toggleVisibility}
            android_disableSound
        >
            <View className='relative'>
                <Button
                    className="absolute top-1/2 -translate-y-1/2 left-0 z-10"
                    variant={'ghost'}
                    onPress={() => carouselRef.current?.prev()}
                >
                    <ChevronLeft className='text-foreground' />
                </Button>

                <Carousel
                    ref={carouselRef}
                    width={width}
                    height={550}
                    data={blogImages}
                    onSnapToItem={(index) => setCurrentIndex(index)}
                    renderItem={({ item }) => (
                        <Pressable onPress={toggleVisibility}>
                            <Image
                                source={item}
                                style={{ width: '100%', height: 550 }}
                                contentFit="contain"
                            />
                        </Pressable>
                    )}
                />

                <Button
                    className="absolute top-1/2 -translate-y-1/2 right-0 z-10"
                    variant={'ghost'}
                    onPress={() => carouselRef.current?.next()}
                >
                    <ChevronRight className='text-foreground' />
                </Button>
            </View>

            {images && (
                <View className='flex-row items-center'>
                    {blogImages.map((_, index) => (
                        <View
                            key={index}
                            className={`${currentIndex === index ? 'w-6 h-2 bg-[var(--carousel-color)]' : 'w-2 h-2'} border-2 border-[var(--carousel-color)] rounded-md mx-1`}
                        />
                    ))}
                </View>
            )}

            <RNAnimated.View
                className='absolute bottom-0 left-0 right-0 px-4 pb-4'
                style={[styles.container, { opacity }]}
            >
                <View className={`flex-col gap-3`}>
                    <View className='flex-row gap-2 items-center'>
                        <Image
                            source={avatar}
                            style={{ width: 30, height: 30, borderRadius: 1000 }}
                            contentFit="cover"
                        />
                        <Text className='text-lg font-bold'>{name}</Text>
                    </View>
                    <Text className='text-lg font-bold'>{title}</Text>
                    <View className="flex-row gap-1">
                        <LikeButton liked={isLiked} />
                        <CommentButton />
                    </View>
                </View>
            </RNAnimated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        // position: 'absolute',
        // bottom: 0,
        // left: 0,
        // right: 0,
    }
});