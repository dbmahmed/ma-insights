import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  Picker,
  PickerItem,
  Pressable,
  ScreenContainer,
  Shadow,
  SimpleStyleFlatList,
  TextInput,
  withTheme,
} from '@draftbit/ui';
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
  const [pickerValue, setPickerValue] = React.useState('');
  const [typeAdvisor, setTypeAdvisor] = React.useState('dk');

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
          <View
            style={StyleSheet.applyWidth(
              {
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'auto',
                flex: 1,
                flexDirection: 'row',
                flexGrow: 1,
                flexShrink: 0,
                gap: 8,
                justifyContent: 'space-between',
              },
              dimensions.width
            )}
          >
            {/* DK */}
            <Button
              iconPosition={'left'}
              onPress={() => {
                try {
                  setTypeAdvisor('dk');
                } catch (err) {
                  console.error(err);
                }
              }}
              {...GlobalStyles.ButtonStyles(theme)['Button'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ButtonStyles(theme)['Button'].style,
                  {
                    backgroundColor: [
                      { minWidth: Breakpoints.Mobile, value: null },
                      {
                        minWidth: Breakpoints.Mobile,
                        value:
                          typeAdvisor === 'dk'
                            ? palettes.App.green
                            : palettes.Brand.Strong,
                      },
                    ],
                    color:
                      typeAdvisor === 'dk'
                        ? palettes.Brand.Strong
                        : palettes.Brand['Strong Inverse'],
                    fontFamily: 'Quicksand_700Bold',
                    minWidth: 60,
                  }
                ),
                dimensions.width
              )}
              title={'DK'}
            />
            {/* SE */}
            <Button
              iconPosition={'left'}
              onPress={() => {
                try {
                  setTypeAdvisor('se');
                } catch (err) {
                  console.error(err);
                }
              }}
              {...GlobalStyles.ButtonStyles(theme)['Button'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ButtonStyles(theme)['Button'].style,
                  {
                    backgroundColor: [
                      { minWidth: Breakpoints.Mobile, value: null },
                      {
                        minWidth: Breakpoints.Mobile,
                        value:
                          typeAdvisor === 'se'
                            ? palettes.App.green
                            : palettes.Brand.Strong,
                      },
                    ],
                    color:
                      typeAdvisor === 'se'
                        ? palettes.Brand.Strong
                        : palettes.Brand['Strong Inverse'],
                    fontFamily: 'Quicksand_700Bold',
                    minWidth: 60,
                  }
                ),
                dimensions.width
              )}
              title={'SE'}
            />
            {/* NO */}
            <Button
              iconPosition={'left'}
              onPress={() => {
                try {
                  setTypeAdvisor('no');
                } catch (err) {
                  console.error(err);
                }
              }}
              {...GlobalStyles.ButtonStyles(theme)['Button'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ButtonStyles(theme)['Button'].style,
                  {
                    backgroundColor: [
                      { minWidth: Breakpoints.Mobile, value: null },
                      {
                        minWidth: Breakpoints.Mobile,
                        value:
                          typeAdvisor === 'no'
                            ? palettes.App.green
                            : palettes.Brand.Strong,
                      },
                    ],
                    color:
                      typeAdvisor === 'no'
                        ? palettes.Brand.Strong
                        : palettes.Brand['Strong Inverse'],
                    fontFamily: 'Quicksand_700Bold',
                    minWidth: 60,
                  }
                ),
                dimensions.width
              )}
              title={'NO'}
            />
            {/* FI */}
            <Button
              iconPosition={'left'}
              onPress={() => {
                try {
                  setTypeAdvisor('fi');
                } catch (err) {
                  console.error(err);
                }
              }}
              {...GlobalStyles.ButtonStyles(theme)['Button'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ButtonStyles(theme)['Button'].style,
                  {
                    backgroundColor: [
                      { minWidth: Breakpoints.Mobile, value: null },
                      {
                        minWidth: Breakpoints.Mobile,
                        value:
                          typeAdvisor === 'fi'
                            ? palettes.App.green
                            : palettes.Brand.Strong,
                      },
                    ],
                    color:
                      typeAdvisor === 'fi'
                        ? palettes.Brand.Strong
                        : palettes.Brand['Strong Inverse'],
                    fontFamily: 'Quicksand_700Bold',
                    minWidth: 60,
                  }
                ),
                dimensions.width
              )}
              title={'FI'}
            />
            {/* DE */}
            <Button
              iconPosition={'left'}
              onPress={() => {
                try {
                  setTypeAdvisor('de');
                } catch (err) {
                  console.error(err);
                }
              }}
              {...GlobalStyles.ButtonStyles(theme)['Button'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ButtonStyles(theme)['Button'].style,
                  {
                    backgroundColor: [
                      { minWidth: Breakpoints.Mobile, value: null },
                      {
                        minWidth: Breakpoints.Mobile,
                        value:
                          typeAdvisor === 'de'
                            ? palettes.App.green
                            : palettes.Brand.Strong,
                      },
                    ],
                    color:
                      typeAdvisor === 'de'
                        ? palettes.Brand.Strong
                        : palettes.Brand['Strong Inverse'],
                    fontFamily: 'Quicksand_700Bold',
                    minWidth: 60,
                  }
                ),
                dimensions.width
              )}
              title={'DE'}
            />
          </View>
          </* Fetch component: no endpoint configured */>
            {(fetchData => (
              <Picker
                autoDismissKeyboard={true}
                dropDownBackgroundColor={theme.colors.background.brand}
                dropDownBorderColor={theme.colors.border.brand}
                dropDownBorderRadius={8}
                dropDownBorderWidth={1}
                dropDownTextColor={theme.colors.text.strong}
                iconSize={24}
                leftIconMode={'inset'}
                mode={'native'}
                onValueChange={newPickerValue => {
                  const pickerValue = newPickerValue;
                  try {
                    setPickerValue(newPickerValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                placeholder={'Select an option'}
                selectedIconColor={theme.colors.text.strong}
                selectedIconName={'Feather/check'}
                selectedIconSize={20}
                type={'solid'}
                value={pickerValue}
              >
                <PickerItem />
              </Picker>
            ))()}
          </>
        </View>
      </View>
      {/* Fetch  */}
      <XanoCollectionApi.FetchGetAdvisorsGET>
        {({ loading, error, data, refetchGetAdvisors }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <SimpleStyleFlatList
              data={fetchData}
              horizontal={false}
              inverted={false}
              keyExtractor={(listData, index) =>
                listData?.id ?? listData?.uuid ?? index.toString()
              }
              keyboardShouldPersistTaps={'never'}
              listKey={'2cY8Myag'}
              nestedScrollEnabled={false}
              numColumns={1}
              onEndReachedThreshold={0.5}
              renderItem={({ item, index }) => {
                const listData = item;
                return (
                  <Pressable
                    onPress={() => {
                      try {
                        navigation.push('EventDetailsScreen', {
                          event_id: listData?.id,
                        });
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    <Shadow
                      showShadowCornerBottomEnd={true}
                      showShadowCornerBottomStart={true}
                      showShadowCornerTopEnd={true}
                      showShadowCornerTopStart={true}
                      showShadowSideBottom={true}
                      showShadowSideEnd={true}
                      showShadowSideStart={true}
                      showShadowSideTop={true}
                      distance={4}
                      offsetX={0}
                      offsetY={0}
                      paintInside={true}
                      stretch={true}
                      style={StyleSheet.applyWidth(
                        {
                          borderRadius: 12,
                          width: {
                            minWidth: Breakpoints.Laptop,
                            value: '100%',
                          },
                        },
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignContent: 'stretch',
                            backgroundColor: palettes.Brand['Strong Inverse'],
                            borderColor: palettes.Brand['Light Inverse'],
                            borderRadius: 8,
                            borderWidth: 0,
                            flexDirection: 'column',
                            gap: 8,
                            justifyContent: 'flex-start',
                            padding: 10,
                          },
                          dimensions.width
                        )}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              { fontFamily: 'Quicksand_500Medium' }
                            ),
                            dimensions.width
                          )}
                        >
                          {listData?.name}
                        </Text>
                        {/* Text 2 */}
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: palettes.App.Orange,
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {listData?.type}
                        </Text>
                        {/* Text 2 2 */}
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {null}
                        </Text>
                      </View>
                    </Shadow>
                  </Pressable>
                );
              }}
              showsHorizontalScrollIndicator={true}
              showsVerticalScrollIndicator={true}
              style={StyleSheet.applyWidth(
                { gap: 8, padding: 10 },
                dimensions.width
              )}
            />
          );
        }}
      </XanoCollectionApi.FetchGetAdvisorsGET>
    </ScreenContainer>
  );
};

export default withTheme(AdvisorsScreen);
