import { HealthCarePlanPeriod, HealthCarePlanSubType } from "../../enum/healtcare-plan"
import { HealthRecordType } from "../../enum/health-record"

export type HealthCarePlan = {
    recordType: HealthRecordType
    period: HealthCarePlanPeriod
    subtype: HealthCarePlanSubType
    reason: string
    scheduledAt: string
    measuredAt: string
    isCompleted: boolean
}