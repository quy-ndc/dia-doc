import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { View, StyleSheet, Pressable } from "react-native";
import { Text } from '../../../components/ui/text'
import { formatDateBlog } from "../../../util/format-date-post";
import LikeButton from "./like-button";
import CommentButton from "./comment-button";
import BookmarkButton from "./bookmark-button";
import { truncateText } from "../../../util/truncate-text";
import { getBlogTagColor } from "../../../util/get-blog-tag-color";


type Prop = {
    id: string
    title: string
    image: string
    createDate: string
    category: string
    name: string
    avatar: string
    liked: boolean
    bookmarked: boolean
}

export default function BlogItem({
    id,
    avatar,
    name,
    title,
    image,
    category,
    liked,
    createDate,
    bookmarked
}: Prop) {

    const router = useRouter()

    const handleBlogClick = () => {
        router.push({
            pathname: '/blog-detail-screen',
            params: { id: id }
        })
    }

    const tagBorder = getBlogTagColor(category).borderColor
    const tagBg = getBlogTagColor(category).backgroundColor

    return (
        <Pressable
            className="flex-col gap-5 active:bg-[--click-bg] border-b border-[var(--blog-border-color)]"
            onPress={handleBlogClick}
        >
            <View className="flex-row items-center gap-5 px-4 pt-4">
                <Image
                    style={{ width: 35, height: 35, borderRadius: 10000 }}
                    source={avatar}
                    contentFit="cover"
                />
                <View className="flex-col gap-[0.5]">
                    <Text className="text-base font-bold tracking-wider">{name}</Text>
                    <Text className="text-sm tracking-wider text-[var(--fade-text-color)]">{formatDateBlog(createDate)}</Text>
                </View>
            </View>
            <View className="flex-row justify-between px-5 items-center">
                <View className="flex-1 flex-col gap-4 mr-3">
                    <Text className="text-lg font-semibold tracking-wider">
                        {truncateText(title, 90)}
                    </Text>
                    <View className="self-start">
                        <Text
                            style={{ backgroundColor: tagBg, color: tagBorder, borderColor: tagBorder }}
                            className={`text-center text-sm font-semibold px-3 py-1 border rounded-full tracking-wider capitalize`}
                        >
                            {category}
                        </Text>
                    </View>
                </View>
                <Image
                    style={{ minWidth: 80, minHeight: 100, borderRadius: 10 }}
                    contentFit="cover"
                    source={image}
                />
            </View>
            <View className="flex-row justify-between items-center gap-1 px-3 pb-3">
                <View className="flex-row gap-1 items-center">
                    <LikeButton liked={liked} />
                    <CommentButton
                        avatar={avatar}
                        title={title}
                        name={name}
                        image={image}
                        liked={liked}
                    />
                </View>
                <BookmarkButton bookmarked={bookmarked} />
            </View>
        </Pressable>
    )
}