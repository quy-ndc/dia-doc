import * as React from 'react'
import { Dimensions, Pressable, View } from 'react-native'
import SpinningIcon from '../../common/icons/spinning-icon'
import { Loader } from '../../../lib/icons/Loader'
import { Check } from '../../../lib/icons/Check'
import { ArrowLeft } from '../../../lib/icons/ArrowLeft'
import { router } from 'expo-router'
import { Text } from '../../ui/text'


const { width } = Dimensions.get('window')

type Props = {
    isLoading: boolean
    disabled: boolean
    onPress: () => void
}

export default function RecordConfirmButton({ isLoading, disabled, onPress }: Props) {

    return (
        <View
            style={{ width: width * 0.9 }}
            className='flex-col items-center gap-2 mt-5'
        >
            <Pressable
                style={{ opacity: isLoading || disabled ? 0.5 : 1 }}
                className="flex-row w-full gap-2 px-5 py-3 justify-center items-center bg-[var(--oppo-theme-col)] border border-[var(--same-theme-col)] rounded-full active:bg-[var(--oppo-click-bg)]"
                disabled={isLoading || disabled}
                onPress={onPress}
            >
                <Text className="text-base text-[var(--same-theme-col)] font-semibold tracking-wider capitalize">Cập nhật</Text>
                {isLoading ? (
                    <SpinningIcon icon={<Loader className='text-[var(--same-theme-col)]' size={17} />} />
                ) : (
                    <Check className="text-[var(--same-theme-col)]" size={17} />
                )}
            </Pressable>

            <Pressable
                style={{ opacity: isLoading ? 0.5 : 1 }}
                className="flex-row w-full gap-2 px-5 py-3 justify-center items-center border border-[var(--oppo-theme-col)] rounded-full active:bg-[var(--click-bg)]"
                disabled={isLoading}
                onPress={() => router.back()}
            >
                {isLoading ? (
                    <SpinningIcon icon={<Loader className='text-[var(--oppo-theme-col)]' size={17} />} />
                ) : (
                    <ArrowLeft className="text-[var(--oppo-theme-col)]" size={17} />
                )}
                <Text className="text-base text-[var(--oppo-theme-col)] font-semibold tracking-wider capitalize">Quay lại</Text>
            </Pressable>
        </View>
    )
}