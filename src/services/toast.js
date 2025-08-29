import { Platform, ToastAndroid, Alert } from 'react-native';

export function showToast(message, duration = 'short') {
    if (!message) return;
    const durationMap = { short: ToastAndroid.SHORT, long: ToastAndroid.LONG };
    if (Platform.OS === 'android') {
        ToastAndroid.show(String(message), durationMap[duration] || ToastAndroid.SHORT);
        return;
    }
    Alert.alert('Notice', String(message));
}

export function showErrorToast(errorOrMessage) {
    const message = typeof errorOrMessage === 'string'
        ? errorOrMessage
        : errorOrMessage?.data?.message || errorOrMessage?.message || 'Something went wrong';
    showToast(message, 'long');
}

