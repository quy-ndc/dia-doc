import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { Pressable, RefreshControl, ScrollView, useColorScheme, View } from 'react-native'
import { Image } from 'expo-image'
import { Text } from '../../../components/ui/text'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { truncateText } from '../../../util/truncate-text'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useCreateBookingMutation, useDoctorByIdQuery, useDoctorScheduleQuery } from '../../../service/query/user-query'
import { FlashList } from '@shopify/flash-list'
import { DoctorSchedule, DoctorScheduleTime } from '../../../assets/types/consult/doctor-schedule'
import DoctorScheduleItem from '../../../components/doctor-schedule-screen/doctor-schedule-item'
import DoctorScheduleSkeleton from '../../../components/common/skeleton/doctor-schedule-skeleton'
import ErrorDisplay from '../../../components/common/error-display'
import ScheduleTimeStamp from '../../../components/doctor-schedule-screen/schedule-time-stamp'
import { Check } from '../../../lib/icons/Check'
import SpinningIcon from '../../../components/common/icons/spinning-icon'
import { Loader } from '../../../lib/icons/Loader'
import { Dimensions } from 'react-native'
import { getDoctorRoleString } from '../../../assets/enum/doctor-role'
import { getYearOfExpDisplay } from '../../../assets/data/year-of-exp'
import SectionTitle from '../../../components/home/common/section-title'
import { User } from '../../../lib/icons/User'
import { Doctor } from '../../../assets/types/user/doctor'
import RenderHTML from 'react-native-render-html'
import { GlobalColor } from '../../../global-color'
import ProfileSkeleton from '../../../components/common/skeleton/profile-skeleton'
import MonthPicker from '../../../components/doctor-schedule-screen/month-picker'

const { height, width } = Dimensions.get('window')

