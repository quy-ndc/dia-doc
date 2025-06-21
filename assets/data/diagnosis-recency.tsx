import { DiagnosisRecency } from '../enum/diagnosis-recency'

export const diagnosisRecencyTypes = [
    { label: 'Ít hơn 3 tháng trước', value: DiagnosisRecency.WITHIN_3_MONTHS.toString() },
    { label: 'Ít hơn 6 tháng trước', value: DiagnosisRecency.WITHIN_6_MONTHS.toString() },
    { label: 'Hơn 1 năm trước', value: DiagnosisRecency.OVER_1_YEAR.toString() }
] 