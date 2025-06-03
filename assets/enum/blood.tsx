import { Text } from '../../components/ui/text'

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

export function getBloodTypeRarity(bloodType: BloodType): JSX.Element {
    const label = BloodTypeString[bloodType] || 'Không xác định'
    const isRare = (() => {
        switch (bloodType) {
            case BloodType.O_POSITIVE:
            case BloodType.A_POSITIVE:
            case BloodType.B_POSITIVE:
                return false
            default:
                return true
        }
    })()

    return (
        <Text style={{ color: isRare ? '#8b5cf6' : '#22c55e', fontWeight: '500', fontSize: 12, letterSpacing: 0.5 }}>
            {isRare ? 'Hiếm' : 'Phổ biến'}
        </Text>
    )
}
