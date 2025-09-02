import { GlobalColor } from '../../global-color'

export enum BloodSugarLevel {
    VERY_HIGH = 0,
    HIGH = 1,
    NORMAL = 2,
    LOW = 3,
    VERY_LOW = 4,
    NO_INFO = 5,
}

export const BloodSugarLevelInfo: Record<BloodSugarLevel, { label: string; color: string }> = {
    [BloodSugarLevel.VERY_HIGH]: {
        label: 'Rất cao',
        color: GlobalColor.RED_NEON_BORDER,
    },
    [BloodSugarLevel.HIGH]: {
        label: 'Cao',
        color: GlobalColor.ORANGE_NEON_BORDER,
    },
    [BloodSugarLevel.NORMAL]: {
        label: 'Bình thường',
        color: GlobalColor.GREEN_NEON_BORDER,
    },
    [BloodSugarLevel.LOW]: {
        label: 'Thấp',
        color: GlobalColor.YELLOW_NEON_BORDER,
    },
    [BloodSugarLevel.VERY_LOW]: {
        label: 'Rất thấp',
        color: GlobalColor.PURPLE_NEON_BORDER,
    },
    [BloodSugarLevel.NO_INFO]: {
        label: 'Không xác định',
        color: GlobalColor.GRAY_NEON_BORDER,
    },
};

export function getBloodSugarLevelInfo(level: BloodSugarLevel) {
    return BloodSugarLevelInfo[level] || {
        label: 'Không xác định',
        color: GlobalColor.GRAY_NEON_BORDER,
    };
}