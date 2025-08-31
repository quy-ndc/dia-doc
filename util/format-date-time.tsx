type FormattedDateTime = {
    date: string
    time: string
}

export const formatDateTime = (isoString: string): FormattedDateTime => {
    const date = new Date(isoString)
    
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    
    return {
        date: `${day}.${month}`,
        time: `${hours}:${minutes}`
    }
}
