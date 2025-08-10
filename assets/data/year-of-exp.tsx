import { GlobalColor } from "../../global-color"

export const yearOfExpDisplayMap = {
    green: {
        borderColor: GlobalColor.EMERALD_NEON_BORDER,
        backgroundColor: GlobalColor.EMERALD_NEON_BG,
        text: "Có KN"
    },
    blue: {
        borderColor: GlobalColor.BLUE_NEON_BORDER,
        backgroundColor: GlobalColor.BLUE_NEON_BG,
        text: "Giàu KN"
    },
    purple: {
        borderColor: GlobalColor.PURPLE_NEON_BORDER,
        backgroundColor: GlobalColor.PURPLE_NEON_BG,
        text: "Chuyên gia"
    },
    orange: {
        borderColor: GlobalColor.ORANGE_NEON_BORDER,
        backgroundColor: GlobalColor.ORANGE_NEON_BG,
        text: "Chuyên gia"
    }
} as const

const defaultDisplay = {
    borderColor: GlobalColor.GREEN_NEON_BORDER,
    backgroundColor: GlobalColor.GREEN_NEON_BG,
    text: "Có KN"
}

export function getYearOfExpDisplay(years: number) {
    if (years >= 1 && years <= 4) {
        return yearOfExpDisplayMap.green
    } else if (years >= 5 && years <= 9) {
        return yearOfExpDisplayMap.blue
    } else if (years >= 10 && years <= 14) {
        return yearOfExpDisplayMap.purple
    } else if (years >= 15) {
        return yearOfExpDisplayMap.orange
    }
    
    return defaultDisplay
}
