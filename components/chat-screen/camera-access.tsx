import * as React from 'react';
import { View, Pressable } from 'react-native';
import { Camera } from '../../lib/icons/Camera';
import { useCameraPermissions } from 'expo-camera';
import { Text } from '../ui/text'

type Prop = {
    setIsCameraOn: (state: boolean) => void
}

export default function CameraAccess({ setIsCameraOn }: Prop) {

    const [permission, requestPermission] = useCameraPermissions();

    const grantPermission = () => {
        requestPermission()
        setIsCameraOn(true)
    }

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