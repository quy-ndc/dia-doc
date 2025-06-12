import { GlobalColor } from "../global-color";

export const getBlogTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
        case 'loại 1':
            return {
                borderColor: GlobalColor.GREEN_NEON_BORDER,
                backgroundColor: GlobalColor.GREEN_NEON_BG,
            };
        case 'loại 2':
            return {
                borderColor: GlobalColor.YELLOW_NEON_BORDER,
                backgroundColor: GlobalColor.YELLOW_NEON_BG,
            };
        case 'loại 3':
            return {
                borderColor: GlobalColor.BLUE_NEON_BORDER,
                backgroundColor: GlobalColor.BLUE_NEON_BG,
            };
        case 'thai kỳ':
            return {
                borderColor: GlobalColor.RED_NEON_BORDER,
                backgroundColor: GlobalColor.RED_NEON_BG,
            };
        case 'biến chứng':
            return {
                borderColor: GlobalColor.PINK_NEON_BORDER,
                backgroundColor: GlobalColor.PINK_NEON_BG,
            };
        case 'dinh dưỡng':
            return {
                borderColor: GlobalColor.PURPLE_NEON_BORDER,
                backgroundColor: GlobalColor.PURPLE_NEON_BG,
            };
        case 'phương pháp':
            return {
                borderColor: GlobalColor.ORANGE_NEON_BORDER,
                backgroundColor: GlobalColor.ORANGE_NEON_BG,
            };
        case 'thiết bị hỗ trợ':
            return {
                borderColor: GlobalColor.CYAN_NEON_BORDER,
                backgroundColor: GlobalColor.CYAN_NEON_BG,
            };
        case 'triệu chứng':
            return {
                borderColor: GlobalColor.ROSE_NEON_BORDER,
                backgroundColor: GlobalColor.ROSE_NEON_BG,
            };
        case 'thói quen':
            return {
                borderColor: GlobalColor.EMERALD_NEON_BORDER,
                backgroundColor: GlobalColor.EMERALD_NEON_BG,
            };
        case 'tâm lí':
            return {
                borderColor: GlobalColor.INDIGO_NEON_BORDER,
                backgroundColor: GlobalColor.INDIGO_NEON_BG,
            };
        default:
            return {
                borderColor: GlobalColor.GREEN_NEON_BORDER,
                backgroundColor: GlobalColor.GREEN_NEON_BG,
            };
    }
};
