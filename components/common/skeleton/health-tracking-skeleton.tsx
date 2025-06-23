import * as React from 'react';
import { Skeleton } from '../../ui/skeleton';
import { View } from 'react-native';

export default function HealthTrackingSkeleton() {
    return (
        <View className="w-full px-3 py-4 flex-col gap-4 items-center">
            <View className="flex-row flex-wrap justify-between gap-y-4 w-full">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        className="w-[46%] h-[120px] rounded-xl"
                    />
                ))}
            </View>
        </View>
    );
}
