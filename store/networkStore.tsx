import { create } from 'zustand'
import NetInfo from '@react-native-community/netinfo'

type NetworkState = {
    isConnected: boolean
    checkConnection: () => void
}

const useNetworkStore = create<NetworkState>((set) => ({
    isConnected: true,
    checkConnection: () => {
        NetInfo.fetch().then((state) => {
            set({ isConnected: state.isConnected || false })
        })
    },
}))

NetInfo.addEventListener((state) => {
    useNetworkStore.setState({ isConnected: state.isConnected || false })
})

export default useNetworkStore
