import { FlashList } from '@shopify/flash-list';
import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { View, RefreshControl, Pressable } from 'react-native';
import { Animated as RNAnimated } from 'react-native';
import BlogItem from '../../components/common/blog-item/blog-item';
import { ChevronUp } from '../../lib/icons/ChevronUp';
import ZaloKit, { isAuthenticated } from 'react-native-zalo-kit'
import { Button } from '../../components/ui/button';
import { Text } from '../../components/ui/text';



export default function BlogScreen() {

    const blogPosts = [
        {
            avatar: "https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604351/T_shirt_3_yrzyex.jpg",
            title: "Very long and intentionally dragged out title and somehow isn't long enough by my standard",
            name: "Name of user",
            content: "An even more insanely dragged out content for the sake of testing the possibility of the application and somehow is still not long enough for me",
            liked: false,
            detailed: true,
            images: [
                "https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604351/T_shirt_3_yrzyex.jpg",
                'https://res.cloudinary.com/dcjdtlnbl/image/upload/v1730225300/right2_vvzeur.jpg',
                "https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729103770/blouse-category-image_slezvn.webp",
            ],
        },
        {
            avatar: "https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604349/Shirt_8_rnvxrc.jpg",
            title: "Second post's placeholder for variety",
            name: "Name of user",
            content: "Content doesn't really matter, does it? This one also has a shirt for the banner. How quirky is that?",
            liked: true,
            detailed: true,
            images: [
                "https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604351/T_shirt_3_yrzyex.jpg",
                "https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604351/T_shirt_3_yrzyex.jpg"
            ],
        },
        {
            avatar: "https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604342/Shirt_4_xkedmf.jpg",
            title: "This is the last post, I swear",
            name: "Name of user",
            content: "The actual final product will display like 5 posts, but I mean there's a long way till then. Wait for it...",
            liked: true,
            detailed: true,
            images: [
                "https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604351/T_shirt_3_yrzyex.jpg",
                'https://res.cloudinary.com/dcjdtlnbl/image/upload/v1730225300/right2_vvzeur.jpg',
                "https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729103770/blouse-category-image_slezvn.webp",
            ],
        },
        {
            avatar: "https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604351/T_shirt_3_yrzyex.jpg",
            title: "Very long and intentionally dragged out title and somehow isn't long enough by my standard",
            name: "Name of user",
            content: "An even more insanely dragged out content for the sake of testing the possibility of the application and somehow is still not long enough for me",
            liked: false,
            detailed: true,
            images: [
                "https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604351/T_shirt_3_yrzyex.jpg",
                "https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604351/T_shirt_3_yrzyex.jpg"
            ],
        },
        {
            avatar: "https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604349/Shirt_8_rnvxrc.jpg",
            title: "Second post's placeholder for variety",
            name: "Name of user",
            content: "Content doesn't really matter, does it? This one also has a shirt for the banner. How quirky is that?",
            liked: true,
            detailed: true,
            images: [
                "https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604351/T_shirt_3_yrzyex.jpg",
                'https://res.cloudinary.com/dcjdtlnbl/image/upload/v1730225300/right2_vvzeur.jpg',
                "https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729103770/blouse-category-image_slezvn.webp",
            ],
        },
        {
            avatar: "https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604342/Shirt_4_xkedmf.jpg",
            title: "This is the last post, I swear",
            name: "Name of user",
            content: "The actual final product will display like 5 posts, but I mean there's a long way till then. Wait for it...",
            liked: true,
            detailed: true,
            images: [
                "https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604351/T_shirt_3_yrzyex.jpg",
                "https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604351/T_shirt_3_yrzyex.jpg"
            ],
        }
    ];


    const [refreshing, setRefreshing] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const opacity = useRef(new RNAnimated.Value(0)).current;

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const listRef = useRef<FlashList<any>>(null);

    const scrollToTop = () => {
        listRef.current?.scrollToIndex({ index: 0, animated: true });
    };

    const toggleVisibility = (visible: boolean) => {
        RNAnimated.timing(opacity, {
            toValue: visible ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setShowScrollButton(visible);
        });
    };

    const handleScroll = (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        if (offsetY > 400 && !showScrollButton) {
            toggleVisibility(true);
        } else if (offsetY <= 400 && showScrollButton) {
            toggleVisibility(false);
        }
    };

    const checkAuthenticationn = async () => {
        try {
            const isAuth = await ZaloKit.isAuthenticated();
            console.log(isAuth);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        checkAuthenticationn();
    }, []);


    return (
        <View className='flex-1 w-full pb-5'>
            <Button onPress={() => ZaloKit.login()}>
                <Text>aaaa</Text>
            </Button>
            <FlashList
                data={blogPosts}
                ref={listRef}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => <BlogItem {...item} />}
                estimatedItemSize={100}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            />

            <RNAnimated.View
                style={{
                    opacity,
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                }}
            >
                <Pressable
                    className='p-5 rounded-full bg-[var(--go-up-btn-bg)]'
                    onPress={scrollToTop}
                >
                    <ChevronUp className='text-[var(--go-up-btn-icon)]' size={22} />
                </Pressable>
            </RNAnimated.View>
        </View>
    );
}


