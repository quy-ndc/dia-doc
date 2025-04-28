import { GlobalColor } from "../global-color";

export const getBlogTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
        case 'loại 1':
            return {
                borderColor: GlobalColor.TYPE_1_BORDER,
                backgroundColor: GlobalColor.TYPE_1_BG,
            }
        case 'loại 2':
            return {
                borderColor: GlobalColor.TYPE_2_BORDER,
                backgroundColor: GlobalColor.TYPE_2_BG,
            }
        case 'loại 3':
            return {
                borderColor: GlobalColor.TYPE_3_BORDER,
                backgroundColor: GlobalColor.TYPE_3_BG,
            }
        case 'thai kỳ':
            return {
                borderColor: GlobalColor.TYPE_4_BORDER,
                backgroundColor: GlobalColor.TYPE_4_BG,
            }
        default:
            return {
                borderColor: GlobalColor.TYPE_1_BORDER,
                backgroundColor: GlobalColor.TYPE_1_BG,
            }
    }
}
