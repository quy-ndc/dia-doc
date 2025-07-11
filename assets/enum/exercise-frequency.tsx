export enum ExerciseFrequency {
    NONE = 0,
    ONE_TO_TWO = 1,
    THREE_TO_FIVE = 2,
    MORE_THAN_FIVE = 3
}

export const ExerciseFrequencyString: Record<ExerciseFrequency, string> = {
    [ExerciseFrequency.NONE]: 'Không tập',
    [ExerciseFrequency.ONE_TO_TWO]: '1-2 lần/tuần',
    [ExerciseFrequency.THREE_TO_FIVE]: '3-5 lần/tuần',
    [ExerciseFrequency.MORE_THAN_FIVE]: 'Trên 5 lần/tuần',
};

export function getExerciseFrequencyString(frequency: ExerciseFrequency): string {
    return ExerciseFrequencyString[frequency] || 'Không xác định';
}