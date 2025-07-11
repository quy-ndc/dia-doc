export enum DiagnosisRecency {
    WITHIN_3_MONTHS = 0,
    WITHIN_6_MONTHS = 1,
    OVER_1_YEAR = 2
}

export const DiagnosisRecencyString: Record<DiagnosisRecency, string> = {
    [DiagnosisRecency.WITHIN_3_MONTHS]: 'tầm 3 tháng trước',
    [DiagnosisRecency.WITHIN_6_MONTHS]: 'tầm 6 tháng trước',
    [DiagnosisRecency.OVER_1_YEAR]: 'trên 1 năm',
};

export function getDiagnosisRecencyString(recency: DiagnosisRecency): string {
    return DiagnosisRecencyString[recency] || 'Không xác định';
}
