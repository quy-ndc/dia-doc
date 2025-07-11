import { AUTH_SERVICE_ENDPOINT, USER_SERVICE_ENDPOINT, CHAT_SERVICE_ENDPOINT, NOTIFICATION_SERVICE_ENDPOINT, API_GATEWAY_ENDPOINT, NEW_AUTH_SERVICE_ENDPOINT, AI_SERVICE_ENDPOINT } from '@env'
import useUserStore from '../store/userStore';

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

export const authApiConfig = () => {
    const user = useUserStore.getState().user
    const token = user.accessToken
    return (
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
}

const apiPrefixV1 = 'api/v1'

const endpointAuth = {
    LOGIN_PATIENT: `${AUTH_SERVICE_ENDPOINT}/${apiPrefixV1}/auth/login-by-zalo`,
    LOGIN_DOCTOR: `${AUTH_SERVICE_ENDPOINT}/${apiPrefixV1}/auth`,

    LOGIN_PHONE: `${API_GATEWAY_ENDPOINT}/${apiPrefixV1}/auth/patient/login-phone`,
    REGISTER_PHONE: `${API_GATEWAY_ENDPOINT}/${apiPrefixV1}/auth/patient/register-phone`,
    VERIFY_PHONE: `${API_GATEWAY_ENDPOINT}/${apiPrefixV1}/auth/patient/verify-otp-register`,
    RESEND_PHONE: `${API_GATEWAY_ENDPOINT}/${apiPrefixV1}/auth/patient/resend-otp-register`,
    REFRESH_TOKEN: `${API_GATEWAY_ENDPOINT}/${apiPrefixV1}/auth/refresh-token`,
    LOGOUT_USER: `${API_GATEWAY_ENDPOINT}/${apiPrefixV1}/auth/logout`,
}

const endpointAI = {
    SEND_MESSAGE: `${NEW_AUTH_SERVICE_ENDPOINT}/${apiPrefixV1}/auth/chat`,
    GET_ALL_MESSAGE: `${NEW_AUTH_SERVICE_ENDPOINT}/${apiPrefixV1}/auth/chat`,

    SEND_MESSAGE_TO_AI: `${AI_SERVICE_ENDPOINT}/${apiPrefixV1}/rag/chat`,
    GET_ALL_MESSAGE_WITH_AI: `${AI_SERVICE_ENDPOINT}/${apiPrefixV1}/rag/chat/sessions`,
}

const endpointUser = {
    CREATE_HOSPITAL: `${USER_SERVICE_ENDPOINT}/${apiPrefixV1}/hospitals/create-hospital`,
    CREATE_USER: `${USER_SERVICE_ENDPOINT}/${apiPrefixV1}/users/create-user`,
    UPDATE_USER: `${USER_SERVICE_ENDPOINT}/${apiPrefixV1}/users/patients`,
    GET_CURRENT_USER: `${USER_SERVICE_ENDPOINT}/${apiPrefixV1}/patients/me`,
    EDIT_USER: `${USER_SERVICE_ENDPOINT}/${apiPrefixV1}/patients`,

    CREATE_USER_PROFILE: `${API_GATEWAY_ENDPOINT}/${apiPrefixV1}/users/patients`,
    GET_USER_PROFILE: `${API_GATEWAY_ENDPOINT}/${apiPrefixV1}/users/patients/profile`,
    GET_USER_HEALTH_RECORD: `${API_GATEWAY_ENDPOINT}/${apiPrefixV1}/users/patients/records`,
    GET_USER_HEALTH_CARE_PLAN: `${API_GATEWAY_ENDPOINT}/${apiPrefixV1}/users/patients/careplan`,
    UPDATE_USER_WEIGHT: `${API_GATEWAY_ENDPOINT}/${apiPrefixV1}/users/patients/records/weight`,
    UPDATE_USER_HEIGHT: `${API_GATEWAY_ENDPOINT}/${apiPrefixV1}/users/patients/records/height`,
    UPDATE_USER_BLOOD_PRESSURE: `${API_GATEWAY_ENDPOINT}/${apiPrefixV1}/users/patients/records/blood-pressure`,
    UPDATE_USER_BLOOD_SUGAR: `${API_GATEWAY_ENDPOINT}/${apiPrefixV1}/users/patients/records/blood-glucose`,
    UPDATE_USER_HBA1C: `${API_GATEWAY_ENDPOINT}/${apiPrefixV1}/users/patients/records/hba1c`,
}

const endpointMedia = {
    GET_ALL_MEDIAS: `${API_GATEWAY_ENDPOINT}/${apiPrefixV1}/posts`,
    GET_MEDIA_BY_ID: `${API_GATEWAY_ENDPOINT}/${apiPrefixV1}/posts`,
    GET_TOP_MEDIAS: `${API_GATEWAY_ENDPOINT}/${apiPrefixV1}/posts/top-view`,
    UPDATE_IMAGE: `${API_GATEWAY_ENDPOINT}/${apiPrefixV1}/media`,
    BOOKMARK_MEDIA: `${API_GATEWAY_ENDPOINT}/${apiPrefixV1}/bookmarks`,
    GET_ALL_BOOKMARK_MEDIA: `${API_GATEWAY_ENDPOINT}/${apiPrefixV1}/posts/bookmark`,
    LIKE_MEDIA: `${API_GATEWAY_ENDPOINT}/${apiPrefixV1}/likes`,
    GET_ALL_LIKE_MEDIA: `${API_GATEWAY_ENDPOINT}/${apiPrefixV1}/posts/like`
}
const endpointCategory = {
    GET_ALL_CATEGORY: `${API_GATEWAY_ENDPOINT}/${apiPrefixV1}/categories`,
    GET_TOP_CATEGORY: `${API_GATEWAY_ENDPOINT}/${apiPrefixV1}/categories/top-post`
}

const endpointChat = {
    GET_ALL_GROUP_CHAT: `${CHAT_SERVICE_ENDPOINT}/${apiPrefixV1}/conversations`,
    GET_ALL_MESSAGES: `${CHAT_SERVICE_ENDPOINT}/${apiPrefixV1}/chats/messages`,
    SEND_MESSAGE: `${CHAT_SERVICE_ENDPOINT}/${apiPrefixV1}/chats/groups`,
    UPLOAD_IMAGE: `${CHAT_SERVICE_ENDPOINT}/${apiPrefixV1}/media/upload`
}

const endpointNoti = {
    GET_ALL_NOTIFICATION: `${NOTIFICATION_SERVICE_ENDPOINT}/${apiPrefixV1}/notifications/user`,
    UPDATE_NOTIFICATION: `${NOTIFICATION_SERVICE_ENDPOINT}/${apiPrefixV1}/notifications`,
    DELETE_NOTIFICATION: `${NOTIFICATION_SERVICE_ENDPOINT}/${apiPrefixV1}/notifications`,
}

export { endpointUser, endpointAuth, endpointMedia, endpointCategory, endpointChat, endpointNoti, endpointAI }