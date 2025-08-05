import React, { useEffect } from 'react'
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import useVideoCallStore from '../../store/videoCallStore'
import { router } from 'expo-router'
import useUserStore from '../../store/userStore'

export default function IncomingCallModal() {
    const { incomingCall, acceptCall, declineCall } = useVideoCallStore()
    const { user } = useUserStore()

    const handleAccept = async () => {
        if (incomingCall) {
            router.push({
                pathname: '/(protected)/video-call-screen',
                params: {
                    userId: user.id,
                    targetUserId: incomingCall.fromUserId,
                    mode: 'answer',
                    offer: JSON.stringify(incomingCall.offer)
                }
            })
        }
    }

    const handleDecline = async () => {
        if (incomingCall) {
            await declineCall(incomingCall.fromUserId)
        }
    }

    if (!incomingCall) return null

    return (
        <Modal
            visible={true}
            transparent
            animationType="slide"
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Incoming Call</Text>
                    <Text style={styles.subtitle}>From: {incomingCall.fromUserId}</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.acceptButton]}
                            onPress={handleAccept}
                        >
                            <Text style={styles.buttonText}>Accept</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.declineButton]}
                            onPress={handleDecline}
                        >
                            <Text style={styles.buttonText}>Decline</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    button: {
        padding: 15,
        borderRadius: 8,
        width: '45%',
        alignItems: 'center'
    },
    acceptButton: {
        backgroundColor: '#4CAF50'
    },
    declineButton: {
        backgroundColor: '#f44336'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
})
