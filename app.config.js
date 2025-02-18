export default {
  expo: {
    name: "dia-doc",
    slug: "dia-doc",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.quyndc.diadoc",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      ['react-native-zalo-kit/expo/withAppDelegateDebug'],
      ['react-native-zalo-kit/expo/withMainActivityDebug'],
      ['react-native-zalo-kit/expo/withMainApplicationDebug']
    ],
    experiments: {
      typedRoutes: true,
    },
  },
};
