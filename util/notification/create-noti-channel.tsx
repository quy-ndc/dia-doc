import notifee, { AndroidImportance } from "@notifee/react-native";
import { Notification } from '../../assets/enum/notification';


export async function createNotificationChannel() {
    await notifee.createChannel({
        id: Notification.NOTIFEE_CHANNEL_ID,
        name: Notification.NOTIFEE_CHANNEL_NAME,
        importance: AndroidImportance.HIGH,
    });
}