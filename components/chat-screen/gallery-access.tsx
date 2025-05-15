import * as React from 'react' 
import * as ImagePicker from 'expo-image-picker' 
import { Linking, Pressable } from 'react-native' 
import { Images } from '../../lib/icons/Images' 
import Toast from 'react-native-toast-message' 

type Prop = {
    onImagePick: (message: string) => void
}

export default function GalleryAccess({ onImagePick }: Prop) {

    const pickImageAsync = async () => {
        const response = await ImagePicker.requestMediaLibraryPermissionsAsync() 

        if (!response.canAskAgain) {
            Toast.show({
                type: 'error',
                text1: 'Bạn cần cấp quyền trong cài đặt để truy cập thư viện',
                text2: 'Nhấn vào thông báo này để truy cập cài đặt',
                visibilityTime: 3000,
                onPress: () => Linking.openSettings(),
            })
        } else {
            Toast.show({
                type: 'error',
                text1: 'Bạn cần cấp quyền để truy cập thư viện',
                visibilityTime: 2000
            })
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            // allowsEditing: true,
            quality: 1,
            allowsMultipleSelection: true,
            orderedSelection: true
        }) 

        if (!result.canceled) {
            onImagePick(result.assets[0].uri)
        }
    } 

    return (
        <Pressable
            className='px-3 py-4 rounded-xl active:bg-[var(--click-bg)]'
            onPress={pickImageAsync}
        >
            <Images className='text-foreground' size={20} />
        </Pressable>
    ) 
}