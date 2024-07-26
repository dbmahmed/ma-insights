import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import AccModalBlock from '../components/AccModalBlock';
import CustomHeaderBlock from '../components/CustomHeaderBlock';
import TopNavBlock from '../components/TopNavBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import assessAccess from '../global-functions/assessAccess';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import showAlertUtil from '../utils/showAlert';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  LinearGradient,
  Link,
  Pressable,
  ScreenContainer,
  SimpleStyleFlashList,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  Table,
  TableCell,
  TableRow,
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
  const [keywordSearch, setKeywordSearch] = React.useState('');
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
      console.log('Start ON_SCREEN_FOCUS:4 CONDITIONAL_STOP');
      if (assessAccess(Variables, setGlobalVariableValue) === true) {
        return console.log('Complete ON_SCREEN_FOCUS:4 CONDITIONAL_STOP');
      } else {
        console.log(
          'Skipped ON_SCREEN_FOCUS:4 CONDITIONAL_STOP: condition not met'
        );
      }
      console.log('Start ON_SCREEN_FOCUS:5 NAVIGATE');
      navigation.navigate('LogInScreen');
      console.log('Complete ON_SCREEN_FOCUS:5 NAVIGATE');
      console.log('Start ON_SCREEN_FOCUS:6 SET_VARIABLE');
      /* hidden 'Set Variable' action */ console.log(
        'Complete ON_SCREEN_FOCUS:6 SET_VARIABLE'
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
            { maxWidth: 1200, width: '100%' },
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
                    marginLeft: 20,
                    textDecorationLine: 'none',
                  }),
                  dimensions.width
                )}
              >
                {'Newsletters'}
              </H5>
            )}
          </>
          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['screen_title'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['screen_title'].style,
                {
                  fontFamily: 'Quicksand_400Regular',
                  marginBottom: 20,
                  marginLeft: 20,
                  marginRight: 20,
                  paddingTop: [
                    { minWidth: Breakpoints.Mobile, value: 20 },
                    { minWidth: Breakpoints.Laptop, value: 0 },
                  ],
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
              setGlobalVariableValue({
                key: 'AUTH_HEADER',
                value: '',
              });
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
            <SimpleStyleScrollView
              bounces={true}
              horizontal={false}
              keyboardShouldPersistTaps={'never'}
              nestedScrollEnabled={false}
              showsHorizontalScrollIndicator={true}
              showsVerticalScrollIndicator={true}
              style={StyleSheet.applyWidth(
                {
                  alignItems: { minWidth: Breakpoints.Tablet, value: 'center' },
                  width: { minWidth: Breakpoints.BigScreen, value: '100%' },
                },
                dimensions.width
              )}
            >
              {/* container */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    maxWidth: { minWidth: Breakpoints.Tablet, value: 1200 },
                    paddingLeft: 10,
                    paddingRight: 10,
                    width: { minWidth: Breakpoints.Tablet, value: '100%' },
                  },
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
                              maxWidth: [
                                { minWidth: Breakpoints.Mobile, value: 260 },
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
                              navigation.navigate('NewsletterDetailsScreen');
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
                                      color: palettes.Brand['Strong Inverse'],
                                      fontFamily: 'Quicksand_400Regular',
                                    }
                                  ),
                                  dimensions.width
                                )}
                                textBreakStrategy={'highQuality'}
                              >
                                {'PoTD: '}
                                {listData?._potd?.target}
                              </Text>
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
                    );
                  }}
                  showsHorizontalScrollIndicator={true}
                  showsVerticalScrollIndicator={true}
                  numColumns={
                    dimensions.width >= Breakpoints.Laptop
                      ? 5
                      : dimensions.width >= Breakpoints.Tablet
                      ? 3
                      : 2
                  }
                />
              </View>
            </SimpleStyleScrollView>
          );
        }}
      </XanoCollectionApi.FetchNewslettersGET>
      <>{!Constants['acc_pressed'] ? null : <AccModalBlock />}</>
      <>{!Constants['top_nav_pressed'] ? null : <TopNavBlock />}</>
    </ScreenContainer>
  );
};

export default withTheme(NewslettersScreen);
