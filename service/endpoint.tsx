import { AUTH_SERVICE_ENDPOINT, USER_SERVICE_ENDPOINT, CHAT_SERVICE_ENDPOINT, NOTIFICATION_SERVICE_ENDPOINT, API_GATEWAY_ENDPOINT, NEW_AUTH_SERVICE_ENDPOINT, AI_SERVICE_ENDPOINT, CONSULTATION_SERVICE_ENDPOINT } from '@env'
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
const authService = 'auth-service'
const userService = 'user-service'
const mediaService = 'media-service'
const chatService = 'chat-service'
const consultationService = 'consultation-service'
const notificationService = 'notification-service'

const endpointAuth = {
    LOGIN_PHONE: `${API_GATEWAY_ENDPOINT}/${authService}/${apiPrefixV1}/auth/login-phone`,
    LOGOUT: `${API_GATEWAY_ENDPOINT}/${authService}/${apiPrefixV1}/auth/logout`,
    REGISTER_PHONE: `${API_GATEWAY_ENDPOINT}/${authService}/${apiPrefixV1}/auth/register-phone`,
    VERIFY_PHONE: `${API_GATEWAY_ENDPOINT}/${authService}/${apiPrefixV1}/auth/verify-otp-register`,
    RESEND_PHONE: `${API_GATEWAY_ENDPOINT}/${authService}/${apiPrefixV1}/auth/resend-otp-register`,
    REFRESH_TOKEN: `${API_GATEWAY_ENDPOINT}/${authService}/${apiPrefixV1}/auth/refresh-token`,
    LOGOUT_USER: `${API_GATEWAY_ENDPOINT}/${authService}/${apiPrefixV1}/auth/logout`,
    SAVE_FCM_TOKEN: `${API_GATEWAY_ENDPOINT}/${authService}/${apiPrefixV1}/auth/fcm-token`,
    CHANGE_PASSWORD: `${API_GATEWAY_ENDPOINT}/${authService}/${apiPrefixV1}/auth/change-password`,
    FORGOT_PASSWORD: `${API_GATEWAY_ENDPOINT}/${authService}/${apiPrefixV1}/auth/forgot-password`,
    RESET_PASSWORD: `${API_GATEWAY_ENDPOINT}/${authService}/${apiPrefixV1}/auth/reset-password`,
    RESEND_OTP_CHANGE_PASSWORD: `${API_GATEWAY_ENDPOINT}/${authService}/${apiPrefixV1}/auth/send-otp-change-password`
}

const endpointAI = {
    SEND_MESSAGE_TO_AI: `${AI_SERVICE_ENDPOINT}/${apiPrefixV1}/rag/chat`,
    GET_ALL_MESSAGE_WITH_AI: `${AI_SERVICE_ENDPOINT}/${apiPrefixV1}/rag/chat`,
    GET_ALL_AI_SESSION: `${AI_SERVICE_ENDPOINT}/${apiPrefixV1}/rag/session-chat`,
    DELETE_AI_SESSION: `${AI_SERVICE_ENDPOINT}/${apiPrefixV1}/rag/session-chat`,
    UPDATE_AI_SESSION: `${AI_SERVICE_ENDPOINT}/${apiPrefixV1}/rag/session-chat`,

    GENERATE_AI_NOTE: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/users/patients/records/ai-note`
}

const endpointUser = {
    CREATE_USER_PROFILE: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/users/patients`,
    EDIT_USER_PROFILE: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/users/patients/profile`,
    GET_USER_PROFILE: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/users/patients/profile`,
    GET_DOCTOR_PROFILE: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/doctors/profile`,
    DOCTOR_GET_PATIENT_PROFILE: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/users/patients/profile`,
    DOCTOR_GET_PATIENT_RECORDS: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/users/patients/records`,

    GET_USER_HEALTH_RECORD: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/users/patients/records`,
    UPDATE_USER_WEIGHT: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/users/patients/records/weight`,
    UPDATE_USER_HEIGHT: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/users/patients/records/height`,
    UPDATE_USER_BLOOD_PRESSURE: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/users/patients/records/blood-pressure`,
    UPDATE_USER_BLOOD_SUGAR: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/users/patients/records/blood-glucose`,
    UPDATE_USER_HBA1C: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/users/patients/records/hba1c`,
    UPDATE_USER_BMI: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/users/patients/records/bmi`,
    GET_HEALTH_RECORD_SUMMARY: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/users/patients/records/summary`,

    CREATE_CARE_PLAN_TEMPLATE: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/users/patients/template`,
    UPDATE_CARE_PLAN_TEMPLATE: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/users/patients/template`,
    GET_CARE_PLAN_TEMPLATE: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/users/patients/template`,
    DELETE_CARE_PLAN_TEMPLATE: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/users/patients/template`,

    GET_USER_HEALTH_CARE_PLAN: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/users/patients/careplan`,
    CREATE_USER_HEALTH_CARE_PLAN: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/users/patients/careplan`,
    UPDATE_USER_HEALTH_CARE_PLAN: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/users/patients/careplan`,
    DELETE_USER_HEALTH_CARE_PLAN: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/users/patients/careplan`,

    GET_ALL_DOCTOR_HAVE_CREATED_CARE_PLAN: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/users/patients/template/doctor-created`,
    GET_CARE_PLAN_TEMPLATE_DOCTOR: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/doctors`,
    CREATE_CARE_PLAN_TEMPLATE_DOCTOR: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/doctors`,
    UPDATE_CARE_PLAN_TEMPLATE_DOCTOR: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/doctors`,
    DELETE_CARE_PLAN_TEMPLATE_DOCTOR: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/doctors`,

    GET_CARE_PLAN_INSTACE_DOCTOR: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/doctors/careplan`,
    CREATE_CARE_PLAN_INSTACE_DOCTOR: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/doctors/careplan`,
    UPDATE_CARE_PLAN_INSTACE_DOCTOR: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/doctors/careplan`,
    DELETE_CARE_PLAN_INSTACE_DOCTOR: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/doctors/careplan`,

    GET_ALL_SERVICE_PACKAGES: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/service_packages`,
    GET_ALL_PURCHASED_SERVICE_PACKAGES: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/service_packages/purchased`,
    CREATE_PAYMENT: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/payments`,
    GET_ALL_DOCTOR: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/doctors`,
    GET_DOCTOR_BY_ID: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/doctors`,
    GET_ALL_DOCTOR_SCHEDULE: `${API_GATEWAY_ENDPOINT}/${consultationService}/${apiPrefixV1}/doctors`,

    CREATE_BOOKING: `${API_GATEWAY_ENDPOINT}/${consultationService}/${apiPrefixV1}/consultations`,
    GET_ALL_CONSULTAIONS: `${API_GATEWAY_ENDPOINT}/${consultationService}/${apiPrefixV1}/consultations`,
    CANCEL_BOOKING: `${API_GATEWAY_ENDPOINT}/${consultationService}/${apiPrefixV1}/consultations`,
    REVIEW_CONSULTATION: `${API_GATEWAY_ENDPOINT}/${consultationService}/${apiPrefixV1}/consultations`,

    GET_WALLET_BALANCE: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/users/wallet/balance`,
    GET_WALLET_HISTORY: `${API_GATEWAY_ENDPOINT}/${userService}/${apiPrefixV1}/users/wallet/history`,
}

