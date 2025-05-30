import * as React from 'react'
import { View, ScrollView, Pressable, RefreshControl } from 'react-native'
import { Text } from '../../../components/ui/text'
import { Image } from 'expo-image'
import BasicInfo from '../../../components/profile-screen/basic-info'
import IconButton from '../../../components/common/icon-button'
import { PencilLine } from '../../../lib/icons/PencilLine'
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
import { getDiaTypeName } from '../../../assets/enum/dia-type'
import { Heart } from '../../../lib/icons/Heart'
import { LinearGradient } from 'expo-linear-gradient'
import { LineChart } from '../../../lib/icons/ChartLine'
import { GlobalColor } from '../../../global-color'
import { Calendar } from '../../../lib/icons/Calendar'
import { User } from '../../../lib/icons/User'
import { Weight } from '../../../lib/icons/Weight'
import { Ruler } from '../../../lib/icons/Ruler'
import { TrendingUp } from '../../../lib/icons/TrendingUp'
import { Droplet } from '../../../lib/icons/Droplet'
import useUserStore from '../../../store/userStore'
import { UserRole } from '../../../assets/enum/user-role'


export default function ProfileScreen() {

    const router = useRouter()
    const { user } = useUserStore()
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

    if (!profile || isError) {
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
                            <Text className='text-base text-[--fade-text-color] tracking-wider capitalize'>{user.role == UserRole.PATIENT ? 'Bệnh nhân tiểu đường' : 'Bác sĩ'}</Text>
                        </View>
                    </View>
                    <IconButton
                        icon={<PencilLine className='text-foreground' size={20} />}
                        buttonSize={4}
                        possition={'other'}
                        onPress={() => router.push('/edit-profile-page')}
                    />
                </View>

                <View className='flex-row justify-between items-center gap-3 p-5 bg-[var(--blog-bg)] rounded-lg'>
                    <View className='flex-row gap-4 items-center'>
                        <LinearGradient
                            colors={['#f48fb1', '#ff4081', '#ec407a']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={{ borderRadius: 4 }}
                            className="p-4"
                        >
                            <Heart className='text-white' size={22} />
                        </LinearGradient>
                        <View className='flex-col gap-2'>
                            <Text className='text-lg font-bold tracking-wider'>Loại tiểu đường</Text>
                            <Text className='text-sm text-[var(--fade-text-color)] tracking-wider'>Phân loại bệnh</Text>
                        </View>
                    </View>
                    <Text
                        style={{
                            backgroundColor: GlobalColor.PINK_NEON_BG,
                            color: GlobalColor.PINK_NEON_BORDER,
                            borderColor: GlobalColor.PINK_NEON_BORDER
                        }}
                        className={`text-center text-sm font-semibold px-4 py-1 border rounded-full tracking-wider capitalize`}
                    >
                        {getDiaTypeName(profile.diabetesType)}
                    </Text>
                </View>

                <View className='flex-col gap-6 p-5 bg-[var(--blog-bg)] rounded-lg'>
                    <View className='flex-row gap-2 items-center'>
                        <LineChart className='text-[var(--main-color)]' size={20} />
                        <Text className='text-lg font-bold tracking-wider'>Thông tin cơ bản</Text>
                    </View>
                    <View className='flex-col gap-6 items-center'>
                        <View className='flex-row w-full items-center'>
                            <BasicInfo
                                backgroundColor={GlobalColor.GREEN_NEON_BG}
                                icon={<Calendar color={GlobalColor.GREEN_NEON_BORDER} size={20} />}
                                title='Tuổi'
                                value={getAge(profile.dateOfBirth)}
                            />
                            <BasicInfo
                                backgroundColor={GlobalColor.PURPLE_NEON_BG}
                                icon={<User color={GlobalColor.PURPLE_NEON_BORDER} size={20} />}
                                title='Giới tính'
                                value={getGenderString(profile.gender)}
                            />
                        </View>
                        <View className='flex-row w-full items-center'>
                            <BasicInfo
                                backgroundColor={GlobalColor.YELLOW_NEON_BG}
                                icon={<Weight color={GlobalColor.YELLOW_NEON_BORDER} size={20} />}
                                title='Cân nặng'
                                value={profile.weight.toString()}
                                unit='kg'
                            />
                            <BasicInfo
                                backgroundColor={GlobalColor.BLUE_NEON_BG}
                                icon={<Ruler color={GlobalColor.BLUE_NEON_BORDER} size={20} />}
                                title='Chiều cao'
                                value={profile.height.toString()}
                                unit='cm'
                            />
                        </View>
                        <View className='flex-row w-full items-center'>
                            <BasicInfo
                                backgroundColor={GlobalColor.ORANGE_NEON_BG}
                                icon={<TrendingUp color={GlobalColor.ORANGE_NEON_BORDER} size={20} />}
                                title='BMI'
                                value={calculateBMI(profile.weight, profile.height).toString()}
                            />
                            <BasicInfo
                                backgroundColor={GlobalColor.RED_NEON_BG}
                                icon={<Droplet color={GlobalColor.RED_NEON_BORDER} size={20} />}
                                title='Nhóm máu'
                                value={getBloodTypeString(profile.bloodType)}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
