import * as React from 'react'
import { View } from 'react-native'
import SectionTitle from '../../home/common/section-title'
import { GlobalColor } from '../../../global-color'
import { Textarea } from '../../ui/textarea'
import { PencilLine } from '../../../lib/icons/PencilLine'


type Props = {
    placeholder: string
    note: string
    setNote: (note: string) => void
}

export default function NoteField({ note, setNote, placeholder }: Props) {

    return (

        <View className='flex-col gap-2 w-full px-5'>
            <View className='flex-row w-full items-center justify-between'>
                <SectionTitle
                    icon={<PencilLine color={GlobalColor.EMERALD_NEON_BORDER} size={18} />}
                    title='Ghi chú'
                />
                <View />
            </View>
            <Textarea
                style={{ letterSpacing: 1 }}
                value={note}
                onChangeText={setNote}
                placeholder={`Ví dụ: ${placeholder}...`}
                className='w-full'
            />
        </View>
    )
}