import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  CircularProgress,
  HStack,
  ScreenContainer,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Image, Text, View } from 'react-native';

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
        console.log('Start ON_SCREEN_FOCUS:0 CONSOLE_LOG');
        console.log(Constants['AUTH_HEADER']);
        console.log('Complete ON_SCREEN_FOCUS:0 CONSOLE_LOG');
        console.log('Start ON_SCREEN_FOCUS:1 FETCH_REQUEST');
        const get_me = (await XanoCollectionApi.authMeGET(Constants))?.json;
        console.log('Complete ON_SCREEN_FOCUS:1 FETCH_REQUEST', { get_me });
        console.log('Start ON_SCREEN_FOCUS:2 SET_VARIABLE');
        setGlobalVariableValue({
          key: 'ME',
          value: get_me,
        });
        console.log('Complete ON_SCREEN_FOCUS:2 SET_VARIABLE');
        console.log('Start ON_SCREEN_FOCUS:3 CONDITIONAL_STOP');
        /* hidden 'Conditional Stop' action */ console.log(
          'Complete ON_SCREEN_FOCUS:3 CONDITIONAL_STOP'
        );
        console.log('Start ON_SCREEN_FOCUS:4 CONSOLE_LOG');
        console.log(Constants['ME']?.email);
        console.log('Complete ON_SCREEN_FOCUS:4 CONSOLE_LOG');
        console.log('Start ON_SCREEN_FOCUS:5 IF');
        if (Constants['ME']?.email !== '') {
          if (navigation.canGoBack()) {
            navigation.popToTop();
          }
          navigation.replace('MAInsights', { screen: 'NewslewttersScreen' });
        } else {
          if (navigation.canGoBack()) {
            navigation.popToTop();
          }
          navigation.replace('LogInScreen', { message: get_me?.message });
        }
        console.log('Complete ON_SCREEN_FOCUS:5 IF');
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
        { backgroundColor: theme.colors['Strong'], justifyContent: 'center' },
        dimensions.width
      )}
    >
      <View
        style={StyleSheet.applyWidth(
          {
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
          },
          dimensions.width
        )}
      >
        <Image
          {...GlobalStyles.ImageStyles(theme)['Image'].props}
          resizeMode={'contain'}
          source={Images.LogoMobileApp}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'].style, {
              width: 300,
            }),
            dimensions.width
          )}
        />
        <HStack
          {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.HStackStyles(theme)['H Stack'].style,
            dimensions.width
          )}
        >
          <CircularProgress
            color={theme.colors.primary}
            isAnimated={true}
            lineCap={'round'}
            showTrack={true}
            startPosition={'top'}
            trackColor={theme.colors.divider}
            trackLineCap={'round'}
            animationDuration={750}
            indeterminate={true}
            maximumValue={10}
            minimumValue={10}
            style={StyleSheet.applyWidth(
              { height: 25, width: 25 },
              dimensions.width
            )}
            thickness={5}
          />
          {/* Please wait... */}
          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['screen_title'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['screen_title'].style,
                {
                  color: theme.colors['Background'],
                  fontFamily: 'Quicksand_400Regular',
                  marginLeft: 5,
                }
              ),
              dimensions.width
            )}
          >
            {'Please wait...'}
          </Text>
        </HStack>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(SplashScreen);
