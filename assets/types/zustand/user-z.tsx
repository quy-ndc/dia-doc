import { QueryClient } from "@tanstack/react-query";
import { UserRole } from "../../enum/user-role";

export type UserZState = {
    user: User
    setUser: (user: User) => void
    logout: (queryClient: QueryClient) => void
};

export type User = {
    isAuthenticated: boolean
    isSetUp: boolean
    accessToken: string
    refreshToken: string
    id: string
    role: UserRole
    fullname: string
    avatar: string
    phone: string
    blood: number
    diaType: number
    gender: number
    bod: string
    weight: number
    height: number
}