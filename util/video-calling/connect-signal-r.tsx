import {
    HubConnection,
    HubConnectionBuilder,
    HubConnectionState,
    LogLevel,
} from '@microsoft/signalr'
import { ConsultationVideoCall } from '../../assets/enum/consulation-video-call'
import useUserStore from '../../store/userStore'

let connection: HubConnection

export const getSignalRConnection = () => connection

const getToken = () => {
    return useUserStore.getState().user.accessToken
}

export const connectToSignalR = async () => {
    connection = new HubConnectionBuilder()
        .withUrl(ConsultationVideoCall.SIGNALR_SERVER, {
            withCredentials: false,
            accessTokenFactory: () => `${getToken()}`,
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build()

    connection.on(ConsultationVideoCall.CALL_USER_RECEIVE, (response: any) => {
        console.log('[CALL_USER_RECEIVE]', response)
    })

    connection.on(ConsultationVideoCall.ACCEPT_CALL_RECEIVE, (response: any) => {
        console.log('[ACCEPT_CALL_RECEIVE]', response)
    })

    connection.on(ConsultationVideoCall.DECLINE_CALL_RECEIVE, (response: any) => {
        console.log('[DECLINE_CALL_RECEIVE]', response)
    })

    connection.on(ConsultationVideoCall.SEND_ICE_RECEIVE, (response: any) => {
        console.log('[SEND_ICE_RECEIVE]', response)
    })

    try {
        await connection.start()
        console.log('✅ SignalR connected')
    } catch (err) {
        console.error('❌ Error connecting to SignalR:', err)
    }

    return connection
}

const ensureConnection = async () => {
    if (!connection) {
        await connectToSignalR()
        return
    }

    if (connection.state === HubConnectionState.Disconnected) {
        try {
            await connection.start()
            console.log('🔄 SignalR manually reconnected')
        } catch (error) {
            console.error('⚠️ Manual reconnect failed', error)
        }
    }
}

export const callUser = async (toUserId: string, offer: any) => {
    await ensureConnection()
    if (connection.state === HubConnectionState.Connected) {
        await connection.invoke(ConsultationVideoCall.CALL_USER_INVOKE, toUserId, offer)
    } else {
        console.warn("⚠️ Can't call user: SignalR not connected")
    }
}

export const acceptCall = async (toUserId: string, answer: any) => {
    await ensureConnection()
    if (connection.state === HubConnectionState.Connected) {
        await connection.invoke(ConsultationVideoCall.ACCEPT_CALL_INVOKE, toUserId, answer)
    } else {
        console.warn("⚠️ Can't accept call: SignalR not connected")
    }
}

export const declineCall = async (toUserId: string) => {
    await ensureConnection()
    if (connection.state === HubConnectionState.Connected) {
        await connection.invoke(ConsultationVideoCall.DECLINE_CALL_INVOKE, toUserId)
    } else {
        console.warn("⚠️ Can't decline call: SignalR not connected")
    }
}

export const sendIceCandidate = async (toUserId: string, candidate: any) => {
    await ensureConnection()
    if (connection.state === HubConnectionState.Connected) {
        await connection.invoke(ConsultationVideoCall.SEND_ICE_INVOKE, toUserId, candidate)
    } else {
        console.warn("⚠️ Can't send ICE candidate: SignalR not connected")
    }
}
