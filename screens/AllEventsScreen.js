import React from 'react';
import {
  Button,
  Checkbox,
  CircularProgress,
  HStack,
  IconButton,
  LinearGradient,
  Pressable,
  ScreenContainer,
  Shadow,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  Spacer,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { H5, H6 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
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
import EventDetailsModalBlock from '../components/EventDetailsModalBlock';
import LoadingBlock from '../components/LoadingBlock';
import WatermarkerBlock from '../components/WatermarkerBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as BuiltIns from '../custom-files/BuiltIns';
import * as ExpoScreenCapture from '../custom-files/ExpoScreenCapture';
import addScreenShotListenerAsync from '../global-functions/addScreenShotListenerAsync';
import assessAccess from '../global-functions/assessAccess';
import deviceType from '../global-functions/deviceType';
import isNKPProp from '../global-functions/isNKPProp';
import modifyArrays from '../global-functions/modifyArrays';
import removeGlobalScroll from '../global-functions/removeGlobalScroll';
import removeSSListener from '../global-functions/removeSSListener';
import resetAccess from '../global-functions/resetAccess';
import screenNameGen from '../global-functions/screenNameGen';
import setPadding from '../global-functions/setPadding';
import showNKPProp from '../global-functions/showNKPProp';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';
import waitUtil from '../utils/wait';

const defaultProps = { scrollingIndex: 5 };

const AllEventsScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [Media_and_Other, setMedia_and_Other] = React.useState(false);
  const [NKP_Proprietary, setNKP_Proprietary] = React.useState(false);
  const [Press_Release, setPress_Release] = React.useState(false);
  const [acq_agenda, setAcq_agenda] = React.useState(false);
  const [austria, setAustria] = React.useState(false);
  const [communication_services, setCommunication_services] =
    React.useState(false);
  const [consumer_discretionary, setConsumer_discretionary] =
    React.useState(false);
  const [consumer_staples, setConsumer_staples] = React.useState(false);
  const [country, setCountry] = React.useState([]);
  const [dach, setDach] = React.useState(false);
  const [denmark, setDenmark] = React.useState(false);
  const [energy, setEnergy] = React.useState(false);
  const [eventItems, setEventItems] = React.useState([]);
  const [eventSearch, setEventSearch] = React.useState('');
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
  const [lastPage, setLastPage] = React.useState(2);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [materials, setMaterials] = React.useState(false);
  const [minEbitda, setMinEbitda] = React.useState(false);
  const [nextPage, setNextPage] = React.useState(2);
  const [nordic, setNordic] = React.useState(false);
  const [norway, setNorway] = React.useState(false);
  const [real_estate, setReal_estate] = React.useState(false);
  const [regions, setRegions] = React.useState([]);
  const [row, setRow] = React.useState(false);
  const [screenCode, setScreenCode] = React.useState('');
  const [sector, setSector] = React.useState([]);
  const [sourceType, setSourceType] = React.useState([]);
  const [sweden, setSweden] = React.useState(false);
  const [switzerland, setSwitzerland] = React.useState(false);
  const [tempRegion, setTempRegion] = React.useState('');
  const [transaction, setTransaction] = React.useState(false);
  const [utilities, setUtilities] = React.useState(false);
  const [viewingEventId, setViewingEventId] = React.useState(0);
  const [refreshingAwqPzJqX, setRefreshingAwqPzJqX] = React.useState(false);
  const [refreshingf9DpjkHa, setRefreshingf9DpjkHa] = React.useState(false);
  const toggleAllFilters = flag => {
    setFuture_opportunity(flag);
    setAcq_agenda(flag);
    setTransaction(flag);
    setSweden(flag);
    setGermany(flag);
    setDenmark(flag);
    setSwitzerland(flag);
    setNorway(flag);
    setAustria(flag);
    setFinland(flag);
    setCommunication_services(flag);
    setIndustrials(flag);
    setConsumer_discretionary(flag);
    setIt_and_software(flag);
    setConsumer_staples(flag);
    setMaterials(flag);
    setEnergy(flag);
    setReal_estate(flag);
    setFinancials(flag);
    setUtilities(flag);
    setHealth_care(flag);
    setNKP_Proprietary(flag);
    setPress_Release(flag);
    setMedia_and_Other(flag);
    setDach(flag);
    setRow(flag);
    setNordic(flag);
  };

  const applyFilter = () => {
    //Event type
    const eventType = [];

    future_opportunity && eventType.push('Future Opportunity');
    acq_agenda && eventType.push('Acq. agenda & other');
    transaction && eventType.push('Transaction');

    setEventType(() => eventType);

    //country
    const countries = [];

    sweden && countries.push('Sweden');
    germany && countries.push('Germany');
    denmark && countries.push('Denmark');
    switzerland && countries.push('Switzerland');
    norway && countries.push('Norway');
    austria && countries.push('Austria');
    finland && countries.push('Finland');

    setCountry(() => countries);

    //sector
    const sectors = [];

    communication_services && sectors.push('Communication Services');
    industrials && sectors.push('Industrials');
    consumer_discretionary && sectors.push('Consumer Discretionary');
    it_and_software && sectors.push('IT and Software');
    consumer_staples && sectors.push('Consumer Staples');
    materials && sectors.push('Materials');
    energy && sectors.push('Energy');
    real_estate && sectors.push('Real Estate');
    financials && sectors.push('Financials');
    utilities && sectors.push('Utilities');
    health_care && sectors.push('Health Care');

    setSector(() => sectors);

    // source type
    const sourceType = [];

    NKP_Proprietary && sourceType.push('NKP Proprietary');
    Press_Release && sourceType.push('Publicly Confirmed');
    Media_and_Other && sourceType.push('Media Intelligence');

    setSourceType(() => sourceType);

    // Regions

    const regionsTemp = [];

    nordic && regionsTemp.push('Nordic');
    dach && regionsTemp.push('DACH');
    row && regionsTemp.push('RoW');

    setRegions(regionsTemp);
  };

  const matchingFilters = () => {
    setFuture_opportunity((eventType || []).includes('Future Opportunity'));
    setAcq_agenda((eventType || []).includes('Acq. agenda & other'));
    setTransaction((eventType || []).includes('Transaction'));

    setSweden((country || []).includes('Sweden'));
    setGermany((country || []).includes('Germany'));
    setDenmark((country || []).includes('Denmark'));
    setSwitzerland((country || []).includes('Switzerland'));
    setNorway((country || []).includes('Norway'));
    setAustria((country || []).includes('Austria'));
    setFinland((country || []).includes('Finland'));

    setCommunication_services(
      (sector || []).includes('Communication Services')
    );
    setIndustrials((sector || []).includes('Industrials'));
    setConsumer_discretionary(
      (sector || []).includes('Consumer Discretionary')
    );
    setIt_and_software((sector || []).includes('IT and Software'));
    setConsumer_staples((sector || []).includes('Consumer Staples'));
    setMaterials((sector || []).includes('Materials'));
    setEnergy((sector || []).includes('Energy'));
    setReal_estate((sector || []).includes('Real Estate'));
    setFinancials((sector || []).includes('Financials'));
    setUtilities((sector || []).includes('Utilities'));
    setHealth_care((sector || []).includes('Health Care'));
    console.log(sourceType);
    setNKP_Proprietary((sourceType || []).includes('NKP Proprietary'));
    setPress_Release((sourceType || []).includes('Publicly Confirmed'));
    setMedia_and_Other((sourceType || []).includes('Media Intelligence'));

    setNordic((regions || []).includes('Nordic'));
    setRow((regions || []).includes('RoW'));
    setDach((regions || []).includes('DACH'));
  };
  // const { AdminGroupApi } = BuiltIns

  // const { ScreenCapture } = ExpoScreenCapture

  // const adminGroupSendNotificationForScreenshotPOST =
  //     AdminGroupApi.useSendNotificationForScreenshotPOST();

  // const hasPermissions = async () => {
  //     const { status } = await ScreenCapture.requestPermissionsAsync();
  //     console.log("has perpm", status);
  //     return status === "granted";
  // };

  // let subscription;

  // React.useEffect(() => {
  //     const addListenerAsync = async () => {
  //         if (await hasPermissions()) {
  //             console.log("add listner");
  //             subscription = ScreenCapture.addScreenshotListener(async () => {
  //                 console.log("handling listener");
  //                 let details =viewingEventId ? 'EventDetails:'+String(viewingEventId):"AllEvents";
  //                 console.log(details);
  //                 const rest = (
  //                     await adminGroupSendNotificationForScreenshotPOST.mutateAsync({
  //                         details,
  //                         email: Variables.ME.email,
  //                         name: Variables.ME.name,
  //                         ts: new Date(),
  //                     })
  //                 )?.json;
  //                 console.log("res ", rest);
  //             });
  //         } else {
  //             console.error(
  //                 "Permissions needed to subscribe to screenshot events are missing!"
  //             );
  //         }
  //     };

  //     if (isFocused) addListenerAsync();
  //     return () => {
  //         if (subscription) {
  //             console.log("removing the subs");
  //             ScreenCapture.removeScreenshotListener(subscription);
  //         }
  //     };
  // }, [isFocused, viewingEventId]);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      setGlobalVariableValue({
        key: 'SS_SCREEN_NAME',
        value: 'AllEvents',
      });
      /* hidden 'Run a Custom Function' action */
      setScreenCode(screenNameGen());
      /* hidden 'Run a Custom Function' action */
      setGlobalVariableValue({
        key: 'currentScreen',
        value: 'All Events',
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
        key: 'currentScreen',
        value: 'AllEvents',
      });
      setGlobalVariableValue({
        key: 'pageName',
        value: 'All events',
      });
      setGlobalVariableValue({
        key: 'subPage',
        value: false,
      });
      if (assessAccess(Variables, setGlobalVariableValue) === true) {
        return;
      }
      if (navigation.canGoBack()) {
        navigation.popToTop();
      }
      navigation.replace('LogInScreen');
      resetAccess(navigation, Variables, setGlobalVariableValue);
      /* hidden 'Set Variable' action */
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);
  React.useEffect(() => {
    try {
      if (isFocused) {
        return;
      }
      setGlobalVariableValue({
        key: 'originPage',
        value: 'AllEvents',
      });
      /* hidden 'Run a Custom Function' action */
      /* hidden 'Set Variable' action */
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);
  const listAwqPzJqXRef = React.useRef();

  return (
    <ScreenContainer
      hasSafeArea={false}
      hasLeftSafeArea={false}
      hasRightSafeArea={false}
      hasTopSafeArea={true}
      scrollable={false}
      style={StyleSheet.applyWidth(
        { overflow: { minWidth: Breakpoints.Desktop, value: 'hidden' } },
        dimensions.width
      )}
    >
      <>
        {!viewingEventId ? null : (
          <EventDetailsModalBlock
            setViewingEventId={viewingEventId =>
              setViewingEventId(viewingEventId)
            }
            viewingEventId={viewingEventId}
          />
        )}
      </>
      <CustomHeaderBlock />
      {/* box */}
      <View
        style={StyleSheet.applyWidth(
          { alignItems: 'center', width: '100%' },
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              margin: 0,
              maxWidth: 1200,
              padding: 10,
              paddingTop: [
                { minWidth: Breakpoints.Mobile, value: 20 },
                { minWidth: Breakpoints.Laptop, value: 0 },
              ],
              width: '100%',
            },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                alignContent: 'space-between',
                alignItems: { minWidth: Breakpoints.Laptop, value: 'center' },
                flexDirection: { minWidth: Breakpoints.Laptop, value: 'row' },
                gap: { minWidth: Breakpoints.Laptop, value: 10 },
                justifyContent: {
                  minWidth: Breakpoints.Laptop,
                  value: 'space-between',
                },
                marginBottom: 10,
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
                        marginTop: [
                          { minWidth: Breakpoints.Mobile, value: 0 },
                          { minWidth: Breakpoints.Laptop, value: 20 },
                        ],
                        paddingLeft: 5,
                        textDecorationLine: 'none',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'All events'}
                </H5>
              )}
            </>
            <Button
              iconPosition={'left'}
              onPress={() => {
                try {
                  navigation.navigate('MultiplesScreen');
                } catch (err) {
                  console.error(err);
                }
              }}
              {...GlobalStyles.ButtonStyles(theme)['Header menu'].props}
              icon={'AntDesign/arrowright'}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ButtonStyles(theme)['Header menu'].style,
                  {
                    backgroundColor: [
                      {
                        minWidth: Breakpoints.Mobile,
                        value: theme.colors.text.strong,
                      },
                      {
                        minWidth: Breakpoints.Laptop,
                        value: theme.colors.text.strong,
                      },
                    ],
                    borderColor: {
                      minWidth: Breakpoints.Laptop,
                      value: theme.colors.text.strong,
                    },
                    color: [
                      {
                        minWidth: Breakpoints.Mobile,
                        value: palettes.Brand['Strong Inverse'],
                      },
                      {
                        minWidth: Breakpoints.Laptop,
                        value: palettes.Brand['Strong Inverse'],
                      },
                    ],
                    fontFamily: [
                      {
                        minWidth: Breakpoints.Mobile,
                        value: 'Quicksand_500Medium',
                      },
                      {
                        minWidth: Breakpoints.Laptop,
                        value: 'Quicksand_500Medium',
                      },
                    ],
                    maxWidth: { minWidth: Breakpoints.Tablet, value: 200 },
                  }
                ),
                dimensions.width
              )}
              title={'MULTIPLES'}
            />
          </View>

          <HStack
            {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.HStackStyles(theme)['H Stack'].style,
                { gap: 10, justifyContent: 'space-between', marginRight: 5 }
              ),
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
                try {
                  setKeywordSearch(keywordSearchRaw);
                  /* hidden 'API Request' action */
                  /* hidden 'Refetch Data' action */
                } catch (err) {
                  console.error(err);
                }
              }}
              webShowOutline={true}
              {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
              autoCapitalize={'sentences'}
              blurOnSubmit={true}
              clearButtonMode={'while-editing'}
              placeholder={'Search...'}
              returnKeyType={'search'}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextInputStyles(theme)['Text Input'].style,
                  { width: '90%' }
                ),
                dimensions.width
              )}
              value={keywordSearchRaw}
            />
            <Shadow
              offsetX={0}
              paintInside={true}
              showShadowCornerBottomEnd={true}
              showShadowCornerBottomStart={true}
              showShadowCornerTopEnd={true}
              showShadowCornerTopStart={true}
              showShadowSideBottom={true}
              showShadowSideEnd={true}
              showShadowSideStart={true}
              showShadowSideTop={true}
              distance={3}
              offsetY={2}
            >
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor:
                      eventType?.length ||
                      country?.length ||
                      sector?.length ||
                      sourceType?.length
                        ? palettes.App.Orange
                        : palettes.Brand.Background,
                    borderRadius: 50,
                    height: 36,
                    justifyContent: 'center',
                    width: 36,
                  },
                  dimensions.width
                )}
              >
                <IconButton
                  onPress={() => {
                    try {
                      matchingFilters();
                      setFilterPressed(true);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  color={
                    (eventType[0] || country[0] || sector[0] || sourceType[0]
                      ? palettes.Brand['Strong Inverse']
                      : palettes.App.Strong2) ?? palettes.App.Strong2
                  }
                  icon={'MaterialIcons/filter-alt'}
                  size={24}
                />
              </View>
            </Shadow>
          </HStack>
          <Spacer left={8} right={8} bottom={2.5} top={2.5} />
        </View>
      </View>

      <XanoCollectionApi.FetchGetAllEventsGET
        countryIn={country}
        device={deviceType(
          Platform.OS === 'web',
          Platform.OS === 'ios',
          Platform.OS === 'android'
        )}
        eventTypeIn={eventType}
        handlers={{
          on2xx: fetchData => {
            try {
              setEventItems(fetchData?.json?.items);
              setNextPage(fetchData?.json?.nextPage);
              setLastPage(fetchData?.json?.pageTotal);
              console.log(nextPage, lastPage);
            } catch (err) {
              console.error(err);
            }
          },
          on401: fetchData => {
            try {
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
          onData: fetchData => {
            try {
              setNextPage(fetchData?.nextPage);
              setLastPage(fetchData?.pageTotal);
              if (
                Constants['WATCHED_EVENT_IDX'] > -1 &&
                !(Platform.OS === 'web')
              ) {
                listAwqPzJqXRef.current.scrollToIndex({
                  index: Constants['WATCHED_EVENT_IDX'],
                  viewOffset: undefined,
                  viewPosition: undefined,
                  animated: true,
                });
              }
            } catch (err) {
              console.error(err);
            }
          },
        }}
        keyword={keywordSearch}
        page={1}
        region_in={regions}
        screenCode={screenCode}
        sectorIn={sector}
        sourceType_in={sourceType}
      >
        {({ loading, error, data, refetchGetAllEvents }) => {
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
                  {
                    alignContent: 'center',
                    alignItems: 'center',
                    marginBottom: 5,
                  },
                  dimensions.width
                )}
              >
                {/* View 2 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignContent: {
                        minWidth: Breakpoints.Desktop,
                        value: 'center',
                      },
                      alignItems: 'center',
                      alignSelf: 'auto',
                      flexDirection: 'row',
                      marginBottom: 5,
                      marginTop: { minWidth: Breakpoints.Tablet, value: 5 },
                      maxWidth: 1200,
                      paddingLeft: [
                        { minWidth: Breakpoints.Desktop, value: 10 },
                        { minWidth: Breakpoints.Tablet, value: 15 },
                        { minWidth: Breakpoints.Mobile, value: 15 },
                      ],
                      paddingRight: 10,
                      width: '100%',
                    },
                    dimensions.width
                  )}
                >
                  {/*  Text 1 */}
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                    disabled={true}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['screen_title'].style,
                        {
                          alignSelf: 'flex-start',
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
                    suppressHighlighting={true}
                  >
                    {fetchData?.itemsTotal}{' '}
                    {fetchData?.itemsTotal === 1 ? 'event' : 'events'}
                    {' matching filter '}
                    {dimensions.width >= Breakpoints.Tablet
                      ? '(New data is fetched automatically)'
                      : undefined}
                  </Text>
                </View>
              </View>
              {/* View 3 */}
              <View
                style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
              >
                <>
                  {dimensions.width >= Breakpoints.Laptop ? null : (
                    <SimpleStyleFlatList
                      data={eventItems}
                      horizontal={false}
                      inverted={false}
                      keyExtractor={(listData, index) =>
                        listData?.id ??
                        listData?.uuid ??
                        index?.toString() ??
                        JSON.stringify(listData)
                      }
                      keyboardShouldPersistTaps={'never'}
                      listKey={'AwqPzJqX'}
                      nestedScrollEnabled={false}
                      numColumns={1}
                      onEndReached={() => {
                        const handler = async () => {
                          try {
                            if (nextPage === null) {
                              return;
                            }
                            setLoadingMore(true);

                            const value5LnNJ7Yb = parseInt(nextPage + 1, 10);
                            setNextPage(value5LnNJ7Yb);
                            const nextPageSet = value5LnNJ7Yb;
                            /* hidden 'Log to Console' action */
                            const newData = (
                              await XanoCollectionApi.getAllEventsGET(
                                Constants,
                                {
                                  countryIn: country,
                                  device: deviceType(
                                    Platform.OS === 'web',
                                    Platform.OS === 'ios',
                                    Platform.OS === 'android'
                                  ),
                                  eventTypeIn: eventType,
                                  keyword: keywordSearchRaw,
                                  page: nextPage,
                                  region_in: regions,
                                  screenCode: screenCode,
                                  sectorIn: sector,
                                  sourceType_in: sourceType,
                                }
                              )
                            )?.json;
                            setLoadingMore(false);
                            if (newData?.items?.length === 0) {
                              return;
                            }
                            setEventItems(eventItems.concat(newData?.items));
                            setLastPage(newData?.pageTotal);
                          } catch (err) {
                            console.error(err);
                          }
                        };
                        handler();
                      }}
                      refreshControl={
                        <RefreshControl
                          refreshing={refreshingAwqPzJqX}
                          onRefresh={() => {
                            const handler = async () => {
                              try {
                                setRefreshingAwqPzJqX(true);
                                await refetchGetAllEvents();
                                setRefreshingAwqPzJqX(false);
                              } catch (err) {
                                console.error(err);
                                setRefreshingAwqPzJqX(false);
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
                                alignContent: {
                                  minWidth: Breakpoints.BigScreen,
                                  value: 'center',
                                },
                                alignSelf: {
                                  minWidth: Breakpoints.BigScreen,
                                  value: 'center',
                                },
                                flex: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 1,
                                },
                                maxWidth: {
                                  minWidth: Breakpoints.BigScreen,
                                  value: 1200,
                                },
                                padding: {
                                  minWidth: Breakpoints.Desktop,
                                  value: 5,
                                },
                                paddingLeft: [
                                  { minWidth: Breakpoints.Desktop, value: 10 },
                                  { minWidth: Breakpoints.Mobile, value: 10 },
                                  {
                                    minWidth: Breakpoints.BigScreen,
                                    value: 15,
                                  },
                                ],
                                paddingRight: [
                                  { minWidth: Breakpoints.Desktop, value: 10 },
                                  { minWidth: Breakpoints.Mobile, value: 10 },
                                  {
                                    minWidth: Breakpoints.BigScreen,
                                    value: 10,
                                  },
                                ],
                                width: {
                                  minWidth: Breakpoints.BigScreen,
                                  value: '100%',
                                },
                              },
                              dimensions.width
                            )}
                          >
                            <>
                              {!listData?.source
                                ?.toLowerCase()
                                .includes('proprietary') ? null : (
                                <WatermarkerBlock />
                              )}
                            </>
                            <Touchable
                              onPress={() => {
                                try {
                                  /* hidden 'Navigate' action */
                                  /* hidden 'Set Variable' action */

                                  const valueP1z8rKBd = listData?.id;
                                  setViewingEventId(valueP1z8rKBd);
                                  const thisId = valueP1z8rKBd;
                                  setGlobalVariableValue({
                                    key: 'SS_SCREEN_NAME',
                                    value: 'EventsDetials:' + thisId.toString(),
                                  });
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    borderBottomWidth: 0.5,
                                    borderColor: theme.colors.text.light,
                                    flexWrap: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 'nowrap',
                                    },
                                    minHeight: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 85,
                                    },
                                    paddingBottom: 5,
                                    paddingTop: 5,
                                  },
                                  dimensions.width
                                )}
                              >
                                <H6
                                  selectable={false}
                                  {...GlobalStyles.H6Styles(theme)['H6'].props}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.H6Styles(theme)['H6'].style,
                                      {
                                        fontFamily: 'Quicksand_700Bold',
                                        fontSize: [
                                          {
                                            minWidth: Breakpoints.Mobile,
                                            value: 14,
                                          },
                                          {
                                            minWidth: Breakpoints.Laptop,
                                            value: 16,
                                          },
                                        ],
                                        margin: 0,
                                        marginBottom: [
                                          {
                                            minWidth: Breakpoints.Laptop,
                                            value: 5,
                                          },
                                          {
                                            minWidth: Breakpoints.Mobile,
                                            value: 0,
                                          },
                                        ],
                                        marginTop: 0,
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {showNKPProp(
                                    listData?.headline,
                                    listData?.source
                                  )}
                                </H6>

                                <HStack
                                  {...GlobalStyles.HStackStyles(theme)[
                                    'H Stack'
                                  ].props}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.HStackStyles(theme)[
                                        'H Stack'
                                      ].style,
                                      { gap: 10 }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  <Text
                                    accessible={true}
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
                                          fontFamily: 'Quicksand_400Regular',
                                          fontSize: [
                                            {
                                              minWidth: Breakpoints.Mobile,
                                              value: 12,
                                            },
                                            {
                                              minWidth: Breakpoints.Laptop,
                                              value: 14,
                                            },
                                          ],
                                          marginBottom: {
                                            minWidth: Breakpoints.Laptop,
                                            value: 5,
                                          },
                                          marginTop: 4,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                    suppressHighlighting={true}
                                  >
                                    {listData?.published}
                                    {' | Source: '}
                                    {listData?.source}
                                  </Text>
                                  <>
                                    {!isNKPProp(listData?.source) ? null : (
                                      <Image
                                        resizeMode={'cover'}
                                        {...GlobalStyles.ImageStyles(theme)[
                                          'Image'
                                        ].props}
                                        source={imageSource(
                                          Images['mainsightsfaviconlogo1024new']
                                        )}
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.ImageStyles(theme)[
                                              'Image'
                                            ].style,
                                            { height: 18, width: 18 }
                                          ),
                                          dimensions.width
                                        )}
                                      />
                                    )}
                                  </>
                                </HStack>
                                <>
                                  {!listData?.cfs_sold ? null : (
                                    <Text
                                      accessible={true}
                                      {...GlobalStyles.TextStyles(theme)[
                                        'screen_title_stockH'
                                      ].props}
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)[
                                            'screen_title_stockH'
                                          ].style,
                                          {
                                            color: palettes.App.Orange,
                                            fontFamily: 'Quicksand_400Regular',
                                            fontSize: 12,
                                            marginTop: 4,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {'*This company has since been sold*'}
                                    </Text>
                                  )}
                                </>
                                {/* Text 2 */}
                                <Text
                                  accessible={true}
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
                                        fontFamily: 'Quicksand_400Regular',
                                        fontSize: [
                                          {
                                            minWidth: Breakpoints.Mobile,
                                            value: 12,
                                          },
                                          {
                                            minWidth: Breakpoints.Laptop,
                                            value: 14,
                                          },
                                        ],
                                        marginBottom: {
                                          minWidth: Breakpoints.Laptop,
                                          value: 5,
                                        },
                                        marginTop: 4,
                                        textAlign: 'left',
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                  suppressHighlighting={true}
                                >
                                  {listData?.description}
                                </Text>
                              </View>
                            </Touchable>
                          </View>
                        );
                      }}
                      onEndReachedThreshold={0.2}
                      ref={listAwqPzJqXRef}
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={true}
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: {
                            minWidth: Breakpoints.BigScreen,
                            value: 'center',
                          },
                          alignItems: {
                            minWidth: Breakpoints.BigScreen,
                            value: 'stretch',
                          },
                          alignSelf: {
                            minWidth: Breakpoints.BigScreen,
                            value: 'center',
                          },
                          marginBottom:
                            dimensions.width >= Breakpoints.Laptop
                              ? 0
                              : Platform.OS === 'ios'
                              ? 75
                              : 35,
                          paddingLeft: {
                            minWidth: Breakpoints.Desktop,
                            value: setPadding(dimensions.width),
                          },
                          paddingRight: {
                            minWidth: Breakpoints.Desktop,
                            value: setPadding(dimensions.width),
                          },
                        },
                        dimensions.width
                      )}
                    />
                  )}
                </>
                {/* List Larger */}
                <>
                  {!(dimensions.width >= Breakpoints.Laptop) ? null : (
                    <SimpleStyleFlatList
                      data={eventItems}
                      horizontal={false}
                      inverted={false}
                      keyExtractor={(listLargerData, index) => index}
                      keyboardShouldPersistTaps={'never'}
                      listKey={'f9DpjkHa'}
                      nestedScrollEnabled={false}
                      numColumns={1}
                      onEndReached={() => {
                        const handler = async () => {
                          try {
                            if (nextPage === null) {
                              return;
                            }
                            setLoadingMore(true);

                            const valueFAyE96NF = parseInt(nextPage + 1, 10);
                            setNextPage(valueFAyE96NF);
                            const nextPageSet = valueFAyE96NF;
                            /* hidden 'Log to Console' action */
                            const newData = (
                              await XanoCollectionApi.getAllEventsGET(
                                Constants,
                                {
                                  countryIn: country,
                                  device: deviceType(
                                    Platform.OS === 'web',
                                    Platform.OS === 'ios',
                                    Platform.OS === 'android'
                                  ),
                                  eventTypeIn: eventType,
                                  keyword: keywordSearchRaw,
                                  page: nextPage,
                                  region_in: regions,
                                  screenCode: screenCode,
                                  sectorIn: sector,
                                  sourceType_in: sourceType,
                                }
                              )
                            )?.json;
                            setLoadingMore(false);
                            if (newData?.items?.length === 0) {
                              return;
                            }
                            setEventItems(eventItems.concat(newData?.items));
                            setLastPage(newData?.pageTotal);
                          } catch (err) {
                            console.error(err);
                          }
                        };
                        handler();
                      }}
                      onEndReachedThreshold={0.5}
                      refreshControl={
                        <RefreshControl
                          refreshing={refreshingf9DpjkHa}
                          onRefresh={() => {
                            const handler = async () => {
                              try {
                                setRefreshingf9DpjkHa(true);
                                await refetchGetAllEvents();
                                setRefreshingf9DpjkHa(false);
                              } catch (err) {
                                console.error(err);
                                setRefreshingf9DpjkHa(false);
                              }
                            };
                            handler();
                          }}
                        />
                      }
                      renderItem={({ item, index }) => {
                        const listLargerData = item;
                        return (
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignContent: {
                                  minWidth: Breakpoints.BigScreen,
                                  value: 'center',
                                },
                                alignSelf: {
                                  minWidth: Breakpoints.BigScreen,
                                  value: 'center',
                                },
                                flex: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 1,
                                },
                                maxWidth: {
                                  minWidth: Breakpoints.BigScreen,
                                  value: 1200,
                                },
                                padding: {
                                  minWidth: Breakpoints.Desktop,
                                  value: 5,
                                },
                                paddingLeft: [
                                  { minWidth: Breakpoints.Desktop, value: 10 },
                                  { minWidth: Breakpoints.Mobile, value: 10 },
                                  {
                                    minWidth: Breakpoints.BigScreen,
                                    value: 15,
                                  },
                                ],
                                paddingRight: [
                                  { minWidth: Breakpoints.Desktop, value: 10 },
                                  { minWidth: Breakpoints.Mobile, value: 10 },
                                  {
                                    minWidth: Breakpoints.BigScreen,
                                    value: 10,
                                  },
                                ],
                                width: {
                                  minWidth: Breakpoints.BigScreen,
                                  value: '100%',
                                },
                              },
                              dimensions.width
                            )}
                          >
                            <>
                              {!listLargerData?.source
                                ?.toLowerCase()
                                .includes('proprietary') ? null : (
                                <WatermarkerBlock />
                              )}
                            </>
                            <Touchable
                              onPress={() => {
                                try {
                                  /* hidden 'Navigate' action */
                                  /* hidden 'Set Variable' action */
                                  setViewingEventId(listLargerData?.id);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    borderBottomWidth: 0.5,
                                    borderColor: theme.colors.text.light,
                                    flexWrap: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 'nowrap',
                                    },
                                    minHeight: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 85,
                                    },
                                    paddingBottom: 5,
                                    paddingTop: 5,
                                  },
                                  dimensions.width
                                )}
                              >
                                <H6
                                  selectable={false}
                                  {...GlobalStyles.H6Styles(theme)['H6'].props}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.H6Styles(theme)['H6'].style,
                                      {
                                        fontFamily: 'Quicksand_700Bold',
                                        fontSize: [
                                          {
                                            minWidth: Breakpoints.Mobile,
                                            value: 14,
                                          },
                                          {
                                            minWidth: Breakpoints.Laptop,
                                            value: 16,
                                          },
                                        ],
                                        margin: 0,
                                        marginBottom: [
                                          {
                                            minWidth: Breakpoints.Laptop,
                                            value: 5,
                                          },
                                          {
                                            minWidth: Breakpoints.Mobile,
                                            value: 0,
                                          },
                                        ],
                                        marginTop: 0,
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {showNKPProp(
                                    listLargerData?.headline,
                                    listLargerData?.source
                                  )}
                                </H6>

                                <HStack
                                  {...GlobalStyles.HStackStyles(theme)[
                                    'H Stack'
                                  ].props}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.HStackStyles(theme)[
                                        'H Stack'
                                      ].style,
                                      { gap: 10 }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  <Text
                                    accessible={true}
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
                                          fontFamily: 'Quicksand_400Regular',
                                          fontSize: [
                                            {
                                              minWidth: Breakpoints.Mobile,
                                              value: 12,
                                            },
                                            {
                                              minWidth: Breakpoints.Laptop,
                                              value: 14,
                                            },
                                          ],
                                          marginBottom: {
                                            minWidth: Breakpoints.Laptop,
                                            value: 5,
                                          },
                                          marginTop: 4,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                    suppressHighlighting={true}
                                  >
                                    {listLargerData?.published}
                                    {' | Source: '}
                                    {listLargerData?.source}
                                  </Text>
                                  <>
                                    {!isNKPProp(
                                      listLargerData?.source
                                    ) ? null : (
                                      <Image
                                        resizeMode={'cover'}
                                        {...GlobalStyles.ImageStyles(theme)[
                                          'Image'
                                        ].props}
                                        source={imageSource(
                                          Images['mainsightsfaviconlogo1024new']
                                        )}
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.ImageStyles(theme)[
                                              'Image'
                                            ].style,
                                            { height: 18, width: 18 }
                                          ),
                                          dimensions.width
                                        )}
                                      />
                                    )}
                                  </>
                                </HStack>
                                {/* Text 2 */}
                                <Text
                                  accessible={true}
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
                                        fontFamily: 'Quicksand_400Regular',
                                        fontSize: [
                                          {
                                            minWidth: Breakpoints.Mobile,
                                            value: 12,
                                          },
                                          {
                                            minWidth: Breakpoints.Laptop,
                                            value: 14,
                                          },
                                        ],
                                        marginBottom: {
                                          minWidth: Breakpoints.Laptop,
                                          value: 5,
                                        },
                                        marginTop: 4,
                                        textAlign: 'left',
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                  suppressHighlighting={true}
                                >
                                  {listLargerData?.description}
                                </Text>
                              </View>
                            </Touchable>
                          </View>
                        );
                      }}
                      showsHorizontalScrollIndicator={true}
                      showsVerticalScrollIndicator={true}
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: {
                            minWidth: Breakpoints.BigScreen,
                            value: 'center',
                          },
                          alignItems: {
                            minWidth: Breakpoints.BigScreen,
                            value: 'stretch',
                          },
                          alignSelf: {
                            minWidth: Breakpoints.BigScreen,
                            value: 'center',
                          },
                          marginBottom:
                            dimensions.width >= Breakpoints.Laptop ? 0 : 65,
                          paddingLeft: {
                            minWidth: Breakpoints.Desktop,
                            value: setPadding(dimensions.width),
                          },
                          paddingRight: {
                            minWidth: Breakpoints.Desktop,
                            value: setPadding(dimensions.width),
                          },
                        },
                        dimensions.width
                      )}
                    />
                  )}
                </>
              </View>
              {/* Modal 2 */}
              <Modal
                supportedOrientations={['portrait', 'landscape']}
                animationType={'fade'}
                presentationStyle={'overFullScreen'}
                transparent={true}
                visible={filterPressed}
              >
                <SimpleStyleScrollView
                  bounces={true}
                  horizontal={false}
                  keyboardShouldPersistTaps={'never'}
                  nestedScrollEnabled={false}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      height: '100%',
                      justifyContent: [
                        { minWidth: Breakpoints.Desktop, value: 'flex-start' },
                        { minWidth: Breakpoints.Mobile, value: 'center' },
                        { minWidth: Breakpoints.Tablet, value: 'center' },
                      ],
                      paddingTop: { minWidth: Breakpoints.Desktop, value: 150 },
                      width: '100%',
                    },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: [
                          { minWidth: Breakpoints.Mobile, value: 'center' },
                          { minWidth: Breakpoints.Laptop, value: 'stretch' },
                        ],
                        borderRadius: 8,
                        justifyContent: 'center',
                        maxWidth: [
                          { minWidth: Breakpoints.Mobile, value: 380 },
                          { minWidth: Breakpoints.Tablet, value: 600 },
                          { minWidth: Breakpoints.Laptop, value: 750 },
                        ],
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
                          { margin: null, padding: 10 }
                        ),
                        dimensions.width
                      )}
                    >
                      <HStack
                        {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.HStackStyles(theme)['H Stack'].style,
                            {
                              alignItems: 'flex-start',
                              backgroundColor: 'rgba(0, 0, 0, 0)',
                              justifyContent: 'space-between',
                              padding: 10,
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        <H5
                          selectable={false}
                          {...GlobalStyles.H5Styles(theme)['H5'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.H5Styles(theme)['H5'].style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontSize: 16,
                                marginTop: 0,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Filtering events list'}
                        </H5>

                        <Shadow
                          offsetX={0}
                          paintInside={true}
                          showShadowCornerBottomEnd={true}
                          showShadowCornerBottomStart={true}
                          showShadowCornerTopEnd={true}
                          showShadowCornerTopStart={true}
                          showShadowSideBottom={true}
                          showShadowSideEnd={true}
                          showShadowSideStart={true}
                          showShadowSideTop={true}
                          distance={3}
                          offsetY={2}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                backgroundColor: theme.colors.background.brand,
                                borderRadius: 50,
                                height: 36,
                                justifyContent: 'center',
                                width: 36,
                              },
                              dimensions.width
                            )}
                          >
                            <IconButton
                              onPress={() => {
                                try {
                                  setFilterPressed(false);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              color={palettes.App.Strong2}
                              icon={'AntDesign/close'}
                              size={24}
                            />
                          </View>
                        </Shadow>
                      </HStack>
                      {/* Event type */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'stretch',
                            flexDirection: 'column',
                            gap: 8,
                            padding: 10,
                            width: '100%',
                          },
                          dimensions.width
                        )}
                      >
                        <H5
                          selectable={false}
                          {...GlobalStyles.H5Styles(theme)['H5'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.H5Styles(theme)['H5'].style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontSize: 16,
                                marginBottom: 0,
                                marginTop: 0,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Event type'}
                        </H5>

                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'flex-start',
                              flex: 0,
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              gap: 0,
                              justifyContent: 'flex-start',
                              margin: -4,
                              width: '100%',
                            },
                            dimensions.width
                          )}
                        >
                          {/* Future opportunity */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                gap: 4,
                                padding: 4,
                                width: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: '50%',
                                  },
                                  {
                                    minWidth: Breakpoints.Tablet,
                                    value: '33.33%',
                                  },
                                  {
                                    minWidth: Breakpoints.Desktop,
                                    value: '25%',
                                  },
                                  {
                                    minWidth: Breakpoints.Laptop,
                                    value: '25%',
                                  },
                                ],
                              },
                              dimensions.width
                            )}
                          >
                            <Checkbox
                              onCheck={() => {
                                try {
                                  /* hidden 'Set Variable' action */
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              onPress={newCheckboxValue => {
                                try {
                                  setFuture_opportunity(newCheckboxValue);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              color={palettes.Brand['Strong Inverse']}
                              size={24}
                              status={future_opportunity}
                              uncheckedColor={palettes.Brand['Strong Inverse']}
                            />
                            <Pressable
                              onPress={() => {
                                try {
                                  setFuture_opportunity(
                                    future_opportunity ? false : true
                                  );
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              <Text
                                accessible={true}
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
                                      color: palettes.Brand['Strong Inverse'],
                                      fontFamily: 'Quicksand_400Regular',
                                      fontSize: 12,
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                              >
                                {'Future opportunity'}
                              </Text>
                            </Pressable>
                          </View>
                          {/* Acq agenda and other */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                gap: 4,
                                padding: 4,
                                width: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: '47%',
                                  },
                                  {
                                    minWidth: Breakpoints.Tablet,
                                    value: '33.33%',
                                  },
                                  {
                                    minWidth: Breakpoints.Desktop,
                                    value: '25%',
                                  },
                                  {
                                    minWidth: Breakpoints.Laptop,
                                    value: '25%',
                                  },
                                ],
                              },
                              dimensions.width
                            )}
                          >
                            <Checkbox
                              onPress={newCheckboxValue => {
                                try {
                                  setAcq_agenda(newCheckboxValue);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              color={palettes.Brand['Strong Inverse']}
                              size={24}
                              status={acq_agenda}
                              uncheckedColor={palettes.Brand['Strong Inverse']}
                            />
                            <Pressable
                              onPress={() => {
                                try {
                                  setAcq_agenda(acq_agenda ? false : true);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              <Text
                                accessible={true}
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
                                      color: palettes.Brand['Strong Inverse'],
                                      fontFamily: 'Quicksand_400Regular',
                                      fontSize: 12,
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                              >
                                {'Acq. agenda & other'}
                              </Text>
                            </Pressable>
                          </View>
                          {/* Transaction */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                gap: 4,
                                padding: 4,
                                width: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: '47%',
                                  },
                                  {
                                    minWidth: Breakpoints.Tablet,
                                    value: '33.33%',
                                  },
                                  {
                                    minWidth: Breakpoints.Desktop,
                                    value: '25%',
                                  },
                                  {
                                    minWidth: Breakpoints.Laptop,
                                    value: '25%',
                                  },
                                ],
                              },
                              dimensions.width
                            )}
                          >
                            <Checkbox
                              onPress={newCheckboxValue => {
                                try {
                                  setTransaction(newCheckboxValue);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              color={palettes.Brand['Strong Inverse']}
                              size={24}
                              status={transaction}
                              uncheckedColor={palettes.Brand['Strong Inverse']}
                            />
                            <Pressable
                              onPress={() => {
                                try {
                                  setTransaction(transaction ? false : true);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              <Text
                                accessible={true}
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
                                      color: palettes.Brand['Strong Inverse'],
                                      fontFamily: 'Quicksand_400Regular',
                                      fontSize: 12,
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                              >
                                {'Transaction'}
                              </Text>
                            </Pressable>
                          </View>
                        </View>
                      </View>
                      {/* Country */}
                      <>
                        {!(Platform.OS === 'web') ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'stretch',
                                flexDirection: 'column',
                                gap: 8,
                                padding: 10,
                              },
                              dimensions.width
                            )}
                          >
                            <H5
                              selectable={false}
                              {...GlobalStyles.H5Styles(theme)['H5'].props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.H5Styles(theme)['H5'].style,
                                  {
                                    color: palettes.Brand['Strong Inverse'],
                                    fontSize: 16,
                                    marginBottom: 0,
                                    marginTop: 0,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {'Country'}
                            </H5>

                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'flex-start',
                                  flex: 0,
                                  flexDirection: 'row',
                                  flexWrap: 'wrap',
                                  gap: 0,
                                  justifyContent: 'flex-start',
                                  margin: -4,
                                  width: '100%',
                                },
                                dimensions.width
                              )}
                            >
                              {/* Austria */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    gap: 4,
                                    padding: 4,
                                    width: [
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: '50%',
                                      },
                                      {
                                        minWidth: Breakpoints.Tablet,
                                        value: '33.33%',
                                      },
                                      {
                                        minWidth: Breakpoints.Desktop,
                                        value: '25%',
                                      },
                                      {
                                        minWidth: Breakpoints.Laptop,
                                        value: '25%',
                                      },
                                    ],
                                  },
                                  dimensions.width
                                )}
                              >
                                <Checkbox
                                  onPress={newCheckboxValue => {
                                    try {
                                      setAustria(newCheckboxValue);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  color={palettes.Brand['Strong Inverse']}
                                  disabled={
                                    Constants['ME']?.access_regions === 'Nordic'
                                  }
                                  size={24}
                                  status={austria}
                                  uncheckedColor={
                                    palettes.Brand['Strong Inverse']
                                  }
                                />
                                <Pressable
                                  onPress={() => {
                                    try {
                                      setAustria(austria ? false : true);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  disabled={
                                    Constants['ME']?.access_regions === 'Nordic'
                                  }
                                >
                                  <Text
                                    accessible={true}
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
                                          fontSize: 12,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                    suppressHighlighting={true}
                                  >
                                    {'Austria'}
                                  </Text>
                                </Pressable>
                              </View>
                              {/* Denmark */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    gap: 4,
                                    padding: 4,
                                    width: [
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: '50%',
                                      },
                                      {
                                        minWidth: Breakpoints.Tablet,
                                        value: '33.33%',
                                      },
                                      {
                                        minWidth: Breakpoints.Desktop,
                                        value: '25%',
                                      },
                                      {
                                        minWidth: Breakpoints.Laptop,
                                        value: '25%',
                                      },
                                    ],
                                  },
                                  dimensions.width
                                )}
                              >
                                <Checkbox
                                  onPress={newCheckboxValue => {
                                    try {
                                      setDenmark(newCheckboxValue);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  color={palettes.Brand['Strong Inverse']}
                                  disabled={
                                    Constants['ME']?.access_regions === 'DACH'
                                  }
                                  size={24}
                                  status={denmark}
                                  uncheckedColor={
                                    palettes.Brand['Strong Inverse']
                                  }
                                />
                                <Pressable
                                  onPress={() => {
                                    try {
                                      setDenmark(denmark ? false : true);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  disabled={
                                    Constants['ME']?.access_regions === 'DACH'
                                  }
                                >
                                  <Text
                                    accessible={true}
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
                                          fontSize: 12,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                    suppressHighlighting={true}
                                  >
                                    {'Denmark'}
                                  </Text>
                                </Pressable>
                              </View>
                              {/* Finland */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    gap: 4,
                                    padding: 4,
                                    width: [
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: '50%',
                                      },
                                      {
                                        minWidth: Breakpoints.Tablet,
                                        value: '33.33%',
                                      },
                                      {
                                        minWidth: Breakpoints.Desktop,
                                        value: '25%',
                                      },
                                      {
                                        minWidth: Breakpoints.Laptop,
                                        value: '25%',
                                      },
                                    ],
                                  },
                                  dimensions.width
                                )}
                              >
                                <Checkbox
                                  onPress={newCheckboxValue => {
                                    try {
                                      setFinland(newCheckboxValue);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  color={palettes.Brand['Strong Inverse']}
                                  disabled={
                                    Constants['ME']?.access_regions === 'DACH'
                                  }
                                  size={24}
                                  status={finland}
                                  uncheckedColor={
                                    palettes.Brand['Strong Inverse']
                                  }
                                />
                                <Pressable
                                  onPress={() => {
                                    try {
                                      setFinland(finland ? false : true);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  disabled={
                                    Constants['ME']?.access_regions === 'DACH'
                                  }
                                >
                                  <Text
                                    accessible={true}
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
                                          fontSize: 12,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                    suppressHighlighting={true}
                                  >
                                    {'Finland'}
                                  </Text>
                                </Pressable>
                              </View>
                              {/* Germany */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    gap: 4,
                                    padding: 4,
                                    width: [
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: '50%',
                                      },
                                      {
                                        minWidth: Breakpoints.Tablet,
                                        value: '33.33%',
                                      },
                                      {
                                        minWidth: Breakpoints.Desktop,
                                        value: '25%',
                                      },
                                      {
                                        minWidth: Breakpoints.Laptop,
                                        value: '25%',
                                      },
                                    ],
                                  },
                                  dimensions.width
                                )}
                              >
                                <Checkbox
                                  onPress={newCheckboxValue => {
                                    try {
                                      setGermany(newCheckboxValue);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  color={palettes.Brand['Strong Inverse']}
                                  disabled={
                                    Constants['ME']?.access_regions === 'Nordic'
                                  }
                                  size={24}
                                  status={germany}
                                  uncheckedColor={
                                    palettes.Brand['Strong Inverse']
                                  }
                                />
                                <Pressable
                                  onPress={() => {
                                    try {
                                      setGermany(germany ? false : true);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  disabled={
                                    Constants['ME']?.access_regions === 'Nordic'
                                  }
                                >
                                  <Text
                                    accessible={true}
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
                                          fontSize: 12,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                    suppressHighlighting={true}
                                  >
                                    {'Germany'}
                                  </Text>
                                </Pressable>
                              </View>
                              {/* Norway */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    gap: 4,
                                    padding: 4,
                                    width: [
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: '50%',
                                      },
                                      {
                                        minWidth: Breakpoints.Tablet,
                                        value: '33.33%',
                                      },
                                      {
                                        minWidth: Breakpoints.Desktop,
                                        value: '25%',
                                      },
                                      {
                                        minWidth: Breakpoints.Laptop,
                                        value: '25%',
                                      },
                                    ],
                                  },
                                  dimensions.width
                                )}
                              >
                                <Checkbox
                                  onPress={newCheckboxValue => {
                                    try {
                                      setNorway(newCheckboxValue);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  color={palettes.Brand['Strong Inverse']}
                                  disabled={
                                    Constants['ME']?.access_regions === 'DACH'
                                  }
                                  size={24}
                                  status={norway}
                                  uncheckedColor={
                                    palettes.Brand['Strong Inverse']
                                  }
                                />
                                <Pressable
                                  onPress={() => {
                                    try {
                                      setNorway(norway ? false : true);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  disabled={
                                    Constants['ME']?.access_regions === 'DACH'
                                  }
                                >
                                  <Text
                                    accessible={true}
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
                                          fontSize: 12,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                    suppressHighlighting={true}
                                  >
                                    {'Norway'}
                                  </Text>
                                </Pressable>
                              </View>
                              {/* Sweden */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    gap: 4,
                                    padding: 4,
                                    width: [
                                      {
                                        minWidth: Breakpoints.Tablet,
                                        value: '33.33%',
                                      },
                                      {
                                        minWidth: Breakpoints.Desktop,
                                        value: '25%',
                                      },
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: '50%',
                                      },
                                      {
                                        minWidth: Breakpoints.Laptop,
                                        value: '25%',
                                      },
                                    ],
                                  },
                                  dimensions.width
                                )}
                              >
                                <Checkbox
                                  onPress={newCheckboxValue => {
                                    try {
                                      setSweden(newCheckboxValue);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  color={palettes.Brand['Strong Inverse']}
                                  disabled={
                                    Constants['ME']?.access_regions === 'DACH'
                                  }
                                  size={24}
                                  status={sweden}
                                  uncheckedColor={
                                    palettes.Brand['Strong Inverse']
                                  }
                                />
                                <Pressable
                                  onPress={() => {
                                    try {
                                      setSweden(sweden ? false : true);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  disabled={
                                    Constants['ME']?.access_regions === 'DACH'
                                  }
                                >
                                  <Text
                                    accessible={true}
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
                                          fontSize: 12,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                    suppressHighlighting={true}
                                  >
                                    {'Sweden'}
                                  </Text>
                                </Pressable>
                              </View>
                              {/* Switzerland */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    gap: 4,
                                    padding: 4,
                                    width: [
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: '50%',
                                      },
                                      {
                                        minWidth: Breakpoints.Tablet,
                                        value: '33.33%',
                                      },
                                      {
                                        minWidth: Breakpoints.Desktop,
                                        value: '25%',
                                      },
                                      {
                                        minWidth: Breakpoints.Laptop,
                                        value: '25%',
                                      },
                                    ],
                                  },
                                  dimensions.width
                                )}
                              >
                                <Checkbox
                                  onPress={newCheckboxValue => {
                                    try {
                                      setSwitzerland(newCheckboxValue);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  color={palettes.Brand['Strong Inverse']}
                                  disabled={
                                    Constants['ME']?.access_regions === 'Nordic'
                                  }
                                  size={24}
                                  status={switzerland}
                                  uncheckedColor={
                                    palettes.Brand['Strong Inverse']
                                  }
                                />
                                <Pressable
                                  onPress={() => {
                                    try {
                                      setSwitzerland(
                                        switzerland ? false : true
                                      );
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  disabled={
                                    Constants['ME']?.access_regions === 'Nordic'
                                  }
                                >
                                  <Text
                                    accessible={true}
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
                                          fontSize: 12,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                    suppressHighlighting={true}
                                  >
                                    {'Switzerland'}
                                  </Text>
                                </Pressable>
                              </View>
                            </View>
                          </View>
                        )}
                      </>
                      {/* Region */}
                      <>
                        {Platform.OS === 'web' ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'stretch',
                                flexDirection: 'column',
                                gap: 8,
                                padding: 10,
                              },
                              dimensions.width
                            )}
                          >
                            <H5
                              selectable={false}
                              {...GlobalStyles.H5Styles(theme)['H5'].props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.H5Styles(theme)['H5'].style,
                                  {
                                    color: palettes.Brand['Strong Inverse'],
                                    fontSize: 16,
                                    marginBottom: 0,
                                    marginTop: 0,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {'Region'}
                            </H5>

                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'flex-start',
                                  flex: 0,
                                  flexDirection: 'row',
                                  flexWrap: 'wrap',
                                  gap: 0,
                                  justifyContent: 'flex-start',
                                  margin: -4,
                                  width: '100%',
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
                                    padding: 4,
                                    width: [
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: '50%',
                                      },
                                      {
                                        minWidth: Breakpoints.Tablet,
                                        value: '33.33%',
                                      },
                                      {
                                        minWidth: Breakpoints.Desktop,
                                        value: '25%',
                                      },
                                      {
                                        minWidth: Breakpoints.Laptop,
                                        value: '25%',
                                      },
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
                                  color={palettes.Brand['Strong Inverse']}
                                  disabled={
                                    Constants['ME']?.access_regions === 'Nordic'
                                  }
                                  size={24}
                                  status={nordic}
                                  uncheckedColor={
                                    palettes.Brand['Strong Inverse']
                                  }
                                />
                                <Pressable
                                  onPress={() => {
                                    try {
                                      setNordic(!nordic);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  disabled={
                                    Constants['ME']?.access_regions === 'Nordic'
                                  }
                                >
                                  <Text
                                    accessible={true}
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
                                          fontSize: 12,
                                        }
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
                                    padding: 4,
                                    width: [
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: '50%',
                                      },
                                      {
                                        minWidth: Breakpoints.Tablet,
                                        value: '33.33%',
                                      },
                                      {
                                        minWidth: Breakpoints.Desktop,
                                        value: '25%',
                                      },
                                      {
                                        minWidth: Breakpoints.Laptop,
                                        value: '25%',
                                      },
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
                                  color={palettes.Brand['Strong Inverse']}
                                  disabled={
                                    Constants['ME']?.access_regions === 'DACH'
                                  }
                                  size={24}
                                  status={denmark}
                                  uncheckedColor={
                                    palettes.Brand['Strong Inverse']
                                  }
                                />
                                <Pressable
                                  onPress={() => {
                                    try {
                                      setDach(!dach);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  disabled={
                                    Constants['ME']?.access_regions === 'DACH'
                                  }
                                >
                                  <Text
                                    accessible={true}
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
                                          fontSize: 12,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                    suppressHighlighting={true}
                                  >
                                    {'DACH'}
                                  </Text>
                                </Pressable>
                              </View>
                              {/* RoW */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    gap: 4,
                                    padding: 4,
                                    width: [
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: '50%',
                                      },
                                      {
                                        minWidth: Breakpoints.Tablet,
                                        value: '33.33%',
                                      },
                                      {
                                        minWidth: Breakpoints.Desktop,
                                        value: '25%',
                                      },
                                      {
                                        minWidth: Breakpoints.Laptop,
                                        value: '25%',
                                      },
                                    ],
                                  },
                                  dimensions.width
                                )}
                              >
                                <Checkbox
                                  onPress={newCheckboxValue => {
                                    try {
                                      setRow(newCheckboxValue);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  color={palettes.Brand['Strong Inverse']}
                                  disabled={
                                    Constants['ME']?.access_regions === 'DACH'
                                  }
                                  size={24}
                                  status={finland}
                                  uncheckedColor={
                                    palettes.Brand['Strong Inverse']
                                  }
                                />
                                <Pressable
                                  onPress={() => {
                                    try {
                                      setRow(!row);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  disabled={
                                    Constants['ME']?.access_regions === 'DACH'
                                  }
                                >
                                  <Text
                                    accessible={true}
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
                                          fontSize: 12,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                    suppressHighlighting={true}
                                  >
                                    {'Rest of the world'}
                                  </Text>
                                </Pressable>
                              </View>
                            </View>
                          </View>
                        )}
                      </>
                      {/* Hint */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            justifyContent: 'flex-end',
                            marginBottom: 10,
                            paddingLeft: 10,
                            paddingRight: 10,
                          },
                          dimensions.width
                        )}
                      >
                        <>
                          {!(Constants['ME']?.access_regions === 'Nordic'
                            ? true
                            : false) ? null : (
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)['screen_title']
                                .props}
                              disabled={true}
                              selectionColor={palettes.Brand['Strong Inverse']}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)['screen_title']
                                    .style,
                                  {
                                    color: palettes.Brand['Strong Inverse'],
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                  }
                                ),
                                dimensions.width
                              )}
                              suppressHighlighting={true}
                            >
                              {
                                'Your subscription only includes access to Nordic-related events'
                              }
                            </Text>
                          )}
                        </>
                        {/* Text 2 */}
                        <>
                          {!(Constants['ME']?.access_regions === 'DACH'
                            ? true
                            : false) ? null : (
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)['screen_title']
                                .props}
                              disabled={true}
                              selectionColor={palettes.Brand['Strong Inverse']}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)['screen_title']
                                    .style,
                                  {
                                    color: palettes.Brand['Strong Inverse'],
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                  }
                                ),
                                dimensions.width
                              )}
                              suppressHighlighting={true}
                            >
                              {
                                'Your subscription only includes access to DACH-related events'
                              }
                            </Text>
                          )}
                        </>
                      </View>
                      {/* Sector */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'stretch',
                            flexDirection: 'column',
                            gap: 8,
                            padding: 10,
                          },
                          dimensions.width
                        )}
                      >
                        <H5
                          selectable={false}
                          {...GlobalStyles.H5Styles(theme)['H5'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.H5Styles(theme)['H5'].style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontSize: 16,
                                marginBottom: 0,
                                marginTop: 0,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Sector'}
                        </H5>

                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'flex-start',
                              flex: 0,
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              gap: 0,
                              justifyContent: 'flex-start',
                              margin: -4,
                              width: '100%',
                            },
                            dimensions.width
                          )}
                        >
                          {/* Communication Services */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                gap: 4,
                                padding: 4,
                                width: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: '50%',
                                  },
                                  {
                                    minWidth: Breakpoints.Tablet,
                                    value: '33.33%',
                                  },
                                  {
                                    minWidth: Breakpoints.Laptop,
                                    value: '25%',
                                  },
                                ],
                              },
                              dimensions.width
                            )}
                          >
                            <Checkbox
                              onPress={newCheckboxValue => {
                                try {
                                  setCommunication_services(newCheckboxValue);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              color={palettes.Brand['Strong Inverse']}
                              size={24}
                              status={communication_services}
                              uncheckedColor={palettes.Brand['Strong Inverse']}
                            />
                            <Pressable
                              onPress={() => {
                                try {
                                  setCommunication_services(
                                    communication_services ? false : true
                                  );
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              <Text
                                accessible={true}
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
                                      color: palettes.Brand['Strong Inverse'],
                                      fontFamily: 'Quicksand_400Regular',
                                      fontSize: 12,
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                              >
                                {'Communication Services'}
                              </Text>
                            </Pressable>
                          </View>
                          {/* Industrials */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                gap: 4,
                                padding: 4,
                                width: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: '50%',
                                  },
                                  {
                                    minWidth: Breakpoints.Tablet,
                                    value: '33.33%',
                                  },
                                  {
                                    minWidth: Breakpoints.Laptop,
                                    value: '25%',
                                  },
                                ],
                              },
                              dimensions.width
                            )}
                          >
                            <Checkbox
                              onPress={newCheckboxValue => {
                                try {
                                  setIndustrials(newCheckboxValue);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              color={palettes.Brand['Strong Inverse']}
                              size={24}
                              status={industrials}
                              uncheckedColor={palettes.Brand['Strong Inverse']}
                            />
                            <Pressable
                              onPress={() => {
                                try {
                                  setIndustrials(industrials ? false : true);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              <Text
                                accessible={true}
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
                                      color: palettes.Brand['Strong Inverse'],
                                      fontFamily: 'Quicksand_400Regular',
                                      fontSize: 12,
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                              >
                                {'Industrials'}
                              </Text>
                            </Pressable>
                          </View>
                          {/* Consumer Discretionary */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                gap: 4,
                                padding: 4,
                                width: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: '50%',
                                  },
                                  {
                                    minWidth: Breakpoints.Tablet,
                                    value: '33.33%',
                                  },
                                  {
                                    minWidth: Breakpoints.Laptop,
                                    value: '25%',
                                  },
                                ],
                              },
                              dimensions.width
                            )}
                          >
                            <Checkbox
                              onPress={newCheckboxValue => {
                                try {
                                  setConsumer_discretionary(newCheckboxValue);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              color={palettes.Brand['Strong Inverse']}
                              size={24}
                              status={consumer_discretionary}
                              uncheckedColor={palettes.Brand['Strong Inverse']}
                            />
                            <Pressable
                              onPress={() => {
                                try {
                                  setConsumer_discretionary(
                                    consumer_discretionary ? false : true
                                  );
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              <Text
                                accessible={true}
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
                                      color: palettes.Brand['Strong Inverse'],
                                      fontFamily: 'Quicksand_400Regular',
                                      fontSize: 12,
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                              >
                                {'Consumer Discretionary'}
                              </Text>
                            </Pressable>
                          </View>
                          {/* IT and Software */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                gap: 4,
                                padding: 4,
                                width: [
                                  {
                                    minWidth: Breakpoints.Tablet,
                                    value: '33.33%',
                                  },
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: '50%',
                                  },
                                  {
                                    minWidth: Breakpoints.Laptop,
                                    value: '25%',
                                  },
                                ],
                              },
                              dimensions.width
                            )}
                          >
                            <Checkbox
                              onPress={newCheckboxValue => {
                                try {
                                  setIt_and_software(newCheckboxValue);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              color={palettes.Brand['Strong Inverse']}
                              size={24}
                              status={it_and_software}
                              uncheckedColor={palettes.Brand['Strong Inverse']}
                            />
                            <Pressable
                              onPress={() => {
                                try {
                                  setIt_and_software(
                                    it_and_software ? false : true
                                  );
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              <Text
                                accessible={true}
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
                                      color: palettes.Brand['Strong Inverse'],
                                      fontFamily: 'Quicksand_400Regular',
                                      fontSize: 12,
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                              >
                                {'IT & Software'}
                              </Text>
                            </Pressable>
                          </View>
                          {/* Consumer Staples */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                gap: 4,
                                padding: 4,
                                width: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: '50%',
                                  },
                                  {
                                    minWidth: Breakpoints.Tablet,
                                    value: '33.33%',
                                  },
                                  {
                                    minWidth: Breakpoints.Laptop,
                                    value: '25%',
                                  },
                                ],
                              },
                              dimensions.width
                            )}
                          >
                            <Checkbox
                              onPress={newCheckboxValue => {
                                try {
                                  setConsumer_staples(newCheckboxValue);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              color={palettes.Brand['Strong Inverse']}
                              size={24}
                              status={consumer_staples}
                              uncheckedColor={palettes.Brand['Strong Inverse']}
                            />
                            <Pressable
                              onPress={() => {
                                try {
                                  setConsumer_staples(
                                    consumer_staples ? false : true
                                  );
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              <Text
                                accessible={true}
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
                                      color: palettes.Brand['Strong Inverse'],
                                      fontFamily: 'Quicksand_400Regular',
                                      fontSize: 12,
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                              >
                                {'Consumer Staples'}
                              </Text>
                            </Pressable>
                          </View>
                          {/* Materials */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                gap: 4,
                                padding: 4,
                                width: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: '50%',
                                  },
                                  {
                                    minWidth: Breakpoints.Tablet,
                                    value: '33.33%',
                                  },
                                  {
                                    minWidth: Breakpoints.Laptop,
                                    value: '25%',
                                  },
                                ],
                              },
                              dimensions.width
                            )}
                          >
                            <Checkbox
                              onPress={newCheckboxValue => {
                                try {
                                  setMaterials(newCheckboxValue);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              color={palettes.Brand['Strong Inverse']}
                              size={24}
                              status={materials}
                              uncheckedColor={palettes.Brand['Strong Inverse']}
                            />
                            <Pressable
                              onPress={() => {
                                try {
                                  setMaterials(materials ? false : true);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              <Text
                                accessible={true}
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
                                      color: palettes.Brand['Strong Inverse'],
                                      fontFamily: 'Quicksand_400Regular',
                                      fontSize: 12,
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                              >
                                {'Materials'}
                              </Text>
                            </Pressable>
                          </View>
                          {/* Energy */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                gap: 4,
                                padding: 4,
                                width: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: '50%',
                                  },
                                  {
                                    minWidth: Breakpoints.Tablet,
                                    value: '33.33%',
                                  },
                                  {
                                    minWidth: Breakpoints.Laptop,
                                    value: '25%',
                                  },
                                ],
                              },
                              dimensions.width
                            )}
                          >
                            <Checkbox
                              onPress={newCheckboxValue => {
                                try {
                                  setEnergy(newCheckboxValue);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              color={palettes.Brand['Strong Inverse']}
                              size={24}
                              status={energy}
                              uncheckedColor={palettes.Brand['Strong Inverse']}
                            />
                            <Pressable
                              onPress={() => {
                                try {
                                  setEnergy(energy ? false : true);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              <Text
                                accessible={true}
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
                                      color: palettes.Brand['Strong Inverse'],
                                      fontFamily: 'Quicksand_400Regular',
                                      fontSize: 12,
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                              >
                                {'Energy'}
                              </Text>
                            </Pressable>
                          </View>
                          {/* Real Estate */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                gap: 4,
                                padding: 4,
                                width: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: '50%',
                                  },
                                  {
                                    minWidth: Breakpoints.Tablet,
                                    value: '33.33%',
                                  },
                                  {
                                    minWidth: Breakpoints.Laptop,
                                    value: '25%',
                                  },
                                ],
                              },
                              dimensions.width
                            )}
                          >
                            <Checkbox
                              onPress={newCheckboxValue => {
                                try {
                                  setReal_estate(newCheckboxValue);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              color={palettes.Brand['Strong Inverse']}
                              size={24}
                              status={real_estate}
                              uncheckedColor={palettes.Brand['Strong Inverse']}
                            />
                            <Pressable
                              onPress={() => {
                                try {
                                  setReal_estate(real_estate ? false : true);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              <Text
                                accessible={true}
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
                                      color: palettes.Brand['Strong Inverse'],
                                      fontFamily: 'Quicksand_400Regular',
                                      fontSize: 12,
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                              >
                                {'Real Estate'}
                              </Text>
                            </Pressable>
                          </View>
                          {/* Financials */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                gap: 4,
                                padding: 4,
                                width: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: '50%',
                                  },
                                  {
                                    minWidth: Breakpoints.Tablet,
                                    value: '33.33%',
                                  },
                                  {
                                    minWidth: Breakpoints.Laptop,
                                    value: '25%',
                                  },
                                ],
                              },
                              dimensions.width
                            )}
                          >
                            <Checkbox
                              onPress={newCheckboxValue => {
                                try {
                                  setFinancials(newCheckboxValue);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              color={palettes.Brand['Strong Inverse']}
                              size={24}
                              status={financials}
                              uncheckedColor={palettes.Brand['Strong Inverse']}
                            />
                            <Pressable
                              onPress={() => {
                                try {
                                  setFinancials(financials ? false : true);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              <Text
                                accessible={true}
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
                                      color: palettes.Brand['Strong Inverse'],
                                      fontFamily: 'Quicksand_400Regular',
                                      fontSize: 12,
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                              >
                                {'Financials'}
                              </Text>
                            </Pressable>
                          </View>
                          {/* Utilities */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                gap: 4,
                                padding: 4,
                                width: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: '50%',
                                  },
                                  {
                                    minWidth: Breakpoints.Tablet,
                                    value: '33.33%',
                                  },
                                  {
                                    minWidth: Breakpoints.Laptop,
                                    value: '25%',
                                  },
                                ],
                              },
                              dimensions.width
                            )}
                          >
                            <Checkbox
                              onPress={newCheckboxValue => {
                                try {
                                  setUtilities(newCheckboxValue);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              color={palettes.Brand['Strong Inverse']}
                              size={24}
                              status={utilities}
                              uncheckedColor={palettes.Brand['Strong Inverse']}
                            />
                            <Pressable
                              onPress={() => {
                                try {
                                  setUtilities(utilities ? false : true);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              <Text
                                accessible={true}
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
                                      color: palettes.Brand['Strong Inverse'],
                                      fontFamily: 'Quicksand_400Regular',
                                      fontSize: 12,
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                              >
                                {'Utilities'}
                              </Text>
                            </Pressable>
                          </View>
                          {/* Health Care */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                gap: 4,
                                padding: 4,
                                width: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: '50%',
                                  },
                                  {
                                    minWidth: Breakpoints.Tablet,
                                    value: '33.33%',
                                  },
                                  {
                                    minWidth: Breakpoints.Laptop,
                                    value: '25%',
                                  },
                                ],
                              },
                              dimensions.width
                            )}
                          >
                            <Checkbox
                              onPress={newCheckboxValue => {
                                try {
                                  setHealth_care(newCheckboxValue);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              color={palettes.Brand['Strong Inverse']}
                              size={24}
                              status={health_care}
                              uncheckedColor={palettes.Brand['Strong Inverse']}
                            />
                            <Pressable
                              onPress={() => {
                                try {
                                  setHealth_care(health_care ? false : true);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              <Text
                                accessible={true}
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
                                      color: palettes.Brand['Strong Inverse'],
                                      fontFamily: 'Quicksand_400Regular',
                                      fontSize: 12,
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                              >
                                {'Health Care'}
                              </Text>
                            </Pressable>
                          </View>
                        </View>
                      </View>
                      {/* Source Type */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'stretch',
                            flexDirection: 'column',
                            gap: 8,
                            padding: 10,
                            width: '100%',
                          },
                          dimensions.width
                        )}
                      >
                        <H5
                          selectable={false}
                          {...GlobalStyles.H5Styles(theme)['H5'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.H5Styles(theme)['H5'].style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontSize: 16,
                                marginBottom: 0,
                                marginTop: 0,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Source Type'}
                        </H5>

                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'flex-start',
                              flex: 0,
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              gap: 0,
                              justifyContent: 'flex-start',
                              margin: -4,
                              width: '100%',
                            },
                            dimensions.width
                          )}
                        >
                          {/* NKP Proprietary */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                gap: 4,
                                padding: 4,
                                width: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: '50%',
                                  },
                                  {
                                    minWidth: Breakpoints.Tablet,
                                    value: '33.33%',
                                  },
                                  {
                                    minWidth: Breakpoints.Laptop,
                                    value: '25%',
                                  },
                                ],
                              },
                              dimensions.width
                            )}
                          >
                            <Checkbox
                              onCheck={() => {
                                try {
                                  /* hidden 'Set Variable' action */
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              onPress={newCheckboxValue => {
                                try {
                                  setNKP_Proprietary(newCheckboxValue);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              color={palettes.Brand['Strong Inverse']}
                              size={24}
                              status={NKP_Proprietary}
                              uncheckedColor={palettes.Brand['Strong Inverse']}
                            />
                            <Pressable
                              onPress={() => {
                                try {
                                  setNKP_Proprietary(
                                    NKP_Proprietary ? false : true
                                  );
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              <Text
                                accessible={true}
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
                                      color: palettes.Brand['Strong Inverse'],
                                      fontFamily: 'Quicksand_400Regular',
                                      fontSize: 12,
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                              >
                                {'NKP Proprietary'}
                              </Text>
                            </Pressable>
                          </View>
                          {/* Press Release */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                gap: 4,
                                padding: 4,
                                width: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: '50%',
                                  },
                                  {
                                    minWidth: Breakpoints.Tablet,
                                    value: '33.33%',
                                  },
                                  {
                                    minWidth: Breakpoints.Laptop,
                                    value: '25%',
                                  },
                                ],
                              },
                              dimensions.width
                            )}
                          >
                            <Checkbox
                              onPress={newCheckboxValue => {
                                try {
                                  setPress_Release(newCheckboxValue);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              color={palettes.Brand['Strong Inverse']}
                              size={24}
                              status={Press_Release}
                              uncheckedColor={palettes.Brand['Strong Inverse']}
                            />
                            <Pressable
                              onPress={() => {
                                try {
                                  setPress_Release(
                                    Press_Release ? false : true
                                  );
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              <Text
                                accessible={true}
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
                                      color: palettes.Brand['Strong Inverse'],
                                      fontFamily: 'Quicksand_400Regular',
                                      fontSize: 12,
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                              >
                                {'Press Release'}
                              </Text>
                            </Pressable>
                          </View>
                          {/* Media & Other */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                gap: 4,
                                padding: 4,
                                width: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: '50%',
                                  },
                                  {
                                    minWidth: Breakpoints.Tablet,
                                    value: '33.33%',
                                  },
                                  {
                                    minWidth: Breakpoints.Laptop,
                                    value: '25%',
                                  },
                                ],
                              },
                              dimensions.width
                            )}
                          >
                            <Checkbox
                              onPress={newCheckboxValue => {
                                try {
                                  setMedia_and_Other(newCheckboxValue);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              color={palettes.Brand['Strong Inverse']}
                              size={24}
                              status={Media_and_Other}
                              uncheckedColor={palettes.Brand['Strong Inverse']}
                            />
                            <Pressable
                              onPress={() => {
                                try {
                                  setMedia_and_Other(
                                    Media_and_Other ? false : true
                                  );
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              <Text
                                accessible={true}
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
                                      color: palettes.Brand['Strong Inverse'],
                                      fontFamily: 'Quicksand_400Regular',
                                      fontSize: 12,
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                              >
                                {'Media & Other'}
                              </Text>
                            </Pressable>
                          </View>
                        </View>
                      </View>
                      <Spacer bottom={10} left={0} right={0} top={10} />
                      {/* Buttons */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignContent: 'flex-start',
                            flexDirection: 'row',
                            flexGrow: 1,
                            gap: [
                              { minWidth: Breakpoints.Mobile, value: 0 },
                              { minWidth: Breakpoints.Laptop, value: 10 },
                            ],
                            justifyContent: [
                              {
                                minWidth: Breakpoints.Mobile,
                                value: 'flex-start',
                              },
                              {
                                minWidth: Breakpoints.Laptop,
                                value: 'flex-start',
                              },
                            ],
                            marginBottom: 10,
                            padding: 5,
                          },
                          dimensions.width
                        )}
                      >
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              maxWidth: {
                                minWidth: Breakpoints.Tablet,
                                value: 150,
                              },
                              padding: 5,
                              width: '50%',
                            },
                            dimensions.width
                          )}
                        >
                          {/* Reset */}
                          <Button
                            iconPosition={'left'}
                            onPress={() => {
                              try {
                                toggleAllFilters(false);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            {...GlobalStyles.ButtonStyles(theme)['Button']
                              .props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.ButtonStyles(theme)['Button']
                                  .style,
                                {
                                  backgroundColor: 'rgba(0, 0, 0, 0)',
                                  borderColor: palettes.Brand['Strong Inverse'],
                                  borderWidth: 1,
                                  fontFamily: 'Quicksand_600SemiBold',
                                  textTransform: 'uppercase',
                                  width: [
                                    {
                                      minWidth: Breakpoints.Laptop,
                                      value: 150,
                                    },
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: '100%',
                                    },
                                  ],
                                }
                              ),
                              dimensions.width
                            )}
                            title={'Reset'}
                          />
                        </View>
                        {/* View 3 */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              maxWidth: {
                                minWidth: Breakpoints.Tablet,
                                value: 150,
                              },
                              padding: 5,
                              width: '50%',
                            },
                            dimensions.width
                          )}
                        >
                          {/* Results */}
                          <Button
                            iconPosition={'left'}
                            onPress={() => {
                              const handler = async () => {
                                try {
                                  applyFilter();
                                  setKeywordSearch(keywordSearchRaw);
                                  setFilterPressed(false);
                                  await waitUtil({ milliseconds: 1000 });
                                  /* hidden 'Refetch Data' action */
                                } catch (err) {
                                  console.error(err);
                                }
                              };
                              handler();
                            }}
                            {...GlobalStyles.ButtonStyles(theme)['Button']
                              .props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.ButtonStyles(theme)['Button']
                                  .style,
                                {
                                  backgroundColor: palettes.App.Orange,
                                  fontFamily: 'Quicksand_600SemiBold',
                                  textTransform: 'uppercase',
                                  width: [
                                    {
                                      minWidth: Breakpoints.Laptop,
                                      value: 150,
                                    },
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: '100%',
                                    },
                                  ],
                                }
                              ),
                              dimensions.width
                            )}
                            title={'Filter'}
                          />
                        </View>
                      </View>
                    </LinearGradient>
                  </View>
                </SimpleStyleScrollView>
              </Modal>
            </>
          );
        }}
      </XanoCollectionApi.FetchGetAllEventsGET>
      <CustomBottomNavBlock />
      {/* View 2 */}
      <>
        {!loadingMore ? null : (
          <View
            style={StyleSheet.applyWidth(
              {
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'absolute',
                top: '50%',
                zIndex: 10,
              },
              dimensions.width
            )}
          >
            <CircularProgress
              color={theme.colors.branding.primary}
              lineCap={'round'}
              showTrack={true}
              startPosition={'top'}
              trackColor={theme.colors.border.brand}
              trackLineCap={'round'}
              animationDuration={500}
              indeterminate={true}
              isAnimated={true}
              style={StyleSheet.applyWidth(
                { minWidth: 50, width: 50 },
                dimensions.width
              )}
              thickness={5}
            />
          </View>
        )}
      </>
    </ScreenContainer>
  );
};

export default withTheme(AllEventsScreen);
