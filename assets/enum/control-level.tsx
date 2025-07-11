import { GlobalColor } from '../../global-color'

export enum ControlLevel {
    GOOD_CONTROL = 0,
    MODERATE_CONTROL = 1,
    POOR_CONTROL = 2,
    NO_INFORMATION = 3
}

export const ControlLevelString: Record<ControlLevel, string> = {
    [ControlLevel.GOOD_CONTROL]: 'Kiểm soát tốt',
    [ControlLevel.MODERATE_CONTROL]: 'Kiểm soát trung bình',
    [ControlLevel.POOR_CONTROL]: 'Kiểm soát kém',
    [ControlLevel.NO_INFORMATION]: 'Không có thông tin',
};

export const ControlLevelInfo: Record<ControlLevel, { label: string; percentage: string; color: string }> = {
    [ControlLevel.GOOD_CONTROL]: {
        label: 'Kiểm soát tốt',
        percentage: '<7%',
        color: GlobalColor.GREEN_NEON_BORDER,
    },
    [ControlLevel.MODERATE_CONTROL]: {
        label: 'Kiểm soát trung bình',
        percentage: '7-8%',
        color: GlobalColor.BLUE_NEON_BORDER,
    },
    [ControlLevel.POOR_CONTROL]: {
        label: 'Kiểm soát kém',
        percentage: '>8%',
        color: GlobalColor.RED_NEON_BORDER,
    },
    [ControlLevel.NO_INFORMATION]: {
        label: 'Không có thông tin',
        percentage: '',
        color: GlobalColor.INDIGO_NEON_BORDER,
    },
};

export function getControlLevelString(level: ControlLevel): string {
    return ControlLevelString[level] || 'Không xác định';
}

export function getControlLevelInfo(level: ControlLevel) {
    return ControlLevelInfo[level] || {
        label: 'Không xác định',
        percentage: '',
        color: GlobalColor.INDIGO_NEON_BORDER,
    };
}