const getCurrentMonthISO = () => {
    const date = new Date()
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export default function DoctorScheduleScreen() {

    const { id, name, avatar, phone, possition, exp } = useLocalSearchParams()
    const theme = useColorScheme()
    const [refreshing, setRefreshing] = useState(false)

    const [choosenTimeStamp, setChoosenTimeStamp] = useState('')
    const [choosenTime, setChoosenTime] = useState('')
    const [choosenMonth, setChoosenMonth] = useState(getCurrentMonthISO())
    const textColor = theme == 'dark' ? GlobalColor.LIGHT_THEME_COL : GlobalColor.DARK_THEME_COL

    const { data, isError, refetch, remove, isLoading } = useQuery({
        ...useDoctorScheduleQuery({
            doctorId: id as string,
            Month: choosenMonth
        }),
        keepPreviousData: false,
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000)
    })

    const {
        mutateAsync,
        data: bookingData,
        isLoading: bookingLoading
    } = useCreateBookingMutation()

    const {
        data: doctorData,
        isLoading: doctorLoading,
        refetch: refetchDoctor,
        remove: removeDoctor
    } = useQuery({
        ...useDoctorByIdQuery(id as string),
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000)
    })

    const handleBooking = async () => {
        await mutateAsync({
            doctorId: id as string,
            templateId: choosenTime
        })
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        removeDoctor()
        remove()
        Promise.all([
            refetch(),
            refetchDoctor()
        ]).finally(() => setRefreshing(false))
    }, [remove, refetch, refetchDoctor])

    const allItems: DoctorSchedule[] = data?.data?.data?.items || []
    const timeStamp: DoctorScheduleTime[] = allItems.length === 0 || allItems[0] === undefined ? [] : allItems.find(item => item.date === choosenTimeStamp)?.consultationTemplates || []
    const doctor: Doctor = doctorData?.data?.data || undefined

    const expDisplay = getYearOfExpDisplay(Number(exp))

    useEffect(() => {
        if (isError || allItems.length === 0 || !allItems[0]) return
        setChoosenTimeStamp(allItems[0].date)
    }, [data])

    useEffect(() => {
        if (!bookingData || bookingData.status !== 200) return
        router.push('/')
    }, [bookingData, bookingLoading])

    return (
        <>
            <Stack.Screen options={{ headerTitle: truncateText(`Lịch hẹn của ${name}`, 25) }} />
            <View className='flex-1 relative'>
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    <View className='flex-col gap-4 w-full'>
                        {doctorLoading ? (
                            <ProfileSkeleton />
                        ) : (
                            <>
                                <View className='flex-row gap-2 px-2'>
                                    <Image
                                        source={avatar as string}
                                        style={{ width: 80, height: 80, borderRadius: 100 }}
                                    />
                                    <View className='flex-col gap-1'>
                                        <Text className='text-lg font-bold tracking-wider'>{name}</Text>
                                        <Text className='text-base text-[var(--fade-text-color)] tracking-wider'>{getDoctorRoleString(Number(possition))}</Text>
                                        <Text
                                            style={{ color: expDisplay.borderColor }}
                                            className='text-base tracking-wider'
                                        >
                                            {exp} năm kinh nghiệm
                                        </Text>
                                    </View>
                                </View>
                                {doctor !== undefined && (
                                    <View className='flex-col gap-2 w-full px-2'>
                                        <View className='flex-row gap-2 items-center'>
                                            <User className='text-foreground' size={17} />
                                            <Text className='text-base font-bold tracking-wider'>Giới thiệu</Text>
                                        </View>
                                        <RenderHTML
                                            contentWidth={width}
                                            source={{ html: doctor?.introduction }}
                                            baseStyle={{
                                                color: textColor,
                                                letterSpacing: 0.3
                                            }}
                                            tagsStyles={{
                                                img: { width: width * 0.95, aspectRatio: 16 / 9, resizeMode: 'cover', borderRadius: 10, alignSelf: 'center' },
                                                h1: { fontSize: 22, fontWeight: 'bold', marginVertical: 8 },
                                                h2: { fontSize: 18, fontWeight: 'semibold', marginVertical: 6 },
                                                p: { fontSize: 15, marginVertical: 4, lineHeight: 22 },
                                                ul: { marginVertical: 4 },
                                                ol: { marginVertical: 4 },
                                                li: { marginLeft: 10, marginBottom: 4 },
                                                em: { fontStyle: 'italic', fontWeight: 'semibold' },
                                            }}
                                        />
                                    </View>
                                )}
                            </>
                        )}

                        <View className='w-full items-center justify-center'>
                            <MonthPicker
                                choosenMonth={choosenMonth.split('-')[1].replace(/^0/, '')}
                                setChoosenMonth={(month) => {
                                    const year = new Date().getFullYear()
                                    setChoosenMonth(`${year}-${month.padStart(2, '0')}`)
                                }}
                            />
                        </View>

                        {isLoading ? (
                            <DoctorScheduleSkeleton />
                        ) : isError || allItems.length === 0 || allItems[0] == undefined ? (
                            <View
                                style={{ height: height * 0.6 }}
                                className='flex items-center justify-center'
                            >
                                <ErrorDisplay
                                    onRefresh={onRefresh}
                                    refreshing={refreshing}
                                    text="Không có lịch hẹn"
                                />
                            </View>
                        ) : (
                            <>
                                <View className='px-2'>
                                    <FlashList<DoctorSchedule>
                                        data={allItems}
                                        keyExtractor={(_, index) => index.toString()}
                                        renderItem={({ item }) =>
                                            <View className='mx-2'>
                                                <DoctorScheduleItem
                                                    item={item}
                                                    choosen={choosenTimeStamp == item.date}
                                                    setChoosenTimeStamp={setChoosenTimeStamp}
                                                    setChoosenTime={setChoosenTime}
                                                />
                                            </View>
                                        }
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        estimatedItemSize={100}
                                        scrollEventThrottle={16}
                                        onEndReachedThreshold={0.5}
                                        extraData={choosenTimeStamp}
                                    />
                                    <Text className='text-lg font-bold tracking-wider px-2'>
                                        Các khung giờ hẹn
                                    </Text>
                                    <FlashList<DoctorScheduleTime>
                                        data={timeStamp}
                                        keyExtractor={(_, index) => index.toString()}
                                        renderItem={({ item }) =>
                                            <View className='m-2'>
                                                <ScheduleTimeStamp
                                                    item={item}
                                                    choosen={choosenTime == item.id}
                                                    setChoosenTime={setChoosenTime}
                                                />
                                            </View>
                                        }
                                        numColumns={2}
                                        showsHorizontalScrollIndicator={false}
                                        estimatedItemSize={100}
                                        scrollEventThrottle={16}
                                        onEndReachedThreshold={0.5}
                                        extraData={choosenTime}
                                    />
                                    <Pressable
                                        className={`flex-row gap-2 px-4 py-3 mt-5 items-center justify-center rounded-full bg-[var(--oppo-theme-col)] active:opacity-80 ${choosenTime == '' || bookingLoading ? 'opacity-50' : ''}`}
                                        disabled={choosenTime == '' || bookingLoading}
                                        onPress={handleBooking}
                                    >
                                        {bookingLoading ? (
                                            <SpinningIcon icon={<Loader className='text-[var(--same-theme-col)]' size={17} />} />
                                        ) : (
                                            <Check className='text-[var(--same-theme-col)]' size={17} />
                                        )}
                                        <Text className='text-[var(--same-theme-col)] text-base font-bold tracking-wider'>
                                            Đặt lịch hẹn
                                        </Text>
                                    </Pressable>
                                </View>
                            </>
                        )}
                    </View>
                </ScrollView>
            </View>
        </>
    )
}
