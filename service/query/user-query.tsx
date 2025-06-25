import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateUserProfile, GetUserHealthRecord, GetUserProfile, UpdateUserBloodPressure, UpdateUserBloodSugar, UpdateUserHbA1c, UpdateUserHeight, UpdateUserProfile, UpdateUserWeight } from "../api/user-service";
import { QueryKeys } from "../../assets/enum/query";
import { GenderNumber } from "../../assets/enum/gender";
import { DiagnosisRecency } from "../../assets/enum/diagnosis-recency";
import { Type2TreatmentMethod } from "../../assets/enum/type-2-treatment-method";
import { DiaType } from "../../assets/enum/dia-type";
import { ControlLevel } from "../../assets/enum/control-level";
import { Complications } from "../../assets/enum/complications";
import { InsulinInjectionFrequency } from "../../assets/enum/insulin-injection-frequency";
import { ExerciseFrequency } from "../../assets/enum/exercise-frequency";
import { EatingHabit } from "../../assets/enum/eating-habit";
import { MedicalHistories } from "../../assets/enum/medical-histories";
import Toast from "react-native-toast-message";

export const useEditPatientMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (params: {
            dateOfBirth: string,
            genderType: number,
            bloodType: number,
            weight: number,
            height: number,
            diabetesType: number,
            medicalRecord?: any
        }) => UpdateUserProfile(params),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.USER] })
            return data;
        },
        onError: (error) => {
            return error;
        }
    })
}

export const useUserProfile = () => {
    const queryKey = [QueryKeys.USER]
    const queryFn = async () => {
        return GetUserProfile()
    }

    return { queryKey, queryFn }
}

export const useUserHealthRecordProfile = (params: {
    recordTypes: string,
    newest: boolean,
    fromDate?: string,
    toDate?: string
}) => {
    const queryKey = [QueryKeys.HEALTH_RECORD]
    const queryFn = async () => {
        return GetUserHealthRecord(params)
    }

    return { queryKey, queryFn }
}

export const useCreateUserProfileMutation = () => {
    const queryClient = useQueryClient();
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
            return data;
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Thiết lập hồ sơ thất bại',
                text2: 'Vui lòng thử lại sau',
                visibilityTime: 2000,
            })
            return error;
        }
    })
}

export const useUpdateUserWeightMutation = () => {
    const queryClient = useQueryClient();
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
                Toast.show({
                    type: 'success',
                    text1: 'Cập nhật cân nặng thành công',
                    visibilityTime: 2000,
                })
            }
            return data;
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Cập nhật cân nặng thất bại',
                text2: 'Vui lòng thử lại sau',
                visibilityTime: 2000,
            })
            return error;
        }
    })
}

export const useUpdateUserHeightMutation = () => {
    const queryClient = useQueryClient();
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
                Toast.show({
                    type: 'success',
                    text1: 'Cập nhật chiều cao thành công',
                    visibilityTime: 2000,
                })
            }
            return data;
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Cập nhật huyết áp thất bại',
                text2: 'Vui lòng thử lại sau',
                visibilityTime: 2000,
            })
            return error;
        }
    })
}

export const useUpdateUserBloodPressureMutation = () => {
    const queryClient = useQueryClient();
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
                Toast.show({
                    type: 'success',
                    text1: 'Cập nhật huyết áp thành công',
                    visibilityTime: 2000,
                })
            }
            return data;
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Cập nhật huyết áp thất bại',
                text2: 'Vui lòng thử lại sau',
                visibilityTime: 2000,
            })
            return error;
        }
    })
}

export const useUpdateUserBloodSugarMutation = () => {
    const queryClient = useQueryClient();
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
                Toast.show({
                    type: 'success',
                    text1: 'Cập nhật huyết đường thành công',
                    visibilityTime: 2000,
                })
            }
            return data;
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Cập nhật huyết đường thất bại',
                text2: 'Vui lòng thử lại sau',
                visibilityTime: 2000,
            })
            return error;
        }
    })
}

export const useUpdateUserHbA1cMutation = () => {
    const queryClient = useQueryClient();
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
                Toast.show({
                    type: 'success',
                    text1: 'Cập nhật hbA1c thành công',
                    visibilityTime: 2000,
                })
            }
            return data;
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Cập nhật hbA1c thất bại',
                text2: 'Vui lòng thử lại sau',
                visibilityTime: 2000,
            })
            return error;
        }
    })
}