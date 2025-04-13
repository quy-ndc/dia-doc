import { Dimensions, Linking, Modal, Pressable, View } from "react-native";
import { Mic } from "../../lib/icons/Mic";
import { useEffect, useState } from "react";
import { useMicrophonePermissions } from "expo-camera";
import Toast from "react-native-toast-message";
import { Text } from '../../components/ui/text'
import Voice, { SpeechRecognizedEvent, SpeechResultsEvent, SpeechErrorEvent, } from "@react-native-voice/voice";
import { MicOff } from "../../lib/icons/MicOff";
import IconButton from "../common/icon-button";
import { Check } from "../../lib/icons/Check";
import { X } from "../../lib/icons/X";

type Prop = {
    setNewMessage: (newMessage: string) => void;
}

const { width, height } = Dimensions.get('window');

export default function VoiceRecord({ setNewMessage }: Prop) {

    const [permission, requestPermission] = useMicrophonePermissions()
    const [visible, setVisible] = useState(false)
    const [isRecording, setIsRecording] = useState(false)
    const [results, setResults] = useState('');
    const [canSubmit, setCanSubmit] = useState(false);

    const grantPermission = async () => {
        const response = await requestPermission();

        if (response.granted) {
            setVisible(true);
        } else if (!response.canAskAgain) {
            Toast.show({
                type: 'error',
                text1: 'Bạn cần cấp quyền trong cài đặt để sử dụng Micro',
                text2: 'Nhấn vào thông báo này để truy cập cài đặt',
                visibilityTime: 3000,
                onPress: () => Linking.openSettings(),
            })
        } else {
            Toast.show({
                type: 'error',
                text1: 'Bạn cần cấp quyền để sử dụng Micro',
                visibilityTime: 2000
            })
        }
    };

    const onStartRecord = async () => {
        try {
            setCanSubmit(false)
            setResults('')
            await Voice.start("vi-VN");
            setVisible(true)
            setIsRecording(true)
        } catch (e) {
            console.log('startError', e)
            Toast.show({
                type: 'error',
                text1: 'Có sự cố xảy ra khi ghi âm',
                visibilityTime: 3000,
            })
        }
    }

    const onStopRecord = async () => {
        try {
            await Voice.stop();
            setIsRecording(false)
        } catch (e) {
            console.log(e)
            Toast.show({
                type: 'error',
                text1: 'Có sự cố xảy ra khi ghi âm',
                visibilityTime: 3000,
            })
        }
    }

    const onCancelRecord = async () => {
        try {
            await Voice.destroy();
            setIsRecording(false)
            setVisible(false)
            setResults('')
        } catch (e) {
            console.log('destroyError', e)
        }
    }

    const onConfirm = async () => {
        setNewMessage(results)
        await Voice.destroy();
        setIsRecording(false)
        setVisible(false)
    }

    useEffect(() => {
        Voice.onSpeechError = (e) => {
            console.log("onSpeechError: ", e);
            Toast.show({
                type: 'error',
                text1: 'Có sự cố xảy ra khi ghi âm',
                visibilityTime: 3000,
            })
        };

        Voice.onSpeechResults = (e) => {
            console.log("onSpeechResults: ", e);
            setResults(e.value ? e.value[0] : '')
            setCanSubmit(true)
            // setNewMessage(e.value ? e.value[0] :  '')
        };

        Voice.onSpeechPartialResults = (e) => {
            console.log("onSpeechPartialResults: ", e);
            setResults(e.value ? e.value[0] : '')
        };

        Voice.onSpeechVolumeChanged = (e) => {
            console.log("onSpeechVolumeChanged: ", e);
            // setPitch(e.value);
        };

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    if (!permission) {
        return <View />
    }

    return (
        <>
            <Pressable
                className='px-3 py-4 rounded-xl active:bg-[var(--click-bg)]'
                onPress={!permission.granted ? grantPermission : onStartRecord}
            >
                <Mic className='text-foreground' size={20} />
            </Pressable>
            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={onCancelRecord}
            >
                <Pressable
                    className="flex-1 justify-center items-center bg-black/50"
                    onPress={onCancelRecord}
                >
                    <Pressable
                        style={{ width: width * 0.7, minHeight: height * 0.3 }}
                        className="relative flex-col p-5 gap-5 justify-center items-center bg-[var(--noti-bg)] rounded-2xl"
                    >
                        <Pressable
                            className={`absolute top-2 left-2 p-3 items-center justify-center rounded-full active:bg-[var(--click-bg)]`}
                            onPress={onCancelRecord}
                        >
                            <X className={`text-red-500`} size={22} />
                        </Pressable>

                        <Pressable
                            className={`p-5 rounded-full ${isRecording
                                ? 'bg-red-500 active:bg-red-700'
                                : 'bg-black active:bg-[var(--click-bg)]'
                                }`}
                            onPress={isRecording ? onStopRecord : onStartRecord}
                        >
                            {isRecording ? (
                                <Mic className="text-white" size={20} strokeWidth={2} />
                            ) : (
                                <MicOff className="text-white" size={20} strokeWidth={2} />
                            )}
                        </Pressable>

                        <Text className={`text-base tracking-wider ${results == '' && 'hidden'}`}>
                            {results}
                        </Text>

                        <Pressable
                            className={`absolute bottom-4 right-4 p-3 items-center justify-center rounded-full active:bg-[var(--click-bg)]`}
                            disabled={!canSubmit || results == ''}
                            onPress={onConfirm}
                        >
                            <Check className={`text-green-500 ${(!canSubmit || results == '') && 'opacity-70'}`} size={22} />
                        </Pressable>

                    </Pressable>

                </Pressable>
            </Modal>
        </>
    );
}
