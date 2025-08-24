import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateBooking, CreateCarePlanTemplate, CreateCarePlanTemplateDoctor, CreatePayment, CreateUserHealthCarePlan, CreateUserProfile, DeleteCarePlanTemplate, DeleteCarePlanTemplateDoctor, DeleteUserHealthCarePlan, DoctorGetPatientProfile, DoctorGetPatientRecords, EditUserProfile, GetAllConsultation, GetAllDoctor, GetAllDoctorHaveCreatedCarePlan, GetAllPurchasedServicePackages, GetAllServicePackages, GetCarePlanTemplate, GetCarePlanTemplateDoctor, GetDoctorById, GetDoctorProfile, GetDoctorSchedule, GetUserHealthCarePlan, GetUserHealthRecord, GetUserProfile, UpdateCarePlanTemplate, UpdateCarePlanTemplateDoctor, UpdateUserBloodPressure, UpdateUserBloodSugar, UpdateUserHbA1c, UpdateUserHealthCarePlan, UpdateUserHeight, UpdateUserWeight } from "../api/user-service"
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
import { DoctorRole } from "../../assets/enum/doctor-role"

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
    toDate?: string,
    doctorId?: string
}) => {
    const queryKey = [QueryKeys.HEALTH_CARE_PLAN]
    const queryFn = async () => {
        return GetUserHealthCarePlan(params)
    }
    return { queryKey, queryFn }
}

export const useCreateCarePlanMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (params: {
            recordType: HealthRecordType,
            scheduledAt: string,
            subType: HealthCarePlanSubType
        }) => CreateUserHealthCarePlan(params),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data.data.errors[0][0].message || 'Tạo lịch đo thất bại',
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            } else {
                queryClient.invalidateQueries({ queryKey: [QueryKeys.HEALTH_CARE_PLAN] })
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

export const useUpdateCarePlanMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (params: {
            instanceId: string,
            recordType: HealthRecordType,
            scheduledAt: string,
            subType: HealthCarePlanSubType
        }) => UpdateUserHealthCarePlan(params),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data.data.errors[0].message || 'Cập nhật lịch đo thất bại',
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            } else {
                queryClient.invalidateQueries({ queryKey: [QueryKeys.HEALTH_CARE_PLAN] })
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


export const useDeleteCarePlanMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (instanceId: string) => DeleteUserHealthCarePlan(instanceId),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data.data.errors[0].message || 'Xóa lịch đo thất bại',
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            } else {
                queryClient.invalidateQueries({ queryKey: [QueryKeys.HEALTH_CARE_PLAN] })
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

export const useDoctorHaveCreatedCarePlan = () => {
    const queryKey = [QueryKeys.DOCTOR_HAVE_CREATED_CARE_PLAN]
    const queryFn = async () => {
        return GetAllDoctorHaveCreatedCarePlan()
    }

    return { queryKey, queryFn }
}

export const useCarePlanTemplateDoctor = (params: {
    patientId: string,
    search?: string,
    pageSize?: number,
    cursor?: string,
    sortBy: string,
    sortDirection: number
}) => {
    const queryKey = [QueryKeys.CARE_PLAN_DOCTOR, params]
    const queryFn = async () => {
        return GetCarePlanTemplateDoctor(params)
    }

    return { queryKey, queryFn }
}

export const useCreateCarePlanTemplateDoctorMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (params: {
            recordType: HealthRecordType,
            period: HealthCarePlanPeriod,
            subType: HealthCarePlanSubType,
            templateId: string,
            patientId: string
        }) => CreateCarePlanTemplateDoctor(params),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data.data.errors[0].message || 'Tạo lịch đo thất bại',
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            } else {
                queryClient.invalidateQueries({ queryKey: [QueryKeys.PATIENT_RECORDS_BY_DOCTOR] })
                queryClient.invalidateQueries({ queryKey: [QueryKeys.CARE_PLAN_DOCTOR] })
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

export const useUpdateCarePlanTemplateDoctorMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (params: {
            recordType: HealthRecordType,
            period: HealthCarePlanPeriod,
            subType: HealthCarePlanSubType,
            templateId: string,
            patientId: string
        }) => UpdateCarePlanTemplateDoctor(params),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data.data.errors[0].message || 'Cập nhật lịch đo thất bại',
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            } else {
                queryClient.invalidateQueries({ queryKey: [QueryKeys.PATIENT_RECORDS_BY_DOCTOR] })
                queryClient.invalidateQueries({ queryKey: [QueryKeys.CARE_PLAN_DOCTOR] })
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

export const useDeleteCarePlanTemplateDoctorMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (params: {
            templateId: string,
            patientId: string
        }) => DeleteCarePlanTemplateDoctor(params),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data.data.errors[0].message || 'Xóa lịch đo thất bại',
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            } else {
                queryClient.invalidateQueries({ queryKey: [QueryKeys.PATIENT_RECORDS_BY_DOCTOR] })
                queryClient.invalidateQueries({ queryKey: [QueryKeys.CARE_PLAN_DOCTOR] })
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

export const useCreateUserProfileMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: {
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
            measurementAt: string,
            carePlanInstanceId?: string
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
            measurementAt: string,
            carePlanInstanceId?: string
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
            measurementAt: string,
            carePlanInstanceId?: string
        }) => UpdateUserBloodPressure(params),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data.data.error[0].message || 'Cập nhật huyết áp thất bại',
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
            measurementAt: string,
            carePlanInstanceId?: string
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
            measurementAt: string,
            carePlanInstanceId?: string
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
    DoctorId?: string,
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
            scheduledAt: string,
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
            scheduledAt: string,
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
    Search?: string,
    PageSize?: number,
    SortBy: string,
    SortDirection: number
}) => {
    const queryKey = [QueryKeys.SERVICE_PACKAGES, params]

    const queryFn = async ({ pageParam = undefined }) => {
        return GetAllServicePackages({
            ...params,
            Cursor: pageParam,
        })
    }

    return { queryKey, queryFn }
}

