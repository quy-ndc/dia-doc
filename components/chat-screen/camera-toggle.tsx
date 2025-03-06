import * as React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Text } from '../ui/text';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Camera } from '../../lib/icons/Camera';
import { CameraView, CameraType, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';

export default function CameraToggle() {

    const [isCameraOn, setIsCameraOn] = useState<boolean>(false)
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions()
    const [preview, setPreview] = useState<any>(null)
    const [video, setVideo] = useState<any>(null)
    const [isRecording, setIsRecording] = useState(false)
    const cameraRef = useRef<CameraView | null>(null)
    const [loading, setLoading] = useState(false)

    return (
        <Text>a</Text>
    );
}