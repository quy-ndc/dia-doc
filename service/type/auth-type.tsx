export type LoginPatientRequest = {
    zaloIdentityId: string
    fullName: string
    avatar: string
}

export type LoginDoctorRequest = {
    email: string
    password: string
}