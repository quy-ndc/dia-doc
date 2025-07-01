import { HealthCarePlanPeriod, HealthCarePlanSubType } from "../enum/healtcare-plan"

export const getHealthCarePlanPeriodString = (period: HealthCarePlanPeriod): string => {
    const periodStrings: Record<HealthCarePlanPeriod, string> = {
        [HealthCarePlanPeriod.BEFORE_BREAKFAST]: 'Trước ăn sáng',
        [HealthCarePlanPeriod.AFTER_BREAKFAST]: 'Sau ăn sáng',
        [HealthCarePlanPeriod.BEFORE_LUNCH]: 'Trước ăn trưa',
        [HealthCarePlanPeriod.AFTER_LUNCH]: 'Sau ăn trưa',
        [HealthCarePlanPeriod.BEFORE_DINNER]: 'Trước ăn tối',
        [HealthCarePlanPeriod.AFTER_DINNER]: 'Sau ăn tối',
        [HealthCarePlanPeriod.BEFORE_SLEEP]: 'Trước khi ngủ',
        [HealthCarePlanPeriod.MORNING]: 'Buổi sáng',
        [HealthCarePlanPeriod.AFTERNOON]: 'Buổi chiều',
        [HealthCarePlanPeriod.EVENING]: 'Buổi tối',
    }
    return periodStrings[period]
}

export const getHealthCarePlanSubTypeString = (subType: HealthCarePlanSubType): string => {
    const subTypeStrings: Record<HealthCarePlanSubType, string> = {
        [HealthCarePlanSubType.FASTING]: 'Lúc đói',
        [HealthCarePlanSubType.POST_PARANDIAL]: 'Sau ăn',
        [HealthCarePlanSubType.RESTING]: 'Khi nghỉ ngơi',
        [HealthCarePlanSubType.SITTING]: 'Khi ngồi',
        [HealthCarePlanSubType.STANDING]: 'Khi đứng',
    }
    return subTypeStrings[subType]
}
