import React, { useEffect, useRef } from "react"
import useUserStore from "../../store/userStore"
import { useRefreshTokenMutation } from "../../service/query/auth-query"

export function AuthorProvider({ children }: { children: React.ReactNode }) {
    const { user, setUser } = useUserStore()
    const { mutateAsync: refreshToken } = useRefreshTokenMutation()
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        setupTokenRotation()

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }
        }
    }, [user.refreshToken, user.expiresAt])

    const setupTokenRotation = () => {

        if (timerRef.current) {
            clearTimeout(timerRef.current)
            timerRef.current = null
        }

        if (!user.expiresAt || !user.refreshToken) {
            ("No token expiration or refresh token available")
            return
        }

        const expiresAt = new Date(user.expiresAt).getTime()
        const currentTime = new Date().getTime()
        const timeUntilExpiry = expiresAt - currentTime

        if (timeUntilExpiry <= 0) {
            console.log("Token expired, refreshing immediately")
            refreshAuthor()
            return
        }

        const refreshAfter = Math.max(timeUntilExpiry * 0.25, 0)

        timerRef.current = setTimeout(() => {
            refreshAuthor()
        }, refreshAfter)
    }

    const refreshAuthor = async () => {
        try {
            const data = await refreshToken(user.refreshToken)
            if (data.status === 200) {
                console.log("Token rotated successfully")
                setUser({
                    ...user,
                    refreshToken: data.data.data.authToken.refreshToken,
                    accessToken: data.data.data.authToken.accessToken,
                    expiresAt: data.data.data.authToken.expiresAt
                })
            } else {
                console.error("Failed to rotate token:", data.message)
            }
        } catch (error) {
            console.error("Error rotating token:", error)
        }
    }

    return <>{children}</>
}