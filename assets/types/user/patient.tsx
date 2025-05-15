import { BloodType } from "../../enum/blood"
import { DiaType } from "../../enum/dia-type"
import { GenderNumber } from "../../enum/gender"

export type Patient = {
    id: string,
    gender: GenderNumber,
    bloodType: BloodType,
    diabetesType: DiaType,
    weight: number,
    height: number,
    userId: string,
    dateOfBirth: string,
    isFirstUpdate: boolean,
    user: {
        id:string,
        fullName:string,
        avatar: {
            publicUrl: string
        },
        patient: any
    }
}