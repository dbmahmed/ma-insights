import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import AccModalBlock from '../components/AccModalBlock';
import CustomHeaderBlock from '../components/CustomHeaderBlock';
import TopNavBlock from '../components/TopNavBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import assessAccess from '../global-functions/assessAccess';
import modifyArrays from '../global-functions/modifyArrays';
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
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { H5, H6 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const AllEventsScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [SelectButton, setSelectButton] = React.useState('All');
  const [acq_agenda, setAcq_agenda] = React.useState(false);
  const [austria, setAustria] = React.useState(false);
  const [checkboxRow2Value, setCheckboxRow2Value] = React.useState('');
  const [checkboxRowValue, setCheckboxRowValue] = React.useState('');
  const [checkboxRowValue2, setCheckboxRowValue2] = React.useState('');
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [checkboxValue2, setCheckboxValue2] = React.useState(false);
  const [checkboxValue3, setCheckboxValue3] = React.useState(false);
  const [communication_services, setCommunication_services] =
    React.useState(false);
  const [consumer_discretionary, setConsumer_discretionary] =
    React.useState(false);
  const [consumer_staples, setConsumer_staples] = React.useState(false);
  const [country, setCountry] = React.useState([]);
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
  const [lastPage, setLastPage] = React.useState(2);
  const [materials, setMaterials] = React.useState(false);
  const [nextPage, setNextPage] = React.useState(2);
  const [norway, setNorway] = React.useState(false);
  const [real_estate, setReal_estate] = React.useState(false);
  const [sector, setSector] = React.useState([]);
  const [sweden, setSweden] = React.useState(false);
  const [switzerland, setSwitzerland] = React.useState(false);
  const [transaction, setTransaction] = React.useState(false);
  const [utilities, setUtilities] = React.useState(false);
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
    it_and_software && sectors.push('IT & Software');
    consumer_staples && sectors.push('Consumer Staples');
    materials && sectors.push('Materials');
    energy && sectors.push('Energy');
    real_estate && sectors.push('Real Estate');
    financials && sectors.push('Financials');
    utilities && sectors.push('Utilities');
    health_care && sectors.push('Health Care');

    setSector(() => sectors);

    console.log(eventType, sectors, countries);
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
    setIt_and_software((sector || []).includes('IT & Software'));
    setConsumer_staples((sector || []).includes('Consumer Staples'));
    setMaterials((sector || []).includes('Materials'));
    setEnergy((sector || []).includes('Energy'));
    setReal_estate((sector || []).includes('Real Estate'));
    setFinancials((sector || []).includes('Financials'));
    setUtilities((sector || []).includes('Utilities'));
    setHealth_care((sector || []).includes('Health Care'));

    console.log(eventType, sector, country);
  };
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      setGlobalVariableValue({
        key: 'pageName',
        value: 'All events',
      });
      setGlobalVariableValue({
        key: 'subPage',
        value: false,
      });
      /* hidden 'Log to Console' action */
      /* hidden 'API Request' action */
      /* hidden 'Log to Console' action */
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
                  {'All events'}
                </H5>
              )}
            </>
            <Button
              iconPosition={'left'}
              onPress={() => {
                try {
                  navigation.push('TransactionsScreen');
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
                { gap: 10, justifyContent: 'space-between', marginLeft: 8 }
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
                      eventType?.length || country?.length || sector?.length
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
                    (eventType[0] || country[0] || sector[0]
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

      <SimpleStyleScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
        style={StyleSheet.applyWidth(
          {
            alignItems: [
              { minWidth: Breakpoints.BigScreen, value: 'center' },
              { minWidth: Breakpoints.Mobile, value: 'center' },
            ],
            paddingLeft: 10,
            paddingRight: 10,
            width: '100%',
          },
          dimensions.width
        )}
      >
        <XanoCollectionApi.FetchGetAllEventsGET
          countryIn={country}
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
                /* hidden 'Log to Console' action */
                setNextPage(fetchData?.nextPage);
                setLastPage(fetchData?.pageTotal);
                /* hidden 'Set Variable' action */
              } catch (err) {
                console.error(err);
              }
            },
          }}
          keyword={keywordSearch}
          page={1}
          sectorIn={sector}
        >
          {({ loading, error, data, refetchGetAllEvents }) => {
            const fetchData = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <>
                <SimpleStyleFlatList
                  data={eventItems}
                  horizontal={false}
                  inverted={false}
                  keyExtractor={(listData, index) => listData?.id}
                  keyboardShouldPersistTaps={'never'}
                  listKey={'AwqPzJqX'}
                  nestedScrollEnabled={false}
                  onEndReached={() => {
                    const handler = async () => {
                      console.log('List ON_END_REACHED Start');
                      let error = null;
                      try {
                        console.log('Start ON_END_REACHED:0 CONSOLE_LOG');
                        /* hidden 'Log to Console' action */ console.log(
                          'Complete ON_END_REACHED:0 CONSOLE_LOG'
                        );
                        console.log('Start ON_END_REACHED:1 CONDITIONAL_STOP');
                        if (nextPage > lastPage) {
                          return console.log(
                            'Complete ON_END_REACHED:1 CONDITIONAL_STOP'
                          );
                        } else {
                          console.log(
                            'Skipped ON_END_REACHED:1 CONDITIONAL_STOP: condition not met'
                          );
                        }
                        console.log('Start ON_END_REACHED:2 SET_VARIABLE');
                        const value5LnNJ7Yb = parseInt(nextPage + 1, 10);
                        setNextPage(value5LnNJ7Yb);
                        const nextPageSet = value5LnNJ7Yb;
                        console.log('Complete ON_END_REACHED:2 SET_VARIABLE');
                        console.log('Start ON_END_REACHED:3 CONSOLE_LOG');
                        console.log(nextPage);
                        console.log('Complete ON_END_REACHED:3 CONSOLE_LOG');
                        console.log('Start ON_END_REACHED:4 FETCH_REQUEST');
                        const newData = (
                          await XanoCollectionApi.getAllEventsGET(Constants, {
                            countryIn: country,
                            eventTypeIn: eventType,
                            keyword: keywordSearch,
                            page: nextPage,
                            sectorIn: sector,
                          })
                        )?.json;
                        console.log('Complete ON_END_REACHED:4 FETCH_REQUEST', {
                          newData,
                        });
                        console.log('Start ON_END_REACHED:5 SET_VARIABLE');
                        setEventItems(eventItems.concat(newData?.items));
                        console.log('Complete ON_END_REACHED:5 SET_VARIABLE');
                        console.log('Start ON_END_REACHED:6 SET_VARIABLE');
                        setLastPage(newData?.pageTotal);
                        console.log('Complete ON_END_REACHED:6 SET_VARIABLE');
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
                            flex: { minWidth: Breakpoints.Laptop, value: 1 },
                            padding: { minWidth: Breakpoints.Laptop, value: 5 },
                          },
                          dimensions.width
                        )}
                      >
                        <Touchable
                          onPress={() => {
                            try {
                              navigation.navigate('EventDetailsScreen', {
                                event_id: listData?.id,
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
                                    fontSize: 12,
                                    margin: 0,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {listData?.headline}
                            </H6>

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
                                    fontSize: 10,
                                    marginTop: 4,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {listData?.published}
                              {' | Source: '}
                              {listData?.source}
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
                                    fontSize: 10,
                                    marginTop: 4,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {listData?.description}
                            </Text>
                          </View>
                        </Touchable>
                      </View>
                    );
                  }}
                  numColumns={dimensions.width >= Breakpoints.Laptop ? 1 : 1}
                  onEndReachedThreshold={0.2}
                  showsHorizontalScrollIndicator={true}
                  showsVerticalScrollIndicator={true}
                  style={StyleSheet.applyWidth(
                    { maxHeight: dimensions.height - 250, maxWidth: 1200 },
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
                          { minWidth: Breakpoints.Mobile, value: 'center' },
                          { minWidth: Breakpoints.Tablet, value: 'flex-start' },
                        ],
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
                          alignItems: [
                            { minWidth: Breakpoints.Mobile, value: 'center' },
                            { minWidth: Breakpoints.Laptop, value: 'stretch' },
                          ],
                          borderRadius: 8,
                          justifyContent: 'center',
                          maxWidth: [
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
                          GlobalStyles.LinearGradientStyles(theme)[
                            'Linear Gradient'
                          ].style,
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
                        {/* Event type */}
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
                            {'Event type'}
                          </H5>

                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'flex-start',
                                flex: 0,
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                gap: 8,
                                justifyContent: 'flex-start',
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
                                  width: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: '47%',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: '30%',
                                    },
                                  ],
                                },
                                dimensions.width
                              )}
                            >
                              <Checkbox
                                onCheck={() => {
                                  try {
                                    const valueg2zf5NDI = modifyArrays(
                                      eventType,
                                      'Future Opportunity',
                                      'push'
                                    );
                                    setEventType(valueg2zf5NDI);
                                    const event = valueg2zf5NDI;
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
                                uncheckedColor={
                                  palettes.Brand['Strong Inverse']
                                }
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
                                  width: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: '47%',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: '30%',
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
                                uncheckedColor={
                                  palettes.Brand['Strong Inverse']
                                }
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
                                  width: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: '47%',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: '30%',
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
                                uncheckedColor={
                                  palettes.Brand['Strong Inverse']
                                }
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
                                  {'Transaction'}
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
                                gap: 8,
                                justifyContent: 'flex-start',
                              },
                              dimensions.width
                            )}
                          >
                            {/* Sweden */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignContent: 'center',
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  gap: 4,
                                  width: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: '47%',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: '30%',
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
                                        color: palettes.Brand['Strong Inverse'],
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
                            {/* Germany */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignContent: 'center',
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  gap: 4,
                                  width: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: '47%',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: '30%',
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
                                        color: palettes.Brand['Strong Inverse'],
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
                            {/* Denmark */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignContent: 'center',
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  gap: 4,
                                  width: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: '47%',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: '30%',
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
                                        color: palettes.Brand['Strong Inverse'],
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
                            {/* Switzerland */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignContent: 'center',
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  gap: 4,
                                  width: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: '47%',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: '30%',
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
                                >
                                  {'Switzerland'}
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
                                  width: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: '47%',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: '30%',
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
                                        color: palettes.Brand['Strong Inverse'],
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
                            {/* Austria */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignContent: 'center',
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  gap: 4,
                                  width: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: '47%',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: '30%',
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
                                        color: palettes.Brand['Strong Inverse'],
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
                            {/* Finland */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignContent: 'center',
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  gap: 4,
                                  width: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: '47%',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: '30%',
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
                                        color: palettes.Brand['Strong Inverse'],
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
                          </View>
                        </View>
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
                                {...GlobalStyles.TextStyles(theme)[
                                  'screen_title'
                                ].props}
                                selectionColor={
                                  palettes.Brand['Strong Inverse']
                                }
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
                                {...GlobalStyles.TextStyles(theme)[
                                  'screen_title'
                                ].props}
                                selectionColor={
                                  palettes.Brand['Strong Inverse']
                                }
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
                                gap: 8,
                                justifyContent: 'flex-start',
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
                                  width: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: '47%',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: '30%',
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
                                  width: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: '47%',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: '30%',
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
                                  width: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: '47%',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: '30%',
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
                                  width: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: '47%',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: '30%',
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
                                  width: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: '47%',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: '30%',
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
                                  width: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: '47%',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: '30%',
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
                                  width: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: '47%',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: '30%',
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
                                  width: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: '47%',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: '30%',
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
                                  width: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: '47%',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: '30%',
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
                                  width: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: '47%',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: '30%',
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
                                  width: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: '47%',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: '30%',
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
                        <Spacer bottom={10} left={0} right={0} top={10} />
                        {/* Buttons */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignContent: 'flex-start',
                              flexDirection: 'row',
                              flexGrow: 1,
                              gap: 8,
                              justifyContent: 'space-between',
                              marginBottom: 10,
                              padding: 10,
                            },
                            dimensions.width
                          )}
                        >
                          {/* Select All */}
                          <Button
                            iconPosition={'left'}
                            onPress={() => {
                              try {
                                if (SelectButton === 'All') {
                                  toggleAllFilters(true);
                                  setSelectButton('None');
                                } else {
                                  toggleAllFilters(false);
                                  setSelectButton('All');
                                }
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
                                  width: '47%',
                                }
                              ),
                              dimensions.width
                            )}
                            title={`Select ${SelectButton}`}
                          />
                          {/* Results */}
                          <Button
                            iconPosition={'left'}
                            onPress={() => {
                              const handler = async () => {
                                try {
                                  applyFilter();
                                  /* hidden 'API Request' action */
                                  await waitUtil({ milliseconds: 1000 });
                                  await refetchGetAllEvents();
                                  setFilterPressed(false);
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
                                  width: '47%',
                                }
                              ),
                              dimensions.width
                            )}
                            title={'Filter'}
                          />
                        </View>
                      </LinearGradient>
                    </View>
                  </SimpleStyleScrollView>
                </Modal>
              </>
            );
          }}
        </XanoCollectionApi.FetchGetAllEventsGET>
      </SimpleStyleScrollView>
      <>{!Constants['top_nav_pressed'] ? null : <TopNavBlock />}</>
      <AccModalBlock />
    </ScreenContainer>
  );
};

export default withTheme(AllEventsScreen);
