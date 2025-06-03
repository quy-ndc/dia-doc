import { create } from 'zustand'
import { NotiZState } from '../assets/types/zustand/notification-z'

const useNotificationStore = create<NotiZState>((set) => ({
    notification: [],
    notiCount: 0,

    setNoti: (items) => set({ notification: items }),
    addNoti: (item) => set((state) => ({ notification: [...state.notification, item] })),
    addNotis: (items) => set((state) => ({ notification: [...state.notification, ...items] })),
    removeNoti: (item) => set((state) => ({ notification: state.notification.filter(i => i !== item) })),
    resetNoti: () => set({ notification: [] }),

    increaseCount: () => set((state) => ({ notiCount: state.notiCount + 1 })),
    decreaseCount: () => set((state) => ({ notiCount: Math.max(0, state.notiCount - 1) })),
    clearCount: () => set({ notiCount: 0 }),
}))

export default useNotificationStore
