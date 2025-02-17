import * as React from 'react';
import { View } from 'react-native';
import Chat from '~/components/chat-screen/chat-item';

export default function MessagesScreen() {

    return (
        <View className='flex-1'>
            <Chat
                img='https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729103768/female-shirt-category_pl5o1d.jpg'
                name='Woman'
                message='Hey I wanna talk wj iajwoi aiowj iaj iaw wadwj oa daw'
                time='17 / 6 / 2024'
                hasNewMessage={false}
            />
            <Chat
                img='https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729103768/female-shirt-category_pl5o1d.jpg'
                name='Man'
                message='Hey I wanna talk wj iajwoi aiowj iaj iaw wadwj oa daw'
                time='17 / 6 / 2024'
                hasNewMessage
            />
        </View>
    );
}