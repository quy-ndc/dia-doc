export const truncateText = (text: string | null, num: number): string => {
    if (!text) return ''
    return text.length > num ? text.slice(0, num) + '...' : text
}
