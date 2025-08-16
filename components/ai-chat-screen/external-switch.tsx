import * as React from 'react'
import IconButton from '../common/icon-button'
import { Settings } from '../../lib/icons/Settings'
import { useUpdateAiSessionMutation } from '../../service/query/ai-query'
import { useState } from 'react'
import { View, Text, Pressable, Modal } from 'react-native'
import { Switch } from '../ui/switch'
import { useAiMessageStore } from '../../store/useAiMessage'

type Prop = {
    id: string
    title: string
}

export default function ExternalSwitch({ id, title }: Prop) {
    const [modalVisible, setModalVisible] = useState(false)
    const [externalKnowledge, setExternalKnowledge] = useState(false)

    const { mutateAsync, data, isLoading } = useUpdateAiSessionMutation()

    const onUpdate = async (enabled: boolean) => {
        await mutateAsync({
            session_id: id,
            title: title,
            external_knowledge: enabled
        })
        setExternalKnowledge(enabled)
    }

    return (
        <>

            <IconButton
                icon={<Settings className='text-foreground' size={18} />}
                buttonSize={3}
                possition={'other'}
                onPress={() => setModalVisible(true)}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable
                    className="flex-1 justify-center items-center bg-black/50"
                    onPress={() => setModalVisible(false)}
                >
                    <View className="bg-white rounded-xl p-6 w-80">
                        <Text className="text-xl font-bold text-center mb-5">
                            Cài đặt AI Chat
                        </Text>

                        <View className="flex-row items-center justify-between mb-4">
                            <Text className="text-base font-medium tracking-wider">Kiến thức bên ngoài</Text>
                            <Switch
                                style={{ opacity: isLoading ? 0.7 : 1 }}
                                checked={externalKnowledge}
                                onCheckedChange={onUpdate}
                                disabled={isLoading}
                            />
                        </View>
                        <Pressable
                            className="bg-[--oppo-theme-col] px-4 py-2 rounded-full items-center active:opacity-70"
                            onPress={() => setModalVisible(false)}
                        >
                            <Text className="text-[--same-theme-col] font-semibold">Đóng</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>
        </>
    )
}