import * as React from 'react'
import { Dimensions, Modal, Pressable, useColorScheme, View } from 'react-native'
import IconButton from '../common/icon-button'
import { ArrowUpWideNarrow } from '../../lib/icons/ArrowUpWideNarrow'
import { useState } from 'react'
import { Text } from '../ui/text'
import SortOptions from './sort-options'
import { ChevronsRightLeft } from '../../lib/icons/ChevronsRightLeft'
import { ArrowUpDown } from '../../lib/icons/ArrowUpDown'
import { X } from '../../lib/icons/X'
import { GlobalColor } from '../../global-color'
import { Eye } from '../../lib/icons/Eye'
import { Heart } from '../../lib/icons/Heart'
import { TrendingUp } from '../../lib/icons/TrendingUp'
import { TrendingDown } from '../../lib/icons/TrendingDown'
import { Activity } from '../../lib/icons/Activity'
import { SortType } from '../../assets/enum/sort-type'


const { width } = Dimensions.get('window')

type Prop = {
    sortType: string
    isAscending: boolean
    setSortType: (sortType: string) => void
    setIsAscending: (isAscending: boolean) => void
}

export default function SortButton({ sortType, isAscending, setSortType, setIsAscending }: Prop) {

    const [open, setOpen] = useState(false)
    const [willSort, setWillSort] = useState(sortType)
    const [willAsc, setWillAsc] = useState(isAscending)
    
    const onConfirm = () => {
        setSortType(willSort)
        setIsAscending(willAsc)
        setOpen(false)
    }

    const onReset = () => {
        setWillSort('')
        setWillAsc(false) 
        setOpen(false)
    }

    return (
        <>
            <IconButton
                icon={<ArrowUpWideNarrow className='text-foreground' size={17} />}
                buttonSize={3}
                possition={'other'}
                onPress={() => setOpen(true)}
            />
            <Modal
                visible={open}
                transparent
                animationType='fade'
                onRequestClose={() => setOpen(false)}
            >
                <Pressable
                    className='flex-1 justify-center items-center bg-black/50'
                    onPress={() => setOpen(false)}
                >
                    <Pressable
                        className='flex-col gap-3 justify-center items-center bg-[var(--noti-bg)] rounded-md py-5'
                        style={{ width: width * 0.85 }}
                    >
                        <View className='flex-row w-full justify-between items-center px-4 bg-[var(--blog-bg )]'>
                            <View className='flex-col gap-2'>
                                <View className='flex-row gap-2 items-center'>
                                    <ArrowUpDown color={GlobalColor.BLUE_NEON_BORDER} size={20} />
                                    <Text className='text-lg font-bold tracking-wider'>Sắp xếp bài viết</Text>
                                </View>
                                <Text className='text-sm text-[var(--fade-text-color)] tracking-wider'>Chọn cách hiển thị bài viết</Text>
                            </View>
                            <IconButton
                                icon={<X className='text-foreground' size={17} />}
                                buttonSize={3}
                                possition={'other'}
                                onPress={() => setOpen(false)}
                            />
                        </View>
                        <View className='flex-col gap-2 w-full px-2'>
                            <SortOptions
                                icon={
                                    <View
                                        className='flex justify-center items-center p-3 rounded-md'
                                        style={{ backgroundColor: willSort === SortType.VIEW ? GlobalColor.BLUE_NEON_BORDER : GlobalColor.BLUE_NEON_BG }}
                                    >
                                        <Eye color={willSort === SortType.VIEW ? 'white' : GlobalColor.BLUE_NEON_BORDER} size={18} />
                                    </View>
                                }
                                text='Theo lượt xem'
                                subText='Hiển thị bài viết theo lượt  xem'
                                isChoosen={willSort === SortType.VIEW}
                                onPress={() => setWillSort(SortType.VIEW)}
                            />
                            <SortOptions
                                icon={
                                    <View
                                        className='flex justify-center items-center p-3 rounded-md'
                                        style={{ backgroundColor: willSort === SortType.LIKE ? GlobalColor.PINK_NEON_BORDER : GlobalColor.PINK_NEON_BG }}
                                    >
                                        <Heart color={willSort === SortType.LIKE ? 'white' : GlobalColor.PINK_NEON_BORDER} size={18} />
                                    </View>
                                }
                                text='Theo lượt thích'
                                subText='Hiển thị bài viết theo lượt thích'
                                isChoosen={willSort === SortType.LIKE}
                                onPress={() => setWillSort(SortType.LIKE)}
                            />
                            <SortOptions
                                icon={
                                    <View
                                        className='flex justify-center items-center p-3 rounded-md'
                                        style={{ backgroundColor: GlobalColor.GREEN_NEON_BG }}
                                    >
                                        <ChevronsRightLeft color={GlobalColor.GREEN_NEON_BORDER} size={18} />
                                    </View>
                                }
                                text='Mặc định'
                                subText='Không lọc bài viết'
                                isChoosen={willSort === 'adwaw'}
                                onPress={onReset}
                            />
                        </View>

                        <View className='flex-row items-center justify-between w-full px-4'>
                            <View className='flex-row gap-2 items-center'>
                                <Activity color={GlobalColor.RED_NEON_BORDER} size={18} />
                                <Text className='text-lg font-bold tracking-wider'>Cách sắp xếp</Text>
                            </View>
                            <View />
                        </View>
                        <View className='flex-col gap-2 w-full px-2'>
                            <SortOptions
                                icon={
                                    <View
                                        className='flex justify-center items-center p-3 rounded-full'
                                        style={{ backgroundColor: willAsc ? GlobalColor.CYAN_NEON_BORDER : GlobalColor.CYAN_NEON_BG }}
                                    >
                                        <TrendingUp color={willAsc ? 'white' : GlobalColor.CYAN_NEON_BORDER} size={18} />
                                    </View>
                                }
                                text='Thấp đến cao'
                                subText='Sắp theo theo thứ tự từ thấp đến cao'
                                isChoosen={willAsc}
                                onPress={() => setWillAsc(true)}
                            />
                            <SortOptions
                                icon={
                                    <View
                                        className='flex justify-center items-center p-3 rounded-full'
                                        style={{ backgroundColor: !willAsc ? GlobalColor.RED_NEON_BORDER : GlobalColor.RED_NEON_BG }}
                                    >
                                        <TrendingDown color={!willAsc ? 'white' : GlobalColor.RED_NEON_BORDER} size={18} />
                                    </View>
                                }
                                text='Cao đến thấp'
                                subText='Sắp theo theo thứ tự từ cao đến thấp'
                                isChoosen={!willAsc}
                                onPress={() => setWillAsc(false)}
                            />
                        </View>
                        <View className='flex-row justify-between items-center w-full p-3'>
                            <View />
                            <View className='flex-row items-center gap-3'>
                                <Pressable
                                    className='px-6 py-2 rounded-full border-[0.5px] border-[var(--oppo-theme-col)] active:bg-[var(--click-bg)]'
                                    onPress={() => setOpen(false)}
                                >
                                    <Text className='text-sm font-semibold tracking-wider'>Hủy</Text>
                                </Pressable>
                                <Pressable
                                    className='px-6 py-2 rounded-full border-[0.5px] bg-[var(--oppo-theme-col)] border-[var(--oppo-theme-col)] active:bg-[var(--oppo-click-bg)]'
                                    onPress={onConfirm}
                                >
                                    <Text className='text-sm text-[var(--same-theme-col)] font-semibold tracking-wider'>Đồng ý</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    )
}
