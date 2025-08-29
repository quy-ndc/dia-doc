import { Redirect, Stack } from 'expo-router'
import useUserStore from '../../store/userStore'
import { Message, NotificationMessage } from '../../assets/types/chat/message'
import { useMessageStore } from '../../store/useMessage'
import { MessageType } from '../../assets/enum/message-type'
import { UserRole, UserRoleNumber } from '../../assets/enum/user-role'
import { PermissionsAndroid, Platform, Vibration, View } from 'react-native'
import { useSaveFcmTokenMutation } from '../../service/query/auth-query'
import useConfigStore from '../../store/appConfigStore'
import { useEffect } from 'react'
import { getApp } from '@react-native-firebase/app'
import notifee, { AndroidImportance } from '@notifee/react-native'
import messaging from '@react-native-firebase/messaging'
import IncomingCallModal from '../../components/common/incoming-call-modal'
import React from 'react'
import useVideoCallStore from '../../store/videoCallStore'
import { useAppState } from '../../util/hook/useAppState'
import { NotificatinType } from '../../assets/enum/notification'
import { usePrivateMessageStore } from '../../store/usePrivateMessage'
import { ConversationType } from '../../assets/enum/conversation-type'
import { NotificationConsultationEnd, NotificationConsultationStart } from '../../assets/types/notification/notification'

