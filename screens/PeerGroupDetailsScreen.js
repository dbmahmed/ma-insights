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
  IconButton,
  Link,
  ScreenContainer,
  Shadow,
  SimpleStyleFlashList,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  withTheme,
} from '@draftbit/ui';
import { H3 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const PeerGroupDetailsScreen = props => {
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
        value: 'Peer Group Details',
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
                  { maxWidth: 1200, width: '100%' },
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
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: [
                          { minWidth: Breakpoints.Mobile, value: 10 },
                          { minWidth: Breakpoints.Tablet, value: 5 },
                        ],
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
                        {
                          color: {
                            minWidth: Breakpoints.Tablet,
                            value: theme.colors.foreground.brand,
                          },
                          fontFamily: 'Quicksand_400Regular',
                          marginBottom: {
                            minWidth: Breakpoints.Tablet,
                            value: 2.5,
                          },
                        },
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
                  <SimpleStyleFlashList
                    data={fetchData?.stocks}
                    estimatedItemSize={50}
                    horizontal={false}
                    inverted={false}
                    keyExtractor={(flashListData, index) => flashListData?.id}
                    listKey={'SAVTQbbR'}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item, index }) => {
                      const flashListData = item;
                      return (
                        <View
                          style={StyleSheet.applyWidth(
                            { padding: 5, width: '100%' },
                            dimensions.width
                          )}
                        >
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
                                bottom: 5,
                                height: '100%',
                                left: 5,
                                position: 'absolute',
                                right: 5,
                                top: 5,
                                width: [
                                  {
                                    minWidth: Breakpoints.Laptop,
                                    value: '100%',
                                  },
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: '100%',
                                  },
                                ],
                              },
                              dimensions.width
                            )}
                          />
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                backgroundColor:
                                  palettes.Brand['Strong Inverse'],
                                borderColor: palettes.Brand['Light Inverse'],
                                borderRadius: 4,
                                borderWidth: 1,
                                flexDirection: 'row',
                                height: '100%',
                                justifyContent: 'space-between',
                                padding: 10,
                                width: '100%',
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
                                {flashListData?.company_name}
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
                                {flashListData?.country}
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
                                {flashListData?.ev_eur}
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
                        </View>
                      );
                    }}
                    numColumns={
                      dimensions.width >= Breakpoints.Laptop
                        ? 3
                        : dimensions.width >= Breakpoints.Tablet
                        ? 2
                        : 1
                    }
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={StyleSheet.applyWidth(
                      { margin: { minWidth: Breakpoints.Tablet, value: -10 } },
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
                        {
                          backgroundColor: theme.colors.text.light,
                          padding: 10,
                          paddingLeft: {
                            minWidth: Breakpoints.Tablet,
                            value: 15,
                          },
                          paddingRight: {
                            minWidth: Breakpoints.Tablet,
                            value: 15,
                          },
                        },
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            borderBottomWidth: 1,
                            borderColor: theme.colors.branding.primary,
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
                              {
                                width: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: '40%',
                                  },
                                  {
                                    minWidth: Breakpoints.Tablet,
                                    value: '40%',
                                  },
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
                              {
                                width: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: '30%',
                                  },
                                  {
                                    minWidth: Breakpoints.Tablet,
                                    value: '20%',
                                  },
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
                                    fontFamily: 'Quicksand_700Bold',
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
                              {'Country'}
                            </Text>
                          </View>
                          {/* View 2 */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                width: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: '30%',
                                  },
                                  {
                                    minWidth: Breakpoints.Tablet,
                                    value: '15%',
                                  },
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
                                    fontFamily: 'Quicksand_700Bold',
                                    fontSize: 12,
                                    paddingRight: 5,
                                    textAlign: [
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: 'right',
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
                            {!(
                              dimensions.width >= Breakpoints.Tablet
                            ) ? null : (
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    width: [
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: '0%',
                                      },
                                      {
                                        minWidth: Breakpoints.Tablet,
                                        value: '10%',
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
                                        fontFamily: [
                                          {
                                            minWidth: Breakpoints.Mobile,
                                            value: 'Quicksand_400Regular',
                                          },
                                          {
                                            minWidth: Breakpoints.Tablet,
                                            value: 'Quicksand_700Bold',
                                          },
                                        ],
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
                            )}
                          </>
                          {/* View 4 */}
                          <>
                            {!(
                              dimensions.width >= Breakpoints.Tablet
                            ) ? null : (
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    width: [
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: 50,
                                      },
                                      {
                                        minWidth: Breakpoints.Tablet,
                                        value: '15%',
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
                                        fontFamily: [
                                          {
                                            minWidth: Breakpoints.Mobile,
                                            value: 'Quicksand_400Regular',
                                          },
                                          {
                                            minWidth: Breakpoints.Tablet,
                                            value: 'Quicksand_700Bold',
                                          },
                                        ],
                                        fontSize: 12,
                                        paddingRight: {
                                          minWidth: Breakpoints.Tablet,
                                          value: 15,
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
                                  {'52w price change'}
                                </Text>
                              </View>
                            )}
                          </>
                          {/* View 6 */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                width: [
                                  { minWidth: Breakpoints.Mobile, value: 50 },
                                  { minWidth: Breakpoints.Tablet, value: 0 },
                                ],
                              },
                              dimensions.width
                            )}
                          >
                            <>
                              {NKP_Comp ? null : (
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
                              )}
                            </>
                          </View>
                        </View>
                      </View>
                      <SimpleStyleFlatList
                        data={fetchData?.stocks}
                        horizontal={false}
                        inverted={false}
                        keyExtractor={(listData, index) =>
                          listData?.id ??
                          listData?.uuid ??
                          index?.toString() ??
                          JSON.stringify(listData)
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
                                    borderColor: theme.colors.branding.primary,
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
                                      {
                                        width: [
                                          {
                                            minWidth: Breakpoints.Mobile,
                                            value: '30%',
                                          },
                                          {
                                            minWidth: Breakpoints.Tablet,
                                            value: '20%',
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
                                      {
                                        width: [
                                          {
                                            minWidth: Breakpoints.Mobile,
                                            value: '30%',
                                          },
                                          {
                                            minWidth: Breakpoints.Tablet,
                                            value: '15%',
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
                                            fontFamily: 'Quicksand_400Regular',
                                            fontSize: 12,
                                            paddingRight: 5,
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
                                  {/* View 6 */}
                                  <>
                                    {!(
                                      dimensions.width >= Breakpoints.Tablet
                                    ) ? null : (
                                      <View
                                        style={StyleSheet.applyWidth(
                                          {
                                            width: [
                                              {
                                                minWidth: Breakpoints.Mobile,
                                                value: '30%',
                                              },
                                              {
                                                minWidth: Breakpoints.Tablet,
                                                value: '10%',
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
                                                fontFamily:
                                                  'Quicksand_400Regular',
                                                fontSize: 12,
                                                textAlign: 'right',
                                              }
                                            ),
                                            dimensions.width
                                          )}
                                        >
                                          {listData?.fy0_end_date}
                                        </Text>
                                      </View>
                                    )}
                                  </>
                                  {/* View 7 */}
                                  <>
                                    {!(
                                      dimensions.width >= Breakpoints.Tablet
                                    ) ? null : (
                                      <View
                                        style={StyleSheet.applyWidth(
                                          {
                                            width: [
                                              {
                                                minWidth: Breakpoints.Mobile,
                                                value: '30%',
                                              },
                                              {
                                                minWidth: Breakpoints.Tablet,
                                                value: '15%',
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
                                                fontFamily:
                                                  'Quicksand_400Regular',
                                                fontSize: 12,
                                                paddingRight: {
                                                  minWidth: Breakpoints.Tablet,
                                                  value: 15,
                                                },
                                                textAlign: 'right',
                                              }
                                            ),
                                            dimensions.width
                                          )}
                                        >
                                          {listData?.change_52_weeks}
                                          {'%'}
                                        </Text>
                                      </View>
                                    )}
                                  </>
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
                                                  theme.colors.background
                                                    .danger,
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
                        {
                          backgroundColor: theme.colors.text.light,
                          padding: 10,
                          paddingLeft: {
                            minWidth: Breakpoints.Tablet,
                            value: 15,
                          },
                          paddingRight: {
                            minWidth: Breakpoints.Tablet,
                            value: 15,
                          },
                        },
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            borderBottomWidth: 1,
                            borderColor: theme.colors.branding.primary,
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
                            { flexDirection: 'row', gap: 0, width: '70%' },
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
                                    textAlign: [
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: 'right',
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
                                    textAlign: [
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: 'right',
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
                                    textAlign: [
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: 'right',
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
                                    textAlign: [
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: 'right',
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
                            borderColor: theme.colors.branding.primary,
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
                            { flexDirection: 'row', gap: 0, width: '70%' },
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
                              { padding: 2, width: '25%' },
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
                            borderColor: theme.colors.branding.primary,
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
                            { flexDirection: 'row', gap: 0, width: '70%' },
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
                            borderColor: theme.colors.branding.primary,
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
                            { flexDirection: 'row', gap: 0, width: '70%' },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              { width: '25%' },
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
                              { width: '25%' },
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
                              { width: '25%' },
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
                                    textAlign: 'right',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {'-'}
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
                            borderColor: theme.colors.branding.primary,
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
                            { flexDirection: 'row', gap: 0, width: '70%' },
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
                        {
                          backgroundColor: theme.colors.text.light,
                          padding: 10,
                          paddingLeft: {
                            minWidth: Breakpoints.Tablet,
                            value: 15,
                          },
                          paddingRight: {
                            minWidth: Breakpoints.Tablet,
                            value: 15,
                          },
                        },
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            borderBottomWidth: 1,
                            borderColor: theme.colors.branding.primary,
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
                            { flexDirection: 'row', gap: 0, width: '70%' },
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
                                    textAlign: [
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: 'right',
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
                                    textAlign: [
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: 'right',
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
                                    textAlign: [
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: 'right',
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
                                    textAlign: [
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: 'right',
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
                            borderColor: theme.colors.branding.primary,
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
                          {'Growth YoY'}
                        </Text>

                        <View
                          style={StyleSheet.applyWidth(
                            { flexDirection: 'row', gap: 0, width: '70%' },
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
                            borderColor: theme.colors.branding.primary,
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
                          {'3 year CAGR'}
                        </Text>

                        <View
                          style={StyleSheet.applyWidth(
                            { flexDirection: 'row', gap: 0, width: '70%' },
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
                                    textAlign: 'right',
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
                                    textAlign: 'right',
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
                                    textAlign: 'right',
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
                            borderColor: theme.colors.branding.primary,
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
                          {'EBITDA%'}
                        </Text>

                        <View
                          style={StyleSheet.applyWidth(
                            { flexDirection: 'row', gap: 0, width: '70%' },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              { borderRadius: 2, width: '25%' },
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
                            borderColor: theme.colors.branding.primary,
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
                          {'Net profit%'}
                        </Text>

                        <View
                          style={StyleSheet.applyWidth(
                            { flexDirection: 'row', gap: 0, width: '70%' },
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
              </View>
            </SimpleStyleScrollView>
          );
        }}
      </XanoCollectionApi.FetchGetOnePeerGET>
    </ScreenContainer>
  );
};

export default withTheme(PeerGroupDetailsScreen);
