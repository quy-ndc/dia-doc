import { create } from 'zustand'
import { AiMessageStore } from '../assets/types/zustand/ai-message-z'
import { AIMessage } from '../assets/types/chat/ai-message'

export const useAiMessageStore = create<AiMessageStore>((set, get) => ({
    sessionsList: [],
    sessions: {},

    addSession: (session) =>
        set((state) => {
            if (state.sessions[session.id]) return state
            return {
                sessionsList: [...state.sessionsList, session],
                sessions: {
                    ...state.sessions,
                    [session.id]: {
                        messages: [],
                        messageIds: new Set(),
                    },
                },
            }
        }),

    addSessions: (sessions) =>
        set((state) => {
            const newSessionsList = [...state.sessionsList]
            const newSessions = { ...state.sessions }

            for (const session of sessions) {
                if (!newSessions[session.id]) {
                    newSessionsList.push(session)
                    newSessions[session.id] = {
                        messages: [],
                        messageIds: new Set(),
                    }
                }
            }

            return {
                sessionsList: newSessionsList,
                sessions: newSessions,
            }
        }),

    setSessions: (sessions) =>
        set(() => {
            const newSessions: AiMessageStore["sessions"] = {}

            for (const session of sessions) {
                newSessions[session.id] = {
                    messages: [],
                    messageIds: new Set(),
                }
            }

            return {
                sessionsList: [...sessions],
                sessions: newSessions,
            }
        }),

    removeSession: (sessionId) =>
        set((state) => {
            const { [sessionId]: removed, ...remainingSessions } = state.sessions
            const filteredSessionsList = state.sessionsList.filter(session => session.id !== sessionId)
            
            return {
                sessionsList: filteredSessionsList,
                sessions: remainingSessions,
            }
        }),

    addMessage: (sessionId, message) =>
        set((state) => {
            const session = state.sessions[sessionId]
            if (!session || session.messageIds.has(message.id)) return state

            return {
                sessions: {
                    ...state.sessions,
                    [sessionId]: {
                        ...session,
                        messages: [...session.messages, message],
                        messageIds: new Set(session.messageIds).add(message.id),
                    },
                },
            }
        }),

    addMessages: (sessionId, newMessages) =>
        set((state) => {
            const session = state.sessions[sessionId]
            if (!session) return state

            const updatedMessages: AIMessage[] = []
            const updatedIds = new Set(session.messageIds)

            for (const message of newMessages) {
                if (!updatedIds.has(message.id)) {
                    updatedMessages.push(message)
                    updatedIds.add(message.id)
                }
            }

            return {
                sessions: {
                    ...state.sessions,
                    [sessionId]: {
                        ...session,
                        messages: [...session.messages, ...updatedMessages],
                        messageIds: updatedIds,
                    },
                },
            }
        }),

    setMessages: (sessionId, messages) =>
        set((state) => {
            if (!state.sessions[sessionId]) return state

            const ids = new Set(messages.map((m) => m.id))

            return {
                sessions: {
                    ...state.sessions,
                    [sessionId]: {
                        ...state.sessions[sessionId],
                        messages,
                        messageIds: ids,
                    },
                },
            }
        }),

    getMessages: (sessionId) => {
        const session = get().sessions[sessionId]
        return session?.messages || []
    },

    clear: () => {
        set({ sessionsList: [], sessions: {} })
    }
})) 