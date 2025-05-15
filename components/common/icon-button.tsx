import { Pressable, PressableProps } from 'react-native'

type Prop = PressableProps & {
    icon: React.ReactNode
    buttonSize: number
    possition: 'camera' | 'other'
}

export default function IconButton({ icon, buttonSize, possition, ...pressableProps }: Prop) {
    return (
        <Pressable
            className={`p-${buttonSize} items-center justify-center rounded-full ${possition == 'camera' ? 'active:bg-[var(--camera-click-bg)]' : 'active:bg-[var(--click-bg)]'}`}
            {...pressableProps}
        >
            {icon}
        </Pressable>
    )
}
