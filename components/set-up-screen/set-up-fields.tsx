import * as React from 'react';
import { View, Dimensions } from 'react-native';
import { Text } from '../../components/ui/text';

const { width } = Dimensions.get('window');

type Prop = {
    label: string
    object: React.ReactNode
    length: number
    required?: boolean
}

export default function SetUpFields({ label, object, length, required = false }: Prop) {

    return (
        <View
            className='flex-col w-full gap-3'
            style={{ width: width * length }}
        >
            <View className='flex-row items-center gap-2'>
                <Text className='text-lg font-bold tracking-widest'>{label}</Text>
                {required && <Text className='text-red-500'>*</Text>}
            </View>
            {object}
        </View>
    );
}