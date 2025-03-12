import * as React from 'react';
import { View, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Button } from '../../components/ui/button';
import { Camera } from '../../lib/icons/Camera';
import { CameraType, CameraView } from 'expo-camera';
import { Repeat2 } from '../../lib/icons/Repeat2';
import { useEffect, useRef, useState } from 'react';
import { Image } from 'expo-image'
import { X } from '../../lib/icons/X';
import { Loader } from '../../lib/icons/Loader';
import { Lightbulb } from '../../lib/icons/Lightbulb';
import { LightbulbOff } from '../../lib/icons/LightbulbOff';
import CameraButton from './camera-button';
import { Text } from '../ui/text'
import { SendHorizontal } from '../../lib/icons/SendHorizontal';
import { ArrowLeft } from '../../lib/icons/ArrowLeft';

type Prop = {
    setIsCameraOn: (state: boolean) => void
    handleSendImage: (image: string) => void
}

const { width, height } = Dimensions.get('window');


export default function CameraModule({ setIsCameraOn, handleSendImage }: Prop) {

    const cameraRef = useRef<CameraView | null>(null)
    const [facing, setFacing] = useState<CameraType>('back');
    const [torch, setTorch] = useState(false)
    const [preview, setPreview] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    function toggleTorch() {
        setTorch(!torch)
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

    const handleClear = () => {
        setPreview(null)
    }

    const handleSend = () => {
        handleSendImage(preview.uri)
        setIsCameraOn(false)
        setPreview(null)
    }

    useEffect(() => {
        const fetchSizes = async () => {
            try {
                const sizes = await cameraRef.current!.getAvailablePictureSizesAsync();
                console.log(sizes);
            } catch (error) {
                console.error('Error fetching picture sizes:', error);
            }
        };

        fetchSizes();
    }, []);

    if (preview) {
        return (
            <View className='relative flex-1 bg-[var(--same-theme-col)]'>
                <Image
                    style={styles.image}
                    source={preview.uri}
                    contentFit='contain'
                />
                <View className='absolute top-5 left-5 items-center justify-center'>
                    <CameraButton
                        icon={<ArrowLeft className='text-white' />}
                        buttonSize={4}
                        onClick={handleClear}
                    />
                </View>
                <View className='absolute bottom-5 right-5 flex-row gap-3 items-center justify-center'>
                    <Pressable
                        className='flex-row gap-4 px-6 py-3 items-center justify-center rounded-full active:bg-[var(--camera-click-bg)]'
                        disabled={loading}
                        onPress={handleSend}
                    >
                        <Text className='text-lg text-[var(--oppo-theme-col)]'>Gửi</Text>
                        <SendHorizontal className='text-[var(--oppo-theme-col)]' size={19} />
                    </Pressable>
                </View>
            </View>
        )
    }

    return (
        <CameraView
            ref={cameraRef}
            mode='picture'
            style={{ flex: 1, justifyContent: 'center' }}
            facing={facing}
            autofocus='on'
            enableTorch={torch}

        >
            <View className='absolute flex-col gap-3 top-5 right-5 items-center justify-center'>
                <CameraButton
                    icon={torch ? (
                        <Lightbulb className='text-white' />
                    ) : (
                        <LightbulbOff className='text-white' />
                    )}
                    buttonSize={4}
                    onClick={toggleTorch}
                />
                <CameraButton
                    icon={<Repeat2 className='text-white' />}
                    buttonSize={4}
                    onClick={toggleCameraFacing}
                />
            </View>
            <View className='absolute top-5 left-5 items-center justify-center'>
                <CameraButton
                    icon={<X className='text-white' />}
                    buttonSize={4}
                    onClick={() => setIsCameraOn(false)}
                />
            </View>
            <View className='absolute bottom-10 left-0 right-0 flex-row gap-1 items-center justify-center'>
                <CameraButton
                    icon={<Camera className='text-white' size={30} />}
                    buttonSize={5}
                    onClick={handleTakePhoto}
                />
            </View>
            {/* <View className='absolute bottom-5 right-5 items-center justify-center'>

            </View> */}
        </CameraView>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: width,
        height: height * 0.9
    },
});

