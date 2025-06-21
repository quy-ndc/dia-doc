import { ControlLevel } from '../enum/control-level'

export const controlLevelTypes = [
    { label: 'Kiểm soát tốt (<7%)', value: ControlLevel.GOOD_CONTROL.toString() },
    { label: 'Kiểm soát trung bình (7-8%)', value: ControlLevel.MODERATE_CONTROL.toString() },
    { label: 'Kiểm soát kém (>8%)', value: ControlLevel.POOR_CONTROL.toString() },
    { label: 'Không có thông tin', value: ControlLevel.NO_INFORMATION.toString() }
] 