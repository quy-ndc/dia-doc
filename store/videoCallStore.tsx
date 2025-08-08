import { create } from 'zustand'
import { HubConnection } from '@microsoft/signalr'
import { connectToSignalR } from '../util/video-calling/connect-signal-r'
import { ConsultationVideoCall } from '../assets/enum/consulation-video-call'
import { RTCIceCandidate, RTCSessionDescription, RTCPeerConnection, MediaStream } from 'react-native-webrtc'

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
    localStream: MediaStream | null
    remoteStream: MediaStream | null
    callDuration: number
    lastActivity: number
    pendingLocalIce: RTCIceCandidateInit[]
    pendingRemoteIce: RTCIceCandidateInit[]
    remoteDescriptionSet: boolean
    onRemoteDescription?: (description: RTCSessionDescription) => void
    onIceCandidate?: (candidate: RTCIceCandidate) => void
}

interface VideoCallStore extends CallState {
    connection: HubConnection | null
    peerConnection: RTCPeerConnection | null
    initialize: () => Promise<void>
    cleanupCall: () => void
    createPeerConnection: () => RTCPeerConnection
    addLocalStreamToPeer: (stream: MediaStream) => void
    setIncomingCall: (fromUserId: string, offer: RTCSessionDescriptionInit) => void
    clearIncomingCall: () => void
    acceptCall: (targetUserId: string, answer: RTCSessionDescriptionInit) => Promise<void>
    declineCall: (targetUserId: string) => Promise<void>
    startCall: (targetUserId: string, offer: RTCSessionDescriptionInit) => Promise<void>
    sendIceCandidate: (targetUserId: string, candidate: any) => Promise<void>
    setIsInCall: (isInCall: boolean) => void
    setCurrentCallData: (data: { userId: string; targetUserId: string } | null) => void
    setLocalStream: (stream: MediaStream | null) => void
    setRemoteStream: (stream: MediaStream | null) => void
    updateCallDuration: (duration: number) => void
    setRemoteDescriptionSet: (isSet: boolean) => void
    flushPendingLocalIce: () => void
    flushPendingRemoteIce: () => void
    setCallbacks: (callbacks: {
        onRemoteDescription?: (description: RTCSessionDescription) => void
        onIceCandidate?: (candidate: RTCIceCandidate) => void
    }) => void
}

