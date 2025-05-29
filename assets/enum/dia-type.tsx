export enum DiaType {
    TYPE_1 = 1,
    TYPE_2 = 2,
    GESTATIONAL = 3,
    OTHER = 4
}

export function getDiaTypeName(type: number): string {
    switch (type) {
        case DiaType.TYPE_1:
            return 'Loại 1';
        case DiaType.TYPE_2:
            return 'Loại 2';
        case DiaType.GESTATIONAL:
            return 'Loại thai kỳ';
        case DiaType.OTHER:
            return 'Loại khác';
        default:
            return 'Không xác định';
    }
}