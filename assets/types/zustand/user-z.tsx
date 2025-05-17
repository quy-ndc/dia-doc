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