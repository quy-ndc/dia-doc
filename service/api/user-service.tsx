import axios from "axios";
import { createQueryString, endpointUser } from "../endpoint";
import axiosServices from "../axios";
import { GenderNumber } from "../../assets/enum/gender";
import { DiaType } from "../../assets/enum/dia-type";
import { DiagnosisRecency } from "../../assets/enum/diagnosis-recency";
import { Type2TreatmentMethod } from "../../assets/enum/type-2-treatment-method";
import { ControlLevel } from "../../assets/enum/control-level";
import { InsulinInjectionFrequency } from "../../assets/enum/insulin-injection-frequency";
import { Complications } from "../../assets/enum/complications";
import { ExerciseFrequency } from "../../assets/enum/exercise-frequency";
import { EatingHabit } from "../../assets/enum/eating-habit";
import { MedicalHistories } from "../../assets/enum/medical-histories";

export const GetUserProfile = async () => {

    try {
        const response = await axiosServices.get(`${endpointUser.GET_CURRENT_USER}`)

        return {
            success: true,
            status: response.status,
            data: response.data
        }

    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            return {
                success: false,
                status: e.response.status,
                message: e.response.data.message || 'An error occurred',
                data: e.response.data
            };
        }

        return {
            success: false,
            status: 500,
            message: 'An error occurred',
            data: null
        }
    }
}

export const GetUserHealthRecord = async (params: {
    recordTypes: string,
    newest: boolean,
    fromDate?: string,
    toDate?: string
}) => {
    try {
        const queryString = createQueryString(params)
        const response = await axiosServices.get(`${endpointUser.GET_USER_HEALTH_RECORD}?${queryString}`)

        return {
            success: true,
            status: response.status,
            data: response.data
        }

    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            return {
                success: false,
                status: e.response.status,
                message: e.response.data.message || 'An error occurred',
                data: e.response.data
            };
        }

        return {
            success: false,
            status: 500,
            message: 'An error occurred',
            data: null
        }
    }
}

export const UpdateUserProfile = async (param: {
    dateOfBirth: string,
    genderType: number,
    bloodType: number,
    weight: number,
    height: number,
    diabetesType: number,
    medicalRecord?: any
}) => {
    try {
        const response = await axiosServices.put(`${endpointUser.EDIT_USER}`, {
            dateOfBirth: param.dateOfBirth,
            genderType: param.genderType,
            bloodType: param.bloodType,
            weight: param.weight,
            height: param.height,
            diabetesType: param.diabetesType,
            medicalRecord: param.medicalRecord
        })

        return {
            success: true,
            status: response.status,
            data: response.data
        };

    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            return {
                success: false,
                status: e.response.status,
                message: e.response.data.message || 'An error occurred',
                data: e.response.data
            }
        }

        return {
            success: false,
            status: 500,
            message: 'An error occurred',
            data: null
        }
    }
}

export const CreateUserProfile = async (data: {
    userId: string,
    fullName: string,
    dateOfBirth: string,
    gender: GenderNumber,
    heightCm: number,
    weightKg: number,
    diabetes: DiaType,
    diagnosisRecency: DiagnosisRecency,
    year?: number
    type2TreatmentMethod?: Type2TreatmentMethod,
    controlLevel?: ControlLevel,
    insulinInjectionFrequency?: InsulinInjectionFrequency,
    complications?: Complications[],
    otherComplicationDescription?: string,
    exerciseFrequency?: ExerciseFrequency,
    eatingHabit?: EatingHabit,
    usesAlcoholOrTobacco?: boolean,
    medicalHistories?: MedicalHistories[],
    note?: string
}) => {
    try {
        const response = await axios.post(`${endpointUser.CREATE_USER_PROFILE}`, {
            userId: data.userId,
            fullName: data.fullName,
            dateOfBirth: data.dateOfBirth,
            gender: data.gender,
            heightCm: data.heightCm,
            weightKg: data.weightKg,
            diabetes: data.diabetes,
            diagnosisRecency: data.diagnosisRecency,
            type2TreatmentMethod: data.type2TreatmentMethod,
            controlLevel: data.controlLevel,
            insulinInjectionFrequency: data.insulinInjectionFrequency,
            complications: data.complications,
            otherComplicationDescription: data.otherComplicationDescription,
            exerciseFrequency: data.exerciseFrequency,
            eatingHabit: data.eatingHabit,
            usesAlcoholOrTobacco: data.usesAlcoholOrTobacco,
            medicalHistories: data.medicalHistories,
            note: data.note
        })

        return {
            success: true,
            status: response.status,
            data: response.data
        };

    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            return {
                success: false,
                status: e.response.status,
                message: e.response.data.message || 'An error occurred',
                data: e.response.data
            }
        }

        return {
            success: false,
            status: 500,
            message: 'An error occurred',
            data: null
        }
    }
}

