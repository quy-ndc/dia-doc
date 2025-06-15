import { Dimensions, Pressable, View } from "react-native";
import { Text } from '../../ui/text'
import { getBlogTagColor } from "../../../util/get-blog-tag-color";
import { Category } from "../../../assets/types/media/category";

type Prop = {
    tag: Category
    category: string
    setCategory: (category: string) => void
}

const { width } = Dimensions.get('window')

export default function TopBlogTag({ tag, category, setCategory }: Prop) {

    const tagComponent = getBlogTagColor(tag.name)

    return (
        <Pressable
            style={{
                backgroundColor: category == tag.id ? tagComponent.borderColor : tagComponent.backgroundColor,
                minWidth: width * 0.28
            }}
            className="flex-col gap-3 p-2 items-center rounded-md"
            onPress={() => setCategory(tag.id)}
        >
            <View
                style={{ backgroundColor: tagComponent.borderColor }}
                className="flex justify-center items-center p-2 rounded-md"
            >
                {tagComponent.icon}
            </View>
            <Text className={`text-center text-base font-semibold tracking-wider capitalize`}>
                {tag.name}
            </Text>
            <Text className="text-sm font-bold tracking-wider">
                {tag.numberOfPosts} bài viết
            </Text>
        </Pressable>
    )
}