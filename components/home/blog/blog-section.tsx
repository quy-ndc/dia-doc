import { Dimensions, Pressable, View } from "react-native"
import SectionTitle from "../common/section-title"
import { Sparkles } from '../../../lib/icons/Sparkles'
import { Text } from "../../../components/ui/text"
import { ChevronDown } from "../../../lib/icons/ChevronDown"
import { useRouter } from "expo-router"
import BlogItem from "../../common/blog-item/blog-item"
import { FlashList } from "@shopify/flash-list"
import { BlogPost } from "../../../assets/types/media/blog-post"
import FeatureBlogItem from "../../common/blog-item/feature-blog-item"
import BlogSkeleton from "../../common/skeleton/blog-skeleton"
import ErrorDisplay from "../../common/error-display"
import { GlobalColor } from "../../../global-color"
import { useCallback } from "react"

const { width } = Dimensions.get('window')

type Prop = {
    isLoading: boolean
    isError: boolean
    items: BlogPost[]
    refetch: () => void
    remove: () => void
    refreshing: boolean
}

export default function HomeBlogSection({ isLoading, isError, items, refetch, remove, refreshing }: Prop) {

    const router = useRouter()

    const onRefresh = useCallback(() => {
        remove()
        refetch()
    }, [refetch])

    return (
        <View
            style={{ width: width * 0.95 }}
            className="flex-col gap-3 justify-center items-center pb-7"
        >
            <SectionTitle
                icon={<Sparkles color={GlobalColor.RED_NEON_BORDER} size={18} />}
                title='Bài Viết đáng chú ý'
            />
            {isLoading ? (
                <BlogSkeleton />
            ) : isError || items.length === 0 ? (
                <View className="py-5">
                    <ErrorDisplay
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                        text="Không có bài viết để hiển thị"
                    />
                </View>
            ) : (
                <View style={{ width: width }} className="px-2">
                    <FeatureBlogItem blogPost={items[0]} />
                    <FlashList<BlogPost>
                        data={items.slice(1)}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) =>
                            <BlogItem blogPost={item} showBookmarkDate={false} showLikeDate={false} />
                        }
                        estimatedItemSize={100}
                    />
                    <View className="flex flex-row w-full gap-3 justify-center items-center">
                        <View
                            style={{ height: 1 }}
                            className="basis-[25%] bg-[var(--fade-text-color)]"
                        />
                        <Pressable
                            style={{ width: width * 0.4 }}
                            className="flex-row gap-2 px-4 py-1 justify-center items-center border border-[var(--fade-text-color)] rounded-full active:bg-[var(--click-bg)]"
                            onPress={() => router.push('/blog-screen')}
                        >
                            <Text className="text-base font-semibold tracking-wider">Xem thêm</Text>
                            <ChevronDown className="text-foreground" size={18} />
                        </Pressable>
                        <View
                            style={{ height: 1 }}
                            className="basis-[25%] bg-[var(--fade-text-color)]"
                        />
                    </View>
                </View>
            )}
        </View>
    )
}