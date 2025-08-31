import * as React from 'react'
import { Pressable } from 'react-native'
import { Text } from '../ui/text'
import { Image } from 'expo-image'
import { truncateText } from '../../util/truncate-text'
import { GroupChat } from '../../assets/types/chat/group'

type Prop = {
    item: GroupChat
}

export default function GroupItem({ item }: Prop) {

    return (
        <Pressable
            onPress={() => { console.log('aaa') }}
            className={`flex-row items-center gap-3 py-2 px-3 active:bg-[var(--click-bg)] rounded-2xl`}
        >
            <Image
                style={{ width: 40, height: 40, borderRadius: 1000 }}
                source={item.avatar}
                contentFit='cover'
            />
            <Text className={`font-medium text-base tracking-wider`}>
                {truncateText(item.name, 18)}
            </Text>
        </Pressable>
    )
}