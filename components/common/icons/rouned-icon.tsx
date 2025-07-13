import { View } from "react-native"


type Prop = {
    background: string
    size: number
    icon: React.ReactNode
}

export default function RoundedIcon({ background, size, icon }: Prop) {
    return (
        <View
            style={{ backgroundColor: background }}
            className={`flex p-${size} justify-center items-center rounded-full`}
        >
            {icon}
        </View>
    )
}