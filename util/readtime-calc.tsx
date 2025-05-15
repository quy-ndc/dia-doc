export function calculateReadTime(wordCount: number): number {
    const wordsPerMinute = 200
    const timeInMinutes = wordCount / wordsPerMinute

    return Math.ceil(timeInMinutes)
}
