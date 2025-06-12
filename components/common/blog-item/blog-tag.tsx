import { View } from "react-native";
import { Text } from '../../../components/ui/text'
import { getBlogTagColor } from "../../../util/get-blog-tag-color";
import { BlogCategory } from "../../../assets/types/media/blog-post";

type Prop = {
    tag: BlogCategory
}

export default function BlogTag({ tag }: Prop) {

    const tagBorder = getBlogTagColor(tag.name).borderColor

    return (
        <View className="flex-row gap-3 items-center">
            <Text
                style={{ backgroundColor: tagBorder, color: 'white' }}
                className={`text-center text-sm font-semibold px-3 py-1 rounded-full tracking-wider capitalize`}
            >
                {tag.name}
            </Text>
        </View>
    )
}