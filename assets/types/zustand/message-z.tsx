import { Message, MessageGroup } from "../chat/message";

export type MessageStore = {
    groups: Record<string, MessageGroup>
    addGroup: (groupId: string) => void
    addGroups: (groupIds: string[]) => void
    setGroups: (groupIds: string[]) => void
    addMessage: (groupId: string, message: Message) => void
    addMessages: (groupId: string, messages: Message[]) => void
    setMessages: (groupId: string, messages: Message[]) => void
    setLatestMessage: (groupId: string, message: Message | undefined) => void
    getLatestMessage: (groupId: string) => Message | undefined
    clear: () => void
}