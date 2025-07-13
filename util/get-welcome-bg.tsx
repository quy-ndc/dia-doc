import { useColorScheme } from 'react-native'
import { GlobalColor } from '../global-color'
import { Sun } from '../lib/icons/Sun'
import { Haze } from '../lib/icons/Haze'
import { Moon } from '../lib/icons/Moon'
import { TimeOfDay, welcomeMessages } from '../assets/data/welcome-message'

export function useWelcomeGradientColors(): {
    text: string
    message: string
    colors: [string, string, ...string[]]
    altColors: [string, string, ...string[]]
    icon: React.ReactNode
} {
    const theme = useColorScheme()
    const resolvedTheme = theme === 'dark' ? 'dark' : 'light'

    const hour = new Date().getHours()

    let timeOfDay: TimeOfDay
    if (hour >= 6 && hour < 12) {
        timeOfDay = 'morning'
    } else if (hour >= 12 && hour < 18) {
        timeOfDay = 'dawn'
    } else {
        timeOfDay = 'night'
    }

    const colors: Record<TimeOfDay, Record<'light' | 'dark', [string, string, string]>> = {
        morning: {
            light: [
                GlobalColor.MORNING_WELCOME_1_LIGHT,
                GlobalColor.MORNING_WELCOME_2_LIGHT,
                GlobalColor.MORNING_WELCOME_3_LIGHT,
            ],
            dark: [
                GlobalColor.MORNING_WELCOME_1_DARK,
                GlobalColor.MORNING_WELCOME_2_DARK,
                GlobalColor.MORNING_WELCOME_3_DARK,
            ],
        },
        dawn: {
            light: [
                GlobalColor.DAWN_WELCOME_1_LIGHT,
                GlobalColor.DAWN_WELCOME_2_LIGHT,
                GlobalColor.DAWN_WELCOME_3_LIGHT,
            ],
            dark: [
                GlobalColor.DAWN_WELCOME_1_DARK,
                GlobalColor.DAWN_WELCOME_2_DARK,
                GlobalColor.DAWN_WELCOME_3_DARK,
            ],
        },
        night: {
            light: [
                GlobalColor.NIGHT_WELCOME_1_LIGHT,
                GlobalColor.NIGHT_WELCOME_2_LIGHT,
                GlobalColor.NIGHT_WELCOME_3_LIGHT,
            ],
            dark: [
                GlobalColor.NIGHT_WELCOME_1_DARK,
                GlobalColor.NIGHT_WELCOME_2_DARK,
                GlobalColor.NIGHT_WELCOME_3_DARK,
            ],
        },
    }

    const greetings: Record<TimeOfDay, string> = {
        morning: 'Chào buổi sáng',
        dawn: 'Chào buổi chiều',
        night: 'Chào buổi tối',
    }

    const icons: Record<TimeOfDay, React.ReactNode> = {
        morning: <Sun size={17} className="text-foreground" />,
        dawn: <Haze size={17} className="text-foreground" />,
        night: <Moon size={17} className="text-foreground" />,
    }

    const edgeColor = resolvedTheme === 'light' ? GlobalColor.WELCON_LIGHT : GlobalColor.WELCON_DARK

    const messageList = welcomeMessages[timeOfDay]
    const randomMessage = messageList[Math.floor(Math.random() * messageList.length)]

    const baseColors = colors[timeOfDay][resolvedTheme]
    const reversedColors = [...baseColors].reverse() as [string, string, string]

    return {
        text: greetings[timeOfDay],
        message: randomMessage,
        colors: [edgeColor, ...baseColors, edgeColor],
        altColors: [edgeColor, ...reversedColors, edgeColor],
        icon: icons[timeOfDay],
    }
}