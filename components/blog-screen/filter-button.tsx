import * as React from 'react';
import { ListFilter } from '../../lib/icons/ListFilter';
import { Dimensions, Modal, Pressable, RefreshControl, ScrollView, View } from 'react-native';
import { Text } from '../../components/ui/text'
import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCategoryQuery } from '../../service/query/media-query';
import IconButton from '../common/icon-button';
import { Category } from '../../assets/types/media/category';
import SpinningIcon from '../common/icons/spinning-icon';
import { Loader } from '../../lib/icons/Loader';
import { RefreshCcw } from '../../lib/icons/RefreshCcw';
import { FlashList } from '@shopify/flash-list';
import TopBlogTag from '../common/blog-item/top-blog-tag';
import ErrorDisplay from '../common/error-display';
import FilterSkeleton from '../common/skeleton/filter-skeleton';


const { height, width } = Dimensions.get('window')

type Prop = {
    categories: string[],
    setCategories: (categories: string[]) => void
}

export default function FilterButton({ categories, setCategories }: Prop) {

    const [open, setOpen] = useState(false)
    const [current, setCurrent] = useState(categories)
    const [refreshing, setRefreshing] = useState(false)

    const { data, isError, isLoading, remove, refetch } = useQuery({
        ...useCategoryQuery(),
        enabled: open,
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000)
    });

    const categoriesList: Category[] = data?.data.value.data || []

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        remove()
        refetch().finally(() => setRefreshing(false))
    }, [refetch])

    const onConfirm = () => {
        setCategories(current)
        setOpen(false)
    }

    const onReset = () => {
        setCategories([])
        setCurrent([])
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
                        style={{ width: width * 0.9, height: 'auto', minHeight: height * 0.23, maxHeight: height * 0.6 }}
                        className="flex-col justify-center bg-[var(--noti-bg)] rounded-2xl"
                    >
                        {isLoading ? (
                            <FilterSkeleton />
                        ) : isError || categoriesList.length == 0 ? (
                            <ErrorDisplay
                                text={'Có lỗi khi lấy bộ lọc'}
                                onRefresh={onRefresh}
                                refreshing={refreshing}
                            />
                        ) : (
                            <View className='flex-col gap-5 p-3'>
                                <View className='flex-col gap-4 p-4'>
                                    <View className='flex-row w-full justify-between items-center'>
                                        <View className='flex-col gap-2'>
                                            <Text className='text-lg font-bold tracking-widest capitalize'>Loại tiểu đường</Text>
                                            <Text className='text-base tracking-wider'>Đã chọn {current.length} danh mục</Text>
                                        </View>
                                        <IconButton
                                            icon={<RefreshCcw className='text-foreground' size={17} />}
                                            buttonSize={3}
                                            possition={'other'}
                                            onPress={onReset}
                                        />
                                    </View>
                                </View>

                                <View style={{ height: height * 0.35 }}>
                                    <FlashList
                                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                                        data={categoriesList}
                                        keyExtractor={(item) => item.id}
                                        renderItem={({ item }) => (
                                            <View className='m-1'>
                                                <TopBlogTag
                                                    tag={item}
                                                    categories={current}
                                                    setCategories={setCurrent}
                                                    itemWidth={0.38}
                                                />
                                            </View>
                                        )}
                                        estimatedItemSize={80}
                                        numColumns={2}
                                        extraData={current}
                                    />
                                </View>
                                <View className='flex-row justify-between items-center w-full mt-2'>
                                    <View />
                                    <View className='flex-row items-center gap-3'>
                                        <Pressable
                                            className='px-5 py-2 rounded-full border-[0.5px] border-[var(--oppo-theme-col)] active:bg-[var(--click-bg)]'
                                            onPress={() => setOpen(false)}
                                        >
                                            <Text className='text-sm font-semibold tracking-wider'>Hủy</Text>
                                        </Pressable>
                                        <Pressable
                                            className='px-5 py-2 rounded-full border-[0.5px] border-[var(--oppo-theme-col)] active:bg-[var(--click-bg)]'
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