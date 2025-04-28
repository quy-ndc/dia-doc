import * as React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { Text } from '../../../components/ui/text';
import { Image } from 'expo-image'
import { formatDateDiagnose } from '../../../util/format-date-diagnose';
import BasicInfo from '../../../components/profile-screen/basic-info';
import IconButton from '../../../components/common/icon-button';
import { PencilLine } from '../../../lib/icons/PencilLine';
import { Phone } from '../../../lib/icons/Phone';
import { useRouter } from 'expo-router';


export default function ProfileScreen() {

    const router = useRouter()

    return (
        <ScrollView>
            <View className='flex-col gap-4 px-5'>
                <View className='flex-row justify-between items-center'>
                    <View className='flex-row gap-4 items-center px-4 py-4'>
                        <Image
                            style={{ width: 55, height: 55, borderRadius: 1000 }}
                            source={'https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604351/T_shirt_3_yrzyex.jpg'}
                            contentFit='cover'
                        />
                        <View className='flex-col gap-1'>
                            <Text className='text-xl font-bold tracking-wider'>Name of patient</Text>
                            <View className='flex-row gap-2 items-center'>
                                <Phone className='text-[--fade-text-color]' size={15} />
                                <Text className='text-base tracking-wider text-[--fade-text-color]'>0123456789</Text>
                            </View>
                        </View>
                    </View>
                    <IconButton
                        icon={<PencilLine className='text-foreground' size={20} />}
                        buttonSize={4}
                        possition={'other'}
                        onPress={() => router.push('/edit-profile-page')}
                    />
                </View>

                <View className='flex-col gap-6 p-5 bg-[var(--blog-bg)] rounded-lg'>
                    <Text className='text-2xl font-bold tracking-wider'>Loại tiểu đường</Text>
                    <View className='flex-row justify-between items-center'>
                        <Pressable className='px-7 py-3 rounded-lg bg-[var(--dia-type-bg)]'>
                            <Text className='text-white font-bold tracking-wider'>Loại 1</Text>
                        </Pressable>
                    </View>
                    <View className='flex-col gap-1'>
                        <Text className='text-xl font-bold tracking-wide'>Lần cuối chuẩn đoán</Text>
                        <Text className='text-sm text-[var(--fade-text-color)]'>{formatDateDiagnose('2025-02-17T16:19:20')}</Text>
                    </View>
                </View>

                <View className='flex-col gap-6 p-5 bg-[var(--blog-bg)] rounded-lg'>
                    <Text className='text-2xl font-bold tracking-wider'>Thông tin cơ bản</Text>
                    <View className='flex-col gap-5 items-center'>
                        <View className='flex-row w-full items-center'>
                            <BasicInfo title='Tuổi' value='40' />
                            <BasicInfo title='Giới tính' value='Nam' />
                        </View>
                        <View className='flex-row w-full items-center'>
                            <BasicInfo title='Cân nặng' value='50' unit='kg' />
                            <BasicInfo title='Chiều cao' value='160' unit='cm' />
                        </View>
                        <View className='flex-row w-full items-center'>
                            <BasicInfo title='BMI' value='25.5' />
                            <BasicInfo title='Nhóm máu' value='A+' />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
