import { BloodType } from "../enum/blood" 

export const bloodTypes = [
    { label: 'A+', value: BloodType.A_POSITIVE.toString() },
    { label: 'A-', value: BloodType.A_NEGATIVE.toString() },
    { label: 'B+', value: BloodType.B_POSITIVE.toString() },
    { label: 'B-', value: BloodType.B_NEGATIVE.toString() },
    { label: 'AB+', value: BloodType.AB_POSITIVE.toString() },
    { label: 'AB-', value: BloodType.AB_NEGATIVE.toString() },
    { label: 'O+', value: BloodType.O_POSITIVE.toString() },
    { label: 'O-', value: BloodType.O_NEGATIVE.toString() },
]
