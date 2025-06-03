import * as React from 'react';
import { Skeleton } from '../../ui/skeleton';
import { Dimensions, ScrollView, View } from 'react-native';

const { width } = Dimensions.get('window')

export default function BlogDetailSkeleton() {

    return (
        <ScrollView className='w-full'>
            <View
                style={{ width: width }}
                className='flex-1 w-full px-3 flex-col gap-4 items-center'
            >
                <View className='flex-row w-full items-center justify-between'>
                    <Skeleton className='h-[25] w-[200]' />
                    <Skeleton className='h-[25] w-[25]' />
                </View>
                <View className='flex-col w-full gap-2'>
                    <Skeleton className='h-[25] w-[300]' />
                    <Skeleton className='h-[25] w-[250]' />
                    <Skeleton className='h-[25] w-[350]' />
                </View>
                <View className='flex-row w-full items-center justify-between'>
                    <View className='flex-row gap-2'>
                        <Skeleton className='h-[35] w-[35] rounded-full' />
                        <View className='flex-col gap-2'>
                            <Skeleton className='h-[12] w-[100]' />
                            <Skeleton className='h-[12] w-[150]' />
                        </View>
                    </View>
                    <Skeleton className='h-[25] w-[25]' />
                </View>
                <Skeleton className='h-[300] w-full' />
                <Skeleton className='h-[25] w-full' />
                <Skeleton className='h-[250] w-full' />
                <Skeleton className='h-[15] w-full' />
                <Skeleton className='h-[15] w-full' />
                <Skeleton className='h-[15] w-full' />
                <Skeleton className='h-[15] w-full' />
                <Skeleton className='h-[15] w-full' />
                <Skeleton className='h-[15] w-full' />
                <Skeleton className='h-[15] w-full' />
                <Skeleton className='h-[15] w-full' />
                <Skeleton className='h-[15] w-full' />
                <Skeleton className='h-[15] w-full' />
                <Skeleton className='h-[15] w-full' />
            </View>
        </ScrollView>
    );
}