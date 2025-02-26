import { Text } from '~/components/ui/text'
import { MessageSquareText } from '~/lib/icons/MessageSquareText';
import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';

type Prop = {
    avatar: string
    title: string
    name: string
    images: string[]
    liked: boolean
    detail?: boolean
}

export default function CommentButton({ avatar, title, name, images, liked, detail }: Prop) {

    const router = useRouter()

    const onClick = () => {
        router.push({
            pathname: '/blog-detail-screen',
            params: {
                avatar: avatar,
                title: title,
                name: name,
                images: JSON.stringify(images),
                liked: liked.toString()
            }
        })
    }

    return (
        <Pressable
            className={
                `flex-row gap-3 items-center px-4 py-2 rounded-lg
                ${detail ?
                    'active:bg-[var(--detail-click-bg)]' :
                    'active:bg-[var(--click-bg)]'}`
            }
            onPress={onClick}
        >
            <MessageSquareText className={detail ? `text-white` : `text-foreground`} size={17} />
            <Text className={`text-base font-bold ${detail && 'text-white'}`}>20</Text>
        </Pressable>
    );
}