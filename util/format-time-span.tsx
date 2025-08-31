type TimeSpanResult = {
    months: number
    days: number
}

export const formatTimeSpan = (timeSpan: string): TimeSpanResult => {
    const days = parseInt(timeSpan.split('.')[0])
    
    const months = Math.floor(days / 30)
    const remainingDays = days % 30

    if (months === 0) {
        return {
            months: 0,
            days: days
        }
    }

    return {
        months,
        days: remainingDays
    }
}

export const formatTimeSpanToString = (timeSpan: string): string => {
    const { months, days } = formatTimeSpan(timeSpan)
    
    if (months === 0) {
        return `${days} ngày`
    }
    
    if (days === 0) {
        return `${months} tháng`
    }
    
    return `${months} tháng ${days} ngày`
}
