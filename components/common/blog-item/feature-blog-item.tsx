import { Image, ImageBackground } from "expo-image";
import { useRouter } from "expo-router";
import { View, StyleSheet, Pressable, useColorScheme } from "react-native";
import { Text } from '../../../components/ui/text'
import { formatDateBlog } from "../../../util/format-date-post";
import LikeButton from "./like-button";
import CommentButton from "./comment-button";
import BookmarkButton from "./bookmark-button";
import { truncateText } from "../../../util/truncate-text";
import { getBlogTagColor } from "../../../util/get-blog-tag-color";
import { Eye } from "../../../lib/icons/Eye";
import { GlobalColor } from "../../../global-color";
import { BlogPost } from "../../../assets/types/media/blog-post";
import { calculateReadTime } from "../../../util/readtime-calc";
import { ArrowsUpFromLine } from "../../../lib/icons/ArrowsUpFromLine";


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
    const tagBg = getBlogTagColor(blogPost.category.name).backgroundColor

    return (
        <ImageBackground
            source={{ uri: blogPost.imageUrl }}
            style={{ width: '100%' }}
            contentFit="cover"
        >
            <Pressable
                className="flex-col bg-black/40 gap-5 border-b border-[var(--blog-border-color)] active:opacity-80"
                onPress={handleBlogClick}
            >
                <View className="flex-row items-center gap-3 px-4 pt-4">
                    <View className="flex-row items-center gap-2 px-4 py-2 bg-red-600 rounded-full">
                        <Text className="text-white text-sm font-semibold tracking-wider">Nổi Bật</Text>
                        <ArrowsUpFromLine className="text-white" size={17} strokeWidth={1.5} />
                    </View>
                    <Text className="text-sm font-semibold tracking-wider">{calculateReadTime(blogPost.wordCount)} phút đọc</Text>
                </View>
                <View className="flex-row justify-between px-5 items-center">
                    <View className="flex-1 flex-col gap-4 mr-3">
                        <Text className="text-lg font-semibold tracking-wider">
                            {blogPost.title}
                        </Text>
                        <View className="flex-row gap-3 items-center">
                            <Text
                                style={{ backgroundColor: tagBg, color: tagBorder, borderColor: tagBorder }}
                                className={`text-center text-sm font-semibold px-3 py-1 border rounded-full tracking-wider capitalize`}
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
                <View className="flex-row justify-between items-center gap-1 px-3 pb-3">
                    {/* <View className="flex-row gap-1 items-center">
                    <LikeButton liked={true} />
                    <CommentButton
                        avatar={blogPost.user.imageUrl}
                        title={blogPost.title}
                        name={blogPost.user.fullName}
                        image={blogPost.imageUrl}
                        liked={true}
                    />
                </View> */}
                    <View />

                </View>
            </Pressable>
        </ImageBackground>
    )
}