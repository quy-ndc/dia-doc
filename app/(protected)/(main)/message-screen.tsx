import { FlashList } from '@shopify/flash-list';
import * as React from 'react';
import { useCallback, useState } from 'react';
import {
    Dimensions,
    RefreshControl,
    ScrollView,
    View,
    ActivityIndicator,
    Text,
    Pressable,
} from 'react-native';
import ChatItem from '../../../components/chat-screen/chat-item';
import { useGroupChatQuery } from '../../../service/query/chat-query';
import { useQuery } from '@tanstack/react-query';
import { GroupChat } from '../../../assets/types/chat/group';
import SpinningIcon from '../../../components/common/icons/spinning-icon';
import { Loader } from '../../../lib/icons/Loader';
import { RefreshCcw } from '../../../lib/icons/RefreshCcw';

const { width } = Dimensions.get('window');

export default function MessagesScreen() {

    const [refreshing, setRefreshing] = useState(false)

    const {
        data,
        isLoading,
        isError,
        remove,
        refetch,
    } = useQuery(useGroupChatQuery({}))

    const groups: GroupChat[] = data?.data?.value?.groups?.items || []

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        remove()
        refetch().finally(() => setRefreshing(false))
    }, [refetch])

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center">
                <SpinningIcon icon={<Loader className='text-foreground' size={30} />} />
            </View>
        )
    }

    if (isError || groups.length === 0) {
        return (
            <ScrollView
                className="flex-1 w-full"
                contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View className="flex-col gap-2 items-center">
                    <Text className="text-muted-foreground text-lg font-semibold italic tracking-wider">
                        {isError
                            ? 'Đã xảy ra lỗi khi tải tin nhắn. Vuốt xuống để thử lại.'
                            : 'Không có cuộc trò chuyện nào.'
                        }
                    </Text>
                    <Pressable
                        className="flex-row gap-3 items-center px-4 py-2 rounded-full active:bg-[var(--click-bg)]"
                        onPress={onRefresh}
                    >
                        <Text className="text-foreground text-base font-semibold tracking-wider capitalize">Thử lại</Text>
                        {refreshing ? (
                            <SpinningIcon icon={<RefreshCcw className="text-foreground" size={15} />} />
                        ) : (
                            <RefreshCcw className="text-foreground" size={15} />
                        )}
                    </Pressable>
                </View>
            </ScrollView>
        )
    }

    return (
        <ScrollView
            className="w-full pb-5"
            contentContainerStyle={{ alignItems: 'center' }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            decelerationRate={'normal'}
        >
            <View style={{ width: width }}>
                <FlashList<GroupChat>
                    data={groups}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <ChatItem
                            id={item.id}
                            img={item.avatar}
                            name={item.name}
                            user={item.message ? item.message.user.fullName : undefined}
                            message={item.message ? item.message.content : undefined}
                            time={item.message ? item.message.createdDate : undefined}
                            hasNewMessage={item.message ? item.message.isRead : false}
                        />
                    )}
                    estimatedItemSize={100}
                />
            </View>
        </ScrollView>
    );
}
