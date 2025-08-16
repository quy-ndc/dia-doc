import { GlobalColor } from '../../global-color'
import { Check } from '../../lib/icons/Check'
import { CircleAlert } from '../../lib/icons/CircleAlert'
import { TrendingUp } from '../../lib/icons/TrendingUp'
import { HealthRecordType } from '../enum/health-record'
import { MeasureTime } from './measure-time'

export enum BLOOD_SUGAR_LEVELS {
    BEFORE_EATING_LOW = 69,
    AFTER_EATING_LOW = 69,
    NOT_EAT_LOW = 69,

    BEFORE_EATING_NORMAL = 129,
    AFTER_EATING_NORMAL = 179,
    NOT_EAT_NORMAL = 129,

    BEFORE_EATING_HIGH = 130,
    AFTER_EATING_HIGH = 180,
    NOT_EAT_HIGH = 130,
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
            icon: <CircleAlert color={GlobalColor.PURPLE_NEON_BORDER} size={17} />
        }
    } else if (value >= highThreshold) {
        return {
            color: GlobalColor.RED_NEON_BORDER,
            icon: <TrendingUp color={GlobalColor.RED_NEON_BORDER} size={17} />
        }
    } else {
        return {
            color: GlobalColor.GREEN_NEON_BORDER,
            icon: <Check color={GlobalColor.GREEN_NEON_BORDER} size={17} />
        }
    }
}

export const getBloodPressureStatus = (value: string): BloodPressureStatusResult => {
    const [systolic, diastolic] = value.split('/').map(Number)

    const getSystolicStatus = (): HealthStatusResult => {
        if (systolic < BLOOD_PRESSURE_LEVELS.LOW_SYS) {
            return {
                color: GlobalColor.PURPLE_NEON_BORDER,
                icon: <CircleAlert color={GlobalColor.PURPLE_NEON_BORDER} size={17} />
            }
        } else if (systolic >= BLOOD_PRESSURE_LEVELS.HIGH_SYS) {
            return {
                color: GlobalColor.RED_NEON_BORDER,
                icon: <TrendingUp color={GlobalColor.RED_NEON_BORDER} size={17} />
            }
        } else {
            return {
                color: GlobalColor.GREEN_NEON_BORDER,
                icon: <Check color={GlobalColor.GREEN_NEON_BORDER} size={17} />
            }
        }
    }

    const getDiastolicStatus = (): HealthStatusResult => {
        if (diastolic < BLOOD_PRESSURE_LEVELS.LOW_DIA) {
            return {
                color: GlobalColor.PURPLE_NEON_BORDER,
                icon: <CircleAlert color={GlobalColor.PURPLE_NEON_BORDER} size={17} />
            }
        } else if (diastolic >= BLOOD_PRESSURE_LEVELS.HIGH_DIA) {
            return {
                color: GlobalColor.RED_NEON_BORDER,
                icon: <TrendingUp color={GlobalColor.RED_NEON_BORDER} size={17} />
            }
        } else {
            return {
                color: GlobalColor.GREEN_NEON_BORDER,
                icon: <Check color={GlobalColor.GREEN_NEON_BORDER} size={17} />
            }
        }
    }

    return {
        systolic: getSystolicStatus(),
        diastolic: getDiastolicStatus()
    }
}

