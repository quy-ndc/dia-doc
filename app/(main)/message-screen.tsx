import { FlashList } from '@shopify/flash-list';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { Dimensions, RefreshControl, ScrollView, View } from 'react-native';
import Chat from '~/components/chat-screen/chat-item';
import { Loader } from '~/lib/icons/Loader';

const { width } = Dimensions.get('window')


export default function MessagesScreen() {

    const data = [
        {
            img: 'https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729103768/female-shirt-category_pl5o1d.jpg',
            name: 'Woman',
            message: 'Hey I wanna talk wj iajwoi aiowj iaj iaw wadwj oa daw',
            time: '2025-02-17T16:19:20',
            hasNewMessage: false
        },
        {
            img: 'https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729103768/female-shirt-category_pl5o1d.jpg',
            name: 'Man',
            message: 'Hey I wanna talk wj iajwoi aiowj iaj iaw wadwj oa daw',
            time: '2025-02-17T16:19:20',
            hasNewMessage: true
        },
        {
            img: 'https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729103768/female-shirt-category_pl5o1d.jpg',
            name: 'Woman',
            message: 'Hey I wanna talk wj iajwoi aiowj iaj iaw wadwj oa daw',
            time: '2025-02-17T16:19:20',
            hasNewMessage: false
        },
        {
            img: 'https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729103768/female-shirt-category_pl5o1d.jpg',
            name: 'Man',
            message: 'Hey I wanna talk wj iajwoi aiowj iaj iaw wadwj oa daw',
            time: '2025-02-17T16:19:20',
            hasNewMessage: true
        },
        {
            img: 'https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729103768/female-shirt-category_pl5o1d.jpg',
            name: 'Woman',
            message: 'Hey I wanna talk wj iajwoi aiowj iaj iaw wadwj oa daw',
            time: '2025-02-17T16:19:20',
            hasNewMessage: false
        },
        {
            img: 'https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729103768/female-shirt-category_pl5o1d.jpg',
            name: 'Man',
            message: 'Hey I wanna talk wj iajwoi aiowj iaj iaw wadwj oa daw',
            time: '2025-02-17T16:19:20',
            hasNewMessage: true
        },
        {
            img: 'https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729103768/female-shirt-category_pl5o1d.jpg',
            name: 'Woman',
            message: 'Hey I wanna talk wj iajwoi aiowj iaj iaw wadwj oa daw',
            time: '2025-02-17T16:19:20',
            hasNewMessage: false
        },
        {
            img: 'https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729103768/female-shirt-category_pl5o1d.jpg',
            name: 'Man',
            message: 'Hey I wanna talk wj iajwoi aiowj iaj iaw wadwj oa daw',
            time: '2025-02-17T16:19:20',
            hasNewMessage: true
        },
        {
            img: 'https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729103768/female-shirt-category_pl5o1d.jpg',
            name: 'Woman',
            message: 'Hey I wanna talk wj iajwoi aiowj iaj iaw wadwj oa daw',
            time: '2025-02-17T16:19:20',
            hasNewMessage: false
        },
        {
            img: 'https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729103768/female-shirt-category_pl5o1d.jpg',
            name: 'Man',
            message: 'Hey I wanna talk wj iajwoi aiowj iaj iaw wadwj oa daw',
            time: '2025-02-17T16:19:20',
            hasNewMessage: true
        },
        {
            img: 'https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729103768/female-shirt-category_pl5o1d.jpg',
            name: 'Woman',
            message: 'Hey I wanna talk wj iajwoi aiowj iaj iaw wadwj oa daw',
            time: '2025-02-17T16:19:20',
            hasNewMessage: false
        },
        {
            img: 'https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729103768/female-shirt-category_pl5o1d.jpg',
            name: 'Man',
            message: 'Hey I wanna talk wj iajwoi aiowj iaj iaw wadwj oa daw',
            time: '2025-02-17T16:19:20',
            hasNewMessage: true
        }
    ]

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <ScrollView
            className='w-full pb-5'
            contentContainerStyle={{ alignItems: 'center' }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            decelerationRate={'normal'}
        >
            <View style={{ width: width }}>
                <FlashList
                    data={data}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) =>
                        <Chat {...item} />
                    }
                    estimatedItemSize={100}
                />
            </View>
        </ScrollView>
    );
}