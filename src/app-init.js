import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import { SplashScreen } from '@capacitor/splash-screen'

export async function initializeApp() {
  if (Capacitor.isNativePlatform()) {
    document.body.classList.add('tmh-native-app')
    if (Capacitor.getPlatform() === 'android') {
      document.body.classList.add('tmh-native-android')
    }
    if (Capacitor.getPlatform() === 'ios') {
      document.body.classList.add('tmh-native-ios')
    }

    try {
      // Configure status bar
      await StatusBar.setStyle({ style: Style.Dark })
      await StatusBar.setBackgroundColor({ color: '#0D0D0D' })
      await StatusBar.setOverlaysWebView({ overlay: true })

      // Hide splash screen after a delay to allow app to load
      setTimeout(async () => {
        try {
          await SplashScreen.hide()
        } catch (err) {
          void err
        }
      }, 1000)

      // Lock screen orientation (optional)
      // await ScreenOrientation.lock({ orientation: 'portrait' })
    } catch (err) {
      void err
    }
  }

  // Prevent pulling down to refresh on native app
  if (Capacitor.isNativePlatform()) {
    document.body.style.overscrollBehavior = 'none'
  }
}
