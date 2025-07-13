import * as React from 'react';
import { View } from 'react-native';
import { Text } from '../ui/text';
import SectionTitle from '../home/common/section-title';
import { GlobalColor } from '../../global-color';
import { getDiaTypeName } from '../../assets/enum/dia-type';
import { Patient } from '../../assets/types/user/patient';
import { DiagnosisRecency, getDiagnosisRecencyString } from '../../assets/enum/diagnosis-recency';
import { Cross } from '../../lib/icons/Cross';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart } from '../../lib/icons/Heart';
import { Stethoscope } from '../../lib/icons/Stethoscope';
import { Calendar } from '../../lib/icons/Calendar';
import Tag from '../common/tag';

type Prop = {
    profile: Patient
}

export default function DiabetesInfo({ profile }: Prop) {

    return (
        <View
            style={{ backgroundColor: GlobalColor.PINK_NEON_BG }}
            className='flex-col gap-3 p-5'
        >
            <View className='flex-row justify-between items-center gap-3 rounded-lg'>
                <View className='flex-row gap-4 items-center'>
                    <LinearGradient
                        colors={['#f48fb1', '#ff4081', '#ec407a']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{ borderRadius: 10 }}
                        className="p-4"
                    >
                        <Cross className='text-white' size={17} />
                    </LinearGradient>
                    <View className='flex-col gap-2'>
                        <Text className='text-lg font-bold tracking-wider'>Loại tiểu đường</Text>
                        <Text className='text-sm text-[var(--fade-text-color)] tracking-wider'>Phân loại bệnh</Text>
                    </View>
                </View>
                <Tag
                    background={GlobalColor.PINK_NEON_BG}
                    textColor={GlobalColor.PINK_NEON_BORDER}
                    text={getDiaTypeName(profile.diabetesType)}
                    borderColor={GlobalColor.PINK_NEON_BORDER}
                />
            </View>
            <View className='flex-row gap-2 items-center'>
                <Calendar color={GlobalColor.INDIGO_NEON_BORDER} size={18} />
                <Text className='text-base font-bold tracking-wider'>
                    Chuẩn đoán&nbsp;
                    {profile.diagnosisInfo.diagnosisRecency == DiagnosisRecency.OVER_1_YEAR ?
                        `${profile.diagnosisInfo.year} năm trước` :
                        getDiagnosisRecencyString(profile.diagnosisInfo.diagnosisRecency)
                    }
                </Text>
            </View>
        </View>
    );
}
