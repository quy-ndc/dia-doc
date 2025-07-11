export enum Type2TreatmentMethod {
    INSULIN_INJECTION = 0,
    ORAL_MEDICATION = 1,
    DIET_AND_EXERCISE = 2
}

export const Type2TreatmentMethodString: Record<Type2TreatmentMethod, string> = {
    [Type2TreatmentMethod.INSULIN_INJECTION]: 'Tiêm insulin',
    [Type2TreatmentMethod.ORAL_MEDICATION]: 'Uống thuốc',
    [Type2TreatmentMethod.DIET_AND_EXERCISE]: 'Ăn kiêng và tập luyện',
};

export function getType2TreatmentMethodString(method: Type2TreatmentMethod): string {
    return Type2TreatmentMethodString[method] || 'Không xác định';
}