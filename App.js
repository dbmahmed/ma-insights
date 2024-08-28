import * as React from 'react';
import { Provider as ThemeProvider } from '@draftbit/ui';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import {
  ActivityIndicator,
  AppState,
  Platform,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppNavigator from './AppNavigator';
import Fonts from './config/Fonts.js';
import { GlobalVariableProvider } from './config/GlobalVariableContext';
import cacheAssetsAsync from './config/cacheAssetsAsync';
import Draftbit from './themes/Draftbit';

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const queryClient = new QueryClient();

const App = () => {
  const [areAssetsCached, setAreAssetsCached] = React.useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular: Fonts.Poppins_400Regular,
    Poppins_900Black: Fonts.Poppins_900Black,
    Quicksand_400Regular: Fonts.Quicksand_400Regular,
    Quicksand_600SemiBold: Fonts.Quicksand_600SemiBold,
    Quicksand_700Bold: Fonts.Quicksand_700Bold,
    Quicksand_500Medium: Fonts.Quicksand_500Medium,
    Quicksand_300Light: Fonts.Quicksand_300Light,
  });

  React.useEffect(() => {
    async function prepare() {
      try {
        await cacheAssetsAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setAreAssetsCached(true);
      }
    }

    prepare();
  }, []);

  const isReady = areAssetsCached && fontsLoaded;
  const onLayoutRootView = React.useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <>
      {Platform.OS === 'android' ? (
        <StatusBar barStyle={'light-content'} />
      ) : null}
      <SafeAreaProvider
        initialMetrics={initialWindowMetrics}
        onLayout={onLayoutRootView}
      >
        <GlobalVariableProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider
              themes={[Draftbit]}
              breakpoints={{}}
              initialThemeName={Draftbit.name}
            >
              <AppNavigator />
            </ThemeProvider>
          </QueryClientProvider>
        </GlobalVariableProvider>
      </SafeAreaProvider>
    </>
  );
};

export default App;
