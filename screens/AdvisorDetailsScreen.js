import React from 'react';
import {
  Button,
  Checkbox,
  HStack,
  IconButton,
  LinearGradient,
  Pressable,
  ScreenContainer,
  Shadow,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  Slider,
  Spacer,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { H3, H5 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Modal, Platform, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import CustomBottomNavBlock from '../components/CustomBottomNavBlock';
import CustomHeaderBlock from '../components/CustomHeaderBlock';
import EventDetailsModalBlock from '../components/EventDetailsModalBlock';
import LoadingBlock from '../components/LoadingBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import assessAccess from '../global-functions/assessAccess';
import deviceType from '../global-functions/deviceType';
import removeGlobalScroll from '../global-functions/removeGlobalScroll';
import resetAccess from '../global-functions/resetAccess';
import screenNameGen from '../global-functions/screenNameGen';
import setPadding from '../global-functions/setPadding';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import waitUtil from '../utils/wait';

const defaultProps = { advisor_id: 1 };

const AdvisorDetailsScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [austria, setAustria] = React.useState(true);
  const [communication_services, setCommunication_services] =
    React.useState(true);
  const [consumer_discretionary, setConsumer_discretionary] =
    React.useState(true);
  const [consumer_staples, setConsumer_staples] = React.useState(true);
  const [country, setCountry] = React.useState([]);
  const [denmark, setDenmark] = React.useState(true);
  const [ebitdaRange, setEbitdaRange] = React.useState([]);
  const [energy, setEnergy] = React.useState(true);
  const [filterPressed, setFilterPressed] = React.useState(false);
  const [financials, setFinancials] = React.useState(true);
  const [finland, setFinland] = React.useState(true);
  const [germany, setGermany] = React.useState(true);
  const [health_care, setHealth_care] = React.useState(true);
  const [industrials, setIndustrials] = React.useState(true);
  const [it_and_software, setIt_and_software] = React.useState(true);
  const [keywordSearch, setKeywordSearch] = React.useState('');
  const [keywordSearch_raw, setKeywordSearch_raw] = React.useState('');
  const [materials, setMaterials] = React.useState(true);
  const [nextPage, setNextPage] = React.useState(0);
  const [norway, setNorway] = React.useState(true);
  const [periodRange, setPeriodRange] = React.useState(0);
  const [real_estate, setReal_estate] = React.useState(true);
  const [screenCode, setScreenCode] = React.useState('');
  const [sector, setSector] = React.useState([]);
  const [sweden, setSweden] = React.useState(true);
  const [switzerland, setSwitzerland] = React.useState(true);
  const [utilities, setUtilities] = React.useState(true);
  const [viewingId, setViewingId] = React.useState(0);
  const [sliderValue, setSliderValue] = React.useState(0);
  const applyFilters = () => {
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
  };

  const matchingFilters = () => {
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
  };

  const toggleAllFilters = flag => {
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
  };
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
        value: 'Advisor Details',
      });
      setGlobalVariableValue({
        key: 'screenParamName',
        value: 'advisor_id',
      });
      setGlobalVariableValue({
        key: 'screenParamValue',
        value: props.route?.params?.advisor_id ?? defaultProps.advisor_id,
      });
      removeGlobalScroll();
      setGlobalVariableValue({
        key: 'pageName',
        value: 'Advisor details',
      });
      setGlobalVariableValue({
        key: 'subPage',
        value: true,
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
      scrollable={false}
      hasLeftSafeArea={false}
      hasRightSafeArea={false}
      hasSafeArea={false}
      hasTopSafeArea={true}
    >
      <CustomHeaderBlock />
      <XanoCollectionApi.FetchGetAdvisorGET
        advisor_id={props.route?.params?.advisor_id ?? defaultProps.advisor_id}
        country_in={country}
        device={deviceType(
          Platform.OS === 'web',
          Platform.OS === 'ios',
          Platform.OS === 'android'
        )}
        screenCode={screenCode}
        sector_in={sector}
      >
        {({ loading, error, data, refetchGetAdvisor }) => {
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
                  { alignItems: 'center', paddingTop: 5 },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      maxWidth: 1200,
                      padding: 10,
                      width: '100%',
                    },
                    dimensions.width
                  )}
                >
                  <H3
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        alignSelf: {
                          minWidth: Breakpoints.Laptop,
                          value: 'stretch',
                        },
                        fontFamily: 'Quicksand_700Bold',
                        marginBottom: 0,
                        marginTop: 0,
                        paddingLeft: 5,
                      },
                      dimensions.width
                    )}
                  >
                    {fetchData?.name}
                  </H3>
                </View>
                {/* View 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      maxWidth: 1200,
                      padding: 10,
                      width: '100%',
                    },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['screen_title'].style,
                        {
                          alignSelf: {
                            minWidth: Breakpoints.Laptop,
                            value: 'flex-start',
                          },
                        }
                      ),
                      dimensions.width
                    )}
                    suppressHighlighting={true}
                  >
                    {fetchData?.type}
                  </Text>
                </View>
              </View>
              {/* View 2 2 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: [
                      { minWidth: Breakpoints.Desktop, value: 'center' },
                      { minWidth: Breakpoints.Mobile, value: 'center' },
                    ],
                  },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'stretch',
                      maxWidth: [
                        { minWidth: Breakpoints.Desktop, value: 1200 },
                        { minWidth: Breakpoints.Mobile, value: 1200 },
                      ],
                      padding: 10,
                      width: [
                        { minWidth: Breakpoints.Desktop, value: '100%' },
                        { minWidth: Breakpoints.Mobile, value: '100%' },
                      ],
                    },
                    dimensions.width
                  )}
                >
                  <HStack
                    {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.HStackStyles(theme)['H Stack'].style,
                        { gap: 10, justifyContent: 'space-between' }
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
                            setKeywordSearch_raw(newTextInputValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        onSubmitEditing={() => {
                          try {
                            setKeywordSearch(keywordSearch_raw);
                            /* hidden 'API Request' action */
                            /* hidden 'Refetch Data' action */
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        webShowOutline={true}
                        {...GlobalStyles.TextInputStyles(theme)['Text Input']
                          .props}
                        autoCapitalize={'sentences'}
                        clearButtonMode={'while-editing'}
                        placeholder={'Search...'}
                        returnKeyType={'search'}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextInputStyles(theme)['Text Input']
                              .style,
                            { width: '100%' }
                          ),
                          dimensions.width
                        )}
                        value={keywordSearch_raw}
                      />
                    </View>

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
                              ebitdaRange[0] || country[0] || sector[0]
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
                            (ebitdaRange[0] || country[0] || sector[0]
                              ? palettes.Brand['Strong Inverse']
                              : palettes.App.Strong2) ?? palettes.App.Strong2
                          }
                          icon={'MaterialIcons/filter-alt'}
                          size={24}
                        />
                      </View>
                    </Shadow>
                  </HStack>
                </View>
              </View>
              <SimpleStyleFlatList
                data={fetchData?._events}
                horizontal={false}
                inverted={false}
                keyExtractor={(listData, index) => listData?.id}
                keyboardShouldPersistTaps={'never'}
                listKey={'aDfVzu4Y'}
                nestedScrollEnabled={false}
                onEndReached={() => {
                  console.log('List ON_END_REACHED Start');
                  let error = null;
                  try {
                    console.log('Start ON_END_REACHED:0 CONSOLE_LOG');
                    /* hidden 'Log to Console' action */ console.log(
                      'Complete ON_END_REACHED:0 CONSOLE_LOG'
                    );
                    console.log('Start ON_END_REACHED:1 CONDITIONAL_STOP');
                    /* hidden 'Conditional Stop' action */ console.log(
                      'Complete ON_END_REACHED:1 CONDITIONAL_STOP'
                    );
                    console.log('Start ON_END_REACHED:2 SET_VARIABLE');
                    /* hidden 'Set Variable' action */ console.log(
                      'Complete ON_END_REACHED:2 SET_VARIABLE'
                    );
                    console.log('Start ON_END_REACHED:3 CONSOLE_LOG');
                    /* hidden 'Log to Console' action */ console.log(
                      'Complete ON_END_REACHED:3 CONSOLE_LOG'
                    );
                    console.log('Start ON_END_REACHED:4 FETCH_REQUEST');
                    /* hidden 'API Request' action */ console.log(
                      'Complete ON_END_REACHED:4 FETCH_REQUEST'
                    );
                  } catch (err) {
                    console.error(err);
                    error = err.message ?? err;
                  }
                  console.log(
                    'List ON_END_REACHED Complete',
                    error ? { error } : 'no error'
                  );
                }}
                renderItem={({ item, index }) => {
                  const listData = item;
                  return (
                    <>
                      {/* View 2 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            maxWidth: [
                              { minWidth: Breakpoints.Laptop, value: '33.33%' },
                              { minWidth: Breakpoints.Tablet, value: '50%' },
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
                              left: 5,
                              position: 'absolute',
                              right: 5,
                              top: 5,
                              width: {
                                minWidth: Breakpoints.Laptop,
                                value: '100%',
                              },
                            },
                            dimensions.width
                          )}
                        />
                        <Pressable
                          onPress={() => {
                            console.log('Pressable ON_PRESS Start');
                            let error = null;
                            try {
                              console.log('Start ON_PRESS:0 CONSOLE_LOG');
                              console.log(listData);
                              console.log('Complete ON_PRESS:0 CONSOLE_LOG');
                              console.log('Start ON_PRESS:1 NAVIGATE');
                              /* hidden 'Navigate' action */ console.log(
                                'Complete ON_PRESS:1 NAVIGATE'
                              );
                              console.log('Start ON_PRESS:2 SET_VARIABLE');
                              setViewingId(listData?.id);
                              console.log('Complete ON_PRESS:2 SET_VARIABLE');
                              console.log('Start ON_PRESS:3 CONSOLE_LOG');
                              console.log(viewingId, 'is the viewing id');
                              console.log('Complete ON_PRESS:3 CONSOLE_LOG');
                            } catch (err) {
                              console.error(err);
                              error = err.message ?? err;
                            }
                            console.log(
                              'Pressable ON_PRESS Complete',
                              error ? { error } : 'no error'
                            );
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
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                padding: 0,
                                width: '100%',
                              },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  gap: 4,
                                  justifyContent: 'space-between',
                                  padding: 10,
                                  width: '100%',
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
                                      fontFamily: 'Quicksand_700Bold',
                                      fontSize: 12,
                                      paddingTop: [
                                        {
                                          minWidth: Breakpoints.Laptop,
                                          value: 2.5,
                                        },
                                        {
                                          minWidth: Breakpoints.Mobile,
                                          value: 2.5,
                                        },
                                      ],
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                              >
                                {'Target: '}
                                {listData?.target}
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
                                      fontFamily: 'Quicksand_400Regular',
                                      fontSize: 12,
                                      paddingTop: [
                                        {
                                          minWidth: Breakpoints.Laptop,
                                          value: 2.5,
                                        },
                                        {
                                          minWidth: Breakpoints.Mobile,
                                          value: 2.5,
                                        },
                                      ],
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                              >
                                {listData?.published}
                                {' | '}
                                {listData?.country}
                                {' | '}
                                {listData?.event_type}
                              </Text>
                              {/* Text 2 2 */}
                              <Text
                                accessible={true}
                                {...GlobalStyles.TextStyles(theme)[
                                  'screen_title'
                                ].props}
                                adjustsFontSizeToFit={true}
                                ellipsizeMode={'clip'}
                                numberOfLines={1}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)[
                                      'screen_title'
                                    ].style,
                                    {
                                      fontFamily: 'Quicksand_400Regular',
                                      fontSize: 12,
                                      paddingTop: [
                                        {
                                          minWidth: Breakpoints.Laptop,
                                          value: 2.5,
                                        },
                                        {
                                          minWidth: Breakpoints.Mobile,
                                          value: 2.5,
                                        },
                                      ],
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                                textBreakStrategy={'highQuality'}
                              >
                                {'Headline: '}
                                {listData?.headline}
                              </Text>
                              {/* Text 2 3 */}
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
                                      fontFamily: 'Quicksand_400Regular',
                                      fontSize: 12,
                                      paddingBottom: [
                                        {
                                          minWidth: Breakpoints.Laptop,
                                          value: 2.5,
                                        },
                                        {
                                          minWidth: Breakpoints.Mobile,
                                          value: 2.5,
                                        },
                                      ],
                                      paddingTop: [
                                        {
                                          minWidth: Breakpoints.Laptop,
                                          value: 2.5,
                                        },
                                        {
                                          minWidth: Breakpoints.Mobile,
                                          value: 2.5,
                                        },
                                      ],
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                              >
                                {'Role: '}
                                {listData?.type}
                              </Text>
                            </View>
                          </View>
                        </Pressable>
                      </View>
                    </>
                  );
                }}
                numColumns={
                  dimensions.width >= Breakpoints.Laptop
                    ? 3
                    : dimensions.width >= Breakpoints.Tablet
                    ? 2
                    : 1
                }
                onEndReachedThreshold={0.2}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={StyleSheet.applyWidth(
                  {
                    marginBottom:
                      dimensions.width >= Breakpoints.Laptop ? 0 : 75,
                    paddingLeft: [
                      { minWidth: Breakpoints.Mobile, value: 5 },
                      {
                        minWidth: Breakpoints.Mobile,
                        value: setPadding(dimensions.width),
                      },
                    ],
                    paddingRight: [
                      { minWidth: Breakpoints.Mobile, value: 5 },
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
              {/* Modal 2 */}
              <Modal
                supportedOrientations={['portrait', 'landscape']}
                animationType={'fade'}
                presentationStyle={'pageSheet'}
                transparent={true}
                visible={filterPressed}
              >
                <SimpleStyleScrollView
                  bounces={true}
                  horizontal={false}
                  keyboardShouldPersistTaps={'never'}
                  nestedScrollEnabled={false}
                  showsHorizontalScrollIndicator={true}
                  showsVerticalScrollIndicator={true}
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      height: '100%',
                      justifyContent: [
                        { minWidth: Breakpoints.Desktop, value: 'flex-start' },
                        { minWidth: Breakpoints.Mobile, value: 'center' },
                      ],
                      paddingTop: { minWidth: Breakpoints.Desktop, value: 100 },
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
                          { minWidth: Breakpoints.Laptop, value: 750 },
                          { minWidth: Breakpoints.Mobile, value: 380 },
                          { minWidth: Breakpoints.Tablet, value: 600 },
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
                      {/* Country */}
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
                              uncheckedColor={palettes.Brand['Strong Inverse']}
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
                              uncheckedColor={palettes.Brand['Strong Inverse']}
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
                              uncheckedColor={palettes.Brand['Strong Inverse']}
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
                              uncheckedColor={palettes.Brand['Strong Inverse']}
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
                              uncheckedColor={palettes.Brand['Strong Inverse']}
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
                              uncheckedColor={palettes.Brand['Strong Inverse']}
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
                              uncheckedColor={palettes.Brand['Strong Inverse']}
                            />
                            <Pressable
                              onPress={() => {
                                try {
                                  setSwitzerland(switzerland ? false : true);
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
                                {'Switzerland'}
                              </Text>
                            </Pressable>
                          </View>
                        </View>
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
                                  setHealth_care(undefined ? false : true);
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
                      <Spacer bottom={10} left={0} right={0} top={10} />
                      {/* Buttons */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignContent: 'flex-start',
                            flexDirection: 'row',
                            flexGrow: 1,
                            gap: [
                              { minWidth: Breakpoints.Laptop, value: 10 },
                              { minWidth: Breakpoints.Mobile, value: 0 },
                            ],
                            justifyContent: [
                              {
                                minWidth: Breakpoints.Mobile,
                                value: 'space-between',
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
                          {/* reset */}
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
                                  width: '100%',
                                }
                              ),
                              dimensions.width
                            )}
                            title={'reset'}
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
                                  applyFilters();
                                  setFilterPressed(false);
                                  await waitUtil({ milliseconds: 1000 });
                                  await refetchGetAdvisor();
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
                                  width: '100%',
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
      </XanoCollectionApi.FetchGetAdvisorGET>
      <CustomBottomNavBlock />
      <>
        {!viewingId ? null : (
          <EventDetailsModalBlock
            setViewingEventId={viewingEventId => setViewingId(viewingEventId)}
            viewingEventId={viewingId}
          />
        )}
      </>
    </ScreenContainer>
  );
};

export default withTheme(AdvisorDetailsScreen);
