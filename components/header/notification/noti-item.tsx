import * as React from 'react';
import { Dimensions, Modal, Pressable, ScrollView, View } from 'react-native';
import { useState } from 'react';
import { Text } from '../../ui/text'


export default function NotificationItem() {

    return (
        <Pressable className='px-4 py-3 w-full active:bg-[var(--click-bg)]'>
            <Text className="text-white">hahhaha</Text>
        </Pressable>
    );
}
