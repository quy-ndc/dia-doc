import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, Button, Text, StyleSheet, ScrollView, Dimensions, Modal } from 'react-native'
import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    mediaDevices,
} from 'react-native-webrtc'
import { ConsultationVideoCall } from '../../assets/enum/consulation-video-call'
import useVideoCallStore from '../../store/videoCallStore'
import { useLocalSearchParams } from 'expo-router'
import IconButton from '../../components/common/icon-button'
import { Mic } from '../../lib/icons/Mic'
import { MicOff } from '../../lib/icons/MicOff'
import { SwitchCamera } from '../../lib/icons/SwitchCamera'
import { PhoneOff } from '../../lib/icons/PhoneOff'
import { GlobalColor } from '../../global-color'

const { width, height } = Dimensions.get('window')

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

export default function VideoCallScreen() {
    const params = useLocalSearchParams<{
        userId: string
        targetUserId: string
        mode?: 'answer' | 'call'
        offer?: string
    }>()

    const {
        connection,
        peerConnection,
        localStream,
        remoteStream,
        callDuration,
        isInCall,
        acceptCall,
        sendIceCandidate,
        startCall,
        setCallbacks,
        setLocalStream,
        setRemoteStream,
        createPeerConnection,
        addLocalStreamToPeer,
        updateCallDuration,
        cleanupCall
    } = useVideoCallStore()

    const [isMuted, setIsMuted] = useState(false)
    const [cameraCount, setCameraCount] = useState(1)
    const isFrontCam = useRef(true)

    const getLocalStream = async () => {
        try {
            console.log('📱 Getting local media stream...')
            const stream = await mediaDevices.getUserMedia({
                audio: true,
                video: { facingMode: 'user', frameRate: 30 },
            })
            console.log('✅ Local stream obtained:', {
                audioTracks: stream.getAudioTracks().length,
                videoTracks: stream.getVideoTracks().length
            })

            const devices = await mediaDevices.enumerateDevices()
            const videoDevices = (devices as MediaDeviceInfo[]).filter((d) => d.kind === 'videoinput')
            setCameraCount(videoDevices.length)
            setLocalStream(stream)

            addLocalStreamToPeer(stream)
        } catch (err) {
            console.error('❌ Failed to get media stream:', err)
        }
    }

    const handleIncomingCall = async () => {
        if (!params.offer || !params.targetUserId) {
            console.error('❌ Missing offer or targetUserId for incoming call')
            return
        }
        console.log('📞 Handling incoming call from:', params.targetUserId)

        try {
            const pc = createPeerConnection()

            await getLocalStream()

            const offer = JSON.parse(params.offer)
            console.log('📝 Setting remote description from offer')
            await pc.setRemoteDescription(new RTCSessionDescription(offer))
            console.log('📝 Creating answer')
            const answer = await pc.createAnswer()
            if (answer) {
                console.log('📝 Setting local description (answer)')
                await pc.setLocalDescription(answer)
                console.log('📞 Accepting call with answer')
                await acceptCall(params.targetUserId, answer)
            }
        } catch (error) {
            console.error('❌ Error handling incoming call:', error)
        }
    }

    const initiateCall = async () => {
        if (!params.targetUserId) {
            console.error('❌ Missing targetUserId for outgoing call')
            return
        }
        console.log('📞 Initiating call to:', params.targetUserId)

        try {
            const pc = createPeerConnection()

            await getLocalStream()

            console.log('📝 Creating offer')
            const offer = await pc.createOffer(sessionConstraints)
            if (offer) {
                console.log('📝 Setting local description (offer)')
                await pc.setLocalDescription(offer)
                console.log('📞 Starting call with offer')
                await startCall(params.targetUserId, offer)
            }
        } catch (error) {
            console.error('❌ Error initiating call:', error)
        }
    }

    useEffect(() => {
        console.log('Stream state changed:', {
            hasLocalStream: !!localStream,
            hasRemoteStream: !!remoteStream,
            localStreamTracks: localStream?.getTracks().length || 0,
            remoteStreamTracks: remoteStream?.getTracks().length || 0,
        })
    }, [localStream, remoteStream])

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null

        if (isInCall) {
            interval = setInterval(() => {
                updateCallDuration(callDuration + 1)
            }, 1000)
        }

        return () => {
            if (interval) {
                clearInterval(interval)
            }
        }
    }, [isInCall, callDuration])

    useEffect(() => {
        console.log('🔄 VideoCallScreen mounted:', {
            mode: params.mode,
            hasOffer: !!params.offer
        })

        // Initialize the store first
        const initializeStore = async () => {
            const { initialize, setCallbacks } = useVideoCallStore.getState()
            await initialize()

            // Set up callbacks for remote description and ICE candidates
            setCallbacks({
                onRemoteDescription: (description) => {
                    console.log('📝 Setting remote description:', {
                        type: description.type,
                        sdp: description.sdp.substring(0, 100) + '...'
                    })
                    const { peerConnection } = useVideoCallStore.getState()
                    if (peerConnection) {
                        peerConnection.setRemoteDescription(description).catch(err => {
                            console.error('❌ Failed to set remote description:', err)
                        })
                    }
                },
                onIceCandidate: (candidate) => {
                    console.log('❄️ Adding received ICE candidate:', {
                        sdpMid: candidate.sdpMid,
                        sdpMLineIndex: candidate.sdpMLineIndex,
                        candidate: candidate.candidate.substring(0, 50) + '...'
                    })
                    const { peerConnection } = useVideoCallStore.getState()
                    if (peerConnection) {
                        peerConnection.addIceCandidate(candidate).catch(err => {
                            console.error('❌ Failed to add ICE candidate:', err)
                        })
                    }
                }
            })
        }

        initializeStore().then(() => {
            if (params.mode === 'answer' && params.offer) {
                handleIncomingCall()
            } else {
                initiateCall()
            }
        })

        return () => {
            console.log('🧹 Cleaning up VideoCallScreen')
            cleanupCall()
        }
    }, [])

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

    const hasLocalVideo = !!localStream && localStream.getTracks().length > 0
    const hasRemoteVideo = !!remoteStream && remoteStream.getTracks().length > 0

    return (
        <View className='flex-1 bg-black'>
            {hasLocalVideo && localStream && (
                <RTCView
                    streamURL={localStream.toURL()}
                    style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    objectFit="cover"
                    mirror={true}
                />
            )}

            {hasRemoteVideo && remoteStream && (
                <View style={styles.remoteContainer}>
                    <RTCView
                        streamURL={remoteStream.toURL()}
                        style={{ height: '100%', width: '100%' }}
                        objectFit="cover"
                        mirror={false}
                    />
                </View>
            )}

            <View style={styles.timerContainer}>
                <Text style={styles.timerText}>
                    {callDuration > 0 && (
                        `${Math.floor(callDuration / 60)}:${(callDuration % 60).toString().padStart(2, '0')}`
                    )}
                </Text>
            </View>

            <View
                style={{ position: 'absolute', left: 0, right: 0, bottom: 24 }}
                className='flex-row items-center gap-5 justify-center'
            >
                <IconButton
                    icon={isMuted ? <Mic className='text-white' size={20} /> : <MicOff className='text-white' size={20} />}
                    buttonSize={3}
                    possition={'camera'}
                    onPress={toggleMic}
                />
                <IconButton
                    icon={<SwitchCamera className='text-white' size={20} />}
                    buttonSize={3}
                    possition={'camera'}
                    onPress={switchCamera}
                />
                <IconButton
                    icon={<PhoneOff color={GlobalColor.RED_NEON_BORDER} size={20} />}
                    buttonSize={3}
                    possition={'camera'}
                    onPress={cleanupCall}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    remoteContainer: {
        position: 'absolute',
        top: 16,
        right: 16,
        width: 120,
        height: 160,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: 'black',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
    },
    timerContainer: {
        position: 'absolute',
        top: 16,
        left: 16,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 8,
        borderRadius: 4,
    },
    timerText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    }
})
