import React from 'react';
import {
  Button,
  Checkbox,
  HStack,
  Icon,
  IconButton,
  LinearGradient,
  Link,
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
import { H3, H4, H5, H6 } from '@expo/html-elements';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import CustomBottomNavBlock from '../components/CustomBottomNavBlock';
import CustomHeaderBlock from '../components/CustomHeaderBlock';
import LoadingBlock from '../components/LoadingBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import assessAccess from '../global-functions/assessAccess';
import deviceType from '../global-functions/deviceType';
import modifyArrays from '../global-functions/modifyArrays';
import removeGlobalScroll from '../global-functions/removeGlobalScroll';
import resetAccess from '../global-functions/resetAccess';
import screenNameGen from '../global-functions/screenNameGen';
import setPadding from '../global-functions/setPadding';
import transformEuroM from '../global-functions/transformEuroM';
import transformNumber from '../global-functions/transformNumber';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';
import waitUtil from '../utils/wait';

const defaultProps = { test: null };

const CFSScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [austria, setAustria] = React.useState(true);
  const [cfsItems, setCfsItems] = React.useState([]);
  const [communication_services, setCommunication_services] =
    React.useState(true);
  const [consumer_discretionary, setConsumer_discretionary] =
    React.useState(true);
  const [consumer_staples, setConsumer_staples] = React.useState(true);
  const [country, setCountry] = React.useState([]);
  const [denmark, setDenmark] = React.useState(true);
  const [ebitdaRange, setEbitdaRange] = React.useState([]);
  const [ebitda_giant, setEbitda_giant] = React.useState(true);
  const [ebitda_large, setEbitda_large] = React.useState(true);
  const [ebitda_medium, setEbitda_medium] = React.useState(true);
  const [ebitda_small, setEbitda_small] = React.useState(true);
  const [energy, setEnergy] = React.useState(true);
  const [eventItems, setEventItems] = React.useState([]);
  const [eventType, setEventType] = React.useState([]);
  const [filterPressed, setFilterPressed] = React.useState(false);
  const [financials, setFinancials] = React.useState(true);
  const [finland, setFinland] = React.useState(true);
  const [future_opportunity, setFuture_opportunity] = React.useState(true);
  const [germany, setGermany] = React.useState(true);
  const [health_care, setHealth_care] = React.useState(true);
  const [industrials, setIndustrials] = React.useState(true);
  const [it_and_software, setIt_and_software] = React.useState(true);
  const [keywordSearch, setKeywordSearch] = React.useState('');
  const [keywordSearch_raw, setKeywordSearch_raw] = React.useState('');
  const [lastPage, setLastPage] = React.useState(2);
  const [materials, setMaterials] = React.useState(true);
  const [nextPage, setNextPage] = React.useState(1);
  const [norway, setNorway] = React.useState(true);
  const [otOther, setOtOther] = React.useState(false);
  const [otPrivateEquity, setOtPrivateEquity] = React.useState(false);
  const [otPrivateIndividual, setOtPrivateIndividual] = React.useState(false);
  const [otStrategic, setOtStrategic] = React.useState(false);
  const [real_estate, setReal_estate] = React.useState(true);
  const [screenCode, setScreenCode] = React.useState('');
  const [sector, setSector] = React.useState([]);
  const [selectedID, setSelectedID] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const [sweden, setSweden] = React.useState(true);
  const [switzerland, setSwitzerland] = React.useState(true);
  const [totalCFS, setTotalCFS] = React.useState(0);
  const [transaction, setTransaction] = React.useState(true);
  const [typeOwnership, setTypeOwnership] = React.useState([]);
  const [utilities, setUtilities] = React.useState(true);
  const [viewingEventId, setViewingEventId] = React.useState(0);
  const [refreshingyCaR0jC6, setRefreshingyCaR0jC6] = React.useState(false);
  const toggleAllFilters = flag => {
    setEbitda_large(flag);
    setEbitda_medium(flag);
    setEbitda_small(flag);
    setEbitda_giant(flag);

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

    setOtPrivateEquity(flag);
    setOtStrategic(flag);
    setOtPrivateIndividual(flag);
    setOtOther(flag);
  };

  const showOwners = owners => {
    if (!Array.isArray(owners)) {
      return '-';
    }

    return (
      owners
        .filter(Boolean)
        .map(({ name, type }) => {
          let fullName = '';
          if (name) {
            fullName = name;
          }
          if (type) {
            fullName += ` (${type})`;
          }

          return fullName.trim();
        })
        .filter(Boolean)
        .join(', ') || '-'
    );
  };

  const matchingFilters = () => {
    setEbitda_giant((ebitdaRange || []).includes('EBITDA > €50m'));
    setEbitda_large((ebitdaRange || []).includes('€20m < EBITDA ≤ €50m'));
    setEbitda_medium((ebitdaRange || []).includes('€5m < EBITDA ≤ €20m'));
    setEbitda_small((ebitdaRange || []).includes('EBITDA ≤ €5m'));

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

    setOtPrivateEquity((typeOwnership || []).includes('Private equity'));
    setOtStrategic((typeOwnership || []).includes('Strategic'));
    setOtPrivateIndividual(
      (typeOwnership || []).includes('Private Individual')
    );
    setOtOther((typeOwnership || []).includes('Other'));
  };

  const advisorEmptyState = item => {
    return item.length ? item : `"_"`;
  };

  const applyFilter = () => {
    //EBITDA Range
    const ebitdaRange = [];

    ebitda_giant && ebitdaRange.push('EBITDA > €50m');
    ebitda_large && ebitdaRange.push('€20m < EBITDA ≤ €50m');
    ebitda_medium && ebitdaRange.push('€5m < EBITDA ≤ €20m');
    ebitda_small && ebitdaRange.push('EBITDA ≤ €5m');

    setEbitdaRange(() => ebitdaRange);

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

    //type of ownership
    const typeOwnership = [];

    otPrivateEquity && typeOwnership.push('Private equity');
    otStrategic && typeOwnership.push('Strategic');
    otPrivateIndividual && typeOwnership.push('Private Individual');
    otOther && typeOwnership.push('Other');

    setTypeOwnership(() => typeOwnership);
  };
  const safeAreaInsets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      setScreenCode(screenNameGen());
      removeGlobalScroll();
      setGlobalVariableValue({
        key: 'currentScreen',
        value: 'CFS',
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
        value: 'Companies For Sale',
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
      hasLeftSafeArea={false}
      hasRightSafeArea={false}
      hasTopSafeArea={true}
    >
      <CustomHeaderBlock />
      {/* View 2 */}
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
                    marginTop: [
                      { minWidth: Breakpoints.Mobile, value: 0 },
                      { minWidth: Breakpoints.Laptop, value: 20 },
                    ],
                    paddingLeft: 4,
                    textDecorationLine: 'none',
                  }),
                  dimensions.width
                )}
              >
                {'Companies for Sale (CFS)'}
              </H5>
            )}
          </>
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
              {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
              autoCapitalize={'sentences'}
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
              value={keywordSearch_raw}
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
                      ebitdaRange[0] ||
                      country[0] ||
                      sector[0] ||
                      typeOwnership[0]
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
                    (ebitdaRange[0] ||
                    country[0] ||
                    sector[0] ||
                    typeOwnership[0]
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

      <XanoCollectionApi.FetchGetCFSGET
        cfsSearchQuery={keywordSearch}
        countryIn={country}
        device={deviceType(
          Platform.OS === 'web',
          Platform.OS === 'ios',
          Platform.OS === 'android'
        )}
        ebitdaIn={ebitdaRange}
        handlers={{
          on2xx: fetchData => {
            try {
              setCfsItems(fetchData?.json?.items);
              setNextPage(fetchData?.json?.nextPage);
              setLastPage(fetchData?.json?.pageTotal);
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
              setTotalCFS(fetchData?.itemsTotal?.setCFS);
              setNextPage(nextPage);
              setLastPage(fetchData?.pageTotal);
            } catch (err) {
              console.error(err);
            }
          },
        }}
        ownershipIn={typeOwnership}
        page={1}
        screenCode={screenCode}
        sectorIn={sector}
      >
        {({ loading, error, data, refetchGetCFS }) => {
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
                        { minWidth: Breakpoints.Mobile, value: 10 },
                        { minWidth: Breakpoints.Tablet, value: 15 },
                      ],
                      paddingRight: 10,
                      width: '100%',
                    },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                    disabled={true}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['screen_title'].style,
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
                    suppressHighlighting={true}
                  >
                    {fetchData?.itemsTotal}{' '}
                    {fetchData?.itemsTotal > 1 ? 'companies' : 'company'}
                    {
                      ' for sale matching filter and sorted by latest coverage, new to old'
                    }
                  </Text>
                </View>
              </View>
              <>
                {!(cfsItems?.length > 0) ? null : (
                  <SimpleStyleFlatList
                    data={cfsItems}
                    horizontal={false}
                    inverted={false}
                    keyExtractor={(listData, index) => listData?.id}
                    keyboardShouldPersistTaps={'never'}
                    listKey={'yCaR0jC6'}
                    nestedScrollEnabled={false}
                    onEndReached={() => {
                      const handler = async () => {
                        try {
                          if (nextPage === null) {
                            return;
                          }
                          /* hidden 'Set Variable' action */
                          const newData = (
                            await XanoCollectionApi.getCFSGET(Constants, {
                              cfsSearchQuery: keywordSearch,
                              countryIn: country,
                              device: deviceType(
                                Platform.OS === 'web',
                                Platform.OS === 'ios',
                                Platform.OS === 'android'
                              ),
                              ebitdaIn: ebitdaRange,
                              ownershipIn: typeOwnership,
                              page: parseInt(nextPage, 10),
                              screenCode: screenCode,
                              sectorIn: sector,
                            })
                          )?.json;
                          setNextPage(newData?.nextPage);
                          setLastPage(newData?.pageTotal);
                          if (fetchData?.items === 0) {
                            return;
                          }
                          setCfsItems(cfsItems.concat(newData?.items));
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
                    }}
                    onEndReachedThreshold={0.5}
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshingyCaR0jC6}
                        onRefresh={() => {
                          const handler = async () => {
                            try {
                              setRefreshingyCaR0jC6(true);
                              await refetchGetCFS();
                              setRefreshingyCaR0jC6(false);
                            } catch (err) {
                              console.error(err);
                              setRefreshingyCaR0jC6(false);
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
                                { minWidth: Breakpoints.Mobile, value: '50%' },
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
                                  borderWidth: 0,
                                  flexDirection: 'column',
                                  flexWrap: 'nowrap',
                                  height: '100%',
                                  margin: null,
                                  width: '100%',
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {/* Pressable 2 */}
                            <Pressable
                              onPress={() => {
                                try {
                                  /* hidden 'Navigate' action */
                                  setSelectedID(listData?.id);
                                  setShowModal(true);
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
                                    gap: 10,
                                    height: '100%',
                                    justifyContent: 'flex-start',
                                    padding: 10,
                                  },
                                  dimensions.width
                                )}
                              >
                                <View>
                                  <H4
                                    selectable={false}
                                    {...GlobalStyles.H4Styles(theme)['H4']
                                      .props}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.H4Styles(theme)['H4']
                                          .style,
                                        {
                                          color:
                                            palettes.Brand['Strong Inverse'],
                                          marginBottom: 0,
                                          marginTop: 0,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {listData?.company}
                                  </H4>
                                  {/* Subtitle */}
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
                                        { color: palettes.App.Orange }
                                      ),
                                      dimensions.width
                                    )}
                                    suppressHighlighting={true}
                                  >
                                    {listData?.country}
                                  </Text>
                                </View>
                                {/* View 2 */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    { gap: 6 },
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
                                          color:
                                            palettes.Brand['Strong Inverse'],
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                    suppressHighlighting={true}
                                  >
                                    {'Sector: '}
                                    {listData?._gics_sub_industry?.GICS_Sector}
                                  </Text>
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
                                          color:
                                            palettes.Brand['Strong Inverse'],
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                    suppressHighlighting={true}
                                  >
                                    {'EBITDA: '}
                                    {transformEuroM(listData?.ebitda_eur)}
                                  </Text>
                                  {/* Text 3 */}
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
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                    suppressHighlighting={true}
                                  >
                                    {'Owner: '}
                                    {showOwners(listData?.owners)}
                                  </Text>
                                  {/* Text 4 */}
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
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                    suppressHighlighting={true}
                                  >
                                    {'Advisor: '}
                                    {transformNumber(
                                      listData?._advisors,
                                      undefined,
                                      undefined
                                    )}
                                  </Text>
                                  {/* Text 5 */}
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
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                    suppressHighlighting={true}
                                  >
                                    {'Stage: '}
                                    {listData?.stage}
                                  </Text>
                                  {/* Text 6 */}
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
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                    suppressHighlighting={true}
                                  >
                                    {'Update: '}
                                    {listData?.last_update}
                                  </Text>
                                </View>
                              </View>
                            </Pressable>
                          </LinearGradient>
                        </View>
                      );
                    }}
                    numColumns={dimensions.width >= Breakpoints.Laptop ? 3 : 2}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={StyleSheet.applyWidth(
                      {
                        marginBottom:
                          dimensions.width >= Breakpoints.Laptop
                            ? 0
                            : Platform.OS === 'ios'
                            ? 65
                            : 35,
                        maxHeight: dimensions.height - 195,
                        paddingLeft: setPadding(dimensions.width),
                        paddingRight: setPadding(dimensions.width),
                        width: '100%',
                      },
                      dimensions.width
                    )}
                  />
                )}
              </>
              <>
                {!filterPressed ? null : (
                  <Modal
                    supportedOrientations={['portrait', 'landscape']}
                    animationType={'fade'}
                    presentationStyle={'overFullScreen'}
                    transparent={true}
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
                            {
                              minWidth: Breakpoints.Desktop,
                              value: 'flex-start',
                            },
                            { minWidth: Breakpoints.Mobile, value: 'center' },
                          ],
                          padding: 2,
                          paddingTop: {
                            minWidth: Breakpoints.Desktop,
                            value: 150,
                          },
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
                            maxWidth: [
                              { minWidth: Breakpoints.Mobile, value: 390 },
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
                              {
                                borderColor: null,
                                borderWidth: null,
                                margin: null,
                                padding: 10,
                                paddingLeft: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 15,
                                },
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          <HStack
                            {...GlobalStyles.HStackStyles(theme)['H Stack']
                              .props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.HStackStyles(theme)['H Stack']
                                  .style,
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
                              {'Filtering CFS records'}
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
                                    backgroundColor:
                                      theme.colors.background.brand,
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
                          {/* EBITDA */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'flex-start',
                                flexDirection: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: 'column',
                                  },
                                  {
                                    minWidth: Breakpoints.Tablet,
                                    value: 'column',
                                  },
                                ],
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
                              {'Target EBITDA'}
                            </H5>

                            <View
                              {...GlobalStyles.ViewStyles(theme)[
                                'split_options'
                              ].props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.ViewStyles(theme)[
                                    'split_options'
                                  ].style,
                                  { gap: 0, margin: -4, width: '100%' }
                                ),
                                dimensions.width
                              )}
                            >
                              {/* EBTDA ≤ €5m */}
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
                                    const handler = async () => {
                                      console.log('Checkbox ON_PRESS Start');
                                      let error = null;
                                      try {
                                        console.log(
                                          'Start ON_PRESS:0 SET_VARIABLE'
                                        );
                                        setEbitda_small(newCheckboxValue);
                                        console.log(
                                          'Complete ON_PRESS:0 SET_VARIABLE'
                                        );
                                        console.log('Start ON_PRESS:1 WAIT');
                                        await waitUtil({ milliseconds: 1000 });
                                        console.log('Complete ON_PRESS:1 WAIT');
                                        console.log(
                                          'Start ON_PRESS:2 CONSOLE_LOG'
                                        );
                                        console.log(ebitda_small);
                                        console.log(
                                          'Complete ON_PRESS:2 CONSOLE_LOG'
                                        );
                                      } catch (err) {
                                        console.error(err);
                                        error = err.message ?? err;
                                      }
                                      console.log(
                                        'Checkbox ON_PRESS Complete',
                                        error ? { error } : 'no error'
                                      );
                                    };
                                    handler();
                                  }}
                                  color={palettes.Brand['Strong Inverse']}
                                  size={24}
                                  status={ebitda_small}
                                  uncheckedColor={
                                    palettes.Brand['Strong Inverse']
                                  }
                                />
                                <Pressable
                                  onPress={() => {
                                    try {
                                      setEbitda_small(
                                        ebitda_small ? false : true
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
                                    {'EBITDA ≤ €5m'}
                                  </Text>
                                </Pressable>
                              </View>
                              {/* €5m < EBITDA ≤ €20m */}
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
                                      setEbitda_medium(newCheckboxValue);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  color={palettes.Brand['Strong Inverse']}
                                  size={24}
                                  status={ebitda_medium}
                                  uncheckedColor={
                                    palettes.Brand['Strong Inverse']
                                  }
                                />
                                <Pressable
                                  onPress={() => {
                                    try {
                                      setEbitda_medium(
                                        ebitda_medium ? false : true
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
                                    {'€5m < EBITDA ≤ €20m'}
                                  </Text>
                                </Pressable>
                              </View>
                              {/* €20m < EBITDA ≤ €50m */}
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
                                      setEbitda_large(newCheckboxValue);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  color={palettes.Brand['Strong Inverse']}
                                  size={24}
                                  status={ebitda_large}
                                  uncheckedColor={
                                    palettes.Brand['Strong Inverse']
                                  }
                                />
                                <Pressable
                                  onPress={() => {
                                    try {
                                      setEbitda_large(
                                        ebitda_large ? false : true
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
                                    {'€20m < EBITDA ≤ €50m'}
                                  </Text>
                                </Pressable>
                              </View>
                              {/* EBITDA >  €50m */}
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
                                      setEbitda_giant(newCheckboxValue);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  color={palettes.Brand['Strong Inverse']}
                                  size={24}
                                  status={ebitda_giant}
                                  uncheckedColor={
                                    palettes.Brand['Strong Inverse']
                                  }
                                />
                                <Pressable
                                  onPress={() => {
                                    try {
                                      setEbitda_giant(
                                        ebitda_giant ? false : true
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
                                    {'EBITDA >  €50m'}
                                  </Text>
                                </Pressable>
                              </View>
                            </View>
                          </View>
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
                                      setCommunication_services(
                                        newCheckboxValue
                                      );
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  color={palettes.Brand['Strong Inverse']}
                                  size={24}
                                  status={communication_services}
                                  uncheckedColor={
                                    palettes.Brand['Strong Inverse']
                                  }
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
                                  uncheckedColor={
                                    palettes.Brand['Strong Inverse']
                                  }
                                />
                                <Pressable
                                  onPress={() => {
                                    try {
                                      setIndustrials(
                                        industrials ? false : true
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
                                      setConsumer_discretionary(
                                        newCheckboxValue
                                      );
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  color={palettes.Brand['Strong Inverse']}
                                  size={24}
                                  status={consumer_discretionary}
                                  uncheckedColor={
                                    palettes.Brand['Strong Inverse']
                                  }
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
                                  uncheckedColor={
                                    palettes.Brand['Strong Inverse']
                                  }
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
                                  uncheckedColor={
                                    palettes.Brand['Strong Inverse']
                                  }
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
                                  uncheckedColor={
                                    palettes.Brand['Strong Inverse']
                                  }
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
                                  uncheckedColor={
                                    palettes.Brand['Strong Inverse']
                                  }
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
                                  uncheckedColor={
                                    palettes.Brand['Strong Inverse']
                                  }
                                />
                                <Pressable
                                  onPress={() => {
                                    try {
                                      setReal_estate(
                                        real_estate ? false : true
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
                                  uncheckedColor={
                                    palettes.Brand['Strong Inverse']
                                  }
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
                                  uncheckedColor={
                                    palettes.Brand['Strong Inverse']
                                  }
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
                                  uncheckedColor={
                                    palettes.Brand['Strong Inverse']
                                  }
                                />
                                <Pressable
                                  onPress={() => {
                                    try {
                                      setHealth_care(
                                        transaction ? false : true
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
                                alignItems: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 'center',
                                },
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
                                      borderColor:
                                        palettes.Brand['Strong Inverse'],
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
                                      setFilterPressed(false);
                                      await waitUtil({ milliseconds: 1000 });
                                      await refetchGetCFS();
                                      setTotalCFS(fetchData?.itemsTotal);
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
                                          minWidth: Breakpoints.Mobile,
                                          value: '100%',
                                        },
                                        {
                                          minWidth: Breakpoints.Laptop,
                                          value: 150,
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
                )}
              </>
            </>
          );
        }}
      </XanoCollectionApi.FetchGetCFSGET>
      <CustomBottomNavBlock />
      <Modal
        animationType={'none'}
        supportedOrientations={['portrait', 'landscape']}
        transparent={false}
        visible={showModal}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              flex: 1,
              marginTop: Platform.OS === 'web' ? undefined : safeAreaInsets.top,
            },
            dimensions.width
          )}
        >
          {/* custom_header */}
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: theme.colors.background.brand,
                position: { minWidth: Breakpoints.Desktop, value: 'relative' },
                width: '100%',
                zIndex: 10,
              },
              dimensions.width
            )}
          >
            <Shadow
              offsetX={0}
              offsetY={0}
              showShadowCornerBottomEnd={true}
              showShadowCornerBottomStart={true}
              showShadowCornerTopEnd={true}
              showShadowCornerTopStart={true}
              showShadowSideBottom={true}
              showShadowSideEnd={true}
              showShadowSideStart={true}
              showShadowSideTop={true}
              paintInside={false}
              style={StyleSheet.applyWidth(
                {
                  height: 65,
                  width: '100%',
                  zIndex: { minWidth: Breakpoints.Desktop, value: 1000 },
                },
                dimensions.width
              )}
            >
              <HStack
                {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.HStackStyles(theme)['H Stack'].style,
                    {
                      height: 65,
                      justifyContent: 'space-between',
                      paddingLeft: 15,
                      paddingRight: 15,
                      width: dimensions.width,
                    }
                  ),
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      flexDirection: 'row',
                    },
                    dimensions.width
                  )}
                >
                  {/* Back */}
                  <IconButton
                    onPress={() => {
                      try {
                        /* hidden 'Navigate Back' action */
                        setShowModal(false);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    size={32}
                    color={theme.colors.text.strong}
                    icon={'Entypo/chevron-thin-left'}
                  />
                </View>
                {/* View 2 */}
                <>
                  {!(dimensions.width >= Breakpoints.Laptop) ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: {
                            minWidth: Breakpoints.Laptop,
                            value: 'stretch',
                          },
                          alignItems: {
                            minWidth: Breakpoints.Laptop,
                            value: 'center',
                          },
                          alignSelf: {
                            minWidth: Breakpoints.Laptop,
                            value: 'center',
                          },
                          flexDirection: {
                            minWidth: Breakpoints.Tablet,
                            value: 'row',
                          },
                          gap: { minWidth: Breakpoints.Laptop, value: 10 },
                          position: {
                            minWidth: Breakpoints.Laptop,
                            value: 'absolute',
                          },
                          right: { minWidth: Breakpoints.Laptop, value: 100 },
                        },
                        dimensions.width
                      )}
                    >
                      <Link
                        accessible={true}
                        onPress={() => {
                          try {
                            navigation.navigate('NewslettersScreen');
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        {...GlobalStyles.LinkStyles(theme)['Link'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.LinkStyles(theme)['Link'].style,
                            {
                              alignSelf: {
                                minWidth: Breakpoints.Laptop,
                                value: 'center',
                              },
                              color: {
                                minWidth: Breakpoints.Laptop,
                                value:
                                  Constants['pageName'] === 'Newsletters'
                                    ? palettes.App.Orange
                                    : palettes.Brand.Primary,
                              },
                              fontFamily: {
                                minWidth: Breakpoints.Laptop,
                                value: 'Quicksand_500Medium',
                              },
                            }
                          ),
                          dimensions.width
                        )}
                        title={'NEWSLETTERS'}
                      />
                      <Text
                        accessible={true}
                        {...GlobalStyles.TextStyles(theme)['screen_title']
                          .props}
                        disabled={true}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['screen_title']
                              .style,
                            {
                              alignSelf: {
                                minWidth: Breakpoints.Laptop,
                                value: 'center',
                              },
                              color: {
                                minWidth: Breakpoints.Laptop,
                                value: theme.colors.foreground.brand,
                              },
                              fontFamily: {
                                minWidth: Breakpoints.Laptop,
                                value: 'Quicksand_300Light',
                              },
                              fontSize: {
                                minWidth: Breakpoints.Laptop,
                                value: 35,
                              },
                              marginBottom: {
                                minWidth: Breakpoints.Laptop,
                                value: 0,
                              },
                              marginTop: {
                                minWidth: Breakpoints.Laptop,
                                value: 0,
                              },
                              textAlign: {
                                minWidth: Breakpoints.Laptop,
                                value: 'center',
                              },
                            }
                          ),
                          dimensions.width
                        )}
                        suppressHighlighting={true}
                      >
                        {'|'}
                      </Text>
                      {/* Link 2 */}
                      <Link
                        accessible={true}
                        onPress={() => {
                          try {
                            navigation.navigate('AllEventsScreen');
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        {...GlobalStyles.LinkStyles(theme)['Link'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.LinkStyles(theme)['Link'].style,
                            {
                              color: {
                                minWidth: Breakpoints.Laptop,
                                value:
                                  Constants['pageName'] === 'All events'
                                    ? palettes.App.Orange
                                    : palettes.Brand.Primary,
                              },
                            }
                          ),
                          dimensions.width
                        )}
                        title={'ALL EVENTS'}
                      />
                      {/* Text 2 */}
                      <Text
                        accessible={true}
                        {...GlobalStyles.TextStyles(theme)['screen_title']
                          .props}
                        disabled={true}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['screen_title']
                              .style,
                            {
                              alignSelf: {
                                minWidth: Breakpoints.Laptop,
                                value: 'center',
                              },
                              color: {
                                minWidth: Breakpoints.Laptop,
                                value: theme.colors.foreground.brand,
                              },
                              fontFamily: {
                                minWidth: Breakpoints.Laptop,
                                value: 'Quicksand_300Light',
                              },
                              fontSize: {
                                minWidth: Breakpoints.Laptop,
                                value: 35,
                              },
                            }
                          ),
                          dimensions.width
                        )}
                        suppressHighlighting={true}
                      >
                        {'|'}
                      </Text>
                      {/* Link 3 */}
                      <Link
                        accessible={true}
                        onPress={() => {
                          try {
                            navigation.navigate('CFSScreen');
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        {...GlobalStyles.LinkStyles(theme)['Link'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.LinkStyles(theme)['Link'].style,
                            {
                              color: {
                                minWidth: Breakpoints.Laptop,
                                value:
                                  Constants['pageName'] === 'Companies For Sale'
                                    ? palettes.App.Orange
                                    : palettes.Brand.Primary,
                              },
                            }
                          ),
                          dimensions.width
                        )}
                        title={'CFS'}
                      />
                      {/* Text 3 */}
                      <Text
                        accessible={true}
                        {...GlobalStyles.TextStyles(theme)['screen_title']
                          .props}
                        disabled={true}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['screen_title']
                              .style,
                            {
                              alignSelf: {
                                minWidth: Breakpoints.Laptop,
                                value: 'center',
                              },
                              color: {
                                minWidth: Breakpoints.Laptop,
                                value: theme.colors.foreground.brand,
                              },
                              fontFamily: {
                                minWidth: Breakpoints.Laptop,
                                value: 'Quicksand_300Light',
                              },
                              fontSize: {
                                minWidth: Breakpoints.Laptop,
                                value: 35,
                              },
                            }
                          ),
                          dimensions.width
                        )}
                        suppressHighlighting={true}
                      >
                        {'|'}
                      </Text>
                      {/* Link 4 */}
                      <Link
                        accessible={true}
                        onPress={() => {
                          try {
                            navigation.navigate('PEPFScreen');
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        {...GlobalStyles.LinkStyles(theme)['Link'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.LinkStyles(theme)['Link'].style,
                            {
                              color: {
                                minWidth: Breakpoints.Laptop,
                                value:
                                  Constants['pageName'] ===
                                  'Private Equity Firms (PEPF)'
                                    ? palettes.App.Orange
                                    : palettes.Brand.Primary,
                              },
                            }
                          ),
                          dimensions.width
                        )}
                        title={'PEPF'}
                      />
                      {/* Text 4 */}
                      <Text
                        accessible={true}
                        {...GlobalStyles.TextStyles(theme)['screen_title']
                          .props}
                        disabled={true}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['screen_title']
                              .style,
                            {
                              alignSelf: {
                                minWidth: Breakpoints.Laptop,
                                value: 'center',
                              },
                              color: {
                                minWidth: Breakpoints.Laptop,
                                value: theme.colors.foreground.brand,
                              },
                              fontFamily: {
                                minWidth: Breakpoints.Laptop,
                                value: 'Quicksand_300Light',
                              },
                              fontSize: {
                                minWidth: Breakpoints.Laptop,
                                value: 35,
                              },
                            }
                          ),
                          dimensions.width
                        )}
                        suppressHighlighting={true}
                      >
                        {'|'}
                      </Text>
                    </View>
                  )}
                </>
                {/* View 3 */}
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'stretch', justifyContent: 'center' },
                    dimensions.width
                  )}
                >
                  <Pressable
                    onPress={() => {
                      try {
                        navigation.navigate('NewslettersScreen');
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    <Image
                      {...GlobalStyles.ImageStyles(theme)['Image'].props}
                      resizeMode={'contain'}
                      source={imageSource(
                        Images['mainsightsfaviconlogo1024cropped']
                      )}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ImageStyles(theme)['Image'].style,
                          { height: 50, width: 75 }
                        ),
                        dimensions.width
                      )}
                    />
                  </Pressable>
                </View>
              </HStack>
            </Shadow>
          </View>

          <XanoCollectionApi.FetchGetOneCFSGET
            cfs_id={selectedID}
            device={deviceType(
              Platform.OS === 'web',
              Platform.OS === 'ios',
              Platform.OS === 'android'
            )}
          >
            {({ loading, error, data, refetchGetOneCFS }) => {
              const fetchData = data?.json;
              if (loading) {
                return <LoadingBlock />;
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
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      height: '100%',
                      marginTop: [
                        { minWidth: Breakpoints.Mobile, value: 65 },
                        { minWidth: Breakpoints.Desktop, value: 85 },
                      ],
                      paddingBottom: 65,
                      position: 'absolute',
                      width: '99.9%',
                    },
                    dimensions.width
                  )}
                >
                  {/* View 2 */}
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
                          {'Company for Sale details'}
                        </H5>
                      )}
                    </>
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
                            borderRadius: null,
                            borderWidth: null,
                            gap: 8,
                            margin: null,
                            marginBottom: 20,
                            padding: 10,
                            width: '100%',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', gap: 8, width: '100%' },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 100 },
                            dimensions.width
                          )}
                        >
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['screen_title']
                              .props}
                            disabled={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['screen_title']
                                  .style,
                                {
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {'Target:'}
                          </Text>
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { flex: 1 },
                            dimensions.width
                          )}
                        >
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['screen_title']
                              .props}
                            disabled={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['screen_title']
                                  .style,
                                {
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {fetchData?.company}
                          </Text>
                        </View>
                      </View>
                      {/* View 2 */}
                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', gap: 8, width: '100%' },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 100 },
                            dimensions.width
                          )}
                        >
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['screen_title']
                              .props}
                            disabled={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['screen_title']
                                  .style,
                                {
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {'Advisor:'}
                          </Text>
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { flex: 1 },
                            dimensions.width
                          )}
                        >
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['screen_title']
                              .props}
                            disabled={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['screen_title']
                                  .style,
                                {
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {fetchData?._advisors}
                          </Text>
                        </View>
                      </View>
                      {/* View 9 */}
                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', gap: 8, width: '100%' },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 100 },
                            dimensions.width
                          )}
                        >
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['screen_title']
                              .props}
                            disabled={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['screen_title']
                                  .style,
                                {
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {'Owners:'}
                          </Text>
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { flex: 1 },
                            dimensions.width
                          )}
                        >
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['screen_title']
                              .props}
                            disabled={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['screen_title']
                                  .style,
                                {
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {fetchData?._ownersList}
                          </Text>
                        </View>
                      </View>
                      {/* View 10 */}
                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', gap: 8, width: '100%' },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 100 },
                            dimensions.width
                          )}
                        >
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['screen_title']
                              .props}
                            disabled={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['screen_title']
                                  .style,
                                {
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {'Org. source:'}
                          </Text>
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { flex: 1 },
                            dimensions.width
                          )}
                        >
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['screen_title']
                              .props}
                            disabled={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['screen_title']
                                  .style,
                                {
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {fetchData?.source}
                          </Text>
                        </View>
                      </View>
                      {/* View 3 */}
                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', gap: 8, width: '100%' },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 100 },
                            dimensions.width
                          )}
                        >
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['screen_title']
                              .props}
                            disabled={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['screen_title']
                                  .style,
                                {
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {'Stage:'}
                          </Text>
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { flex: 1 },
                            dimensions.width
                          )}
                        >
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['screen_title']
                              .props}
                            disabled={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['screen_title']
                                  .style,
                                {
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {fetchData?.stage}
                          </Text>
                        </View>
                      </View>
                      {/* View 4 */}
                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', gap: 8, width: '100%' },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 100 },
                            dimensions.width
                          )}
                        >
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['screen_title']
                              .props}
                            disabled={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['screen_title']
                                  .style,
                                {
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {'Revenue:'}
                          </Text>
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { flex: 1 },
                            dimensions.width
                          )}
                        >
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['screen_title']
                              .props}
                            disabled={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['screen_title']
                                  .style,
                                {
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {transformEuroM(fetchData?.revenue_eur)}
                          </Text>
                        </View>
                      </View>
                      {/* View 5 */}
                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', gap: 8, width: '100%' },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 100 },
                            dimensions.width
                          )}
                        >
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['screen_title']
                              .props}
                            disabled={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['screen_title']
                                  .style,
                                {
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {'EBITDA:'}
                          </Text>
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { flex: 1 },
                            dimensions.width
                          )}
                        >
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['screen_title']
                              .props}
                            disabled={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['screen_title']
                                  .style,
                                {
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {transformEuroM(fetchData?.ebitda_eur)}
                          </Text>
                        </View>
                      </View>
                      {/* View 6 */}
                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', gap: 8, width: '100%' },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 100 },
                            dimensions.width
                          )}
                        >
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['screen_title']
                              .props}
                            disabled={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['screen_title']
                                  .style,
                                {
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {'Fiscal year:'}
                          </Text>
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { flex: 1 },
                            dimensions.width
                          )}
                        >
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['screen_title']
                              .props}
                            disabled={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['screen_title']
                                  .style,
                                {
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {fetchData?.fy_end}
                          </Text>
                        </View>
                      </View>
                      {/* View 7 */}
                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', gap: 8, width: '100%' },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 100 },
                            dimensions.width
                          )}
                        >
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['screen_title']
                              .props}
                            disabled={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['screen_title']
                                  .style,
                                {
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {'GICS:'}
                          </Text>
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { flex: 1 },
                            dimensions.width
                          )}
                        >
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['screen_title']
                              .props}
                            disabled={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['screen_title']
                                  .style,
                                {
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {fetchData?._gics?.GICS_Industry}
                            {' - '}
                            {fetchData?._gics?.GICS_Sub_Industry}
                          </Text>
                        </View>
                      </View>
                      {/* View 8 */}
                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', gap: 8, width: '100%' },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 100 },
                            dimensions.width
                          )}
                        >
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['screen_title']
                              .props}
                            disabled={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['screen_title']
                                  .style,
                                {
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {'Country:'}
                          </Text>
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { flex: 1 },
                            dimensions.width
                          )}
                        >
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['screen_title']
                              .props}
                            disabled={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['screen_title']
                                  .style,
                                {
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {fetchData?.country}
                          </Text>
                        </View>
                      </View>
                    </LinearGradient>
                  </View>
                  <>
                    {!fetchData?._main_event ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            maxWidth: 1200,
                            padding: 10,
                            paddingBottom: 40,
                            width: '100%',
                          },
                          dimensions.width
                        )}
                      >
                        {/* Text 3 */}
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          disabled={true}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              { paddingBottom: 5 }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Latest Update:'}
                        </Text>

                        <H3
                          selectable={false}
                          {...GlobalStyles.H3Styles(theme)['H3'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.H3Styles(theme)['H3'].style,
                              {
                                fontFamily: 'Quicksand_700Bold',
                                fontSize: 20,
                                marginBottom: 10,
                                marginTop: 0,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {fetchData?._main_event?.headline}
                        </H3>
                        <>
                          {!(fetchData?.event !== 0) ? null : (
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)['screen_title']
                                .props}
                              disabled={true}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)['screen_title']
                                    .style,
                                  {
                                    color: palettes.App.Orange,
                                    fontFamily: 'Quicksand_500Medium',
                                    fontSize: 13,
                                    marginBottom: 20,
                                  }
                                ),
                                dimensions.width
                              )}
                              suppressHighlighting={true}
                            >
                              {fetchData?._main_event?.published}
                              {' ('}
                              {fetchData?._main_event?.source}
                              {')'}
                            </Text>
                          )}
                        </>
                        <View>
                          {/* Text 2 */}
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['screen_title']
                              .props}
                            disabled={true}
                            style={StyleSheet.applyWidth(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {fetchData?._main_event?.description}
                          </Text>
                        </View>
                      </View>
                    )}
                  </>
                  {/* View 3 */}
                  <>
                    {!(
                      fetchData?.other_events && (fetchData?.other_events)[0]
                    ) ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignContent: 'center',
                            alignItems: 'center',
                            marginBottom:
                              dimensions.width >= Breakpoints.Laptop ? 0 : 65,
                            paddingBottom: 40,
                            width: '100%',
                          },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              maxWidth: 1200,
                              paddingLeft: 10,
                              paddingRight: 10,
                              width: '100%',
                            },
                            dimensions.width
                          )}
                        >
                          {/* H3 2 */}
                          <H3
                            selectable={false}
                            {...GlobalStyles.H3Styles(theme)['H3'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.H3Styles(theme)['H3'].style,
                                {
                                  alignSelf: {
                                    minWidth: Breakpoints.Laptop,
                                    value: 'flex-start',
                                  },
                                  fontFamily: 'Quicksand_700Bold',
                                  fontSize: 20,
                                  marginBottom: 10,
                                  marginTop: 0,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {'Other Updates:'}
                          </H3>
                        </View>
                        <SimpleStyleFlatList
                          data={fetchData?.other_events}
                          horizontal={false}
                          inverted={false}
                          keyExtractor={(listData, index) => listData?.id}
                          keyboardShouldPersistTaps={'never'}
                          listKey={'XdML12G9'}
                          nestedScrollEnabled={false}
                          numColumns={1}
                          onEndReached={() => {
                            const handler = async () => {
                              console.log('List ON_END_REACHED Start');
                              let error = null;
                              try {
                                console.log(
                                  'Start ON_END_REACHED:0 CONSOLE_LOG'
                                );
                                /* hidden 'Log to Console' action */ console.log(
                                  'Complete ON_END_REACHED:0 CONSOLE_LOG'
                                );
                                console.log(
                                  'Start ON_END_REACHED:1 CONDITIONAL_STOP'
                                );
                                if (nextPage > lastPage) {
                                  return console.log(
                                    'Complete ON_END_REACHED:1 CONDITIONAL_STOP'
                                  );
                                } else {
                                  console.log(
                                    'Skipped ON_END_REACHED:1 CONDITIONAL_STOP: condition not met'
                                  );
                                }
                                console.log(
                                  'Start ON_END_REACHED:2 SET_VARIABLE'
                                );
                                const value7cAPyGEK = parseInt(
                                  nextPage + 1,
                                  10
                                );
                                setNextPage(value7cAPyGEK);
                                const nextPageSet = value7cAPyGEK;
                                console.log(
                                  'Complete ON_END_REACHED:2 SET_VARIABLE'
                                );
                                console.log(
                                  'Start ON_END_REACHED:3 CONSOLE_LOG'
                                );
                                console.log(nextPage);
                                console.log(
                                  'Complete ON_END_REACHED:3 CONSOLE_LOG'
                                );
                                console.log(
                                  'Start ON_END_REACHED:4 FETCH_REQUEST'
                                );
                                const newData = (
                                  await XanoCollectionApi.getAllEventsGET(
                                    Constants,
                                    {
                                      countryIn: country,
                                      device: 'ios',
                                      eventTypeIn: eventType,
                                      keyword: keywordSearch,
                                      page: nextPage,
                                      region_in: 'Nordic',
                                      sectorIn: sector,
                                      sourceType_in: [],
                                    }
                                  )
                                )?.json;
                                console.log(
                                  'Complete ON_END_REACHED:4 FETCH_REQUEST',
                                  { newData }
                                );
                                console.log(
                                  'Start ON_END_REACHED:5 SET_VARIABLE'
                                );
                                setEventItems(
                                  eventItems.concat(newData?.items)
                                );
                                console.log(
                                  'Complete ON_END_REACHED:5 SET_VARIABLE'
                                );
                                console.log(
                                  'Start ON_END_REACHED:6 SET_VARIABLE'
                                );
                                setLastPage(newData?.pageTotal);
                                console.log(
                                  'Complete ON_END_REACHED:6 SET_VARIABLE'
                                );
                              } catch (err) {
                                console.error(err);
                                error = err.message ?? err;
                              }
                              console.log(
                                'List ON_END_REACHED Complete',
                                error ? { error } : 'no error'
                              );
                            };
                            handler();
                          }}
                          renderItem={({ item, index }) => {
                            const listData = item;
                            return (
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    flex: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 1,
                                    },
                                  },
                                  dimensions.width
                                )}
                              >
                                <Touchable
                                  onPress={() => {
                                    try {
                                      navigation.navigate(
                                        'EventDetailsScreen',
                                        { event_id: listData?.id }
                                      );
                                      setShowModal(false);
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
                                        paddingBottom: 5,
                                        paddingTop: 5,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    <H6
                                      selectable={false}
                                      {...GlobalStyles.H6Styles(theme)['H6']
                                        .props}
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.H6Styles(theme)['H6']
                                            .style,
                                          {
                                            fontFamily: 'Quicksand_700Bold',
                                            fontSize: [
                                              {
                                                minWidth: Breakpoints.Laptop,
                                                value: 14,
                                              },
                                              {
                                                minWidth: Breakpoints.Mobile,
                                                value: 14,
                                              },
                                            ],
                                            margin: 0,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {listData?.headline}
                                    </H6>
                                    <>
                                      {!(fetchData?.event !== 0) ? null : (
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
                                                fontFamily:
                                                  'Quicksand_400Regular',
                                                fontSize: [
                                                  {
                                                    minWidth:
                                                      Breakpoints.Laptop,
                                                    value: 12,
                                                  },
                                                  {
                                                    minWidth:
                                                      Breakpoints.Mobile,
                                                    value: 12,
                                                  },
                                                ],
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
                                      )}
                                    </>
                                  </View>
                                </Touchable>
                              </View>
                            );
                          }}
                          onEndReachedThreshold={0.2}
                          showsHorizontalScrollIndicator={false}
                          showsVerticalScrollIndicator={false}
                          style={StyleSheet.applyWidth(
                            {
                              gap: { minWidth: Breakpoints.Laptop, value: 5 },
                              maxHeight: dimensions.height - 250,
                              maxWidth: 1200,
                              paddingLeft: 10,
                              paddingRight: 10,
                              width: '100%',
                            },
                            dimensions.width
                          )}
                        />
                      </View>
                    )}
                  </>
                </SimpleStyleScrollView>
              );
            }}
          </XanoCollectionApi.FetchGetOneCFSGET>
        </View>
      </Modal>
    </ScreenContainer>
  );
};

export default withTheme(CFSScreen);
