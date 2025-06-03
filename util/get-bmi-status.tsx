import { Text } from '../components/ui/text'

export function getBmiStatus(bmi: number) {
    if (bmi < 18.5) {
        return <Text style={{ color: '#fbbf24', fontWeight: '500', fontSize: 12, letterSpacing: 0.5 }}>Thiếu cân</Text>
    } else if (bmi >= 18.5 && bmi < 25) {
        return <Text style={{ color: '#22c55e', fontWeight: '500', fontSize: 12, letterSpacing: 0.5 }}>Bình thường</Text>
    } else {
        return <Text style={{ color: '#ef4444', fontWeight: '500', fontSize: 12, letterSpacing: 0.5 }}>Thừa cân</Text>
    }
}
