import { AUTH_SERVICE_ENDPOINT, MEDIA_SERVICE_ENDPOINT, USER_SERVICE_ENDPOINT, CHAT_SERVICE_ENDPOINT, NOTIFICATION_SERVICE_ENDPOINT, NEW_AUTH_SERVICE_ENDPOINT, NEW_USER_SERVICE_ENDPOINT } from '@env'

export const createQueryString = (params: Record<string, any>): string => {
    const urlParams = new URLSearchParams();

    Object.keys(params).forEach(key => {
        const value = params[key];
        if (Array.isArray(value)) {
            value.forEach(val => urlParams.append(key, val));
        } else if (value !== undefined && value !== null) {
            urlParams.append(key, value);
        }
    });

    return urlParams.toString();
}

const apiPrefixV1 = 'api/v1'

const endpointAuth = {
    LOGIN_PATIENT: `${AUTH_SERVICE_ENDPOINT}/${apiPrefixV1}/auth/login-by-zalo`,
    LOGIN_DOCTOR: `${AUTH_SERVICE_ENDPOINT}/${apiPrefixV1}/auth`,
    LOGIN_PHONE: `${NEW_AUTH_SERVICE_ENDPOINT}/${apiPrefixV1}/auth/patient/login-phone`,
    REGISTER_PHONE: `${NEW_AUTH_SERVICE_ENDPOINT}/${apiPrefixV1}/auth/patient/register-phone`,
    VERIFY_PHONE: `${NEW_AUTH_SERVICE_ENDPOINT}/${apiPrefixV1}/auth/patient/verify-otp-register`,
    RESEND_PHONE: `${NEW_AUTH_SERVICE_ENDPOINT}/${apiPrefixV1}/auth/patient/resend-otp-register`,
    REFRESH_TOKEN: `${NEW_AUTH_SERVICE_ENDPOINT}/${apiPrefixV1}/auth/refresh-token`,
    LOGOUT_USER: `${NEW_AUTH_SERVICE_ENDPOINT}/${apiPrefixV1}/auth/logout`
}

const endpointUser = {
    CREATE_HOSPITAL: `${USER_SERVICE_ENDPOINT}/${apiPrefixV1}/hospitals/create-hospital`,
    CREATE_USER: `${USER_SERVICE_ENDPOINT}/${apiPrefixV1}/users/create-user`,
    UPDATE_USER: `${USER_SERVICE_ENDPOINT}/${apiPrefixV1}/users/patients`,
    GET_CURRENT_USER: `${USER_SERVICE_ENDPOINT}/${apiPrefixV1}/patients/me`,
    EDIT_USER: `${USER_SERVICE_ENDPOINT}/${apiPrefixV1}/patients`,
    CREATE_USER_PROFILE: `${NEW_USER_SERVICE_ENDPOINT}/${apiPrefixV1}/users/patients`,
}

const endpointMedia = {
    GET_ALL_MEDIAS: `${MEDIA_SERVICE_ENDPOINT}/${apiPrefixV1}/posts`,
    GET_MEDIA_BY_ID: `${MEDIA_SERVICE_ENDPOINT}/${apiPrefixV1}/posts`,
    GET_TOP_MEDIAS: `${MEDIA_SERVICE_ENDPOINT}/${apiPrefixV1}/posts/top-view`,
    UPDATE_IMAGE: `${MEDIA_SERVICE_ENDPOINT}/${apiPrefixV1}/media`,
    BOOKMARK_MEDIA: `${MEDIA_SERVICE_ENDPOINT}/${apiPrefixV1}/bookmarks`,
    GET_ALL_BOOKMARK_MEDIA: `${MEDIA_SERVICE_ENDPOINT}/${apiPrefixV1}/posts/bookmark`,
    LIKE_MEDIA: `${MEDIA_SERVICE_ENDPOINT}/${apiPrefixV1}/likes`,
    GET_ALL_LIKE_MEDIA: `${MEDIA_SERVICE_ENDPOINT}/${apiPrefixV1}/posts/like`
}

const endpointCategory = {
    GET_ALL_CATEGORY: `${MEDIA_SERVICE_ENDPOINT}/${apiPrefixV1}/categories`,
    GET_TOP_CATEGORY: `${MEDIA_SERVICE_ENDPOINT}/${apiPrefixV1}/categories/top-post`
}

const endpointChat = {
    GET_ALL_GROUP_CHAT: `${CHAT_SERVICE_ENDPOINT}/${apiPrefixV1}/groups`,
    GET_ALL_MESSAGES: `${CHAT_SERVICE_ENDPOINT}/${apiPrefixV1}/chats/messages`,
    SEND_MESSAGE: `${CHAT_SERVICE_ENDPOINT}/${apiPrefixV1}/chats/groups`
}

const endpointNoti = {
    GET_ALL_NOTIFICATION: `${NOTIFICATION_SERVICE_ENDPOINT}/${apiPrefixV1}/notifications/user`,
    UPDATE_NOTIFICATION: `${NOTIFICATION_SERVICE_ENDPOINT}/${apiPrefixV1}/notifications`,
    DELETE_NOTIFICATION: `${NOTIFICATION_SERVICE_ENDPOINT}/${apiPrefixV1}/notifications`,
}

export { endpointUser, endpointAuth, endpointMedia, endpointCategory, endpointChat, endpointNoti }