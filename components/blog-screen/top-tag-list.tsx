import { View } from "react-native"
import { Category } from "../../assets/types/media/category"
import TopTagSkeleton from "../common/skeleton/top-tag-skeletion"
import TopBlogTag from "../common/blog-item/top-blog-tag"
import { FlashList } from "@shopify/flash-list"
import { Text } from '../../components/ui/text'
import IconButton from "../common/icon-button"
import { ChevronLeft } from "../../lib/icons/ChevronLeft"
import { ChevronRight } from "../../lib/icons/ChevronRight"
import { useCallback, useRef, useState } from "react"
import ErrorDisplay from "../common/error-display"

type Prop = {
    items: Category[]
    isLoading: boolean
    categories: string[]
    setCategories: (categories: string[]) => void
    refreshing: boolean
    refetch: () => void
    remove: () => void
}

export default function TopBlogTagList({ isLoading, items, categories, setCategories, refreshing, refetch, remove }: Prop) {

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

    const onRefresh = useCallback(() => {
        remove()
        refetch()
    }, [refetch])

    if (isLoading) return

    if (items.length == 0) return (
        <ErrorDisplay
            text="Không có danh mục nổi bật"
            onRefresh={onRefresh}
            refreshing={refreshing}
        />
    )

    return (
        <View className="flex-col gap-3">
            <View className="flex-row w-full justify-between items-center">
                <Text className="text-lg px-3 font-semibold tracking-wider">Các danh mục nổi bật</Text>
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
            {isLoading ? (
                <TopTagSkeleton />
            ) : items.length == 0 ? (
                <ErrorDisplay
                    text="Không có danh mục nổi bật"
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                />
            ) : (
                <FlashList<Category>
                    keyExtractor={(_, index) => index.toString()}
                    ref={listRef}
                    data={items}
                    renderItem={({ item, index }) => (
                        <View className="mx-2">
                            <TopBlogTag
                                key={item.id}
                                tag={item}
                                categories={categories}
                                setCategories={setCategories}
                                itemWidth={0.33}
                                isTop={index < 3}
                            />
                        </View>
                    )}
                    estimatedItemSize={15}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    extraData={categories}
                />
            )}
        </View>
    )
}
