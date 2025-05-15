export const formatDateBlog = (dateInput: string) => {
    const inputDate = new Date(dateInput) 
    const now = new Date() 
    const diffInMilliseconds = now.getTime() - inputDate.getTime() 

    const diffInSeconds = Math.floor(diffInMilliseconds / 1000) 
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60)) 
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60)) 
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24)) 
    const diffInWeeks = Math.floor(diffInDays / 7) 
    const diffInMonths = Math.floor(diffInDays / 30) 
    const diffInYears = Math.floor(diffInDays / 365) 

    if (diffInSeconds < 60) {
        return `${diffInSeconds} giây trước` 
    }

    if (diffInMinutes < 60) {
        return `${diffInMinutes} phút trước` 
    }

    if (diffInHours < 24) {
        return `${diffInHours} giờ trước` 
    }

    if (diffInDays < 7) {
        return `${diffInDays} ngày trước` 
    }

    if (diffInWeeks < 4) {
        return `${diffInWeeks} tuần trước` 
    }

    if (diffInMonths < 12) {
        return `${diffInMonths} tháng trước` 
    }

    return `${diffInYears} năm trước` 
} 
