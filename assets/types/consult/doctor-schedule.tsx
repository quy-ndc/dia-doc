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
    userId: string,
    userFullName: string,
    userAvatar: string
    conversationId: string
}