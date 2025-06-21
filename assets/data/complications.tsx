import { Complications } from '../enum/complications'

export const complicationTypes = [
    { label: 'Mắt', value: Complications.EYE.toString() },
    { label: 'Thận', value: Complications.KIDNEY.toString() },
    { label: 'Thần kinh', value: Complications.NERVE.toString() },
    { label: 'Tim mạch', value: Complications.CARDIOVASCULAR.toString() },
    { label: 'Bàn chân', value: Complications.FOOT.toString() },
    { label: 'Khác', value: Complications.OTHER.toString() }
] 