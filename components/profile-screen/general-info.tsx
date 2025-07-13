import * as React from 'react'
import { View } from 'react-native'
import { Text } from '../ui/text'
import SectionTitle from '../home/common/section-title'
import { Activity } from '../../lib/icons/Activity'
import { GlobalColor } from '../../global-color'
import { DiaType } from '../../assets/enum/dia-type'
import { Patient } from '../../assets/types/user/patient'
import { getType2TreatmentMethodString, Type2TreatmentMethod } from '../../assets/enum/type-2-treatment-method'
import { getInsulinInjectionFrequencyString, InsulinInjectionFrequency } from '../../assets/enum/insulin-injection-frequency'
import { Stethoscope } from '../../lib/icons/Stethoscope'
import { Syringe } from '../../lib/icons/Syringe'
import { PencilLine } from '../../lib/icons/PencilLine'
import { getControlLevelInfo } from '../../assets/enum/control-level'
import { Dumbbell } from '../../lib/icons/Dumbbell'
import { ExerciseFrequency, getExerciseFrequencyString } from '../../assets/enum/exercise-frequency'
import { UtensilsCrossed } from '../../lib/icons/UtensilsCrossed'
import { EatingHabit, getEatingHabitString } from '../../assets/enum/eating-habit'
import RoundedIcon from '../common/icons/rouned-icon'
import { Beer } from '../../lib/icons/Beer'

type Prop = {
    profile: Patient
}

export default function GeneralInfo({ profile }: Prop) {

    const controlLevelInfo = profile.diabetesCondition.controlLevel !== undefined ? getControlLevelInfo(profile.diabetesCondition.controlLevel) : undefined

    const displayTreatment = profile.diabetesCondition.type2TreatmentMethod !== undefined
    const displayInsulinFrequency = ((
        profile.diabetesCondition.diabetesType == DiaType.TYPE_1 ||
        profile.diabetesCondition.type2TreatmentMethod == Type2TreatmentMethod.INSULIN_INJECTION) &&
        profile.diabetesCondition.insulinFrequency !== undefined
    )
    const displayControlLevel = profile.diabetesCondition.controlLevel !== undefined && controlLevelInfo !== undefined
    const displayExerciseFrequency = profile.diabetesCondition.exerciseFrequency !== undefined
    const displayEatingHabit = profile.diabetesCondition.eatingHabit !== undefined
    const displayTobacoAlcoholUsage = profile.diabetesCondition.usesAlcoholOrTobacco !== undefined

    return (
        <View className='flex-col items-center gap-4 px-2 py-3 bg-[var(--blog-bg)] rounded-lg'>
            <SectionTitle
                icon={<Activity color={GlobalColor.CYAN_NEON_BORDER} size={17} />}
                title={'Thông tin chung'}
            />
            {displayTreatment && (
                <View className='flex-row px-2 gap-3 items-center w-full'>
                    <RoundedIcon
                        background={GlobalColor.ORANGE_NEON_BG}
                        size={3}
                        icon={<Stethoscope color={GlobalColor.ORANGE_NEON_BORDER} size={17} />}
                    />
                    <View className='flex-col gap-1'>
                        <Text className='text-base font-semibold tracking-wider'>Phương pháp điều trị</Text>
                        <Text className='text-sm text-[var(--fade-text-color)] tracking-wider'>
                            {getType2TreatmentMethodString(profile.diabetesCondition.type2TreatmentMethod as Type2TreatmentMethod)}
                        </Text>
                    </View>
                </View>
            )}
            {displayInsulinFrequency && (
                <View className='flex-row px-2 gap-3 items-center w-full'>
                    <RoundedIcon
                        background={GlobalColor.PURPLE_NEON_BG}
                        size={3}
                        icon={<Syringe color={GlobalColor.PURPLE_NEON_BORDER} size={17} />}
                    />
                    <View className='flex-col gap-1'>
                        <Text className='text-base font-semibold tracking-wider'>Tần suất tiêm insulin</Text>
                        <Text className='text-sm text-[var(--fade-text-color)] tracking-wider'>
                            {getInsulinInjectionFrequencyString(profile.diabetesCondition.insulinFrequency as InsulinInjectionFrequency)}
                        </Text>
                    </View>
                </View>
            )}

            {displayControlLevel && (
                <View className='flex-row px-2 gap-3 items-center w-full'>
                    <RoundedIcon
                        background={GlobalColor.CYAN_NEON_BG}
                        size={3}
                        icon={<PencilLine color={GlobalColor.CYAN_NEON_BORDER} size={17} />}
                    />
                    <View className='flex-col gap-1'>
                        <Text className='text-base font-semibold tracking-wider'>Mức độ kiểm soát</Text>
                        <Text className='text-sm text-[var(--fade-text-color)] tracking-wider'>
                            {controlLevelInfo.percentage} -&nbsp;
                            <Text
                                style={{ color: controlLevelInfo.color }}
                                className='text-sm font-bold tracking-widest'
                            >
                                {controlLevelInfo.label}
                            </Text>
                        </Text>
                    </View>
                </View>
            )}

            {displayExerciseFrequency && (
                <View className="flex-row px-2 gap-3 items-center w-full">
                    <RoundedIcon
                        background={GlobalColor.BLUE_NEON_BG}
                        size={3}
                        icon={<Dumbbell color={GlobalColor.BLUE_NEON_BORDER} size={17} />}
                    />
                    <View className='flex-col gap-1'>
                        <Text className='text-base font-bold tracking-wider'>Tần suất tập thể dục</Text>
                        <Text className='text-sm text-[var(--fade-text-color)] tracking-wider'>
                            {getExerciseFrequencyString(profile.diabetesCondition.exerciseFrequency as ExerciseFrequency)}
                        </Text>
                    </View>
                </View>
            )}
            {displayEatingHabit && (
                <View className="flex-row px-2 gap-3 items-center w-full">
                    <RoundedIcon
                        background={GlobalColor.GREEN_NEON_BG}
                        size={3}
                        icon={<UtensilsCrossed color={GlobalColor.GREEN_NEON_BORDER} size={17} />}
                    />
                    <View className='flex-col gap-1'>
                        <Text className='text-base font-bold tracking-wider'>Chế độ ăn uống</Text>
                        <Text className='text-sm text-[var(--fade-text-color)] tracking-wider'>
                            {getEatingHabitString(profile.diabetesCondition.eatingHabit as EatingHabit)}
                        </Text>
                    </View>
                </View>
            )}
            {displayTobacoAlcoholUsage && (
                <View className="flex-row px-2 gap-3 items-center w-full">
                    <RoundedIcon
                        background={GlobalColor.YELLOW_NEON_BG}
                        size={3}
                        icon={<Beer color={GlobalColor.YELLOW_NEON_BORDER} size={17} />}
                    />
                    <View className='flex-col gap-1'>
                        <Text className='text-base font-bold tracking-wider'>Sử dụng cồn hoặc hút thuốc</Text>
                        <Text
                            style={{ color: profile.diabetesCondition.usesAlcoholOrTobacco ? GlobalColor.RED_NEON_BORDER : GlobalColor.GREEN_NEON_BORDER }}
                            className='text-sm  text-[var(--fade-text-color)] tracking-wider'
                        >
                            {profile.diabetesCondition.usesAlcoholOrTobacco ? 'Có sử dụng' : 'Không sử dụng'}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    )
}
