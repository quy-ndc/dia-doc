import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";

export const useAppState = () => {
    const appState = useRef(AppState.currentState);
    const [isBackground, setIsBackground] = useState(appState.current !== 'active')

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            const isNowBackground = nextAppState !== 'active'

            if (isNowBackground !== isBackground) {
                setIsBackground(isNowBackground)
            }
            appState.current = nextAppState;
        })

        return () => {
            subscription.remove();
        }
    }, [isBackground])

    return isBackground
}