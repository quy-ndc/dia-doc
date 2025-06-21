export enum DiaType {
    TYPE_1 = 0,
    TYPE_2 = 1,
}

export function getDiaTypeName(type: number): string {
    switch (type) {
        case DiaType.TYPE_1:
            return 'Loại 1';
        case DiaType.TYPE_2:
            return 'Loại 2';
        default:
            return 'Không xác định';
    }
}