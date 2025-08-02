import { AIMessage } from '../chat/ai-message'
import { AiSession } from '../chat/ai-session'

export type AiSessionData = {
    messages: AIMessage[]
    messageIds: Set<string>
}

export type AiMessageStore = {
    sessionsList: AiSession[]
    sessions: Record<string, AiSessionData>

    addSession: (session: AiSession) => void
    addSessions: (sessions: AiSession[]) => void
    setSessions: (sessions: AiSession[]) => void
    removeSession: (sessionId: string) => void

    addMessage: (sessionId: string, message: AIMessage) => void
    addMessages: (sessionId: string, messages: AIMessage[]) => void
    setMessages: (sessionId: string, messages: AIMessage[]) => void

    getMessages: (sessionId: string) => AIMessage[]
    
    clear: () => void
}
