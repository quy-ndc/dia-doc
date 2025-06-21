import { MedicalHistories } from '../enum/medical-histories'

export const medicalHistoryTypes = [
    { label: 'Tăng huyết áp', value: MedicalHistories.HYPERTENSION.toString() },
    { label: 'Rối loạn mỡ máu', value: MedicalHistories.DYSPLIPIDEMIA.toString() },
    { label: 'Bệnh tim mạch', value: MedicalHistories.CARDIOVASCULAR_DISEASE.toString() },
    { label: 'Tai biến', value: MedicalHistories.STROKE.toString() },
    { label: 'Thận mãn tính', value: MedicalHistories.CHRONIC_KIDNEY_DISEASE.toString() },
    { label: 'Gan mãn tính', value: MedicalHistories.CHRONIC_LIVER_DISEASE.toString() },
    { label: 'Hen suyễn/COPD', value: MedicalHistories.ASTHMA_COPD.toString() },
    { label: 'Béo phì', value: MedicalHistories.OBESITY.toString() },
    { label: 'Rối loạn tuyến giáp', value: MedicalHistories.THYROID_DISORDER.toString() },
    { label: 'Gút', value: MedicalHistories.GOUT.toString() },
    { label: 'Bệnh về mắt', value: MedicalHistories.EYE_DISEASE.toString() },
    { label: 'Bệnh thần kinh', value: MedicalHistories.NEUROPATHY.toString() },
    { label: 'Trầm cảm', value: MedicalHistories.DEPRESSION.toString() },
    { label: 'Ung thư', value: MedicalHistories.CANCER.toString() },
    { label: 'Khác', value: MedicalHistories.OTHER.toString() }
] 