import * as React from 'react'
import IconButton from '../icon-button'
import { CircleAlert } from '../../../lib/icons/CircleAlert'
import Toast from 'react-native-toast-message'
import { Dimensions, Modal, Platform, Pressable, View } from 'react-native'
import { useState } from 'react'
import { Text } from '../../../components/ui/text'


const { height, width } = Dimensions.get('window')

export default function SpeechInfoButton() {

    const [open, setOpen] = useState(false)

    const showInfoAdr = () => {
        Toast.show({
            type: 'info',
            text1: 'Làm các bước sau nếu phần mềm không nói Tiếng Việt'
        })
    }

    const showInfoIos = () => {
        Toast.show({
            type: 'info',
            text1: 'Nếu thiết'
        })
    }

    const step = [
        'Truy cập cài đặt',
        'Nhấn vào tìm kiếm',
        'Nhập "Ngôn ngữ"',
        ''
    ]

    return (
        <>
            <IconButton
                icon={<CircleAlert className='text-[var(--info-text)]' size={15} />}
                buttonSize={3}
                possition={'other'}
                onPress={() => setOpen(true)}
            />
            <Modal
                visible={open}
                animationType="fade"
                transparent
                onRequestClose={() => setOpen(false)}
            >
                <Pressable
                    className="flex-1 justify-center items-center bg-black/50"
                    onPress={() => setOpen(false)}
                >
                    <View
                        style={{ width: width * 0.9, height: 'auto' }}
                        className="flex-col justify-center bg-[var(--noti-bg)] rounded-2xl"
                    >
                        <View className='flex-col items-center gap-3 p-5'>
                            <Text className='text-base tracking-wider text-center'>Nếu phần mềm đang không nói Tiếng Việt hãy làm các bước sau</Text>
                            <Text className='text-lg font-bold tracking-widest capitalize'>
                                Cài đặt &gt awd
                            </Text>
                            <View className='flex-row justify-between items-center w-full'>
                                <View />
                                <View className='flex-row items-center gap-3'>
                                    <Pressable className='px-5 py-2 rounded-full active:bg-[var(--click-bg)]'>
                                        <Text className='text-sm tracking-widest font-semibold'>Đã Hiểu</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </>
    )
}