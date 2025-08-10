import { View } from 'react-native'
import { Text } from '../../../components/ui/text'

type Prop = {
    mainText: string
    subText: string
}

export default function HeaderTitle({ mainText, subText }: Prop) {

    return (
        <View className='flex-col'>
            <Text className='text-lg font-bold tracking-wider capitalize'>
                {mainText}
            </Text>
            <Text className='text-sm text-[var(--fade-text-color)] tracking-wider'>
                {subText}
            </Text>
        </View>
    )
}
