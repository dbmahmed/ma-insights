import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import CustomHeaderBlock from '../components/CustomHeaderBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import assessAccess from '../global-functions/assessAccess';
import formatNumber from '../global-functions/formatNumber';
import modifyArrays from '../global-functions/modifyArrays';
import transformEuroM from '../global-functions/transformEuroM';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import waitUtil from '../utils/wait';
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
  Spacer,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { H4, H5 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const PEPFScreen = props => {
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
  const [ebitda_giant, setEbitda_giant] = React.useState(true);
  const [ebitda_large, setEbitda_large] = React.useState(true);
  const [ebitda_medium, setEbitda_medium] = React.useState(true);
  const [ebitda_small, setEbitda_small] = React.useState(true);
  const [energy, setEnergy] = React.useState(true);
  const [eventType, setEventType] = React.useState([]);
  const [filterPressed, setFilterPressed] = React.useState(false);
  const [financials, setFinancials] = React.useState(true);
  const [finland, setFinland] = React.useState(true);
  const [from_3_to_5, setFrom_3_to_5] = React.useState(true);
  const [from_5_to_7, setFrom_5_to_7] = React.useState(true);
  const [fundVintage, setFundVintage] = React.useState([]);
  const [future_opportunity, setFuture_opportunity] = React.useState(true);
  const [germany, setGermany] = React.useState(true);
  const [h_3_to_5, setH_3_to_5] = React.useState(true);
  const [h_5_to_7, setH_5_to_7] = React.useState(true);
  const [h_less_3, setH_less_3] = React.useState(true);
  const [h_more_7, setH_more_7] = React.useState(true);
  const [health_care, setHealth_care] = React.useState(true);
  const [holdingPreriod, setHoldingPreriod] = React.useState([]);
  const [industrials, setIndustrials] = React.useState(true);
  const [it_and_software, setIt_and_software] = React.useState(true);
  const [keywordSearch, setKeywordSearch] = React.useState('');
  const [lastPage, setLastPage] = React.useState(2);
  const [last_3, setLast_3] = React.useState(true);
  const [materials, setMaterials] = React.useState(true);
  const [more_7, setMore_7] = React.useState(true);
  const [nextPage, setNextPage] = React.useState(2);
  const [norway, setNorway] = React.useState(true);
  const [pepfItems, setPepfItems] = React.useState([]);
  const [real_estate, setReal_estate] = React.useState(true);
  const [sector, setSector] = React.useState([]);
  const [sweden, setSweden] = React.useState(true);
  const [switzerland, setSwitzerland] = React.useState(true);
  const [testWidth, setTestWidth] = React.useState(2);
  const [transaction, setTransaction] = React.useState(true);
  const [utilities, setUtilities] = React.useState(true);
  const toggleAllFilters = flag => {
    setEbitda_large(flag);
    setEbitda_medium(flag);
    setEbitda_small(flag);
    setH_less_3(flag);
    setH_3_to_5(flag);
    setH_5_to_7(flag);
    setLast_3(flag);
    setFrom_3_to_5(flag);
    setFrom_5_to_7(flag);

    setEbitda_giant(flag);
    setH_more_7(flag);
    setMore_7(flag);
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

  const matchingFilters = () => {
    setEbitda_giant((ebitdaRange || []).includes('EBITDA > €50m'));
    setEbitda_large((ebitdaRange || []).includes('€20m < EBITDA ≤ €50m'));
    setEbitda_medium((ebitdaRange || []).includes('€5m < EBITDA ≤ €20m'));
    setEbitda_small((ebitdaRange || []).includes('EBITDA ≤ €5m'));

    setH_less_3((holdingPreriod || []).includes('Holding ≤ 3 years'));
    setH_3_to_5((holdingPreriod || []).includes('3 ys < holding ≤ 5 ys'));
    setH_5_to_7((holdingPreriod || []).includes('5 ys < holding ≤ 7 ys'));
    setH_more_7((holdingPreriod || []).includes('Holding > 7 years'));

    setLast_3((fundVintage || []).includes('Within the last 3 years'));
    setFrom_3_to_5((fundVintage || []).includes('3 to 5 years ago'));
    setFrom_5_to_7((fundVintage || []).includes('5 to 7 years ago'));
    setMore_7((fundVintage || []).includes('More than 7 years ago'));

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
    setIt_and_software((sector || []).includes('IT & Software'));
    setConsumer_staples((sector || []).includes('Consumer Staples'));
    setMaterials((sector || []).includes('Materials'));
    setEnergy((sector || []).includes('Energy'));
    setReal_estate((sector || []).includes('Real Estate'));
    setFinancials((sector || []).includes('Financials'));
    setUtilities((sector || []).includes('Utilities'));
    setHealth_care((sector || []).includes('Health Care'));
  };

  const applyFilters = () => {
    //EBITDA Range
    const ebitdaRange = [];

    ebitda_giant && ebitdaRange.push('EBITDA > €50m');
    ebitda_large && ebitdaRange.push('€20m < EBITDA ≤ €50m');
    ebitda_medium && ebitdaRange.push('€5m < EBITDA ≤ €20m');
    ebitda_small && ebitdaRange.push('EBITDA ≤ €5m');

    setEbitdaRange(() => ebitdaRange);

    //holding period
    const holdingPreriod = [];

    h_less_3 && holdingPreriod.push('Holding ≤ 3 years');
    h_3_to_5 && holdingPreriod.push('3 ys < holding ≤ 5 ys');
    h_5_to_7 && holdingPreriod.push('5 ys < holding ≤ 7 ys');
    h_more_7 && holdingPreriod.push('Holding > 7 years');

    setHoldingPreriod(() => holdingPreriod);

    //fund vintage
    const fundVintage = [];

    last_3 && fundVintage.push('Within the last 3 years');
    from_3_to_5 && fundVintage.push('3 to 5 years ago');
    from_5_to_7 && fundVintage.push('5 to 7 years ago');
    more_7 && fundVintage.push('More than 7 years ago');

    setFundVintage(() => fundVintage);

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
    it_and_software && sectors.push('IT & Software');
    consumer_staples && sectors.push('Consumer Staples');
    materials && sectors.push('Materials');
    energy && sectors.push('Energy');
    real_estate && sectors.push('Real Estate');
    financials && sectors.push('Financials');
    utilities && sectors.push('Utilities');
    health_care && sectors.push('Health Care');

    setSector(() => sectors);
  };
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      undefined;
      setGlobalVariableValue({
        key: 'subPage',
        value: false,
      });
      matchingFilters();
      if (assessAccess(Variables, setGlobalVariableValue) === true) {
        return;
      }
      if (navigation.canGoBack()) {
        navigation.popToTop();
      }
      navigation.replace('LogInScreen');
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <CustomHeaderBlock />
      {/* View 2 */}
      <View
        style={StyleSheet.applyWidth(
          { alignItems: { minWidth: Breakpoints.Desktop, value: 'center' } },
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'stretch',
              maxWidth: { minWidth: Breakpoints.Desktop, value: 1200 },
              padding: 10,
              width: { minWidth: Breakpoints.Desktop, value: '100%' },
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
                    paddingLeft: 5,
                    textDecorationLine: 'none',
                  }),
                  dimensions.width
                )}
              >
                {'Private Equity Portfolios (PEPF)'}
              </H5>
            )}
          </>
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
                  { width: '90%' }
                ),
                dimensions.width
              )}
              value={keywordSearch}
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
                      holdingPreriod[0] ||
                      fundVintage[0] ||
                      country[0] ||
                      sector[0]
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
                    holdingPreriod[0] ||
                    fundVintage[0] ||
                    country[0] ||
                    sector[0]
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

      <XanoCollectionApi.FetchGetAllPEPFGET
        countryIn={country}
        ebitdaIn={ebitdaRange}
        handlers={{
          on2xx: fetchData => {
            try {
              setPepfItems(fetchData?.json?.items);
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
              navigation.navigate('LogInScreen');
            } catch (err) {
              console.error(err);
            }
          },
        }}
        holdingPeriodIn={holdingPreriod}
        page={1}
        searchString={keywordSearch}
        sectorIn={sector}
        vintageIn={fundVintage}
      >
        {({ loading, error, data, refetchGetAllPEPF }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
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
                    {...GlobalStyles.TextStyles(theme)['screen_title'].props}
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
                  >
                    {formatNumber(fetchData?.itemsTotal)}
                    {' private equity portfolio firms matching the filter'}
                  </Text>
                </View>
                <SimpleStyleFlatList
                  data={pepfItems}
                  horizontal={false}
                  inverted={false}
                  keyExtractor={(listData, index) =>
                    listData?.id ??
                    listData?.uuid ??
                    index?.toString() ??
                    JSON.stringify(listData)
                  }
                  keyboardShouldPersistTaps={'never'}
                  listKey={'hDO0JNzh'}
                  nestedScrollEnabled={false}
                  onEndReached={() => {
                    const handler = async () => {
                      try {
                        if (nextPage > lastPage) {
                          return;
                        }
                        setNextPage(parseInt(nextPage + 1, 10));
                        const newData = (
                          await XanoCollectionApi.getAllPEPFGET(Constants, {
                            countryIn: country,
                            ebitdaIn: ebitdaRange,
                            page: nextPage,
                            sectorIn: sector,
                            vintageIn: fundVintage,
                          })
                        )?.json;
                        setPepfItems(pepfItems.concat(newData?.items));
                        setLastPage(newData?.pagesTotal);
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                  onEndReachedThreshold={0.5}
                  renderItem={({ item, index }) => {
                    const listData = item;
                    return (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            maxWidth: [
                              { minWidth: Breakpoints.Mobile, value: '50%' },
                              { minWidth: Breakpoints.Laptop, value: '33.33%' },
                              { minWidth: Breakpoints.Tablet, value: '33.33%' },
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
                                borderWidth: null,
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
                          <Pressable
                            onPress={() => {
                              try {
                                navigation.push('PEPFDetailsScreen', {
                                  pepf_id: listData?.id,
                                });
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
                                  justifyContent: 'space-between',
                                  padding: 10,
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
                                        marginBottom: 0,
                                        marginTop: 0,
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {listData?.Company}
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
                                      { color: palettes.App.Orange }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {listData?.country}
                                </Text>
                              </View>
                              {/* View 2 */}
                              <View>
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
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {'PE firm: '}
                                  {listData?._investor?.name
                                    ? listData?._investor.name
                                    : '-'}
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
                                        color: palettes.Brand['Strong Inverse'],
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {'Fund: '}
                                  {listData?._fund?.name
                                    ? listData?._fund.name
                                    : '-'}
                                </Text>
                                {/* Text 3 */}
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
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {'Fund vintage: '}
                                  {listData?._fund?.age_years
                                    ? listData?._fund.age_years
                                    : '-'}
                                </Text>
                                {/* Text 4 */}
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
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {'Acq: '}
                                  {listData?.acquired_date}
                                </Text>
                                {/* Text 5 */}
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
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {'EBITDA: '}
                                  {transformEuroM(listData?.ebitda_eur)}
                                </Text>
                              </View>
                            </View>
                          </Pressable>
                        </LinearGradient>
                      </View>
                    );
                  }}
                  numColumns={
                    dimensions.width >= Breakpoints.Laptop
                      ? 3
                      : dimensions.width >= Breakpoints.Tablet
                      ? 3
                      : 2
                  }
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  style={StyleSheet.applyWidth(
                    {
                      flexDirection: 'column',
                      maxHeight: [
                        {
                          minWidth: Breakpoints.Mobile,
                          value: dimensions.height - 190,
                        },
                        {
                          minWidth: Breakpoints.Laptop,
                          value: dimensions.height - 270,
                        },
                      ],
                      maxWidth: 1200,
                      paddingLeft: 5,
                      paddingRight: 5,
                      width: '100%',
                    },
                    dimensions.width
                  )}
                />
              </View>
              <>
                {!filterPressed ? null : (
                  <Modal
                    supportedOrientations={['portrait', 'landscape']}
                    animationType={'fade'}
                    presentationStyle={'pageSheet'}
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
                            { minWidth: Breakpoints.Mobile, value: 'center' },
                            {
                              minWidth: Breakpoints.Tablet,
                              value: 'flex-start',
                            },
                          ],
                          padding: 2,
                          paddingTop: {
                            minWidth: Breakpoints.Tablet,
                            value: 100,
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
                              { minWidth: Breakpoints.Laptop, value: 900 },
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
                              {'Filtering PE portfolios'}
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
                              {'Portfolio firm EBITDA'}
                            </H5>
                            {/* View 2 */}
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
                                    (ebitda_medium ||
                                    ebitda_large ||
                                    ebitda_giant
                                      ? palettes.Brand.Light
                                      : palettes.Brand['Strong Inverse']) ??
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
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.TextStyles(theme)[
                                          'screen_title'
                                        ].style,
                                        {
                                          color: [
                                            {
                                              minWidth: Breakpoints.Mobile,
                                              value:
                                                palettes.Brand[
                                                  'Strong Inverse'
                                                ],
                                            },
                                            {
                                              minWidth: Breakpoints.Desktop,
                                              value:
                                                ebitda_medium ||
                                                ebitda_large ||
                                                ebitda_giant
                                                  ? palettes.Brand.Light
                                                  : palettes.Brand[
                                                      'Strong Inverse'
                                                    ],
                                            },
                                          ],
                                          fontFamily: 'Quicksand_400Regular',
                                          fontSize: 12,
                                        }
                                      ),
                                      dimensions.width
                                    )}
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
                                    (ebitda_small ||
                                    ebitda_large ||
                                    ebitda_giant
                                      ? palettes.Brand.Light
                                      : palettes.Brand['Strong Inverse']) ??
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
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.TextStyles(theme)[
                                          'screen_title'
                                        ].style,
                                        {
                                          color: [
                                            {
                                              minWidth: Breakpoints.Mobile,
                                              value:
                                                palettes.Brand[
                                                  'Strong Inverse'
                                                ],
                                            },
                                            {
                                              minWidth: Breakpoints.Desktop,
                                              value:
                                                ebitda_small ||
                                                ebitda_large ||
                                                ebitda_giant
                                                  ? palettes.Brand.Light
                                                  : palettes.Brand[
                                                      'Strong Inverse'
                                                    ],
                                            },
                                          ],
                                          fontFamily: 'Quicksand_400Regular',
                                          fontSize: 12,
                                        }
                                      ),
                                      dimensions.width
                                    )}
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
                                    (ebitda_small ||
                                    ebitda_medium ||
                                    ebitda_giant
                                      ? palettes.Brand.Light
                                      : palettes.Brand['Strong Inverse']) ??
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
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.TextStyles(theme)[
                                          'screen_title'
                                        ].style,
                                        {
                                          color: [
                                            {
                                              minWidth: Breakpoints.Mobile,
                                              value:
                                                palettes.Brand[
                                                  'Strong Inverse'
                                                ],
                                            },
                                            {
                                              minWidth: Breakpoints.Desktop,
                                              value:
                                                ebitda_small ||
                                                ebitda_medium ||
                                                ebitda_giant
                                                  ? palettes.Brand.Light
                                                  : palettes.Brand[
                                                      'Strong Inverse'
                                                    ],
                                            },
                                          ],
                                          fontFamily: 'Quicksand_400Regular',
                                          fontSize: 12,
                                        }
                                      ),
                                      dimensions.width
                                    )}
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
                                    (ebitda_small ||
                                    ebitda_medium ||
                                    ebitda_large
                                      ? palettes.Brand.Light
                                      : palettes.Brand['Strong Inverse']) ??
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
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.TextStyles(theme)[
                                          'screen_title'
                                        ].style,
                                        {
                                          color: [
                                            {
                                              minWidth: Breakpoints.Mobile,
                                              value:
                                                palettes.Brand[
                                                  'Strong Inverse'
                                                ],
                                            },
                                            {
                                              minWidth: Breakpoints.Desktop,
                                              value:
                                                ebitda_small ||
                                                ebitda_medium ||
                                                ebitda_large
                                                  ? palettes.Brand.Light
                                                  : palettes.Brand[
                                                      'Strong Inverse'
                                                    ],
                                            },
                                          ],
                                          fontFamily: 'Quicksand_400Regular',
                                          fontSize: 12,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {'EBITDA >  €50m'}
                                  </Text>
                                </Pressable>
                              </View>
                            </View>
                          </View>
                          {/* Current holding period */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'stretch',
                                flexDirection: 'column',
                                flexWrap: 'nowrap',
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
                              {'Current holding period'}
                            </H5>

                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'stretch',
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
                              {/* Holding ≤ 3 years */}
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
                                      setH_less_3(newCheckboxValue);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  color={palettes.Brand['Strong Inverse']}
                                  size={24}
                                  status={h_less_3}
                                  uncheckedColor={
                                    (h_3_to_5 || h_5_to_7 || h_more_7
                                      ? palettes.Brand.Light
                                      : palettes.Brand['Strong Inverse']) ??
                                    palettes.Brand['Strong Inverse']
                                  }
                                />
                                <Pressable
                                  onPress={() => {
                                    try {
                                      setH_less_3(h_less_3 ? false : true);
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
                                          color: [
                                            {
                                              minWidth: Breakpoints.Mobile,
                                              value:
                                                palettes.Brand[
                                                  'Strong Inverse'
                                                ],
                                            },
                                            {
                                              minWidth: Breakpoints.Laptop,
                                              value:
                                                h_3_to_5 || h_5_to_7 || h_more_7
                                                  ? palettes.Brand.Light
                                                  : palettes.Brand[
                                                      'Strong Inverse'
                                                    ],
                                            },
                                          ],
                                          fontFamily: 'Quicksand_400Regular',
                                          fontSize: 12,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {'Holding ≤ 3 years'}
                                  </Text>
                                </Pressable>
                              </View>
                              {/* 3 ys < holding ≤ 5 ys */}
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
                                      setH_3_to_5(newCheckboxValue);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  color={palettes.Brand['Strong Inverse']}
                                  size={24}
                                  status={h_3_to_5}
                                  uncheckedColor={
                                    (h_less_3 || h_5_to_7 || h_more_7
                                      ? palettes.Brand.Light
                                      : palettes.Brand['Strong Inverse']) ??
                                    palettes.Brand['Strong Inverse']
                                  }
                                />
                                <Pressable
                                  onPress={() => {
                                    try {
                                      setH_3_to_5(h_3_to_5 ? false : true);
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
                                          color: [
                                            {
                                              minWidth: Breakpoints.Mobile,
                                              value:
                                                palettes.Brand[
                                                  'Strong Inverse'
                                                ],
                                            },
                                            {
                                              minWidth: Breakpoints.Laptop,
                                              value:
                                                h_less_3 || h_5_to_7 || h_more_7
                                                  ? palettes.Brand.Light
                                                  : palettes.Brand[
                                                      'Strong Inverse'
                                                    ],
                                            },
                                          ],
                                          fontFamily: 'Quicksand_400Regular',
                                          fontSize: 12,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {'3 ys < holding ≤ 5 ys'}
                                  </Text>
                                </Pressable>
                              </View>
                              {/* 5 ys < holding ≤ 7 ys */}
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
                                      setH_5_to_7(newCheckboxValue);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  color={palettes.Brand['Strong Inverse']}
                                  size={24}
                                  status={h_5_to_7}
                                  uncheckedColor={
                                    (h_less_3 || h_3_to_5 || h_more_7
                                      ? palettes.Brand.Light
                                      : palettes.Brand['Strong Inverse']) ??
                                    palettes.Brand['Strong Inverse']
                                  }
                                />
                                <Pressable
                                  onPress={() => {
                                    try {
                                      setH_5_to_7(h_5_to_7 ? false : true);
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
                                          color: [
                                            {
                                              minWidth: Breakpoints.Mobile,
                                              value:
                                                palettes.Brand[
                                                  'Strong Inverse'
                                                ],
                                            },
                                            {
                                              minWidth: Breakpoints.Laptop,
                                              value:
                                                h_less_3 || h_3_to_5 || h_more_7
                                                  ? palettes.Brand.Light
                                                  : palettes.Brand[
                                                      'Strong Inverse'
                                                    ],
                                            },
                                          ],
                                          fontFamily: 'Quicksand_400Regular',
                                          fontSize: 12,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {'5 ys < holding ≤ 7 ys'}
                                  </Text>
                                </Pressable>
                              </View>
                              {/* Holding > 7 years */}
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
                                      setH_more_7(newCheckboxValue);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  color={palettes.Brand['Strong Inverse']}
                                  size={24}
                                  status={h_more_7}
                                  uncheckedColor={
                                    palettes.Brand['Strong Inverse']
                                  }
                                />
                                <Pressable
                                  onPress={() => {
                                    try {
                                      setH_more_7(h_more_7 ? false : true);
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
                                          color: [
                                            {
                                              minWidth: Breakpoints.Mobile,
                                              value:
                                                palettes.Brand[
                                                  'Strong Inverse'
                                                ],
                                            },
                                            {
                                              minWidth: Breakpoints.Laptop,
                                              value:
                                                h_less_3 || h_3_to_5 || h_5_to_7
                                                  ? palettes.Brand.Light
                                                  : palettes.Brand[
                                                      'Strong Inverse'
                                                    ],
                                            },
                                          ],
                                          fontFamily: 'Quicksand_400Regular',
                                          fontSize: 12,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {'Holding > 7 years'}
                                  </Text>
                                </Pressable>
                              </View>
                            </View>
                          </View>
                          {/* vintage */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'stretch',
                                flexDirection: 'column',
                                flexWrap: 'nowrap',
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
                              {'Fund vintage'}
                            </H5>

                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'stretch',
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
                              {/* Within the last 3 years */}
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
                                      setLast_3(newCheckboxValue);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  color={palettes.Brand['Strong Inverse']}
                                  size={24}
                                  status={last_3}
                                  uncheckedColor={
                                    (from_3_to_5 || from_5_to_7 || more_7
                                      ? palettes.Brand.Light
                                      : palettes.Brand['Strong Inverse']) ??
                                    palettes.Brand['Strong Inverse']
                                  }
                                />
                                <Pressable
                                  onPress={() => {
                                    try {
                                      setLast_3(last_3 ? false : true);
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
                                          color: [
                                            {
                                              minWidth: Breakpoints.Mobile,
                                              value:
                                                palettes.Brand[
                                                  'Strong Inverse'
                                                ],
                                            },
                                            {
                                              minWidth: Breakpoints.Laptop,
                                              value:
                                                from_3_to_5 ||
                                                from_5_to_7 ||
                                                more_7
                                                  ? palettes.Brand.Light
                                                  : palettes.Brand[
                                                      'Strong Inverse'
                                                    ],
                                            },
                                          ],
                                          fontFamily: 'Quicksand_400Regular',
                                          fontSize: 12,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {'Within the last 3 years'}
                                  </Text>
                                </Pressable>
                              </View>
                              {/* 3 to 5 years ago */}
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
                                      setFrom_3_to_5(newCheckboxValue);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  color={palettes.Brand['Strong Inverse']}
                                  size={24}
                                  status={from_3_to_5}
                                  uncheckedColor={
                                    (last_3 || from_5_to_7 || more_7
                                      ? palettes.Brand.Light
                                      : palettes.Brand['Strong Inverse']) ??
                                    palettes.Brand['Strong Inverse']
                                  }
                                />
                                <Pressable
                                  onPress={() => {
                                    try {
                                      setFrom_3_to_5(
                                        from_3_to_5 ? false : true
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
                                          color:
                                            palettes.Brand['Strong Inverse'],
                                          fontFamily: 'Quicksand_400Regular',
                                          fontSize: 12,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {'3 to 5 years ago'}
                                  </Text>
                                </Pressable>
                              </View>
                              {/* 5 to 7 years ago */}
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
                                      setFrom_5_to_7(newCheckboxValue);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  color={palettes.Brand['Strong Inverse']}
                                  size={24}
                                  status={from_5_to_7}
                                  uncheckedColor={
                                    (last_3 || from_3_to_5 || more_7
                                      ? palettes.Brand.Light
                                      : palettes.Brand['Strong Inverse']) ??
                                    palettes.Brand['Strong Inverse']
                                  }
                                />
                                <Pressable
                                  onPress={() => {
                                    try {
                                      setFrom_5_to_7(
                                        from_5_to_7 ? false : true
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
                                          color: [
                                            {
                                              minWidth: Breakpoints.Mobile,
                                              value:
                                                palettes.Brand[
                                                  'Strong Inverse'
                                                ],
                                            },
                                            {
                                              minWidth: Breakpoints.Laptop,
                                              value:
                                                last_3 || from_3_to_5 || more_7
                                                  ? palettes.Brand.Light
                                                  : palettes.Brand[
                                                      'Strong Inverse'
                                                    ],
                                            },
                                          ],
                                          fontFamily: 'Quicksand_400Regular',
                                          fontSize: 12,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {'5 to 7 years ago'}
                                  </Text>
                                </Pressable>
                              </View>
                              {/* More than 7 years ago */}
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
                                      setMore_7(newCheckboxValue);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  color={palettes.Brand['Strong Inverse']}
                                  size={24}
                                  status={more_7}
                                  uncheckedColor={
                                    (last_3 || from_3_to_5 || from_5_to_7
                                      ? palettes.Brand.Light
                                      : palettes.Brand['Strong Inverse']) ??
                                    palettes.Brand['Strong Inverse']
                                  }
                                />
                                <Pressable
                                  onPress={() => {
                                    try {
                                      setMore_7(more_7 ? false : true);
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
                                          color: [
                                            {
                                              minWidth: Breakpoints.Mobile,
                                              value:
                                                palettes.Brand[
                                                  'Strong Inverse'
                                                ],
                                            },
                                            {
                                              minWidth: Breakpoints.Laptop,
                                              value:
                                                last_3 ||
                                                from_3_to_5 ||
                                                from_5_to_7
                                                  ? palettes.Brand.Light
                                                  : palettes.Brand[
                                                      'Strong Inverse'
                                                    ],
                                            },
                                          ],
                                          fontFamily: 'Quicksand_400Regular',
                                          fontSize: 12,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {'More than 7 years ago'}
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
                              {'Portfolio firm HQ'}
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
                              {'Sector (GICS)'}
                            </H5>
                            {/* View 2 */}
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
                                  value: 'flex-start',
                                },
                                flexDirection: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: 'row',
                                  },
                                  {
                                    minWidth: Breakpoints.Laptop,
                                    value: 'row',
                                  },
                                ],
                                flexGrow: 1,
                                gap: [
                                  { minWidth: Breakpoints.Mobile, value: 0 },
                                  { minWidth: Breakpoints.Laptop, value: 0 },
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
                                padding: [
                                  { minWidth: Breakpoints.Mobile, value: 2 },
                                  { minWidth: Breakpoints.Laptop, value: 5 },
                                ],
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
                                      width: '100%',
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
                                      applyFilters();
                                      setFilterPressed(false);
                                      await waitUtil({ milliseconds: 100 });
                                      await refetchGetAllPEPF();
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
                                title={'Filter\n'}
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
      </XanoCollectionApi.FetchGetAllPEPFGET>
    </ScreenContainer>
  );
};

export default withTheme(PEPFScreen);
