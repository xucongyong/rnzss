android build

cd android && ./gradlew assembleRelease

react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/



codepush

code-push deployment list shop-android
code-push deployment list shop-ios

code-push release-react shop-android android --t 1.1 --dev false --d Production --des 'delete token changer zhuxiaox' -m true

code-push release-react shop-android android --t 2.0 --dev false --d Staging --des 'delete token changer zhuxiao' -m true