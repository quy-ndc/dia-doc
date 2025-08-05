import { create } from 'zustand'
import { HubConnection } from '@microsoft/signalr'
import { connectToSignalR } from '../util/video-calling/connect-signal-r'
import { ConsultationVideoCall } from '../assets/enum/consulation-video-call'
import { RTCIceCandidate, RTCSessionDescription } from 'react-native-webrtc'

interface CallState {
    incomingCall: {
        fromUserId: string
        offer: RTCSessionDescriptionInit
    } | null
    isInCall: boolean
    currentCallData: {
        userId: string
        targetUserId: string
    } | null
    onRemoteDescription?: (description: RTCSessionDescription) => void
    onIceCandidate?: (candidate: RTCIceCandidate) => void
}

interface VideoCallStore extends CallState {
    connection: HubConnection | null
    initialize: () => Promise<void>
    cleanup: () => void
    setIncomingCall: (fromUserId: string, offer: RTCSessionDescriptionInit) => void
    clearIncomingCall: () => void
    acceptCall: (targetUserId: string, answer: RTCSessionDescriptionInit) => Promise<void>
    declineCall: (targetUserId: string) => Promise<void>
    startCall: (targetUserId: string, offer: RTCSessionDescriptionInit) => Promise<void>
    sendIceCandidate: (targetUserId: string, candidate: any) => Promise<void>
    setIsInCall: (isInCall: boolean) => void
    setCurrentCallData: (data: { userId: string; targetUserId: string } | null) => void
    setCallbacks: (callbacks: { 
        onRemoteDescription?: (description: RTCSessionDescription) => void
        onIceCandidate?: (candidate: RTCIceCandidate) => void 
    }) => void
}

