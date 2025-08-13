export enum ConsultationVideoCall {
    SIGNALR_SERVER = 'https://consultation-doctor-hzfhdqfhd9crd3es.southeastasia-01.azurewebsites.net/hub/consultation',
    ICE_SERVER = 'stun:stun.l.google.com:19302',
    CALL_USER_INVOKE = 'CallUser',
    CALL_USER_RECEIVE = 'IncomingCall',
    ACCEPT_CALL_INVOKE = 'AcceptCall',
    ACCEPT_CALL_RECEIVE = 'CallAccepted',
    DECLINE_CALL_INVOKE = 'DeclineCall',
    DECLINE_CALL_RECEIVE = 'CallDeclined',
    SEND_ICE_INVOKE = 'SendIceCandidate',
    SEND_ICE_RECEIVE = 'ReceiveIceCandidate',
    ICE_CANDIDATE_EVENT = 'icecandidate',
    TRACK_EVENT = 'track'
}