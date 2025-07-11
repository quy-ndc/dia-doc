import { MessageType } from "../../enum/message-type"
import { UserRoleNumber } from "../../enum/user-role"

export type Message = {
    id: string
    content: string
    type: MessageType
    fileAttachment: {
        publicUrl: string
        type: number
    }
    createdDate: string,
    participant: {
        id: string
        fullName: string
        avatar: string
        role: UserRoleNumber
    }
}

export type MessageGroup = {
    messages: Message[]
    messageIds: Set<string>
    latestMessage?: Message
}

export type GlobalMessageEvent = {
    Conversation: {
        Avatar: string
        ConversationId: string
        ConversationName: string
        ConversationType: number
    }
    CreatedDate: string,
    CreationDate: string,
    EventId: string,
    FileAttachment: string,
    MessageContent: string,
    MessageId: string,
    MessageType: MessageType,
    Sender: {
        Avatar: string,
        FullName: string,
        SenderId: string
    }
}