import { useMutation } from "@tanstack/react-query"
import { LoginDoctorRequest, LoginPatientRequest } from "../type/auth-type"
import { LoginDoctor, LoginPatient } from "../api/auth-service"
import Toast from "react-native-toast-message"



export const useLoginPatientMutation = () => {
    return useMutation({
        mutationFn: (data: LoginPatientRequest) => LoginPatient(data),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: 'Đăng nhập thất bại',
                    visibilityTime: 2000,
                })
            }else {
                Toast.show({
                    type: 'success',
                    text1: 'Đăng nhập thành công',
                    visibilityTime: 2000,
                })
            }
            return data
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Đăng nhập thất bại',
                visibilityTime: 2000
            })
            return error
        }
    })
}


export const useLoginDoctorMutation = () => {
    return useMutation({
        mutationFn: (data: LoginDoctorRequest) =>
            LoginDoctor(data),
        onSuccess: (data) => {
            return data
        },
        onError: (error) => {
            return error
        }
    })
}