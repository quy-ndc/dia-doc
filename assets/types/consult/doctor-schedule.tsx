export type DoctorSchedule = {
    date: string,
    consultationTemplates: DoctorScheduleTime[]
}

export type DoctorScheduleTime = {
    id: string,
    startTime: string,
    endTime: string,
    status: number
}

export type ConsultationHistory = {
    id: string,
    date: string,
    startTime: string,
    endTime: string,
    status: number,
    userFullName: string,
    userAvatar: string
    conversationId: string
}