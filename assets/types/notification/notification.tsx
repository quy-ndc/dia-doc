import { NotificatinType } from "../../enum/notification"

export type SystemNotification = {
    id: string,
    userId: string,
    type: number,
    isRead: boolean,
    readAt: string | undefined,
    receivedAt: string,
    payload: BlogPayload | DefaultPayload
}

export type BlogPayload = {
    postId: string,
    title: string,
    thumbnail: string
}

export type DefaultPayload = {
    title: string,
    thumbnail: string,
    body: string,
    createdBy: string
}

export type NotificationConsultationStart = {
    body: string,
    createdDate: string,
    title: string,
    type: NotificatinType
}

export type NotificationConsultationEnd = {
    createdDate: string,
    title: string,
    type: NotificatinType
}

export type NotificationCarePlan = {
    body: string,
    createdDate: string,
    title: string,
    type: NotificatinType
}