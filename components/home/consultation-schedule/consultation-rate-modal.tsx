import * as React from 'react'
import { Text } from '../../../components/ui/text'
import { Dimensions, Modal, Pressable, View } from 'react-native'
import { useReviewConsultationMutation } from '../../../service/query/user-query'
import { GlobalColor } from '../../../global-color'
import { useEffect, useState } from 'react'
import SpinningIcon from '../../common/icons/spinning-icon'
import { Loader } from '../../../lib/icons/Loader'
import { Star } from '../../../lib/icons/Star'
import { Textarea } from '../../ui/textarea'

type Prop = {
    id: string
}

const { width } = Dimensions.get('window')

export default function ConsultationRateModal({ id }: Prop) {

    const [visible, setVisible] = useState(false)
    const [rating, setRating] = useState(1)
    const [feedback, setFeedback] = useState('')

    const { mutateAsync, data, isLoading, isError } = useReviewConsultationMutation()

    const onReview = async () => {
        await mutateAsync({
            consultationId: id,
            rating: rating,
            feedback: feedback
        })
    }

    useEffect(() => {
        if (!data || isError || isLoading || data.status !== 200) return
        setVisible(false)
    }, [data])

    return (
        <>
            <Pressable
                style={{ backgroundColor: GlobalColor.YELLOW_NEON_BG }}
                className={`flex-row items-center gap-2 px-4 py-1 rounded-full justify-center active:opacity-70 self-start`}
                onPress={() => setVisible(true)}
            >
                <Text
                    style={{ color: GlobalColor.YELLOW_NEON_BORDER }}
                    className='text-sm font-semibold tracking-wider'
                >
                    Đánh giá
                </Text>
                <Star color={GlobalColor.YELLOW_NEON_BORDER} size={18} />
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
                            <Text className='text-lg font-bold text-left tracking-wider'>Đánh gia buổi tư vấn này</Text>
                            <Text className='text-sm text-[var(--fade-text-color)] text-left tracking-wider'>Cho chúng tôi biết suy nghĩ của bạn</Text>
                        </View>
                        <View className='flex-row gap-2 items-center'>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    color={star <= rating ? GlobalColor.YELLOW_NEON_BORDER : GlobalColor.GRAY_NEON_BORDER}
                                    fill={star <= rating ? GlobalColor.YELLOW_NEON_BORDER : 'transparent'}
                                    size={23}
                                    strokeWidth={1.4}
                                    onPress={() => setRating(star)}
                                />
                            ))}
                        </View>
                        <Textarea
                            style={{ letterSpacing: 1.2, borderRadius: 13, fontSize: 14 }}
                            value={feedback}
                            onChangeText={setFeedback}
                            placeholder={`Dịch vụ tốt...`}
                            className='w-full'
                        />
                        <View className='flex-col gap-4 items-center w-full'>
                            <Pressable
                                style={{ backgroundColor: GlobalColor.GREEN_NEON_BORDER }}
                                className={`flex-row gap-2 items-center p-3 rounded-full items-center justify-center w-full active:opacity-70 ${isLoading || rating == 0 && 'opacity-70'}`}
                                onPress={onReview}
                                disabled={isLoading || rating === 0}
                            >
                                {isLoading && (
                                    <SpinningIcon icon={<Loader className='text-white' size={17} />} />
                                )}
                                <Text className='text-base text-white font-bold tracking-wider'>
                                    Đồng ý
                                </Text>
                            </Pressable>
                            <Pressable
                                className={`flex-row gap-2 items-center p-3 rounded-full items-center justify-center w-full bg-[var(--oppo-theme-col)] active:opacity-70 ${isLoading && 'opacity-70'}`}
                                onPress={() => setVisible(false)}
                                disabled={isLoading}
                            >
                                {isLoading && (
                                    <SpinningIcon icon={<Loader className='text-white' size={17} />} />
                                )}
                                <Text className='text-base text-[var(--same-theme-col)] font-bold tracking-wider'>Quay lại</Text>
                            </Pressable>
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    )
}