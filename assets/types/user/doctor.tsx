import { DoctorRole } from "../../enum/doctor-role"
import { GenderNumber } from "../../enum/gender"

export type Doctor = {
    id: string
    phoneNumber: string
    avatar: string
    name: string
    dateOfBirth: string
    gender: GenderNumber
    rating: number
    numberOfExperiences: number
    numberOfRating: number
    position: DoctorRole
    introduction: string
    hospital: {
        id: string
        name: string
        phoneNumber: string
        thumbnail: string
    },
    createdDate: string
}

export type IncomeHistory = {
    id: string,
    amount: number,
    direction: number,
    balanceAfterTransaction: number,
    description: string,
    createdDate: string
}