import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { View, StyleSheet, Pressable, Dimensions } from "react-native";
import { Text } from '~/components/ui/text'
import { formatDateBlog } from "~/util/format-date-post";
import LikeButton from "./like-button";
import CommentButton from "./comment-button";


type Prop = {
    avatar: string
    name: string
    title: string
    content: string
    images: string[]
    liked: boolean
    detailed: boolean
}

export default function BlogItem({ avatar, name, title, content, images, liked, detailed }: Prop) {

    const router = useRouter()

    const handleBlogClick = () => {
        router.push({
            pathname: '/blog-detail-screen',
            params: {
                avatar: avatar,
                title: title,
                name: name,
                images: JSON.stringify(images),
                liked: liked.toString()
            }
        })
    }

    return (
        <Pressable
            className="flex-col gap-5 rounded-xl p-2.5 bg-[var(--blog-bg)] active:bg-[--click-bg]"
            onPress={handleBlogClick}
        >
            <View className="flex-row items-center gap-5">
                <Image
                    style={styles.avatar}
                    source={avatar}
                    contentFit="cover"
                />
                <View className="flex-col gap-[0.5]">
                    <Text className="text-base font-bold tracking-wider">{name}</Text>
                    <Text className="text-sm tracking-wider">{formatDateBlog('2025-02-17T16:19:20')}</Text>
                </View>
            </View>

            <View className="flex-col gap-4 justify-center">
                <Text className="text-lg font-bold tracking-wider">{title}</Text>
                {/* <Text className="text-sm tracking-wider">{truncateText(content, 120)}</Text> */}
            </View>

            {(detailed && images.length > 0) && (
                <Pressable onPress={handleBlogClick}>
                    <Image
                        style={styles.image}
                        source={images[0]}
                        contentFit="cover"
                    />
                </Pressable>
            )}
            <View className="flex-row gap-1">
                <LikeButton liked={liked} />
                <CommentButton />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    avatar: {
        width: 35,
        height: 35,
        borderRadius: 10000,
    },
    image: {
        width: '100%',
        height: 500,
        borderRadius: 10
    }
});
