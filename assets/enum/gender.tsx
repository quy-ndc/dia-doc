export enum GenderNumber {
    MALE = 0,
    FAMALE = 1,
}

export const GenderString: Record<GenderNumber, string> = {
    [GenderNumber.MALE]: 'Nam',
    [GenderNumber.FAMALE]: 'Nữ',
}

export function getGenderString(gender: GenderNumber): string {
    return GenderString[gender] || 'Không xác định';
}