import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import AsyncStorage from '@react-native-async-storage/async-storage'

export type AppConfigStoreState = {
    theme: 'light' | 'dark'
    setTheme: (theme: 'light' | 'dark') => void
    tokenDevice: string | null
    setTokenDevice: (token: string | null) => void
}

const useConfigStore = create<AppConfigStoreState>()(
    persist(
        (set) => ({
            theme: 'light',
            setTheme: (theme) => set({ theme: theme }),
            tokenDevice: null,
            setTokenDevice: (token) => set({ tokenDevice: token }),
        }),
        {
            name: 'app-config-storage',
            storage: createJSONStorage(() => AsyncStorage),
        },
    )
)

export default useConfigStore