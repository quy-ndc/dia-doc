import * as React from 'react'
import { View, ScrollView, Pressable, RefreshControl, ActivityIndicator } from 'react-native'
import { Text } from '../../../components/ui/text'
import { Image } from 'expo-image'
import { formatDateDiagnose } from '../../../util/format-date-diagnose'
import BasicInfo from '../../../components/profile-screen/basic-info'
import IconButton from '../../../components/common/icon-button'
import { PencilLine } from '../../../lib/icons/PencilLine'
import { Phone } from '../../../lib/icons/Phone'
import { useRouter } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { useUserProfile } from '../../../service/query/user-query'
import { useCallback, useState } from 'react'
import { Patient } from '../../../assets/types/user/patient'
import { getAge } from '../../../util/getAge'
import { getGenderString } from '../../../assets/enum/gender'
import { getBloodTypeString } from '../../../assets/enum/blood'
import SpinningIcon from '../../../components/common/icons/spinning-icon'
import { Loader } from '../../../lib/icons/Loader'
import { calculateBMI } from '../../../util/calculate-bmi'
import { RefreshCcw } from '../../../lib/icons/RefreshCcw'


export default function ProfileScreen() {

    const router = useRouter()
    const [refreshing, setRefreshing] = useState(false)

    const { data, isLoading, remove, refetch, isError } = useQuery(useUserProfile())

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        remove()
        refetch().finally(() => setRefreshing(false))
    }, [refetch])

    const profile: Patient | undefined = data?.data?.value?.data?.patient ?? undefined

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center">
                <SpinningIcon icon={<Loader className='text-foreground' size={25} />} />
            </View>
        )
    }

    if (!profile) {
        return (
            <ScrollView
                className="flex-1 w-full"
                contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View className="flex-col gap-2 items-center">
                    <Text className="text-muted-foreground text-lg font-semibold italic tracking-wider">
                        Không thể lấy hồ sơ người dùng
                    </Text>
                    <Pressable
                        className="flex-row gap-3 items-center px-4 py-2 rounded-full active:bg-[var(--click-bg)]"
                        onPress={onRefresh}
                    >
                        <Text className="text-foreground text-base font-semibold tracking-wider capitalize">Thử lại</Text>
                        {refreshing ? (
                            <SpinningIcon icon={<RefreshCcw className="text-foreground" size={15} />} />
                        ) : (
                            <RefreshCcw className="text-foreground" size={15} />
                        )}
                    </Pressable>
                </View>
            </ScrollView>
        )
    }

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <View className='flex-col gap-4 px-5'>
                <View className='flex-row justify-between items-center'>
                    <View className='flex-row gap-4 items-center px-4 py-4'>
                        <Image
                            style={{ width: 55, height: 55, borderRadius: 1000 }}
                            source={profile.user.avatar.publicUrl}
                            contentFit='cover'
                        />
                        <View className='flex-col gap-1'>
                            <Text className='text-xl font-bold tracking-wider'>{profile.user.fullName}</Text>
                            {/* <View className='flex-row gap-2 items-center'>
                                <Phone className='text-[--fade-text-color]' size={15} />
                                <Text className='text-base tracking-wider text-[--fade-text-color]'>0123456789</Text>
                            </View> */}
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
                    <Text className='text-xl font-bold tracking-wider'>Loại tiểu đường</Text>
                    <View className='flex-row justify-between items-center'>
                        <Pressable className='px-5 py-2 rounded-lg bg-[var(--dia-type-bg)]'>
                            <Text className='text-white text-lg font-bold tracking-wider'>Loại 1</Text>
                        </Pressable>
                    </View>
                    {/* <View className='flex-col gap-1'>
                        <Text className='text-xl font-bold tracking-wide'>Lần cuối chuẩn đoán</Text>
                        <Text className='text-sm text-[var(--fade-text-color)]'>{formatDateDiagnose('2025-02-17T16:19:20')}</Text>
                    </View> */}
                </View>

                <View className='flex-col gap-6 p-5 bg-[var(--blog-bg)] rounded-lg'>
                    <Text className='text-xl font-bold tracking-wider'>Thông tin cơ bản</Text>
                    <View className='flex-col gap-5 items-center'>
                        <View className='flex-row w-full items-center'>
                            <BasicInfo title='Tuổi' value={getAge('2010-08-22T00:00:00.000Z')} />
                            <BasicInfo title='Giới tính' value={getGenderString(profile.gender)} />
                        </View>
                        <View className='flex-row w-full items-center'>
                            <BasicInfo title='Cân nặng' value={profile.weight.toString()} unit='kg' />
                            <BasicInfo title='Chiều cao' value={profile.height.toString()} unit='cm' />
                        </View>
                        <View className='flex-row w-full items-center'>
                            <BasicInfo title='BMI' value={calculateBMI(profile.weight, profile.height).toString()} />
                            <BasicInfo title='Nhóm máu' value={getBloodTypeString(profile.bloodType)} />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
