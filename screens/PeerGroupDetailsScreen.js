import React from 'react';
import {
  Button,
  HStack,
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
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { H3, H5 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Modal, Platform, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import CustomBottomNavBlock from '../components/CustomBottomNavBlock';
import CustomHeaderBlock from '../components/CustomHeaderBlock';
import LoadingBlock from '../components/LoadingBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import assessAccess from '../global-functions/assessAccess';
import deviceType from '../global-functions/deviceType';
import passwordValidate from '../global-functions/passwordValidate';
import removeGlobalScroll from '../global-functions/removeGlobalScroll';
import transformEuroM from '../global-functions/transformEuroM';
import transformNumber from '../global-functions/transformNumber';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { peer_group_id: 843 };

const PeerGroupDetailsScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [NKP_Comp, setNKP_Comp] = React.useState(false);
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [confirmPass, setConfirmPass] = React.useState('');
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [newPass, setNewPass] = React.useState('');
  const [peerName, setPeerName] = React.useState('');
  const [showModal, setShowModal] = React.useState(false);
  const xanoCollectionUpdatePeerGroupPATCH =
    XanoCollectionApi.useUpdatePeerGroupPATCH();
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
  const peerNamemPOnMmmKRef = React.useRef();

  return (
    <ScreenContainer
      hasSafeArea={false}
      hasLeftSafeArea={false}
      hasRightSafeArea={false}
      hasTopSafeArea={true}
      scrollable={false}
    >
      <CustomHeaderBlock />
      <XanoCollectionApi.FetchGetOnePeerGET
        device={deviceType(
          Platform.OS === 'web',
          Platform.OS === 'ios',
          Platform.OS === 'web'
        )}
        handlers={{
          onData: fetchData => {
            try {
              if (fetchData?.access_type === 'NKP comps') {
                setNKP_Comp(true);
              } else {
              }

              setPeerName(fetchData?.title);
            } catch (err) {
              console.error(err);
            }
          },
        }}
        peer_group_id={
          props.route?.params?.peer_group_id ?? defaultProps.peer_group_id
        }
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
            <>
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
                    marginBottom:
                      dimensions.width >= Breakpoints.Laptop ? 0 : 65,
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
                            onPress={() => {
                              try {
                                setShowModal(true);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
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
                        {!(NKP_Comp && fetchData?.description) ? null : (
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
                        flex: 1,
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
                          {
                            borderRadius: 0,
                            flex: null,
                            margin: null,
                            width: '100%',
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
                                {/* Table Cell 6 */}
                                <>
                                  {NKP_Comp ? null : (
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
                                                value: 'center',
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
                                        {'Remove'}
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
                                  <Touchable
                                    onPress={() => {
                                      try {
                                        navigation.navigate(
                                          'StockDetailsScreen',
                                          { stock_id: tableData?.id }
                                        );
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                    style={StyleSheet.applyWidth(
                                      { width: '100%' },
                                      dimensions.width
                                    )}
                                  >
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'flex-start',
                                          width: '100%',
                                        },
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
                                    </View>
                                  </Touchable>
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
                                {/* Table Cell 6 */}
                                <>
                                  {NKP_Comp ? null : (
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
                                                value: 'center',
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
                                      <IconButton
                                        onPress={() => {
                                          const handler = async () => {
                                            try {
                                              (
                                                await xanoCollectionUpdatePeerGroupPATCH.mutateAsync(
                                                  {
                                                    device: 'ios',
                                                    peer_id:
                                                      props.route?.params
                                                        ?.peer_group_id ??
                                                      defaultProps.peer_group_id,
                                                    stocksList: [].concat([
                                                      tableData?.id,
                                                    ]),
                                                    type: 'Remove',
                                                  }
                                                )
                                              )?.json;
                                            } catch (err) {
                                              console.error(err);
                                            }
                                          };
                                          handler();
                                        }}
                                        color={theme.colors.background.danger}
                                        icon={'MaterialIcons/close'}
                                        size={20}
                                      />
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
                          StyleSheet.compose(
                            GlobalStyles.TableStyles(theme)['Table'].style,
                            { flex: null }
                          ),
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
                              flex: null,
                              margin: [
                                { minWidth: Breakpoints.Tablet, value: 0 },
                                { minWidth: Breakpoints.Mobile, value: 0 },
                              ],
                              width: '100%',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        <Table
                          borderColor={theme.colors.border.brand}
                          borderStyle={'solid'}
                          borderWidth={1}
                          cellVerticalPadding={10}
                          drawBottomBorder={false}
                          drawEndBorder={false}
                          drawStartBorder={false}
                          showsVerticalScrollIndicator={true}
                          {...GlobalStyles.TableStyles(theme)['Table'].props}
                          cellHorizontalPadding={5}
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
                              flex: null,
                              margin: [
                                { minWidth: Breakpoints.Tablet, value: 0 },
                                { minWidth: Breakpoints.Mobile, value: 0 },
                              ],
                              width: '100%',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        <Table
                          borderColor={theme.colors.border.brand}
                          borderStyle={'solid'}
                          borderWidth={1}
                          cellVerticalPadding={10}
                          drawBottomBorder={false}
                          drawEndBorder={false}
                          drawStartBorder={false}
                          showsVerticalScrollIndicator={true}
                          {...GlobalStyles.TableStyles(theme)['Table'].props}
                          cellHorizontalPadding={5}
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
                                {'-'}
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
                                {'-'}
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
                                {'-'}
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
              {/* Modal 2 */}
              <Modal
                supportedOrientations={['portrait', 'landscape']}
                animationType={'fade'}
                presentationStyle={'pageSheet'}
                transparent={true}
                visible={showModal}
              >
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
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      height: '100%',
                      justifyContent: [
                        { minWidth: Breakpoints.Mobile, value: 'center' },
                        { minWidth: Breakpoints.Tablet, value: 'flex-start' },
                      ],
                      paddingTop: { minWidth: Breakpoints.Tablet, value: 100 },
                      width: '100%',
                    },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: [
                          { minWidth: Breakpoints.Laptop, value: 'center' },
                          { minWidth: Breakpoints.Mobile, value: 'center' },
                        ],
                        borderRadius: 8,
                        justifyContent: 'center',
                        maxWidth: [
                          { minWidth: Breakpoints.Mobile, value: 380 },
                          { minWidth: Breakpoints.Desktop, value: 900 },
                          { minWidth: Breakpoints.Laptop, value: 900 },
                        ],
                        width: '100%',
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
                          { margin: null, maxWidth: 380, width: '100%' }
                        ),
                        dimensions.width
                      )}
                    >
                      <HStack
                        {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.HStackStyles(theme)['H Stack'].style,
                            {
                              alignItems: 'flex-start',
                              backgroundColor: 'rgba(0, 0, 0, 0)',
                              justifyContent: 'space-between',
                              padding: 10,
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        <H5
                          selectable={false}
                          {...GlobalStyles.H5Styles(theme)['H5'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.H5Styles(theme)['H5'].style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontSize: 16,
                                marginTop: 0,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Change peer group name'}
                        </H5>

                        <Shadow
                          offsetX={0}
                          paintInside={true}
                          showShadowCornerBottomEnd={true}
                          showShadowCornerBottomStart={true}
                          showShadowCornerTopEnd={true}
                          showShadowCornerTopStart={true}
                          showShadowSideBottom={true}
                          showShadowSideEnd={true}
                          showShadowSideStart={true}
                          showShadowSideTop={true}
                          distance={3}
                          offsetY={2}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                backgroundColor: theme.colors.background.brand,
                                borderRadius: 50,
                                height: 36,
                                justifyContent: 'center',
                                width: 36,
                              },
                              dimensions.width
                            )}
                          >
                            <IconButton
                              onPress={() => {
                                try {
                                  setShowModal(false);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              color={palettes.App.Strong2}
                              icon={'AntDesign/close'}
                              size={24}
                            />
                          </View>
                        </Shadow>
                      </HStack>

                      <View
                        onLayout={event => {
                          try {
                            /* hidden 'Focus Text Input' action */
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <H5
                          selectable={false}
                          {...GlobalStyles.H5Styles(theme)['H5'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.H5Styles(theme)['H5'].style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontSize: 16,
                                margin: 0,
                                marginBottom: 0,
                                padding: 10,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Peer group name'}
                        </H5>
                        {/* Peer Name */}
                        <TextInput
                          autoCapitalize={'none'}
                          changeTextDelay={500}
                          onChangeText={newPeerNameValue => {
                            try {
                              setPeerName(newPeerNameValue);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          webShowOutline={true}
                          {...GlobalStyles.TextInputStyles(theme)[
                            'Login Text Style'
                          ].props}
                          autoCorrect={false}
                          autoFocus={true}
                          clearButtonMode={'while-editing'}
                          keyboardType={'default'}
                          numberOfLines={1}
                          placeholder={'Enter peer group name'}
                          placeholderTextColor={theme.colors.text.medium}
                          ref={peerNamemPOnMmmKRef}
                          returnKeyType={'next'}
                          selectionColor={theme.colors.text.strong}
                          spellcheck={true}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextInputStyles(theme)[
                                'Login Text Style'
                              ].style,
                              {
                                backgroundColor: theme.colors.background.brand,
                                borderColor: theme.colors.text.strong,
                                borderStyle: 'solid',
                                fontFamily: 'Quicksand_400Regular',
                                margin: 10,
                                marginBottom: 10,
                                marginTop: 0,
                                padding: 8,
                                paddingBottom: null,
                                paddingLeft: null,
                                paddingRight: null,
                                paddingTop: null,
                              }
                            ),
                            dimensions.width
                          )}
                          value={peerName}
                        />
                      </View>
                      {/* Buttons */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignContent: 'flex-start',
                            flexDirection: 'row',
                            flexGrow: 1,
                            gap: [
                              { minWidth: Breakpoints.Mobile, value: 8 },
                              { minWidth: Breakpoints.Laptop, value: 10 },
                            ],
                            justifyContent: [
                              {
                                minWidth: Breakpoints.Mobile,
                                value: 'flex-end',
                              },
                              { minWidth: Breakpoints.Laptop, value: 'center' },
                              {
                                minWidth: Breakpoints.Desktop,
                                value: 'center',
                              },
                            ],
                            marginBottom: 10,
                            padding: 10,
                          },
                          dimensions.width
                        )}
                      >
                        {/* save */}
                        <Button
                          iconPosition={'left'}
                          onPress={() => {
                            const handler = async () => {
                              try {
                                setButtonLoading(true);
                                const newData = (
                                  await xanoCollectionUpdatePeerGroupPATCH.mutateAsync(
                                    {
                                      device: 'ios',
                                      peer_id:
                                        props.route?.params?.peer_group_id ??
                                        defaultProps.peer_group_id,
                                      stocksList: [30, 40],
                                      title: peerName,
                                      type: 'None',
                                    }
                                  )
                                )?.json;
                                setButtonLoading(false);
                                setShowModal(false);
                              } catch (err) {
                                console.error(err);
                              }
                            };
                            handler();
                          }}
                          {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                          disabled={peerName === ''}
                          loading={buttonLoading}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ButtonStyles(theme)['Button'].style,
                              {
                                backgroundColor: palettes.App.Orange,
                                fontFamily: 'Quicksand_600SemiBold',
                                textTransform: 'uppercase',
                                width: [
                                  { minWidth: Breakpoints.Laptop, value: 150 },
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: '100%',
                                  },
                                ],
                              }
                            ),
                            dimensions.width
                          )}
                          title={'Save'}
                        />
                      </View>
                    </LinearGradient>
                  </View>
                </SimpleStyleScrollView>
              </Modal>
            </>
          );
        }}
      </XanoCollectionApi.FetchGetOnePeerGET>
      <CustomBottomNavBlock />
    </ScreenContainer>
  );
};

export default withTheme(PeerGroupDetailsScreen);
