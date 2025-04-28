import axios from "axios";
import { endpointUser } from "../endpoint";

export const GetUserProfile = async () => {

    try {
        const response = await axios.get(`${endpointUser.GET_CURRENT_USER}`)

        return {
            success: true,
            status: response.status,
            data: response.data
        }

    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            return {
                success: false,
                status: e.response.status,
                message: e.response.data.message || 'An error occurred',
                data: e.response.data
            };
        }

        return {
            success: false,
            status: 500,
            message: 'An error occurred',
            data: null
        }
    }
}

export const UpdateUserProfile = async ({
    dateOfBirth,
    genderType,
    bloodType,
    weight,
    height,
    userId,
    medicalRecord
}: {
    dateOfBirth: string,
    genderType: number,
    bloodType: number,
    weight: number,
    height: number,
    userId: string,
    medicalRecord?: any
}) => {
    try {
        const response = await axios.put(`${endpointUser.EDIT_USER}`, {
            dateOfBirth: dateOfBirth,
            genderType: genderType,
            bloodType: bloodType,
            weight: weight,
            height: height,
            userId: userId,
            medicalRecord: medicalRecord
        })

        return {
            success: true,
            status: response.status,
            data: response.data
        };

    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            return {
                success: false,
                status: e.response.status,
                message: e.response.data.message || 'An error occurred',
                data: e.response.data
            }
        }

        return {
            success: false,
            status: 500,
            message: 'An error occurred',
            data: null
        }
    }
}

