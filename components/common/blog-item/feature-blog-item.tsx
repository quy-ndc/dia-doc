import { ImageBackground } from "expo-image";
import { useRouter } from "expo-router";
import { View, Pressable, useColorScheme } from "react-native";
import { Text } from '../../../components/ui/text'
import LikeButton from "./like-button";
import CommentButton from "./comment-button";
import BookmarkButton from "./bookmark-button";
import { getBlogTagColor } from "../../../util/get-blog-tag-color";
import { Eye } from "../../../lib/icons/Eye";
import { GlobalColor } from "../../../global-color";
import { BlogPost } from "../../../assets/types/media/blog-post";
import { calculateReadTime } from "../../../util/readtime-calc";
import { TrendingUp } from "../../../lib/icons/TrendingUp";
import BlogTag from "./blog-tag";


type Prop = {
    blogPost: BlogPost
}

export default function FeatureBlogItem({ blogPost }: Prop) {

    const router = useRouter()
    const theme = useColorScheme()

    const handleBlogClick = () => {
        router.push({
            pathname: '/blog-detail-screen',
            params: { id: blogPost.id }
        })
    }

    const tagBg = getBlogTagColor(blogPost.categories[0].name).borderColor
    const featureBg = theme == 'dark' ? GlobalColor.HALF_DARK_THEME_COL : GlobalColor.HALF_LIGHT_THEME_COL

    return (
        <ImageBackground
            source={{ uri: blogPost.imageUrl }}
            style={{ width: '100%', marginBottom: 15 }}
            imageStyle={{ borderRadius: 10 }}
            contentFit="cover"
        >
            <Pressable
                style={{ backgroundColor: featureBg }}
                className={`flex-col px-2 py-3 gap-4 rounded-xl active:opacity-80`}
                onPress={handleBlogClick}
            >
                <View className="flex-row items-center gap-3">
                    <View className="flex-row items-center gap-2 px-4 py-[5px] bg-red-600 rounded-full">
                        <Text className="text-white text-sm font-semibold tracking-wider">Nổi Bật</Text>
                        <TrendingUp className="text-white" size={17} strokeWidth={1.5} />
                    </View>
                    <Text className="text-sm font-semibold tracking-wider">{calculateReadTime(blogPost.wordCount)} phút đọc</Text>
                </View>
                <Text className="text-lg font-semibold tracking-wider">
                    {blogPost.title}
                </Text>
                <View className="flex-row w-full justify-between items-center">
                    <View className="flex-row gap-3 items-center">
                        {blogPost.categories.map((category) => (
                            <BlogTag key={category.id} tag={category} />
                        ))}
                    </View>
                    <BookmarkButton bookmarked={blogPost.isBookMarked} postId={blogPost.id} />
                </View>
            </Pressable>
        </ImageBackground>
    )
}