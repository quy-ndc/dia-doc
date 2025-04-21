export type LoginPatientRequest = {
    zaloIdentityId: string
    fullName: string
    avatar: string
}

export type LoginDoctorRequest = {
    email: string
    password: string
}

// export type LoginResponse = {
//     title: string,
//     status: number,
//     detail: string,
//     errorCode: string,
//     errors: string
// }