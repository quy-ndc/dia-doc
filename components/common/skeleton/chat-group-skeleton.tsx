import * as React from 'react';
import { Skeleton } from '../../ui/skeleton';
import { Dimensions, View } from 'react-native';

const { width } = Dimensions.get('window')

export default function GroupChatSkeleton() {

    return (
        <View
            style={{ width: width }}
            className='flex-1 w-full px-3 flex-col gap-4 items-center'
        >
            <View className='flex-row justify-between items-center w-full'>
                <View className='flex-row gap-2 items-center'>
                    <Skeleton className='w-[60] h-[60] rounded-full' />
                    <View className='flex-col gap-2'>
                        <Skeleton className='w-[100] h-[15]' />
                        <Skeleton className='w-[70] h-[15]' />
                    </View>
                </View>
                <View className='flex-row gap-2 items-center'>
                    <Skeleton className='w-[50] h-[15]' />
                    <View className='h-[15]' />
                </View>
            </View>
        </View>
    );
}