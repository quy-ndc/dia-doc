import { View } from "react-native";
import { getBlogTagColor } from "../../../util/get-blog-tag-color";
import { BlogCategory } from "../../../assets/types/media/blog-post";
import Tag from "../tag";

type Prop = {
    tag: BlogCategory
}

export default function BlogTag({ tag }: Prop) {

    if (tag.name == undefined) return null

    const tagBorder = getBlogTagColor(tag.name).borderColor

    return (
        <View className="flex-row gap-3 items-center">
            <Tag
                background={tagBorder}
                textColor={'white'}
                text={tag.name}
            />
        </View>
    )
}