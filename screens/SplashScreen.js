import React from 'react';
import {
  CircularProgress,
  HStack,
  ScreenContainer,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Image, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import removeGlobalScroll from '../global-functions/removeGlobalScroll';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const SplashScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      console.log('Screen ON_SCREEN_FOCUS Start');
      let error = null;
      try {
        if (!isFocused) {
          return;
        }
        console.log('Start ON_SCREEN_FOCUS:0 CUSTOM_FUNCTION');
        removeGlobalScroll();
        console.log('Complete ON_SCREEN_FOCUS:0 CUSTOM_FUNCTION');
        console.log('Start ON_SCREEN_FOCUS:1 CONSOLE_LOG');
        /* hidden 'Log to Console' action */ console.log(
          'Complete ON_SCREEN_FOCUS:1 CONSOLE_LOG'
        );
        console.log('Start ON_SCREEN_FOCUS:2 FETCH_REQUEST');
        const get_me = (await XanoCollectionApi.authMeGET(Constants))?.json;
        console.log('Complete ON_SCREEN_FOCUS:2 FETCH_REQUEST', { get_me });
        console.log('Start ON_SCREEN_FOCUS:3 SET_VARIABLE');
        setGlobalVariableValue({
          key: 'ME',
          value: get_me,
        });
        console.log('Complete ON_SCREEN_FOCUS:3 SET_VARIABLE');
        console.log('Start ON_SCREEN_FOCUS:4 CONDITIONAL_STOP');
        /* hidden 'Conditional Stop' action */ console.log(
          'Complete ON_SCREEN_FOCUS:4 CONDITIONAL_STOP'
        );
        console.log('Start ON_SCREEN_FOCUS:5 CONSOLE_LOG');
        console.log(get_me?.email, 'GET ME: ');
        console.log('Complete ON_SCREEN_FOCUS:5 CONSOLE_LOG');
        console.log('Start ON_SCREEN_FOCUS:6 IF');
        if (!get_me?.email) {
          if (navigation.canGoBack()) {
            navigation.popToTop();
          }
          navigation.replace('LogInScreen', { message: get_me?.message });
        } else {
          /* hidden 'Log to Console' action */
          navigation.navigate('NewslettersScreen');
        }
        console.log('Complete ON_SCREEN_FOCUS:6 IF');
      } catch (err) {
        console.error(err);
        error = err.message ?? err;
      }
      console.log(
        'Screen ON_SCREEN_FOCUS Complete',
        error ? { error } : 'no error'
      );
    };
    handler();
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasTopSafeArea={true}
      style={StyleSheet.applyWidth(
        {
          backgroundColor: theme.colors.background.brand,
          justifyContent: 'center',
        },
        dimensions.width
      )}
    ></ScreenContainer>
  );
};

export default withTheme(SplashScreen);
