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
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import CustomHeaderBlock from '../components/CustomHeaderBlock';
import LoadingBlock from '../components/LoadingBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import assessAccess from '../global-functions/assessAccess';
import cutTextByWidth from '../global-functions/cutTextByWidth';
import isNKPProp from '../global-functions/isNKPProp';
import removeGlobalScroll from '../global-functions/removeGlobalScroll';
import resetAccess from '../global-functions/resetAccess';
import showNKPProp from '../global-functions/showNKPProp';
import transformEuroM from '../global-functions/transformEuroM';
import transformNumber from '../global-functions/transformNumber';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const EventDetailsScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const getListNameFormArray = array => {
    return array.map(item => item?.name).join(', ');
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
        value: 'Event Details',
      });
      setGlobalVariableValue({
        key: 'screenParamName',
        value: 'event_id',
      });
      setGlobalVariableValue({
        key: 'screenParamValue',
        value: props.route?.params?.event_id ?? 42843,
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
      /* hidden 'Navigate' action */
      resetAccess(navigation, Variables, setGlobalVariableValue);
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
    >
      <CustomHeaderBlock />
      <XanoCollectionApi.FetchGetOneEventGET
        event_id={props.route?.params?.event_id ?? 42843}
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
                        { fontFamily: 'Quicksand_700Bold', fontSize: 20 }
                      ),
                      dimensions.width
                    )}
                  >
                    {showNKPProp(fetchData?.headline, fetchData?.source)}
                  </H3>
                  <>
                    {!isNKPProp(fetchData?.source) ? null : (
                      <Image
                        resizeMode={'cover'}
                        {...GlobalStyles.ImageStyles(theme)['Image'].props}
                        source={Images['mainsightsfaviconlogo1024new']}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'].style,
                            { height: 25, marginTop: 20, width: 25 }
                          ),
                          dimensions.width
                        )}
                      />
                    )}
                  </>
                </HStack>

                <View
                  style={StyleSheet.applyWidth(
                    { marginBottom: 20 },
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
                        { flexDirection: 'row', gap: 8 },
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
                        >
                          {'Event type:'}
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
                              color: palettes.Brand['Strong Inverse'],
                              fontFamily: 'Quicksand_500Medium',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {fetchData?.event_type}
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
                        >
                          {'Source:'}
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
                              color: palettes.Brand['Strong Inverse'],
                              fontFamily: 'Quicksand_500Medium',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {fetchData?.source}
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
                        >
                          {'Source link:'}
                        </Text>
                      </View>
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
                          >
                            {'-'}
                          </Text>
                        )}
                      </>
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
                        >
                          {'Target:'}
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
                              color: palettes.Brand['Strong Inverse'],
                              fontFamily: 'Quicksand_500Medium',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {fetchData?.target}
                      </Text>
                    </View>
                    {/* View 5 */}
                    <View
                      style={StyleSheet.applyWidth(
                        { flexDirection: 'row', gap: 8 },
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
                        >
                          {'Target Country:'}
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
                              color: palettes.Brand['Strong Inverse'],
                              fontFamily: 'Quicksand_500Medium',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {fetchData?.country}
                      </Text>
                    </View>
                    {/* View 6 */}
                    <View
                      style={StyleSheet.applyWidth(
                        { flexDirection: 'row', gap: 8 },
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
                        >
                          {'Target GICS:'}
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
                              color: palettes.Brand['Strong Inverse'],
                              fontFamily: 'Quicksand_500Medium',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {fetchData?._gics?.GICS_Sub_Industry}
                      </Text>
                    </View>
                    {/* View 7 */}
                    <View
                      style={StyleSheet.applyWidth(
                        { flexDirection: 'row', gap: 8 },
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
                        >
                          {'Seller:'}
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
                              color: palettes.Brand['Strong Inverse'],
                              fontFamily: 'Quicksand_500Medium',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {transformNumber(
                          getListNameFormArray(fetchData?.seller),
                          undefined,
                          undefined
                        )}
                      </Text>
                    </View>
                    {/* View 8 */}
                    <View
                      style={StyleSheet.applyWidth(
                        { flexDirection: 'row', gap: 8 },
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
                        >
                          {'Buyer:'}
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
                              color: palettes.Brand['Strong Inverse'],
                              fontFamily: 'Quicksand_500Medium',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {transformNumber(
                          getListNameFormArray(fetchData?.buyer),
                          undefined,
                          undefined
                        )}
                      </Text>
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
                            { flexDirection: 'row', gap: 8 },
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
                            >
                              {'Revenue:'}
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
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {transformEuroM(fetchData?.revenue_eur)}
                          </Text>
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
                            { flexDirection: 'row', gap: 8 },
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
                            >
                              {'EBITDA:'}
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
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {transformEuroM(fetchData?.ebitda_eur)}
                          </Text>
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
                            { flexDirection: 'row', gap: 8 },
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
                            >
                              {'Gross Profit:'}
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
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {transformEuroM(fetchData?.gross_profit_eur)}
                          </Text>
                        </View>
                      )}
                    </>
                    {/* View 11 */}
                    <>
                      {!(fetchData?.ev_eur !== '0.0') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            { flexDirection: 'row', gap: 8 },
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
                            >
                              {'Enterprise value (EV):'}
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
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {transformEuroM(fetchData?.ev_eur)}
                          </Text>
                        </View>
                      )}
                    </>
                    {/* View 12 */}
                    <>
                      {!(fetchData?.ev_eur !== '0.0') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            { flexDirection: 'row', gap: 8 },
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
                            >
                              {'EV/Sales ('}
                              {fetchData?.fy_end}
                              {'):'}
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
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {fetchData?.ev_sales !== '0.0'
                              ? fetchData?.ev_sales
                              : '-'}
                          </Text>
                        </View>
                      )}
                    </>
                    {/* View 13 */}
                    <>
                      {!(fetchData?.ev_eur !== '0.0') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            { flexDirection: 'row', gap: 8 },
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
                            >
                              {'EV/EBITDA ('}
                              {fetchData?.fy_end}
                              {'):'}
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
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {fetchData?.ev_ebitda !== '0.0'
                              ? fetchData?.ev_ebitda
                              : '-'}
                          </Text>
                        </View>
                      )}
                    </>
                    {/* View 14 */}
                    <>
                      {!(fetchData?.ev_eur !== '0.0') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            { flexDirection: 'row', gap: 8 },
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
                            >
                              {'EV/EBIT ('}
                              {fetchData?.fy_end}
                              {'):'}
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
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_500Medium',
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {fetchData?.ev_ebit !== '0.0'
                              ? fetchData?.ev_ebit
                              : '-'}
                          </Text>
                        </View>
                      )}
                    </>
                    {/* View 16 */}
                    <View
                      style={StyleSheet.applyWidth(
                        { flexDirection: 'row', gap: 8 },
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
                        >
                          {'Comment to financials:'}
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
                              color: palettes.Brand['Strong Inverse'],
                              fontFamily: 'Quicksand_500Medium',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {fetchData?.note_financials
                          ? fetchData?.note_financials
                          : '-'}
                      </Text>
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
    </ScreenContainer>
  );
};

export default withTheme(EventDetailsScreen);
