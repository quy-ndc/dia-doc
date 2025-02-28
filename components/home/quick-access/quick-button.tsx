import * as React from 'react';
import { Pressable } from 'react-native';
import { Text } from '../../../components/ui/text';


type Prop = {
    icon: React.ReactNode
    title: string
    onPress: () => void
}

export default function QuickButton({ icon, title, onPress }: Prop) {

    return (
        <Pressable
            className='flex-col gap-2 w-[30%] justify-center items-center px-4 py-2 rounded-xl active:bg-[--click-bg]'
            onPress={onPress}
        >
            {icon}
            <Text className='text-base font-medium tracking-wider'>{title}</Text>
        </Pressable>
    );
}
