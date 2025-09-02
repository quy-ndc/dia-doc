import { FlashList } from "@shopify/flash-list"
import { useRef } from "react"
import { AiSuggestions } from "../../assets/data/ai-suggestions"
import { Dimensions, Pressable, View } from "react-native"
import { Text } from "../../components/ui/text"

const { height } = Dimensions.get('window')

type Props = {
    setMessage: (message: string) => void
}

export const ScrollableSuggestion = ({ setMessage }: Props) => {
    const listRef = useRef<FlashList<string>>(null)
    const items = AiSuggestions

    return (
        <View
            style={{ height: height * 0.04 }}
        >
            <FlashList<string>
                keyExtractor={(_, index) => index.toString()}
                ref={listRef}
                data={items}
                renderItem={({ item, index }) => (
                    <Pressable className="mx-2 bg-[var(--blog-bg)] px-3 py-1 rounded-xl active:bg-[var(--click-bg)]"
                        onPress={() => {
                            setMessage(item)
                            listRef.current?.scrollToIndex({ index, animated: true })
                        }}
                    >
                        <Text className="text-base text-[var(--fade-text-color)] font-medium tracking-wider">
                            {item}
                        </Text>
                    </Pressable>
                )}
                estimatedItemSize={100}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}