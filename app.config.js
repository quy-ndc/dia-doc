const {
  appDelegateContent,
  mainActivityContent,
  mainApplicationContent,
} = require("./zalokitStrings") 

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
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.quyndc.diadoc",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.quyndc.diadoc"
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-build-properties",
        {
          android: {
            extraProguardRules: `
              -keep class com.zing.zalo.**{ *  }
              -keep enum com.zing.zalo.**{ *  }
              -keep interface com.zing.zalo.**{ *  }
            `,
          },
        },
      ],
      [
        "react-native-zalo-kit/expo",
        {
          appId: "350132100575839532",
          appDelegateContent,
          mainActivityContent,
          mainApplicationContent,
        },
      ],
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: "47309c89-4e5d-40a6-bfad-a317a28ce6fd"
      }
    },
    owner: "quyndc"
  }
} 
