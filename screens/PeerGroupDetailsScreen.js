import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import CustomHeaderBlock from '../components/CustomHeaderBlock';
import LoadingBlock from '../components/LoadingBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import assessAccess from '../global-functions/assessAccess';
import removeGlobalScroll from '../global-functions/removeGlobalScroll';
import transformEuroM from '../global-functions/transformEuroM';
import transformNumber from '../global-functions/transformNumber';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  IconButton,
  LinearGradient,
  Link,
  ScreenContainer,
  Shadow,
  SimpleStyleFlashList,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  Table,
  TableCell,
  TableRow,
  withTheme,
} from '@draftbit/ui';
import { H3 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const PeerGroupDetailsScreen = props => {
  const { theme, navigation } = props;
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
      removeGlobalScroll();
      setGlobalVariableValue({
        key: 'pageName',
        value: 'Peer Group Details',
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
        peer_group_id={props.route?.params?.peer_group_id ?? 788}
      >
        {({ loading, error, data, refetchGetOnePeer }) => {
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
                  marginBottom: dimensions.width >= Breakpoints.Laptop ? 0 : 65,
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
                  {/* Constituents */}
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
                        { borderRadius: 0, margin: null }
                      ),
                      dimensions.width
                    )}
                  >
                    <Table
                      borderColor={theme.colors.border.brand}
                      borderStyle={'solid'}
                      borderWidth={1}
                      cellHorizontalPadding={10}
                      cellVerticalPadding={10}
                      data={fetchData?.stocks}
                      drawBottomBorder={false}
                      drawEndBorder={false}
                      drawStartBorder={false}
                      keyExtractor={(tableData, index) =>
                        tableData?.id ??
                        tableData?.uuid ??
                        index?.toString() ??
                        JSON.stringify(tableData)
                      }
                      listKey={'rSEWKm50'}
                      renderItem={({ item, index }) => {
                        const tableData = item;
                        return (
                          <>
                            <TableRow
                              drawBottomBorder={true}
                              drawEndBorder={false}
                              drawTopBorder={false}
                              drawStartBorder={false}
                              isTableHeader={true}
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor: [
                                    {
                                      minWidth: Breakpoints.Desktop,
                                      value: 'rgba(0, 0, 0, 0)',
                                    },
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: 'rgba(0, 0, 0, 0)',
                                    },
                                  ],
                                },
                                dimensions.width
                              )}
                            >
                              <TableCell
                                drawBottomBorder={false}
                                drawStartBorder={false}
                                drawTopBorder={false}
                                {...GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].props}
                                drawEndBorder={false}
                                style={StyleSheet.applyWidth(
                                  GlobalStyles.TableCellStyles(theme)[
                                    'Table Cell'
                                  ].style,
                                  dimensions.width
                                )}
                              >
                                <Text
                                  accessible={true}
                                  {...GlobalStyles.TextStyles(theme)[
                                    'screen_title_stockH'
                                  ].props}
                                  style={StyleSheet.applyWidth(
                                    GlobalStyles.TextStyles(theme)[
                                      'screen_title_stockH'
                                    ].style,
                                    dimensions.width
                                  )}
                                >
                                  {'Company'}
                                </Text>
                              </TableCell>
                              {/* Table Cell 2 */}
                              <TableCell
                                drawBottomBorder={false}
                                drawStartBorder={false}
                                drawTopBorder={false}
                                {...GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].props}
                                drawEndBorder={false}
                                style={StyleSheet.applyWidth(
                                  GlobalStyles.TableCellStyles(theme)[
                                    'Table Cell'
                                  ].style,
                                  dimensions.width
                                )}
                              >
                                <Text
                                  accessible={true}
                                  {...GlobalStyles.TextStyles(theme)[
                                    'screen_title_stockH'
                                  ].props}
                                  style={StyleSheet.applyWidth(
                                    GlobalStyles.TextStyles(theme)[
                                      'screen_title_stockH'
                                    ].style,
                                    dimensions.width
                                  )}
                                >
                                  {'Country'}
                                </Text>
                              </TableCell>
                              {/* Table Cell 3 */}
                              <TableCell
                                drawBottomBorder={false}
                                drawStartBorder={false}
                                drawTopBorder={false}
                                {...GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].props}
                                drawEndBorder={false}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TableCellStyles(theme)[
                                      'Table Cell'
                                    ].style,
                                    {
                                      justifyContent: [
                                        {
                                          minWidth: Breakpoints.Tablet,
                                          value: 'flex-end',
                                        },
                                        {
                                          minWidth: Breakpoints.Mobile,
                                          value: 'flex-end',
                                        },
                                      ],
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                <Text
                                  accessible={true}
                                  {...GlobalStyles.TextStyles(theme)[
                                    'screen_title_stockH'
                                  ].props}
                                  style={StyleSheet.applyWidth(
                                    GlobalStyles.TextStyles(theme)[
                                      'screen_title_stockH'
                                    ].style,
                                    dimensions.width
                                  )}
                                >
                                  {'EV'}
                                </Text>
                              </TableCell>
                              {/* Table Cell 4 */}
                              <>
                                {!(
                                  dimensions.width >= Breakpoints.Tablet
                                ) ? null : (
                                  <TableCell
                                    drawBottomBorder={false}
                                    drawStartBorder={false}
                                    drawTopBorder={false}
                                    {...GlobalStyles.TableCellStyles(theme)[
                                      'Table Cell'
                                    ].props}
                                    drawEndBorder={false}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.TableCellStyles(theme)[
                                          'Table Cell'
                                        ].style,
                                        {
                                          justifyContent: {
                                            minWidth: Breakpoints.Tablet,
                                            value: 'flex-end',
                                          },
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    <Text
                                      accessible={true}
                                      {...GlobalStyles.TextStyles(theme)[
                                        'screen_title_stockH'
                                      ].props}
                                      style={StyleSheet.applyWidth(
                                        GlobalStyles.TextStyles(theme)[
                                          'screen_title_stockH'
                                        ].style,
                                        dimensions.width
                                      )}
                                    >
                                      {'FY0'}
                                    </Text>
                                  </TableCell>
                                )}
                              </>
                              {/* Table Cell 5 */}
                              <>
                                {!(
                                  dimensions.width >= Breakpoints.Tablet
                                ) ? null : (
                                  <TableCell
                                    drawBottomBorder={false}
                                    drawStartBorder={false}
                                    drawTopBorder={false}
                                    {...GlobalStyles.TableCellStyles(theme)[
                                      'Table Cell'
                                    ].props}
                                    drawEndBorder={false}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.TableCellStyles(theme)[
                                          'Table Cell'
                                        ].style,
                                        {
                                          justifyContent: {
                                            minWidth: Breakpoints.Tablet,
                                            value: 'flex-end',
                                          },
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    <Text
                                      accessible={true}
                                      {...GlobalStyles.TextStyles(theme)[
                                        'screen_title_stockH'
                                      ].props}
                                      style={StyleSheet.applyWidth(
                                        GlobalStyles.TextStyles(theme)[
                                          'screen_title_stockH'
                                        ].style,
                                        dimensions.width
                                      )}
                                    >
                                      {'52w price change'}
                                    </Text>
                                  </TableCell>
                                )}
                              </>
                            </TableRow>

                            <TableRow
                              drawTopBorder={false}
                              isTableHeader={false}
                              drawBottomBorder={true}
                              drawEndBorder={false}
                              drawStartBorder={false}
                            >
                              <TableCell
                                drawBottomBorder={false}
                                drawStartBorder={false}
                                drawTopBorder={false}
                                {...GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].props}
                                drawEndBorder={false}
                                style={StyleSheet.applyWidth(
                                  GlobalStyles.TableCellStyles(theme)[
                                    'Table Cell'
                                  ].style,
                                  dimensions.width
                                )}
                              >
                                <Text
                                  accessible={true}
                                  {...GlobalStyles.TextStyles(theme)[
                                    'screen_title_stock'
                                  ].props}
                                  ellipsizeMode={'clip'}
                                  numberOfLines={1}
                                  style={StyleSheet.applyWidth(
                                    GlobalStyles.TextStyles(theme)[
                                      'screen_title_stock'
                                    ].style,
                                    dimensions.width
                                  )}
                                >
                                  {tableData?.company_name}
                                </Text>
                              </TableCell>
                              {/* Table Cell 2 */}
                              <TableCell
                                drawBottomBorder={false}
                                drawStartBorder={false}
                                drawTopBorder={false}
                                {...GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].props}
                                drawEndBorder={false}
                                style={StyleSheet.applyWidth(
                                  GlobalStyles.TableCellStyles(theme)[
                                    'Table Cell'
                                  ].style,
                                  dimensions.width
                                )}
                              >
                                <Text
                                  accessible={true}
                                  {...GlobalStyles.TextStyles(theme)[
                                    'screen_title_stock'
                                  ].props}
                                  style={StyleSheet.applyWidth(
                                    GlobalStyles.TextStyles(theme)[
                                      'screen_title_stock'
                                    ].style,
                                    dimensions.width
                                  )}
                                >
                                  {tableData?.country}
                                </Text>
                              </TableCell>
                              {/* Table Cell 3 */}
                              <TableCell
                                drawBottomBorder={false}
                                drawStartBorder={false}
                                drawTopBorder={false}
                                {...GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].props}
                                drawEndBorder={false}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TableCellStyles(theme)[
                                      'Table Cell'
                                    ].style,
                                    {
                                      justifyContent: [
                                        {
                                          minWidth: Breakpoints.Tablet,
                                          value: 'flex-end',
                                        },
                                        {
                                          minWidth: Breakpoints.Mobile,
                                          value: 'flex-end',
                                        },
                                      ],
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                <Text
                                  accessible={true}
                                  {...GlobalStyles.TextStyles(theme)[
                                    'screen_title_stock'
                                  ].props}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.TextStyles(theme)[
                                        'screen_title_stock'
                                      ].style,
                                      {
                                        alignSelf: {
                                          minWidth: Breakpoints.Tablet,
                                          value: 'stretch',
                                        },
                                        textAlign: {
                                          minWidth: Breakpoints.Tablet,
                                          value: 'right',
                                        },
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {transformEuroM(tableData?.ev_eur)}
                                </Text>
                              </TableCell>
                              {/* Table Cell 4 */}
                              <>
                                {!(
                                  dimensions.width >= Breakpoints.Tablet
                                ) ? null : (
                                  <TableCell
                                    drawBottomBorder={false}
                                    drawStartBorder={false}
                                    drawTopBorder={false}
                                    {...GlobalStyles.TableCellStyles(theme)[
                                      'Table Cell'
                                    ].props}
                                    drawEndBorder={false}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.TableCellStyles(theme)[
                                          'Table Cell'
                                        ].style,
                                        {
                                          justifyContent: {
                                            minWidth: Breakpoints.Tablet,
                                            value: 'flex-end',
                                          },
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    <Text
                                      accessible={true}
                                      {...GlobalStyles.TextStyles(theme)[
                                        'screen_title_stock'
                                      ].props}
                                      style={StyleSheet.applyWidth(
                                        GlobalStyles.TextStyles(theme)[
                                          'screen_title_stock'
                                        ].style,
                                        dimensions.width
                                      )}
                                    >
                                      {tableData?.fy0_end_date}
                                    </Text>
                                  </TableCell>
                                )}
                              </>
                              {/* Table Cell 5 */}
                              <>
                                {!(
                                  dimensions.width >= Breakpoints.Tablet
                                ) ? null : (
                                  <TableCell
                                    drawBottomBorder={false}
                                    drawStartBorder={false}
                                    drawTopBorder={false}
                                    {...GlobalStyles.TableCellStyles(theme)[
                                      'Table Cell'
                                    ].props}
                                    drawEndBorder={false}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.TableCellStyles(theme)[
                                          'Table Cell'
                                        ].style,
                                        {
                                          justifyContent: {
                                            minWidth: Breakpoints.Tablet,
                                            value: 'flex-end',
                                          },
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    <Text
                                      accessible={true}
                                      {...GlobalStyles.TextStyles(theme)[
                                        'screen_title_stock'
                                      ].props}
                                      style={StyleSheet.applyWidth(
                                        GlobalStyles.TextStyles(theme)[
                                          'screen_title_stock'
                                        ].style,
                                        dimensions.width
                                      )}
                                    >
                                      {transformNumber(
                                        tableData?.change_52_weeks,
                                        '%',
                                        undefined
                                      )}
                                    </Text>
                                  </TableCell>
                                )}
                              </>
                            </TableRow>
                          </>
                        );
                      }}
                      {...GlobalStyles.TableStyles(theme)['Table'].props}
                      drawTopBorder={false}
                      showsVerticalScrollIndicator={false}
                      style={StyleSheet.applyWidth(
                        GlobalStyles.TableStyles(theme)['Table'].style,
                        dimensions.width
                      )}
                    />
                  </LinearGradient>
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
                    {/* Median Multiples */}
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
                            borderRadius: 0,
                            borderWidth: 0,
                            margin: [
                              { minWidth: Breakpoints.Tablet, value: 0 },
                              { minWidth: Breakpoints.Mobile, value: 0 },
                            ],
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      <Table
                        borderColor={theme.colors.border.brand}
                        borderStyle={'solid'}
                        borderWidth={1}
                        cellHorizontalPadding={10}
                        cellVerticalPadding={10}
                        drawBottomBorder={false}
                        drawEndBorder={false}
                        drawStartBorder={false}
                        showsVerticalScrollIndicator={true}
                        {...GlobalStyles.TableStyles(theme)['Table'].props}
                        drawTopBorder={false}
                        style={StyleSheet.applyWidth(
                          GlobalStyles.TableStyles(theme)['Table'].style,
                          dimensions.width
                        )}
                      >
                        <TableRow
                          drawBottomBorder={true}
                          drawEndBorder={false}
                          drawTopBorder={false}
                          drawStartBorder={false}
                          isTableHeader={true}
                          style={StyleSheet.applyWidth(
                            { backgroundColor: 'rgba(0, 0, 0, 0)' },
                            dimensions.width
                          )}
                        >
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              GlobalStyles.TableCellStyles(theme)['Table Cell']
                                .style,
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stockH'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stockH'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {' '}
                            </Text>
                          </TableCell>
                          {/* Table Cell 2 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stockH'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stockH'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {'FY0'}
                            </Text>
                          </TableCell>
                          {/* Table Cell 3 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stockH'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stockH'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {'TTM'}
                            </Text>
                          </TableCell>
                          {/* Table Cell 4 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stockH'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stockH'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {'FY1E'}
                            </Text>
                          </TableCell>
                          {/* Table Cell 5 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stockH'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stockH'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {'FY2E'}
                            </Text>
                          </TableCell>
                        </TableRow>
                        {/* ev_sales */}
                        <TableRow
                          drawBottomBorder={true}
                          drawEndBorder={false}
                          drawTopBorder={false}
                          isTableHeader={false}
                          drawStartBorder={false}
                        >
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              GlobalStyles.TableCellStyles(theme)['Table Cell']
                                .style,
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {'EV/Sales'}
                            </Text>
                          </TableCell>
                          {/* Table Cell 2 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.ev_sales_fy0,
                                'x',
                                true
                              )}
                            </Text>
                          </TableCell>
                          {/* Table Cell 3 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.ev_sales_ttm,
                                'x',
                                true
                              )}
                            </Text>
                          </TableCell>
                          {/* Table Cell 4 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.ev_sales_fy1,
                                'x',
                                true
                              )}
                            </Text>
                          </TableCell>
                          {/* Table Cell 5 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.ev_sales_fy2,
                                'x',
                                true
                              )}
                            </Text>
                          </TableCell>
                        </TableRow>
                        {/* ev_ebitda */}
                        <TableRow
                          drawBottomBorder={true}
                          drawEndBorder={false}
                          drawTopBorder={false}
                          isTableHeader={false}
                          drawStartBorder={false}
                        >
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              GlobalStyles.TableCellStyles(theme)['Table Cell']
                                .style,
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {'EV/EBITDA'}
                            </Text>
                          </TableCell>
                          {/* Table Cell 2 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.ev_ebitda_fy0,
                                'x',
                                true
                              )}
                            </Text>
                          </TableCell>
                          {/* Table Cell 3 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.ev_ebitda_ttm,
                                'x',
                                true
                              )}
                            </Text>
                          </TableCell>
                          {/* Table Cell 4 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.ev_ebitda_fy1,
                                'x',
                                true
                              )}
                            </Text>
                          </TableCell>
                          {/* Table Cell 5 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.ev_ebitda_fy2,
                                'x',
                                true
                              )}
                            </Text>
                          </TableCell>
                        </TableRow>
                        {/* ev_ebit */}
                        <TableRow
                          drawBottomBorder={true}
                          drawEndBorder={false}
                          drawTopBorder={false}
                          isTableHeader={false}
                          drawStartBorder={false}
                        >
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              GlobalStyles.TableCellStyles(theme)['Table Cell']
                                .style,
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {'EV/EBIT'}
                            </Text>
                          </TableCell>
                          {/* Table Cell 2 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.ev_ebit_fy0_median,
                                'x',
                                true
                              )}
                            </Text>
                          </TableCell>
                          {/* Table Cell 3 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.ev_ebit_ttm_median,
                                'x',
                                true
                              )}
                            </Text>
                          </TableCell>
                          {/* Table Cell 4 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.ev_ebit_fy1_median,
                                'x',
                                true
                              )}
                            </Text>
                          </TableCell>
                          {/* Table Cell 5 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.ev_ebitda_fy2,
                                'x',
                                true
                              )}
                            </Text>
                          </TableCell>
                        </TableRow>
                        {/* p_e */}
                        <TableRow
                          drawBottomBorder={true}
                          drawEndBorder={false}
                          drawTopBorder={false}
                          isTableHeader={false}
                          drawStartBorder={false}
                        >
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              GlobalStyles.TableCellStyles(theme)['Table Cell']
                                .style,
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {'P/E'}
                            </Text>
                          </TableCell>
                          {/* Table Cell 2 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.pe_fy0_median,
                                'x',
                                true
                              )}
                            </Text>
                          </TableCell>
                          {/* Table Cell 3 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.pe_ttm_median,
                                'x',
                                true
                              )}
                            </Text>
                          </TableCell>
                          {/* Table Cell 4 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.pe_fy1_median,
                                'x',
                                true
                              )}
                            </Text>
                          </TableCell>
                          {/* Table Cell 5 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.pe_fy2_median,
                                'x',
                                true
                              )}
                            </Text>
                          </TableCell>
                        </TableRow>
                      </Table>
                    </LinearGradient>
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
                    {/* Median KPIs */}
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
                            borderRadius: 0,
                            borderWidth: 0,
                            margin: [
                              { minWidth: Breakpoints.Tablet, value: 0 },
                              { minWidth: Breakpoints.Mobile, value: 0 },
                            ],
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      <Table
                        borderColor={theme.colors.border.brand}
                        borderStyle={'solid'}
                        borderWidth={1}
                        cellHorizontalPadding={10}
                        cellVerticalPadding={10}
                        drawBottomBorder={false}
                        drawEndBorder={false}
                        drawStartBorder={false}
                        showsVerticalScrollIndicator={true}
                        {...GlobalStyles.TableStyles(theme)['Table'].props}
                        drawTopBorder={false}
                        style={StyleSheet.applyWidth(
                          GlobalStyles.TableStyles(theme)['Table'].style,
                          dimensions.width
                        )}
                      >
                        <TableRow
                          drawBottomBorder={true}
                          drawEndBorder={false}
                          drawTopBorder={false}
                          drawStartBorder={false}
                          isTableHeader={true}
                          style={StyleSheet.applyWidth(
                            { backgroundColor: 'rgba(0, 0, 0, 0)' },
                            dimensions.width
                          )}
                        >
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              GlobalStyles.TableCellStyles(theme)['Table Cell']
                                .style,
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stockH'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stockH'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {' '}
                            </Text>
                          </TableCell>
                          {/* Table Cell 2 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stockH'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stockH'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {'FY0'}
                            </Text>
                          </TableCell>
                          {/* Table Cell 3 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stockH'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stockH'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {'TTM'}
                            </Text>
                          </TableCell>
                          {/* Table Cell 4 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stockH'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stockH'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {'FY1E'}
                            </Text>
                          </TableCell>
                          {/* Table Cell 5 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stockH'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stockH'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {'FY2E'}
                            </Text>
                          </TableCell>
                        </TableRow>
                        {/* growth */}
                        <TableRow
                          drawBottomBorder={true}
                          drawEndBorder={false}
                          drawTopBorder={false}
                          isTableHeader={false}
                          drawStartBorder={false}
                        >
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              GlobalStyles.TableCellStyles(theme)['Table Cell']
                                .style,
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {'Growth YoY'}
                            </Text>
                          </TableCell>
                          {/* Table Cell 2 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.growth_fy0_median,
                                '%',
                                undefined
                              )}
                            </Text>
                          </TableCell>
                          {/* Table Cell 3 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.growth_ttm_median,
                                '%',
                                undefined
                              )}
                            </Text>
                          </TableCell>
                          {/* Table Cell 4 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.growth_fy1_median,
                                '%',
                                undefined
                              )}
                            </Text>
                          </TableCell>
                          {/* Table Cell 5 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.growth_fy2_median,
                                '%',
                                undefined
                              )}
                            </Text>
                          </TableCell>
                        </TableRow>
                        {/* ev_ebitda */}
                        <TableRow
                          drawBottomBorder={true}
                          drawEndBorder={false}
                          drawTopBorder={false}
                          isTableHeader={false}
                          drawStartBorder={false}
                        >
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              GlobalStyles.TableCellStyles(theme)['Table Cell']
                                .style,
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {'3 year CAGR'}
                            </Text>
                          </TableCell>
                          {/* Table Cell 2 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.ev_ebitda_fy0,
                                'x',
                                true
                              )}
                            </Text>
                          </TableCell>
                          {/* Table Cell 3 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.ev_ebitda_ttm,
                                'x',
                                true
                              )}
                            </Text>
                          </TableCell>
                          {/* Table Cell 4 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.ev_ebitda_fy1,
                                'x',
                                true
                              )}
                            </Text>
                          </TableCell>
                          {/* Table Cell 5 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.cagr_fy2_3y_median,
                                '%',
                                undefined
                              )}
                            </Text>
                          </TableCell>
                        </TableRow>
                        {/* ev_ebit */}
                        <TableRow
                          drawBottomBorder={true}
                          drawEndBorder={false}
                          drawTopBorder={false}
                          isTableHeader={false}
                          drawStartBorder={false}
                        >
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              GlobalStyles.TableCellStyles(theme)['Table Cell']
                                .style,
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {'EBITDA%'}
                            </Text>
                          </TableCell>
                          {/* Table Cell 2 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.ebitda_margin_fy0_median,
                                '%',
                                undefined
                              )}
                            </Text>
                          </TableCell>
                          {/* Table Cell 3 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.ebitda_margin_ttm_median,
                                '%',
                                undefined
                              )}
                            </Text>
                          </TableCell>
                          {/* Table Cell 4 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.ebitda_margin_fy1_median,
                                '%',
                                undefined
                              )}
                            </Text>
                          </TableCell>
                          {/* Table Cell 5 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.ebitda_margin_fy2_median,
                                '%',
                                undefined
                              )}
                            </Text>
                          </TableCell>
                        </TableRow>
                        {/* p_e */}
                        <TableRow
                          drawBottomBorder={true}
                          drawEndBorder={false}
                          drawTopBorder={false}
                          isTableHeader={false}
                          drawStartBorder={false}
                        >
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              GlobalStyles.TableCellStyles(theme)['Table Cell']
                                .style,
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {'Net profit%'}
                            </Text>
                          </TableCell>
                          {/* Table Cell 2 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.np_margin_fy0_median,
                                '%',
                                undefined
                              )}
                            </Text>
                          </TableCell>
                          {/* Table Cell 3 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.np_margin_ttm_median,
                                '%',
                                undefined
                              )}
                            </Text>
                          </TableCell>
                          {/* Table Cell 4 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.np_margin_fy1_median,
                                '%',
                                undefined
                              )}
                            </Text>
                          </TableCell>
                          {/* Table Cell 5 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end' }
                              ),
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'screen_title_stock'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.np_margin_fy2_median,
                                '%',
                                undefined
                              )}
                            </Text>
                          </TableCell>
                        </TableRow>
                      </Table>
                    </LinearGradient>
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
