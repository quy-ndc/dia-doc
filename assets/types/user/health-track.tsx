import { MeasureTime } from "../../data/measure-time"
import { BmiLevel } from "../../enum/bmi-level"
import { HealthRecordType } from "../../enum/health-record"

export type HealthTrackItem = {
    recordType: HealthRecordType
    healthRecord: WeightRecord | HeightRecord | BloodPressureRecord | BloodSugarRecord | HB1ACRecord | BmiRecord
    mesurementAt: string
    personNote: string
    assistantNote: string[]
}

export type WeightRecord = {
    value: string
    unit: string
    type: string
}

export type HeightRecord = {
    value: string
    unit: string
    type: string
}

export type BloodPressureRecord = {
    systolic: string
    diastolic: string
    unit: string
    type: string
}

export type BloodSugarRecord = {
    value: string
    unit: string
    type: string
    level: string
    measureTime: MeasureTime
}

export type HB1ACRecord = {
    value: string
    unit: string
    type: string
}

export type BmiRecord = {
    bmi: number
    weightValue: number
    heightValue: number
    bmiUnit: string
    weightUnit: string
    heightUnit: string
    level: BmiLevel
    type: string
}