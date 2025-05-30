import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { GetUserProfile, UpdateUserProfile } from "../api/user-service";

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
            queryClient.invalidateQueries({ queryKey: ['user'] })
            return data;
        },
        onError: (error) => {
            return error;
        }
    })
}

export const useUserProfile = () => {
    const queryKey = ['user']
    const queryFn = async () => {
        return GetUserProfile()
    }

    return { queryKey, queryFn }
}