export const UpdateUserWeight = async (params: {
    userId: string,
    value: number,
    measurementAt: string
}) => {
    try {
        const response = await axiosServices.post(`${endpointUser.UPDATE_USER_WEIGHT}`, {
            userId: params.userId,
            value: params.value,
            measurementAt: params.measurementAt
        })

        return {
            success: true,
            status: response.status,
            data: response.data
        }

    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            return {
                success: false,
                status: e.response.status,
                message: e.response.data.message || 'An error occurred',
                data: e.response.data
            };
        }

        return {
            success: false,
            status: 500,
            message: 'An error occurred',
            data: null
        }
    }
}

export const UpdateUserHeight = async (params: {
    userId: string,
    value: number,
    measurementAt: string
}) => {
    try {
        const response = await axiosServices.post(`${endpointUser.UPDATE_USER_HEIGHT}`, {
            userId: params.userId,
            value: params.value,
            measurementAt: params.measurementAt
        })

        return {
            success: true,
            status: response.status,
            data: response.data
        }

    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            return {
                success: false,
                status: e.response.status,
                message: e.response.data.message || 'An error occurred',
                data: e.response.data
            };
        }

        return {
            success: false,
            status: 500,
            message: 'An error occurred',
            data: null
        }
    }
}

export const UpdateUserBloodPressure = async (params: {
    userId: string,
    systolic: number,
    diastolic: number,
    personNote: string,
    measurementAt: string
}) => {
    try {
        const response = await axiosServices.post(`${endpointUser.UPDATE_USER_BLOOD_PRESSURE}`, {
            userId: params.userId,
            systolic: params.systolic,
            diastolic: params.diastolic,
            personNote: params.personNote,
            measurementAt: params.measurementAt
        })

        return {
            success: true,
            status: response.status,
            data: response.data
        }

    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            return {
                success: false,
                status: e.response.status,
                message: e.response.data.message || 'An error occurred',
                data: e.response.data
            };
        }

        return {
            success: false,
            status: 500,
            message: 'An error occurred',
            data: null
        }
    }
}

export const UpdateUserBloodSugar = async (params: {
    userId: string,
    value: number,
    measureTime: number,
    personNote: string,
    measurementAt: string
}) => {
    try {
        const response = await axiosServices.post(`${endpointUser.UPDATE_USER_BLOOD_SUGAR}`, {
            userId: params.userId,
            value: params.value,
            measureTime: params.measureTime,
            personNote: params.personNote,
            measurementAt: params.measurementAt
        })

        return {
            success: true,
            status: response.status,
            data: response.data
        }

    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            return {
                success: false,
                status: e.response.status,
                message: e.response.data.message || 'An error occurred',
                data: e.response.data
            };
        }

        return {
            success: false,
            status: 500,
            message: 'An error occurred',
            data: null
        }
    }
}

export const UpdateUserHbA1c = async (params: {
    userId: string,
    value: number,
    personNote: string,
    measurementAt: string
}) => {
    try {
        const response = await axiosServices.post(`${endpointUser.UPDATE_USER_HBA1C}`, {
            userId: params.userId,
            value: params.value,
            personNote: params.personNote,
            measurementAt: params.measurementAt
        })

        return {
            success: true,
            status: response.status,
            data: response.data
        }

    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            return {
                success: false,
                status: e.response.status,
                message: e.response.data.message || 'An error occurred',
                data: e.response.data
            };
        }

        return {
            success: false,
            status: 500,
            message: 'An error occurred',
            data: null
        }
    }
}