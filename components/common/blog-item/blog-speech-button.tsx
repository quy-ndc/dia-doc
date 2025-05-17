import * as React from 'react';
import { Platform } from 'react-native';
import { useEffect, useState } from 'react';
import IconButton from '../../common/icon-button';
import { Headphones } from '../../../lib/icons/Headphones';
import * as Speech from 'expo-speech';
import { Pause } from '../../../lib/icons/Pause';


type Prop = {
    content: string
}

export default function SpeechButton({ content }: Prop) {

    const [isSpeaking, setIsSpeaking] = useState(false)

    const handleSpeak = () => {
        setIsSpeaking(true)
        Speech.speak(content, {
            voice: Platform.OS == 'android' ? 'vi-VN-language' : 'com.apple.ttsbundle.siri_female_vi-VN_compact',
            language: 'vi-VN'
        })
    }

    const handleStop = () => {
        setIsSpeaking(false)
        Speech.stop()
    }

    useEffect(() => {
        return () => {
            Speech.stop()
        }
    }, [])

    return (
        <IconButton
            icon={isSpeaking ? (
                <Pause className='text-foreground' size={20} />
            ) : (
                <Headphones className='text-foreground' size={20} />
            )}
            buttonSize={3}
            possition={'other'}
            onPress={isSpeaking ? handleStop : handleSpeak}
        />
    )
}