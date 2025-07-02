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
    Sender: {
        SenderId: string
        FullName: string 
        Avatar: string
    }
    GroupId: string
    MessageId: string
    MessageContent: string
    Type: MessageType
    CreatedDate: string
    ReadBy: string[]
    EventId: string
    CreationDate: string
}