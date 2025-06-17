import * as React from 'react';
import { Dimensions, Pressable } from 'react-native';
import { Text } from '../../../components/ui/text';


type Prop = {
    icon: React.ReactNode
    title: string
    onPress: () => void
}

const { width } = Dimensions.get('window')

export default function QuickButton({ icon, title, onPress }: Prop) {

    return (
        <Pressable
            style={{ width: width * 0.23 }}
            className='flex-col gap-2 justify-center items-center p-2 rounded-xl active:bg-[--click-bg]'
            onPress={onPress}
        >
            {icon}
            <Text className='text-sm font-medium tracking-wider'>{title}</Text>
        </Pressable>
    );
}
