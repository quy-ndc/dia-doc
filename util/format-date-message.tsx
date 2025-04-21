export const formatDateMessage = (isoString: string): string => {
    const date = new Date(isoString);
    const now = new Date();

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const time = `${hours}:${minutes}`;

    if (
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
    ) {
        return time;
    } else if (date.getFullYear() === now.getFullYear()) {
        return `${day}-${month} - ${time}`;
    } else {
        return `${day}-${month}-${year} - ${time}`;
    }
};
