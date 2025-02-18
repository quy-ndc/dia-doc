import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import BlogItem from '~/components/common/blog-item/blog-item';


export default function BlogScreen() {

    return (
        <ScrollView
            className='w-full pb-5'
            contentContainerStyle={styles.container}
        >
            <View className='flex-col gap-5 justify-center w-full px-3 pb-10'>
                <BlogItem
                    avatar="https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604351/T_shirt_3_yrzyex.jpg"
                    title="Very long and intentionally dragged out title and somehow isn't long enough by my standard"
                    name='Name of user'
                    content="An even more insanly dragged out content for the sake of testing the posibility of the application and somehow is still not long enough for me"
                    liked
                    detailed
                    images={["https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604351/T_shirt_3_yrzyex.jpg", "https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604351/T_shirt_3_yrzyex.jpg"]}
                />
                <BlogItem
                    avatar="https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604351/T_shirt_3_yrzyex.jpg"
                    title="Very long and intentionally dragged out title and somehow isn't long enough by my standard"
                    name='Name of user'
                    content="An even more insanly dragged out content for the sake of testing the posibility of the application and somehow is still not long enough for me"
                    liked
                    detailed
                    images={["https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604351/T_shirt_3_yrzyex.jpg", "https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604351/T_shirt_3_yrzyex.jpg"]}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
});
