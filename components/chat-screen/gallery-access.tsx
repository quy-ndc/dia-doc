import * as React from 'react'
import * as ImagePicker from 'expo-image-picker'
import { Linking, Pressable } from 'react-native'
import { Images } from '../../lib/icons/Images'
import Toast from 'react-native-toast-message'
import { useUploadImageMutation } from '../../service/query/media-query'
import { useEffect } from 'react'

type Prop = {
    onImagePick: (message: string) => void
}

export default function GalleryAccess({ onImagePick }: Prop) {

    const { data, isLoading, mutateAsync, isSuccess, isError } = useUploadImageMutation()
    // console.log('data', data)

    const pickImageAsync = async () => {
        const response = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (!response.granted) {
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
                    visibilityTime: 2000,
                })
            }
            return
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
            orderedSelection: true,
        })

        if (!result.canceled && result.assets?.length > 0) {
            const asset = result.assets[0]
            await uploadImage({
                uri: asset.uri,
                name: asset.fileName || 'upload.jpg',
                type: asset.type || 'image/jpeg',
            })
        }
    }

    const uploadImage = async (file: any) => {
        if (!file) return

        const formData = new FormData()
        formData.append('files', file as any)
        await mutateAsync(formData)
    }

    useEffect(() => {
        console.log(data)
        if (!data || isError || data.status !== 200) return

    }, [data])

    return (
        <Pressable
            className="px-3 py-4 rounded-xl active:bg-[var(--click-bg)]"
            onPress={pickImageAsync}
        >
            <Images className="text-foreground" size={20} />
        </Pressable>
    )
}
