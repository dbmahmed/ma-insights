import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { ScreenContainer, withTheme } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const NordicNewsletterDetailsScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <XanoCollectionApi.FetchNewsletterEachGET
        newsletter_id={props.route?.params?.news_id ?? null}
      >
        {({ loading, error, data, refetchNewsletterEach }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return null;
        }}
      </XanoCollectionApi.FetchNewsletterEachGET>
      <View
        style={StyleSheet.applyWidth(
          { marginTop: 10, rowGap: 5 },
          dimensions.width
        )}
      >
        <Text
          accessible={true}
          {...GlobalStyles.TextStyles(theme)['screen_title'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.TextStyles(theme)['screen_title'].style,
              { fontFamily: 'Quicksand_600SemiBold' }
            ),
            dimensions.width
          )}
        >
          {null}
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
          {'Double click me to edit 👀'}
        </Text>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(NordicNewsletterDetailsScreen);
