import { ExerciseFrequency } from '../enum/exercise-frequency'

export const exerciseFrequencyTypes = [
    { label: 'Không tập thể dục', value: ExerciseFrequency.NONE.toString() },
    { label: '1-2 lần/tuần', value: ExerciseFrequency.ONE_TO_TWO.toString() },
    { label: '3-5 lần/tuần', value: ExerciseFrequency.THREE_TO_FIVE.toString() },
    { label: 'Hơn 5 lần/tuần', value: ExerciseFrequency.MORE_THAN_FIVE.toString() }
] 