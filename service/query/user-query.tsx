import { useMutation } from "@tanstack/react-query";
import { UpdateUserProfile } from "../api/user-service";
import Toast from "react-native-toast-message";

export const useEditPatientMutation = () => {
    return useMutation({
        mutationFn: (params: {
            dateOfBirth: string,
            genderType: number,
            bloodType: number,
            weight: number,
            height: number,
            diabetesType: number,
            userId: string,
            medicalRecord?: any
        }) => UpdateUserProfile(params),
        onSuccess: (data) => {
            Toast.show({
                type: 'success',
                text1: 'Cập nhật thành công',
                visibilityTime: 2000
            })
            return data;
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Cập nhật thất bại',
                visibilityTime: 2000
            })
            return error;
        }
    })
}