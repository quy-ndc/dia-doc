import { GlobalColor } from "../../global-color"
import { HealthRecordType } from "../enum/health-record"
import { Scale } from "../../lib/icons/Scale"
import { Ruler } from "../../lib/icons/Ruler"
import { Heart } from "../../lib/icons/Heart"
import { Droplet } from "../../lib/icons/Droplet"
import { TrendingUp } from "../../lib/icons/TrendingUp"
import * as React from 'react'

const healthRecordDisplayMap = {
    [HealthRecordType.HEIGHT]: {
        name: 'Chiều cao',
        icon: <Ruler className="text-white" size={17} />,
        backgroundColor: GlobalColor.BLUE_NEON_BG,
        iconColor: GlobalColor.BLUE_NEON_BORDER,
        unit: 'cm'
    },
    [HealthRecordType.WEIGHT]: {
        name: 'Cân nặng',
        icon: <Scale className="text-white" size={17} />,
        backgroundColor: GlobalColor.ORANGE_NEON_BG,
        iconColor: GlobalColor.ORANGE_NEON_BORDER,
        unit: 'kg'
    },
    [HealthRecordType.BLOOD_SUGAR]: {
        name: 'Đường huyết',
        icon: <Droplet className="text-white" size={17} />,
        backgroundColor: GlobalColor.EMERALD_NEON_BG,
        iconColor: GlobalColor.EMERALD_NEON_BORDER,
        unit: 'mmol/L'
    },
    [HealthRecordType.BLOOD_PRESSURE]: {
        name: 'Huyết áp',
        icon: <Heart className="text-white" size={17} />,
        backgroundColor: GlobalColor.RED_NEON_BG,
        iconColor: GlobalColor.RED_NEON_BORDER,
        unit: 'mmHg'
    },
    [HealthRecordType.HBA1C]: {
        name: 'HbA1c',
        icon: <TrendingUp className="text-white" size={17} />,
        backgroundColor: GlobalColor.PURPLE_NEON_BG,
        iconColor: GlobalColor.PURPLE_NEON_BORDER,
        unit: '%'
    }
} as const

const defaultDisplay = {
    name: 'Unknown',
    icon: <TrendingUp className="text-white" size={17} />,
    backgroundColor: GlobalColor.GREEN_NEON_BG,
    iconColor: GlobalColor.GREEN_NEON_BORDER,
    unit: ''
}

export function getHealthRecordDisplay(type: HealthRecordType) {
    return healthRecordDisplayMap[type] || defaultDisplay
}
