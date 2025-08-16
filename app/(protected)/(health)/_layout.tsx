import { Stack } from 'expo-router'
import HeaderTitle from '../../../components/common/header-title/header-title'

export default function HealthLayout() {

    return (
        <Stack>
            <Stack.Screen name="update-record-screen" options={{ headerTitle: '', headerShadowVisible: false }} />
            <Stack.Screen name="health-record-history-screen" options={{ headerTitle: '', headerShadowVisible: false }} />
            <Stack.Screen
                name="manage-care-plan-screen"
                options={{
                    headerTitle: () => <HeaderTitle mainText='Quản lý lịch trình' subText='Thay đổi lịch trình hằng ngày' />,
                    headerShadowVisible: false
                }}
            />
            <Stack.Screen name="add-edit-care-plan-screen" options={{ headerTitle: '', headerShadowVisible: false }} />
            <Stack.Screen name="health-record-guide-screen" options={{ headerTitle: '', headerShadowVisible: false }} />            
        </Stack>
    )
}
