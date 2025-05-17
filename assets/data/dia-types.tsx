import { DiaType } from "../enum/dia-type" 

export const diaTypes = [
    { label: 'Loại 1', value: DiaType.TYPE_1.toString() },
    { label: 'Loại 2', value: DiaType.TYPE_2.toString() },
    { label: 'Loại thai kỳ', value: DiaType.GESTATIONAL.toString() },
    { label: 'Loại khác', value: DiaType.OTHER.toString() },
]