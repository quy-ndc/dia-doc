export enum MedicalHistories {
    HYPERTENSION = 0,
    DYSPLIPIDEMIA = 1,
    CARDIOVASCULAR_DISEASE = 2,
    STROKE = 3,
    CHRONIC_KIDNEY_DISEASE = 4,
    CHRONIC_LIVER_DISEASE = 5,
    ASTHMA_COPD = 6,
    OBESITY = 7,
    THYROID_DISORDER = 8,
    GOUT = 9,
    EYE_DISEASE = 10,
    NEUROPATHY = 11,
    DEPRESSION = 12,
    CANCER = 13,
    OTHER = 14
}

export const MedicalHistoriesString: Record<MedicalHistories, string> = {
    [MedicalHistories.HYPERTENSION]: 'Tăng huyết áp',
    [MedicalHistories.DYSPLIPIDEMIA]: 'Rối loạn lipid máu',
    [MedicalHistories.CARDIOVASCULAR_DISEASE]: 'Bệnh tim mạch',
    [MedicalHistories.STROKE]: 'Đột quỵ',
    [MedicalHistories.CHRONIC_KIDNEY_DISEASE]: 'Bệnh thận mạn',
    [MedicalHistories.CHRONIC_LIVER_DISEASE]: 'Bệnh gan mạn',
    [MedicalHistories.ASTHMA_COPD]: 'Hen/COPD',
    [MedicalHistories.OBESITY]: 'Béo phì',
    [MedicalHistories.THYROID_DISORDER]: 'Rối loạn tuyến giáp',
    [MedicalHistories.GOUT]: 'Gút',
    [MedicalHistories.EYE_DISEASE]: 'Bệnh về mắt',
    [MedicalHistories.NEUROPATHY]: 'Bệnh thần kinh',
    [MedicalHistories.DEPRESSION]: 'Trầm cảm',
    [MedicalHistories.CANCER]: 'Ung thư',
    [MedicalHistories.OTHER]: 'Khác',
};

export function getMedicalHistoriesString(history: MedicalHistories): string {
    return MedicalHistoriesString[history] || 'Không xác định';
}