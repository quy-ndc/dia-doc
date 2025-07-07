import { AppState, AppStateStatus } from 'react-native'
import { useEffect, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { invalidateQuery } from '../invalidate-queries'


export function useAppRefetchOnFocus() {
    const queryClient = useQueryClient()
    const appState = useRef(AppState.currentState)

    useEffect(() => {
        const handleAppStateChange = (nextAppState: string) => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                invalidateQuery(queryClient)
            }

            appState.current = nextAppState as AppStateStatus
        }

        const subscription = AppState.addEventListener('change', handleAppStateChange)
        return () => subscription.remove()
    }, [])
}
