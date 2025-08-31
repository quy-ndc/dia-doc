import { GlobalColor } from '../../global-color'

export enum BmiLevel {
    UNDER_WEIGHT = 0,
    NORMAL = 1,
    OVER_WEIGHT = 2,
    OBESE_1 = 3,
    OBESE_2 = 4,
    OBESE_3 = 5,
}

export const BmiLevelInfo: Record<BmiLevel, { label: string; color: string }> = {
    [BmiLevel.UNDER_WEIGHT]: {
        label: 'Thiếu cân',
        color: GlobalColor.PURPLE_NEON_BORDER,
    },
    [BmiLevel.NORMAL]: {
        label: 'Bình thường',
        color: GlobalColor.GREEN_NEON_BORDER,
    },
    [BmiLevel.OVER_WEIGHT]: {
        label: 'Thừa cân',
        color: GlobalColor.YELLOW_NEON_BORDER,
    },
    [BmiLevel.OBESE_1]: {
        label: 'Béo phì độ I',
        color: GlobalColor.ORANGE_NEON_BORDER,
    },
    [BmiLevel.OBESE_2]: {
        label: 'Béo phì độ II',
        color: GlobalColor.ORANGE_NEON_BORDER,
    },
    [BmiLevel.OBESE_3]: {
        label: 'Béo phì độ III',
        color: GlobalColor.RED_NEON_BORDER,
    },
};

export function getBmiLevelInfo(level: BmiLevel) {
    return BmiLevelInfo[level] || {
        label: 'Không xác định',
        color: GlobalColor.INDIGO_NEON_BORDER,
    };
}