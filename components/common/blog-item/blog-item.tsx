import { Image, ImageBackground } from "expo-image"
import { useRouter } from "expo-router"
import { View, Pressable, Dimensions } from "react-native"
import { Text } from '../../../components/ui/text'
import { formatDateBlog } from "../../../util/format-date-post"
import LikeButton from "./like-button"
import BookmarkButton from "./bookmark-button"
import { Eye } from "../../../lib/icons/Eye"
import { BlogPost } from "../../../assets/types/media/blog-post"
import { calculateReadTime } from "../../../util/readtime-calc"
import BlogTag from "./blog-tag"
import { formatDate } from "../../../util/format-date"
import { GlobalColor } from "../../../global-color"
import Tag from "../tag"

type Prop = {
    blogPost: BlogPost
    showLikeDate: boolean
    showBookmarkDate: boolean
}

const { width } = Dimensions.get('window')

export default function BlogItem({ blogPost, showLikeDate, showBookmarkDate }: Prop) {

    const router = useRouter()
    const handleBlogClick = () => {
        router.push({
            pathname: '/blog-detail-screen',
            params: { id: blogPost.id }
        })
    }

    return (
        <Pressable
            className="flex-col mb-4 gap-5 bg-[var(--blog-bg)] rounded-xl active:bg-[--click-bg]"
            onPress={handleBlogClick}
        >
            <ImageBackground
                source={{ uri: blogPost.thumbnail }}
                style={{ width: '100%', minHeight: 180 }}
                imageStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                contentFit="cover"
            >
                <View className="flex-row gap-2 items-center p-3">
                    {blogPost.categories.map((tag) => (
                        <BlogTag key={tag.id} tag={tag} />
                    ))}
                </View>
            </ImageBackground>

            <View className="flex-col items-center gap-3">
                <View className="flex-row w-full px-2 justify-between items-center gap-5">
                    <View className="flex-row gap-3 items-center">
                        <Image
                            style={{ width: 30, height: 30, borderRadius: 10000 }}
                            source={blogPost.moderator.imageUrl}
                            contentFit="cover"
                        />
                        <Text className="text-base font-bold tracking-wider">{blogPost.moderator.fullName}</Text>
                        <Text className="text-base tracking-wider text-[var(--fade-text-color)]">•</Text>
                        <Text className="text-sm tracking-wider text-[var(--fade-text-color)]">{formatDateBlog(blogPost.createdDate)}</Text>
                    </View>
                    <View className="flex-row items-center gap-3 px-3 py-1">
                        <Eye className="text-foreground" size={17} />
                        <Text className="text-base font-semibold">{blogPost.view}</Text>
                    </View>
                </View>
                <Text className="text-base px-2 font-semibold tracking-wider">
                    {blogPost.title}
                </Text>
                {showBookmarkDate && blogPost.bookmarkedDate && (
                    <View className="flex-row w-full px-2 justify-between items-center">
                        <Tag
                            background={GlobalColor.ORANGE_NEON_BG}
                            text={`Đã lưu vào ${formatDate(blogPost.bookmarkedDate)}`}
                            textColor={GlobalColor.ORANGE_NEON_BORDER}
                        />
                        <View />
                    </View>
                )}
                {showLikeDate && blogPost.likedDate && (
                    <View className="flex-row w-full px-2 justify-between items-center">
                        <Tag
                            background={GlobalColor.PINK_NEON_BG}
                            text={`Đã thích vào ${formatDate(blogPost.likedDate)}`}
                            textColor={GlobalColor.PINK_NEON_BORDER}
                        />
                        <View />
                    </View>
                )}
                <View className="mt-1 bg-[var(--click-bg)]" style={{ width: width * 0.9, height: 0.7 }} />
                <View className="flex-row w-full pb-2 justify-between items-center">
                    <LikeButton
                        liked={blogPost.isLiked}
                        count={blogPost.like}
                        postId={blogPost.id}
                    />
                    <View className="flex-row gap-2 items-center">
                        <Text className="text-sm font-semibold tracking-wider">{calculateReadTime(blogPost.wordCount)} phút đọc</Text>
                        <BookmarkButton bookmarked={blogPost.isBookMarked} postId={blogPost.id} />
                    </View>
                </View>
            </View>
        </Pressable>
    )
}