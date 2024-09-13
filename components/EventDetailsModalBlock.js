import React from 'react';
import {
  Button,
  HStack,
  Icon,
  IconButton,
  LinearGradient,
  Link,
  Pressable,
  Shadow,
  SimpleStyleScrollView,
  withTheme,
} from '@draftbit/ui';
import { H3 } from '@expo/html-elements';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import {
  ActivityIndicator,
  Image,
  Modal,
  Platform,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import LoadingBlock from '../components/LoadingBlock';
import WatermarkerBlock from '../components/WatermarkerBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import cutTextByWidth from '../global-functions/cutTextByWidth';
import deviceType from '../global-functions/deviceType';
import getListNameFormArray from '../global-functions/getListNameFormArray';
import isNKPProp from '../global-functions/isNKPProp';
import transformEuroM from '../global-functions/transformEuroM';
import transformNumber from '../global-functions/transformNumber';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const EventDetailsModalBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [viewingEventId, setViewingEventId] = props.setViewingEventId
    ? [
        props.viewingEventId !== undefined ? props.viewingEventId : 4,
        props.setViewingEventId,
      ]
    : React.useState(4);
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
    setIt_and_software((sector || []).includes('IT & Software'));
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
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <Modal
      animationType={'none'}
      supportedOrientations={['portrait', 'landscape']}
      transparent={false}
    >
      <View
        style={StyleSheet.applyWidth(
          {
            flex: [
              { minWidth: Breakpoints.Laptop, value: 1 },
              { minWidth: Breakpoints.Mobile, value: 1 },
            ],
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
                      setViewingEventId(0);
                      setGlobalVariableValue({
                        key: 'SS_SCREEN_NAME',
                        value: 'AllEvents',
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  size={32}
                  color={theme.colors.text.strong}
                  icon={'Entypo/chevron-thin-left'}
                />
              </View>
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
                      setViewingEventId('');
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

        <XanoCollectionApi.FetchGetOneEventGET
          device={deviceType(
            Platform.OS === 'web',
            Platform.OS === 'ios',
            Platform.OS === 'android'
          )}
          event_id={viewingEventId}
        >
          {({ loading, error, data, refetchGetOneEvent }) => {
            const fetchData = data?.json;
            if (loading) {
              return <LoadingBlock />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <SimpleStyleScrollView
                horizontal={false}
                keyboardShouldPersistTaps={'never'}
                nestedScrollEnabled={false}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    height: '100%',
                    marginTop: 65,
                    paddingBottom: 65,
                    position: 'absolute',
                    width: '100%',
                  },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      marginBottom:
                        dimensions.width >= Breakpoints.Laptop ? 0 : 65,
                      maxWidth: 1200,
                      padding: 10,
                      width: '100%',
                    },
                    dimensions.width
                  )}
                >
                  {/* View 3 */}
                  <View>
                    <>
                      {!fetchData?.source
                        ?.toLowerCase()
                        .includes('proprietary') ? null : (
                        <WatermarkerBlock />
                      )}
                    </>
                    <HStack
                      {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.HStackStyles(theme)['H Stack'].style,
                          { alignItems: 'flex-start' }
                        ),
                        dimensions.width
                      )}
                    >
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
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {fetchData?.headline}
                      </H3>
                    </HStack>

                    <View
                      style={StyleSheet.applyWidth(
                        { marginBottom: 10 },
                        dimensions.width
                      )}
                    >
                      <Text
                        accessible={true}
                        {...GlobalStyles.TextStyles(theme)['screen_title']
                          .props}
                        style={StyleSheet.applyWidth(
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
                          dimensions.width
                        )}
                        suppressHighlighting={true}
                      >
                        {fetchData?.published}
                      </Text>
                    </View>
                    {/* View 2 */}
                    <View
                      style={StyleSheet.applyWidth(
                        { marginBottom: 20 },
                        dimensions.width
                      )}
                    >
                      {/* Text 2 */}
                      <Text
                        accessible={true}
                        {...GlobalStyles.TextStyles(theme)['screen_title']
                          .props}
                        style={StyleSheet.applyWidth(
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
                          dimensions.width
                        )}
                        suppressHighlighting={true}
                      >
                        {fetchData?.description}
                      </Text>
                    </View>
                  </View>
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: [
                          {
                            minWidth: Breakpoints.BigScreen,
                            value: 'flex-start',
                          },
                          { minWidth: Breakpoints.Laptop, value: 'flex-start' },
                        ],
                        flexDirection: [
                          { minWidth: Breakpoints.BigScreen, value: 'column' },
                          { minWidth: Breakpoints.Laptop, value: 'column' },
                        ],
                        flexWrap: {
                          minWidth: Breakpoints.BigScreen,
                          value: 'wrap',
                        },
                        gap: [
                          { minWidth: Breakpoints.BigScreen, value: 8 },
                          { minWidth: Breakpoints.Laptop, value: 8 },
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
                            borderRadius: 8,
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
                            {
                              width: [
                                { minWidth: Breakpoints.Tablet, value: 160 },
                                { minWidth: Breakpoints.Mobile, value: 150 },
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
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {'Event type:'}
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
                            {fetchData?.event_type}
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
                            {
                              width: [
                                { minWidth: Breakpoints.Tablet, value: 160 },
                                { minWidth: Breakpoints.Mobile, value: 150 },
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
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {'Source:'}
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
                            {
                              width: [
                                { minWidth: Breakpoints.Tablet, value: 160 },
                                { minWidth: Breakpoints.Mobile, value: 150 },
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
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {'Source link:'}
                          </Text>
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { flex: 1 },
                            dimensions.width
                          )}
                        >
                          <>
                            {!(fetchData?.source_link !== '') ? null : (
                              <Link
                                accessible={true}
                                onPress={() => {
                                  const handler = async () => {
                                    try {
                                      await WebBrowser.openBrowserAsync(
                                        `${fetchData?.source_link}`
                                      );
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  };
                                  handler();
                                }}
                                {...GlobalStyles.LinkStyles(theme)['Link']
                                  .props}
                                ellipsizeMode={'tail'}
                                numberOfLines={1}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.LinkStyles(theme)['Link']
                                      .style,
                                    { color: palettes.App.Orange }
                                  ),
                                  dimensions.width
                                )}
                                title={`${cutTextByWidth(
                                  fetchData?.source_link,
                                  dimensions.width,
                                  190
                                )}`}
                              />
                            )}
                          </>
                          <>
                            {!(fetchData?.source_link === '') ? null : (
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
                                      fontFamily: 'Quicksand_500Medium',
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                              >
                                {'-'}
                              </Text>
                            )}
                          </>
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
                            {
                              width: [
                                { minWidth: Breakpoints.Tablet, value: 160 },
                                { minWidth: Breakpoints.Mobile, value: 150 },
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
                            {fetchData?.target}
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
                            {
                              width: [
                                { minWidth: Breakpoints.Tablet, value: 160 },
                                { minWidth: Breakpoints.Mobile, value: 150 },
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
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {'Target Country:'}
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
                      {/* View 6 */}
                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', gap: 8, width: '100%' },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              width: [
                                { minWidth: Breakpoints.Tablet, value: 160 },
                                { minWidth: Breakpoints.Mobile, value: 150 },
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
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {'Target GICS:'}
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
                            {fetchData?._gics?.GICS_Sub_Industry}
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
                            {
                              width: [
                                { minWidth: Breakpoints.Tablet, value: 160 },
                                { minWidth: Breakpoints.Mobile, value: 150 },
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
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {'Seller:'}
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
                            {transformNumber(
                              getListNameFormArray(fetchData?.seller),
                              undefined,
                              undefined
                            )}
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
                            {
                              width: [
                                { minWidth: Breakpoints.Tablet, value: 160 },
                                { minWidth: Breakpoints.Mobile, value: 150 },
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
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {'Buyer:'}
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
                            {transformNumber(
                              getListNameFormArray(fetchData?.buyer),
                              undefined,
                              undefined
                            )}
                          </Text>
                        </View>
                      </View>
                      {/* View 9 */}
                      <>
                        {!(fetchData?.revenue_eur !== '-') ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              { flexDirection: 'row', gap: 8, width: '100%' },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  width: [
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: 160,
                                    },
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: 150,
                                    },
                                  ],
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
                        )}
                      </>
                      {/* View 15 */}
                      <>
                        {!(fetchData?.gross_profit_eur !== '-') ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              { flexDirection: 'row', gap: 8, width: 100 },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  width: [
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: 160,
                                    },
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: 150,
                                    },
                                  ],
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
                                      color: palettes.Brand['Strong Inverse'],
                                      fontFamily: 'Quicksand_500Medium',
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                              >
                                {'Gross Profit:'}
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
                                      fontFamily: 'Quicksand_500Medium',
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                              >
                                {transformEuroM(fetchData?.gross_profit_eur)}
                              </Text>
                            </View>
                          </View>
                        )}
                      </>
                      {/* View 10 */}
                      <>
                        {!(fetchData?.ebitda_eur !== '-') ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              { flexDirection: 'row', gap: 8, width: '100%' },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  width: [
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: 160,
                                    },
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: 150,
                                    },
                                  ],
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
                        )}
                      </>
                      {/* View 17 */}
                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', gap: 8, width: '100%' },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              width: [
                                { minWidth: Breakpoints.Tablet, value: 160 },
                                { minWidth: Breakpoints.Mobile, value: 150 },
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
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {'EBIT:'}
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
                            {transformEuroM(fetchData?.ebit_eur)}
                          </Text>
                        </View>
                      </View>
                      {/* View 11 */}
                      <>
                        {!(fetchData?.ev_eur !== '0.0') ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              { flexDirection: 'row', gap: 8, width: '100%' },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  width: [
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: 160,
                                    },
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: 150,
                                    },
                                  ],
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
                                      color: palettes.Brand['Strong Inverse'],
                                      fontFamily: 'Quicksand_500Medium',
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                              >
                                {'Enterprise value (EV):'}
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
                                      fontFamily: 'Quicksand_500Medium',
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                              >
                                {transformEuroM(fetchData?.ev_eur)}
                              </Text>
                            </View>
                          </View>
                        )}
                      </>
                      {/* View 12 */}
                      <>
                        {!(fetchData?.ev_eur !== '0.0') ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              { flexDirection: 'row', gap: 8, width: '100%' },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  width: [
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: 160,
                                    },
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: 150,
                                    },
                                  ],
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
                                      color: palettes.Brand['Strong Inverse'],
                                      fontFamily: 'Quicksand_500Medium',
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                              >
                                {'EV/Sales ('}
                                {fetchData?.fy_end}
                                {'):'}
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
                                      fontFamily: 'Quicksand_500Medium',
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                              >
                                {fetchData?.ev_sales !== '0.0'
                                  ? fetchData?.ev_sales
                                  : '-'}
                              </Text>
                            </View>
                          </View>
                        )}
                      </>
                      {/* View 13 */}
                      <>
                        {!(fetchData?.ev_eur !== '0.0') ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              { flexDirection: 'row', gap: 8, width: '100%' },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  width: [
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: 160,
                                    },
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: 150,
                                    },
                                  ],
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
                                      color: palettes.Brand['Strong Inverse'],
                                      fontFamily: 'Quicksand_500Medium',
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                              >
                                {'EV/EBITDA ('}
                                {fetchData?.fy_end}
                                {'):'}
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
                                      fontFamily: 'Quicksand_500Medium',
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                              >
                                {fetchData?.ev_ebitda !== '0.0'
                                  ? fetchData?.ev_ebitda
                                  : '-'}
                              </Text>
                            </View>
                          </View>
                        )}
                      </>
                      {/* View 14 */}
                      <>
                        {!(fetchData?.ev_eur !== '0.0') ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              { flexDirection: 'row', gap: 8, width: '100%' },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  width: [
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: 160,
                                    },
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: 150,
                                    },
                                  ],
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
                                      color: palettes.Brand['Strong Inverse'],
                                      fontFamily: 'Quicksand_500Medium',
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                              >
                                {'EV/EBIT ('}
                                {fetchData?.fy_end}
                                {'):'}
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
                                      fontFamily: 'Quicksand_500Medium',
                                    }
                                  ),
                                  dimensions.width
                                )}
                                suppressHighlighting={true}
                              >
                                {fetchData?.ev_ebit !== '0.0'
                                  ? fetchData?.ev_ebit
                                  : '-'}
                              </Text>
                            </View>
                          </View>
                        )}
                      </>
                      {/* View 16 */}
                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', gap: 8, width: '100%' },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              width: [
                                { minWidth: Breakpoints.Mobile, value: 150 },
                                { minWidth: Breakpoints.Tablet, value: 160 },
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
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {'Comment to financials:'}
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
                            ellipsizeMode={'clip'}
                            numberOfLines={50}
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
                            {fetchData?.note_financials
                              ? fetchData?.note_financials
                              : '-'}
                          </Text>
                        </View>
                      </View>
                    </LinearGradient>

                    <View
                      style={StyleSheet.applyWidth(
                        {
                          borderColor: theme.colors.text.strong,
                          borderRadius: 10,
                          borderWidth: 1,
                          gap: 8,
                          maxWidth: 400,
                          padding: 10,
                          width: '100%',
                        },
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', gap: 8 },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 150 },
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
                                  color: theme.colors.text.strong,
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {'Sell-side corp. finance:'}
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
                                color: theme.colors.text.strong,
                                fontFamily: 'Quicksand_500Medium',
                              }
                            ),
                            dimensions.width
                          )}
                          suppressHighlighting={true}
                        >
                          {fetchData?.sellside_cf?.length !== 0
                            ? getListNameFormArray(fetchData?.sellside_cf)
                            : '-'}
                        </Text>
                      </View>
                      {/* View 2 */}
                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', gap: 8 },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 150 },
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
                                  color: theme.colors.text.strong,
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {'Sell-side legal:'}
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
                                color: theme.colors.text.strong,
                                fontFamily: 'Quicksand_500Medium',
                              }
                            ),
                            dimensions.width
                          )}
                          suppressHighlighting={true}
                        >
                          {fetchData?.sellside_legal?.length !== 0
                            ? getListNameFormArray(fetchData?.sellside_legal)
                            : '-'}
                        </Text>
                      </View>
                      {/* View 3 */}
                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', gap: 8 },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 150 },
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
                                  color: theme.colors.text.strong,
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {'Buy-side corp. finance:'}
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
                                color: theme.colors.text.strong,
                                fontFamily: 'Quicksand_500Medium',
                              }
                            ),
                            dimensions.width
                          )}
                          suppressHighlighting={true}
                        >
                          {fetchData?.buyside_cf?.length !== 0
                            ? getListNameFormArray(fetchData?.buyside_cf)
                            : '-'}
                        </Text>
                      </View>
                      {/* View 4 */}
                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', gap: 8 },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 150 },
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
                                  color: theme.colors.text.strong,
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                            suppressHighlighting={true}
                          >
                            {'Buy-side legal:'}
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
                                color: theme.colors.text.strong,
                                fontFamily: 'Quicksand_500Medium',
                              }
                            ),
                            dimensions.width
                          )}
                          suppressHighlighting={true}
                        >
                          {fetchData?.buyside_legal?.length !== 0
                            ? getListNameFormArray(fetchData?.buyside_legal)
                            : '-'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </SimpleStyleScrollView>
            );
          }}
        </XanoCollectionApi.FetchGetOneEventGET>
      </View>
    </Modal>
  );
};

export default withTheme(EventDetailsModalBlock);
