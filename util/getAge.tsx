export function getAge(dateOfBirth: string | Date): string {
    const birthDate = new Date(dateOfBirth)
    const now = new Date()

    let years = now.getFullYear() - birthDate.getFullYear()
    let months = now.getMonth() - birthDate.getMonth()

    if (months < 0) {
        years--
        months += 12
    }
    
    if (years < 1) {
        return `${months} tháng`
    }

    return `${years} tuổi`
}
