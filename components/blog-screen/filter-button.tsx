import * as React from 'react' 
import { ListFilter } from '../../lib/icons/ListFilter' 
import { Dimensions, Modal, Pressable, View } from 'react-native' 
import { Text } from '../../components/ui/text'
import { useState } from 'react' 
import { useQuery } from '@tanstack/react-query' 
import { useCategoryQuery } from '../../service/query/media-query' 
import IconButton from '../common/icon-button' 
import { Category } from '../../assets/types/media/category' 
import SpinningIcon from '../common/icons/spinning-icon' 
import { Loader } from '../../lib/icons/Loader' 
import { RefreshCcw } from '../../lib/icons/RefreshCcw' 


const { height, width } = Dimensions.get('window')

type Prop = {
    category: string,
    setCategory: (category: string) => void
}

export default function FilterButton({ category, setCategory }: Prop) {

    const [open, setOpen] = useState(false)
    const [current, setCurrent] = useState(category)

    const { data, isLoading } = useQuery({
        ...useCategoryQuery(),
        enabled: open
    }) 

    const categories: Category[] = data?.data.value.data || []

    const onConfirm = () => {
        setCategory(current)
        setOpen(false)
    }

    const onReset = () => {
        setCategory('')
        setCurrent('')
        setOpen(false)
    }

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
                    <Pressable
                        style={{ width: width * 0.9, height: 'auto', minHeight: height * 0.23 }}
                        className="flex-col justify-center bg-[var(--noti-bg)] rounded-2xl"
                    >
                        {isLoading ? (
                            <View className='flex-1 w-full h-full flex-col gap-3 justify-center items-center'>
                                <SpinningIcon icon={<Loader className='text-foreground' size={30} />} />
                            </View>
                        ) : (
                            <View className='flex-col gap-5 p-5'>
                                <View className='flex-col gap-4'>
                                    <View className='flex-row w-full justify-between items-center'>
                                        <Text className='text-lg font-bold tracking-widest capitalize'>Loại tiểu đường</Text>
                                        <IconButton
                                            icon={<RefreshCcw className='text-foreground' size={17} />}
                                            buttonSize={3}
                                            possition={'other'}
                                            onPress={onReset}
                                        />
                                    </View>
                                    <View className='flex-row flex-wrap justify-start gap-2 w-full'>
                                        {categories.map((item, index) => (
                                            <Pressable
                                                key={index}
                                                className={`
                                                w-[23%] px-2 py-2 rounded-lg  active:bg-[var(--click-bg)] 
                                                ${current === item.id ? 'bg-[var(--oppo-theme-col)] active:bg-[var(--oppo-theme-col)]' : ''}
                                            `}
                                                onPress={current === item.id ? () => setCurrent('') : () => setCurrent(item.id)}
                                            >
                                                <Text
                                                    className={`text-sm text-center tracking-wider capitalize ${current === item.id ? 'text-[var(--same-theme-col)] font-semibold' : ''}`}
                                                >
                                                    {item.name}
                                                </Text>
                                            </Pressable>
                                        ))}
                                    </View>
                                </View>
                                <View className='flex-row justify-between items-center w-full'>
                                    <View />
                                    <View className='flex-row items-center gap-3'>
                                        <Pressable
                                            className='px-5 py-2 rounded-full border-[0.5px] border-[var(--oppo-theme-col)] active:bg-[var(--click-bg)]'
                                            onPress={() => setOpen(false)}
                                        >
                                            <Text className='text-sm font-semibold tracking-wider'>Hủy</Text>
                                        </Pressable>
                                        <Pressable
                                            className={`px-5 py-2 rounded-full border-[0.5px] border-[var(--oppo-theme-col)] active:bg-[var(--click-bg)]`}
                                            onPress={onConfirm}
                                        >
                                            <Text className='text-sm font-semibold tracking-wider'>Đồng ý</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        )}
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    )
}