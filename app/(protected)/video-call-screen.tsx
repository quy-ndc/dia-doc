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

    const { connection, acceptCall, sendIceCandidate, startCall, setCallbacks } = useVideoCallStore()
    const [localStream, setLocalStream] = useState<MediaStream | null>(null)
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
    const [isMuted, setIsMuted] = useState(false)
    const [cameraCount, setCameraCount] = useState(1)

    const peerConnection = useRef<RTCPeerConnection | null>(null)
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

            if (peerConnection.current) {
                console.log('🔄 Adding tracks to peer connection...')
                stream.getTracks().forEach((track) => {
                    console.log('➕ Adding track:', track.kind)
                    peerConnection.current?.addTrack(track, stream)
                })
            } else {
                console.warn('⚠️ No peer connection available when adding tracks')
            }
        } catch (err) {
            console.error('❌ Failed to get media stream:', err)
        }
    }

    const createPeer = () => {
        console.log('🔄 Creating peer connection...')
        const pc = new RTCPeerConnection(peerConfig)
        
        pc.addEventListener('connectionstatechange', () => {
            console.log('🔄 Connection state changed:', pc.connectionState)
        })

        pc.addEventListener('signalingstatechange', () => {
            console.log('🔄 Signaling state changed:', pc.signalingState)
        })

        pc.addEventListener('iceconnectionstatechange', () => {
            console.log('🔄 ICE connection state:', pc.iceConnectionState)
        })

        pc.addEventListener('icegatheringstatechange', () => {
            console.log('🔄 ICE gathering state:', pc.iceGatheringState)
        })
        
        pc.addEventListener('icecandidate', (event) => {
            if (event.candidate && connection && params.targetUserId) {
                console.log('❄️ ICE Candidate generated:', {
                    sdpMid: event.candidate.sdpMid,
                    sdpMLineIndex: event.candidate.sdpMLineIndex,
                    candidate: event.candidate.candidate.substring(0, 50) + '...'
                })
                sendIceCandidate(params.targetUserId, event.candidate)
            }
        })

        pc.addEventListener('track', (event) => {
            if (!event.track) {
                console.warn('⚠️ Received track event without track')
                return
            }

            console.log('📡 Track event received:', {
                kind: event.track.kind,
                enabled: event.track.enabled,
                streams: event.streams?.length || 0
            })
            
            const incomingStream = event.streams?.[0]
            if (incomingStream) {
                console.log('✅ Received remote stream via event.streams:', {
                    audioTracks: incomingStream.getAudioTracks().length,
                    videoTracks: incomingStream.getVideoTracks().length
                })
                setRemoteStream(incomingStream)
            } else {
                console.log('⚠️ No stream in track event, creating new stream')
                const newStream = new MediaStream()
                newStream.addTrack(event.track)
                console.log('✅ Created new stream with track:', {
                    kind: event.track.kind,
                    enabled: event.track.enabled
                })
                setRemoteStream(newStream)
            }
        })

        peerConnection.current = pc

        // Set up callbacks for remote description and ICE candidates
        setCallbacks({
            onRemoteDescription: (description) => {
                console.log('📝 Setting remote description:', {
                    type: description.type,
                    sdp: description.sdp.substring(0, 100) + '...'
                })
                pc.setRemoteDescription(description).catch(err => {
                    console.error('❌ Failed to set remote description:', err)
                })
            },
            onIceCandidate: (candidate) => {
                console.log('❄️ Adding received ICE candidate:', {
                    sdpMid: candidate.sdpMid,
                    sdpMLineIndex: candidate.sdpMLineIndex,
                    candidate: candidate.candidate.substring(0, 50) + '...'
                })
                pc.addIceCandidate(candidate).catch(err => {
                    console.error('❌ Failed to add ICE candidate:', err)
                })
            }
        })
    }

    const handleIncomingCall = async () => {
        if (!params.offer || !params.targetUserId) {
            console.error('❌ Missing offer or targetUserId for incoming call')
            return
        }
        console.log('📞 Handling incoming call from:', params.targetUserId)
        createPeer()
        await getLocalStream()
        const offer = JSON.parse(params.offer)
        console.log('📝 Setting remote description from offer')
        await peerConnection.current?.setRemoteDescription(new RTCSessionDescription(offer))
        console.log('📝 Creating answer')
        const answer = await peerConnection.current?.createAnswer()
        if (answer) {
            console.log('📝 Setting local description (answer)')
            await peerConnection.current?.setLocalDescription(answer)
            console.log('📞 Accepting call with answer')
            await acceptCall(params.targetUserId, answer)
        }
    }

    const initiateCall = async () => {
        if (!params.targetUserId) {
            console.error('❌ Missing targetUserId for outgoing call')
            return
        }
        console.log('📞 Initiating call to:', params.targetUserId)
        createPeer()
        await getLocalStream()
        console.log('📝 Creating offer')
        const offer = await peerConnection.current?.createOffer(sessionConstraints)
        if (offer) {
            console.log('📝 Setting local description (offer)')
            await peerConnection.current?.setLocalDescription(offer)
            console.log('📞 Starting call with offer')
            await startCall(params.targetUserId, offer)
        }
    }

    useEffect(() => {
        console.log('🔄 VideoCallScreen mounted:', {
            mode: params.mode,
            hasOffer: !!params.offer
        })
        
        if (params.mode === 'answer' && params.offer) {
            handleIncomingCall()
        } else {
            initiateCall()
        }

        return () => {
            console.log('🧹 Cleaning up VideoCallScreen')
            localStream?.getTracks().forEach(track => {
                console.log('🛑 Stopping local track:', track.kind)
                track.stop()
            })
            remoteStream?.getTracks().forEach(track => {
                console.log('🛑 Stopping remote track:', track.kind)
                track.stop()
            })
            if (peerConnection.current) {
                console.log('🛑 Closing peer connection')
                peerConnection.current.close()
            }
            setCallbacks({}) // Clear callbacks
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

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.title}>Local Stream</Text>
                {localStream && (
                    <RTCView
                        streamURL={localStream.toURL()}
                        style={styles.video}
                        objectFit="cover"
                        mirror={true}
                    />
                )}
            </View>
            <View style={styles.section}>
                <Text style={styles.title}>Remote Stream</Text>
                {remoteStream && (
                    <RTCView
                        streamURL={remoteStream.toURL()}
                        style={styles.video}
                        objectFit="cover"
                        mirror={false}
                    />
                )}
            </View>
            <View style={styles.controls}>
                <Button title={isMuted ? 'Unmute Mic' : 'Mute Mic'} onPress={toggleMic} />
                <Button title="Switch Camera" onPress={switchCamera} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        backgroundColor: '#f5f5f5',
    },
    video: {
        width: '100%',
        height: 220,
        backgroundColor: 'black',
        marginVertical: 8,
    },
    section: {
        flex: 1,
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    }
})

