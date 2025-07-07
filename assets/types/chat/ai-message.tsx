import { AIChatRole } from "../../enum/ai-chat-role"

export type AIMessage = {
    role: AIChatRole
    content: string
    metadata: {
        timestamp: string
        contextCount?: number
        templateUsed?: boolean
        processingTime?: number
    }
    createdAt: string
}