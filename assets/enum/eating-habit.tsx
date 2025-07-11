export enum EatingHabit {
    STRICT_DIET = 0,
    NORMAL = 1,
    SWEET_CARB_HEAVY = 2
}

export const EatingHabitString: Record<EatingHabit, string> = {
    [EatingHabit.STRICT_DIET]: 'Kiêng nghiêm ngặt',
    [EatingHabit.NORMAL]: 'Bình thường',
    [EatingHabit.SWEET_CARB_HEAVY]: 'Ăn nhiều ngọt/tinh bột',
};

export function getEatingHabitString(habit: EatingHabit): string {
    return EatingHabitString[habit] || 'Không xác định';
}