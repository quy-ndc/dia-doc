import { Type2TreatmentMethod } from '../enum/type-2-treatment-method'

export const type2TreatmentTypes = [
    { label: 'Tiêm insulin', value: Type2TreatmentMethod.INSULIN_INJECTION.toString() },
    { label: 'Thuốc uống', value: Type2TreatmentMethod.ORAL_MEDICATION.toString() },
    { label: 'Ăn và tập luyện', value: Type2TreatmentMethod.DIET_AND_EXERCISE.toString() }
] 