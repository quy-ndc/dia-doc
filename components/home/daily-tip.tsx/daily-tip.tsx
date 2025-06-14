import { Dimensions, View } from "react-native";
import SectionTitle from "../common/section-title";
import { Text } from "../../../components/ui/text";
import { BookOpenCheck } from "../../../lib/icons/BookOpenCheck";
import { GlobalColor } from "../../../global-color";
import { getRandomDiabeticTip } from "../../../assets/data/daily-tips";

const { width } = Dimensions.get('window')

export default function DailyTip() {

    const tip = getRandomDiabeticTip()

    return (
        <View
            style={{ backgroundColor: GlobalColor.ORANGE_NEON_BG, width: width * 0.95 }}
            className='flex-col gap-4 pt-2 pb-3 rounded-xl'
        >
            <SectionTitle
                icon={<BookOpenCheck color={GlobalColor.ORANGE_NEON_BORDER} size={20} />}
                title='Mẹo sức khỏe'
            />
            <View className="flex-col items-center gap-3 px-2">
                <View className="flex-row gap-2 items-center">
                    {tip.icon}
                    <Text className="text-lg font-bold tracking-wider capitalize">
                        {tip.title}
                    </Text>
                </View>
                <Text className="text-base text-[var(--fade-text-color)] text-center tracking-wider">
                    {tip.desc}
                </Text>
            </View>
        </View>
    );
}
