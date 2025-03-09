import * as React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Pressable } from 'react-native';
import { Images } from '../../lib/icons/Images';

type Prop = {
    onImagePick: (message: string) => void
}

export default function GalleryAccess({ onImagePick }: Prop) {

    const pickImageAsync = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            alert('Cần quyền truy cập thư viện ảnh');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            onImagePick(result.assets[0].uri)
        }
    };

    return (
        <Pressable
            className='px-3 py-4 rounded-xl active:bg-[var(--click-bg)]'
            onPress={pickImageAsync}
        >
            <Images className='text-foreground' size={20} />
        </Pressable>
    );
}