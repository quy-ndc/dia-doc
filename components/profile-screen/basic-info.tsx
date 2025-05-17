import * as React from 'react';
import { View } from 'react-native';
import { Text } from '../../components/ui/text';


type Prop = {
    title: string
    value: string
    unit?: string
}

export default function BasicInfo({ title, value, unit }: Prop) {

    return (
        <View className='flex-col basis-1/2 gap-1'>
            <Text className='text-lg font-bold tracking-widest capitalize'>{title}</Text>
            <Text className='text-base tracking-widest text-[var(--fade-text-color)]'>{value} {unit}</Text>
        </View>
    );
}
