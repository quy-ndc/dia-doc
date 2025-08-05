import { Message } from "./message"

export type GroupChat = {
    id: string
    name: string
    avatar: string
    conversationType: number
    memberCount: number
    status: number
    canView: boolean
    modifiedDate: string
    lastMessage?: Message
}