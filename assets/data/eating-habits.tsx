import { EatingHabit } from '../enum/eating-habit'

export const eatingHabitTypes = [
    { label: 'Kiêng nghiêm ngặt', value: EatingHabit.STRICT_DIET.toString() },
    { label: 'Bình thường', value: EatingHabit.NORMAL.toString() },
    { label: 'Nhiều đường và tinh bột', value: EatingHabit.SWEET_CARB_HEAVY.toString() }
] 