export default function ProtectedLayout() {
    const { user } = useUserStore()
    const { tokenDevice, setTokenDevice } = useConfigStore()
    const { addMessage, setLatestMessage } = useMessageStore()
    const { addMessage: addPrivateMessage, setLatestMessage: setLatestPrivateMessage, setGroupStatus, getGroupStatus } = usePrivateMessageStore()
    const { mutateAsync, data } = useSaveFcmTokenMutation()
    const { initialize, cleanupCall } = useVideoCallStore()
    const isBackground = useAppState()

    if (!user.isAuthenticated) {
        return <Redirect href="/landing-screen" />
    }

    if (user.isAuthenticated && !user.isSetUp) {
        if (user.role == UserRole.PATIENT) {
            return <Redirect href="/set-up-screen" />
        } else {
            return <Redirect href="/change-password-screen" />
        }
    }

    const saveTokenDevice = async (token: string) => {
        if (!tokenDevice) {
            await mutateAsync(token)
            if (data?.status == 200) {
                setTokenDevice(token)
            }
        }
    }

    const createNotificationChannels = async () => {
        await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
            importance: AndroidImportance.HIGH,
            sound: 'default',
            vibration: true,
        })

        await notifee.createChannel({
            id: 'foreground-noti',
            name: 'Foreground Notifications',
            importance: AndroidImportance.HIGH,
            sound: 'default',
            vibration: true,
        })
    }

    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission()
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL
        if (Platform.OS === 'android' && Platform.Version >= 33) {
            const result = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
            )
            if (result !== PermissionsAndroid.RESULTS.GRANTED) {
                console.log('User notification permissions denied')
                return false
            }
        }

        return true
    }

    async function getDeviceToken() {
        try {
            const token = await messaging().getToken()
            console.log('FCM Token:', token)
            return token
        } catch (error) {
            console.error('Error getting FCM token:', error)
            return null
        }
    }

    useEffect(() => {
        createNotificationChannels()

        const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
            if (!remoteMessage?.notification) return

            if (remoteMessage.data) {
                if (remoteMessage.data.type == NotificatinType.CONSULTATION.toString()) {
                    const incomingMessage = remoteMessage.data as unknown as NotificationConsultationStart | NotificationConsultationEnd
                    await notifee.displayNotification({
                        title: remoteMessage.notification.title || '',
                        body: remoteMessage.notification.body || '',
                        data: remoteMessage.data,
                        android: {
                            channelId: 'foreground-noti',
                            smallIcon: 'ic_launcher',
                            importance: AndroidImportance.HIGH,
                            pressAction: {
                                id: 'default',
                            },
                            sound: 'default',
                        },
                    })

                    if ('body' in incomingMessage && 'conversationId' in incomingMessage) {
                        setGroupStatus(incomingMessage.conversationId, true)
                    } else {
                        setGroupStatus(incomingMessage.conversationId, false)
                    }
                } else if (remoteMessage.data.type == NotificatinType.CONSULTATION.toString()) {
                    await notifee.displayNotification({
                        title: remoteMessage.notification.title || '',
                        body: remoteMessage.notification.body || '',
                        data: remoteMessage.data,
                        android: {
                            channelId: 'foreground-noti',
                            smallIcon: 'ic_launcher',
                            importance: AndroidImportance.HIGH,
                            pressAction: {
                                id: 'default',
                            },
                            sound: 'default',
                        },
                    })
                } else {
                    const incomingMessage = remoteMessage.data as unknown as NotificationMessage
                    if (incomingMessage.senderId !== user.id) {
                        await notifee.displayNotification({
                            title: remoteMessage.notification.title || '',
                            body: remoteMessage.notification.body || '',
                            data: remoteMessage.data,
                            android: {
                                channelId: 'foreground-noti',
                                smallIcon: 'ic_launcher',
                                importance: AndroidImportance.HIGH,
                                pressAction: {
                                    id: 'default',
                                },
                                sound: 'default',
                            },
                        })
                        Vibration.vibrate()
                    }
                    const message: Message = {
                        id: incomingMessage.messageId,
                        content: incomingMessage.messageContent,
                        type: incomingMessage.messageType as unknown as MessageType,
                        fileAttachment: {
                            publicUrl: incomingMessage.fileType,
                            type: 0
                        },
                        createdDate: new Date().toISOString(),
                        participant: {
                            id: incomingMessage.senderId,
                            fullName: incomingMessage.senderName,
                            avatar: incomingMessage.senderAvatar,
                            role: UserRoleNumber.PATIENT
                        }
                    }
                    if (incomingMessage.conversationType == ConversationType.GROUP_CHAT) {
                        addMessage(incomingMessage.conversationId, message)
                        setLatestMessage(incomingMessage.conversationId, message)
                    } else {
                        addPrivateMessage(incomingMessage.conversationId, message)
                        setLatestPrivateMessage(incomingMessage.conversationId, message)
                    }
                }
            }
        })

        return unsubscribeOnMessage
    }, [])

    useEffect(() => {
        const initializeNotifications = async () => {
            const permissionEnabled = await requestUserPermission()
            if (permissionEnabled) {
                const token = await getDeviceToken()
                if (token) {
                    await saveTokenDevice(token)
                }
            }
        }

        initializeNotifications()
    }, [])

    useEffect(() => {
        if (user.isAuthenticated && !isBackground) initialize()
        return () => {
            cleanupCall()
        }
    }, [user.isAuthenticated, isBackground])

    return (
        <>
            <Stack>
                <Stack.Screen name="(main)" options={{ headerShown: false }} />
                <Stack.Screen name="(ai)" options={{ headerShown: false }} />
                <Stack.Screen name="(blog)" options={{ headerShown: false }} />
                <Stack.Screen name="(health)" options={{ headerShown: false }} />
                <Stack.Screen name="(consult)" options={{ headerShown: false }} />
                <Stack.Screen name="(payment)" options={{ headerShown: false }} />
                <Stack.Screen name="chat-screen" options={{ headerTitle: '', headerShadowVisible: false }} />
                <Stack.Screen name="video-call-screen" options={{ headerShown: false }} />
                <Stack.Screen name="join-group-screen" options={{ headerShown: false }} />
                <Stack.Screen name="income-history-screen" options={{ headerTitle: 'Lịch sử thu nhập', headerShadowVisible: false }} />
            </Stack>
            <IncomingCallModal />
        </>
    )
}
