import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import CustomHeaderBlock from '../components/CustomHeaderBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import assessAccess from '../global-functions/assessAccess';
import transformEuroM from '../global-functions/transformEuroM';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  LinearGradient,
  ScreenContainer,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  withTheme,
} from '@draftbit/ui';
import { H3, H5, H6 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const PEPFDetailsScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [country, setCountry] = React.useState([]);
  const [eventItems, setEventItems] = React.useState([]);
  const [eventType, setEventType] = React.useState([]);
  const [keywordSearch, setKeywordSearch] = React.useState('');
  const [lastPage, setLastPage] = React.useState(0);
  const [nextPage, setNextPage] = React.useState(0);
  const [sector, setSector] = React.useState([]);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      setGlobalVariableValue({
        key: 'pageName',
        value:
          dimensions.width >= Breakpoints.Tablet
            ? 'Private Equity Firm Details'
            : 'PE Firm Details',
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
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <CustomHeaderBlock />
      <XanoCollectionApi.FetchGetOnePEPFGET
        pepf_id={props.route?.params?.pepf_id ?? 3}
      >
        {({ loading, error, data, refetchGetOnePEPF }) => {
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
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={StyleSheet.applyWidth(
                {
                  alignItems: [
                    { minWidth: Breakpoints.Mobile, value: 'center' },
                    { minWidth: Breakpoints.Desktop, value: 'center' },
                  ],
                  height: '100%',
                  marginTop: 65,
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
                  {
                    alignItems: {
                      minWidth: Breakpoints.Desktop,
                      value: 'center',
                    },
                    paddingTop: [
                      { minWidth: Breakpoints.Desktop, value: 10 },
                      { minWidth: Breakpoints.Mobile, value: 5 },
                    ],
                    width: '100%',
                  },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      maxWidth: { minWidth: Breakpoints.Desktop, value: 1200 },
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
                        {'Private equity portfolio Firm'}
                      </H5>
                    )}
                  </>
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
                        alignItems: 'stretch',
                        borderColor: null,
                        borderRadius: null,
                        borderWidth: null,
                        gap: 8,
                        margin: null,
                        marginBottom: 20,
                        maxWidth: 1200,
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
                    {fetchData?.Company}
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
                      {fetchData?._gics_sub_industry?.GICS_Sector}
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
                      {transformEuroM(fetchData?.revenue_eur)}
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
                      {transformEuroM(fetchData?.ebitda_eur)}
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
                      {' Years'}
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
                      {fetchData?._investor?.name}
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
                        {'Fund Entity:'}
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
                      >
                        {fetchData?._fund?.name ? fetchData?._fund?.name : '-'}
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
                              color: palettes.Brand['Strong Inverse'],
                              fontFamily: 'Quicksand_500Medium',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {undefined ? undefined : '-'}
                        {' ('}
                        {null}
                        {')'}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>

              <View
                style={StyleSheet.applyWidth(
                  { maxWidth: 1200, padding: 10 },
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
                        marginTop: 0,
                      }
                    ),
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
                    StyleSheet.compose(
                      GlobalStyles.H3Styles(theme)['H3'].style,
                      {
                        fontFamily: 'Quicksand_700Bold',
                        fontSize: 20,
                        marginTop: 0,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'Related events'}
                </H3>
                <SimpleStyleFlatList
                  data={fetchData?.events}
                  horizontal={false}
                  inverted={false}
                  keyExtractor={(listData, index) =>
                    listData?.id ??
                    listData?.uuid ??
                    index?.toString() ??
                    JSON.stringify(listData)
                  }
                  keyboardShouldPersistTaps={'never'}
                  listKey={'PDqyS97A'}
                  nestedScrollEnabled={false}
                  numColumns={1}
                  onEndReached={() => {
                    console.log('List ON_END_REACHED Start');
                    let error = null;
                    try {
                      console.log('Start ON_END_REACHED:0 CONDITIONAL_STOP');
                      if (nextPage === lastPage) {
                        return console.log(
                          'Complete ON_END_REACHED:0 CONDITIONAL_STOP'
                        );
                      } else {
                        console.log(
                          'Skipped ON_END_REACHED:0 CONDITIONAL_STOP: condition not met'
                        );
                      }
                      console.log('Start ON_END_REACHED:1 FETCH_REQUEST');
                      /* hidden 'API Request' action */ console.log(
                        'Complete ON_END_REACHED:1 FETCH_REQUEST'
                      );
                      console.log('Start ON_END_REACHED:2 SET_VARIABLE');
                      /* hidden 'Set Variable' action */ console.log(
                        'Complete ON_END_REACHED:2 SET_VARIABLE'
                      );
                      console.log('Start ON_END_REACHED:3 CONSOLE_LOG');
                      /* hidden 'Log to Console' action */ console.log(
                        'Complete ON_END_REACHED:3 CONSOLE_LOG'
                      );
                      console.log('Start ON_END_REACHED:4 SET_VARIABLE');
                      /* hidden 'Set Variable' action */ console.log(
                        'Complete ON_END_REACHED:4 SET_VARIABLE'
                      );
                      console.log('Start ON_END_REACHED:5 SET_VARIABLE');
                      /* hidden 'Set Variable' action */ console.log(
                        'Complete ON_END_REACHED:5 SET_VARIABLE'
                      );
                    } catch (err) {
                      console.error(err);
                      error = err.message ?? err;
                    }
                    console.log(
                      'List ON_END_REACHED Complete',
                      error ? { error } : 'no error'
                    );
                  }}
                  renderItem={({ item, index }) => {
                    const listData = item;
                    return (
                      <>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              flex: { minWidth: Breakpoints.Laptop, value: 1 },
                              padding: {
                                minWidth: Breakpoints.Laptop,
                                value: 5,
                              },
                            },
                            dimensions.width
                          )}
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
                              {...GlobalStyles.H6Styles(theme)['H6'].props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.H6Styles(theme)['H6'].style,
                                  {
                                    fontFamily: 'Quicksand_700Bold',
                                    fontSize: 14,
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
                                    fontSize: 12,
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
                          </View>
                        </View>
                      </>
                    );
                  }}
                  onEndReachedThreshold={0.8}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </SimpleStyleScrollView>
          );
        }}
      </XanoCollectionApi.FetchGetOnePEPFGET>
    </ScreenContainer>
  );
};

export default withTheme(PEPFDetailsScreen);
