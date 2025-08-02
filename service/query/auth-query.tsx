import { useMutation } from "@tanstack/react-query"
import { ChangePassword, ForgotPassword, LoginUser, RefreshToken, RegisterUser, ResendOtp, ResetPassword, SaveFcmToken, VerifyPhone } from "../api/auth-service"
import Toast from "react-native-toast-message"

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
                    text1: data?.data?.errors[0].message || 'Đăng nhập thất bại',
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
                    text1: data?.data?.errors[0].message || 'Đăng ký thất bại',
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
                    text1: data?.data?.errors[0].message || 'Xác thực thất bại',
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
                    text1: data?.data?.errors[0].message || 'Gửi lại OTP thất bại',
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


export const useSaveFcmTokenMutation = () => {
    return useMutation({
        mutationFn: (fcmToken: string) => SaveFcmToken(fcmToken),
        onSuccess: (data) => {
            return data
        },
        onError: (error) => {
            return error
        }
    })
}

export const useChangePasswordMutation = () => {
    return useMutation({
        mutationFn: (params: {
            otp: string,
            oldPassword: string,
            newPassword: string
        }) => ChangePassword(params),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data?.data?.errors[0].message || 'Đổi mật khẩu thất bại',
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            } else {
                Toast.show({
                    type: 'success',
                    text1: 'Đổi mật khẩu thành công',
                    visibilityTime: 2000,
                })
            }
            return data
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Đổi mật khẩu thất bại',
                text2: 'Vui lòng thử lại sau',
                visibilityTime: 2000
            })
            return error
        }
    })
}

export const useForgotPasswordMutation = () => {
    return useMutation({
        mutationFn: (phoneNumber: string) => ForgotPassword(phoneNumber),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data?.data?.errors[0].message || 'Gửi OTP thất bại',
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            } else {
                Toast.show({
                    type: 'success',
                    text1: 'Gửi OTP thành công',
                    visibilityTime: 2000,
                })
            }
            return data
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Gửi OTP thất bại',
                text2: 'Vui lòng thử lại sau',
                visibilityTime: 2000
            })
            return error
        }
    })
}

export const useResetPasswordMutation = () => {
    return useMutation({
        mutationFn: (params: {
            phoneNumber: string,
            otp: string,
            password: string
        }) => ResetPassword(params),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data?.data?.errors[0].message || 'Đổi mật khẩu thất bại',
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            } else {
                Toast.show({
                    type: 'success',
                    text1: 'Đổi mật khẩu thành công',
                    visibilityTime: 2000,
                })
            }
            return data
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Đổi mật khẩu thất bại',
                text2: 'Vui lòng thử lại sau',
                visibilityTime: 2000
            })
            return error
        }
    })
}