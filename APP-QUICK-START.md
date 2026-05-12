# TechMNHub Mobile App - Quick Reference

## 📱 What's New

Your TechMNHub frontend is now a **native mobile application** with Capacitor! It feels like a real app, not a website.

### ✨ App Features

✅ **Full-Screen Experience** - No browser address bar, tab bar, or navigation UI  
✅ **Status Bar Integration** - Dark status bar matching app theme  
✅ **Safe Area Support** - Perfect display on notched devices (iPhone X+, Dynamic Island)  
✅ **Native Animations** - Smooth 60fps performance on mobile  
✅ **Status Bar & Splash Screen** - Professional startup experience  
✅ **Touch Optimized** - 48px+ tap targets for mobile fingers  
✅ **Performance Optimized** - Reduced animations on mobile to save battery  

## 🚀 Quick Build Commands

### Build for Android
```bash
npm run app:android
```
Builds and runs on Android emulator/device in one command.

### Build for iOS (macOS only)
```bash
npm run app:ios
```
Builds and opens Xcode for iOS development.

### Open in IDEs
```bash
npm run app:android-studio    # Open Android Studio
npm run app:xcode             # Open Xcode (macOS only)
```

### Update Native Platforms
```bash
npm run app:update-android    # After React code changes
npm run app:update-ios        # After React code changes
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app-init.js          # 🆕 App initialization (status bar, splash)
│   ├── main.jsx             # 🔄 Updated to call app-init
│   └── ...other files
├── android/                  # 🆕 Android native project
├── ios/                      # 🆕 iOS native project
├── dist/                     # Built web assets for app
├── capacitor.config.json     # 🆕 Capacitor configuration
└── MOBILE-APP-GUIDE.md       # 🆕 Full build & deployment guide
```

## 🔧 Development Workflow

### 1. Make Changes to React Code
```bash
# Edit files in src/
nano src/pages/premium/LoginPage.jsx
```

### 2. Build & Test on Mobile
```bash
npm run app:android          # Android
# OR
npm run app:ios              # iOS (macOS only)
```

### 3. View Changes
- App automatically rebuilds and reloads on device

## 📦 Distribution

### For Testing (APK)
```bash
cd android
./gradlew assembleDebug
# Find APK at: android/app/build/outputs/apk/debug/app-debug.apk
# Share and install on any Android phone
```

### For Release (Signed APK)
See `MOBILE-APP-GUIDE.md` for signing instructions

### To Google Play Store
1. Sign release APK with your keystore
2. Upload to Play Console
3. Configure store listing
4. Submit for review (~2-3 hours)

### To Apple App Store (macOS only)
1. Configure signing in Xcode
2. Create Archive in Xcode
3. Upload via Apple App Store Connect
4. Submit for review (~24-48 hours)

## 🎨 Customization

### Change App Name
Edit `capacitor.config.json`:
```json
{
  "appName": "Your App Name"
}
```

### Change App Icon
Place icons in:
- Android: `android/app/src/main/res/mipmap-*`
- iOS: `ios/App/App/Assets.xcassets`

### Change Splash Screen
- Android: `android/app/src/main/res/drawable/splash.png`
- iOS: `ios/App/App/Assets.xcassets/Splash`

## ⚙️ Safe Area Handling

App automatically handles:
- iPhone notches
- Dynamic Island
- Android system gestures
- On-screen keyboards

CSS uses `env(safe-area-inset-*)` for proper padding.

## 🐛 Troubleshooting

### Build Fails
```bash
# Clean build
rm -rf dist/ android/ ios/
npm install
npm run app:build
```

### App Crashes on Startup
1. Check browser console (DevTools)
2. Check Android Logcat: `adb logcat`
3. Check iOS Xcode logs

### Performance Issues
- Reduce particle count in page components
- Disable animations on low-end devices
- Use Chrome DevTools performance profiler

## 📚 More Info

For detailed build, deployment, and troubleshooting:
→ Read `MOBILE-APP-GUIDE.md`

## 🔗 Useful Links

- [Capacitor Docs](https://capacitorjs.com)
- [Android Studio Setup](https://developer.android.com/studio)
- [Xcode Setup](https://apps.apple.com/app/xcode/id497799835)
- [Google Play Console](https://play.google.com/console)
- [Apple App Store Connect](https://appstoreconnect.apple.com)

---

**You now have a real mobile app! 🚀📱**
