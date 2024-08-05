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
  Button,
  ScreenContainer,
  SimpleStyleScrollView,
  withTheme,
} from '@draftbit/ui';
import { H3 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const StockDetailsScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [NKP_Comp, setNKP_Comp] = React.useState(false);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      setGlobalVariableValue({
        key: 'pageName',
        value: 'Stock Details',
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
    <ScreenContainer
      hasSafeArea={false}
      hasLeftSafeArea={true}
      scrollable={false}
    >
      <CustomHeaderBlock />
      <XanoCollectionApi.FetchGetOneStockGET
        handlers={{
          onData: fetchData => {
            try {
              if (fetchData?.access_type === 'NKP comps') {
                setNKP_Comp(true);
              } else {
              }
            } catch (err) {
              console.error(err);
            }
          },
        }}
        stock_id={2}
      >
        {({ loading, error, data, refetchGetOneStock }) => {
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
                  alignItems: [
                    { minWidth: Breakpoints.BigScreen, value: 'center' },
                    { minWidth: Breakpoints.Desktop, value: 'center' },
                  ],
                  height: '100%',
                  marginTop: 65,
                  paddingBottom: 65,
                  position: 'absolute',
                  width: '100%',
                },
                dimensions.width
              )}
            >
              {/* View 4 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    maxWidth: [
                      { minWidth: Breakpoints.BigScreen, value: 1200 },
                      { minWidth: Breakpoints.Mobile, value: 1200 },
                    ],
                    width: '100%',
                  },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    { padding: 10, paddingBottom: 5 },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'flex-start',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                      },
                      dimensions.width
                    )}
                  >
                    <H3
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          fontFamily: 'Quicksand_700Bold',
                          marginBottom: 0,
                          marginTop: 0,
                        },
                        dimensions.width
                      )}
                    >
                      {fetchData?.company_name}
                      {' ('}
                      {fetchData?.ticker}
                      {')'}
                    </H3>

                    <Text
                      accessible={true}
                      {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                      style={StyleSheet.applyWidth(
                        GlobalStyles.TextStyles(theme)['screen_title'].style,
                        dimensions.width
                      )}
                    >
                      {'Last updated: '}
                      {fetchData?.last_updated}
                    </Text>
                  </View>
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      { paddingBottom: 10, paddingTop: 10 },
                      dimensions.width
                    )}
                  >
                    <Button
                      iconPosition={'left'}
                      {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                      icon={'AntDesign/plus'}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ButtonStyles(theme)['Button'].style,
                          {
                            backgroundColor: palettes.App.Orange,
                            fontFamily: 'Quicksand_500Medium',
                            textTransform: 'uppercase',
                            width: 200,
                          }
                        ),
                        dimensions.width
                      )}
                      title={'add to peer group'}
                    />
                  </View>
                </View>
                {/* View 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    { marginBottom: 20 },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        alignSelf: 'auto',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingLeft: 10,
                        paddingRight: 10,
                      },
                      dimensions.width
                    )}
                  >
                    <H3
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          fontFamily: 'Quicksand_700Bold',
                          fontSize: 12,
                          marginBottom: 0,
                          marginTop: 0,
                        },
                        dimensions.width
                      )}
                    >
                      {'Company profile:'}
                    </H3>
                  </View>
                  {/* table */}
                  <View
                    style={StyleSheet.applyWidth(
                      { backgroundColor: theme.colors.text.light, padding: 10 },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 5,
                          justifyContent: 'flex-start',
                          padding: 5,
                        },
                        dimensions.width
                      )}
                    >
                      {/* View 2 */}
                      <View
                        style={StyleSheet.applyWidth(
                          { width: 120 },
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
                                fontFamily: 'Quicksand_500Medium',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Enterprise value:\n'}
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
                              fontFamily: 'Quicksand_400Regular',
                              fontSize: 12,
                              textAlign: 'center',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {fetchData?.ev_eur}
                      </Text>
                    </View>
                    {/* View 2 */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 5,
                          justifyContent: 'flex-start',
                          padding: 5,
                        },
                        dimensions.width
                      )}
                    >
                      {/* View 2 */}
                      <View
                        style={StyleSheet.applyWidth(
                          { width: 120 },
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
                                fontFamily: 'Quicksand_500Medium',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Enterprise value:\n'}
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
                              fontFamily: 'Quicksand_400Regular',
                              fontSize: 12,
                              textAlign: 'center',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {fetchData?.capitalisation_eur}
                      </Text>
                    </View>
                    {/* View 3 */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 5,
                          justifyContent: 'flex-start',
                          padding: 5,
                        },
                        dimensions.width
                      )}
                    >
                      {/* View 2 */}
                      <View
                        style={StyleSheet.applyWidth(
                          { width: 120 },
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
                                fontFamily: 'Quicksand_500Medium',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Country (HQ):\n'}
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
                              fontFamily: 'Quicksand_400Regular',
                              fontSize: 12,
                              textAlign: 'center',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {fetchData?.country}
                      </Text>
                    </View>
                    {/* View 4 */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 5,
                          justifyContent: 'flex-start',
                          padding: 5,
                        },
                        dimensions.width
                      )}
                    >
                      {/* View 2 */}
                      <View
                        style={StyleSheet.applyWidth(
                          { width: 120 },
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
                                fontFamily: 'Quicksand_500Medium',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'GICS Secrot:\n'}
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
                              fontFamily: 'Quicksand_400Regular',
                              fontSize: 12,
                              textAlign: 'center',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {fetchData?._gics_sub_industry?.GICS_Sector}
                      </Text>
                    </View>
                    {/* View 5 */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 5,
                          justifyContent: 'flex-start',
                          padding: 5,
                        },
                        dimensions.width
                      )}
                    >
                      {/* View 2 */}
                      <View
                        style={StyleSheet.applyWidth(
                          { width: 120 },
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
                                fontFamily: 'Quicksand_500Medium',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'GICS Industry Group:\n'}
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
                              fontFamily: 'Quicksand_400Regular',
                              fontSize: 12,
                              textAlign: 'center',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {fetchData?._gics_sub_industry?.GICS_Industry_Group}
                      </Text>
                    </View>
                    {/* View 6 */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 5,
                          justifyContent: 'flex-start',
                          padding: 5,
                        },
                        dimensions.width
                      )}
                    >
                      {/* View 2 */}
                      <View
                        style={StyleSheet.applyWidth(
                          { width: 120 },
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
                                fontFamily: 'Quicksand_500Medium',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'GISC Industry:\n'}
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
                              fontFamily: 'Quicksand_400Regular',
                              fontSize: 12,
                              textAlign: 'center',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {fetchData?._gics_sub_industry?.GICS_Industry}
                      </Text>
                    </View>
                    {/* View 7 */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 5,
                          justifyContent: 'flex-start',
                          padding: 5,
                        },
                        dimensions.width
                      )}
                    >
                      {/* View 2 */}
                      <View
                        style={StyleSheet.applyWidth(
                          { width: 120 },
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
                                fontFamily: 'Quicksand_500Medium',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'GISC Sub industry:\n'}
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
                              fontFamily: 'Quicksand_400Regular',
                              fontSize: 12,
                              textAlign: 'center',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {fetchData?._gics_sub_industry?.GICS_Sub_Industry}
                      </Text>
                    </View>
                    {/* View 2 */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          paddingTop: {
                            minWidth: Breakpoints.BigScreen,
                            value: 10,
                          },
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
                            { fontFamily: 'Quicksand_400Regular', fontSize: 12 }
                          ),
                          dimensions.width
                        )}
                      >
                        {fetchData?.description}
                      </Text>
                    </View>
                  </View>
                </View>
                {/* View 3 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'flex-start',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      gap: [
                        { minWidth: Breakpoints.Desktop, value: 10 },
                        { minWidth: Breakpoints.Tablet, value: 10 },
                      ],
                      marginBottom: 20,
                      width: '100%',
                    },
                    dimensions.width
                  )}
                >
                  {/* P&L and estimates */}
                  <View
                    style={StyleSheet.applyWidth(
                      { marginBottom: 20, width: '100%' },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          alignSelf: 'auto',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingLeft: 10,
                          paddingRight: 10,
                        },
                        dimensions.width
                      )}
                    >
                      <H3
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            fontFamily: 'Quicksand_700Bold',
                            fontSize: 12,
                            marginBottom: 0,
                            marginTop: 0,
                          },
                          dimensions.width
                        )}
                      >
                        {'P&L and estimates:'}
                      </H3>

                      <Text
                        accessible={true}
                        {...GlobalStyles.TextStyles(theme)['screen_title']
                          .props}
                        style={StyleSheet.applyWidth(
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
                          dimensions.width
                        )}
                      >
                        {fetchData?.reporting_currency}
                        {' in millions'}
                      </Text>
                    </View>
                    {/* table */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: theme.colors.text.light,
                          padding: 10,
                        },
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            flexDirection: 'row',
                            gap: 5,
                            justifyContent: 'space-between',
                            padding: 5,
                          },
                          dimensions.width
                        )}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            GlobalStyles.TextStyles(theme)['screen_title']
                              .style,
                            dimensions.width
                          )}
                        >
                          {' '}
                        </Text>

                        <View
                          style={StyleSheet.applyWidth(
                            { flexDirection: 'row', gap: 0, width: '80%' },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '20%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.fy0_end_date}
                            </Text>
                          </View>
                          {/* View 2 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '20%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.tt_end_date}
                              {'\n'}
                            </Text>
                          </View>
                          {/* View 3 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '20%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.fy1_end_date}
                            </Text>
                          </View>
                          {/* View 4 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '20%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.fy2_end_date}
                            </Text>
                          </View>
                          {/* View 4 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '20%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.fy3_end_date}
                            </Text>
                          </View>
                        </View>
                      </View>
                      {/* View 2 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            flexDirection: 'row',
                            gap: 5,
                            justifyContent: 'space-between',
                            padding: 5,
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
                                fontFamily: 'Quicksand_500Medium',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Revenue\nGrowth\n'}
                        </Text>

                        <View
                          style={StyleSheet.applyWidth(
                            {
                              flexDirection: 'row',
                              gap: 0,
                              padding: 0,
                              width: '80%',
                            },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '20%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.revenue_fy0}
                              {'\n'}
                              {fetchData?.growth_fy0}
                            </Text>
                          </View>
                          {/* View 2 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '20%' },
                              dimensions.width
                            )}
                          >
                            <>
                              {!fetchData?.ev_sales_ttm ? null : (
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
                                        fontFamily: 'Quicksand_400Regular',
                                        fontSize: 12,
                                        textAlign: 'center',
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {fetchData?.revenue_ttm}
                                  {'\n'}
                                  {fetchData?.growth_ttm}
                                </Text>
                              )}
                            </>
                          </View>
                          {/* View 3 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '20%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.revenue_fy1}
                              {'\n'}
                              {fetchData?.growth_fy1}
                            </Text>
                          </View>
                          {/* View 4 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '20%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.revenue_fy2}
                              {'\n'}
                              {fetchData?.growth_fy2}
                            </Text>
                          </View>
                          {/* View 5 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '20%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.revenue_fy3}
                              {'\n'}
                              {fetchData?.growth_fy3}
                            </Text>
                          </View>
                        </View>
                      </View>
                      {/* View 3 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            borderColor: palettes.App.green,
                            flexDirection: 'row',
                            gap: 5,
                            justifyContent: 'space-between',
                            padding: 5,
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
                                fontFamily: 'Quicksand_500Medium',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'EBITDA\nMargin'}
                        </Text>

                        <View
                          style={StyleSheet.applyWidth(
                            { flexDirection: 'row', gap: 0, width: '80%' },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '20%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.ebitda_fy0}
                              {'\n'}
                              {fetchData?.ebitda_margin_fy0}
                            </Text>
                          </View>
                          {/* View 2 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '20%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.ebitda_ttm}
                              {'\n'}
                              {fetchData?.ebitda_margin_ttm}
                            </Text>
                          </View>
                          {/* View 3 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '20%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.ebitda_fy1}
                              {'\n'}
                              {fetchData?.ebitda_margin_fy1}
                            </Text>
                          </View>
                          {/* View 4 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '20%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.ebitda_fy2}
                              {'\n'}
                              {fetchData?.ebitda_margin_fy2}
                            </Text>
                          </View>
                          {/* View 5 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '20%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.ebitda_fy3}
                              {'\n'}
                              {fetchData?.ebitda_margin_fy3}
                            </Text>
                          </View>
                        </View>
                      </View>
                      {/* View 4 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            borderColor: palettes.App.green,
                            flexDirection: 'row',
                            gap: 5,
                            justifyContent: 'space-between',
                            padding: 5,
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
                                fontFamily: 'Quicksand_500Medium',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'EBIT\nMargin'}
                        </Text>

                        <View
                          style={StyleSheet.applyWidth(
                            { flexDirection: 'row', gap: 0, width: '80%' },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '20%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.ebit_fy0}
                              {'\n'}
                              {fetchData?.ebit_margin_fy0}
                            </Text>
                          </View>
                          {/* View 2 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '20%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.ebit_ttm}
                              {'\n'}
                              {fetchData?.ebit_margin_ttm}
                            </Text>
                          </View>
                          {/* View 3 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '20%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.ebit_fy1}
                              {'\n'}
                              {fetchData?.ebit_margin_fy1}
                            </Text>
                          </View>
                          {/* View 4 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '20%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.ebit_fy2}
                              {'\n'}
                              {fetchData?.ebit_margin_fy2}
                            </Text>
                          </View>
                          {/* View 5 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '20%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.ebit_fy3}
                              {'\n'}
                              {fetchData?.ebit_margin_fy3}
                            </Text>
                          </View>
                        </View>
                      </View>
                      {/* View 5 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            borderColor: palettes.App.green,
                            flexDirection: 'row',
                            gap: 5,
                            justifyContent: 'space-between',
                            padding: 5,
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
                                fontFamily: 'Quicksand_500Medium',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Net Profit\nMargin'}
                        </Text>

                        <View
                          style={StyleSheet.applyWidth(
                            { flexDirection: 'row', gap: 0, width: '80%' },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '20%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.np_fy0}
                              {'\n'}
                              {fetchData?.np_margin_fy0}
                            </Text>
                          </View>
                          {/* View 2 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '20%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.np_ttm}
                              {'\n'}
                              {fetchData?.np_margin_ttm}
                            </Text>
                          </View>
                          {/* View 3 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '20%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.np_fy1}
                              {'\n'}
                              {fetchData?.np_margin_fy1}
                            </Text>
                          </View>
                          {/* View 4 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '20%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.np_fy2}
                              {'\n'}
                              {fetchData?.np_margin_fy2}
                            </Text>
                          </View>
                          {/* View 5 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '20%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.np_fy3}
                              {'\n'}
                              {fetchData?.np_margin_fy3}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                  {/* Valuation metrics */}
                  <View
                    style={StyleSheet.applyWidth(
                      { width: '100%' },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          alignSelf: 'auto',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingLeft: 10,
                          paddingRight: 10,
                        },
                        dimensions.width
                      )}
                    >
                      <H3
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            fontFamily: 'Quicksand_700Bold',
                            fontSize: 12,
                            marginBottom: 0,
                            marginTop: 0,
                          },
                          dimensions.width
                        )}
                      >
                        {'Valuation metrics:'}
                      </H3>
                    </View>
                    {/* table */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: theme.colors.text.light,
                          padding: 10,
                        },
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            borderColor: palettes.App.green,
                            flexDirection: 'row',
                            gap: 5,
                            justifyContent: 'space-between',
                            padding: 5,
                          },
                          dimensions.width
                        )}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            GlobalStyles.TextStyles(theme)['screen_title']
                              .style,
                            dimensions.width
                          )}
                        >
                          {' '}
                        </Text>

                        <View
                          style={StyleSheet.applyWidth(
                            { flexDirection: 'row', gap: 0, width: '80%' },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '25%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.fy0_end_date}
                            </Text>
                          </View>
                          {/* View 2 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '25%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.tt_end_date}
                              {'\n'}
                            </Text>
                          </View>
                          {/* View 3 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '25%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.fy1_end_date}
                            </Text>
                          </View>
                          {/* View 4 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '25%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.fy2_end_date}
                            </Text>
                          </View>
                        </View>
                      </View>
                      {/* View 2 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            borderColor: palettes.App.green,
                            flexDirection: 'row',
                            gap: 5,
                            justifyContent: 'space-between',
                            padding: 5,
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
                                fontFamily: 'Quicksand_500Medium',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {' EV/Sales'}
                        </Text>

                        <View
                          style={StyleSheet.applyWidth(
                            { flexDirection: 'row', gap: 0, width: '80%' },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '25%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.ev_sales_fy0}
                            </Text>
                          </View>
                          {/* View 2 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '25%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.ev_sales_ttm}
                            </Text>
                          </View>
                          {/* View 3 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '25%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.ev_sales_fy1}
                            </Text>
                          </View>
                          {/* View 4 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '25%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.ev_sales_fy2}
                            </Text>
                          </View>
                        </View>
                      </View>
                      {/* View 3 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            borderColor: palettes.App.green,
                            flexDirection: 'row',
                            gap: 5,
                            justifyContent: 'space-between',
                            padding: 5,
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
                                fontFamily: 'Quicksand_500Medium',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {' EV/EBITDA'}
                        </Text>

                        <View
                          style={StyleSheet.applyWidth(
                            { flexDirection: 'row', gap: 0, width: '80%' },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '25%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.ev_ebitda_fy0}
                            </Text>
                          </View>
                          {/* View 2 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '25%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.ev_ebitda_ttm}
                            </Text>
                          </View>
                          {/* View 3 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '25%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.ev_ebitda_fy1}
                            </Text>
                          </View>
                          {/* View 4 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '25%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.ev_ebitda_fy2}
                            </Text>
                          </View>
                        </View>
                      </View>
                      {/* View 4 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            borderColor: palettes.App.green,
                            flexDirection: 'row',
                            gap: 5,
                            justifyContent: 'space-between',
                            padding: 5,
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
                                fontFamily: 'Quicksand_500Medium',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {' EV/EBIT'}
                        </Text>

                        <View
                          style={StyleSheet.applyWidth(
                            { flexDirection: 'row', gap: 0, width: '80%' },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '25%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.ev_ebit_fy0}
                            </Text>
                          </View>
                          {/* View 2 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '25%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.ev_ebit_ttm}
                            </Text>
                          </View>
                          {/* View 3 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '25%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.ev_ebit_fy1}
                            </Text>
                          </View>
                          {/* View 4 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '25%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.ev_ebit_fy2}
                            </Text>
                          </View>
                        </View>
                      </View>
                      {/* View 5 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            borderColor: palettes.App.green,
                            flexDirection: 'row',
                            gap: 5,
                            justifyContent: 'space-between',
                            padding: 5,
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
                                fontFamily: 'Quicksand_500Medium',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {' P/E'}
                        </Text>

                        <View
                          style={StyleSheet.applyWidth(
                            { flexDirection: 'row', gap: 0, width: '80%' },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '25%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.pe_fy0}
                            </Text>
                          </View>
                          {/* View 2 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '25%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.pe_ttm}
                            </Text>
                          </View>
                          {/* View 3 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '25%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.pe_fy1}
                            </Text>
                          </View>
                          {/* View 4 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2, width: '25%' },
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
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.pe_fy2}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </SimpleStyleScrollView>
          );
        }}
      </XanoCollectionApi.FetchGetOneStockGET>
    </ScreenContainer>
  );
};

export default withTheme(StockDetailsScreen);
