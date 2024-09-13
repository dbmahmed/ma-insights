import React from 'react';
import {
  HStack,
  LinearGradient,
  Link,
  ScreenContainer,
  SimpleStyleScrollView,
  withTheme,
} from '@draftbit/ui';
import { H3 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import { ActivityIndicator, Image, Platform, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import CustomBottomNavBlock from '../components/CustomBottomNavBlock';
import CustomHeaderBlock from '../components/CustomHeaderBlock';
import LoadingBlock from '../components/LoadingBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import assessAccess from '../global-functions/assessAccess';
import cutTextByWidth from '../global-functions/cutTextByWidth';
import deviceType from '../global-functions/deviceType';
import isNKPProp from '../global-functions/isNKPProp';
import removeGlobalScroll from '../global-functions/removeGlobalScroll';
import resetAccess from '../global-functions/resetAccess';
import screenNameGen from '../global-functions/screenNameGen';
import showNKPProp from '../global-functions/showNKPProp';
import transformEuroM from '../global-functions/transformEuroM';
import transformNumber from '../global-functions/transformNumber';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { event_id: 1 };

const EventDetailsScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [screenCode, setScreenCode] = React.useState('');
  const getListNameFormArray = array => {
    return array.map(item => item?.name).join(', ');
  };
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
        value: 'Event Details',
      });
      setGlobalVariableValue({
        key: 'screenParamName',
        value: 'event_id',
      });
      setGlobalVariableValue({
        key: 'screenParamValue',
        value: props.route?.params?.event_id ?? defaultProps.event_id,
      });
      setGlobalVariableValue({
        key: 'pageName',
        value: 'Event Details',
      });
      setGlobalVariableValue({
        key: 'subPage',
        value: true,
      });
      if (assessAccess(Variables, setGlobalVariableValue) === true) {
        return;
      }
      if (navigation.canGoBack()) {
        navigation.popToTop();
      }
      navigation.replace('LogInScreen');
      /* hidden 'Run a Custom Function' action */
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
      <XanoCollectionApi.FetchGetOneEventGET
        device={deviceType(
          Platform.OS === 'web',
          Platform.OS === 'ios',
          Platform.OS === 'android'
        )}
        event_id={props.route?.params?.event_id ?? defaultProps.event_id}
        screenCode={screenCode}
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
                    {showNKPProp(fetchData?.headline, fetchData?.source)}
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
                    {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['screen_title'].style,
                      dimensions.width
                    )}
                    suppressHighlighting={true}
                  >
                    {fetchData?.published}
                  </Text>
                </View>
                {/* View 3 */}
                <View
                  style={StyleSheet.applyWidth(
                    { marginBottom: 10 },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['screen_title'].style,
                      dimensions.width
                    )}
                    suppressHighlighting={true}
                  >
                    {fetchData?.description}
                  </Text>
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
                              {...GlobalStyles.LinkStyles(theme)['Link'].props}
                              ellipsizeMode={'tail'}
                              numberOfLines={1}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.LinkStyles(theme)['Link'].style,
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
                          {transformNumber(
                            fetchData?._gics?.GICS_Sub_Industry,
                            undefined,
                            undefined
                          )}
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
                      {!(
                        transformNumber(
                          fetchData?.revenue_eur,
                          undefined,
                          undefined
                        ) !== '-'
                      ) ? null : (
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
                      )}
                    </>
                    {/* View 15 */}
                    <>
                      {!(
                        transformNumber(
                          fetchData?.gross_profit_eur,
                          undefined,
                          undefined
                        ) !== '-'
                      ) ? null : (
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
                              {'Gross Profit:'}
                            </Text>
                          </View>
                          {/* View 2 */}
                          <View>
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
                              {transformEuroM(fetchData?.gross_profit_eur)}
                            </Text>
                          </View>
                        </View>
                      )}
                    </>
                    {/* View 10 */}
                    <>
                      {!(
                        transformNumber(
                          fetchData?.ebitda_eur,
                          undefined,
                          undefined
                        ) !== '-'
                      ) ? null : (
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
                              {'EBITDA:'}
                            </Text>
                          </View>
                          {/* View 2 */}
                          <View>
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
                              {transformEuroM(fetchData?.ebitda_eur)}
                            </Text>
                          </View>
                        </View>
                      )}
                    </>
                    {/* View 17 */}
                    <>
                      {!(
                        transformNumber(
                          fetchData?.ebit_eur,
                          undefined,
                          undefined
                        ) !== '-'
                      ) ? null : (
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
                          <View>
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
                      )}
                    </>
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
      <CustomBottomNavBlock />
    </ScreenContainer>
  );
};

export default withTheme(EventDetailsScreen);
