import { Text } from '../../../components/ui/text'
import { View } from 'react-native'
import { Image } from 'expo-image'
import { formatDateBlog } from '../../../util/format-date-post'

export default function BlogComment() {

    return (
        <View className="flex-row">
            <Image
                style={{ width: 35, height: 35, borderRadius: 1000 }}
                source={'https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604351/T_shirt_3_yrzyex.jpg'}
                contentFit="cover"
            />
            <View className='flex-col gap-2 pl-5 pr-10'>
                <View className="flex-col gap-[0.5]">
                    <Text className="text-base font-bold tracking-wider">Commenter name</Text>
                    <Text className="text-sm tracking-wider text-[var(--fade-text-color)]">{formatDateBlog('2025-02-17T16:19:20')}</Text>
                </View>
                <Text className='text-base tracking-wider'>The content of the comment of i jeihefuh euhsui h feuseh fusheoaej iaj oej sjfsej fosije fisje i awh auwhe auwawhd auwh duaw hduw heuiaw hfsjo fjsoe commentssssss uiahfuiawh uawhdkfejfioejf isej fi a</Text>
            </View>
        </View>
    )
}