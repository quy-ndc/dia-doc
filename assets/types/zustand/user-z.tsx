export type UserZState = {
    name: string;
    email: string;
    isAuthenticated: boolean;
    setUser: (name: string, email: string) => void;
    logout: () => void;
};