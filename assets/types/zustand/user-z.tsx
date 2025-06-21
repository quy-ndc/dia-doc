import { UserRole } from "../../enum/user-role";

export type UserZState = {
    user: User
    setUser: (user: User) => void
    logout: () => void
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
    diaType: number
    gender: number
    bod: string
    weight: number
    height: number
}