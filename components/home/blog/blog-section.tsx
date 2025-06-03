import { Dimensions, Pressable, ScrollView, View } from "react-native";
import SectionTitle from "../common/section-title";
import { Sparkles } from '../../../lib/icons/Sparkles';
import { Text } from "../../../components/ui/text";
import { ChevronDown } from "../../../lib/icons/ChevronDown";
import { useRouter } from "expo-router";
import BlogItem from "../../common/blog-item/blog-item";
import { FlashList } from "@shopify/flash-list";
import { BlogPost } from "../../../assets/types/media/blog-post";
import SpinningIcon from "../../common/icons/spinning-icon";
import { RefreshCcw } from "../../../lib/icons/RefreshCcw";
import FeatureBlogItem from "../../common/blog-item/feature-blog-item";
import BlogSkeleton from "../../common/skeleton/blog-skeleton";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get('window')

type Prop = {
    isLoading: boolean
    isError: boolean
    items: BlogPost[]
    onRefresh: () => void
    refreshing: boolean
}

export default function HomeBlogSection({ isLoading, isError, items, onRefresh, refreshing }: Prop) {

    const router = useRouter()

    return (
        <View className="flex-col gap-3 justify-center items-center pb-7">
            <SectionTitle
                icon={<Sparkles className='text-[var(--blog-title-icon-color)]' size={18} />}
                title='Bài Viết đáng chú ý'
            />

            {isLoading ? (
                <BlogSkeleton />
            ) : isError || items.length === 0 ? (
                <View className="flex-col gap-2 items-center">
                    <Text className="text-muted-foreground text-lg font-semibold italic tracking-wider">Không có bài viết để hiển thị</Text>
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
            ) : (
                <>
                    <View style={{ width: width }} className="px-2">
                        <FeatureBlogItem blogPost={items[0]} />
                        <FlashList<BlogPost>
                            data={items.slice(1)}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) =>
                                <BlogItem blogPost={item} />
                            }
                            estimatedItemSize={100}
                        />
                        <View className="flex w-full justify-center items-center">
                            <Pressable
                                style={{ width: width * 0.4 }}
                                className="flex-row gap-2 px-4 py-2 justify-center items-center border border-[var(--oppo-theme-col)] rounded-full active:bg-[var(--click-bg)]"
                                onPress={() => router.push('/blog-screen')}
                            >
                                <Text className="text-base font-semibold tracking-wider">Xem thêm</Text>
                                <ChevronDown className="text-foreground" size={18} />
                            </Pressable>
                        </View>
                    </View>
                </>
            )}
        </View>
    );
}
