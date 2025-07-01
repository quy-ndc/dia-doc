import * as React from 'react'
import { Dimensions, View } from 'react-native'
import { Text } from '../../ui/text'
import SectionTitle from '../common/section-title'
import { GlobalColor } from '../../../global-color'
import { Calendar } from '../../../lib/icons/Calendar'
import { HealthCarePlan } from '../../../assets/types/user/healthcare-plan'
import IconButton from '../../common/icon-button'
import { ChevronRight } from '../../../lib/icons/ChevronRight'
import { FlashList } from '@shopify/flash-list'
import HealthcarePlanItem from './healthcare-plan-item'

const { width, height } = Dimensions.get('window')

type Prop = {
    items: HealthCarePlan[]
}

export default function HealthcarePlan({ items }: Prop) {

    return (
        <View
            style={{ width: width * 0.95 }}
            className='flex-col items-center'
        >
            <View className="flex-row w-full px-2 justify-between items-center">
                <View className='flex-row gap-3 items-center text-center'>
                    <Calendar color={GlobalColor.PURPLE_NEON_BORDER} size={18} />
                    <Text className='text-lg mb-1 font-bold tracking-widest capitalize'>Lịch chăm sóc sức khỏe</Text>
                </View>
                <IconButton
                    icon={<ChevronRight className="text-foreground" size={17} />}
                    buttonSize={2}
                    possition={"other"}
                />
            </View>

            <View className='w-full px-1'>
                <FlashList<HealthCarePlan>
                    data={items}
                    renderItem={({ item }) => (
                        <HealthcarePlanItem item={item} />
                    )}
                    estimatedItemSize={100}
                />
            </View>
        </View>
    )
}
