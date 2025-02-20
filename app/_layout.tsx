import '~/global.css';

import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { PortalHost } from '@rn-primitives/portal';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { ReactQueryProvider } from '~/util/provider/react-query-provider';
import { Provider } from 'react-redux';
import { persistor, store } from '~/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';



const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === 'web') {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add('bg-background');
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

 

  return (
    <>
      {/* <Provider store={store}> */}
      {/* <PersistGate loading={<View className='flex-1 w-full h-full align-center justify-center'><Text>Loading...</Text></View>} persistor={persistor}> */}
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
        <ReactQueryProvider>
          <Stack>
            <Stack.Screen
              name='(main)'
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name='authen-screen'
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name='chat-screen'
            />
            <Stack.Screen
              name='blog-detail-screen'
              options={{
                headerTitle: ' ',
                presentation: 'modal'
              }}
            />
            <Stack.Screen
              name='+not-found'
              options={{
                headerShown: false
              }}
            />
          </Stack>
        </ReactQueryProvider>
        <PortalHost />
      </ThemeProvider>
      {/* </PersistGate> */}
      {/* </Provider> */}
      <Toast />
    </>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;
