import * as React from 'react'
import { Pressable } from 'react-native'
import { Text } from '../../ui/text'
import { Ellipsis } from '../../../lib/icons/Ellipsis'
import IconButton from '../../common/icon-button'
import { DefaultPayload, SystemNotification } from '../../../assets/types/notification/notification'

type Prop = {
    setVisible: (visible: boolean) => void
    notification: SystemNotification
}


export default function DefaultNotification({ setVisible, notification }: Prop) {

    const payload: DefaultPayload = notification.payload as DefaultPayload

    return (
        <>
            <Pressable
                className='px-4 py-3 w-full flex-row justify-between items-center active:bg-[var(--click-bg)]'
                onLongPress={() => setVisible(true)}
            >
                <Text className="text-white">{payload.title}</Text>
                <IconButton
                    icon={<Ellipsis className='text-foreground' size={20} />}
                    buttonSize={2}
                    possition={'other'}
                    onPress={() => setVisible(true)}
                />
            </Pressable>
        </>
    )
}
