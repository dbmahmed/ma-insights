import React from 'react';
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
import {
  ActivityIndicator,
  Modal,
  Platform,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import CustomBottomNavBlock from '../components/CustomBottomNavBlock';
import CustomHeaderBlock from '../components/CustomHeaderBlock';
import LoadingBlock from '../components/LoadingBlock';
import SSHandlerBlock from '../components/SSHandlerBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import addScreenShotListenerAsync from '../global-functions/addScreenShotListenerAsync';
import assessAccess from '../global-functions/assessAccess';
import deviceType from '../global-functions/deviceType';
import removeGlobalScroll from '../global-functions/removeGlobalScroll';
import removeSSListener from '../global-functions/removeSSListener';
import resetAccess from '../global-functions/resetAccess';
import screenNameGen from '../global-functions/screenNameGen';
import setPadding from '../global-functions/setPadding';
import transformNumber from '../global-functions/transformNumber';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import showAlertUtil from '../utils/showAlert';
import useWindowDimensions from '../utils/useWindowDimensions';
import waitUtil from '../utils/wait';

const NewslettersScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [dach, setDach] = React.useState(true);
  const [keywordSearch, setKeywordSearch] = React.useState('');
  const [keywordSearch_raw, setKeywordSearch_raw] = React.useState('');
  const [lastPage, setLastPage] = React.useState(0);
  const [my_peer_groups, setMy_peer_groups] = React.useState(false);
  const [newsletter, setNewsletter] = React.useState(true);
  const [newslettersList, setNewslettersList] = React.useState([]);
  const [nextPage, setNextPage] = React.useState(null);
  const [nkp_comps, setNkp_comps] = React.useState(false);
  const [nordic, setNordic] = React.useState(true);
  const [screenCode, setScreenCode] = React.useState('');
  const [weeklyReport, setWeeklyReport] = React.useState(true);
  const [refreshingsXtzWjLu, setRefreshingsXtzWjLu] = React.useState(false);
  const fixedKeyProp = key => {
    // console.log('key', key + window.innerWidth);
    return key + window.innerWidth;
  };
  React.useEffect(() => {
    // console.log("screen name changes", Constants.SS_SCREEN_NAME);
    if (Constants.SS_SUBSCRIPTION) {
      removeSSListener(Variables, setGlobalVariableValue);
    }
    if (Constants.SS_SCREEN_NAME)
      addScreenShotListenerAsync(Variables, setGlobalVariableValue);
  }, [Constants.SS_SCREEN_NAME]);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      setGlobalVariableValue({
        key: 'SS_SCREEN_NAME',
        value: null,
      });
      setScreenCode(screenNameGen());
      setGlobalVariableValue({
        key: 'currentScreen',
        value: 'Newsletters',
      });
      setGlobalVariableValue({
        key: 'screenParamName',
        value: '',
      });
      setGlobalVariableValue({
        key: 'screenParamValue',
        value: 0,
      });
      removeGlobalScroll();
      setGlobalVariableValue({
        key: 'pageName',
        value: 'Newsletters',
      });
      setGlobalVariableValue({
        key: 'subPage',
        value: false,
      });
      if (assessAccess(Variables, setGlobalVariableValue) === true) {
        return;
      }
      resetAccess(navigation, Variables, setGlobalVariableValue);
      if (navigation.canGoBack()) {
        navigation.popToTop();
      }
      navigation.replace('LogInScreen');
      removeSSListener(Variables, setGlobalVariableValue);
      addScreenShotListenerAsync(Variables, setGlobalVariableValue);
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer
      hasBottomSafeArea={false}
      hasLeftSafeArea={false}
      hasRightSafeArea={false}
      hasSafeArea={false}
      hasTopSafeArea={true}
      scrollable={false}
      style={StyleSheet.applyWidth(
        { overflow: { minWidth: Breakpoints.Desktop, value: 'hidden' } },
        dimensions.width
      )}
    >
      {/* Container */}
      <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
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
              {
                maxWidth: 1200,
                padding: 10,
                paddingBottom: 10,
                paddingTop: 15,
                width: '100%',
              },
              dimensions.width
            )}
          >
            <>
              {!(dimensions.width >= Breakpoints.Laptop) ? null : (
                <H5
                  selectable={false}
                  {...GlobalStyles.H5Styles(theme)['H5'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.H5Styles(theme)['H5'].style,
                      {
                        fontFamily: 'Quicksand_600SemiBold',
                        fontSize: 25,
                        marginBottom: 20,
                        marginTop: 10,
                        textDecorationLine: 'none',
                      }
                    ),
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
                    flexDirection: {
                      minWidth: Breakpoints.Laptop,
                      value: 'row',
                    },
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
                    const handler = async () => {
                      try {
                        setKeywordSearch_raw(newTextInputValue);
                        await waitUtil({ milliseconds: 100 });
                        if (newTextInputValue !== '') {
                          return;
                        }
                        setKeywordSearch(keywordSearch_raw);
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                  onSubmitEditing={() => {
                    try {
                      setKeywordSearch(keywordSearch_raw);
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
                  value={keywordSearch_raw}
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
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['screen_title']
                          .props}
                        disabled={true}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['screen_title']
                              .style,
                            { fontFamily: 'Quicksand_400Regular', fontSize: 12 }
                          ),
                          dimensions.width
                        )}
                        suppressHighlighting={true}
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
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['screen_title']
                          .props}
                        disabled={true}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['screen_title']
                              .style,
                            { fontFamily: 'Quicksand_400Regular', fontSize: 12 }
                          ),
                          dimensions.width
                        )}
                        suppressHighlighting={true}
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
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['screen_title']
                          .props}
                        disabled={true}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['screen_title']
                              .style,
                            { fontFamily: 'Quicksand_400Regular', fontSize: 12 }
                          ),
                          dimensions.width
                        )}
                        suppressHighlighting={true}
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
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['screen_title']
                          .props}
                        disabled={true}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['screen_title']
                              .style,
                            { fontFamily: 'Quicksand_400Regular', fontSize: 12 }
                          ),
                          dimensions.width
                        )}
                        suppressHighlighting={true}
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
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                    disabled={true}
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
                    suppressHighlighting={true}
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
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                    disabled={true}
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
                    suppressHighlighting={true}
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
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['screen_title'].props}
              disabled={true}
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
              suppressHighlighting={true}
            >
              {
                'Released weekdays at 7.00 AM - enable notifications to get notified on release.'
              }
            </Text>
          </View>
        </View>

        <XanoCollectionApi.FetchNewslettersGET
          dach={dach}
          device={deviceType(
            Platform.OS === 'web',
            Platform.OS === 'ios',
            Platform.OS === 'android'
          )}
          handlers={{
            on2xx: fetchData => {
              try {
                if (fetchData?.json?.items !== newslettersList) {
                  setNewslettersList(fetchData?.json?.items);
                } else {
                }

                /* hidden 'Log to Console' action */
                setNextPage(fetchData?.json?.nextPage);
                /* hidden 'Set Variable' action */
                /* hidden 'If/Else' action */
              } catch (err) {
                console.error(err);
              }
            },
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
          keyword={keywordSearch}
          newsletters={newsletter}
          nordic={nordic}
          page={1}
          reports={weeklyReport}
          screenCode={screenCode}
        >
          {({ loading, error, data, refetchNewsletters }) => {
            const fetchData = data?.json;
            if (loading) {
              return <LoadingBlock />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <SimpleStyleFlatList
                data={newslettersList}
                horizontal={false}
                inverted={false}
                keyExtractor={(listData, index) => listData?.id}
                keyboardShouldPersistTaps={'never'}
                listKey={'sXtzWjLu'}
                nestedScrollEnabled={false}
                onEndReached={() => {
                  const handler = async () => {
                    try {
                      console.log(nextPage);
                      if (nextPage === null) {
                        return;
                      }
                      const newData = (
                        await XanoCollectionApi.newslettersGET(Constants, {
                          dach: dach,
                          device: deviceType(
                            Platform.OS === 'web',
                            Platform.OS === 'ios',
                            Platform.OS === 'android'
                          ),
                          keyword: keywordSearch,
                          newsletters: newsletter,
                          nordic: nordic,
                          page: nextPage,
                          reports: weeklyReport,
                          screenCode: screenCode,
                        })
                      )?.json;
                      setNextPage(newData?.nextPage);
                      setLastPage(newData?.pageTotal);
                      if (
                        fetchData?.items ===
                        (0 || newslettersList !== fetchData?.items)
                      ) {
                        return;
                      }
                      setNewslettersList(
                        newslettersList.concat(newData?.items)
                      );
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshingsXtzWjLu}
                    onRefresh={() => {
                      const handler = async () => {
                        try {
                          setRefreshingsXtzWjLu(true);
                          await refetchNewsletters();
                          setRefreshingsXtzWjLu(false);
                        } catch (err) {
                          console.error(err);
                          setRefreshingsXtzWjLu(false);
                        }
                      };
                      handler();
                    }}
                  />
                }
                renderItem={({ item, index }) => {
                  const listData = item;
                  return (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignSelf: {
                            minWidth: Breakpoints.Tablet,
                            value: 'auto',
                          },
                          maxWidth: [
                            { minWidth: Breakpoints.Mobile, value: '50%' },
                            { minWidth: Breakpoints.Tablet, value: '33.33%' },
                            { minWidth: Breakpoints.Laptop, value: '20%' },
                          ],
                          minHeight: 150,
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
                              borderColor: null,
                              borderRadius: 5,
                              borderWidth: null,
                              flexDirection: 'column',
                              height: '100%',
                              margin: null,
                              width: '100%',
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
                          style={StyleSheet.applyWidth(
                            { height: '100%' },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                flexDirection: 'column',
                                flexWrap: 'nowrap',
                                gap: 10,
                                height: '100%',
                                justifyContent: 'space-between',
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
                                    selectable={false}
                                    {...GlobalStyles.TextStyles(theme)[
                                      'screen_title'
                                    ].props}
                                    disabled={true}
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
                                    suppressHighlighting={true}
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
                              selectable={false}
                              {...GlobalStyles.TextStyles(theme)['screen_title']
                                .props}
                              disabled={true}
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
                              suppressHighlighting={true}
                            >
                              {'Stories: '}
                              {transformNumber(
                                listData?.total_stories,
                                undefined,
                                undefined
                              )}
                              {'\nOpportunities: '}
                              {transformNumber(
                                listData?.opportunities,
                                undefined,
                                undefined
                              )}
                              {'\nTransactional: '}
                              {transformNumber(
                                listData?.transactional,
                                undefined,
                                undefined
                              )}
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
                onEndReachedThreshold={0.5}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={StyleSheet.applyWidth(
                  {
                    marginBottom: [
                      { minWidth: Breakpoints.Mobile, value: 0 },
                      {
                        minWidth: Breakpoints.Mobile,
                        value:
                          dimensions.width >= Breakpoints.Laptop === false
                            ? Platform.OS === 'ios'
                              ? 65
                              : 35
                            : 0,
                      },
                      {
                        minWidth: Breakpoints.Laptop,
                        value:
                          dimensions.width >= Breakpoints.Laptop
                            ? 0
                            : undefined,
                      },
                    ],
                    maxHeight: [
                      {
                        minWidth: Breakpoints.Tablet,
                        value: dimensions.height - 250,
                      },
                      {
                        minWidth: Breakpoints.Laptop,
                        value: dimensions.height - 280,
                      },
                    ],
                    padding: 5,
                    paddingLeft: [
                      {
                        minWidth: Breakpoints.BigScreen,
                        value: setPadding(dimensions.width - 5),
                      },
                      {
                        minWidth: Breakpoints.Mobile,
                        value: setPadding(dimensions.width),
                      },
                    ],
                    paddingRight: [
                      {
                        minWidth: Breakpoints.BigScreen,
                        value: setPadding(dimensions.width - 5),
                      },
                      {
                        minWidth: Breakpoints.Mobile,
                        value: setPadding(dimensions.width),
                      },
                    ],
                    width: '100%',
                  },
                  dimensions.width
                )}
              />
            );
          }}
        </XanoCollectionApi.FetchNewslettersGET>
      </View>
      <CustomBottomNavBlock />
      <>{!Constants['SEND_SS_NOTIF'] ? null : <SSHandlerBlock />}</>
    </ScreenContainer>
  );
};

export default withTheme(NewslettersScreen);
