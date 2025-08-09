import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateCarePlanTemplate, CreateUserProfile, DeleteCarePlanTemplate, EditUserProfile, GetAllServicePackages, GetCarePlanTemplate, GetDoctorProfile, GetUserHealthCarePlan, GetUserHealthRecord, GetUserProfile, UpdateCarePlanTemplate, UpdateUserBloodPressure, UpdateUserBloodSugar, UpdateUserHbA1c, UpdateUserHeight, UpdateUserWeight } from "../api/user-service"
import { QueryKeys } from "../../assets/enum/query"
import { GenderNumber } from "../../assets/enum/gender"
import { DiagnosisRecency } from "../../assets/enum/diagnosis-recency"
import { Type2TreatmentMethod } from "../../assets/enum/type-2-treatment-method"
import { DiaType } from "../../assets/enum/dia-type"
import { ControlLevel } from "../../assets/enum/control-level"
import { Complications } from "../../assets/enum/complications"
import { InsulinInjectionFrequency } from "../../assets/enum/insulin-injection-frequency"
import { ExerciseFrequency } from "../../assets/enum/exercise-frequency"
import { EatingHabit } from "../../assets/enum/eating-habit"
import { MedicalHistories } from "../../assets/enum/medical-histories"
import Toast from "react-native-toast-message"
import { HealthRecordType } from "../../assets/enum/health-record"
import { HealthCarePlanPeriod, HealthCarePlanSubType } from "../../assets/enum/healthcare-plan"
import { GetAllMedias } from "../api/media-service"


export const useUserProfile = () => {
    const queryKey = [QueryKeys.USER]
    const queryFn = async () => {
        return GetUserProfile()
    }

    return { queryKey, queryFn }
}


export const useEditUserProfileMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: {
            lastName?: string,
            middleName?: string,
            firstName?: string,
            dateOfBirth?: string,
            gender?: GenderNumber
        }) => EditUserProfile(data),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data.data.detail || 'Cập nhật hồ sơ thất bại',
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            } else {
                queryClient.invalidateQueries({ queryKey: [QueryKeys.USER] })
                Toast.show({
                    type: 'success',
                    text1: 'Cập nhật hồ sơ thành công',
                    visibilityTime: 2000,
                })
            }
            return data
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Cập nhật hồ sơ thất bại',
                text2: 'Vui lòng thử lại sau',
                visibilityTime: 2000,
            })
            return error
        }
    })
}

export const useDoctorProfile = () => {
    const queryKey = [QueryKeys.DOCTOR]
    const queryFn = async () => {
        return GetDoctorProfile()
    }

    return { queryKey, queryFn }
}

export const useUserHealthRecordProfile = (params: {
    recordTypes: string,
    newest: boolean,
    fromDate?: string,
    toDate?: string,
    onePerType: boolean
}) => {
    const queryKey = [QueryKeys.HEALTH_RECORD, params]
    const queryFn = async () => {
        return GetUserHealthRecord(params)
    }

    return { queryKey, queryFn }
}

export const useUserHealthCarePlan = (params: {
    fromDate?: string,
    toDate?: string
}) => {
    const queryKey = [QueryKeys.HEALTH_CARE_PLAN]
    const queryFn = async () => {
        return GetUserHealthCarePlan(params)
    }

    return { queryKey, queryFn }
}

export const useCreateUserProfileMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: {
            fullName: string,
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
        }) => CreateUserProfile(data),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data.data.detail || 'Thiết lập hồ sơ thất bại',
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            } else {
                queryClient.invalidateQueries({ queryKey: [QueryKeys.USER] })
                Toast.show({
                    type: 'success',
                    text1: 'Thiết lập hồ sơ thành công',
                    visibilityTime: 2000,
                })
            }
            return data
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Thiết lập hồ sơ thất bại',
                text2: 'Vui lòng thử lại sau',
                visibilityTime: 2000,
            })
            return error
        }
    })
}

export const useUpdateUserWeightMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (params: {
            value: number,
            measurementAt: string
        }) => UpdateUserWeight(params),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data.data.detail || 'Cập nhật cân nặng thất bại',
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            } else {
                queryClient.invalidateQueries({ queryKey: [QueryKeys.HEALTH_RECORD] })
                queryClient.invalidateQueries({ queryKey: [QueryKeys.HEALTH_CARE_PLAN] })
                Toast.show({
                    type: 'success',
                    text1: 'Cập nhật cân nặng thành công',
                    visibilityTime: 2000,
                })
            }
            return data
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Cập nhật cân nặng thất bại',
                text2: 'Vui lòng thử lại sau',
                visibilityTime: 2000,
            })
            return error
        }
    })
}

export const useUpdateUserHeightMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (params: {
            value: number,
            measurementAt: string
        }) => UpdateUserHeight(params),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data.data.detail || 'Cập nhật chiều cao thất bại',
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            } else {
                queryClient.invalidateQueries({ queryKey: [QueryKeys.HEALTH_RECORD] })
                queryClient.invalidateQueries({ queryKey: [QueryKeys.HEALTH_CARE_PLAN] })
                Toast.show({
                    type: 'success',
                    text1: 'Cập nhật chiều cao thành công',
                    visibilityTime: 2000,
                })
            }
            return data
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Cập nhật huyết áp thất bại',
                text2: 'Vui lòng thử lại sau',
                visibilityTime: 2000,
            })
            return error
        }
    })
}

export const useUpdateUserBloodPressureMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (params: {
            systolic: number,
            diastolic: number,
            personNote: string,
            measurementAt: string
        }) => UpdateUserBloodPressure(params),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data.data.detail || 'Cập nhật huyết áp thất bại',
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            } else {
                queryClient.invalidateQueries({ queryKey: [QueryKeys.HEALTH_RECORD] })
                queryClient.invalidateQueries({ queryKey: [QueryKeys.HEALTH_CARE_PLAN] })
                Toast.show({
                    type: 'success',
                    text1: 'Cập nhật huyết áp thành công',
                    visibilityTime: 2000,
                })
            }
            return data
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Cập nhật huyết áp thất bại',
                text2: 'Vui lòng thử lại sau',
                visibilityTime: 2000,
            })
            return error
        }
    })
}

export const useUpdateUserBloodSugarMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (params: {
            value: number,
            measureTime: number,
            personNote: string,
            measurementAt: string
        }) => UpdateUserBloodSugar(params),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data.data.detail || 'Cập nhật huyết đường thất bại',
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            } else {
                queryClient.invalidateQueries({ queryKey: [QueryKeys.HEALTH_RECORD] })
                queryClient.invalidateQueries({ queryKey: [QueryKeys.HEALTH_CARE_PLAN] })
                Toast.show({
                    type: 'success',
                    text1: 'Cập nhật huyết đường thành công',
                    visibilityTime: 2000,
                })
            }
            return data
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Cập nhật huyết đường thất bại',
                text2: 'Vui lòng thử lại sau',
                visibilityTime: 2000,
            })
            return error
        }
    })
}

export const useUpdateUserHbA1cMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (params: {
            value: number,
            personNote: string,
            measurementAt: string
        }) => UpdateUserHbA1c(params),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data.data.detail || 'Cập nhật hbA1c thất bại',
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            } else {
                queryClient.invalidateQueries({ queryKey: [QueryKeys.HEALTH_RECORD] })
                queryClient.invalidateQueries({ queryKey: [QueryKeys.HEALTH_CARE_PLAN] })
                Toast.show({
                    type: 'success',
                    text1: 'Cập nhật hbA1c thành công',
                    visibilityTime: 2000,
                })
            }
            return data
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Cập nhật hbA1c thất bại',
                text2: 'Vui lòng thử lại sau',
                visibilityTime: 2000,
            })
            return error
        }
    })
}

export const useCarePlanTemplateQuery = (params: {
    Cursor?: string,
    Search?: string,
    RecordType?: HealthRecordType,
    Period?: HealthCarePlanPeriod,
    SubType?: HealthCarePlanSubType,
    PageSize?: number,
    SortBy: string,
    SortDirection: number
}) => {
    const queryKey = [QueryKeys.CARE_PLAN_TEMPLATE, params]
    const queryFn = async () => {
        return GetCarePlanTemplate(params)
    }

    return { queryKey, queryFn }
}

export const useCreateCarePlanTemplateMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (params: {
            recordType: HealthRecordType,
            period: HealthCarePlanPeriod,
            subType?: HealthCarePlanSubType,
        }) => CreateCarePlanTemplate(params),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data?.data?.errors[0].message || 'Tạo lịch đo thất bại',
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            } else {
                queryClient.invalidateQueries({ queryKey: [QueryKeys.CARE_PLAN_TEMPLATE] })
                Toast.show({
                    type: 'success',
                    text1: 'Tạo lịch đo thành công',
                    visibilityTime: 2000,
                })
            }
            return data
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Tạo lịch đo thất bại',
                text2: 'Vui lòng thử lại sau',
                visibilityTime: 2000,
            })
            return error
        }
    })
}

export const useUpdateCarePlanTemplateMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (params: {
            id: string,
            recordType: HealthRecordType,
            period: HealthCarePlanPeriod,
            subType?: HealthCarePlanSubType,
        }) => UpdateCarePlanTemplate(params),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data?.data?.errors[0].message || 'Cập nhật lịch đo thất bại',
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            } else {
                queryClient.invalidateQueries({ queryKey: [QueryKeys.CARE_PLAN_TEMPLATE] })
                Toast.show({
                    type: 'success',
                    text1: 'Cập nhật lịch đo thành công',
                    visibilityTime: 2000,
                })
            }
            return data
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Cập nhật lịch đo thất bại',
                text2: 'Vui lòng thử lại sau',
                visibilityTime: 2000,
            })
            return error
        }
    })
}

export const useDeleteCarePlanTemplateMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => DeleteCarePlanTemplate(id),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data?.data?.errors[0].message || 'Xóa lịch đo thất bại',
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            } else {
                queryClient.invalidateQueries({ queryKey: [QueryKeys.CARE_PLAN_TEMPLATE] })
                Toast.show({
                    type: 'success',
                    text1: 'Xóa lịch đo thành công',
                    visibilityTime: 2000,
                })
            }
            return data
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Xóa lịch đo thất bại',
                text2: 'Vui lòng thử lại sau',
                visibilityTime: 2000,
            })
            return error
        }
    })
}


export const useServicePackageQuery = (params: {
    search?: string,
    pageSize?: number,
    sortBy: string,
    sortDirection: number
}) => {
    const queryKey = [QueryKeys.SERVICE_PACKAGES, params]

    const queryFn = async ({ pageParam = undefined }) => {
        return GetAllServicePackages({
            ...params,
            cursor: pageParam,
        })
    }

    return { queryKey, queryFn }
}
