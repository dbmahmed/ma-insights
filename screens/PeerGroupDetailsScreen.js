import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import CustomHeaderBlock from '../components/CustomHeaderBlock';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  IconButton,
  Link,
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
      <CustomHeaderBlock />
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
                style={StyleSheet.applyWidth(
                  { padding: 10, paddingBottom: 5 },
                  dimensions.width
                )}
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
                    {NKP_Comp ? null : (
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
                  <>
                    {!(NKP_Comp === false) ? null : (
                      <Text
                        accessible={true}
                        style={StyleSheet.applyWidth(
                          { fontFamily: 'Quicksand_400Regular' },
                          dimensions.width
                        )}
                      >
                        {'Private (only visible to you)'}
                      </Text>
                    )}
                  </>
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
                  {/* Text 3 */}
                  <>
                    {!NKP_Comp ? null : (
                      <Text
                        accessible={true}
                        style={StyleSheet.applyWidth(
                          { fontFamily: 'Quicksand_400Regular' },
                          dimensions.width
                        )}
                      >
                        {fetchData?.description}
                        {'\n'}
                      </Text>
                    )}
                  </>
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
                {/* View 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    { width: '100%' },
                    dimensions.width
                  )}
                >
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
                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', gap: 5, width: '100%' },
                          dimensions.width
                        )}
                      >
                        {/* View 5 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: '40%' },
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
                                  fontFamily: 'Quicksand_700Bold',
                                  fontSize: 12,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {' Company'}
                          </Text>
                        </View>

                        <View
                          style={StyleSheet.applyWidth(
                            { width: '30%' },
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
                                  fontFamily: 'Quicksand_700Bold',
                                  fontSize: 12,
                                  textAlign: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: 'center',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: 'left',
                                    },
                                  ],
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {'Country'}
                          </Text>
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: '30%' },
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
                                  fontFamily: 'Quicksand_700Bold',
                                  fontSize: 12,
                                  paddingRight: {
                                    minWidth: Breakpoints.Tablet,
                                    value: 10,
                                  },
                                  textAlign: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: 'center',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: 'right',
                                    },
                                  ],
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {'EV'}
                          </Text>
                        </View>
                        {/* View 3 */}
                        <>
                          {NKP_Comp ? null : (
                            <View
                              style={StyleSheet.applyWidth(
                                { width: '0%' },
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
                                      fontFamily: 'Quicksand_400Regular',
                                      fontSize: 12,
                                      textAlign: 'center',
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {null}
                              </Text>
                            </View>
                          )}
                        </>
                      </View>
                    </View>
                    <SimpleStyleFlatList
                      data={fetchData?.stocks}
                      horizontal={false}
                      inverted={false}
                      keyExtractor={(listData, index) =>
                        listData?.id ?? listData?.uuid ?? index.toString()
                      }
                      keyboardShouldPersistTaps={'never'}
                      listKey={'G9LJvh3r'}
                      nestedScrollEnabled={false}
                      numColumns={1}
                      onEndReachedThreshold={0.5}
                      renderItem={({ item, index }) => {
                        const listData = item;
                        return (
                          <>
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
                                  width: '100%',
                                },
                                dimensions.width
                              )}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    flexDirection: 'row',
                                    gap: 5,
                                    width: '100%',
                                  },
                                  dimensions.width
                                )}
                              >
                                {/* View 5 */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    { width: '40%' },
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
                                          fontFamily: 'Quicksand_500Medium',
                                          fontSize: 12,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {listData?.company_name}
                                  </Text>
                                </View>

                                <View
                                  style={StyleSheet.applyWidth(
                                    { width: '30%' },
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
                                          fontFamily: 'Quicksand_400Regular',
                                          fontSize: 12,
                                          textAlign: [
                                            {
                                              minWidth: Breakpoints.Mobile,
                                              value: 'left',
                                            },
                                            {
                                              minWidth: Breakpoints.Tablet,
                                              value: 'left',
                                            },
                                          ],
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {listData?.country}
                                  </Text>
                                </View>
                                {/* View 2 */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    { width: '30%' },
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
                                          fontFamily: 'Quicksand_400Regular',
                                          fontSize: 12,
                                          paddingRight: {
                                            minWidth: Breakpoints.Tablet,
                                            value: 5,
                                          },
                                          textAlign: 'right',
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {'€'}
                                    {listData?.ev_eur}
                                    {'m'}
                                  </Text>
                                </View>
                                {/* View 3 */}
                                <>
                                  {NKP_Comp ? null : (
                                    <View
                                      style={StyleSheet.applyWidth(
                                        { width: '0%' },
                                        dimensions.width
                                      )}
                                    >
                                      <Link
                                        accessible={true}
                                        {...GlobalStyles.LinkStyles(theme)[
                                          'Link'
                                        ].props}
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.LinkStyles(theme)[
                                              'Link'
                                            ].style,
                                            {
                                              color:
                                                theme.colors.background.danger,
                                              textAlign: 'center',
                                              textDecorationLine: 'underline',
                                            }
                                          ),
                                          dimensions.width
                                        )}
                                        title={'x'}
                                      />
                                    </View>
                                  )}
                                </>
                              </View>
                            </View>
                          </>
                        );
                      }}
                      showsHorizontalScrollIndicator={true}
                      showsVerticalScrollIndicator={true}
                    />
                  </View>
                </View>
                {/* View 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    { width: '100%' },
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
                                  textAlign: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: 'center',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: 'right',
                                    },
                                  ],
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
                                  textAlign: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: 'center',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: 'right',
                                    },
                                  ],
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
                                  textAlign: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: 'center',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: 'right',
                                    },
                                  ],
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
                                  textAlign: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: 'center',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: 'right',
                                    },
                                  ],
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
                                  alignSelf: 'flex-end',
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
                                      textAlign: 'right',
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
                                  textAlign: 'right',
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
                                  textAlign: 'right',
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
                                  textAlign: 'right',
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
                                  textAlign: 'right',
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
                                  textAlign: 'right',
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
                                  textAlign: 'right',
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
                                  textAlign: 'right',
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
                                  textAlign: 'right',
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
                                  textAlign: 'right',
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
                                  textAlign: 'right',
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
                                  textAlign: 'right',
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
                                  textAlign: 'right',
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
                                  textAlign: 'right',
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
                                  textAlign: 'right',
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
                    { width: '100%' },
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
                    {'Median KPIs'}
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
                                  textAlign: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: 'center',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: 'right',
                                    },
                                  ],
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
                                  textAlign: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: 'center',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: 'right',
                                    },
                                  ],
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
                                  textAlign: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: 'center',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: 'right',
                                    },
                                  ],
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
                                  textAlign: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: 'center',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: 'right',
                                    },
                                  ],
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
                                  textAlign: 'right',
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
                                  textAlign: 'right',
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
                                  textAlign: 'right',
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
                                  textAlign: 'right',
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
                                  textAlign: 'right',
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
                                  textAlign: 'right',
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
                                  textAlign: 'right',
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
                                  textAlign: 'right',
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
                                  textAlign: 'right',
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
                                  textAlign: 'right',
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
                                  textAlign: 'right',
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
                                  textAlign: 'right',
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
                                  textAlign: 'right',
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
