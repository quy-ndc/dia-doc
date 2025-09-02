import { GlobalColor } from '../../global-color'

export enum Notification {
    NOTIFEE_CHANNEL_ID = 'foreground-noti',
    NOTIFEE_CHANNEL_NAME = 'Thông báo trong ứng dụng',
}

export enum NotificatinType {
    CONSULTATION = 0,
    CAREPLAN = 1
}

type NotificationInfo = {
    label: string
    color: string
    subColor: string
}

export const NotificatinTypeInfo: Record<NotificatinType, NotificationInfo> = {
    [NotificatinType.CONSULTATION]: {
        label: 'Tư vấn',
        color: GlobalColor.CYAN_NEON_BORDER,
        subColor: GlobalColor.CYAN_NEON_BG
    },
    [NotificatinType.CAREPLAN]: {
        label: 'Sức khỏe',
        color: GlobalColor.GREEN_NEON_BORDER,
        subColor: GlobalColor.GREEN_NEON_BG
    }
};

export function getNotificatinTypeInfo(type: NotificatinType): NotificationInfo {
    return NotificatinTypeInfo[type] || {
        label: 'Không xác định',
        color: GlobalColor.GRAY_NEON_BORDER,
        subColor: GlobalColor.GRAY_NEON_BG
    };
}