import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  IconButton,
  ScreenContainer,
  Shadow,
  SimpleStyleFlatList,
  withTheme,
} from '@draftbit/ui';
import { H3 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const PeerGroupDetailsScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const [NKP_Comp, setNKP_Comp] = React.useState(false);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={true}>
      <XanoCollectionApi.FetchGetOnePeerGET
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
        peer_group_id={40}
      >
        {({ loading, error, data, refetchGetOnePeer }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <>
              <View
                style={StyleSheet.applyWidth({ padding: 10 }, dimensions.width)}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
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
                    {fetchData?.title}
                  </H3>
                  <>
                    {!(NKP_Comp === false) ? null : (
                      <IconButton
                        color={theme.colors.text.strong}
                        icon={'Entypo/edit'}
                        size={24}
                      />
                    )}
                  </>
                </View>
                {/* View 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    { marginBottom: 10 },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    style={StyleSheet.applyWidth(
                      { fontFamily: 'Quicksand_400Regular' },
                      dimensions.width
                    )}
                  >
                    {'Private (only visible to you)\n'}
                  </Text>
                  {/* Text 2 */}
                  <Text
                    accessible={true}
                    style={StyleSheet.applyWidth(
                      { fontFamily: 'Quicksand_400Regular' },
                      dimensions.width
                    )}
                  >
                    {'Created on '}
                    {fetchData?.created_at}
                    {'\n'}
                  </Text>
                </View>

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
                  {'Constituents'}
                </H3>
                <SimpleStyleFlatList
                  data={fetchData?.stocks}
                  inverted={false}
                  keyExtractor={(listData, index) =>
                    listData?.id ?? listData?.uuid ?? index.toString()
                  }
                  keyboardShouldPersistTaps={'never'}
                  listKey={'maeDGMNb'}
                  nestedScrollEnabled={false}
                  numColumns={1}
                  onEndReachedThreshold={0.5}
                  renderItem={({ item, index }) => {
                    const listData = item;
                    return (
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
                        style={StyleSheet.applyWidth(
                          {
                            borderRadius: 12,
                            width: [
                              { minWidth: Breakpoints.Laptop, value: '100%' },
                              { minWidth: Breakpoints.Mobile, value: '100%' },
                            ],
                          },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              backgroundColor: palettes.Brand['Strong Inverse'],
                              borderColor: palettes.Brand['Light Inverse'],
                              borderRadius: 4,
                              borderWidth: 1,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              padding: 10,
                            },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              { gap: 4 },
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              style={StyleSheet.applyWidth(
                                {
                                  fontFamily: 'Quicksand_600SemiBold',
                                  fontSize: 14,
                                  marginBottom: 5,
                                },
                                dimensions.width
                              )}
                            >
                              {listData?.company_name}
                            </Text>

                            <Text
                              accessible={true}
                              style={StyleSheet.applyWidth(
                                {
                                  color: theme.colors.text.medium,
                                  fontFamily: 'Quicksand_400Regular',
                                  fontSize: 12,
                                },
                                dimensions.width
                              )}
                            >
                              {listData?.country}
                            </Text>

                            <Text
                              accessible={true}
                              style={StyleSheet.applyWidth(
                                {
                                  color: theme.colors.text.medium,
                                  fontFamily: 'Quicksand_400Regular',
                                  fontSize: 12,
                                },
                                dimensions.width
                              )}
                            >
                              {'EV: '}
                              {listData?.ev_eur}
                            </Text>
                          </View>
                          {/* View 4 */}
                          <View>
                            <>
                              {!(NKP_Comp === false) ? null : (
                                <IconButton
                                  size={32}
                                  color={palettes.App.Orange}
                                  icon={'AntDesign/close'}
                                />
                              )}
                            </>
                          </View>
                        </View>
                      </Shadow>
                    );
                  }}
                  horizontal={false}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  style={StyleSheet.applyWidth(
                    {
                      alignSelf: {
                        minWidth: Breakpoints.Laptop,
                        value: 'stretch',
                      },
                      gap: 8,
                      marginBottom: 20,
                      padding: 2,
                    },
                    dimensions.width
                  )}
                />
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
                  },
                  dimensions.width
                )}
              >
                {/* View 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    { maxWidth: 400, width: '100%' },
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
                        padding: 10,
                        paddingBottom: 0,
                      },
                      dimensions.width
                    )}
                  >
                    {'Median multiples'}
                  </H3>
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
                          borderBottomWidth: 1,
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
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
                          dimensions.width
                        )}
                      >
                        {' '}
                      </Text>

                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', gap: 5 },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {'FY0'}
                          </Text>
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {'TTM\n'}
                          </Text>
                        </View>
                        {/* View 3 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {'FY1E'}
                          </Text>
                        </View>
                        {/* View 4 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {'FY2E'}
                          </Text>
                        </View>
                      </View>
                    </View>
                    {/* View 2 */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          borderBottomWidth: 1,
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
                            { fontFamily: 'Quicksand_500Medium', fontSize: 12 }
                          ),
                          dimensions.width
                        )}
                      >
                        {' EV/Sales'}
                      </Text>

                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', gap: 5 },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {'x'}
                          </Text>
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                                {fetchData?.ev_sales_ttm}
                                {'x'}
                              </Text>
                            )}
                          </>
                        </View>
                        {/* View 3 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {'x'}
                          </Text>
                        </View>
                        {/* View 4 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {'x'}
                          </Text>
                        </View>
                      </View>
                    </View>
                    {/* View 3 */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          borderBottomWidth: 1,
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
                            { fontFamily: 'Quicksand_500Medium', fontSize: 12 }
                          ),
                          dimensions.width
                        )}
                      >
                        {' EV/EBITDA'}
                      </Text>

                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', gap: 5 },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {'x'}
                          </Text>
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {'x'}
                          </Text>
                        </View>
                        {/* View 3 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {'x'}
                          </Text>
                        </View>
                        {/* View 4 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {'x'}
                          </Text>
                        </View>
                      </View>
                    </View>
                    {/* View 4 */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          borderBottomWidth: 1,
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
                            { fontFamily: 'Quicksand_500Medium', fontSize: 12 }
                          ),
                          dimensions.width
                        )}
                      >
                        {' EV/EBIT'}
                      </Text>

                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', gap: 5 },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {fetchData?.ev_ebit_fy0_median}
                            {'x'}
                          </Text>
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {fetchData?.ev_ebit_ttm_median}
                            {'x'}
                          </Text>
                        </View>
                        {/* View 3 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {fetchData?.ev_ebit_fy1_median}
                            {'x'}
                          </Text>
                        </View>
                        {/* View 4 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {fetchData?.ebit_margin_fy2_median}
                            {'x'}
                          </Text>
                        </View>
                      </View>
                    </View>
                    {/* View 5 */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          borderBottomWidth: 1,
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
                            { fontFamily: 'Quicksand_500Medium', fontSize: 12 }
                          ),
                          dimensions.width
                        )}
                      >
                        {' P/E'}
                      </Text>

                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', gap: 5 },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {fetchData?.pe_fy0_median}
                            {'x'}
                          </Text>
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {fetchData?.pe_ttm_median}
                            {'x'}
                          </Text>
                        </View>
                        {/* View 3 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {fetchData?.pe_fy1_median}
                            {'x'}
                          </Text>
                        </View>
                        {/* View 4 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {fetchData?.pe_fy2_median}
                            {'x'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                {/* View 2 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    { maxWidth: 400, width: '100%' },
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
                        padding: 10,
                        paddingBottom: 0,
                      },
                      dimensions.width
                    )}
                  >
                    {'Median multiples'}
                  </H3>
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
                          borderBottomWidth: 1,
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
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
                          dimensions.width
                        )}
                      >
                        {' '}
                      </Text>

                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', gap: 5 },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {'FY0'}
                          </Text>
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {'TTM\n'}
                          </Text>
                        </View>
                        {/* View 3 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {'FY1E'}
                          </Text>
                        </View>
                        {/* View 4 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {'FY2E'}
                          </Text>
                        </View>
                      </View>
                    </View>
                    {/* View 2 */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          borderBottomWidth: 1,
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
                            { fontFamily: 'Quicksand_500Medium', fontSize: 12 }
                          ),
                          dimensions.width
                        )}
                      >
                        {'Growth YoY'}
                      </Text>

                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', gap: 5 },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {fetchData?.growth_fy0_median}
                            {'%'}
                          </Text>
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {fetchData?.growth_ttm_median}
                            {'%'}
                          </Text>
                        </View>
                        {/* View 3 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {fetchData?.growth_fy1_median}
                            {'%'}
                          </Text>
                        </View>
                        {/* View 4 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {fetchData?.growth_fy2_median}
                            {'%'}
                          </Text>
                        </View>
                      </View>
                    </View>
                    {/* View 3 */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          borderBottomWidth: 1,
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
                            { fontFamily: 'Quicksand_500Medium', fontSize: 12 }
                          ),
                          dimensions.width
                        )}
                      >
                        {'3 year CAGR'}
                      </Text>

                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', gap: 5 },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {'-'}
                          </Text>
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {'-'}
                          </Text>
                        </View>
                        {/* View 3 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {'-'}
                          </Text>
                        </View>
                        {/* View 4 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {fetchData?.cagr_fy2_3y_median}
                            {'%'}
                          </Text>
                        </View>
                      </View>
                    </View>
                    {/* View 4 */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          borderBottomWidth: 1,
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
                            { fontFamily: 'Quicksand_500Medium', fontSize: 12 }
                          ),
                          dimensions.width
                        )}
                      >
                        {'EBITDA%'}
                      </Text>

                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', gap: 5 },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {fetchData?.ebitda_margin_fy0_median}
                            {'%'}
                          </Text>
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {fetchData?.ebitda_margin_ttm_median}
                            {'%'}
                          </Text>
                        </View>
                        {/* View 3 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {fetchData?.ebitda_margin_fy1_median}
                            {'%'}
                          </Text>
                        </View>
                        {/* View 4 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {fetchData?.ebitda_margin_fy2_median}
                            {'%'}
                          </Text>
                        </View>
                      </View>
                    </View>
                    {/* View 5 */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          borderBottomWidth: 1,
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
                            { fontFamily: 'Quicksand_500Medium', fontSize: 12 }
                          ),
                          dimensions.width
                        )}
                      >
                        {'Net profit%'}
                      </Text>

                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', gap: 5 },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {fetchData?.np_margin_fy0_median}
                            {'%'}
                          </Text>
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {fetchData?.np_margin_ttm_median}
                            {'%'}
                          </Text>
                        </View>
                        {/* View 3 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {fetchData?.np_margin_fy1_median}
                            {'%'}
                          </Text>
                        </View>
                        {/* View 4 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 50 },
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
                            {fetchData?.np_margin_fy2_median}
                            {'%'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </>
          );
        }}
      </XanoCollectionApi.FetchGetOnePeerGET>
    </ScreenContainer>
  );
};

export default withTheme(PeerGroupDetailsScreen);
