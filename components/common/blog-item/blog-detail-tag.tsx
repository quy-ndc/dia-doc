import { View } from "react-native";
import { Text } from '../../../components/ui/text'
import { getBlogTagColor } from "../../../util/get-blog-tag-color";
import { BlogCategory } from "../../../assets/types/media/blog-post";


type Prop = {
    tag: BlogCategory
}

export default function BlogDetailTag({ tag }: Prop) {

    const tagColor = getBlogTagColor(tag.name)

    return (
        <View
            style={{ backgroundColor: tagColor.backgroundColor }}
            className="flex-row px-3 py-2 justify-between items-center rounded-md"
        >
            <Text
                style={{ color: tagColor.borderColor }}
                className={`text-sm font-semibold tracking-wider uppercase`}
            >
                {tag.name}
            </Text>
        </View>
    )
}