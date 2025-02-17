import * as React from 'react';
import { View, Dimensions, Animated, Pressable, StyleSheet, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { Text } from '~/components/ui/text';
import LikeButton from '~/components/common/blog-item/like-button';
import CommentButton from '~/components/common/blog-item/comment-button';
import { useEffect, useRef, useState } from 'react';
import { Button } from '~/components/ui/button';
import { ChevronLeft } from '~/lib/icons/ChevronLeft';
import { ChevronRight } from '~/lib/icons/ChevronRight';
import { Dot } from '~/lib/icons/Dot';

const { width, height } = Dimensions.get('window');

export default function BlogDetailScreen() {

    const images = [
        'https://res.cloudinary.com/dcjdtlnbl/image/upload/v1730225300/right2_vvzeur.jpg',
        'https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729103770/blouse-category-image_slezvn.webp',
        'https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604354/T_shirt_7_uvk7ba.jpg'
    ];

    const carouselRef = useRef<ICarouselInstance>(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    const [visible, setVisible] = useState(true);

    const opacity = useRef(new Animated.Value(1)).current;

    const toggleVisibility = () => {
        Animated.timing(opacity, {
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
                    data={images}
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

            <View className='flex-row items-center'>
                {images.map((_, index) => (
                    <View
                        key={index}
                        className={`${currentIndex === index ? 'w-6 h-2 bg-[var(--carousel-color)]' : 'w-2 h-2'} border-2 border-[var(--carousel-color)] rounded-md mx-1`}
                    />
                ))}
            </View>

            <Animated.View
                className='absolute bottom-0 left-0 right-0 px-4 pb-4'
                style={[styles.container, { opacity }]}
            >
                <View className={`flex-col gap-3`}>
                    <View className='flex-row gap-2 items-center'>
                        <Image
                            source={images[0]}
                            style={{ width: 30, height: 30, borderRadius: 1000 }}
                            contentFit="cover"
                        />
                        <Text className='text-lg font-bold'>Name of a user</Text>
                    </View>
                    <Text className='text-lg font-bold'>The title of this post is right here</Text>
                    <View className="flex-row gap-1">
                        <LikeButton liked />
                        <CommentButton />
                    </View>
                </View>
            </Animated.View>
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