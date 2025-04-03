export type NotiZState = {
    notification: string[];
    addNoti: (item: string) => void;
    removeNoti: (item: string) => void;
    resetNoti: () => void;
    notiCount: number;
    increaseCount: () => void;
    decreaseCount: () => void;
    clearCount: () => void;
};