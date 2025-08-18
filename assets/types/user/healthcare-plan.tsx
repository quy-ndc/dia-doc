import { HealthCarePlanPeriod, HealthCarePlanSubType } from "../../enum/healthcare-plan"
import { HealthRecordType } from "../../enum/health-record"

export type HealthCarePlan = {
    id: string
    recordType: HealthRecordType
    period: HealthCarePlanPeriod
    subtype: HealthCarePlanSubType
    reason: string
    scheduledAt: string
    measuredAt: string
    isCompleted: boolean
}