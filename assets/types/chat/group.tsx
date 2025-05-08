import { MessageType } from "../../enum/message-type"

export type GroupMessage = {
    id: string
    content: string
    type: MessageType
    createdDate: string
    isRead: boolean
    user: {
        id: string
        avatar: string
        fullName: string
    }
}

export type GroupChat = {
    id: string
    name: string
    avatar: string
    message: GroupMessage
}