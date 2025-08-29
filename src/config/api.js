import { Platform } from 'react-native';

// Prefer LAN IP for physical devices; use emulator loopback on Android emulator.
const LAN_BASE = 'http://192.168.2.24:8001/api';
// const ANDROID_EMULATOR_BASE = 'http://10.0.2.2:8001/api';
// const IOS_SIMULATOR_BASE = 'http://127.0.0.1:8001/api';

// export const API_BASE_URL = __DEV__
//   ? (Platform.OS === 'android' ? ANDROID_EMULATOR_BASE : IOS_SIMULATOR_BASE)
//   : LAN_BASE;

export const API_BASE_URL = LAN_BASE;
