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
  Spacer,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { H5 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import CustomHeaderBlock from '../components/CustomHeaderBlock';
import LoadingBlock from '../components/LoadingBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import assessAccess from '../global-functions/assessAccess';
import cutText from '../global-functions/cutText';
import formatNumber from '../global-functions/formatNumber';
import modifyArrays from '../global-functions/modifyArrays';
import removeGlobalScroll from '../global-functions/removeGlobalScroll';
import setPadding from '../global-functions/setPadding';
import showDate from '../global-functions/showDate';
import transformNumber from '../global-functions/transformNumber';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import waitUtil from '../utils/wait';

const TransactionsScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [RoW, setRoW] = React.useState(true);
  const [communication_services, setCommunication_services] =
    React.useState(true);
  const [consumer_discretionary, setConsumer_discretionary] =
    React.useState(true);
  const [consumer_staples, setConsumer_staples] = React.useState(true);
  const [dach, setDach] = React.useState(true);
  const [ebitdaRange, setEbitdaRange] = React.useState([]);
  const [ebitda_giant, setEbitda_giant] = React.useState(false);
  const [ebitda_large, setEbitda_large] = React.useState(false);
  const [ebitda_medium, setEbitda_medium] = React.useState(false);
  const [ebitda_small, setEbitda_small] = React.useState(false);
  const [energy, setEnergy] = React.useState(true);
  const [filterPressed, setFilterPressed] = React.useState(false);
  const [financials, setFinancials] = React.useState(true);
  const [germany, setGermany] = React.useState(true);
  const [health_care, setHealth_care] = React.useState(true);
  const [industrials, setIndustrials] = React.useState(true);
  const [it_and_software, setIt_and_software] = React.useState(true);
  const [keywordSearch, setKeywordSearch] = React.useState('');
  const [materials, setMaterials] = React.useState(true);
  const [nordic, setNordic] = React.useState(true);
  const [norgic, setNorgic] = React.useState(true);
  const [real_estate, setReal_estate] = React.useState(true);
  const [region, setRegion] = React.useState([]);
  const [sector, setSector] = React.useState([]);
  const [transaction, setTransaction] = React.useState(true);
  const [utilities, setUtilities] = React.useState(true);
  const toggleAllFilters = flag => {
    setEbitda_large(flag);
    setEbitda_medium(flag);
    setEbitda_small(flag);
    setEbitda_giant(flag);

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

    setNordic(flag);
    setDach(flag);
    setRoW(flag);
  };

  const applyFilters = () => {
    //EBITDA Range
    const ebitdaRange = [];

    ebitda_giant && ebitdaRange.push('EBITDA > €50m');
    ebitda_large && ebitdaRange.push('€20m < EBITDA ≤ €50m');
    ebitda_medium && ebitdaRange.push('€5m < EBITDA ≤ €20m');
    ebitda_small && ebitdaRange.push('EBITDA ≤ €5m');

    setEbitdaRange(() => ebitdaRange);

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

    //region
    const region = [];

    nordic && region.push('Nordic');
    dach && region.push('DACH');
    RoW && region.push('RoW');

    setRegion(() => region);
  };

  const matchingFilters = () => {
    setEbitda_giant((ebitdaRange || []).includes('EBITDA > €50m'));
    setEbitda_large((ebitdaRange || []).includes('€20m < EBITDA ≤ €50m'));
    setEbitda_medium((ebitdaRange || []).includes('€5m < EBITDA ≤ €20m'));
    setEbitda_small((ebitdaRange || []).includes('EBITDA ≤ €5m'));

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

    setNordic((region || []).includes('Nordic'));
    setDach((region || []).includes('DACH'));
    setRoW((region || []).includes('RoW'));
  };
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      removeGlobalScroll();
      setGlobalVariableValue({
        key: 'pageName',
        value: 'Multiples database',
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
                        marginLeft: 20,
                        marginTop: [
                          { minWidth: Breakpoints.Mobile, value: 0 },
                          { minWidth: Breakpoints.Laptop, value: 20 },
                        ],
                        textDecorationLine: 'none',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'Multiples database'}
                </H5>
              )}
            </>
            <Button
              iconPosition={'left'}
              onPress={() => {
                try {
                  navigation.push('AllEventsScreen');
                } catch (err) {
                  console.error(err);
                }
              }}
              {...GlobalStyles.ButtonStyles(theme)['Header menu'].props}
              icon={'AntDesign/left'}
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
              title={'All EVENTS'}
            />
          </View>

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
                      sector[0] || region[0]
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
                    (sector[0] || region[0]
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

      <XanoCollectionApi.FetchEventTransactionsGET
        keyword={keywordSearch}
        page={1}
        region_in={region}
        sector_in={sector}
      >
        {({ loading, error, data, refetchEventTransactions }) => {
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
                    {' transactions matching filter'}
                  </Text>
                </View>
              </View>
              <SimpleStyleFlatList
                data={fetchData?.items}
                horizontal={false}
                inverted={false}
                keyExtractor={(listData, index) => listData?.id}
                keyboardShouldPersistTaps={'never'}
                listKey={'SfOccPiT'}
                nestedScrollEnabled={false}
                onEndReachedThreshold={0.5}
                renderItem={({ item, index }) => {
                  const listData = item;
                  return (
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
                          try {
                            navigation.push('EventDetailsScreen', {
                              event_id: listData?.id,
                            });
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        style={StyleSheet.applyWidth(
                          { height: '100%', width: '100%' },
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
                              flexDirection: 'row',
                              height: '100%',
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
                                width: [
                                  {
                                    minWidth: Breakpoints.Laptop,
                                    value: '50%',
                                  },
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: '55%',
                                  },
                                ],
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
                                    fontFamily: 'Quicksand_700Bold',
                                    fontSize: 12,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {cutText(listData?.target, 24)}
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {listData?.published}
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
                              {'Acquiror: '}
                              {listData?._buyers}
                            </Text>
                            {/* Text 2 3 */}
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
                              {listData?._gics.GICS_Sector}
                            </Text>
                          </View>

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
                                  borderBottomRightRadius: 8,
                                  borderColor: null,
                                  borderRadius: null,
                                  borderTopRightRadius: 8,
                                  borderWidth: null,
                                  gap: 4,
                                  justifyContent: 'space-between',
                                  margin: null,
                                  padding: 10,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                { flexDirection: 'row', gap: 4 },
                                dimensions.width
                              )}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  { width: 70 },
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
                                        color: palettes.Brand['Strong Inverse'],
                                        fontFamily: 'Quicksand_400Regular',
                                        fontSize: 12,
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {'EV/Sales:'}
                                </Text>
                              </View>

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
                              >
                                {transformNumber(listData?.ev_sales, 'x', true)}{' '}
                                {showDate(
                                  listData?.ev_sales,
                                  listData?.fy_end,
                                  true
                                )}
                              </Text>
                            </View>
                            {/* View 2 */}
                            <View
                              style={StyleSheet.applyWidth(
                                { flexDirection: 'row', gap: 4 },
                                dimensions.width
                              )}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  { width: 70 },
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
                                        color: palettes.Brand['Strong Inverse'],
                                        fontFamily: 'Quicksand_400Regular',
                                        fontSize: 12,
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {'EV/EBITDA:'}
                                </Text>
                              </View>

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
                              >
                                {transformNumber(
                                  listData?.ev_ebitda,
                                  'x',
                                  true
                                )}{' '}
                                {showDate(
                                  listData?.ev_ebitda,
                                  listData?.fy_end,
                                  true
                                )}
                              </Text>
                            </View>
                            {/* View 3 */}
                            <View
                              style={StyleSheet.applyWidth(
                                { flexDirection: 'row', gap: 4 },
                                dimensions.width
                              )}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  { width: 70 },
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
                                        color: palettes.Brand['Strong Inverse'],
                                        fontFamily: 'Quicksand_400Regular',
                                        fontSize: 12,
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {'EV/EBIT:'}
                                </Text>
                              </View>

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
                              >
                                {transformNumber(
                                  listData?.ev_ebit,
                                  undefined,
                                  undefined
                                )}{' '}
                                {showDate(
                                  listData?.ev_ebit,
                                  listData?.fy_end,
                                  true
                                )}
                              </Text>
                            </View>
                          </LinearGradient>
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
                    alignItems: 'stretch',
                    height: [
                      { minWidth: Breakpoints.Mobile, value: '100%' },
                      {
                        minWidth: Breakpoints.Mobile,
                        value: dimensions.height,
                      },
                    ],
                    marginBottom:
                      dimensions.width >= Breakpoints.Laptop ? 0 : 65,
                    padding: 5,
                    paddingLeft: setPadding(dimensions.width),
                    paddingRight: setPadding(dimensions.width),
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
                          {'Filtering transactions'}
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
                      {/* EBITDA */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'flex-start',
                            flexDirection: [
                              { minWidth: Breakpoints.Mobile, value: 'column' },
                              { minWidth: Breakpoints.Tablet, value: 'column' },
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
                          {...GlobalStyles.ViewStyles(theme)['split_options']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ViewStyles(theme)['split_options']
                                .style,
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
                                    console.log('Start ON_PRESS:2 CONSOLE_LOG');
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
                              uncheckedColor={palettes.Brand['Strong Inverse']}
                            />
                            <Pressable
                              onPress={() => {
                                try {
                                  setEbitda_small(ebitda_small ? false : true);
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
                              uncheckedColor={palettes.Brand['Strong Inverse']}
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
                                      color: palettes.Brand['Strong Inverse'],
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
                              uncheckedColor={palettes.Brand['Strong Inverse']}
                            />
                            <Pressable
                              onPress={() => {
                                try {
                                  setEbitda_large(ebitda_large ? false : true);
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
                              uncheckedColor={palettes.Brand['Strong Inverse']}
                            />
                            <Pressable
                              onPress={() => {
                                try {
                                  setEbitda_giant(ebitda_giant ? false : true);
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
                              >
                                {'EBITDA >  €50m'}
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
                          {'GICS sector'}
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
                                  setHealth_care(transaction ? false : true);
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
                              >
                                {'Health Care'}
                              </Text>
                            </Pressable>
                          </View>
                        </View>
                      </View>
                      {/* Target region */}
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
                          {'Target region'}
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
                              size={24}
                              status={nordic}
                              uncheckedColor={palettes.Brand['Strong Inverse']}
                            />
                            <Pressable
                              onPress={() => {
                                try {
                                  setNordic(nordic ? false : true);
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
                              >
                                {'Nordic'}
                              </Text>
                            </Pressable>
                          </View>
                          {/* Rest of World (RoW) */}
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
                                  setRoW(newCheckboxValue);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              color={palettes.Brand['Strong Inverse']}
                              size={24}
                              status={RoW}
                              uncheckedColor={palettes.Brand['Strong Inverse']}
                            />
                            <Pressable
                              onPress={() => {
                                try {
                                  setRoW(RoW ? false : true);
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
                              >
                                {'Rest of World (RoW)'}
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
                              size={24}
                              status={dach}
                              uncheckedColor={palettes.Brand['Strong Inverse']}
                            />
                            <Pressable
                              onPress={() => {
                                try {
                                  setDach(dach ? false : true);
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
                              >
                                {'DACH'}
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
                                  /* hidden 'API Request' action */
                                  applyFilters();
                                  setFilterPressed(false);
                                  await waitUtil({ milliseconds: 500 });
                                  await refetchEventTransactions();
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
      </XanoCollectionApi.FetchEventTransactionsGET>
    </ScreenContainer>
  );
};

export default withTheme(TransactionsScreen);
