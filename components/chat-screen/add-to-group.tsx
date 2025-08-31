import { Dimensions, Modal, Pressable, RefreshControl, ScrollView, View } from "react-native"
import { Text } from '../ui/text'
import React, { useCallback, useState } from "react"
import IconButton from "../common/icon-button"
import { Plus } from "../../lib/icons/Plus"
import { X } from "../../lib/icons/X"
import { GlobalColor } from "../../global-color"
import { GroupChat } from "../../assets/types/chat/group"
import { ConversationType } from "../../assets/enum/conversation-type"
import { useGroupChatQuery } from "../../service/query/chat-query"
import { useQuery } from "@tanstack/react-query"
import GroupChatSkeleton from "../common/skeleton/chat-group-skeleton"
import ErrorDisplay from "../common/error-display"
import { FlashList } from "@shopify/flash-list"
import GroupItem from "./group-item"

type Prop = {
    patientId: string
}

const { width, height } = Dimensions.get('window')

export default function AddToGroupModal({ patientId }: Prop) {

    const [visible, setVisible] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    const { data, isLoading, isError, remove, refetch } = useQuery({
        ...useGroupChatQuery({
            Type: ConversationType.GROUP_CHAT
        }),
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000),
    })

    const groups: GroupChat[] = data?.data?.data?.items || []

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        remove()
        refetch().finally(() => setRefreshing(false))
    }, [refetch])

    return (
        <>
            <IconButton
                icon={<Plus className='text-foreground' size={18} />}
                buttonSize={3}
                possition={"other"}
                onPress={() => setVisible(true)}
            />
            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <Pressable
                    className="flex-1 justify-center items-center bg-black/50"
                    onPress={() => setVisible(false)}
                >
                    <Pressable
                        style={{ width: width * 0.95, minHeight: height * 0.4 }}
                        className="flex-col pt-3 gap-2 bg-[var(--noti-bg)] rounded-2xl"
                    >
                        <View className="flex-row px-2 gap-2 items-center">
                            <IconButton
                                icon={<X color={GlobalColor.RED_NEON_BORDER} size={18} />}
                                buttonSize={3}
                                possition={"other"}
                                onPress={() => setVisible(false)}
                            />
                            <Text className="text-base font-semibold tracking-wider">
                                Chọn nhóm để thêm bệnh nhân vào
                            </Text>
                        </View>

                        {isLoading ? (
                            <View className="flex-1 justify-center items-center">
                                <GroupChatSkeleton />
                            </View>
                        ) : isError || groups.length === 0 ? (
                            <View className="flex-1 justify-center items-center">
                                <ErrorDisplay
                                    onRefresh={onRefresh}
                                    refreshing={refreshing}
                                    text='Không có cuộc tư vấn nào.'
                                    showRefresh
                                />
                            </View>
                        ) : (
                            <ScrollView
                                className="w-full"
                                contentContainerStyle={{ alignItems: 'center' }}
                                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                                decelerationRate={'normal'}
                            >
                                <View className="flex-1 w-full">
                                    <FlashList<GroupChat>
                                        data={groups}
                                        keyExtractor={(_, index) => index.toString()}
                                        renderItem={({ item }) => (
                                            <GroupItem item={item} />
                                        )}
                                        estimatedItemSize={100}
                                    />
                                </View>
                            </ScrollView>
                        )}
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    )
}
