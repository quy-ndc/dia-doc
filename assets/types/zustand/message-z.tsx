import { Message, MessageGroup } from "../chat/message";

export type MessageStore = {
    groups: Record<string, MessageGroup & { isActive: boolean }>
    addGroup: (groupId: string, isActive?: boolean) => void
    addGroups: (groupIds: string[], isActive?: boolean) => void
    setGroups: (groupIds: string[], isActive?: boolean) => void
    addMessage: (groupId: string, message: Message) => void
    addMessages: (groupId: string, messages: Message[]) => void
    setMessages: (groupId: string, messages: Message[]) => void
    setLatestMessage: (groupId: string, message: Message | undefined) => void
    getLatestMessage: (groupId: string) => Message | undefined
    setGroupStatus: (groupId: string, isActive: boolean) => void
    getGroupStatus: (groupId: string) => boolean | undefined
    clear: () => void
}