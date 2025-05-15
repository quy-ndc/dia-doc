import * as React from 'react'
import { View, Dimensions } from 'react-native'
import { Text } from '../../components/ui/text'

const { width } = Dimensions.get('window')

type Prop = {
    label: string
    object: React.ReactNode
    length: number
}

export default function SetUpFields({ label, object, length }: Prop) {

    return (
        <View
            className='flex-col w-full gap-3'
            style={{ width: width * length }}
        >
            <Text className='text-lg font-bold tracking-widest'>{label}</Text>
            {object}
        </View>
    )
}