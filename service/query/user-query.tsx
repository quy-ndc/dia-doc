import { useMutation } from "@tanstack/react-query" 
import { GetUserProfile, UpdateUserProfile } from "../api/user-service" 

export const useEditPatientMutation = () => {
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
            return data 
        },
        onError: (error) => {
            return error 
        }
    })
}

export const useUserProfile = () => {
    const queryKey = ['patient profile']
    const queryFn = async () => {
        return GetUserProfile()
    }

    return { queryKey, queryFn }
}