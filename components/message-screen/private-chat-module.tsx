import { HubConnection } from '@microsoft/signalr'
import React, { useEffect, useRef, useState } from 'react'
import {
    View,
    Button,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native'
import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    mediaDevices,
} from 'react-native-webrtc'
import { connectToSignalR } from '../../util/video-calling/connect-signal-r'
import { ConsultationVideoCall } from '../../assets/enum/consulation-video-call'

interface Props {
    userId: string
    targetUserId: string
}

export default function PrivateChatModule({ userId, targetUserId }: Props) {

    const [connection, setConnection] = useState<HubConnection | null>(null)
    const [localStream, setLocalStream] = useState<MediaStream | null>(null)
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
    const [isMuted, setIsMuted] = useState(false)
    const [cameraCount, setCameraCount] = useState(1)
    const [incomingCall, setIncomingCall] = useState<any>(null)

    const peerConnection = useRef<RTCPeerConnection | null>(null)
    const isFrontCam = useRef(true)

    const peerConfig = {
        iceServers: [{ urls: ConsultationVideoCall.ICE_SERVER }],
    }

    const sessionConstraints = {
        mandatory: {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true,
            VoiceActivityDetection: true,
        },
    }

    useEffect(() => {
        const setupConnection = async () => {
            const res = await connectToSignalR()
            if (res) {
                res.serverTimeoutInMilliseconds = 1000 * 60000
                res.keepAliveIntervalInMilliseconds = 1000 * 10
                setConnection(res)

                res.on(ConsultationVideoCall.CALL_USER_RECEIVE, (userId: string, offer: any) => {
                    console.log('[CALL_USER_RECEIVE]', offer)
                    setIncomingCall(offer)
                })

                res.on(ConsultationVideoCall.ACCEPT_CALL_RECEIVE, (userId: string, answer: any) => {
                    console.log('[ACCEPT_CALL_RECEIVE]', answer)
                    try {
                        peerConnection.current?.setRemoteDescription(new RTCSessionDescription(answer.sdp))
                    } catch (e) {
                        console.error('Failed to set remote description:', e)
                    }
                })

                res.on(ConsultationVideoCall.SEND_ICE_RECEIVE, (response: any) => {
                    console.log('[SEND_ICE_RECEIVE]', response)
                    try {
                        const candidate = new RTCIceCandidate(response)
                        peerConnection.current?.addIceCandidate(candidate)
                    } catch (err) {
                        console.error('Failed to add ICE candidate:', err)
                    }
                })
            }
        }

        if (!connection) setupConnection()

        return () => {
            if (connection) connection.stop()
        }
    }, [connection])

    const getLocalStream = async () => {
        try {
            const stream = await mediaDevices.getUserMedia({
                audio: true,
                video: { facingMode: 'user', frameRate: 30 },
            })

            const devices = await mediaDevices.enumerateDevices()
            const videoDevices = (devices as MediaDeviceInfo[]).filter((d) => d.kind === 'videoinput')
            setCameraCount(videoDevices.length)
            setLocalStream(stream)

            if (peerConnection.current) {
                stream.getTracks().forEach((track) => {
                    peerConnection.current?.addTrack(track, stream)
                })
            }
        } catch (err) {
            console.error('Failed to get media stream:', err)
        }
    }

    const createPeer = () => {
        const pc = new RTCPeerConnection(peerConfig)

        pc.addEventListener('icecandidate', (event) => {
            if (event.candidate && connection) {
                console.log('[ICE] Candidate generated:', event.candidate)
                connection.invoke(ConsultationVideoCall.SEND_ICE_INVOKE,
                    targetUserId,
                    event.candidate,
                )
            }
        })

        pc.addEventListener(ConsultationVideoCall.TRACK_EVENT, (event) => {
            const incomingStream = event.streams?.[0]
            if (incomingStream) {
                console.log('Received remote stream via event.streams')
                setRemoteStream(incomingStream)
            } else {
                const newStream = new MediaStream()
                newStream.addTrack(event.track as MediaStreamTrack)
                console.log('Received remote stream via fallback')
                setRemoteStream(newStream)
            }
        })

        peerConnection.current = pc
    }

    const startCall = async () => {
        if (!connection) return
        createPeer()
        await getLocalStream()
        const offer = await peerConnection.current?.createOffer(sessionConstraints)
        if (offer) {
            await peerConnection.current?.setLocalDescription(offer)
            connection.invoke(ConsultationVideoCall.CALL_USER_INVOKE,
                targetUserId,
                offer,
            )
        }
    }

    console.log('imcoming call', incomingCall)

    const acceptCall = async () => {
        console.log('before send')
        if (!connection || !incomingCall) return
        console.log('after send')

        createPeer()
        await getLocalStream()

        try {
            await peerConnection.current?.setRemoteDescription(new RTCSessionDescription(incomingCall))
        } catch (e) {
            console.error('[ERROR setting remote description]', e)
            return
        }

        const answer = await peerConnection.current?.createAnswer()
        await peerConnection.current?.setLocalDescription(answer!)

        try {
            console.log('INVOKING ACCEPT CALL')
            connection.invoke(ConsultationVideoCall.ACCEPT_CALL_INVOKE, targetUserId, answer)
        } catch (e) {
            console.error('[ERROR INVOKING ACCEPT CALL]', e)
        }

        setIncomingCall(null)
    }


    const toggleMic = () => {
        const audioTrack = localStream?.getAudioTracks()[0]
        if (audioTrack) {
            audioTrack.enabled = !audioTrack.enabled
            setIsMuted(!audioTrack.enabled)
        }
    }

    const switchCamera = async () => {
        if (cameraCount < 2 || !localStream) return
        const videoTrack = localStream.getVideoTracks()[0] as MediaStreamTrack & {
            _switchCamera?: () => void
        }
        try {
            videoTrack._switchCamera?.()
            isFrontCam.current = !isFrontCam.current
        } catch (err) {
            console.warn('Switch camera failed:', err)
        }
    }

    useEffect(() => {
        // getLocalStream()
        return () => {
            peerConnection.current?.close()
        }
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.section}>
                <Text style={styles.title}>Caller Area</Text>
                {localStream && (
                    <RTCView
                        streamURL={localStream.toURL()}
                        style={styles.video}
                        objectFit="cover"
                        mirror={true}
                    />
                )}
                <Button title="Start Call" onPress={startCall} />
            </View>
            <View style={styles.section}>
                <Text style={styles.title}>Callee Area</Text>
                {incomingCall && <Button title="Accept Call" onPress={acceptCall} />}
                {remoteStream && (
                    <RTCView
                        streamURL={remoteStream.toURL()}
                        style={styles.video}
                        objectFit="cover"
                        mirror={false}
                    />
                )}
            </View>
            <Button title={isMuted ? 'Unmute Mic' : 'Mute Mic'} onPress={toggleMic} />
            <Button title="Switch Camera" onPress={switchCamera} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        alignItems: 'center',
    },
    video: {
        width: '100%',
        height: 220,
        backgroundColor: 'black',
        marginVertical: 8,
    },
    section: {
        width: '100%',
        marginBottom: 16,
        padding: 12,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
})
