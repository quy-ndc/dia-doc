import * as React from 'react';
import { View, Pressable, Linking } from 'react-native';
import { Camera } from '../../lib/icons/Camera';
import { PermissionResponse, useCameraPermissions } from 'expo-camera';
import Toast from 'react-native-toast-message';

type Prop = {
    setIsCameraOn: (state: boolean) => void
}

export default function CameraAccess({ setIsCameraOn }: Prop) {

    const [permission, requestPermission] = useCameraPermissions();

    const grantPermission = async () => {
        const response = await requestPermission();

        if (response.granted) {
            setIsCameraOn(true);
        } else if (!response.canAskAgain) {
            Toast.show({
                type: 'error',
                text1: 'Bạn cần cấp quyền trong cài đặt để sử dụng Camera',
                text2: 'Nhấn vào thông báo này để truy cập cài đặt',
                visibilityTime: 3000,
                onPress: () => Linking.openSettings(),
            })
        } else {
            Toast.show({
                type: 'error',
                text1: 'Bạn cần cấp quyền để sử dụng Camera',
                visibilityTime: 2000
            })
        }
    };

    if (!permission) {
        return <View />
    }

    return (
        <Pressable
            className='px-3 py-4 rounded-xl active:bg-[var(--click-bg)]'
            onPress={!permission.granted ? grantPermission : () => setIsCameraOn(true)}
        >
            <Camera className='text-foreground' size={20} />
        </Pressable>
    )
}