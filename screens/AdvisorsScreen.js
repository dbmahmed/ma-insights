import React from 'react';
import {
  Button,
  Checkbox,
  HStack,
  IconButton,
  LinearGradient,
  Picker,
  Pressable,
  ScreenContainer,
  Shadow,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  Spacer,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { H3, H5 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
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
import * as GlobalVariables from '../config/GlobalVariableContext';
import assessAccess from '../global-functions/assessAccess';
import deviceType from '../global-functions/deviceType';
import modifyArrays from '../global-functions/modifyArrays';
import removeGlobalScroll from '../global-functions/removeGlobalScroll';
import resetAccess from '../global-functions/resetAccess';
import setPadding from '../global-functions/setPadding';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import waitUtil from '../utils/wait';

const AdvisorsScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [Media_and_Other, setMedia_and_Other] = React.useState(false);
  const [NKP_Proprietary, setNKP_Proprietary] = React.useState(false);
  const [Press_Release, setPress_Release] = React.useState(false);
  const [acq_agenda, setAcq_agenda] = React.useState(false);
  const [advisorsItems, setAdvisorsItems] = React.useState([]);
  const [austria, setAustria] = React.useState(false);
  const [communication_services, setCommunication_services] =
    React.useState(false);
  const [consumer_discretionary, setConsumer_discretionary] =
    React.useState(false);
  const [consumer_staples, setConsumer_staples] = React.useState(false);
  const [country, setCountry] = React.useState([]);
  const [dach, setDach] = React.useState(false);
  const [denmark, setDenmark] = React.useState(false);
  const [ebitdaRange, setEbitdaRange] = React.useState([]);
  const [energy, setEnergy] = React.useState(false);
  const [eventType, setEventType] = React.useState([]);
  const [filterPressed, setFilterPressed] = React.useState(false);
  const [financials, setFinancials] = React.useState(false);
  const [finland, setFinland] = React.useState(false);
  const [future_opportunity, setFuture_opportunity] = React.useState(false);
  const [germany, setGermany] = React.useState(false);
  const [health_care, setHealth_care] = React.useState(false);
  const [industrials, setIndustrials] = React.useState(false);
  const [it_and_software, setIt_and_software] = React.useState(false);
  const [keywordSearch, setKeywordSearch] = React.useState('');
  const [keywordSearchRaw, setKeywordSearchRaw] = React.useState('');
  const [lastPage, setLastPage] = React.useState(0);
  const [materials, setMaterials] = React.useState(false);
  const [nextPage, setNextPage] = React.useState(2);
  const [nordic, setNordic] = React.useState(false);
  const [norway, setNorway] = React.useState(false);
  const [real_estate, setReal_estate] = React.useState(false);
  const [sector, setSector] = React.useState([]);
  const [showSubmitDeal, setShowSubmitDeal] = React.useState(false);
  const [sweden, setSweden] = React.useState(false);
  const [switzerland, setSwitzerland] = React.useState(false);
  const [transaction, setTransaction] = React.useState(false);
  const [type, setType] = React.useState('Corporate Finance');
  const [typeAdvisor, setTypeAdvisor] = React.useState('dk');
  const [utilities, setUtilities] = React.useState(false);
  const [refreshing2cY8Myag, setRefreshing2cY8Myag] = React.useState(false);
  const setAdvisorRank = (
    Variables,
    type,
    region,
    listItem,
    yearCadance,
    rank
  ) => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
    // console.log(type, region, listItem);

    let typeN = '';
    if (region === 'Corporate Finance') {
      typeN = 'cf';
    } else if (region === 'Legal Counsel') {
      typeN = 'legal';
    }

    rank === true ? (yearCadance = 'rank') : '';

    let subsetName = `${type}_${typeN}_${yearCadance}`;

    return listItem[subsetName];
  };
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      removeGlobalScroll();
      setGlobalVariableValue({
        key: 'currentScreen',
        value: 'Advisors',
      });
      setGlobalVariableValue({
        key: 'screenParamName',
        value: '',
      });
      setGlobalVariableValue({
        key: 'screenParamValue',
        value: 0,
      });
      setGlobalVariableValue({
        key: 'pageName',
        value: 'Advisors',
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
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasTopSafeArea={true}
    >
      {/* Container */}
      <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
        <Modal
          supportedOrientations={['portrait', 'landscape']}
          animationType={'fade'}
          presentationStyle={'overFullScreen'}
          transparent={true}
          visible={showSubmitDeal}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                height: '100%',
                justifyContent: 'center',
                width: '100%',
              },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'stretch',
                  justifyContent: 'flex-start',
                  minHeight: 225,
                  width: 380,
                },
                dimensions.width
              )}
            >
              <LinearGradient
                endX={100}
                endY={100}
                startX={0}
                startY={0}
                {...GlobalStyles.LinearGradientStyles(theme)['Linear Gradient']
                  .props}
                color1={theme.colors.text.strong}
                color2={theme.colors.branding.primary}
                color3={null}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.LinearGradientStyles(theme)['Linear Gradient']
                      .style,
                    {
                      borderColor: null,
                      borderWidth: null,
                      margin: null,
                      padding: 10,
                    }
                  ),
                  dimensions.width
                )}
              >
                <View>
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['screen_title'].style,
                        {
                          color: palettes.Brand['Strong Inverse'],
                          fontFamily: 'Quicksand_400Regular',
                          padding: 10,
                          paddingLeft: 20,
                          paddingRight: 20,
                          textAlign: 'center',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {
                      "Please fill in this Sheets/Excel template and send to ma@nordicknowledgepartners.com - then we'll make sure to credit you as an advisor accordingly."
                    }
                  </Text>
                </View>
                {/* Buttons */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignContent: 'flex-start',
                      alignItems: 'center',
                      alignSelf: 'auto',
                      flexDirection: 'column',
                      flexGrow: 1,
                      gap: 8,
                      justifyContent: 'space-between',
                      marginBottom: 10,
                      padding: 10,
                    },
                    dimensions.width
                  )}
                >
                  {/* download */}
                  <Button
                    iconPosition={'left'}
                    onPress={() => {
                      const handler = async () => {
                        try {
                          /* hidden 'Set Variable' action */
                          /* hidden 'Set Variable' action */
                          /* hidden 'Set Variable' action */
                          /* hidden 'Set Variable' action */
                          /* hidden 'Set Variable' action */
                          /* hidden 'Set Variable' action */
                          /* hidden 'Set Variable' action */
                          /* hidden 'Set Variable' action */
                          /* hidden 'Set Variable' action */
                          /* hidden 'Set Variable' action */
                          /* hidden 'Set Variable' action */
                          /* hidden 'Set Variable' action */
                          await WebBrowser.openBrowserAsync(
                            'https://xne3-pdiu-8ysm.f2.xano.io/vault/wWtASq8F/oQx-UXpw06QcBcigzMvuyzYrIoM/Kzkd1g../Advisor+tracking.xlsx'
                          );
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
                    }}
                    {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ButtonStyles(theme)['Button'].style,
                        {
                          backgroundColor: 'rgba(0, 0, 0, 0)',
                          borderWidth: 0,
                          color: palettes.App.Orange,
                          fontFamily: 'Quicksand_600SemiBold',
                          textTransform: 'uppercase',
                          width: 200,
                        }
                      ),
                      dimensions.width
                    )}
                    title={'DOWNLOAD TEMPLATE'}
                  />
                  {/* back */}
                  <Button
                    iconPosition={'left'}
                    onPress={() => {
                      try {
                        setShowSubmitDeal(false);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ButtonStyles(theme)['Button'].style,
                        {
                          backgroundColor: 'rgba(0, 0, 0, 0)',
                          borderColor: palettes.Brand['Strong Inverse'],
                          borderWidth: 1,
                          color: palettes.Brand['Strong Inverse'],
                          fontFamily: 'Quicksand_600SemiBold',
                          textTransform: 'uppercase',
                          width: 180,
                        }
                      ),
                      dimensions.width
                    )}
                    title={'Back'}
                  />
                </View>
              </LinearGradient>
            </View>
          </View>
        </Modal>
        <CustomHeaderBlock />
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: [
                { minWidth: Breakpoints.Desktop, value: 'center' },
                { minWidth: Breakpoints.Mobile, value: 'center' },
              ],
              padding: 10,
            },
            dimensions.width
          )}
        >
          {/* View 2 */}
          <View
            style={StyleSheet.applyWidth(
              {
                flexDirection: 'row',
                gap: 8,
                justifyContent: 'space-between',
                marginBottom: 10,
                maxWidth: 1200,
                width: '100%',
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
              {'Advisor league tables'}
            </H3>
            <Button
              iconPosition={'left'}
              onPress={() => {
                try {
                  setShowSubmitDeal(true);
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

          <View
            style={StyleSheet.applyWidth(
              { maxWidth: 1200, width: '100%' },
              dimensions.width
            )}
          >
            <View>
              <HStack
                {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.HStackStyles(theme)['H Stack'].style,
                    { gap: 10 }
                  ),
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    { flex: 1, justifyContent: 'center' },
                    dimensions.width
                  )}
                >
                  <TextInput
                    autoCorrect={true}
                    changeTextDelay={500}
                    onChangeText={newTextInputValue => {
                      try {
                        setKeywordSearchRaw(newTextInputValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    onSubmitEditing={() => {
                      const handler = async () => {
                        console.log('Text Input ON_SUBMIT_EDITING Start');
                        let error = null;
                        try {
                          console.log(
                            'Start ON_SUBMIT_EDITING:0 FETCH_REQUEST'
                          );
                          /* hidden 'API Request' action */ console.log(
                            'Complete ON_SUBMIT_EDITING:0 FETCH_REQUEST'
                          );
                          console.log('Start ON_SUBMIT_EDITING:1 WAIT');
                          await waitUtil({ milliseconds: 100 });
                          console.log('Complete ON_SUBMIT_EDITING:1 WAIT');
                          console.log('Start ON_SUBMIT_EDITING:2 SET_VARIABLE');
                          setKeywordSearch(keywordSearchRaw);
                          console.log(
                            'Complete ON_SUBMIT_EDITING:2 SET_VARIABLE'
                          );
                          console.log('Start ON_SUBMIT_EDITING:3 CONSOLE_LOG');
                          console.log(keywordSearchRaw, keywordSearch);
                          console.log(
                            'Complete ON_SUBMIT_EDITING:3 CONSOLE_LOG'
                          );
                        } catch (err) {
                          console.error(err);
                          error = err.message ?? err;
                        }
                        console.log(
                          'Text Input ON_SUBMIT_EDITING Complete',
                          error ? { error } : 'no error'
                        );
                      };
                      handler();
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
                        { fontFamily: 'Quicksand_400Regular' }
                      ),
                      dimensions.width
                    )}
                    value={keywordSearchRaw}
                  />
                </View>
              </HStack>
            </View>
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  flexDirection: { minWidth: Breakpoints.Laptop, value: 'row' },
                  marginTop: 8,
                  width: { minWidth: Breakpoints.Laptop, value: '100%' },
                },
                dimensions.width
              )}
            >
              {/* View 3 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    flexGrow: 1,
                    flexShrink: 0,
                    marginBottom: 8,
                  },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    { padding: 5, width: '20%' },
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
                                  ? palettes.App.Orange
                                  : palettes.Brand.Strong,
                            },
                          ],
                          fontFamily: 'Quicksand_700Bold',
                        }
                      ),
                      dimensions.width
                    )}
                    title={'DK'}
                  />
                </View>
                {/* View 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    { padding: 5, width: '20%' },
                    dimensions.width
                  )}
                >
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
                                  ? palettes.App.Orange
                                  : palettes.Brand.Strong,
                            },
                          ],
                          fontFamily: 'Quicksand_700Bold',
                        }
                      ),
                      dimensions.width
                    )}
                    title={'SE'}
                  />
                </View>
                {/* View 3 */}
                <View
                  style={StyleSheet.applyWidth(
                    { padding: 5, width: '20%' },
                    dimensions.width
                  )}
                >
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
                                  ? palettes.App.Orange
                                  : palettes.Brand.Strong,
                            },
                          ],
                          fontFamily: 'Quicksand_700Bold',
                        }
                      ),
                      dimensions.width
                    )}
                    title={'NO'}
                  />
                </View>
                {/* View 4 */}
                <View
                  style={StyleSheet.applyWidth(
                    { padding: 5, width: '20%' },
                    dimensions.width
                  )}
                >
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
                                  ? palettes.App.Orange
                                  : palettes.Brand.Strong,
                            },
                          ],
                          fontFamily: 'Quicksand_700Bold',
                        }
                      ),
                      dimensions.width
                    )}
                    title={'FI'}
                  />
                </View>
                {/* View 5 */}
                <View
                  style={StyleSheet.applyWidth(
                    { padding: 5, width: '20%' },
                    dimensions.width
                  )}
                >
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
                                  ? palettes.App.Orange
                                  : palettes.Brand.Strong,
                            },
                          ],
                          fontFamily: 'Quicksand_700Bold',
                        }
                      ),
                      dimensions.width
                    )}
                    title={'DE'}
                  />
                </View>
              </View>
              {/* View 2 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    maxWidth: { minWidth: Breakpoints.Laptop, value: '50%' },
                    width: { minWidth: Breakpoints.Laptop, value: '100%' },
                  },
                  dimensions.width
                )}
              >
                <Picker
                  autoDismissKeyboard={true}
                  dropDownBackgroundColor={theme.colors.background.brand}
                  dropDownBorderColor={theme.colors.border.brand}
                  dropDownBorderRadius={8}
                  dropDownBorderWidth={1}
                  dropDownTextColor={theme.colors.text.strong}
                  iconSize={24}
                  leftIconMode={'inset'}
                  onValueChange={newPickerValue => {
                    try {
                      /* hidden 'Wait' action */
                      setType(newPickerValue);
                      /* hidden 'Log to Console' action */
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  selectedIconColor={theme.colors.text.strong}
                  selectedIconName={'Feather/check'}
                  type={'solid'}
                  mode={'dropdown-modal'}
                  options={[
                    { label: 'Corporate Finance', value: 'Corporate Finance' },
                    { label: 'Legal', value: 'Legal Counsel' },
                  ]}
                  placeholder={''}
                  selectedIconSize={14}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.text.strong,
                      fontFamily: 'Quicksand_400Regular',
                      padding: 8,
                      width: { minWidth: Breakpoints.Laptop, value: '100%' },
                    },
                    dimensions.width
                  )}
                  value={type}
                />
              </View>
            </View>
          </View>
        </View>
        {/* Fetch Container */}
        <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
          {/* Fetch  */}
          <XanoCollectionApi.FetchGetAdvisorsGET
            device={deviceType(
              Platform.OS === 'web',
              Platform.OS === 'ios',
              Platform.OS === 'android'
            )}
            eventType_in={[]}
            handlers={{
              on2xx: fetchData => {
                try {
                  /* hidden 'Set Variable' action */
                  /* hidden 'Set Variable' action */
                  /* hidden 'Set Variable' action */
                } catch (err) {
                  console.error(err);
                }
              },
              on401: fetchData => {
                try {
                  resetAccess(navigation, Variables, setGlobalVariableValue);
                } catch (err) {
                  console.error(err);
                }
              },
              onData: fetchData => {
                try {
                  console.log(fetchData);
                  setAdvisorsItems(fetchData?.items);
                  setNextPage(fetchData?.nextPage);
                  setLastPage(fetchData?.pageTotal);
                } catch (err) {
                  console.error(err);
                }
              },
            }}
            keyword={keywordSearch}
            page={1}
            region={typeAdvisor}
            sector_in={[]}
            type={type}
          >
            {({ loading, error, data, refetchGetAdvisors }) => {
              const fetchData = data?.json;
              if (loading) {
                return <LoadingBlock />;
              }

              if (error || data?.status < 200 || data?.status >= 300) {
                return <ActivityIndicator />;
              }

              return (
                <>
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center' },
                      dimensions.width
                    )}
                  >
                    {/* View 2 */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'stretch',
                          alignSelf: 'auto',
                          flexDirection: 'column',
                          marginBottom: 5,
                          marginTop: { minWidth: Breakpoints.Tablet, value: 5 },
                          maxWidth: 1200,
                          paddingLeft: [
                            { minWidth: Breakpoints.Tablet, value: 15 },
                            { minWidth: Breakpoints.Mobile, value: 10 },
                          ],
                          paddingRight: 10,
                          width: '100%',
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
                            {
                              color: [
                                {
                                  minWidth: Breakpoints.Tablet,
                                  value: theme.colors.text.strong,
                                },
                                {
                                  minWidth: Breakpoints.Mobile,
                                  value: theme.colors.text.strong,
                                },
                              ],
                              fontFamily: 'Quicksand_400Regular',
                              fontSize: 12,
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {fetchData?.itemsTotal}{' '}
                        {fetchData?.itemsTotal > 1 ? 'advisors' : 'advisor'}
                        {' matching filter'}
                      </Text>
                    </View>
                  </View>
                  <SimpleStyleFlatList
                    data={advisorsItems}
                    horizontal={false}
                    inverted={false}
                    keyExtractor={(listData, index) => listData?.id}
                    keyboardShouldPersistTaps={'never'}
                    listKey={'2cY8Myag'}
                    nestedScrollEnabled={false}
                    onEndReached={() => {
                      const handler = async () => {
                        try {
                          if (nextPage === null) {
                            return;
                          }
                          const newData = (
                            await XanoCollectionApi.getAdvisorsGET(Constants, {
                              device: deviceType(
                                Platform.OS === 'web',
                                Platform.OS === 'ios',
                                Platform.OS === 'android'
                              ),
                              eventType_in: [],
                              keyword: keywordSearch,
                              page: nextPage,
                              region: typeAdvisor,
                              sector_in: [],
                              type: type,
                            })
                          )?.json;
                          setNextPage(newData?.nextPage);
                          setLastPage(newData?.pageTotal);
                          if (fetchData?.items === 0) {
                            return;
                          }
                          setAdvisorsItems(
                            advisorsItems.concat(newData?.items)
                          );
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
                    }}
                    onEndReachedThreshold={0.5}
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing2cY8Myag}
                        onRefresh={() => {
                          const handler = async () => {
                            try {
                              setRefreshing2cY8Myag(true);
                              await refetchGetAdvisors();
                              setRefreshing2cY8Myag(false);
                            } catch (err) {
                              console.error(err);
                              setRefreshing2cY8Myag(false);
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
                              maxWidth: [
                                { minWidth: Breakpoints.Mobile, value: '100%' },
                                { minWidth: Breakpoints.Tablet, value: '50%' },
                                {
                                  minWidth: Breakpoints.Laptop,
                                  value: '33.33%',
                                },
                              ],
                              padding: 5,
                              width: '100%',
                            },
                            dimensions.width
                          )}
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
                                bottom: 5,
                                height: '100%',
                                left: [
                                  { minWidth: Breakpoints.Tablet, value: 5 },
                                  { minWidth: Breakpoints.Mobile, value: 5 },
                                ],
                                position: [
                                  {
                                    minWidth: Breakpoints.Tablet,
                                    value: 'absolute',
                                  },
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: 'absolute',
                                  },
                                ],
                                right: 5,
                                top: [
                                  { minWidth: Breakpoints.Tablet, value: 5 },
                                  { minWidth: Breakpoints.Mobile, value: 5 },
                                ],
                                width: [
                                  {
                                    minWidth: Breakpoints.Laptop,
                                    value: '100%',
                                  },
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: '100%',
                                  },
                                ],
                              },
                              dimensions.width
                            )}
                          />
                          <Pressable
                            onPress={() => {
                              try {
                                navigation.push('AdvisorDetailsScreen', {
                                  advisor_id: listData?.id,
                                });
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignContent: 'stretch',
                                  backgroundColor:
                                    palettes.Brand['Strong Inverse'],
                                  borderColor: palettes.Brand['Light Inverse'],
                                  borderRadius: 8,
                                  borderWidth: 0,
                                  flexDirection: 'column',
                                  gap: 4,
                                  justifyContent: 'flex-start',
                                  padding: 10,
                                },
                                dimensions.width
                              )}
                            >
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
                                      fontFamily: 'Quicksand_500Medium',
                                      marginBottom: 4,
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {listData?.name}
                              </Text>
                              {/* Text 2 */}
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
                                {...GlobalStyles.TextStyles(theme)[
                                  'screen_title'
                                ].props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)[
                                      'screen_title'
                                    ].style,
                                    {
                                      fontFamily: [
                                        {
                                          minWidth: Breakpoints.Mobile,
                                          value: 'Quicksand_400Regular',
                                        },
                                        {
                                          minWidth: Breakpoints.Laptop,
                                          value: 'Quicksand_500Medium',
                                        },
                                      ],
                                      fontSize: 12,
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {typeAdvisor?.toUpperCase()}
                                {' YTD: '}
                                {setAdvisorRank(
                                  Variables,
                                  typeAdvisor,
                                  type,
                                  listData,
                                  'ytd',
                                  false
                                )}
                              </Text>

                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    flexDirection: 'row',
                                    gap: 8,
                                    justifyContent: 'space-between',
                                  },
                                  dimensions.width
                                )}
                              >
                                {/* Text 2 2 */}
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
                                        fontFamily: [
                                          {
                                            minWidth: Breakpoints.Mobile,
                                            value: 'Quicksand_400Regular',
                                          },
                                          {
                                            minWidth: Breakpoints.Laptop,
                                            value: 'Quicksand_500Medium',
                                          },
                                        ],
                                        fontSize: 12,
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {typeAdvisor?.toUpperCase()}
                                  {' LY: '}
                                  {setAdvisorRank(
                                    Variables,
                                    typeAdvisor,
                                    type,
                                    listData,
                                    'ly',
                                    false
                                  )}
                                </Text>
                              </View>
                            </View>
                          </Pressable>
                        </View>
                      );
                    }}
                    numColumns={
                      dimensions.width >= Breakpoints.Laptop
                        ? 3
                        : dimensions.width >= Breakpoints.Tablet
                        ? 2
                        : 1
                    }
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={StyleSheet.applyWidth(
                      {
                        gap: 8,
                        marginBottom:
                          dimensions.width >= Breakpoints.Laptop ? 0 : 65,
                        maxHeight: [
                          {
                            minWidth: Breakpoints.Mobile,
                            value: dimensions.height - 290,
                          },
                          {
                            minWidth: Breakpoints.Laptop,
                            value: dimensions.height - 220,
                          },
                        ],
                        padding: 5,
                        paddingLeft: setPadding(dimensions.width),
                        paddingRight: setPadding(dimensions.width),
                        width: '100%',
                        zIndex: 1,
                      },
                      dimensions.width
                    )}
                  />
                </>
              );
            }}
          </XanoCollectionApi.FetchGetAdvisorsGET>
        </View>
        <CustomBottomNavBlock />
      </View>
    </ScreenContainer>
  );
};

export default withTheme(AdvisorsScreen);
