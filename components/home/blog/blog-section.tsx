import { Dimensions, View } from "react-native";
import SectionTitle from "../common/section-title";
import { Sparkles } from '../../../lib/icons/Sparkles';
import { Button } from "../../../components/ui/button";
import { Text } from "../../../components/ui/text";
import { ChevronDown } from "../../../lib/icons/ChevronDown";
import { useRouter } from "expo-router";
import BlogItem from "../../common/blog-item/blog-item";
import { FlashList } from "@shopify/flash-list";
import { BlogPost } from "../../../assets/types/media/blog-post";
import { useQuery } from "@tanstack/react-query";
import { useNewMediaQuery } from "../../../service/query/media-query";
import SpinningIcon from "../../common/icons/spinning-icon";
import { Loader } from "../../../lib/icons/Loader";

const { width } = Dimensions.get('window');

export default function HomeBlogSection() {

    const router = useRouter();

    const { data, isLoading, isError } = useQuery(
        useNewMediaQuery({
            PageIndex: 1,
            PageSize: 5,
        })
    );

    const items: BlogPost[] = data?.data?.value?.data?.items || []

    if ((!isLoading && (isError || items.length === 0))) {
        return null
    }

    return (
        <View className="flex-col gap-5 justify-center items-center pb-7">
            <SectionTitle
                icon={<Sparkles className='text-[var(--blog-title-icon-color)]' size={18} />}
                title='Bài Viết đáng chú ý'
            />
            {isLoading ? (
                <SpinningIcon icon={<Loader className='text-foreground' size={30} />} />
            ) : (
                <>
                    <View style={{ width: width }}>
                        <FlashList<BlogPost>
                            data={items}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) =>
                                <BlogItem
                                    id={item.id}
                                    title={item.title}
                                    image={item.imageUrl}
                                    createDate={item.createdDate}
                                    category={item.category.name}
                                    name={item.user.fullName}
                                    avatar={item.user.imageUrl}
                                    liked={false}
                                    bookmarked={item.isBookmarked}
                                />
                            }
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
