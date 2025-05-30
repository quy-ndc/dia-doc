import { GlobalColor } from "../global-color";

export const getBlogTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
        case 'loại 1':
            return {
                borderColor: GlobalColor.GREEN_NEON_BORDER,
                backgroundColor: GlobalColor.GREEN_NEON_BG,
            }
        case 'loại 2':
            return {
                borderColor: GlobalColor.YELLOW_NEON_BORDER,
                backgroundColor: GlobalColor.YELLOW_NEON_BG,
            }
        case 'loại 3':
            return {
                borderColor: GlobalColor.BLUE_NEON_BORDER,
                backgroundColor: GlobalColor.BLUE_NEON_BG,
            }
        case 'thai kỳ':
            return {
                borderColor: GlobalColor.RED_NEON_BORDER,
                backgroundColor: GlobalColor.RED_NEON_BG,
            }
        default:
            return {
                borderColor: GlobalColor.GREEN_NEON_BORDER,
                backgroundColor: GlobalColor.GREEN_NEON_BG,
            }
    }
}
