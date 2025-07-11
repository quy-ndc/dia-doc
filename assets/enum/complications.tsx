export enum Complications {
    EYE = 0,
    KIDNEY = 1,
    NERVE = 2,
    CARDIOVASCULAR = 3,
    FOOT = 4,
    OTHER = 5
}

export const ComplicationsString: Record<Complications, string> = {
    [Complications.EYE]: 'Mắt',
    [Complications.KIDNEY]: 'Thận',
    [Complications.NERVE]: 'Thần kinh',
    [Complications.CARDIOVASCULAR]: 'Tim mạch',
    [Complications.FOOT]: 'Bàn chân',
    [Complications.OTHER]: 'Khác',
};

export function getComplicationsString(complication: Complications): string {
    return ComplicationsString[complication] || 'Không xác định';
}