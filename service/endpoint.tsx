import { AUTH_SERVICE_ENDPOINT, MEDIA_SERVICE_ENDPOINT, USER_SERVICE_ENDPOINT } from '@env'

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

const endppointAuth = {
    LOGIN_PATIENT: `${AUTH_SERVICE_ENDPOINT}/${apiPrefixV1}/auth/login-by-zalo`,
    LOGIN_DOCTOR: `${AUTH_SERVICE_ENDPOINT}/${apiPrefixV1}/auth/`
}

const endpointUser = {
    CREATE_HOSPITAL: `${USER_SERVICE_ENDPOINT}/${apiPrefixV1}/hospitals/create-hospital`,
    CREATE_USER: `${USER_SERVICE_ENDPOINT}/${apiPrefixV1}/users/create-user`,
    UPDATE_USER: `${USER_SERVICE_ENDPOINT}/${apiPrefixV1}/users/patients`,
    GET_CURRENT_USER: `${USER_SERVICE_ENDPOINT}/${apiPrefixV1}/patients/me`,
    EDIT_USER: `${USER_SERVICE_ENDPOINT}/${apiPrefixV1}/patients`
}

const endpointMedia = {
    GET_ALL_MEDIAS: `${MEDIA_SERVICE_ENDPOINT}/${apiPrefixV1}/posts`,
    GET_MEDIA_BY_ID: `${MEDIA_SERVICE_ENDPOINT}/${apiPrefixV1}/posts`
}

const endpointCategory = {
    GET_ALL_CATEGORY: `${MEDIA_SERVICE_ENDPOINT}/${apiPrefixV1}/categories`
}

export { endpointUser, endppointAuth, endpointMedia, endpointCategory }