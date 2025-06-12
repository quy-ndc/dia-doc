import { Image } from "expo-image";
import { View, StyleSheet, Dimensions, useColorScheme } from "react-native";
import { Text } from '../../../components/ui/text'
import { formatDateBlog } from "../../../util/format-date-post";
import LikeButton from "./like-button";
import CommentButton from "./comment-button";
import BookmarkButton from "./bookmark-button";
import RenderHTML from 'react-native-render-html';
import { GlobalColor } from "../../../global-color";
import { getBlogTagColor } from "../../../util/get-blog-tag-color";
import SpeechButton from "./blog-speech-button";
import SpeechInfoButton from "./blog-speech-info";
import { BlogPost } from "../../../assets/types/media/blog-post";


type Prop = {
    blogPost: BlogPost
}

const { width } = Dimensions.get('window');

export default function BlogDetailItem({
    blogPost,
}: Prop) {

    const theme = useColorScheme()

    const textColor = theme == 'dark' ? GlobalColor.LIGHT_THEME_COL : GlobalColor.DARK_THEME_COL

    const color = getBlogTagColor(blogPost.categories[0].name).borderColor

    return (
        <View className="flex-col gap-3">
            <View className="w-full flex-row justify-between items-center">
                <Text
                    style={{ color: color }}
                    className={`text-base font-semibold px-1 py-1 text-left tracking-wider uppercase`}
                >
                    {blogPost.categories[0].name}
                </Text>
                <BookmarkButton bookmarked={blogPost.isBookMarked} postId={blogPost.id} />
            </View>
            <Text className={`text-xl px-1 font-semibold tracking-wider`}>
                {blogPost.title}
            </Text>
            <View className="flex-row w-full justify-between items-center">
                <View className="flex-row gap-4 px-1 pt-4">
                    <Image
                        style={styles.avatar}
                        source={blogPost.user.imageUrl}
                        contentFit="cover"
                    />
                    <View className="flex-col gap-[0.5]">
                        <Text className="text-base font-bold tracking-wider">{blogPost.user.fullName}</Text>
                        <Text className="text-sm tracking-wider text-[var(--fade-text-color)]">{formatDateBlog(blogPost.createdDate)}</Text>
                    </View>
                </View>
                <View className="flex-row items-center">
                    {/* <SpeechInfoButton /> */}
                    <SpeechButton content={blogPost.content} />
                </View>
            </View>
            <View className="flex w-full justify-center items-center">
                <Image
                    style={{ width: '100%', minHeight: 300, borderRadius: 10 }}
                    contentFit="cover"
                    source={blogPost.imageUrl}
                />
            </View>
            {/* <View className="flex-row justify-between items-center gap-1 px-1 pb-3">
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
            </View> */}
            <RenderHTML
                contentWidth={width}
                source={{ html: blogPost.contentHtml }}
                baseStyle={{
                    color: textColor,
                    letterSpacing: 0.3
                }}
                tagsStyles={{
                    img: { width: width * 0.95, aspectRatio: 16 / 9, resizeMode: 'cover', borderRadius: 10, alignSelf: 'center' },
                    h1: { fontSize: 22, fontWeight: 'bold', marginVertical: 8 },
                    h2: { fontSize: 18, fontWeight: 'semibold', marginVertical: 6 },
                    p: { fontSize: 15, marginVertical: 4, lineHeight: 22 },
                    ul: { marginVertical: 4 },
                    ol: { marginVertical: 4 },
                    li: { marginLeft: 10, marginBottom: 4 },
                    em: { fontStyle: 'italic', fontWeight: 'semibold' },
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: 35,
        height: 35,
        borderRadius: 10000,
    }
});
