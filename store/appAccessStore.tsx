import { create } from 'zustand'

export type AppAccessStoreState = {
    shouldInvalidate: boolean
    setShouldInvalidate: (value: boolean) => void
}

const useAppAccessStore = create<AppAccessStoreState>((set) => ({
    shouldInvalidate: false,
    setShouldInvalidate: (value: boolean) => set({ shouldInvalidate: value }),
}))

export default useAppAccessStore