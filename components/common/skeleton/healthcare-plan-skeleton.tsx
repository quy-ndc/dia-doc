import * as React from 'react';
import { Skeleton } from '../../ui/skeleton';
import { View } from 'react-native';

export default function HealthcarePlanSkeleton() {

    return (
        <View className='flex-1 w-full p-2 flex-col gap-4 items-center'>
            <Skeleton className='h-[70] w-full' />
            <Skeleton className='h-[70] w-full' />
            <Skeleton className='h-[70] w-full' />
            <Skeleton className='h-[70] w-full' />
            <Skeleton className='h-[70] w-full' />
            <Skeleton className='h-[70] w-full' />
        </View>
    );
}