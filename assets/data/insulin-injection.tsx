import { InsulinInjectionFrequency } from '../enum/insulin-injection-frequency'

export const insulinInjectionTypes = [
    { label: 'Một lần mỗi ngày', value: InsulinInjectionFrequency.ONCE_PER_DAY.toString() },
    { label: 'Hai lần mỗi ngày', value: InsulinInjectionFrequency.TWICE_PER_DAY.toString() },
    { label: 'Hơn 2 lần mỗi ngày', value: InsulinInjectionFrequency.THREE_OR_MORE_PER_DAY.toString() }
] 