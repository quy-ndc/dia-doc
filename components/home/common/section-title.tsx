import * as React from 'react';
import { Dimensions, View } from 'react-native';
import { Text } from '../../../components/ui/text'

type Prop = {
    icon: React.ReactNode
    title: string
}

const { width } = Dimensions.get('window')

export default function SectionTitle({ icon, title }: Prop) {

    return (
        <View
            className='flex-row gap-3 px-5 items-center text-center'
            style={{ width: width }}
        >
            {icon}
            <Text className='text-lg font-bold tracking-widest capitalize'>{title}</Text>
        </View>
    );
}