import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import CustomHeaderBlock from '../components/CustomHeaderBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { LinearGradient, ScreenContainer, withTheme } from '@draftbit/ui';
import { H3 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const PEPFDetailsScreen = props => {
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
        value: 'Private Equity Portfolio Firm Details',
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
      <XanoCollectionApi.FetchGetOnePEPFGET pepf_id={1}>
        {({ loading, error, data, refetchGetOnePEPF }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <View
              style={StyleSheet.applyWidth({ padding: 10 }, dimensions.width)}
            >
              <LinearGradient
                endX={100}
                endY={100}
                startX={0}
                startY={0}
                {...GlobalStyles.LinearGradientStyles(theme)['Linear Gradient']
                  .props}
                color1={theme.colors.text.strong}
                color2={theme.colors.branding.primary}
                color3={null}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.LinearGradientStyles(theme)['Linear Gradient']
                      .style,
                    {
                      borderColor: null,
                      borderRadius: 8,
                      borderWidth: null,
                      gap: 8,
                      margin: null,
                      marginBottom: 20,
                      maxWidth: 400,
                      padding: 10,
                      width: '100%',
                    }
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
                        color: palettes.Brand['Strong Inverse'],
                        fontSize: 16,
                        marginBottom: 8,
                        marginTop: 0,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'Company'}
                </H3>

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
                      {'Sector:'}
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
                    {fetchData?.gics}
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
                    {fetchData?.revenue_eur}
                    {' ('}
                    {fetchData?.financial_year}
                    {')'}
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
                    {fetchData?.revenue_eur}
                    {' ('}
                    {fetchData?.financial_year}
                    {')'}
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
                      {'Acquired:'}
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
                    {fetchData?.acquired_date}
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
                      {'Curr. Hold:'}
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
                    {fetchData?.current_holding_years}
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
                      {'PE firm:'}
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
                    {fetchData?.pe_firm}
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
                      {'Fund Entity:'}
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
                    {fetchData?.fund_entity}
                    {' ('}
                    {fetchData?.fund_entity}
                    {')'}
                  </Text>
                </View>
              </LinearGradient>

              <H3
                selectable={false}
                {...GlobalStyles.H3Styles(theme)['H3'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.H3Styles(theme)['H3'].style, {
                    fontFamily: 'Quicksand_700Bold',
                    fontSize: 20,
                    marginTop: 0,
                  }),
                  dimensions.width
                )}
              >
                {'Company description'}
              </H3>

              <Text
                accessible={true}
                {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['screen_title'].style,
                    { fontFamily: 'Quicksand_400Regular', marginBottom: 20 }
                  ),
                  dimensions.width
                )}
              >
                {fetchData?.company_description}
              </Text>

              <H3
                selectable={false}
                {...GlobalStyles.H3Styles(theme)['H3'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.H3Styles(theme)['H3'].style, {
                    fontFamily: 'Quicksand_700Bold',
                    fontSize: 20,
                    marginTop: 0,
                  }),
                  dimensions.width
                )}
              >
                {'Related events'}
              </H3>
            </View>
          );
        }}
      </XanoCollectionApi.FetchGetOnePEPFGET>
    </ScreenContainer>
  );
};

export default withTheme(PEPFDetailsScreen);
