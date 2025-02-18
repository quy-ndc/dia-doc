import { Tabs, useRouter } from 'expo-router';
import { User } from '~/lib/icons/User';
import { MessageCircleMore } from '~/lib/icons/MessageCircleMore';
import HeaderRight from '~/components/header/header-right';
import { useEffect } from 'react';
import { Home } from '~/lib/icons/Home';
import { Newspaper } from '~/lib/icons/Newspaper';
import { useColorScheme } from 'react-native';
import { GetGlobalColor, GlobalColor } from '~/global-color';

export default function MainLayout() {

    const theme = useColorScheme()

    const router = useRouter()

    // useEffect(() => {
    //     router.push('/authen-screen')
    // })

    const tabBarActiveBg = theme == 'dark' ? GetGlobalColor(GlobalColor.TAB_BAR_ACTIVE_BG_DARK) : GetGlobalColor(GlobalColor.TAB_BAR_ACTIVE_BG_LIGHT)

    return (
        <Tabs
            screenOptions={{
                headerStyle: {
                    shadowOpacity: 0,
                    elevation: 0,
                },
                tabBarStyle: {
                    height: 60
                },
                tabBarLabelStyle: {
                    fontSize: 13,
                    fontWeight: 400,
                    letterSpacing: 0.6
                },
                tabBarActiveBackgroundColor: tabBarActiveBg!.value,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerTitle: 'Trang chủ',
                    title: 'Trang chủ',
                    tabBarIcon: () => <Home className='text-[var(--quick-access-icon-color)]' size={22} />,
                    headerRight: () => <HeaderRight />,
                    animation: 'shift'
                }}
            />
            <Tabs.Screen
                name="message-screen"
                options={{
                    headerTitle: 'Tin nhắn',
                    title: 'Tin nhắn',
                    tabBarIcon: () => <MessageCircleMore className='text-[var(--quick-access-icon-color)]' size={22} />,
                    headerRight: () => <HeaderRight />,
                    animation: 'shift'
                }}
            />
            <Tabs.Screen
                name="blog-screen"
                options={{
                    headerTitle: 'Bài viết',
                    title: 'Bài viết',
                    tabBarIcon: () => <Newspaper className='text-[var(--quick-access-icon-color)]' size={22} />,
                    headerRight: () => <HeaderRight />,
                    animation: 'shift'
                }}
            />
            <Tabs.Screen
                name="profile-screen"
                options={{
                    headerTitle: 'Hồ sơ',
                    title: 'Hồ sơ',
                    tabBarIcon: () => <User className='text-[var(--quick-access-icon-color)]' size={22} />,
                    headerRight: () => <HeaderRight />,
                    animation: 'shift'
                }}
            />
        </Tabs>
    );
}
