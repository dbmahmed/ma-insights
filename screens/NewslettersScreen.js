import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import CustomHeaderBlock from '../components/CustomHeaderBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import assessAccess from '../global-functions/assessAccess';
import resetAccess from '../global-functions/resetAccess';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import showAlertUtil from '../utils/showAlert';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Checkbox,
  LinearGradient,
  Link,
  Pressable,
  ScreenContainer,
  SimpleStyleFlatList,
  Table,
  TableCell,
  TableRow,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { H4, H5 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const NewslettersScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [dach, setDach] = React.useState(true);
  const [keywordSearch, setKeywordSearch] = React.useState('');
  const [my_peer_groups, setMy_peer_groups] = React.useState(false);
  const [newsletter, setNewsletter] = React.useState(true);
  const [nkp_comps, setNkp_comps] = React.useState(false);
  const [nordic, setNordic] = React.useState(true);
  const [weeklyReport, setWeeklyReport] = React.useState(true);
  const fixedKeyProp = key => {
    console.log('key', key + window.innerWidth);
    return key + window.innerWidth;
  };
  const isFocused = useIsFocused();
  React.useEffect(() => {
    console.log('Screen ON_SCREEN_FOCUS Start');
    let error = null;
    try {
      if (!isFocused) {
        return;
      }
      console.log('Start ON_SCREEN_FOCUS:0 CONSOLE_LOG');
      /* hidden 'Log to Console' action */ console.log(
        'Complete ON_SCREEN_FOCUS:0 CONSOLE_LOG'
      );
      console.log('Start ON_SCREEN_FOCUS:1 CONSOLE_LOG');
      /* hidden 'Log to Console' action */ console.log(
        'Complete ON_SCREEN_FOCUS:1 CONSOLE_LOG'
      );
      console.log('Start ON_SCREEN_FOCUS:2 SET_VARIABLE');
      setGlobalVariableValue({
        key: 'pageName',
        value: 'Newsletters',
      });
      console.log('Complete ON_SCREEN_FOCUS:2 SET_VARIABLE');
      console.log('Start ON_SCREEN_FOCUS:3 SET_VARIABLE');
      setGlobalVariableValue({
        key: 'subPage',
        value: false,
      });
      console.log('Complete ON_SCREEN_FOCUS:3 SET_VARIABLE');
      console.log('Start ON_SCREEN_FOCUS:4 CONSOLE_LOG');
      console.log(
        'testing conditional stop',
        assessAccess(Variables, setGlobalVariableValue)
      );
      console.log('Complete ON_SCREEN_FOCUS:4 CONSOLE_LOG');
      console.log('Start ON_SCREEN_FOCUS:5 CONDITIONAL_STOP');
      if (assessAccess(Variables, setGlobalVariableValue) === true) {
        return console.log('Complete ON_SCREEN_FOCUS:5 CONDITIONAL_STOP');
      } else {
        console.log(
          'Skipped ON_SCREEN_FOCUS:5 CONDITIONAL_STOP: condition not met'
        );
      }
      console.log('Start ON_SCREEN_FOCUS:6 CUSTOM_FUNCTION');
      resetAccess(navigation, Variables, setGlobalVariableValue);
      console.log('Complete ON_SCREEN_FOCUS:6 CUSTOM_FUNCTION');
      console.log('Start ON_SCREEN_FOCUS:7 NAVIGATE');
      /* hidden 'Navigate' action */ console.log(
        'Complete ON_SCREEN_FOCUS:7 NAVIGATE'
      );
      console.log('Start ON_SCREEN_FOCUS:8 SET_VARIABLE');
      /* hidden 'Set Variable' action */ console.log(
        'Complete ON_SCREEN_FOCUS:8 SET_VARIABLE'
      );
    } catch (err) {
      console.error(err);
      error = err.message ?? err;
    }
    console.log(
      'Screen ON_SCREEN_FOCUS Complete',
      error ? { error } : 'no error'
    );
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={false}
      hasLeftSafeArea={true}
      hasRightSafeArea={true}
      scrollable={false}
      style={StyleSheet.applyWidth(
        { overflow: { minWidth: Breakpoints.Desktop, value: 'hidden' } },
        dimensions.width
      )}
    >
      <CustomHeaderBlock />
      {/* box */}
      <View
        style={StyleSheet.applyWidth(
          { alignItems: 'center' },
          dimensions.width
        )}
      >
        {/* container */}
        <View
          style={StyleSheet.applyWidth(
            { maxWidth: 1200, padding: 15, width: '100%' },
            dimensions.width
          )}
        >
          <>
            {!(dimensions.width >= Breakpoints.Laptop) ? null : (
              <H5
                selectable={false}
                {...GlobalStyles.H5Styles(theme)['H5'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.H5Styles(theme)['H5'].style, {
                    fontFamily: 'Quicksand_600SemiBold',
                    fontSize: 25,
                    marginBottom: 20,
                    marginTop: 10,
                    textDecorationLine: 'none',
                  }),
                  dimensions.width
                )}
              >
                {'Newsletters'}
              </H5>
            )}
          </>
          <View
            style={StyleSheet.applyWidth(
              { marginBottom: 10 },
              dimensions.width
            )}
          >
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: {
                    minWidth: Breakpoints.Laptop,
                    value: 'flex-start',
                  },
                  flexDirection: { minWidth: Breakpoints.Laptop, value: 'row' },
                  justifyContent: {
                    minWidth: Breakpoints.Laptop,
                    value: 'space-between',
                  },
                },
                dimensions.width
              )}
            >
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
                    /* hidden 'Set Variable' action */
                    /* hidden 'API Request' action */
                    /* 'Refetch Data' action requires configuration: choose an API endpoint */
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
                    {
                      width: [
                        { minWidth: Breakpoints.Mobile, value: '100%' },
                        { minWidth: Breakpoints.Laptop, value: '50%' },
                      ],
                    }
                  ),
                  dimensions.width
                )}
                value={keywordSearch}
              />
              <View
                style={StyleSheet.applyWidth(
                  {
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    paddingLeft: { minWidth: Breakpoints.Laptop, value: 8 },
                    width: [
                      { minWidth: Breakpoints.Mobile, value: '100%' },
                      { minWidth: Breakpoints.Laptop, value: '50%' },
                    ],
                  },
                  dimensions.width
                )}
              >
                {/* Nordic */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                      gap: 4,
                      maxWidth: '50%',
                      padding: 4,
                      width: [
                        { minWidth: Breakpoints.Mobile, value: 190 },
                        { minWidth: Breakpoints.Laptop, value: 115 },
                      ],
                    },
                    dimensions.width
                  )}
                >
                  <Checkbox
                    onPress={newCheckboxValue => {
                      try {
                        setNordic(newCheckboxValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    color={theme.colors.text.medium}
                    disabled={Constants['ME']?.access_regions === 'DACH'}
                    size={24}
                    status={nordic}
                    uncheckedColor={theme.colors.text.medium}
                  />
                  <Pressable
                    onPress={() => {
                      try {
                        setNordic(nordic ? false : true);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    disabled={Constants['ME']?.access_regions === 'DACH'}
                  >
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
                      {'Nordic'}
                    </Text>
                  </Pressable>
                </View>
                {/* DACH */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                      gap: 4,
                      maxWidth: '50%',
                      padding: 4,
                      width: [
                        { minWidth: Breakpoints.Mobile, value: 190 },
                        { minWidth: Breakpoints.Laptop, value: 115 },
                      ],
                    },
                    dimensions.width
                  )}
                >
                  <Checkbox
                    onPress={newCheckboxValue => {
                      try {
                        setDach(newCheckboxValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    color={theme.colors.text.medium}
                    disabled={Constants['ME']?.access_regions === 'DACH'}
                    size={24}
                    status={dach}
                    uncheckedColor={theme.colors.text.medium}
                  />
                  <Pressable
                    onPress={() => {
                      try {
                        setDach(dach ? false : true);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    disabled={Constants['ME']?.access_regions === 'DACH'}
                  >
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
                      {'DACH'}
                    </Text>
                  </Pressable>
                </View>
                {/* Newsletter */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                      gap: 4,
                      maxWidth: '50%',
                      padding: 4,
                      width: [
                        { minWidth: Breakpoints.Mobile, value: 190 },
                        { minWidth: Breakpoints.Laptop, value: 115 },
                      ],
                    },
                    dimensions.width
                  )}
                >
                  <Checkbox
                    onPress={newCheckboxValue => {
                      try {
                        setNewsletter(newCheckboxValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    color={theme.colors.text.medium}
                    disabled={Constants['ME']?.access_regions === 'DACH'}
                    size={24}
                    status={newsletter}
                    uncheckedColor={theme.colors.text.medium}
                  />
                  <Pressable
                    onPress={() => {
                      try {
                        setNewsletter(newsletter ? false : true);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    disabled={Constants['ME']?.access_regions === 'DACH'}
                  >
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
                      {'Newsletter'}
                    </Text>
                  </Pressable>
                </View>
                {/* Weekly Report */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                      gap: 4,
                      maxWidth: '50%',
                      padding: 4,
                      width: [
                        { minWidth: Breakpoints.Mobile, value: 190 },
                        { minWidth: Breakpoints.Laptop, value: 115 },
                      ],
                    },
                    dimensions.width
                  )}
                >
                  <Checkbox
                    onPress={newCheckboxValue => {
                      try {
                        setWeeklyReport(newCheckboxValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    color={theme.colors.text.medium}
                    disabled={Constants['ME']?.access_regions === 'DACH'}
                    size={24}
                    status={weeklyReport}
                    uncheckedColor={theme.colors.text.medium}
                  />
                  <Pressable
                    onPress={() => {
                      try {
                        setWeeklyReport(weeklyReport ? false : true);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    disabled={Constants['ME']?.access_regions === 'DACH'}
                  >
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
                      {'Weekly Report'}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
            <>
              {!(!nordic && !dach) ? null : (
                <Text
                  accessible={true}
                  {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['screen_title'].style,
                      {
                        color: theme.colors.background.danger,
                        fontFamily: 'Quicksand_500Medium',
                        fontSize: 12,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {
                    'It is necessary that at least one of the filters Nordic, DACH was included'
                  }
                </Text>
              )}
            </>
            {/* Text 2 */}
            <>
              {!(!weeklyReport && !newsletter) ? null : (
                <Text
                  accessible={true}
                  {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['screen_title'].style,
                      {
                        color: theme.colors.background.danger,
                        fontFamily: 'Quicksand_500Medium',
                        fontSize: 12,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {
                    'It is necessary that at least one of the filters Newsletter, Weekly Report was included'
                  }
                </Text>
              )}
            </>
          </View>

          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['screen_title'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['screen_title'].style,
                {
                  fontFamily: 'Quicksand_400Regular',
                  marginBottom: 10,
                  paddingTop: { minWidth: Breakpoints.Laptop, value: 0 },
                }
              ),
              dimensions.width
            )}
          >
            {
              'Released weekdays at 8.30 AM - enable notifications to get notified on release.'
            }
          </Text>
        </View>
      </View>

      <XanoCollectionApi.FetchNewslettersGET
        handlers={{
          on401: fetchData => {
            try {
              /* hidden 'Show Alert' action */
              /* hidden 'Set Variable' action */
              /* hidden 'Set Variable' action */
              /* hidden 'Navigate' action */
              resetAccess(navigation, Variables, setGlobalVariableValue);
            } catch (err) {
              console.error(err);
            }
          },
        }}
        refetchInterval={300000}
      >
        {({ loading, error, data, refetchNewsletters }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center' },
                dimensions.width
              )}
            >
              <SimpleStyleFlatList
                data={fetchData}
                horizontal={false}
                inverted={false}
                keyExtractor={(listData, index) => listData?.id}
                keyboardShouldPersistTaps={'never'}
                listKey={'sXtzWjLu'}
                nestedScrollEnabled={false}
                onEndReachedThreshold={0.5}
                renderItem={({ item, index }) => {
                  const listData = item;
                  return (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          maxWidth: [
                            { minWidth: Breakpoints.Mobile, value: '50%' },
                            { minWidth: Breakpoints.Tablet, value: '33.33%' },
                            { minWidth: Breakpoints.Laptop, value: '20%' },
                          ],
                          padding: 5,
                          width: '100%',
                        },
                        dimensions.width
                      )}
                    >
                      <LinearGradient
                        endX={100}
                        endY={100}
                        startX={0}
                        startY={0}
                        {...GlobalStyles.LinearGradientStyles(theme)[
                          'Linear Gradient'
                        ].props}
                        color1={theme.colors.text.strong}
                        color2={theme.colors.branding.primary}
                        color3={null}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.LinearGradientStyles(theme)[
                              'Linear Gradient'
                            ].style,
                            {
                              borderColor: theme.colors.text.strong,
                              borderRadius: 5,
                              flexDirection: 'column',
                              margin: null,
                              maxWidth: [
                                { minWidth: Breakpoints.Desktop, value: 230 },
                                { minWidth: Breakpoints.Laptop, value: 183 },
                              ],
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        <Pressable
                          onPress={() => {
                            try {
                              navigation.navigate('NewsletterDetailsScreen', {
                                news_id: listData?.id,
                              });
                              /* hidden 'Log to Console' action */
                              /* hidden 'If/Else' action */
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                flexDirection: 'column',
                                flexWrap: 'nowrap',
                                gap: 10,
                                justifyContent: 'space-between',
                                minHeight: 160,
                                padding: 5,
                              },
                              dimensions.width
                            )}
                          >
                            <View>
                              <H4
                                selectable={false}
                                {...GlobalStyles.H4Styles(theme)['H4'].props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.H4Styles(theme)['H4'].style,
                                    {
                                      color: palettes.Brand['Strong Inverse'],
                                      fontSize: 14,
                                      marginBottom: 4,
                                      marginTop: 0,
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {listData?.title}
                              </H4>
                              {/* Subtitle */}
                              <>
                                {listData?.potd === 0 ? null : (
                                  <Text
                                    accessible={true}
                                    {...GlobalStyles.TextStyles(theme)[
                                      'screen_title'
                                    ].props}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.TextStyles(theme)[
                                          'screen_title'
                                        ].style,
                                        {
                                          color:
                                            palettes.Brand['Strong Inverse'],
                                          fontFamily: 'Quicksand_400Regular',
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                    textBreakStrategy={'highQuality'}
                                  >
                                    {'Pitch of The Day: '}
                                    {listData?._potd?.target}
                                  </Text>
                                )}
                              </>
                            </View>

                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)['screen_title']
                                .props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)['screen_title']
                                    .style,
                                  {
                                    color: palettes.Brand['Strong Inverse'],
                                    fontSize: 12,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {'Stories: '}
                              {listData?.total_stories}
                              {'\nOpportunities: '}
                              {listData?.opportunities}
                              {'\nTransactional: '}
                              {listData?.transactional}
                            </Text>
                          </View>
                        </Pressable>
                      </LinearGradient>
                    </View>
                  );
                }}
                numColumns={
                  dimensions.width >= Breakpoints.Laptop
                    ? 5
                    : dimensions.width >= Breakpoints.Tablet
                    ? 3
                    : 2
                }
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={StyleSheet.applyWidth(
                  {
                    maxHeight: [
                      {
                        minWidth: Breakpoints.Laptop,
                        value: dimensions.height - 310,
                      },
                      {
                        minWidth: Breakpoints.Mobile,
                        value: dimensions.height - 265,
                      },
                      {
                        minWidth: Breakpoints.Tablet,
                        value: dimensions.height - 250,
                      },
                    ],
                    maxWidth: 1200,
                    padding: 5,
                    width: '100%',
                  },
                  dimensions.width
                )}
              />
            </View>
          );
        }}
      </XanoCollectionApi.FetchNewslettersGET>
    </ScreenContainer>
  );
};

export default withTheme(NewslettersScreen);
