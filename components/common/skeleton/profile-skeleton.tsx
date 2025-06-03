import * as React from 'react';
import { Skeleton } from '../../ui/skeleton';
import { Dimensions, View } from 'react-native';

const { width } = Dimensions.get('window')

export default function ProfileSkeleton() {

    return (
        <View
            style={{ width: width }}
            className='flex-1 w-full px-3 flex-col gap-4 items-center'
        >
            <View className='flex-row justify-between items-center w-full'>
                <View className='flex-row gap-2 items-center'>
                    <Skeleton className='w-[60] h-[60] rounded-full' />
                    <View className='flex-col gap-2'>
                        <Skeleton className='w-[200] h-[20]' />
                        <Skeleton className='w-[150] h-[20]' />
                    </View>
                </View>
                <Skeleton className='h-[25] w-[25]' />
            </View>
            <Skeleton className='w-full h-[80]' />
            <Skeleton className='w-full h-[200]' />
            <View className='flex w-full items-center justify-center'>
                <Skeleton className='w-1/2 h-[40]' />
            </View>
        </View>
    );
}