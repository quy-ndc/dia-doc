import { Dimensions, Pressable, View } from "react-native";
import { Text } from '../../ui/text'
import { getBlogTagColor } from "../../../util/get-blog-tag-color";
import { Category } from "../../../assets/types/media/category";

type Prop = {
    tag: Category
    categories: string[]
    setCategories: (categories: string[]) => void
    itemWidth: number
}

const { width } = Dimensions.get('window')

export default function TopBlogTag({ tag, categories, setCategories, itemWidth }: Prop) {

    const tagComponent = getBlogTagColor(tag.name)

    const toggleCategory = () => {
        if (categories.includes(tag.id)) {
            const updated = categories.filter(id => id !== tag.id);
            setCategories(updated);
        } else {
            const updated = [...categories, tag.id];
            setCategories(updated);
        }
    }

    return (
        <Pressable
            style={{
                backgroundColor: categories.includes(tag.id) ? tagComponent.borderColor : tagComponent.backgroundColor,
                minWidth: width * itemWidth
            }}
            className="flex-col gap-3 px-5 py-3 items-center rounded-md active:opacity-50"
            onPress={toggleCategory}
        >
            <View
                style={{ backgroundColor: tagComponent.borderColor }}
                className="flex justify-center items-center p-2 rounded-md"
            >
                {tagComponent.icon}
            </View>
            <Text className={`${categories.includes(tag.id) && 'text-white'} text-center text-base font-semibold tracking-wider capitalize`}>
                {tag.name}
            </Text>
            <Text className={`${categories.includes(tag.id) && 'text-white'} text-sm font-bold tracking-wider`}>
                {tag.numberOfPosts} bài viết
            </Text>
        </Pressable>
    )
}