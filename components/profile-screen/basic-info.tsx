import * as React from 'react';
import { View } from 'react-native';
import { Text } from '../../components/ui/text';

type Prop = {
    backgroundColor: string
    icon: React.ReactNode
    title: string
    value: string
    unit?: string
}

export default function BasicInfo({ backgroundColor, icon, title, value, unit }: Prop) {

    return (
        <View className='flex-row gap-3 basis-1/2 items-center'>
            <View
                style={{ backgroundColor: backgroundColor }}
                className='flex p-3 justify-center items-center rounded-md'
            >
                {icon}
            </View>
            <View className='flex-col gap-1'>
                <Text className='text-base font-bold tracking-widest capitalize'>{title}</Text>
                <Text className='text-sm tracking-widest text-[var(--fade-text-color)]'>{value} {unit}</Text>
            </View>
        </View>
    );
}
