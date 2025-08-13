import * as React from 'react'
import { Dimensions, Modal, Pressable, View } from 'react-native'
import { Text } from '../../components/ui/text'
import { ServicePackage } from '../../assets/types/consult/consultation'
import { GlobalColor } from '../../global-color'
import { ChevronRight } from '../../lib/icons/ChevronRight'
import { useCreatePaymentMutation } from '../../service/query/user-query'
import { useEffect, useState } from 'react'
import SpinningIcon from '../common/icons/spinning-icon'
import { Loader } from '../../lib/icons/Loader'
import { router } from 'expo-router'

type Prop = {
    id: string
}

const { width } = Dimensions.get('window')

export default function PurchaseConfirmationModal({ id }: Prop) {

    const [visible, setVisible] = useState(false)
    const { mutateAsync, data, isLoading, isError } = useCreatePaymentMutation()

    const onConfirm = async () => {
        await mutateAsync(id)
    }

    useEffect(() => {
        if (!data || isError || data.status !== 200) return
        router.push({
            pathname: 'payment-screen',
            params: { url: data.data.data.paymentUrl }
        })
        setVisible(false)
    }, [data, isLoading])


    return (
        <>
            <Pressable
                className='flex-row items-center justify-center gap-2 rounded-full bg-[var(--oppo-theme-col)] px-4 py-2 w-full active:opacity-60'
                onPress={() => setVisible(true)}
            >
                <Text className='text-base text-[var(--same-theme-col)] font-semibold tracking-wider'>Mua gói này</Text>
                <ChevronRight className='text-[var(--same-theme-col)]' size={17} />
            </Pressable>
            <Modal
                visible={visible}
                transparent
                animationType='fade'
                onRequestClose={() => setVisible(false)}
            >
                <Pressable
                    className='flex-1 justify-center items-center bg-black/50'
                    onPress={() => setVisible(false)}
                >
                    <Pressable
                        className='flex-col justify-center gap-7 p-5 items-center bg-[var(--noti-bg)] rounded-md'
                        style={{ width: width * 0.9 }}
                    >
                        <View className='flex-col gap-1 w-full'>
                            <Text className='text-lg font-bold text-left tracking-wider'>Bạn có chắc chắn muốn mua gói này?</Text>
                            <Text className='text-base text-[var(--fade-text-color)] text-left tracking-wider'>Sau khi chấp nhận bạn sẽ được chuyển hướng đến trang giao dịch</Text>
                        </View>
                        <View className='flex-col gap-4 items-center w-full'>
                            <Pressable
                                className={`flex-row gap-2 items-center p-4 rounded-full items-center justify-center w-full bg-[var(--oppo-theme-col)] active:opacity-70 ${isLoading && 'opacity-70'}`}
                                onPress={(onConfirm)}
                                disabled={isLoading}
                            >
                                {isLoading && (
                                    <SpinningIcon icon={<Loader className='text-white' size={17} />} />
                                )}
                                <Text className='text-base text-white font-bold tracking-wider'>
                                    Có, tôi muốn mua
                                </Text>
                            </Pressable>
                            <Pressable
                                className={`flex-row gap-2 items-center p-4 rounded-full items-center justify-center w-full bg-[var(--same-theme-col)] border border-[var(--oppo-theme-col)] active:opacity-70 ${isLoading && 'opacity-70'}`}
                                onPress={() => setVisible(false)}
                                disabled={isLoading}
                            >
                                {isLoading && (
                                    <SpinningIcon icon={<Loader className='text-[var(--oppo-theme-col)]' size={17} />} />
                                )}
                                <Text className='text-base text-[var(--oppo-theme-col)] font-bold tracking-wider'>Không, quay lại</Text>
                            </Pressable>
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    )
}