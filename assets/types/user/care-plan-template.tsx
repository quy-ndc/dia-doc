import { HealthRecordType } from "../../enum/health-record"
import { HealthCarePlanPeriod, HealthCarePlanSubType } from "../../enum/healthcare-plan"

export type CarePlanTemplate = {
    id: string
    recordType: HealthRecordType
    period: HealthCarePlanPeriod
    subtype?: HealthCarePlanSubType
    reason: string
    createdDate: string
}