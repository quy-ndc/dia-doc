import { Image } from "expo-image" 
import { useRouter } from "expo-router" 
import { View, Pressable, useColorScheme } from "react-native" 
import { Text } from '../../../components/ui/text'
import { formatDateBlog } from "../../../util/format-date-post" 
import LikeButton from "./like-button" 
import CommentButton from "./comment-button" 
import BookmarkButton from "./bookmark-button" 
import { truncateText } from "../../../util/truncate-text" 
import { getBlogTagColor } from "../../../util/get-blog-tag-color" 
import { Eye } from "../../../lib/icons/Eye" 
import { GlobalColor } from "../../../global-color" 
import { BlogPost } from "../../../assets/types/media/blog-post" 
import { calculateReadTime } from "../../../util/readtime-calc" 


type Prop = {
    blogPost: BlogPost
}

export default function BlogItem({ blogPost }: Prop) {

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
        <Pressable
            className="flex-col gap-5 active:bg-[--click-bg] border-b border-[var(--blog-border-color)]"
            onPress={handleBlogClick}
        >
            <View className="flex-row justify-between items-center gap-5 px-4 pt-4">
                <View className="flex-row gap-5 items-center">
                    <Image
                        style={{ width: 35, height: 35, borderRadius: 10000 }}
                        source={blogPost.user.imageUrl}
                        contentFit="cover"
                    />
                    <View className="flex-col gap-[0.5]">
                        <Text className="text-base font-bold tracking-wider">{blogPost.user.fullName}</Text>
                        <Text className="text-sm tracking-wider text-[var(--fade-text-color)]">{formatDateBlog(blogPost.createdDate)}</Text>
                    </View>
                </View>
                <View className="flex-row gap-2 items-center">
                    <Text className="text-sm font-semibold tracking-wider">{calculateReadTime(blogPost.wordCount)} phút đọc</Text>
                    <BookmarkButton bookmarked={blogPost.isBookmarked} />
                </View>
            </View>
            <View className="flex-row justify-between px-5 items-center">
                <View className="flex-1 flex-col gap-4 mr-3">
                    <Text className="text-lg font-semibold tracking-wider">
                        {truncateText(blogPost.title, 90)}
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
                <Image
                    style={{ minWidth: 80, minHeight: 100, borderRadius: 10 }}
                    contentFit="cover"
                    source={blogPost.imageUrl}
                />
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
    )
}