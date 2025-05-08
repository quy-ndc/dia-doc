import { Dimensions, Pressable, View } from "react-native";
import SectionTitle from "../common/section-title";
import { Sparkles } from '../../../lib/icons/Sparkles';
import { Button } from "../../../components/ui/button";
import { Text } from "../../../components/ui/text";
import { ChevronDown } from "../../../lib/icons/ChevronDown";
import { useRouter } from "expo-router";
import BlogItem from "../../common/blog-item/blog-item";
import { FlashList } from "@shopify/flash-list";
import { BlogPost } from "../../../assets/types/media/blog-post";
import SpinningIcon from "../../common/icons/spinning-icon";
import { Loader } from "../../../lib/icons/Loader";
import { RefreshCcw } from "../../../lib/icons/RefreshCcw";

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
        <View className="flex-col gap-5 justify-center items-center pb-7">
            <SectionTitle
                icon={<Sparkles className='text-[var(--blog-title-icon-color)]' size={18} />}
                title='Bài Viết đáng chú ý'
            />

            {isLoading ? (
                <SpinningIcon icon={<Loader className='text-foreground' size={30} />} />
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
                    <View style={{ width: width }}>
                        <FlashList<BlogPost>
                            data={items}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) => (
                                <BlogItem
                                    id={item.id}
                                    title={item.title}
                                    image={item.imageUrl}
                                    createDate={item.createdDate}
                                    view={item.view}
                                    category={item.category.name}
                                    name={item.user.fullName}
                                    avatar={item.user.imageUrl}
                                    liked={false}
                                    bookmarked={item.isBookmarked}
                                />
                            )}
                            estimatedItemSize={100}
                        />
                    </View>
                    <Button
                        className="flex-row items-center gap-5"
                        style={{ width: width * 0.5 }}
                        variant={"ghost"}
                        onPress={() => router.push('/(main)/blog-screen')}
                    >
                        <Text className="text-xl font-bold">Xem thêm</Text>
                        <ChevronDown className="text-foreground" size={20} />
                    </Button>
                </>
            )}
        </View>
    );
}
