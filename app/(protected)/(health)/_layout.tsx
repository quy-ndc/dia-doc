import { Stack } from 'expo-router'
import { View } from 'react-native'
import { Text } from '../../../components/ui/text'

export default function HealthLayout() {

    return (
        <Stack>
            <Stack.Screen name="update-record-screen" options={{ headerTitle: '', headerShadowVisible: false }} />
            <Stack.Screen name="health-record-history-screen" options={{ headerTitle: '', headerShadowVisible: false }} />
            <Stack.Screen
                name="manage-care-plan-screen"
                options={{
                    headerTitle: () =>
                        <View className='flex-col'>
                            <Text className='text-lg font-bold tracking-wider capitalize'>
                                Quản lý lịch trình
                            </Text>
                            <Text className='text-sm text-[var(--fade-text-color)] tracking-wider'>
                                Thay đổi lịch trình hằng ngày
                            </Text>
                        </View>,
                    headerShadowVisible: false
                }}
            />
            <Stack.Screen name="add-edit-care-plan-screen" options={{ headerTitle: '', headerShadowVisible: false }} />
        </Stack>
    )
}
