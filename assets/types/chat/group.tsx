import { Message } from "./message"

export type GroupChat = {
    id: string
    name: string
    avatar: string
    conversationType: number
    message: Message
    members: any[]
    modifiedDate: string
}