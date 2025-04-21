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


const { width } = Dimensions.get('window')

export default function HomeBlogSection() {

    const router = useRouter();

    const { data, isLoading } = useQuery(
        useNewMediaQuery({
            PageIndex: 1,
            PageSize: 5,
        })
    )

    const items: BlogPost[] = data ? data?.data.value.data.items : []

    const blogPosts: BlogPost[] = [
        {
            id: '12345',
            title: "Very long and intentionally dragged out title and somehow isn't long enough by my standard",
            content: "An even more insanely dragged out content for the sake of testing the possibility of the application and somehow is still not long enough for me",
            imageUrl: "https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729103770/blouse-category-image_slezvn.webp",
            createdDate: '2025-04-18T09:50:11.677Z',
            category: {
                id: 'asdasdasd',
                name: 'type 1',
                imageUrl: 'adasd'
            },
            user: {
                id: '128y893huicse',
                fullName: 'Man of Name',
                imageUrl: 'https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604351/T_shirt_3_yrzyex.jpg'
            },
            // liked: false,
            // detailed: true,
            isBookmarked: true
        },
        {
            id: '12345adawd',
            title: "Very long and intentionally dra wdaiw iaw awagged out title and somehow isn't long enough by my standard",
            content: "An even more insanely dragged out content for the sake of testing the possibility of the application and somehow is still not long enough for me",
            imageUrl: "https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729103770/blouse-category-image_slezvn.webp",
            createdDate: '2025-04-18T09:50:11.677Z',
            category: {
                id: 'asdasdasd',
                name: 'type 1',
                imageUrl: 'adasd'
            },
            user: {
                id: '128y893huicse',
                fullName: 'Man of Name',
                imageUrl: 'https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604351/T_shirt_3_yrzyex.jpg'
            },
            // liked: false,
            // detailed: true,
            isBookmarked: true
        },
        {
            id: '1234amlwdm5',
            title: "Very long and intentionally dawldawdmaiwd awd awd awragged out title and somehow isn't long enough by my standard",
            content: "An even more insanely dragged out content for the sake of testing the possibility of the application and somehow is still not long enough for me",
            imageUrl: "https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729103770/blouse-category-image_slezvn.webp",
            createdDate: '2025-04-18T09:50:11.677Z',
            category: {
                id: 'asdasdasd',
                name: 'type 1',
                imageUrl: 'adasd'
            },
            user: {
                id: '128y893huicse',
                fullName: 'Man of Name',
                imageUrl: 'https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604351/T_shirt_3_yrzyex.jpg'
            },
            // liked: false,
            // detailed: true,
            isBookmarked: true
        },
    ];

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
                                    content={item.content}
                                    image={item.imageUrl}
                                    createDate={item.createdDate}
                                    category={item.category.name}
                                    name={item.user.fullName}
                                    avatar={item.user.imageUrl}
                                    liked={false}
                                    detailed={false}
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
