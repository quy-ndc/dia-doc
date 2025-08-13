import { router, Stack } from 'expo-router'
import HeaderTitle from '../../../components/common/header-title/header-title'
import IconButton from '../../../components/common/icon-button'
import { History } from '../../../lib/icons/History'

export default function ConsultLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="service-package-screen"
                options={{
                    headerTitle: () => <HeaderTitle mainText={'Gói tư vấn'} subText={'Chọn gói tư vấn phù hợp'} />,
                    headerShadowVisible: false,
                    headerRight: () =>
                        <IconButton
                            icon={<History className='text-foreground' size={17} />}
                            buttonSize={3}
                            possition={'other'}
                            onPress={() => router.push('/purchased-service-screen')}
                        />
                }}
            />
            <Stack.Screen
                name="purchased-service-screen"
                options={{
                    headerTitle: () => <HeaderTitle mainText={'Lịch sử giao dịch'} subText={'Các gói tư vấn đã mua'} />,
                    headerShadowVisible: false,
                }}
            />
            <Stack.Screen
                name="doctor-list-screen"
                options={{
                    headerTitle: () => <HeaderTitle mainText={'Danh sách bác sĩ'} subText={'Chọn bác sĩ phù hợp'} />,
                    headerShadowVisible: false,
                }}
            />
            <Stack.Screen
                name="doctor-schedule-screen"
                options={{ headerShadowVisible: false, }}
            />
            <Stack.Screen
                name="consultation-history-screen"
                options={{
                    headerShadowVisible: false,
                    headerTitle: 'Lịch tư vấn đã đặt'
                }}
            />
        </Stack>
    )
}
