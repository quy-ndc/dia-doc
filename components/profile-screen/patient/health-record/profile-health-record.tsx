import * as React from 'react'
import { Dimensions, Pressable, View } from "react-native"
import { GlobalColor } from "../../../../global-color"
import { FlashList } from '@shopify/flash-list'
import ProfileHealthRecordItem from './profile-health-record-item'
import SectionTitle from '../../../home/common/section-title'
import { Cross } from '../../../../lib/icons/Cross'
import { router } from 'expo-router'
import RoundedIcon from '../../../common/icons/rouned-icon'
import { Calendar } from '../../../../lib/icons/Calendar'
import { Text } from '../../../ui/text'
import { ChevronRight } from '../../../../lib/icons/ChevronRight'

const { width } = Dimensions.get('window')

export default function ProfileHealthRecord() {

    return (
        <View className='flex-col gap-1 py-2 px-3'>
            <SectionTitle
                icon={<Cross color={GlobalColor.EMERALD_NEON_BORDER} size={18} />}
                title='Theo dõi sức khỏe'
            />
            <View className='w-full'>
                <FlashList
                    data={[0, 1, 2, 3, 4]}
                    renderItem={({ item, index }) => (
                        <View className='my-1'>
                            <ProfileHealthRecordItem
                                key={index}
                                type={item}
                            />
                        </View>
                    )}
                    estimatedItemSize={10}
                />
                <Pressable
                    style={{ width: width * 0.93 }}
                    className={`flex-row items-center justify-between px-1 py-3 gap-2 rounded-xl active:bg-[var(--click-bg)] w-full`}
                    onPress={() => router.push('manage-care-plan-screen')}
                >
                    <View className='flex-row items-center gap-2'>
                        <RoundedIcon
                            background={GlobalColor.PINK_NEON_BG}
                            size={2}
                            icon={<Calendar color={GlobalColor.PINK_NEON_BORDER} size={17} />}
                        />
                        <Text className='text-base font-semibold tracking-wider capitalize'>
                            Quản lý lịch đo
                        </Text>
                    </View>
                    <ChevronRight className='text-foreground' size={17} />
                </Pressable>
            </View>
        </View>
    )
}
