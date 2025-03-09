import * as React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Text } from '../ui/text';
import { useEffect, useRef, useState } from 'react';
import { Camera } from '../../lib/icons/Camera';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '../ui/button';
import { X } from '../../lib/icons/X';
import { Repeat2 } from '../../lib/icons/Repeat2';

export default function CameraModule() {

    const [isCameraOn, setIsCameraOn] = useState<boolean>(false)
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [preview, setPreview] = useState<any>(null)
    const [photo, setPhoto] = useState<any>(null)
    const cameraRef = useRef<CameraView | null>(null)
    const [loading, setLoading] = useState(false)

    const grantPermission = () => {
        requestPermission()
        setIsCameraOn(true)
    }

    if (!permission) {
        return <View />;
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const handleTakePhoto = async () => {
        if (cameraRef.current) {
            const takenPhoto = await cameraRef.current.takePictureAsync({
                quality: 1,
                base64: true,
                exif: false,
                imageType: 'jpg'
            })
            setPreview(takenPhoto!)
        }
    }


    return (
        <View className='flex-1 w-full h-full'>
            <CameraView
                ref={cameraRef}
                mode='picture'
                style={{ flex: 1, justifyContent: 'center' }}
                facing={facing}
            >
                <View className='absolute bottom-10 left-0 right-0 flex-row gap-1 items-center justify-center'>
                    <Button variant={'ghost'} onPress={toggleCameraFacing}>
                        <Repeat2 className='text-foreground' />
                    </Button>
                    <Button variant={'ghost'} onPress={handleTakePhoto} size={'lg'}>
                        <Camera className='text-foreground' size={30} />
                    </Button>
                    <Button variant={'ghost'} onPress={() => setIsCameraOn(false)}>
                        <X className='text-foreground' />
                    </Button>
                </View>
            </CameraView>
        </View>
    );
}