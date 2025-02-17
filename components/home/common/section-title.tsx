import * as React from 'react';
import { View } from 'react-native';
import { Text } from '~/components/ui/text'

type Prop = {
    icon: React.ReactNode
    title: string
}

export default function SectionTitle({ icon, title }: Prop) {

    return (
        <View className='flex-row gap-3 items-center text-center'>
            {icon}
            <Text className='text-lg font-bold tracking-widest capitalize'>{title}</Text>
        </View>
    );
}