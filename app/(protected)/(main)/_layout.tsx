import { Tabs } from 'expo-router'
import { User } from '../../../lib/icons/User'
import { MessageCircleMore } from '../../../lib/icons/MessageCircleMore'
import HeaderRight from '../../../components/header/header-right'
import { Home } from '../../../lib/icons/Home'
import { Newspaper } from '../../../lib/icons/Newspaper'
import { Dimensions, Platform, useColorScheme } from 'react-native'
import { GlobalColor } from '../../../global-color'


const { height } = Dimensions.get('window')

export default function MainLayout() {

    const theme = useColorScheme()

    const tabBarActiveBg = theme == 'dark' ? GlobalColor.TAB_BAR_ACTIVE_BG_DARK : GlobalColor.TAB_BAR_ACTIVE_BG_LIGHT

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
                    fontSize: 12,
                    fontWeight: 400,
                    letterSpacing: 0.6
                },
                tabBarActiveBackgroundColor: tabBarActiveBg,
                headerTitleStyle: {
                    fontWeight: 'bold',
                    letterSpacing: 1
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerTitle: 'Trang Chủ',
                    title: 'Trang Chủ',
                    tabBarIcon: () => <Home className='text-[var(--quick-access-icon-color)]' size={20} />,
                    headerRight: () => <HeaderRight />,
                    animation: 'shift'

                }}
            />
            <Tabs.Screen
                name="message-screen"
                options={{
                    headerTitle: 'Tin Nhắn',
                    title: 'Tin nhắn',
                    tabBarIcon: () => <MessageCircleMore className='text-[var(--quick-access-icon-color)]' size={20} />,
                    headerRight: () => <HeaderRight />,
                    animation: 'shift'
                }}
            />
            <Tabs.Screen
                name="blog-screen"
                options={{
                    headerTitle: 'Bài Viết',
                    title: 'Bài viết',
                    tabBarIcon: () => <Newspaper className='text-[var(--quick-access-icon-color)]' size={20} />,
                    headerRight: () => <HeaderRight />,
                    animation: 'shift',
                }}
            />
            <Tabs.Screen
                name="profile-screen"
                options={{
                    headerTitle: 'Hồ Sơ',
                    title: 'Hồ sơ',
                    tabBarIcon: () => <User className='text-[var(--quick-access-icon-color)]' size={20} />,
                    headerRight: () => <HeaderRight />,
                    animation: 'shift'
                }}
            />
        </Tabs>
    )
}
