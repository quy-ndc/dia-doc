import { GlobalColor } from '../../global-color'
import { Check } from '../../lib/icons/Check'
import { CircleAlert } from '../../lib/icons/CircleAlert'
import { TrendingUp } from '../../lib/icons/TrendingUp'
import { MeasureTime } from './measure-time'

export enum BLOOD_SUGAR_LEVELS {
    BEFORE_EATING_LOW = 3.8,
    AFTER_EATING_LOW = 3.8,
    NOT_EAT_LOW = 3.8,

    BEFORE_EATING_NORMAL = 7.2,
    AFTER_EATING_NORMAL = 9.9,
    NOT_EAT_NORMAL = 7.2,

    BEFORE_EATING_HIGH = 7.2,
    AFTER_EATING_HIGH = 10,
    NOT_EAT_HIGH = 7.2,
}

export enum BLOOD_PRESSURE_LEVELS {
    LOW_SYS = 90,
    LOW_DIA = 60,

    NORMAL_SYS = 140,
    NORMAL_DIA = 90,

    HIGH_SYS = 180,
    HIGH_DIA = 110,
}

export interface HealthStatusResult {
    color: string
    icon: React.ReactNode
    text: string
}

export interface BloodPressureStatusResult {
    systolic: HealthStatusResult
    diastolic: HealthStatusResult
}

export const getBloodSugarStatus = (
    value: number,
    measureTime?: MeasureTime
): HealthStatusResult => {
    let lowThreshold: number
    let highThreshold: number

    switch (measureTime) {
        case MeasureTime.BEFORE_MEAL:
            lowThreshold = BLOOD_SUGAR_LEVELS.BEFORE_EATING_LOW
            highThreshold = BLOOD_SUGAR_LEVELS.BEFORE_EATING_HIGH
            break
        case MeasureTime.AFTER_MEAL:
            lowThreshold = BLOOD_SUGAR_LEVELS.AFTER_EATING_LOW
            highThreshold = BLOOD_SUGAR_LEVELS.AFTER_EATING_HIGH
            break
        case MeasureTime.HAVE_NOT_EATEN:
        default:
            lowThreshold = BLOOD_SUGAR_LEVELS.NOT_EAT_LOW
            highThreshold = BLOOD_SUGAR_LEVELS.NOT_EAT_HIGH
            break
    }

    if (value < lowThreshold) {
        return {
            color: GlobalColor.PURPLE_NEON_BORDER,
            icon: <CircleAlert color={GlobalColor.PURPLE_NEON_BORDER} size={17} />,
            text: 'thấp'
        }
    } else if (value >= highThreshold) {
        return {
            color: GlobalColor.RED_NEON_BORDER,
            icon: <TrendingUp color={GlobalColor.RED_NEON_BORDER} size={17} />,
            text: 'cao'
        }
    } else {
        return {
            color: GlobalColor.GREEN_NEON_BORDER,
            icon: <Check color={GlobalColor.GREEN_NEON_BORDER} size={17} />,
            text: 'ổn'
        }
    }
}

export const getBloodPressureStatus = (value: string): BloodPressureStatusResult => {
    const [systolic, diastolic] = value.split('/').map(Number)

    const getSystolicStatus = (): HealthStatusResult => {
        if (systolic < BLOOD_PRESSURE_LEVELS.LOW_SYS) {
            return {
                color: GlobalColor.PURPLE_NEON_BORDER,
                icon: <CircleAlert color={GlobalColor.PURPLE_NEON_BORDER} size={17} />,
                text: 'thấp'
            }
        } else if (systolic >= BLOOD_PRESSURE_LEVELS.HIGH_SYS) {
            return {
                color: GlobalColor.RED_NEON_BORDER,
                icon: <TrendingUp color={GlobalColor.RED_NEON_BORDER} size={17} />,
                text: 'cao'
            }
        } else {
            return {
                color: GlobalColor.GREEN_NEON_BORDER,
                icon: <Check color={GlobalColor.GREEN_NEON_BORDER} size={17} />,
                text: 'ổn'
            }
        }
    }

    const getDiastolicStatus = (): HealthStatusResult => {
        if (diastolic < BLOOD_PRESSURE_LEVELS.LOW_DIA) {
            return {
                color: GlobalColor.PURPLE_NEON_BORDER,
                icon: <CircleAlert color={GlobalColor.PURPLE_NEON_BORDER} size={17} />,
                text: 'thấp'
            }
        } else if (diastolic >= BLOOD_PRESSURE_LEVELS.HIGH_DIA) {
            return {
                color: GlobalColor.RED_NEON_BORDER,
                icon: <TrendingUp color={GlobalColor.RED_NEON_BORDER} size={17} />,
                text: 'cao'
            }
        } else {
            return {
                color: GlobalColor.GREEN_NEON_BORDER,
                icon: <Check color={GlobalColor.GREEN_NEON_BORDER} size={17} />,
                text: 'ổn'
            }
        }
    }

    return {
        systolic: getSystolicStatus(),
        diastolic: getDiastolicStatus()
    }
}

