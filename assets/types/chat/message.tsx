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