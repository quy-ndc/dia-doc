import { Redirect, Stack } from 'expo-router'
import useUserStore from '../../store/userStore'
import { useChannel } from 'ably/react'
import { GLOBAL_CHAT_EVENT_CHANNEL, GLOBAL_CHAT_EVENT_NAME } from '@env'
import { GlobalMessageEvent, Message } from '../../assets/types/chat/message'
import { useMessageStore } from '../../store/useMessage'
import { MessageType } from '../../assets/enum/message-type'
import { UserRole, UserRoleNumber } from '../../assets/enum/user-role'
import { PermissionsAndroid, Platform, Vibration, View } from 'react-native'
import { useSaveFcmTokenMutation } from '../../service/query/auth-query'
import useConfigStore from '../../store/appConfigStore'
import { useEffect } from 'react'
import { getApp } from '@react-native-firebase/app'
import notifee from '@notifee/react-native'
import messaging from '@react-native-firebase/messaging'
import IncomingCallModal from '../../components/common/incoming-call-modal'
import React from 'react'
import useVideoCallStore from '../../store/videoCallStore'
import { useAppState } from '../../util/hook/useAppState'


export default function ProtectedLayout() {
    const { user } = useUserStore()
    const { tokenDevice, setTokenDevice } = useConfigStore()
    const { addMessage, setLatestMessage } = useMessageStore()
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

    useEffect(() => {
        requestUserPermission()

        const unsubscribeOnMessage = getApp().messaging().onMessage(async remoteMessage => {
            Vibration.vibrate()
            console.log(remoteMessage)

            await notifee.displayNotification({
                title: remoteMessage.notification?.title,
                body: remoteMessage.notification?.body,
                android: {
                    channelId: 'foreground-noti',
                    smallIcon: 'ic_launcher', // ensure you have this icon in `android/app/src/main/res`
                    pressAction: {
                        id: 'default',
                    },
                },
            })

            // const message: Message = {
            //     id: remoteMessage.data.
            //     content: string
            //     type: 
            //     fileAttachment: {
            //         publicUrl: string
            //         type: number
            //     }
            //     createdDate: string,
            //     participant: {
            //         id: string
            //         fullName: string
            //         avatar: string
            //         role: UserRoleNumber
            //     }
            // }
            // // Alert.alert('New Notification', JSON.stringify(remoteMessage))
        })

        return unsubscribeOnMessage
    }, [])

    async function requestUserPermission() {
        const authStatus = await getApp().messaging().requestPermission()
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL

        if (Platform.OS === 'android' && Platform.Version >= 33) {
            const result = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
            )
        }
    }

    async function getDeviceToken() {
        try {
            const token = await getApp().messaging().getToken()
            console.log('FCM Token:', token)
            return token
        } catch (error) {
            console.error('Error getting FCM token:', error)
        }
    }

    useEffect(() => {
        requestUserPermission()
    }, [])

    useEffect(() => {
        getDeviceToken().then((token) => {
            if (token) {
                saveTokenDevice(token);
            }
        })
    }, [])

    useEffect(() => {
        if (user.isAuthenticated && !isBackground) initialize()
        return () => {
            cleanupCall()
        }
    }, [user.isAuthenticated, isBackground])

    const { } = useChannel(`${GLOBAL_CHAT_EVENT_CHANNEL}`, `${GLOBAL_CHAT_EVENT_NAME}`, (payload) => {
        const response: GlobalMessageEvent = JSON.parse(payload.data.Value.Message)
        const newMessage: Message = {
            id: response.MessageId,
            content: response.MessageContent,
            type: response.MessageType as MessageType,
            fileAttachment: {
                publicUrl: response.FileAttachment,
                type: 0
            },
            createdDate: response.CreatedDate,
            participant: {
                id: response.Sender.SenderId,
                fullName: response.Sender.FullName,
                avatar: response.Sender.Avatar,
                role: UserRoleNumber.PATIENT
            }
        }

        addMessage(response.Conversation.ConversationId, newMessage)
        setLatestMessage(response.Conversation.ConversationId, newMessage)
    })

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
            </Stack>
            <IncomingCallModal />
        </>
    )
}
