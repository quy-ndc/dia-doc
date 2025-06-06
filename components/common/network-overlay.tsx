import { useEffect, useRef } from "react"
import useNetworkStore from "../../store/networkStore"
import Toast from "react-native-toast-message"

export default function NetworkOverlay() {
    const isConnected = useNetworkStore((state) => state.isConnected)
    const wasConnected = useRef<boolean | null>(null)

    useEffect(() => {
        if (wasConnected.current === null) {
            wasConnected.current = isConnected
            return
        }

        if (!isConnected) {
            Toast.show({
                type: "error",
                text1: "Mất kết nối",
                text2: "Không có tín hiệu mạng",
                visibilityTime: 0,
                autoHide: false,
            })
        } else {
            Toast.hide()
            Toast.show({
                type: "success",
                text1: "Đã kết nối",
                text2: "Kết nối mạng đã được khôi phục",
                visibilityTime: 2000,
            })
        }

        wasConnected.current = isConnected
    }, [isConnected])

    return null
}
