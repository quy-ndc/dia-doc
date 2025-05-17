import messaging from '@react-native-firebase/messaging';
import { Vibration } from 'react-native';
import notifee from '@notifee/react-native';
import { Notification } from '../../assets/enum/notification';


export function registerForegroundNotificationHandler() {
    return messaging().onMessage(async remoteMessage => {
        Vibration.vibrate(500);

        await notifee.displayNotification({
            title: remoteMessage.notification?.title,
            body: remoteMessage.notification?.body,
            android: {
                channelId: Notification.NOTIFEE_CHANNEL_ID,
                smallIcon: 'ic_launcher',
                pressAction: { id: 'default' },
                actions: [
                    {
                        title: 'Reply',
                        pressAction: {
                            id: 'reply',
                        },
                        input: true,
                    },
                ]
            },
        });
    });
}