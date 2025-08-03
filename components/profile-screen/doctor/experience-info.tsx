import * as React from 'react';
import { View } from 'react-native';
import { Text } from '../../ui/text';
import SectionTitle from '../../home/common/section-title';
import { GlobalColor } from '../../../global-color';
import { getDiaTypeName } from '../../../assets/enum/dia-type';
import { Patient } from '../../../assets/types/user/patient';
import { DiagnosisRecency, getDiagnosisRecencyString } from '../../../assets/enum/diagnosis-recency';
import { Cross } from '../../../lib/icons/Cross';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart } from '../../../lib/icons/Heart';
import { Stethoscope } from '../../../lib/icons/Stethoscope';
import { Calendar } from '../../../lib/icons/Calendar';
import Tag from '../../common/tag';
import { Doctor } from '../../../assets/types/user/doctor';
import RoundedIcon from '../../common/icons/rouned-icon';
import { getDoctorRoleString } from '../../../assets/enum/doctor-role';

type Prop = {
    profile: Doctor
}

export default function ExperienceInfo({ profile }: Prop) {

    return (
        <View
            style={{ backgroundColor: GlobalColor.GREEN_NEON_BG }}
            className='flex-col gap-3 p-3 rounded-xl'
        >
            <View className='flex-row justify-between items-center gap-3'>
                <View className='flex-row gap-4 items-center'>
                    <View
                        style={{ backgroundColor: GlobalColor.GREEN_NEON_BORDER }}
                        className={`flex p-3 justify-center items-center rounded-full`}
                    >
                        <Stethoscope className='text-white' size={17} />
                    </View>
                    <View className='flex-col gap-1'>
                        <Text className='text-lg font-bold tracking-wider'>{getDoctorRoleString(profile.position)}</Text>
                        <Text className='text-sm text-[var(--fade-text-color)] tracking-wider'>Vị trí công việc</Text>
                    </View>
                </View>
                <Tag
                    background={GlobalColor.GREEN_NEON_BG}
                    textColor={GlobalColor.GREEN_NEON_BORDER}
                    text={`${profile.numberOfExperiences} năm KN`}
                    borderColor={GlobalColor.GREEN_NEON_BORDER}
                />
            </View>
            <Text className='text-base text-[var(--fade-text-color)] tracking-wider'>
                {profile.introduction}
            </Text>
        </View>
    );
}
