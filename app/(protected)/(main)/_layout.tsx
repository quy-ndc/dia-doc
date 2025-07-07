import { Tabs } from 'expo-router'
import { User } from '../../../lib/icons/User'
import { MessageCircleMore } from '../../../lib/icons/MessageCircleMore'
import HeaderRight from '../../../components/header/header-right'
import { Home } from '../../../lib/icons/Home'
import { Newspaper } from '../../../lib/icons/Newspaper'
import { Dimensions, Platform, useColorScheme } from 'react-native'
import { GlobalColor } from '../../../global-color'
import HomeHeaderBg from '../../../components/home/header/header-bg'
import HomeHeaderText from '../../../components/home/header/header-text'
import { Bot } from '../../../lib/icons/Bot'


const { height } = Dimensions.get('window')

export default function MainLayout() {

    return (
        <Tabs
            screenOptions={{
                headerStyle: {
                    shadowOpacity: 0,
                    elevation: 0,
                },
                tabBarStyle: {
                    height: Platform.OS == 'ios' ? height * 0.104 : height * 0.07,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: 400,
                    letterSpacing: 0.6
                },
                tabBarActiveBackgroundColor: GlobalColor.BLUE_NEON_BG,
                headerTitleStyle: {
                    fontWeight: 'bold',
                    letterSpacing: 1
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerTitle: '',
                    title: 'Trang Chủ',
                    tabBarIcon: () => <Home color={GlobalColor.BLUE_NEON_BORDER} size={17} />,
                    headerRight: () => <HeaderRight />,
                    headerBackground: () => <HomeHeaderBg />,
                    headerLeft: () => <HomeHeaderText />,
                    animation: 'shift',
                }}
            />
            <Tabs.Screen
                name="message-screen"
                options={{
                    headerTitle: 'Tin Nhắn',
                    title: 'Tin nhắn',
                    tabBarIcon: () => <MessageCircleMore color={GlobalColor.BLUE_NEON_BORDER} size={17} />,
                    headerRight: () => <HeaderRight />,
                    animation: 'shift'
                }}
            />
            <Tabs.Screen
                name="ai-chat-session-screen"
                options={{
                    headerTitle: 'Bác sỹ AI',
                    title: 'AI Chat',
                    tabBarIcon: () => <Bot color={GlobalColor.BLUE_NEON_BORDER} size={17} />,
                    headerRight: () => <HeaderRight />,
                    animation: 'shift'
                }}
            />
            <Tabs.Screen
                name="blog-screen"
                options={{
                    headerTitle: 'Bài Viết',
                    title: 'Bài viết',
                    tabBarIcon: () => <Newspaper color={GlobalColor.BLUE_NEON_BORDER} size={17} />,
                    headerRight: () => <HeaderRight />,
                    animation: 'shift',
                }}
            />
            <Tabs.Screen
                name="profile-screen"
                options={{
                    headerTitle: 'Hồ Sơ',
                    title: 'Hồ sơ',
                    tabBarIcon: () => <User color={GlobalColor.BLUE_NEON_BORDER} size={17} />,
                    headerRight: () => <HeaderRight />,
                    animation: 'shift'
                }}
            />
        </Tabs>
    )
}
