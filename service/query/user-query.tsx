import { useMutation } from "@tanstack/react-query";
import { UpdateUserProfile } from "../api/user-service";

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
            return data;
        },
        onError: (error) => {
            return error;
        }
    })
}