import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GetUserProfile, UpdateUserProfile } from "../api/user-service";
import { QueryKeys } from "../../assets/enum/query";

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
    const queryKey = ['user']
    const queryFn = async () => {
        return GetUserProfile()
    }

    return { queryKey, queryFn }
}