import { HealthRecordType } from "../../enum/health-record"

export type HealthTrackItem = {
    recordType: HealthRecordType
    healthRecord: WeightRecord | HeightRecord | BloodPressureRecord | BloodSugarRecord | HB1ACRecord
    mesurementAt: string
    personNote: string
    assistantNote: string
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
}

export type HB1ACRecord = {
    value: string
    unit: string
    type: string
}