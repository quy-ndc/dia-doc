import * as React from 'react';
import { Skeleton } from '../../ui/skeleton';
import { View } from 'react-native';

export default function TopTagSkeleton() {

    return (
        <View className='flex-1 w-full px-3 flex-row justify-between items-center'>
            <Skeleton className='basis-[22%] h-[100]' />
            <Skeleton className='basis-[22%] h-[100]' />
            <Skeleton className='basis-[22%] h-[100]' />
            <Skeleton className='basis-[22%] h-[100]' />
        </View>
    );
}