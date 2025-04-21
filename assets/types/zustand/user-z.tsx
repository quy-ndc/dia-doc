export type UserZState = {
    // token: string;
    user: User
    isAuthenticated: boolean;
    setUser: (user: User) => void;
    logout: () => void;
};

type User = {
    accessToken: string
    refreshToken: string
    name: string
    phone: string
    blood: string
    diaType: string
    gender: string
    bod: string
    weight: string
    height: string
}