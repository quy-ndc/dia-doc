import { create } from 'zustand'

type CallState = {
    incomingCall: boolean
    setIncomingCall: (state: boolean) => void
}

export const useCallStateStore = create<CallState>((set) => ({
    incomingCall: false,
    setIncomingCall: (state) => set({ incomingCall: state })
}))
