import { MessageType } from "../../enum/message-type"

export type Message = {
    id: string
    content: string
    type: MessageType
    createdDate: string,
    isRead: boolean,
    user: {
        id: string
        avatar: string
        fullName: string
    }
}