const useVideoCallStore = create<VideoCallStore>((set, get) => ({
    connection: null,
    peerConnection: null,
    incomingCall: null,
    isInCall: false,
    currentCallData: null,
    localStream: null,
    remoteStream: null,
    callDuration: 0,
    lastActivity: 0,
    pendingLocalIce: [],
    pendingRemoteIce: [],
    remoteDescriptionSet: false,
    onRemoteDescription: undefined,
    onIceCandidate: undefined,

    initialize: async () => {
        try {
            const connection = await connectToSignalR()

            connection.on(ConsultationVideoCall.CALL_USER_RECEIVE, (fromUserId: string, offer: any) => {
                if (!get().isInCall) {
                    set({ incomingCall: { fromUserId, offer } })
                }
            })

            connection.on(ConsultationVideoCall.ACCEPT_CALL_RECEIVE, (userId: string, answer: any) => {
                set({ remoteDescriptionSet: true })
                const { onRemoteDescription } = get()
                onRemoteDescription?.(new RTCSessionDescription(answer))
            })

            connection.on(ConsultationVideoCall.SEND_ICE_RECEIVE, (response: any) => {
                const { onIceCandidate, remoteDescriptionSet } = get()
                if (remoteDescriptionSet) {
                    onIceCandidate?.(new RTCIceCandidate(response))
                } else {
                    set(state => ({ pendingRemoteIce: [...state.pendingRemoteIce, response] }))
                }
            })

            connection.on(ConsultationVideoCall.DECLINE_CALL_RECEIVE, () => {
                set({ isInCall: false, currentCallData: null })
            })

            set({ connection })
        } catch (error) {
            console.error('Failed to initialize SignalR:', error)
        }
    },

    cleanupCall: () => {
        const { peerConnection, localStream, remoteStream } = get()

        if (localStream) {
            localStream.getTracks().forEach(track => track.stop())
        }
        if (remoteStream) {
            remoteStream.getTracks().forEach(track => track.stop())
        }
        if (peerConnection) {
            peerConnection.close()
        }

        set({
            peerConnection: null,
            incomingCall: null,
            isInCall: false,
            currentCallData: null,
            localStream: null,
            remoteStream: null,
            callDuration: 0,
            pendingLocalIce: [],
            pendingRemoteIce: [],
            remoteDescriptionSet: false,
            onRemoteDescription: undefined,
            onIceCandidate: undefined
        })
    },

    createPeerConnection: () => {
        console.log('🔄 Creating new peer connection')

        const currentState = get()
        if (currentState.peerConnection) {
            currentState.peerConnection.close()
        }

        const pc = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' },
                { urls: 'stun:stun2.l.google.com:19302' },
                { urls: 'stun:stun3.l.google.com:19302' },
                { urls: 'stun:stun4.l.google.com:19302' },
                {
                    urls: [
                        'turn:openrelay.metered.ca:80',
                        'turn:openrelay.metered.ca:443',
                        'turn:openrelay.metered.ca:443?transport=tcp'
                    ],
                    username: 'openrelayproject',
                    credential: 'openrelayproject'
                },
                {
                    urls: [
                        'turn:global.turn.twilio.com:3478?transport=udp',
                        'turn:global.turn.twilio.com:3478?transport=tcp',
                        'turn:global.turn.twilio.com:443?transport=tcp'
                    ],
                    username: 'openrelayproject',
                    credential: 'openrelayproject'
                }
            ],
            iceCandidatePoolSize: 10,
        })

        pc.addEventListener('icecandidate', (event) => {
            if (!event.candidate) {
                return
            }
            const cand = event.candidate
            console.log('❄️ ICE Candidate generated:', {
                sdpMid: cand.sdpMid,
                sdpMLineIndex: cand.sdpMLineIndex,
                candidate: (cand.candidate ? cand.candidate.substring(0, 50) : '') + '...'
            })
            const s = get()
            if (s.currentCallData?.targetUserId) {
                get().sendIceCandidate(s.currentCallData.targetUserId, cand)
            } else {
                console.log('🕒 Queuing local ICE until targetUserId is set')
                set(state => ({ pendingLocalIce: [...state.pendingLocalIce, cand.toJSON()] }))
            }
        })

        pc.addEventListener('track', (event) => {
            if (!event.track) return
            if (event.streams && event.streams.length > 0) {
                set({ remoteStream: event.streams[0] })
            } else {
                const newStream = new MediaStream()
                newStream.addTrack(event.track)
                set({ remoteStream: newStream })
            }
        })

        set({ peerConnection: pc })
        return pc
    },

    addLocalStreamToPeer: (stream) => {
        const { peerConnection } = get()
        if (peerConnection) {
            stream.getTracks().forEach(track => {
                peerConnection.addTrack(track, stream)
            })
        }
    },

    setIncomingCall: (fromUserId, offer) => {
        set({ incomingCall: { fromUserId, offer } })
    },

    clearIncomingCall: () => {
        set({ incomingCall: null })
    },

    acceptCall: async (targetUserId, answer) => {
        const { connection } = get()
        if (connection) {
            await connection.invoke(ConsultationVideoCall.ACCEPT_CALL_INVOKE, targetUserId, answer)
            set({
                isInCall: true,
                currentCallData: { userId: connection.connectionId!, targetUserId },
                incomingCall: null
            })
            get().flushPendingLocalIce()
        }
    },

    declineCall: async (targetUserId) => {
        const { connection } = get()
        if (connection) {
            await connection.invoke(ConsultationVideoCall.DECLINE_CALL_INVOKE, targetUserId)
            set({ incomingCall: null })
        }
    },

    startCall: async (targetUserId, offer) => {
        const { connection } = get()
        if (connection) {
            await connection.invoke(ConsultationVideoCall.CALL_USER_INVOKE, targetUserId, offer)
            set({
                isInCall: true,
                currentCallData: { userId: connection.connectionId!, targetUserId }
            })
            get().flushPendingLocalIce()
        }
    },

    sendIceCandidate: async (targetUserId, candidate) => {
        const { connection } = get()
        if (connection) {
            await connection.invoke(ConsultationVideoCall.SEND_ICE_INVOKE, targetUserId, candidate)
        }
    },

    setIsInCall: (isInCall) => {
        set({ isInCall })
    },

    setCurrentCallData: (data) => {
        set({ currentCallData: data })
        if (data) {
            get().flushPendingLocalIce()
        }
    },

    setLocalStream: (stream) => {
        set({ localStream: stream })
    },

    setRemoteStream: (stream) => {
        set({ remoteStream: stream })
    },

    updateCallDuration: (duration) => {
        set({ callDuration: duration })
    },

    setRemoteDescriptionSet: (isSet) => {
        set({ remoteDescriptionSet: isSet })
        if (isSet) {
            get().flushPendingRemoteIce()
        }
    },

    flushPendingLocalIce: () => {
        const s = get()
        if (!s.currentCallData?.targetUserId || s.pendingLocalIce.length === 0) return
        const target = s.currentCallData.targetUserId
        const toSend = [...s.pendingLocalIce]
        set({ pendingLocalIce: [] })
        toSend.forEach(c => {
            get().sendIceCandidate(target, c)
        })
    },

    flushPendingRemoteIce: () => {
        const s = get()
        if (!s.remoteDescriptionSet || s.pendingRemoteIce.length === 0) return
        const pc = s.peerConnection
        const toAdd = [...s.pendingRemoteIce]
        set({ pendingRemoteIce: [] })
        if (pc) {
            toAdd.forEach(c => {
                pc.addIceCandidate(new RTCIceCandidate(c as any))
            })
        }
    },

    setCallbacks: (callbacks) => {
        set(callbacks)
    },

}))

export default useVideoCallStore 