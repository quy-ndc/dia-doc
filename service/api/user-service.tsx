import axios from "axios";
import { authApiConfig, createQueryString, endpointUser } from "../endpoint";
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
import { HealthRecordType } from "../../assets/enum/health-record";
import { HealthCarePlanPeriod, HealthCarePlanSubType } from "../../assets/enum/healthcare-plan";
import { DoctorRole } from "../../assets/enum/doctor-role";

export const GetUserProfile = async () => {
    try {
        const response = await axiosServices.get(`${endpointUser.GET_USER_PROFILE}`)

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

export const EditUserProfile = async (data: {
    lastName?: string,
    middleName?: string,
    firstName?: string,
    dateOfBirth?: string,
    gender?: GenderNumber
}) => {
    try {
        const response = await axiosServices.put(`${endpointUser.EDIT_USER_PROFILE}`, {
            lastName: data.lastName,
            middleName: data.middleName,
            firstName: data.firstName,
            dateOfBirth: data.dateOfBirth,
            gender: data.gender
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

export const GetDoctorProfile = async () => {
    try {
        const response = await axiosServices.get(`${endpointUser.GET_DOCTOR_PROFILE}`)

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
    toDate?: string,
    onePerType: boolean
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

export const GetUserHealthCarePlan = async (params: {
    fromDate?: string,
    toDate?: string
}) => {
    try {
        const queryString = createQueryString(params)
        const response = await axiosServices.get(`${endpointUser.GET_USER_HEALTH_CARE_PLAN}?${queryString}`)

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

export const CreateUserProfile = async (data: {
    firstName: string,
    middleName: string,
    lastName: string,
    dateOfBirth: string,
    gender: GenderNumber,
    heightCm: number,
    weightKg: number,
    diabetes: DiaType,
    diagnosisRecency: DiagnosisRecency,
    year?: number,
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
    const config = authApiConfig()
    try {
        const response = await axios.post(`${endpointUser.CREATE_USER_PROFILE}`, {
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            dateOfBirth: data.dateOfBirth,
            gender: data.gender,
            heightCm: data.heightCm,
            weightKg: data.weightKg,
            diabetes: data.diabetes,
            diagnosisRecency: data.diagnosisRecency,
            year: data.year,
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
        }, config)

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
    value: number,
    measurementAt: string
}) => {
    try {
        const response = await axiosServices.post(`${endpointUser.UPDATE_USER_WEIGHT}`, {
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
    value: number,
    measurementAt: string
}) => {
    try {
        const response = await axiosServices.post(`${endpointUser.UPDATE_USER_HEIGHT}`, {
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
    systolic: number,
    diastolic: number,
    personNote: string,
    measurementAt: string
}) => {
    try {
        const response = await axiosServices.post(`${endpointUser.UPDATE_USER_BLOOD_PRESSURE}`, {
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
    value: number,
    measureTime: number,
    personNote: string,
    measurementAt: string
}) => {
    try {
        const response = await axiosServices.post(`${endpointUser.UPDATE_USER_BLOOD_SUGAR}`, {
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
    value: number,
    personNote: string,
    measurementAt: string
}) => {
    try {
        const response = await axiosServices.post(`${endpointUser.UPDATE_USER_HBA1C}`, {
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

export const GetCarePlanTemplate = async (params: {
    Cursor?: string,
    Search?: string,
    RecordType?: HealthRecordType,
    Period?: HealthCarePlanPeriod,
    SubType?: HealthCarePlanSubType,
    PageSize?: number,
    SortBy: string,
    SortDirection: number
}) => {
    try {
        const queryString = createQueryString(params)
        const response = await axiosServices.get(`${endpointUser.GET_CARE_PLAN_TEMPLATE}?${queryString}`)

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

export const CreateCarePlanTemplate = async (params: {
    recordType: HealthRecordType,
    period: HealthCarePlanPeriod,
    subType?: HealthCarePlanSubType,
}) => {
    try {
        const response = await axiosServices.post(`${endpointUser.GET_CARE_PLAN_TEMPLATE}`, {
            recordType: params.recordType,
            period: params.period,
            subType: params.subType
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

export const UpdateCarePlanTemplate = async (params: {
    id: string
    recordType?: HealthRecordType,
    period?: HealthCarePlanPeriod,
    subType?: HealthCarePlanSubType,
}) => {
    try {
        const response = await axiosServices.put(`${endpointUser.GET_CARE_PLAN_TEMPLATE}/${params.id}`, {
            recordType: params.recordType,
            period: params.period,
            subType: params.subType
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

export const DeleteCarePlanTemplate = async (id: string) => {
    try {
        const response = await axiosServices.delete(`${endpointUser.GET_CARE_PLAN_TEMPLATE}/${id}`)

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

export const GetAllServicePackages = async (params: {
    Search?: string,
    Cursor?: string,
    PageSize?: number,
    SortBy: string,
    SortDirection: number
}) => {
    try {
        const queryString = createQueryString(params)
        const response = await axiosServices.get(`${endpointUser.GET_ALL_SERVICE_PACKAGES}?${queryString}`)

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

export const GetAllPurchasedServicePackages = async (params: {
    Search?: string,
    Cursor?: string,
    PageSize?: number,
    SortBy: string,
    SortDirection: number
}) => {
    try {
        const queryString = createQueryString(params)
        const response = await axiosServices.get(`${endpointUser.GET_ALL_PURCHASED_SERVICE_PACKAGES}?${queryString}`)

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

export const CreatePayment = async (servicePackageId: string) => {
    try {
        const response = await axiosServices.post(`${endpointUser.CREATE_PAYMENT}`, {
            servicePackageId: servicePackageId
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

export const GetAllDoctor = async (params: {
    Cursor?: string,
    PageSize?: number,
    Search?: string,
    Gender?: GenderNumber,
    Position?: DoctorRole,
    HospitalId?: string
    SortBy: string,
    SortDirection: number
}) => {
    try {
        const queryString = createQueryString(params)
        const response = await axiosServices.get(`${endpointUser.GET_ALL_DOCTOR}?${queryString}`)

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

export const GetDoctorSchedule = async (params: {
    doctorId: string
    Cursor?: string,
    PageSize?: number,
    FromDate?: string,
    ToDate?: string
}) => {
    try {
        const { doctorId, ...rest } = params
        const queryString = createQueryString(rest)
        const response = await axiosServices.get(`${endpointUser.GET_ALL_DOCTOR_SCHEDULE}/${doctorId}/consultation-templates?${queryString}`)

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

export const GetUserSessionAmount = async () => {
    try {
        const response = await axiosServices.get(`${endpointUser.GET_USER_SESSION_AMOUNT}`)

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

export const CreateBooking = async (data: {
    doctorId: string,
    templateId: string
}) => {
    try {
        const response = await axiosServices.post(`${endpointUser.CREATE_BOOKING}`, {
            doctorId: data.doctorId,
            templateId: data.templateId
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

export const GetAllConsultation = async (params: {
    Cursor?: string,
    PageSize?: number,
    Status?: number
}) => {
    try {
        const queryString = createQueryString(params)
        const response = await axiosServices.get(`${endpointUser.GET_ALL_CONSULTAIONS}?${queryString}`)

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