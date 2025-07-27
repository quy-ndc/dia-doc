import { HealthCarePlanPeriod, HealthCarePlanSubType } from "../enum/healthcare-plan"

export const getHealthCarePlanPeriodString = (period: HealthCarePlanPeriod): string | undefined => {
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
    return period in periodStrings ? periodStrings[period] : undefined
}

export const getHealthCarePlanSubTypeString = (subType: HealthCarePlanSubType): string | undefined => {
    const subTypeStrings: Record<HealthCarePlanSubType, string> = {
        [HealthCarePlanSubType.FASTING]: 'Lúc đói',
        [HealthCarePlanSubType.POST_PARANDIAL]: 'Sau ăn',
        [HealthCarePlanSubType.RESTING]: 'Khi nghỉ ngơi',
        [HealthCarePlanSubType.SITTING]: 'Khi ngồi',
        [HealthCarePlanSubType.STANDING]: 'Khi đứng',
    }
    return subType in subTypeStrings ? subTypeStrings[subType] : undefined
}

export const healthCarePlanPeriod = [
    { label: 'Trước ăn sáng', value: HealthCarePlanPeriod.BEFORE_BREAKFAST.toString() },
    { label: 'Sau ăn sáng', value: HealthCarePlanPeriod.AFTER_BREAKFAST.toString() },
    { label: 'Trước ăn trưa', value: HealthCarePlanPeriod.BEFORE_LUNCH.toString() },
    { label: 'Sau ăn trưa', value: HealthCarePlanPeriod.AFTER_LUNCH.toString() },
    { label: 'Trước ăn tối', value: HealthCarePlanPeriod.BEFORE_DINNER.toString() },
    { label: 'Sau ăn tối', value: HealthCarePlanPeriod.AFTER_DINNER.toString() },
    { label: 'Trước khi ngủ', value: HealthCarePlanPeriod.BEFORE_SLEEP.toString() },
    { label: 'Buổi sáng', value: HealthCarePlanPeriod.MORNING.toString() },
    { label: 'Buổi chiều', value: HealthCarePlanPeriod.AFTERNOON.toString() },
    { label: 'Buổi tối', value: HealthCarePlanPeriod.EVENING.toString() },
]

export const healthCarePlanSubType = [
    { label: 'Lúc đói', value: HealthCarePlanSubType.FASTING.toString() },
    { label: 'Sau ăn', value: HealthCarePlanSubType.POST_PARANDIAL.toString() },
    { label: 'Khi nghỉ ngơi', value: HealthCarePlanSubType.RESTING.toString() },
    { label: 'Khi ngồi', value: HealthCarePlanSubType.SITTING.toString() },
    { label: 'Khi đứng', value: HealthCarePlanSubType.STANDING.toString() },
] 