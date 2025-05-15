export enum BloodType {
    A_POSITIVE = 0,
    A_NEGATIVE = 1,
    B_POSITIVE = 2,
    B_NEGATIVE = 3,
    AB_POSITIVE = 4,
    AB_NEGATIVE = 5,
    O_POSITIVE = 6,
    O_NEGATIVE = 7
}

export const BloodTypeString: Record<BloodType, string> = {
    [BloodType.A_POSITIVE]: 'A+',
    [BloodType.A_NEGATIVE]: 'A-',
    [BloodType.B_POSITIVE]: 'B+',
    [BloodType.B_NEGATIVE]: 'B-',
    [BloodType.AB_POSITIVE]: 'AB+',
    [BloodType.AB_NEGATIVE]: 'AB-',
    [BloodType.O_POSITIVE]: 'O+',
    [BloodType.O_NEGATIVE]: 'O-',
}

export function getBloodTypeString(bloodType: BloodType): string {
    return BloodTypeString[bloodType] || 'Không xác định'
}
