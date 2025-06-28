import { useMutation } from "@tanstack/react-query"
import { LoginPatientRequest } from "../type/auth-type"
import { LoginPatient, LoginUser, RefreshToken, RegisterUser, ResendOtp, VerifyPhone } from "../api/auth-service"
import Toast from "react-native-toast-message"

export const useLoginPatientMutation = () => {
    return useMutation({
        mutationFn: (data: LoginPatientRequest) => LoginPatient(data),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: 'Đăng nhập thất bại',
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            } else {
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

export const useLoginUserMutation = () => {
    return useMutation({
        mutationFn: (data: {
            phoneNumber: string,
            password: string
        }) => LoginUser(data),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data.data.detail,
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            } else {
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
                text2: 'Vui lòng thử lại sau',
                visibilityTime: 2000
            })
            return error
        }
    })
}

export const useRegisterUserMutation = () => {
    return useMutation({
        mutationFn: (data: {
            phoneNumber: string,
            password: string
        }) => RegisterUser(data),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data.data.detail,
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            } else {
                Toast.show({
                    type: 'success',
                    text1: 'Đăng ký thành công',
                    visibilityTime: 2000,
                })
            }
            return data
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Đăng ký thất bại',
                text2: 'Vui lòng thử lại sau',
                visibilityTime: 2000
            })
            return error
        }
    })
}

export const useVerifyPhoneMutation = () => {
    return useMutation({
        mutationFn: (data: {
            phoneNumber: string,
            otp: string
        }) => VerifyPhone(data),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data.data.detail,
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            } else {
                Toast.show({
                    type: 'success',
                    text1: 'Xác thực thành công',
                    visibilityTime: 2000,
                })
            }
            return data
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Xác thực thất bại',
                text2: 'Vui lòng thử lại sau',
                visibilityTime: 2000
            })
            return error
        }
    })
}

export const useResendOtpMutation = () => {
    return useMutation({
        mutationFn: (phoneNumber: string) => ResendOtp(phoneNumber),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data.data.detail,
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            } else {
                Toast.show({
                    type: 'success',
                    text1: 'Gửi lại OTP thành công',
                    visibilityTime: 2000,
                })
            }
            return data
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Gửi lại OTP thất bại',
                text2: 'Vui lòng thử lại sau',
                visibilityTime: 2000
            })
            return error
        }
    })
}

export const useRefreshTokenMutation = () => {
    return useMutation({
        mutationFn: RefreshToken,
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data.data.detail,
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            }

            return data
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Làm mới token thất bại',
                visibilityTime: 2000
            })
            return error
        },
    })
}