export const formatDateDiagnose = (dateInput: string) => {
    const inputDate = new Date(dateInput);
    const now = new Date();

    const day = String(inputDate.getDate()).padStart(2, '0');
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const year = inputDate.getFullYear();

    const diffInMilliseconds = now.getTime() - inputDate.getTime();

    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    let diff = ''

    if (diffInSeconds < 60) {
        diff = `${diffInSeconds} giây trước`;
    } else if (diffInMinutes < 60) {
        diff = `${diffInMinutes} phút trước`;
    }else if (diffInHours < 24) {
        diff = `${diffInHours} giờ trước`;
    }else if (diffInDays < 7) {
        diff = `${diffInDays} ngày trước`;
    }else if (diffInWeeks < 4) {
        diff = `${diffInWeeks} tuần trước`;
    }else if (diffInMonths < 12) {
        diff = `${diffInMonths} tháng trước`;
    } else {
        diff = `${diffInYears} năm trước`;
    }

    return `${day} / ${month} / ${year} (${diff})`
};
