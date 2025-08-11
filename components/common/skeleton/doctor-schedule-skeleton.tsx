import * as React from 'react';
import { Skeleton } from '../../ui/skeleton';
import { View } from 'react-native';

export default function DoctorScheduleSkeleton() {

    return (
        <View className='flex-1 w-full p-2 flex-col gap-4 items-center'>
            <Skeleton className='h-[50] w-full' />
            <View className='flex-row items-center gap-5 justify-center'>
                <Skeleton className='h-[50] w-[45%]' />
                <Skeleton className='h-[50] w-[45%]' />
            </View>
            <View className='flex-row items-center gap-5 justify-center'>
                <Skeleton className='h-[50] w-[45%]' />
                <Skeleton className='h-[50] w-[45%]' />
            </View>
            <View className='flex-row items-center gap-5 justify-center'>
                <Skeleton className='h-[50] w-[45%]' />
                <Skeleton className='h-[50] w-[45%]' />
            </View>
        </View>
    );
}