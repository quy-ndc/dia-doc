import { GlobalColor } from "../../global-color";

export enum ConsultationStatus {
    BOOKED = 0,
    DECLINED = 1,
    CANCELED = 2,
    ON_GOING = 3,
    COMPLETED = 4,
}


export const ConsultationStatusString: Record<ConsultationStatus, { label: string; color: string; backgroundColor: string }> = {
    [ConsultationStatus.BOOKED]: {
        label: 'Sắp đến',
        color: GlobalColor.CYAN_NEON_BORDER,
        backgroundColor: GlobalColor.CYAN_NEON_BG,
    },
    [ConsultationStatus.DECLINED]: {
        label: 'Từ chối',
        color: GlobalColor.RED_NEON_BORDER,
        backgroundColor: GlobalColor.RED_NEON_BG,
    },
    [ConsultationStatus.CANCELED]: {
        label: 'Hủy',
        color: GlobalColor.RED_NEON_BORDER,
        backgroundColor: GlobalColor.RED_NEON_BG,
    },
    [ConsultationStatus.ON_GOING]: {
        label: 'Đang diễn ra',
        color: GlobalColor.BLUE_NEON_BORDER,
        backgroundColor: GlobalColor.BLUE_NEON_BG,
    },
    [ConsultationStatus.COMPLETED]: {
        label: 'Hoàn thành',
        color: GlobalColor.GREEN_NEON_BORDER,
        backgroundColor: GlobalColor.GREEN_NEON_BG,
    },
};

export function getConsultationStatusDisplay(status: ConsultationStatus): { label: string; color: string; backgroundColor: string } {
    return ConsultationStatusString[status] || { label: 'Không xác định', color: GlobalColor.INDIGO_NEON_BORDER, backgroundColor: GlobalColor.INDIGO_NEON_BG };
}