const useVideoCallStore = create<VideoCallStore>((set, get) => ({
    connection: null,
    incomingCall: null,
    isInCall: false,
    currentCallData: null,
    onRemoteDescription: undefined,
    onIceCandidate: undefined,

    initialize: async () => {
        try {
            console.log('🔄 Initializing SignalR connection...')
            const connection = await connectToSignalR()
            
            connection.on(ConsultationVideoCall.CALL_USER_RECEIVE, (fromUserId: string, offer: any) => {
                console.log('📞 [CALL_USER_RECEIVE]', {
                    fromUserId,
                    offer: {
                        type: offer.type,
                        sdp: offer.sdp?.substring(0, 100) + '...' // Log first 100 chars of SDP
                    }
                })
                if (!get().isInCall) {
                    set({ incomingCall: { fromUserId, offer } })
                    console.log('📱 Incoming call set in store')
                } else {
                    console.log('❌ Rejected incoming call - already in call')
                }
            })

            connection.on(ConsultationVideoCall.ACCEPT_CALL_RECEIVE, (userId: string, answer: any) => {
                console.log('✅ [ACCEPT_CALL_RECEIVE]', {
                    userId,
                    answer: {
                        type: answer.type,
                        sdp: answer.sdp?.substring(0, 100) + '...'
                    }
                })
                const { onRemoteDescription } = get()
                if (onRemoteDescription) {
                    console.log('🔄 Setting remote description from accept call')
                    onRemoteDescription(new RTCSessionDescription(answer))
                } else {
                    console.warn('⚠️ No remote description callback set')
                }
            })

            connection.on(ConsultationVideoCall.SEND_ICE_RECEIVE, (response: any) => {
                console.log('❄️ [SEND_ICE_RECEIVE]', {
                    candidate: response.candidate?.substring(0, 50) + '...',
                    sdpMid: response.sdpMid,
                    sdpMLineIndex: response.sdpMLineIndex
                })
                const { onIceCandidate } = get()
                if (onIceCandidate) {
                    console.log('🔄 Adding received ICE candidate')
                    onIceCandidate(new RTCIceCandidate(response))
                } else {
                    console.warn('⚠️ No ICE candidate callback set')
                }
            })

            connection.on(ConsultationVideoCall.DECLINE_CALL_RECEIVE, () => {
                console.log('❌ [DECLINE_CALL_RECEIVE] Call declined')
                set({ isInCall: false, currentCallData: null })
            })

            console.log('✅ SignalR connection initialized')
            set({ connection })
        } catch (error) {
            console.error('❌ Failed to initialize SignalR:', error)
        }
    },

    cleanup: () => {
        console.log('🧹 Cleaning up video call store')
        const { connection } = get()
        if (connection) {
            connection.stop()
            console.log('🛑 SignalR connection stopped')
            set({ 
                connection: null, 
                incomingCall: null, 
                isInCall: false, 
                currentCallData: null,
                onRemoteDescription: undefined,
                onIceCandidate: undefined
            })
        }
    },

    setIncomingCall: (fromUserId, offer) => {
        console.log('📞 Setting incoming call', { fromUserId })
        set({ incomingCall: { fromUserId, offer } })
    },

    clearIncomingCall: () => {
        console.log('🧹 Clearing incoming call')
        set({ incomingCall: null })
    },

    acceptCall: async (targetUserId, answer) => {
        console.log('✅ Accepting call', { targetUserId })
        const { connection } = get()
        if (connection) {
            try {
                await connection.invoke(ConsultationVideoCall.ACCEPT_CALL_INVOKE, targetUserId, answer)
                console.log('✅ Accept call invoked successfully')
                set({ 
                    isInCall: true,
                    currentCallData: { userId: connection.connectionId!, targetUserId },
                    incomingCall: null 
                })
            } catch (error) {
                console.error('❌ Failed to accept call:', error)
            }
        } else {
            console.error('❌ No SignalR connection available')
        }
    },

    declineCall: async (targetUserId) => {
        console.log('❌ Declining call', { targetUserId })
        const { connection } = get()
        if (connection) {
            try {
                await connection.invoke(ConsultationVideoCall.DECLINE_CALL_INVOKE, targetUserId)
                console.log('✅ Decline call invoked successfully')
                set({ incomingCall: null })
            } catch (error) {
                console.error('❌ Failed to decline call:', error)
            }
        } else {
            console.error('❌ No SignalR connection available')
        }
    },

    startCall: async (targetUserId, offer) => {
        console.log('📞 Starting call', { targetUserId })
        const { connection } = get()
        if (connection) {
            try {
                await connection.invoke(ConsultationVideoCall.CALL_USER_INVOKE, targetUserId, offer)
                console.log('✅ Start call invoked successfully')
                set({ 
                    isInCall: true,
                    currentCallData: { userId: connection.connectionId!, targetUserId }
                })
            } catch (error) {
                console.error('❌ Failed to start call:', error)
            }
        } else {
            console.error('❌ No SignalR connection available')
        }
    },

    sendIceCandidate: async (targetUserId, candidate) => {
        console.log('❄️ Sending ICE candidate', {
            targetUserId,
            candidate: {
                candidate: candidate.candidate?.substring(0, 50) + '...',
                sdpMid: candidate.sdpMid,
                sdpMLineIndex: candidate.sdpMLineIndex
            }
        })
        const { connection } = get()
        if (connection) {
            try {
                await connection.invoke(ConsultationVideoCall.SEND_ICE_INVOKE, targetUserId, candidate)
                console.log('✅ ICE candidate sent successfully')
            } catch (error) {
                console.error('❌ Failed to send ICE candidate:', error)
            }
        } else {
            console.error('❌ No SignalR connection available')
        }
    },

    setIsInCall: (isInCall) => {
        console.log('🔄 Setting call state:', isInCall)
        set({ isInCall })
    },

    setCurrentCallData: (data) => {
        console.log('🔄 Setting current call data:', data)
        set({ currentCallData: data })
    },

    setCallbacks: (callbacks) => {
        console.log('🔄 Setting WebRTC callbacks')
        set(callbacks)
    }
}))

export default useVideoCallStore 