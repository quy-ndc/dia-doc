import * as React from 'react';
import { ListFilter } from '../../lib/icons/ListFilter';
import { Dimensions, Modal, Pressable, View } from 'react-native';
import { Text } from '../../components/ui/text'
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCategoryQuery } from '../../service/query/media-query';
import IconButton from '../common/icon-button';
import { Category } from '../../assets/types/media/category';


const { height, width } = Dimensions.get('window')

type Prop = {
    category: string,
    setCategory: (category: string) => void
}

export default function FilterButton({ category, setCategory }: Prop) {

    const [open, setOpen] = useState(false)

    const { data, isLoading } = useQuery((useCategoryQuery()))

    const categories: Category[] = data?.data.value.data || []

    return (
        <>
            <IconButton
                icon={<ListFilter className='text-foreground' size={17} />}
                buttonSize={3}
                possition={'other'}
                onPress={() => setOpen(true)}
            />
            <Modal
                visible={open}
                animationType="fade"
                transparent
                onRequestClose={() => setOpen(false)}
            >
                <Pressable
                    className="flex-1 justify-center items-center bg-black/50"
                    onPress={() => setOpen(false)}
                >
                    <View
                        style={{ width: width * 0.9, height: 'auto' }}
                        className="flex-col justify-center bg-[var(--noti-bg)] rounded-2xl"
                    >
                        <View className='flex-col gap-2 p-5'>
                            <View className='flex-col gap-3'>
                                <Text className='text-xl font-bold tracking-wider'>Loại tiểu đường</Text>
                                <View className='flex-row justify-between items-center gap-2 w-full'>
                                    {categories.map((item, index) => (
                                        <Pressable
                                            key={index}
                                            className={`px-4 py-2 rounded-full active:bg-[var(--click-bg)] ${category == item.id && 'bg-[var(--oppo-theme-col)]'}`}
                                            onPress={() => setCategory(item.id)}
                                        >
                                            <Text className={`text-base tracking-wider ${category == item.id && 'text-[var(--same-theme-col)] font-semibold'}`}>
                                                {item.name}</Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </View>

                            <View className='flex-row justify-between items-center w-full'>
                                <View />
                                <View className='flex-row items-center gap-3'>
                                    <Pressable>
                                        <Text>Hủy</Text>
                                    </Pressable>
                                    <Pressable>
                                        <Text>Đồng ý</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </>
    )
}