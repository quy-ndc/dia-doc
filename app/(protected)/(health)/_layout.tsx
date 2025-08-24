import { router, Stack } from 'expo-router'
import HeaderTitle from '../../../components/common/header-title/header-title'
import IconButton from '../../../components/common/icon-button'
import { Plus } from '../../../lib/icons/Plus'

export default function HealthLayout() {

    return (
        <Stack>
            <Stack.Screen name="update-record-screen" options={{ headerTitle: '', headerShadowVisible: false }} />
            <Stack.Screen name="health-record-history-screen" options={{ headerTitle: '', headerShadowVisible: false }} />

            <Stack.Screen
                name="manage-care-plan-screen"
                options={{
                    headerTitle: () => <HeaderTitle mainText='Quản lý lịch trình' subText='Thay đổi lịch trình hằng ngày' />,
                    headerShadowVisible: false,
                    headerRight: () =>
                        <IconButton
                            icon={<Plus className='text-foreground' size={18} />}
                            buttonSize={3}
                            possition={'other'}
                            onPress={() => router.push('add-edit-care-plan-screen')}
                        />
                }}
            />
            <Stack.Screen name="add-edit-care-plan-screen" options={{ headerTitle: '', headerShadowVisible: false }} />

            <Stack.Screen
                name="manage-today-care-plan-screen"
                options={{
                    headerTitle: () => <HeaderTitle mainText='Quản lý lịch ngày hôm nay' subText='Thay đổi lịch đo ngày hôm nay' />,
                    headerShadowVisible: false,
                    headerRight: () =>
                        <IconButton
                            icon={<Plus className='text-foreground' size={18} />}
                            buttonSize={3}
                            possition={'other'}
                            onPress={() => router.push('add-edit-today-care-plan-screen')}
                        />
                }}
            />
            <Stack.Screen name="add-edit-today-care-plan-screen" options={{ headerTitle: '', headerShadowVisible: false }} />
            <Stack.Screen name="health-record-guide-screen" options={{ headerTitle: '', headerShadowVisible: false }} />

            <Stack.Screen
                name="doctor-manage-care-plan-screen"
                options={{
                    headerTitle: () => <HeaderTitle mainText='Quản lý lịch trình' subText='Thay đổi lịch trình hằng ngày' />,
                    headerShadowVisible: false,
                    headerRight: () =>
                        <IconButton
                            icon={<Plus className='text-foreground' size={18} />}
                            buttonSize={3}
                            possition={'other'}
                            onPress={() => router.push('doctor-add-edit-care-plan-screen')}
                        />
                }}
            />
            <Stack.Screen name="doctor-add-edit-care-plan-screen" options={{ headerTitle: '', headerShadowVisible: false }} />

            <Stack.Screen
                name="doctor-manage-today-care-plan-screen"
                options={{
                    headerTitle: () => <HeaderTitle mainText='Quản lý lịch ngày hôm nay' subText='Thay đổi lịch đo ngày hôm nay' />,
                    headerShadowVisible: false,
                    headerRight: () =>
                        <IconButton
                            icon={<Plus className='text-foreground' size={18} />}
                            buttonSize={3}
                            possition={'other'}
                            onPress={() => router.push('doctor-add-edit-today-care-plan-screen')}
                        />
                }}
            />
            <Stack.Screen name="doctor-add-edit-today-care-plan-screen" options={{ headerTitle: '', headerShadowVisible: false }} />
        </Stack>
    )
}
