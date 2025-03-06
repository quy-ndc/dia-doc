export type Message = {
    id: string
    type: 'image' | 'text'
    content: string
    time: string
}