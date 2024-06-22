import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { BottomSheet, Link, withTheme } from '@draftbit/ui';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';

const AccountNavBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  return (
    <BottomSheet
      borderColor={theme.colors.divider}
      borderWidth={1}
      bottomSnapPosition={'80%'}
      bounces={true}
      enableOverScroll={false}
      friction={0.95}
      handleColor={theme.colors.divider}
      initialSnapPosition={'bottom'}
      middleSnapPosition={'50%'}
      showHandle={true}
      showsVerticalScrollIndicator={true}
      topBorderRadius={20}
      topSnapPosition={'10%'}
      {...GlobalStyles.BottomSheetStyles(theme)['Bottom Sheet'].props}
      style={StyleSheet.applyWidth(
        GlobalStyles.BottomSheetStyles(theme)['Bottom Sheet'].style,
        dimensions.width
      )}
    >
      <Text
        accessible={true}
        {...GlobalStyles.TextStyles(theme)['screen_title'].props}
        style={StyleSheet.applyWidth(
          GlobalStyles.TextStyles(theme)['screen_title'].style,
          dimensions.width
        )}
      >
        {'Welcome, '}
        {Constants['ME']?.name}
      </Text>
      {/* Text 2 */}
      <Text
        accessible={true}
        {...GlobalStyles.TextStyles(theme)['screen_title'].props}
        style={StyleSheet.applyWidth(
          GlobalStyles.TextStyles(theme)['screen_title'].style,
          dimensions.width
        )}
      >
        {'Your account status is '}
        {Constants['ME']?.user_status}
      </Text>
      {/* Text 3 */}
      <>
        {!(Constants['ME']?.trial_start !== '') ? null : (
          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['screen_title'].props}
            style={StyleSheet.applyWidth(
              GlobalStyles.TextStyles(theme)['screen_title'].style,
              dimensions.width
            )}
          >
            {'Trial start date: '}
            {Constants['ME']?.trial_start}
            {'\nTrial end date: '}
            {Constants['ME']?.trial_end}
          </Text>
        )}
      </>
      {/* Logout_blk */}
      <Link
        accessible={true}
        onPress={() => {
          try {
            setGlobalVariableValue({
              key: 'ME',
              value: {},
            });
            if (navigation.canGoBack()) {
              navigation.popToTop();
            }
            navigation.replace('LogInScreen');
          } catch (err) {
            console.error(err);
          }
        }}
        {...GlobalStyles.LinkStyles(theme)['Link'].props}
        style={StyleSheet.applyWidth(
          GlobalStyles.LinkStyles(theme)['Link'].style,
          dimensions.width
        )}
        title={'Logout'}
      />
      {/* Dismiss */}
      <Link
        accessible={true}
        onPress={() => {
          try {
            setGlobalVariableValue({
              key: 'acc_pressed',
              value: false,
            });
            /* hidden 'Set Variable' action */
            /* hidden 'Navigate' action */
          } catch (err) {
            console.error(err);
          }
        }}
        {...GlobalStyles.LinkStyles(theme)['Link'].props}
        style={StyleSheet.applyWidth(
          GlobalStyles.LinkStyles(theme)['Link'].style,
          dimensions.width
        )}
        title={'Dismiss'}
      />
    </BottomSheet>
  );
};

export default withTheme(AccountNavBlock);
