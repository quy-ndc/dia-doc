import { FlashList } from '@shopify/flash-list';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { Dimensions, RefreshControl, ScrollView, View } from 'react-native';
import ChatItem from '../../../components/chat-screen/chat-item';

const { width } = Dimensions.get('window')


export default function MessagesScreen() {

    const data = [
        {
            img: 'https://cdn-healthcare.hellohealthgroup.com/hospitals/vn/benh-vien-thanh-pho-thu-duc-1.png',
            name: 'Bệnh viện Thủ Đức',
            message: '',
            time: '',
            hasNewMessage: false
        },
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
                        <ChatItem {...item} />
                    }
                    estimatedItemSize={100}
                />
            </View>
        </ScrollView>
    );
}