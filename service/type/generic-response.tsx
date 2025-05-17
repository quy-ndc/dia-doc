export type SuccessResponse<T> = {
    value: {
        code: string,
        message: string,
        data: T
    },
    isSuccess: boolean,
    isFailure: boolean,
    error: {
        code: string,
        message: string
    }
}

export type ErrorResponse = {
    detail: string;
    errorCode: string;
    status: number;
    title: string;
}