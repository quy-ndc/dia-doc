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