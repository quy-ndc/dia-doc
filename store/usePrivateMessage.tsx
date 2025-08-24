import { create } from 'zustand'
import { MessageStore } from '../assets/types/zustand/message-z'
import { Message } from '../assets/types/chat/message'

export const usePrivateMessageStore = create<MessageStore>((set, get) => ({
    groups: {},

    addGroup: (groupId, isActive?: boolean) =>
        set((state) => {
            if (state.groups[groupId]) return state
            return {
                groups: {
                    ...state.groups,
                    [groupId]: {
                        messages: [],
                        messageIds: new Set(),
                        latestMessage: undefined,
                        isActive: isActive === undefined ? true : isActive,
                    },
                },
            }
        }),

    addGroups: (groupIds: string[], isActive?: boolean) =>
        set((state) => {
            const newGroups = { ...state.groups }

            for (const groupId of groupIds) {
                if (!newGroups[groupId]) {
                    newGroups[groupId] = {
                        messages: [],
                        messageIds: new Set(),
                        latestMessage: undefined,
                        isActive: isActive === undefined ? true : isActive,
                    }
                }
            }

            return {
                groups: newGroups,
            }
        }),

    setGroups: (groupIds: string[], isActive?: boolean) =>
        set(() => {
            const newGroups: MessageStore["groups"] = {}

            for (const groupId of groupIds) {
                newGroups[groupId] = {
                    messages: [],
                    messageIds: new Set(),
                    latestMessage: undefined,
                    isActive: isActive === undefined ? true : isActive,
                }
            }

            return {
                groups: newGroups,
            }
        }),

    addMessage: (groupId, message) =>
        set((state) => {
            const group = state.groups[groupId]
            if (!group || group.messageIds.has(message.id)) return state

            return {
                groups: {
                    ...state.groups,
                    [groupId]: {
                        ...group,
                        messages: [...group.messages, message],
                        messageIds: new Set(group.messageIds).add(message.id),
                    },
                },
            }
        }),

    addMessages: (groupId, newMessages) =>
        set((state) => {
            const group = state.groups[groupId]
            if (!group) return state

            const updatedMessages: Message[] = []
            const updatedIds = new Set(group.messageIds)

            for (const message of newMessages) {
                if (!updatedIds.has(message.id)) {
                    updatedMessages.push(message)
                    updatedIds.add(message.id)
                }
            }

            return {
                groups: {
                    ...state.groups,
                    [groupId]: {
                        ...group,
                        messages: [...group.messages, ...updatedMessages],
                        messageIds: updatedIds,
                    },
                },
            }
        }),

    setMessages: (groupId, messages) =>
        set((state) => {
            if (!state.groups[groupId]) return state

            const ids = new Set(messages.map((m) => m.id))

            return {
                groups: {
                    ...state.groups,
                    [groupId]: {
                        ...state.groups[groupId],
                        messages,
                        messageIds: ids,
                    },
                },
            }
        }),

    setLatestMessage: (groupId, message) =>
        set((state) => {
            if (!state.groups[groupId]) return state
            return {
                groups: {
                    ...state.groups,
                    [groupId]: {
                        ...state.groups[groupId],
                        latestMessage: message,
                    },
                },
            }
        }),

    getLatestMessage: (groupId) => {
        const group = get().groups[groupId]
        return group?.latestMessage
    },

    setGroupStatus: (groupId, isActive) =>
        set((state) => {
            if (!state.groups[groupId]) return state
            return {
                groups: {
                    ...state.groups,
                    [groupId]: {
                        ...state.groups[groupId],
                        isActive,
                    },
                },
            }
        }),

    getGroupStatus: (groupId) => {
        const group = get().groups[groupId]
        return group?.isActive
    },

    clear: () => {
        set({ groups: {} })
    }
})) 