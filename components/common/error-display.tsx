import { Pressable, View } from "react-native";
import { Text } from '../../components/ui/text'
import SpinningIcon from "./icons/spinning-icon";
import { RefreshCcw } from "../../lib/icons/RefreshCcw";

type Prop = {
    text: string
    onRefresh: () => void
    refreshing: boolean
}

export default function ErrorDisplay({ text, onRefresh, refreshing }: Prop) {

    return (
        <View className="flex-col gap-2 items-center">
            <Text className="text-[var(--fade-text-color)] text-lg font-semibold tracking-wider">{text}</Text>
            <Pressable
                className="flex-row gap-2 items-center px-4 py-2 rounded-full active:bg-[var(--click-bg)]"
                onPress={onRefresh}
            >
                <Text className="text-base font-semibold tracking-wider capitalize">Thử lại</Text>
                {refreshing ? (
                    <SpinningIcon icon={<RefreshCcw className="text-foreground" size={15} />} />
                ) : (
                    <RefreshCcw className="text-foreground" size={15} />
                )}
            </Pressable>
        </View>
    );
}
