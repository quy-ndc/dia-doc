import AsyncStorage from '@react-native-async-storage/async-storage' 
import { create } from 'zustand' 
import { createJSONStorage, persist } from 'zustand/middleware' 
import { NotiZState } from '../assets/types/zustand/notification-z' 


const useNotificationStore = create<NotiZState>()(
    persist(
        (set) => ({
            notification: [],
            notiCount: 0,

            addNoti: (item) => set((state) => ({ notification: [...state.notification, item] })),
            removeNoti: (item) => set((state) => ({ notification: state.notification.filter(i => i !== item) })),
            resetNoti: () => set({ notification: [] }),

            increaseCount: () => set((state) => ({ notiCount: state.notiCount + 1 })),
            decreaseCount: () => set((state) => ({ notiCount: Math.max(0, state.notiCount - 1) })),
            clearCount: () => set({ notiCount: 0 }),
        }),
        {
            name: 'noti-store',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
) 

export default useNotificationStore 