export const usePurchasedServicePackageQuery = (params: {
    Search?: string,
    PageSize?: number,
    IsExistedSessions?: boolean
    SortBy: string,
    SortDirection: number
}) => {
    const queryKey = [QueryKeys.PURCHASED_SERVICE_PACKAGES, params]

    const queryFn = async ({ pageParam = undefined }) => {
        return GetAllPurchasedServicePackages({
            ...params,
            Cursor: pageParam,
        })
    }

    return { queryKey, queryFn }
}

export const useCreatePaymentMutation = () => {
    return useMutation({
        mutationFn: (servicePackageId: string) => CreatePayment(servicePackageId),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data?.data?.errors[0].message || 'Tại giao dịch thất bại',
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            }
            return data
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Tại giao dịch thất bại',
                text2: 'Vui lòng thử lại sau',
                visibilityTime: 2000,
            })
            return error
        }
    })
}

export const useDoctorListQuery = (params: {
    PageSize?: number,
    Search?: string,
    Gender?: GenderNumber,
    Position?: DoctorRole,
    HospitalId?: string
    SortBy: string,
    SortDirection: number
}) => {
    const queryKey = [QueryKeys.DOCTOR_LIST, params]

    const queryFn = async ({ pageParam = undefined }) => {
        return GetAllDoctor({
            ...params,
            Cursor: pageParam,
        })
    }

    return { queryKey, queryFn }
}

export const useDoctorByIdQuery = (doctorId: string) => {
    const queryKey = [QueryKeys.DOCTOR_BY_ID, doctorId]

    const queryFn = async () => {
        return GetDoctorById(doctorId)
    }

    return { queryKey, queryFn }
}

export const useDoctorScheduleQuery = (params: {
    doctorId: string
    FromDate?: string,
    ToDate?: string,
    Month?: string
}) => {
    const queryKey = [QueryKeys.DOCTOR_SCHEDULE, params]

    const queryFn = async () => {
        return GetDoctorSchedule(params)
    }

    return { queryKey, queryFn }
}

export const useCreateBookingMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: {
            doctorId: string,
            templateId: string
        }) => CreateBooking(data),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data?.data?.errors[0].messnage || 'Đặt lịch thất bại',
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            } else {
                queryClient.invalidateQueries({ queryKey: [QueryKeys.CONSULTATION_LIST] })
                Toast.show({
                    type: 'success',
                    text1: 'Đặt lịch thành công',
                    visibilityTime: 2000,
                })
            }
            return data
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Đặt lịch thất bại',
                text2: 'Vui lòng thử lại sau',
                visibilityTime: 2000,
            })
            return error
        }
    })
}

export const useConsultationListQuery = (params: {
    Cursor?: string,
    PageSize?: number,
    Status?: number
}) => {
    const queryKey = [QueryKeys.CONSULTATION_LIST, params]

    const queryFn = async ({ pageParam = undefined }) => {
        return GetAllConsultation({
            ...params,
            Cursor: pageParam,
        })
    }

    return { queryKey, queryFn }
}

export const usePatientProfileByDoctor = (patientId: string) => {
    const queryKey = [QueryKeys.PATIENT_PROFILE_BY_DOCTOR, patientId]

    const queryFn = async () => {
        return DoctorGetPatientProfile(patientId)
    }

    return { queryKey, queryFn }
}

export const usePatientRecordsByDoctor = (params: {
    patientId: string,
    onePerType?: boolean,
    recordTypes: string,
}) => {
    const queryKey = [QueryKeys.PATIENT_RECORDS_BY_DOCTOR, params]

    const queryFn = async () => {
        return DoctorGetPatientRecords(params)
    }

    return { queryKey, queryFn }
}