import { View } from "react-native"
import { Category } from "../../assets/types/media/category"
import TopTagSkeleton from "../common/skeleton/top-tag-skeletion"
import TopBlogTag from "../common/blog-item/top-blog-tag"
import { FlashList } from "@shopify/flash-list"
import { Text } from '../../components/ui/text'
import IconButton from "../common/icon-button"
import { ChevronLeft } from "../../lib/icons/ChevronLeft"
import { ChevronRight } from "../../lib/icons/ChevronRight"
import { useRef, useState } from "react"

type Prop = {
    items: Category[]
    isLoading: boolean
    category: string
    setCategory: (category: string) => void
}

export default function TopBlogTagList({ isLoading, items, category, setCategory }: Prop) {

    if (isLoading) return <TopTagSkeleton />

    if (items.length == 0) return null

    const listRef = useRef<FlashList<Category>>(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    const scrollByOffset = (direction: "left" | "right") => {
        const newIndex = direction === "left"
            ? Math.max(currentIndex - 2, 0)
            : Math.min(currentIndex + 2, items.length - 1)

        listRef.current?.scrollToIndex({
            index: newIndex,
            animated: true
        })

        setCurrentIndex(newIndex)
    }

    return (
        <View className="flex-col gap-3">
            <View className="flex-row w-full justify-between items-center">
                <Text className="text-lg px-3 font-semibold tracking-wider">Các chủ đề nổi bật</Text>
                <View className="flex-row gap-3 items-center">
                    <IconButton
                        onPress={() => scrollByOffset("left")}
                        icon={<ChevronLeft className="text-foreground" size={17} />}
                        buttonSize={3}
                        possition={"other"}
                    />
                    <IconButton
                        onPress={() => scrollByOffset("right")}
                        icon={<ChevronRight className="text-foreground" size={17} />}
                        buttonSize={3}
                        possition={"other"}
                    />
                </View>
            </View>
            <FlashList<Category>
                ref={listRef}
                data={items}
                renderItem={({ item }) => (
                    <View className="mx-2">
                        <TopBlogTag
                            key={item.id}
                            tag={item}
                            category={category}
                            setCategory={setCategory}
                        />
                    </View>
                )}
                estimatedItemSize={15}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}
