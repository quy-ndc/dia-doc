import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import BlogItem from '../components/common/blog-item/blog-item';
import BlogComment from '../components/common/blog-item/blog-comment';


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