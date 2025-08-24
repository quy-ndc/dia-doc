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
    toDate?: string,
    doctorId?: string
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

export const CreateUserHealthCarePlan = async (params: {
    recordType: HealthRecordType,
    scheduledAt: string,
    subType: HealthCarePlanSubType
}) => {
    try {
        const response = await axiosServices.post(`${endpointUser.CREATE_USER_HEALTH_CARE_PLAN}`, {
            recordType: params.recordType,
            scheduledAt: params.scheduledAt,
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

export const UpdateUserHealthCarePlan = async (params: {
    instanceId: string,
    recordType: HealthRecordType,
    scheduledAt: string,
    subType: HealthCarePlanSubType
}) => {
    try {
        const response = await axiosServices.put(`${endpointUser.UPDATE_USER_HEALTH_CARE_PLAN}/${params.instanceId}`, {
            recordType: params.recordType,
            scheduledAt: params.scheduledAt,
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

export const DeleteUserHealthCarePlan = async (instanceId: string) => {
    try {
        const response = await axiosServices.delete(`${endpointUser.DELETE_USER_HEALTH_CARE_PLAN}/${instanceId}`)

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

export const GetAllDoctorHaveCreatedCarePlan = async () => {
    try {
        const response = await axiosServices.get(`${endpointUser.GET_ALL_DOCTOR_HAVE_CREATED_CARE_PLAN}`)

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

export const GetCarePlanTemplateDoctor = async (params: {
    patientId: string,
    search?: string,
    pageSize?: number,
    cursor?: string,
    sortBy: string,
    sortDirection: number
}) => {
    try {
        const { patientId, ...rest } = params
        const queryString = createQueryString(rest)
        const response = await axiosServices.get(`${endpointUser.GET_CARE_PLAN_TEMPLATE_DOCTOR}/${patientId}/template?${queryString}`)

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

export const CreateCarePlanTemplateDoctor = async (params: {
    recordType: HealthRecordType,
    scheduledAt: string,
    subType?: HealthCarePlanSubType,
    patientId: string
}) => {
    try {
        const response = await axiosServices.post(`${endpointUser.CREATE_CARE_PLAN_TEMPLATE_DOCTOR}/${params.patientId}/template`, {
            recordType: params.recordType,
            scheduledAt: params.scheduledAt,
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

export const UpdateCarePlanTemplateDoctor = async (params: {
    recordType: HealthRecordType,
    scheduledAt: string,
    subType?: HealthCarePlanSubType,
    templateId: string,
    patientId: string
}) => {
    try {
        const response = await axiosServices.put(`${endpointUser.UPDATE_CARE_PLAN_TEMPLATE_DOCTOR}/${params.patientId}/template/${params.templateId}`, {
            recordType: params.recordType,
            scheduledAt: params.scheduledAt,
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

export const DeleteCarePlanTemplateDoctor = async (params: {
    templateId: string
}) => {
    try {
        const response = await axiosServices.delete(`${endpointUser.DELETE_CARE_PLAN_TEMPLATE_DOCTOR}/template/${params.templateId}`)

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

export const GetCarePlanInstanceDoctor = async (params: {
    patientId: string,
    search?: string,
    pageSize?: number,
    cursor?: string,
    sortBy: string,
    sortDirection: number
}) => {
    try {
        const { patientId, ...rest } = params
        const queryString = createQueryString(rest)
        const response = await axiosServices.get(`${endpointUser.GET_CARE_PLAN_TEMPLATE_DOCTOR}/${patientId}/careplan?${queryString}`)

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

export const CreateCarePlanInstanceDoctor = async (params: {
    recordType: HealthRecordType,
    scheduledAt: string,
    subType?: HealthCarePlanSubType,
    patientId: string
}) => {
    try {
        const response = await axiosServices.post(`${endpointUser.CREATE_CARE_PLAN_TEMPLATE_DOCTOR}/${params.patientId}/careplan`, {
            recordType: params.recordType,
            scheduledAt: params.scheduledAt,
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

export const UpdateCarePlanInstanceDoctor = async (params: {
    recordType: HealthRecordType,
    scheduledAt: string,
    subType?: HealthCarePlanSubType,
    instanceId: string,
    patientId: string
}) => {
    try {
        const response = await axiosServices.put(`${endpointUser.UPDATE_CARE_PLAN_TEMPLATE_DOCTOR}/${params.patientId}/careplan/${params.instanceId}`, {
            recordType: params.recordType,
            scheduledAt: params.scheduledAt,
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

export const DeleteCarePlanInstanceDoctor = async (params: {
    instanceId: string
}) => {
    try {
        const response = await axiosServices.delete(`${endpointUser.DELETE_CARE_PLAN_TEMPLATE_DOCTOR}/careplan/${params.instanceId}`)

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
    measurementAt: string,
    carePlanInstanceId?: string
}) => {
    try {
        const response = await axiosServices.post(`${endpointUser.UPDATE_USER_WEIGHT}`, {
            value: params.value,
            measurementAt: params.measurementAt,
            ...(params.carePlanInstanceId ? { carePlanInstanceId: params.carePlanInstanceId } : {})
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
    measurementAt: string,
    carePlanInstanceId?: string
}) => {
    try {
        const response = await axiosServices.post(`${endpointUser.UPDATE_USER_HEIGHT}`, {
            value: params.value,
            measurementAt: params.measurementAt,
            ...(params.carePlanInstanceId ? { carePlanInstanceId: params.carePlanInstanceId } : {})
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
    measurementAt: string,
    carePlanInstanceId?: string
}) => {
    try {
        const response = await axiosServices.post(`${endpointUser.UPDATE_USER_BLOOD_PRESSURE}`, {
            systolic: params.systolic,
            diastolic: params.diastolic,
            personNote: params.personNote,
            measurementAt: params.measurementAt,
            ...(params.carePlanInstanceId ? { carePlanInstanceId: params.carePlanInstanceId } : {})
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
    measurementAt: string,
    carePlanInstanceId?: string
}) => {
    try {
        const response = await axiosServices.post(`${endpointUser.UPDATE_USER_BLOOD_SUGAR}`, {
            value: params.value,
            measureTime: params.measureTime,
            personNote: params.personNote,
            measurementAt: params.measurementAt,
            ...(params.carePlanInstanceId ? { carePlanInstanceId: params.carePlanInstanceId } : {})
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
    measurementAt: string,
    carePlanInstanceId?: string
}) => {
    try {
        const response = await axiosServices.post(`${endpointUser.UPDATE_USER_HBA1C}`, {
            value: params.value,
            personNote: params.personNote,
            measurementAt: params.measurementAt,
            ...(params.carePlanInstanceId ? { carePlanInstanceId: params.carePlanInstanceId } : {})
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
    DoctorId?: string,
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
    scheduledAt: string,
    subType?: HealthCarePlanSubType,
}) => {
    try {
        const response = await axiosServices.post(`${endpointUser.GET_CARE_PLAN_TEMPLATE}`, {
            recordType: params.recordType,
            scheduledAt: params.scheduledAt,
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
    scheduledAt?: string,
    subType?: HealthCarePlanSubType,
}) => {
    try {
        const response = await axiosServices.put(`${endpointUser.GET_CARE_PLAN_TEMPLATE}/${params.id}`, {
            recordType: params.recordType,
            scheduledAt: params.scheduledAt,
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
    IsExistedSessions?: boolean,
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

export const GetDoctorById = async (doctorId: string) => {
    try {
        const response = await axiosServices.get(`${endpointUser.GET_DOCTOR_BY_ID}/${doctorId}`)

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
    FromDate?: string,
    ToDate?: string
    Month?: string
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

export const DoctorGetPatientProfile = async (patientId: string) => {
    try {
        const response = await axiosServices.get(`${endpointUser.DOCTOR_GET_PATIENT_PROFILE}/${patientId}`)

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

export const DoctorGetPatientRecords = async (params: {
    patientId: string,
    onePerType?: boolean,
    recordTypes: string,
}) => {

    const { patientId, ...rest } = params
    const queryString = createQueryString(rest)
    try {
        const response = await axiosServices.get(`${endpointUser.DOCTOR_GET_PATIENT_RECORDS}/${patientId}?${queryString}`)

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