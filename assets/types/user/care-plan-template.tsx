import { HealthRecordType } from "../../enum/health-record"
import { HealthCarePlanPeriod, HealthCarePlanSubType } from "../../enum/healthcare-plan"

export type CarePlanTemplate = {
    id: string
    recordType: HealthRecordType
    period?: HealthCarePlanPeriod
    scheduledAt?: string
    subType?: HealthCarePlanSubType
    reason?: string
    createdDate: string
}