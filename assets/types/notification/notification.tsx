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