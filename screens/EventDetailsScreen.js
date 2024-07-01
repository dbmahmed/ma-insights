import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { ScreenContainer, withTheme } from '@draftbit/ui';
import { H3 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const EventDetailsScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasLeftSafeArea={false}
      hasRightSafeArea={false}
    >
      <XanoCollectionApi.FetchGetOneEventGET
        event_id={props.route?.params?.event_id ?? 1}
      >
        {({ loading, error, data, refetchGetOneEvent }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <View
              style={StyleSheet.applyWidth({ margin: 10 }, dimensions.width)}
            >
              <H3
                selectable={false}
                {...GlobalStyles.H3Styles(theme)['H3'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.H3Styles(theme)['H3'].style, {
                    fontFamily: 'Quicksand_700Bold',
                    fontSize: 14,
                  }),
                  dimensions.width
                )}
              >
                {fetchData?.headline}
              </H3>

              <Text
                accessible={true}
                {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['screen_title'].style,
                    { fontFamily: 'Quicksand_400Regular', fontSize: 12 }
                  ),
                  dimensions.width
                )}
              >
                {fetchData?.description}
              </Text>
            </View>
          );
        }}
      </XanoCollectionApi.FetchGetOneEventGET>
    </ScreenContainer>
  );
};

export default withTheme(EventDetailsScreen);
