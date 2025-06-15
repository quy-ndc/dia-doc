import { GlobalColor } from "../global-color"
import { Activity } from "../lib/icons/Activity"
import { Heart } from "../lib/icons/Heart"
import { Stethoscope } from "../lib/icons/Stethoscope"
import { Baby } from "../lib/icons/Baby"
import { CircleAlert } from "../lib/icons/CircleAlert"
import { UtensilsCrossed } from "../lib/icons/UtensilsCrossed"
import { Pill } from "../lib/icons/Pill"
import { Cross } from "../lib/icons/Cross"
import { Calendar } from "../lib/icons/Calendar"
import { Brain } from "../lib/icons/Brain"
import { TriangleAlert } from "../lib/icons/TriangleAlert"

const blogTagStyles: Record<string, {
    borderColor: string
    backgroundColor: string
    icon: React.ReactNode
}> = {
    'loại 1': {
        borderColor: GlobalColor.GREEN_NEON_BORDER,
        backgroundColor: GlobalColor.GREEN_NEON_BG,
        icon: <Activity className="text-white" size={18} />,
    },
    'loại 2': {
        borderColor: GlobalColor.YELLOW_NEON_BORDER,
        backgroundColor: GlobalColor.YELLOW_NEON_BG,
        icon: <Heart className="text-white" size={18} />,
    },
    'loại 3': {
        borderColor: GlobalColor.BLUE_NEON_BORDER,
        backgroundColor: GlobalColor.BLUE_NEON_BG,
        icon: <Stethoscope className="text-white" size={18} />,
    },
    'thai kỳ': {
        borderColor: GlobalColor.RED_NEON_BORDER,
        backgroundColor: GlobalColor.RED_NEON_BG,
        icon: <Baby className="text-white" size={18} />,
    },
    'biến chứng': {
        borderColor: GlobalColor.PINK_NEON_BORDER,
        backgroundColor: GlobalColor.PINK_NEON_BG,
        icon: <CircleAlert className="text-white" size={18} />,
    },
    'dinh dưỡng': {
        borderColor: GlobalColor.PURPLE_NEON_BORDER,
        backgroundColor: GlobalColor.PURPLE_NEON_BG,
        icon: <UtensilsCrossed className="text-white" size={18} />,
    },
    'phương pháp': {
        borderColor: GlobalColor.ORANGE_NEON_BORDER,
        backgroundColor: GlobalColor.ORANGE_NEON_BG,
        icon: <Pill className="text-white" size={18} />,
    },
    'thiết bị hỗ trợ': {
        borderColor: GlobalColor.CYAN_NEON_BORDER,
        backgroundColor: GlobalColor.CYAN_NEON_BG,
        icon: <Cross className="text-white" size={18} />,
    },
    'triệu chứng': {
        borderColor: GlobalColor.ROSE_NEON_BORDER,
        backgroundColor: GlobalColor.ROSE_NEON_BG,
        icon: <TriangleAlert className="text-white" size={18} />,
    },
    'thói quen': {
        borderColor: GlobalColor.EMERALD_NEON_BORDER,
        backgroundColor: GlobalColor.EMERALD_NEON_BG,
        icon: <Calendar className="text-white" size={18} />,
    },
    'tâm lí': {
        borderColor: GlobalColor.INDIGO_NEON_BORDER,
        backgroundColor: GlobalColor.INDIGO_NEON_BG,
        icon: <Brain className="text-white" size={18} />,
    }
}

export const getBlogTagColor = (tag: string) => {
    const key = tag.toLowerCase()
    return blogTagStyles[key] ?? {
        borderColor: GlobalColor.GREEN_NEON_BORDER,
        backgroundColor: GlobalColor.GREEN_NEON_BG,
        icon: <Activity className="text-white" size={18} />,
    }
}
