import * as React from 'react';
import { View, Dimensions, Animated as RNAnimated, Pressable, StyleSheet, ScrollView, Modal } from 'react-native';
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
import ImageViewer from 'react-native-image-zoom-viewer';
import BlogItem from '~/components/common/blog-item/blog-item';
import BlogComment from '~/components/common/blog-item/blog-comment';


const { width, height } = Dimensions.get('window');

export default function BlogDetailScreen() {

    const { avatar, title, name, images, liked } = useLocalSearchParams();

    const blogImages: string[] = JSON.parse(images as string) || [];
    const isLiked = liked == 'true'



    return (
        <>
            <ScrollView
                className='w-full'
                contentContainerStyle={styles.container}
            >
                <View className='flex-col gap-5 justify-center w-full px-3 pb-10'>
                    <BlogItem
                        avatar={avatar as string}
                        name={name as string}
                        title={title as string}
                        content=''
                        images={blogImages}
                        liked={isLiked}
                        detailed
                    />
                    <View className='flex-col gap-7'>
                        <BlogComment />
                    </View>
                </View>
            </ScrollView>
        </>
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