import { QueryClient, useMutation } from "@tanstack/react-query";
import { GetUserProfile, UpdateUserProfile } from "../api/user-service";

export const useEditPatientMutation = () => {
    const query = new QueryClient()
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
            query.invalidateQueries({ queryKey: ['user'] })
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