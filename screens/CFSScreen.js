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
  withTheme,
} from '@draftbit/ui';
import { H4, H5 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import { Fetch } from 'react-request';

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
  const [real_estate, setReal_estate] = React.useState(true);
  const [sector, setSector] = React.useState([]);
  const [sweden, setSweden] = React.useState(true);
  const [switzerland, setSwitzerland] = React.useState(true);
  const [totalCFS, setTotalCFS] = React.useState(0);
  const [transaction, setTransaction] = React.useState(true);
  const [utilities, setUtilities] = React.useState(true);
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
  };

  const showOwners = owners => {
    if (!Array.isArray(owners)) {
      return '';
    }

    return owners
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
      .join(', ');
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
    setIt_and_software((sector || []).includes('IT & Software'));
    setConsumer_staples((sector || []).includes('Consumer Staples'));
    setMaterials((sector || []).includes('Materials'));
    setEnergy((sector || []).includes('Energy'));
    setReal_estate((sector || []).includes('Real Estate'));
    setFinancials((sector || []).includes('Financials'));
    setUtilities((sector || []).includes('Utilities'));
    setHealth_care((sector || []).includes('Health Care'));
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

      <XanoCollectionApi.FetchGetCFSGET
        cfsSearchQuery={keywordSearch}
        countryIn={country}
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
        page={1}
        sectorIn={sector}
      >
        {({ loading, error, data, refetchGetCFS }) => {
          const fetchData = data?.json;
          if (loading) {
            return (
              <>
                {/* View 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', padding: 20 },
                    dimensions.width
                  )}
                >
                  <CircularProgress
                    color={theme.colors.branding.primary}
                    isAnimated={true}
                    lineCap={'round'}
                    showTrack={true}
                    startPosition={'top'}
                    trackColor={theme.colors.border.brand}
                    trackLineCap={'round'}
                    animationDuration={500}
                    indeterminate={true}
                    style={StyleSheet.applyWidth(
                      { minWidth: 50, width: 50 },
                      dimensions.width
                    )}
                    thickness={5}
                  />
                </View>
              </>
            );
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
                        { minWidth: Breakpoints.Mobile, value: 15 },
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
                    {' companies for sale matching filter'}
                  </Text>
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
                            if (nextPage > lastPage) {
                              return;
                            }
                            setNextPage(parseInt(nextPage + 1, 10));
                            const newData = (
                              await XanoCollectionApi.getCFSGET(Constants, {
                                cfsSearchQuery: keywordSearch_raw,
                                countryIn: country,
                                ebitdaIn: ebitdaRange,
                                page: parseInt(nextPage, 10),
                                sectorIn: sector,
                              })
                            )?.json;
                            if (newData?.items?.length !== 0) {
                              return;
                            }
                            setCfsItems(cfsItems.concat(newData?.items));
                            setLastPage(newData?.pageTotal);
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
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: '50%',
                                  },
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
                                    borderColor: theme.colors.branding.primary,
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
                                    navigation.navigate('CFSDetailsScreen', {
                                      cfs_id: listData?.id,
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
                                    >
                                      {'Sector: '}
                                      {
                                        listData?._gics_sub_industry
                                          ?.GICS_Sector
                                      }
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
                                            color:
                                              palettes.Brand['Strong Inverse'],
                                          }
                                        ),
                                        dimensions.width
                                      )}
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
                                    >
                                      {'Advisor: '}
                                      {listData?._advisors}
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
                                            color:
                                              palettes.Brand['Strong Inverse'],
                                          }
                                        ),
                                        dimensions.width
                                      )}
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
                      numColumns={
                        dimensions.width >= Breakpoints.Laptop ? 3 : 2
                      }
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      style={StyleSheet.applyWidth(
                        {
                          height: dimensions.height,
                          maxHeight: [
                            {
                              minWidth: Breakpoints.Mobile,
                              value: dimensions.height - 190,
                            },
                            {
                              minWidth: Breakpoints.Laptop,
                              value: dimensions.height - 260,
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
                  )}
                </>
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
    </ScreenContainer>
  );
};

export default withTheme(CFSScreen);
