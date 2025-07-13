import { Text } from '../../components/ui/text'

type Prop = {
    background: string
    textColor: string
    text: string
    borderColor?: string | null
}

export default function Tag({ background, textColor, text, borderColor = null }: Prop) {
    return (
        <Text
            style={{ 
                backgroundColor: background, 
                color: textColor,
                ...(borderColor && { borderColor, borderWidth: 1 })
            }}
            className={`px-4 py-1 rounded-full text-sm font-semibold tracking-wider ${borderColor ? 'border' : ''}`}
        >
            {text}
        </Text>
    )
}