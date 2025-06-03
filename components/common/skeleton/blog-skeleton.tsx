import * as React from 'react';
import { Skeleton } from '../../ui/skeleton';
import { Dimensions, View } from 'react-native';

const { width } = Dimensions.get('window')

export default function BlogSkeleton() {

    return (
        <View
            style={{ width: width }}
            className='flex-1 w-full p-2 flex-col gap-4 items-center'
        >
            <Skeleton className='h-[150] w-full' />
            <Skeleton className='h-[150] w-full' />
            <Skeleton className='h-[150] w-full' />
            <Skeleton className='h-[150] w-full' />
        </View>
    );
}