const endpointMedia = {
    GET_ALL_MEDIAS: `${API_GATEWAY_ENDPOINT}/${mediaService}/${apiPrefixV1}/posts`,
    GET_MEDIA_BY_ID: `${API_GATEWAY_ENDPOINT}/${mediaService}/${apiPrefixV1}/posts`,
    GET_TOP_MEDIAS: `${API_GATEWAY_ENDPOINT}/${mediaService}/${apiPrefixV1}/posts/top-view`,
    UPLOAD_IMAGE: `${CHAT_SERVICE_ENDPOINT}/${apiPrefixV1}/media/upload`,
    BOOKMARK_MEDIA: `${API_GATEWAY_ENDPOINT}/${mediaService}/${apiPrefixV1}/bookmarks`,
    GET_ALL_BOOKMARK_MEDIA: `${API_GATEWAY_ENDPOINT}/${mediaService}/${apiPrefixV1}/posts/bookmark`,
    LIKE_MEDIA: `${API_GATEWAY_ENDPOINT}/${mediaService}/${apiPrefixV1}/likes`,
    GET_ALL_LIKE_MEDIA: `${API_GATEWAY_ENDPOINT}/${mediaService}/${apiPrefixV1}/posts/like`
}
const endpointCategory = {
    GET_ALL_CATEGORY: `${API_GATEWAY_ENDPOINT}/${mediaService}/${apiPrefixV1}/categories`,
    GET_TOP_CATEGORY: `${API_GATEWAY_ENDPOINT}/${mediaService}/${apiPrefixV1}/categories/top-post`
}

const endpointChat = {
    GET_ALL_GROUP_CHAT: `${API_GATEWAY_ENDPOINT}/${chatService}/${apiPrefixV1}/conversations`,
    GET_ALL_MESSAGES: `${API_GATEWAY_ENDPOINT}/${chatService}/${apiPrefixV1}/conversations`,
    SEND_MESSAGE: `${API_GATEWAY_ENDPOINT}/${chatService}/${apiPrefixV1}/conversations`,
    UPLOAD_IMAGE: `${API_GATEWAY_ENDPOINT}/${chatService}/${apiPrefixV1}/media/upload`,
    JOIN_A_GROUP: `${API_GATEWAY_ENDPOINT}/${chatService}/${apiPrefixV1}/hospital-conversations`,
    LEAVE_A_GROUP: `${API_GATEWAY_ENDPOINT}/${chatService}/${apiPrefixV1}/conversations`,
    ADD_TO_GROUP: `${API_GATEWAY_ENDPOINT}/${chatService}/${apiPrefixV1}/hospital-conversations`
}

const endpointNoti = {
    GET_ALL_NOTIFICATION: `${API_GATEWAY_ENDPOINT}/${notificationService}/${apiPrefixV1}/notifications`,
    UPDATE_NOTIFICATION: `${API_GATEWAY_ENDPOINT}/${notificationService}/${apiPrefixV1}/notifications`,
    DELETE_NOTIFICATION: `${API_GATEWAY_ENDPOINT}/${notificationService}/${apiPrefixV1}/notifications`,
}

export { endpointUser, endpointAuth, endpointMedia, endpointCategory, endpointChat, endpointNoti, endpointAI }