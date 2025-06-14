export type TimeOfDay = 'morning' | 'dawn' | 'night';

export const welcomeMessages: Record<TimeOfDay, string[]> = {
  morning: [
    'Chào buổi sáng khỏe mạnh',
    'Sẵn sàng cho ngày mới?',
    'Bắt đầu nhẹ nhàng nhé',
    'Cùng chăm sóc sức khỏe',
    'Hôm nay bạn thế nào?',
    'Chúc ngày mới đầy năng lượng',
    'Một ngày tích cực bắt đầu',
  ],
  dawn: [
    'Chào buổi chiều khỏe mạnh',
    'Tiếp tục giữ phong độ nhé',
    'Bạn đang làm rất tốt',
    'Cùng tiến bước từng chút',
    'Hãy dành thời gian cho bạn',
    'Tiếp tục duy trì năng lượng',
    'Một bước nữa về phía khỏe',
  ],
  night: [
    'Chào buổi tối thư giãn',
    'Đã đến lúc nghỉ ngơi',
    'Hãy thư giãn và phục hồi',
    'Bạn xứng đáng được nghỉ ngơi',
    'Ngủ ngon để hồi phục nhé',
    'Kết thúc nhẹ nhàng một ngày',
    'Nạp lại năng lượng cho mai',
  ],
};
