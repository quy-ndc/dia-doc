import { GlobalColor } from '../../global-color'

export enum BloodPressureLevel {
    LOW = 0,
    NORMAL = 1,
    HIGH = 2,
    VERY_HIGH_1 = 3,
    VERY_HIGH_2 = 4,
    VERY_HIGH_3 = 5,
    NO_INFO = 6
}

export const BloodPressureLevelInfo: Record<BloodPressureLevel, { label: string; color: string }> = {
    [BloodPressureLevel.LOW]: {
        label: 'Thấp',
        color: GlobalColor.PURPLE_NEON_BORDER,
    },
    [BloodPressureLevel.NORMAL]: {
        label: 'Bình thường',
        color: GlobalColor.GREEN_NEON_BORDER,
    },
    [BloodPressureLevel.HIGH]: {
        label: 'Cao',
        color: GlobalColor.ORANGE_NEON_BORDER,
    },
    [BloodPressureLevel.VERY_HIGH_1]: {
        label: 'Huyết áp cao độ I',
        color: GlobalColor.RED_NEON_BORDER,
    },
    [BloodPressureLevel.VERY_HIGH_2]: {
        label: 'Huyết áp cao độ II',
        color: GlobalColor.RED_NEON_BORDER,
    },
    [BloodPressureLevel.VERY_HIGH_3]: {
        label: 'Huyết áp cao độ III',
        color: GlobalColor.RED_NEON_BORDER,
    },
    [BloodPressureLevel.NO_INFO]: {
        label: 'Không xác định',
        color: GlobalColor.GRAY_NEON_BORDER,
    },
};

export function getBloodPressureLevelInfo(level: BloodPressureLevel) {
    return BloodPressureLevelInfo[level] || {
        label: 'Không xác định',
        color: GlobalColor.GRAY_NEON_BORDER,
    };
}