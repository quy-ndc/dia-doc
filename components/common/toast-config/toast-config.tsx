import { Dimensions } from 'react-native';
import { GlobalColor } from '../../../global-color';
import { ErrorToast, InfoToast, SuccessToast, ToastProps } from 'react-native-toast-message';

const { width, height } = Dimensions.get('window');

export const toastConfig = {
    success: (props: ToastProps) => (
        <SuccessToast
            {...props}
            text1NumberOfLines={3}
            style={{
                width: width * 0.9,
                borderLeftColor: GlobalColor.TOAST_SUCCESS,
            }}
            text1Style={{   
                fontSize: 14,
                fontWeight: 'bold'
            }}
        />
    ),
    error: (props: ToastProps) => (
        <ErrorToast
            {...props}
            text1Style={{
                fontSize: 17
            }}
            text2Style={{
                fontSize: 15
            }}
        />
    ),
    info: (props: ToastProps) => (
        <InfoToast
            {...props}
            text1NumberOfLines={3}
            style={{
                borderLeftColor: GlobalColor.TOAST_INFO,
            }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 13,
                fontWeight: 'bold',
            }}
        />
    ),
    authInfo: (props: ToastProps) => (
        <InfoToast
            {...props}
            text1NumberOfLines={3}
            style={{
                borderLeftColor: GlobalColor.TOAST_INFO,
            }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 13,
                fontWeight: 'bold',
                textAlign: 'center',
                letterSpacing: 0.5,
                lineHeight: 21
            }}
        />
    ),    
};
