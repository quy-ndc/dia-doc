import { ReactNode } from "react"
import { TrendingUp } from "../lib/icons/TrendingUp"
import { TrendingDown } from "../lib/icons/TrendingDown"
import { Minus } from "../lib/icons/Minus"
import { GlobalColor } from "../global-color"

type ChangeResult = {
    percentage: number
    icon: ReactNode
    color: string
    label: string
}

export function calculateChange(before: number | string, after: number | string): ChangeResult {
    const beforeNum = typeof before === 'string' ? parseFloat(before) : before
    const afterNum = typeof after === 'string' ? parseFloat(after) : after

    if (isNaN(beforeNum) || isNaN(afterNum) || beforeNum === 0) {
        return {
            percentage: 0,
            icon: <Minus size={18} className="text-gray-500" />,
            color: 'text-gray-500',
            label: 'Không đổi'
        }
    }

    const change = ((afterNum - beforeNum) / beforeNum) * 100
    const absChange = Math.abs(change)

    const roundedChange = Math.round(absChange * 10) / 10

    if (change > 0) {
        return {
            percentage: roundedChange,
            icon: <TrendingUp size={18} color={GlobalColor.BLUE_NEON_BORDER} />,
            color: GlobalColor.BLUE_NEON_BORDER,
            label: 'Tăng'
        }
    } else if (change < 0) {
        return {
            percentage: roundedChange,
            icon: <TrendingDown size={18} color={GlobalColor.GREEN_NEON_BORDER} />,
            color: GlobalColor.GREEN_NEON_BORDER,
            label: 'Giảm'
        }
    } else {
        return {
            percentage: 0,
            icon: <Minus size={18} className="text-[var(--fade-text-color)]" />,
            color: 'gray',
            label: 'Không đổi'
        }
    }
}
