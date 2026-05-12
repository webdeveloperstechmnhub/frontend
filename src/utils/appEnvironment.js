import { Capacitor } from '@capacitor/core'

export const isNativeApp = () => Capacitor.isNativePlatform()

export const isAndroidNativeApp = () => Capacitor.getPlatform() === 'android'

export const isIosNativeApp = () => Capacitor.getPlatform() === 'ios'

export const isLowPowerNativeApp = () => isNativeApp() && window.innerWidth < 768
