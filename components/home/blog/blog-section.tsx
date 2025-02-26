import { Dimensions, View } from "react-native";
import SectionTitle from "../common/section-title";
import { Sparkles } from '~/lib/icons/Sparkles';
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { ChevronDown } from "~/lib/icons/ChevronDown";
import { useRouter } from "expo-router";
import BlogItem from "../../common/blog-item/blog-item";
import { FlashList } from "@shopify/flash-list";



export default function HomeBlogSection() {

    const router = useRouter();

    const { width } = Dimensions.get('window')

    const blogPosts = [
        {
            avatar: "https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604351/T_shirt_3_yrzyex.jpg",
            title: "Very long and intentionally dragged out title and somehow isn't long enough by my standard",
            name: "Name of user",
            content: "An even more insanely dragged out content for the sake of testing the possibility of the application and somehow is still not long enough for me",
            liked: false,
            detailed: false,
            images: [],
        },
        {
            avatar: "https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604349/Shirt_8_rnvxrc.jpg",
            title: "Second post's placeholder for variety",
            name: "Name of user",
            content: "Content doesn't really matter, does it? This one also has a shirt for the banner. How quirky is that?",
            liked: true,
            detailed: false,
            images: [],
        },
        {
            avatar: "https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604342/Shirt_4_xkedmf.jpg",
            title: "This is the last post, I swear",
            name: "Name of user",
            content: "The actual final product will display like 5 posts, but I mean there's a long way till then. Wait for it...",
            liked: true,
            detailed: false,
            images: [],
        },
        {
            avatar: "https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604351/T_shirt_3_yrzyex.jpg",
            title: "Very long and intentionally dragged out title and somehow isn't long enough by my standard",
            name: "Name of user",
            content: "An even more insanely dragged out content for the sake of testing the possibility of the application and somehow is still not long enough for me",
            liked: false,
            detailed: false,
            images: [],
        },
        {
            avatar: "https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604349/Shirt_8_rnvxrc.jpg",
            title: "Second post's placeholder for variety",
            name: "Name of user",
            content: "Content doesn't really matter, does it? This one also has a shirt for the banner. How quirky is that?",
            liked: true,
            detailed: false,
            images: [],
        },
        {
            avatar: "https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604342/Shirt_4_xkedmf.jpg",
            title: "This is the last post, I swear",
            name: "Name of user",
            content: "The actual final product will display like 5 posts, but I mean there's a long way till then. Wait for it...",
            liked: true,
            detailed: false,
            images: [],
        }
    ];

    return (
        <View className="flex-col gap-5 justify-center items-center pb-7">
            <SectionTitle
                icon={<Sparkles className='text-[var(--blog-title-icon-color)]' size={18} />}
                title='Bài Viết đáng chú ý'
            />
            <View style={{ width: width }}>
                <FlashList
                    data={blogPosts}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) =>
                        <BlogItem {...item} />
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
        </View>
    );
}
