export const formatPhone = (phone: string): string => {
    const firstChunk = phone.slice(0, 4)
    const secondChunk = phone.slice(4, 7)
    const thirdChunk = phone.slice(7, 10)

    return `${firstChunk} ${secondChunk} ${thirdChunk}`
}
