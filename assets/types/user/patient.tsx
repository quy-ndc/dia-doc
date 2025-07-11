import { Complications } from "../../enum/complications"
import { ControlLevel } from "../../enum/control-level"
import { DiaType } from "../../enum/dia-type"
import { DiagnosisRecency } from "../../enum/diagnosis-recency"
import { EatingHabit } from "../../enum/eating-habit"
import { ExerciseFrequency } from "../../enum/exercise-frequency"
import { GenderNumber } from "../../enum/gender"
import { InsulinInjectionFrequency } from "../../enum/insulin-injection-frequency"
import { MedicalHistories } from "../../enum/medical-histories"
import { Type2TreatmentMethod } from "../../enum/type-2-treatment-method"

export type Patient = {
    phoneNumber: string
    avatar: string
    fullName: string
    dateOfBirth: string
    gender: GenderNumber
    diabetesType: DiaType
    diagnosisInfo: {
        year?: number
        diagnosisRecency: DiagnosisRecency
    }
    diabetesCondition: {
        diabetesType: DiaType
        type2TreatmentMethod?: Type2TreatmentMethod
        controlLevel?: ControlLevel
        insulinFrequency?: InsulinInjectionFrequency
        hasComplications: boolean
        complications: Complications[]
        otherComplicationDescription?: string
        exerciseFrequency?: ExerciseFrequency
        eatingHabit?: EatingHabit
        usesAlcoholOrTobacco?: boolean
    }
    medicalHistories: MedicalHistories[]
}