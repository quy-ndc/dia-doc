export enum DoctorRole {
    DIRECTOR = 0,
    DEPUTY_DIR = 1,
    HEAD_DEPT = 2,
    DEPUTY_HEAD = 3,
    DOCTOR = 4
}

export const DoctorRoleString: Record<DoctorRole, string> = {
    [DoctorRole.DIRECTOR]: 'Giám đốc',
    [DoctorRole.DEPUTY_DIR]: 'Phó giám đốc',
    [DoctorRole.HEAD_DEPT]: 'Trưởng khoa',
    [DoctorRole.DEPUTY_HEAD]: 'Phó trưởng khoa',
    [DoctorRole.DOCTOR]: 'Bác sĩ',
};

export function getDoctorRoleString(role: DoctorRole): string {
    return DoctorRoleString[role] || 'Không xác định';
}