export enum InsulinInjectionFrequency {
    ONCE_PER_DAY = 0,
    TWICE_PER_DAY = 1,
    THREE_OR_MORE_PER_DAY = 2
}

export const InsulinInjectionFrequencyString: Record<InsulinInjectionFrequency, string> = {
    [InsulinInjectionFrequency.ONCE_PER_DAY]: '1 lần/ngày',
    [InsulinInjectionFrequency.TWICE_PER_DAY]: '2 lần/ngày',
    [InsulinInjectionFrequency.THREE_OR_MORE_PER_DAY]: 'Trên 3 lần/ngày',
};

export function getInsulinInjectionFrequencyString(frequency: InsulinInjectionFrequency): string {
    return InsulinInjectionFrequencyString[frequency] || 'Không xác định';
}