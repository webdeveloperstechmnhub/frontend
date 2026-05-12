# TechMNHub Mobile App - Build & Deployment Guide

## Overview
TechMNHub is now a native mobile application built with Capacitor, supporting both Android and iOS platforms. The app features a premium dark + neon-yellow theme with smooth animations and full mobile optimization.

## Prerequisites

### For Android Development
- **Android Studio** (Latest version recommended)
- **Android SDK**: API 24+
- **Java Development Kit (JDK)**: 11 or higher
- **Gradle**: Included with Android Studio

### For iOS Development (macOS only)
- **Xcode**: 14.0 or higher
- **CocoaPods**: `sudo gem install cocoapods`
- **iOS SDK**: 14.0 or higher
- **Apple Developer Account** (for release builds)

### General Requirements
- **Node.js**: 16.0 or higher
- **npm**: 8.0 or higher

## Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Build the Web Assets
```bash
npm run build
```

### 3. Sync with Native Platforms
```bash
# Update Android
npx cap sync android

# Update iOS
npx cap sync ios
```

## Building for Android

### Development Build (Debug)
```bash
# Build and run on emulator
npx cap run android

# Or open in Android Studio for development
npx cap open android
```

### Production Build (Release APK)
```bash
cd android

# Build release APK
./gradlew assembleRelease

# Find APK at: android/app/build/outputs/apk/release/app-release-unsigned.apk
```

### Sign Release APK
```bash
# Generate keystore (first time only)
keytool -genkey -v -keystore tecmnhub.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias tecmnhub

# Sign APK
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore tecmnhub.keystore app-release-unsigned.apk tecmnhub

# Align APK for Play Store
zipalign -v 4 app-release-unsigned.apk app-release.apk
```

### Distribution Options
- **APK Direct Download**: Upload `.apk` file to website for direct download
- **Google Play Store**: Upload to Play Console for distribution
- **F-Droid**: Alternative Android app store

## Building for iOS

### Development Build
```bash
# Open Xcode
npx cap open ios

# Or run directly (macOS only)
npx cap run ios
```

### Production Build (IPA)
```bash
cd ios/App

# Install dependencies
pod install

# Build for release in Xcode
# Select: Product → Scheme → Edit Scheme → Release
# Then: Product → Archive
```

### App Store Submission
1. Archive the app in Xcode
2. Validate through App Store Connect
3. Submit for review
4. Monitor review status in App Store Connect dashboard

## Configuration

### App Details (Edit: `capacitor.config.json`)
- **appId**: `com.techmnhub.app` (Package name)
- **appName**: Display name in launcher
- **webDir**: Built web assets location

### Status Bar & Splash Screen
- **Dark status bar**: Configured for dark theme
- **Splash duration**: 2 seconds
- **Background color**: `#0a0a0a` (TechMNHub dark)
- **Accent color**: `#ffd600` (Neon yellow)

## Mobile App Features

✅ **Full-screen immersive experience** - No browser UI  
✅ **Status bar integration** - Dark theme matching app  
✅ **Safe area handling** - Works with notched devices  
✅ **Gesture support** - Native swipe & tap feedback  
✅ **Offline support** - Ready for PWA enhancements  
✅ **Performance optimized** - Reduced particles on mobile  
✅ **Touch-friendly UI** - 48px minimum tap targets  

## Development Workflow

### Hot Reload Development
```bash
# Terminal 1: Watch and rebuild React app
npm run dev

# Terminal 2: Run on device with live reload
npx cap run android --live-reload
```

### Testing on Real Devices

**Android:**
```bash
# Connect device via USB (enable Developer Mode)
adb devices  # Verify connection
npx cap run android
```

**iOS (macOS):**
```bash
# Connect via Xcode
xcode-select --install
npx cap open ios
# Select device in Xcode and build
```

## Troubleshooting

### Android Issues

**Gradle sync fails:**
```bash
cd android
./gradlew clean
./gradlew build
```

**APK won't install:**
- Ensure app ID matches: `com.techmnhub.app`
- Check Android API level (min: 24)

### iOS Issues

**Pod install fails:**
```bash
cd ios/App
rm -rf Pods
pod install
```

**Code signing errors:**
- Add app to Apple Developer account
- Set Bundle ID in Xcode: `com.techmnhub.app`
- Select correct provisioning profile

## Performance Tips

1. **Reduce particle count on older devices** - Edit particle configs in page components
2. **Disable cursor glow on low-end devices** - Conditional in CSS
3. **Monitor animation performance** - Use Chrome DevTools performance profiler
4. **Test on real devices** - Emulators may have different performance profiles

## Updating the App

### After Web Changes
```bash
npm run build
npx cap sync android
npx cap sync ios
```

### Update Capacitor
```bash
npm update @capacitor/core @capacitor/cli
npx cap update android
npx cap update ios
```

## Distribution Channels

### Direct APK Download
- Host APK on TechMNHub website
- Users download and install manually
- Simplest for testing/beta releases

### Google Play Store
- Recommended for production
- Automatic updates for users
- Requires developer account ($25 one-time)
- Review process: 1-3 hours typically

### Apple App Store
- Recommended for iOS users
- Requires Apple Developer Program ($99/year)
- Review process: 24-48 hours
- Stricter approval guidelines

### F-Droid (Android)
- Free/open-source app store
- No developer fees
- Community-driven review

## Support & Resources

- **Capacitor Docs**: https://capacitorjs.com/docs
- **Android Dev Docs**: https://developer.android.com/docs
- **Apple Developer**: https://developer.apple.com/documentation
- **GitHub Capacitor**: https://github.com/ionic-team/capacitor

## Next Steps

1. ✅ Test builds on Android emulator/device
2. ✅ Verify iOS builds on macOS
3. ✅ Sign release builds with your keystore/certificate
4. ✅ Submit to Play Store / App Store
5. ✅ Monitor user feedback and crashes

---

**Built with ❤️ using Capacitor, React, Vite, and Tailwind CSS**
