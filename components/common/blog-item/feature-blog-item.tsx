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

    const viewBg = theme == 'dark' ? GlobalColor.VIEW_BG_DARK : GlobalColor.VIEW_BG_LIGHT
    const viewBorder = theme == 'dark' ? GlobalColor.VIEW_BORDER_DARK : GlobalColor.VIEW_BORDER_LIGHT

    const tagBorder = getBlogTagColor(blogPost.category.name).borderColor

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
                <View className="flex-row justify-between items-center">
                    <View className="flex-1 flex-col gap-4 mr-3">
                        <Text className="text-lg font-semibold tracking-wider">
                            {blogPost.title}
                        </Text>
                        <View className="flex-row gap-3 items-center">
                            <Text
                                style={{ backgroundColor: tagBorder }}
                                className={`text-white text-sm font-semibold px-3 py-1 rounded-full tracking-wider capitalize`}
                            >
                                {blogPost.category.name}
                            </Text>
                            <View
                                style={{ backgroundColor: viewBg, borderColor: viewBorder }}
                                className="flex-row items-center gap-2 px-3 py-1 border rounded-full"
                            >
                                <Eye className="text-foreground" size={15} />
                                <Text className="text-sm font-semibold">{blogPost.view}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                {/* <View className="flex-row justify-between items-center gap-1 px-3 pb-3">
                    <View className="flex-row gap-1 items-center">
                        <LikeButton liked={true} />
                        <CommentButton
                            avatar={blogPost.user.imageUrl}
                            title={blogPost.title}
                            name={blogPost.user.fullName}
                            image={blogPost.imageUrl}
                            liked={true}
                        />
                    </View>
                    <View />
                </View> */}
            </Pressable>
        </ImageBackground>
    )
}