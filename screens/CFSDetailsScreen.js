import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import CustomHeaderBlock from '../components/CustomHeaderBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  LinearGradient,
  ScreenContainer,
  SimpleStyleScrollView,
  withTheme,
} from '@draftbit/ui';
import { H3 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const CFSDetailsScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      setGlobalVariableValue({
        key: 'pageName',
        value: 'Company For Sale Details',
      });
      setGlobalVariableValue({
        key: 'subPage',
        value: true,
      });
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <CustomHeaderBlock />
      <XanoCollectionApi.FetchGetOneCFSGET
        cfs_id={props.route?.params?.cfs_id ?? 892}
      >
        {({ loading, error, data, refetchGetOneCFS }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
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
              showsHorizontalScrollIndicator={true}
              showsVerticalScrollIndicator={true}
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  height: '100%',
                  marginTop: [
                    { minWidth: Breakpoints.Mobile, value: 65 },
                    { minWidth: Breakpoints.Desktop, value: 85 },
                  ],
                  paddingBottom: 65,
                  paddingTop: 5,
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
                      { flexDirection: 'row', gap: 8 },
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
                      {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
                          {
                            color: palettes.Brand['Strong Inverse'],
                            fontFamily: 'Quicksand_500Medium',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {fetchData?.company}
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
                        { width: 100 },
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
                        {'Advisor:'}
                      </Text>
                    </View>

                    <Text
                      accessible={true}
                      {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
                          {
                            color: palettes.Brand['Strong Inverse'],
                            fontFamily: 'Quicksand_500Medium',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {fetchData?._advisors}
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
                        { width: 100 },
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
                        {'Stage:'}
                      </Text>
                    </View>

                    <Text
                      accessible={true}
                      {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
                          {
                            color: palettes.Brand['Strong Inverse'],
                            fontFamily: 'Quicksand_500Medium',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {fetchData?.stage}
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
                        { width: 100 },
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
                      {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
                          {
                            color: palettes.Brand['Strong Inverse'],
                            fontFamily: 'Quicksand_500Medium',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {fetchData?.revenue_eur !== '0.0'
                        ? '€ ' + (fetchData?.revenue_eur + 'm')
                        : '-'}
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
                        { width: 100 },
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
                      {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
                          {
                            color: palettes.Brand['Strong Inverse'],
                            fontFamily: 'Quicksand_500Medium',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {fetchData?.ebitda_eur !== '0.0'
                        ? '€ ' + (fetchData?.ebitda_eur + 'm')
                        : '-'}
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
                        { width: 100 },
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
                        {'Fiscal year:'}
                      </Text>
                    </View>

                    <Text
                      accessible={true}
                      {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
                          {
                            color: palettes.Brand['Strong Inverse'],
                            fontFamily: 'Quicksand_500Medium',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {fetchData?.fy_end}
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
                        { width: 100 },
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
                        {'GICS:'}
                      </Text>
                    </View>

                    <Text
                      accessible={true}
                      {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
                          {
                            color: palettes.Brand['Strong Inverse'],
                            fontFamily: 'Quicksand_500Medium',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {fetchData?._gics?.GICS_Industry}
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
                        { width: 100 },
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
                        {'Country:'}
                      </Text>
                    </View>

                    <Text
                      accessible={true}
                      {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
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
                </LinearGradient>
              </View>

              <View
                style={StyleSheet.applyWidth(
                  { maxWidth: 1200, padding: 10, width: '100%' },
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
                        marginTop: 0,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {fetchData?._event?.headline}
                </H3>
                <>
                  {!(fetchData?.event !== 0) ? null : (
                    <Text
                      accessible={true}
                      {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
                          {
                            color: palettes.App.Orange,
                            fontFamily: 'Quicksand_500Medium',
                            fontSize: 13,
                            marginBottom: 20,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {fetchData?._event?.published}
                      {' ('}
                      {fetchData?._event?.source}
                      {')'}
                    </Text>
                  )}
                </>
                <View>
                  {/* Text 2 */}
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['screen_title'].style,
                      dimensions.width
                    )}
                  >
                    {fetchData?._event?.description}
                  </Text>
                </View>
              </View>
            </SimpleStyleScrollView>
          );
        }}
      </XanoCollectionApi.FetchGetOneCFSGET>
    </ScreenContainer>
  );
};

export default withTheme(CFSDetailsScreen);
