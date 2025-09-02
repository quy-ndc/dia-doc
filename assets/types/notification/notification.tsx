import { NotificatinType } from "../../enum/notification"

export type Notification = {
    id: string
    title: string
    content: string | null
    slug: string
    type: NotificatinType
    receivedAt: string
}

export type NotificationConsultationStart = {
    body: string,
    createdDate: string,
    title: string,
    type: NotificatinType,
    conversationId: string
}

export type NotificationConsultationEnd = {
    createdDate: string,
    title: string,
    type: NotificatinType,
    conversationId: string
}

export type NotificationCarePlan = {
    body: string,
    createdDate: string,
    title: string,
    type: NotificatinType
}