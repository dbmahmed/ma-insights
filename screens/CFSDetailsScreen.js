import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import CustomHeaderBlock from '../components/CustomHeaderBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as DateUtils from '../utils/DateUtils';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  LinearGradient,
  ScreenContainer,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { H3, H5, H6 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const CFSDetailsScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [country, setCountry] = React.useState([]);
  const [eventItems, setEventItems] = React.useState([]);
  const [eventType, setEventType] = React.useState([]);
  const [filterPressed, setFilterPressed] = React.useState(false);
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
        cfs_id={props.route?.params?.cfs_id ?? 3}
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
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
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
                      {'Company for Sale detais'}
                    </H5>
                  )}
                </>
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
              {/* View 3 */}
              <View
                style={StyleSheet.applyWidth(
                  { alignContent: 'center', alignItems: 'center' },
                  dimensions.width
                )}
              >
                {/* H3 2 */}
                <H3
                  selectable={false}
                  {...GlobalStyles.H3Styles(theme)['H3'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.H3Styles(theme)['H3'].style,
                      {
                        alignSelf: {
                          minWidth: Breakpoints.Laptop,
                          value: 'flex-start',
                        },
                        fontFamily: 'Quicksand_700Bold',
                        fontSize: 20,
                        marginBottom: 10,
                        marginTop: 0,
                        paddingLeft: {
                          minWidth: Breakpoints.Laptop,
                          value: 10,
                        },
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'Other Updates:'}
                </H3>
                <SimpleStyleFlatList
                  data={fetchData?.other_events}
                  horizontal={false}
                  inverted={false}
                  keyExtractor={(listData, index) => listData?.id}
                  keyboardShouldPersistTaps={'never'}
                  listKey={'PZ8E2B8w'}
                  nestedScrollEnabled={false}
                  numColumns={1}
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
                        const valueJ8KIsgJR = parseInt(nextPage + 1, 10);
                        setNextPage(valueJ8KIsgJR);
                        const nextPageSet = valueJ8KIsgJR;
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
                          { flex: { minWidth: Breakpoints.Laptop, value: 1 } },
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
                                    fontSize: [
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: 12,
                                      },
                                      {
                                        minWidth: Breakpoints.Laptop,
                                        value: 14,
                                      },
                                    ],
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
                                    fontSize: [
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: 10,
                                      },
                                      {
                                        minWidth: Breakpoints.Laptop,
                                        value: 12,
                                      },
                                    ],
                                    marginTop: 4,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {DateUtils.format(listData?.published, 'd/m/Y')}
                              {' | Source: '}
                              {listData?.source}
                            </Text>
                          </View>
                        </Touchable>
                      </View>
                    );
                  }}
                  onEndReachedThreshold={0.2}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  style={StyleSheet.applyWidth(
                    {
                      gap: { minWidth: Breakpoints.Laptop, value: 5 },
                      maxHeight: dimensions.height - 250,
                      maxWidth: 1200,
                      paddingLeft: 10,
                      paddingRight: 10,
                      width: '100%',
                    },
                    dimensions.width
                  )}
                />
              </View>
            </SimpleStyleScrollView>
          );
        }}
      </XanoCollectionApi.FetchGetOneCFSGET>
    </ScreenContainer>
  );
};

export default withTheme(CFSDetailsScreen);
