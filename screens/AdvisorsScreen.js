import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { Button, ScreenContainer, TextInput, withTheme } from '@draftbit/ui';
import { H3 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const AdvisorsScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [keywordSearch, setKeywordSearch] = React.useState('');

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <View style={StyleSheet.applyWidth({ padding: 10 }, dimensions.width)}>
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            {
              flexDirection: 'row',
              gap: 8,
              justifyContent: 'space-between',
              marginBottom: 10,
            },
            dimensions.width
          )}
        >
          <H3
            selectable={false}
            {...GlobalStyles.H3Styles(theme)['H3'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.H3Styles(theme)['H3'].style, {
                fontFamily: 'Quicksand_500Medium',
                fontSize: 16,
                marginLeft: 8,
              }),
              dimensions.width
            )}
          >
            {'Multiples database'}
          </H3>
          <Button
            iconPosition={'left'}
            onPress={() => {
              try {
                navigation.push('MAInsights', { screen: 'AllEventsScreen' });
              } catch (err) {
                console.error(err);
              }
            }}
            {...GlobalStyles.ButtonStyles(theme)['Button'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ButtonStyles(theme)['Button'].style,
                {
                  backgroundColor: null,
                  borderColor: theme.colors.text.strong,
                  borderWidth: 1,
                  color: theme.colors.text.strong,
                  fontFamily: 'Quicksand_500Medium',
                  height: 30,
                  paddingBottom: 4,
                  paddingTop: 4,
                  textTransform: 'uppercase',
                  width: 150,
                }
              ),
              dimensions.width
            )}
            title={'Submit Deal(s)'}
          />
        </View>

        <View style={StyleSheet.applyWidth({ gap: 8 }, dimensions.width)}>
          <TextInput
            autoCorrect={true}
            changeTextDelay={500}
            onChangeText={newTextInputValue => {
              try {
                setKeywordSearch(newTextInputValue);
              } catch (err) {
                console.error(err);
              }
            }}
            onSubmitEditing={() => {
              try {
                /* 'API Request' action requires configuration: choose an API endpoint */
              } catch (err) {
                console.error(err);
              }
            }}
            webShowOutline={true}
            {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
            autoCapitalize={'sentences'}
            clearButtonMode={'while-editing'}
            placeholder={'Search...'}
            returnKeyType={'search'}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextInputStyles(theme)['Text Input'].style,
                { width: '100%' }
              ),
              dimensions.width
            )}
            value={keywordSearch}
          />
          <View>
            <Button
              iconPosition={'left'}
              title={'Get Started'}
              {...GlobalStyles.ButtonStyles(theme)['Button'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ButtonStyles(theme)['Button'].style,
                  {
                    backgroundColor: theme.colors.text.strong,
                    fontFamily: 'Quicksand_700Bold',
                  }
                ),
                dimensions.width
              )}
            />
          </View>
        </View>
      </View>

      <XanoCollectionApi.FetchGetAdvisorsGET>
        {({ loading, error, data, refetchGetAdvisors }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return null;
        }}
      </XanoCollectionApi.FetchGetAdvisorsGET>
    </ScreenContainer>
  );
};

export default withTheme(AdvisorsScreen);
