import { GlobalColor } from "../../global-color"
import { HealthRecordType } from "../enum/health-record"
import { Scale } from "../../lib/icons/Scale"
import { Ruler } from "../../lib/icons/Ruler"
import { Heart } from "../../lib/icons/Heart"
import { Droplet } from "../../lib/icons/Droplet"
import { TrendingUp } from "../../lib/icons/TrendingUp"
import * as React from 'react'
import { Activity } from "../../lib/icons/Activity"

export const healthRecord = [
    { label: 'Chiều cao', value: HealthRecordType.HEIGHT.toString() },
    { label: 'Cân nặng', value: HealthRecordType.WEIGHT.toString() },
    { label: 'Đường huyết', value: HealthRecordType.BLOOD_SUGAR.toString() },
    { label: 'Huyết áp', value: HealthRecordType.BLOOD_PRESSURE.toString() },
    { label: 'HbA1c', value: HealthRecordType.HBA1C.toString() },
    { label: 'BMI', value: HealthRecordType.BMI.toString() },
]

const healthRecordDisplayMap = {
    [HealthRecordType.HEIGHT]: {
        name: 'Chiều cao',
        icon: <Ruler className="text-white" size={17} />,
        coloredIcon: <Ruler color={GlobalColor.BLUE_NEON_BORDER} size={17} />,
        backgroundColor: GlobalColor.BLUE_NEON_BG,
        iconColor: GlobalColor.BLUE_NEON_BORDER,
        unit: 'cm'
    },
    [HealthRecordType.WEIGHT]: {
        name: 'Cân nặng',
        icon: <Scale className="text-white" size={17} />,
        coloredIcon: <Scale color={GlobalColor.ORANGE_NEON_BORDER} size={17} />,
        backgroundColor: GlobalColor.ORANGE_NEON_BG,
        iconColor: GlobalColor.ORANGE_NEON_BORDER,
        unit: 'kg'
    },
    [HealthRecordType.BLOOD_SUGAR]: {
        name: 'Đường huyết',
        icon: <Droplet className="text-white" size={17} />,
        coloredIcon: <Droplet color={GlobalColor.EMERALD_NEON_BORDER} size={17} />,
        backgroundColor: GlobalColor.EMERALD_NEON_BG,
        iconColor: GlobalColor.EMERALD_NEON_BORDER,
        unit: 'mmol/L'
    },
    [HealthRecordType.BLOOD_PRESSURE]: {
        name: 'Huyết áp',
        icon: <Heart className="text-white" size={17} />,
        coloredIcon: <Heart color={GlobalColor.RED_NEON_BORDER} size={17} />,
        backgroundColor: GlobalColor.RED_NEON_BG,
        iconColor: GlobalColor.RED_NEON_BORDER,
        unit: 'mmHg'
    },
    [HealthRecordType.HBA1C]: {
        name: 'HbA1c',
        icon: <TrendingUp className="text-white" size={17} />,
        coloredIcon: <TrendingUp color={GlobalColor.PURPLE_NEON_BORDER} size={17} />,
        backgroundColor: GlobalColor.PURPLE_NEON_BG,
        iconColor: GlobalColor.PURPLE_NEON_BORDER,
        unit: '%'
    },
    [HealthRecordType.BMI]: {
        name: 'BMI',
        icon: <Activity className="text-white" size={17} />,
        coloredIcon: <Activity color={GlobalColor.INDIGO_NEON_BORDER} size={17} />,
        backgroundColor: GlobalColor.INDIGO_NEON_BG,
        iconColor: GlobalColor.INDIGO_NEON_BORDER,
        unit: 'kg/m2'
    }
} as const

const defaultDisplay = {
    name: 'Unknown',
    icon: <TrendingUp className="text-white" size={17} />,
    coloredIcon: <TrendingUp color={GlobalColor.GREEN_NEON_BORDER} size={17} />,
    backgroundColor: GlobalColor.GREEN_NEON_BG,
    iconColor: GlobalColor.GREEN_NEON_BORDER,
    unit: ''
}

export function getHealthRecordDisplay(type: HealthRecordType) {
    return healthRecordDisplayMap[type] || defaultDisplay
}
