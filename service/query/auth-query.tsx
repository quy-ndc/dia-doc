import { useMutation } from "@tanstack/react-query";
import { LoginDoctorRequest, LoginPatientRequest } from "../type/auth-type";
import { LoginDoctor, LoginPatient } from "../api/auth-service";



export const useLoginPatientMutation = () => {
    return useMutation({
        mutationFn: (data: LoginPatientRequest) => LoginPatient(data),
        onSuccess: (data) => {
            return data;
        },
        onError: (error) => {
            return error;
        }
    })
}


export const useLoginDoctorMutation = () => {
    return useMutation({
        mutationFn: (data: LoginDoctorRequest) =>
            LoginDoctor(data),
        onSuccess: (data) => {
            return data;
        },
        onError: (error) => {
            return error;
        }
    });
};