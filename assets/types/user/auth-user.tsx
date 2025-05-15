export type AuthUser = {
    authToken: {
        accessToken: string,
        refreshToken: string,
        tokenType: string
    },
    authUser: {
        id: string,
        email: string,
        fullName: string,
        avatarUrl: string,
        isFirstUpdate: boolean,
        role: number
    }
}