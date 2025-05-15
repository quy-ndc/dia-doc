import { SystemNotification } from "../notification/notification"

export type NotiZState = {
    notification: SystemNotification[]
    addNoti: (item: SystemNotification) => void
    removeNoti: (item: SystemNotification) => void
    resetNoti: () => void
    notiCount: number
    increaseCount: () => void
    decreaseCount: () => void
    clearCount: () => void
}