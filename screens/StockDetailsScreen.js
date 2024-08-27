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
  Button,
  HStack,
  IconButton,
  LinearGradient,
  Picker,
  ScreenContainer,
  Shadow,
  SimpleStyleScrollView,
  Table,
  TableCell,
  TableRow,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { H3 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const StockDetailsScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [companyName, setCompanyName] = React.useState('');
  const [filterPressed, setFilterPressed] = React.useState(false);
  const [loading_button, setLoading_button] = React.useState('');
  const [newPeerGroup, setNewPeerGroup] = React.useState('');
  const [peerGroupId, setPeerGroupId] = React.useState(0);
  const [peer_id, setPeer_id] = React.useState(0);
  const [peer_name, setPeer_name] = React.useState('');
  const [selectedPeerGroup, setSelectedPeerGroup] = React.useState({});
  const [selectedPeerGroupID, setSelectedPeerGroupID] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const [ticker, setTicker] = React.useState('');
  const [viewPeerGroup, setViewPeerGroup] = React.useState(false);
  const setSeletedPeerGroup = peerGroups => {
    if (!Array.isArray(peerGroups)) {
      return;
    }
    setSelectedPeerGroup(
      peerGroups.find(({ id }) => Number(id) === Number(peerGroupId || 0))
    );
  };

  const resetForm = () => {
    setSelectedPeerGroup(0);
    setNewPeerGroup('');
    setPeerGroupId(0);
  };

  const preparePeerGroupList = peerGroups => {
    const defult = {
      value: 0,
      label: 'Select peer group...',
    };
    if (!Array.isArray(peerGroups)) {
      return [];
    }
    return [
      {
        value: 0,
        label: 'Select...',
      },
      ...peerGroups.map(({ title, id }) => ({
        value: id,
        label: title,
      })),
    ];
  };
  const xanoCollectionUpdatePeerGroupPATCH =
    XanoCollectionApi.useUpdatePeerGroupPATCH();
  const xanoCollectionCreateNewPeerPOST =
    XanoCollectionApi.useCreateNewPeerPOST();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      removeGlobalScroll();
      setGlobalVariableValue({
        key: 'pageName',
        value: 'Stock Details',
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
    <ScreenContainer
      hasSafeArea={false}
      hasLeftSafeArea={true}
      scrollable={false}
    >
      <CustomHeaderBlock />
      <XanoCollectionApi.FetchGetOneStockGET
        handlers={{
          on2xx: fetchData => {
            try {
              setCompanyName(fetchData?.json?.company_name);
              setTicker(fetchData?.json?.ticker);
            } catch (err) {
              console.error(err);
            }
          },
          onData: fetchData => {
            try {
              if (fetchData?.access_type === 'NKP comps') {
              } else {
              }
            } catch (err) {
              console.error(err);
            }
          },
        }}
        stock_id={props.route?.params?.stock_id ?? 1527}
      >
        {({ loading, error, data, refetchGetOneStock }) => {
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
                    marginBottom:
                      dimensions.width >= Breakpoints.Laptop ? 0 : 65,
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
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
                          { fontFamily: 'Quicksand_400Regular' }
                        ),
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
                      onPress={() => {
                        try {
                          setShowModal(true);
                          setViewPeerGroup(false);
                          resetForm();
                        } catch (err) {
                          console.error(err);
                        }
                      }}
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
                      GlobalStyles.LinearGradientStyles(theme)[
                        'Linear Gradient'
                      ].style,
                      dimensions.width
                    )}
                  >
                    {/* table */}
                    <View
                      style={StyleSheet.applyWidth(
                        { padding: 10 },
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
                            {'Enterprise value:\n'}
                          </Text>
                        </View>

                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)[
                            'screen_title_stock'
                          ].props}
                          style={StyleSheet.applyWidth(
                            GlobalStyles.TextStyles(theme)['screen_title_stock']
                              .style,
                            dimensions.width
                          )}
                        >
                          {transformEuroM(fetchData?.ev_eur)}
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
                            {'Market capitalisation:\n'}
                          </Text>
                        </View>

                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)[
                            'screen_title_stock'
                          ].props}
                          style={StyleSheet.applyWidth(
                            GlobalStyles.TextStyles(theme)['screen_title_stock']
                              .style,
                            dimensions.width
                          )}
                        >
                          {transformEuroM(fetchData?.capitalisation_eur)}
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
                            {'Country (HQ):\n'}
                          </Text>
                        </View>

                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)[
                            'screen_title_stock'
                          ].props}
                          style={StyleSheet.applyWidth(
                            GlobalStyles.TextStyles(theme)['screen_title_stock']
                              .style,
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
                            {'GICS Sector:\n'}
                          </Text>
                        </View>

                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)[
                            'screen_title_stock'
                          ].props}
                          style={StyleSheet.applyWidth(
                            GlobalStyles.TextStyles(theme)['screen_title_stock']
                              .style,
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
                            {'GICS Industry Group:\n'}
                          </Text>
                        </View>

                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)[
                            'screen_title_stock'
                          ].props}
                          style={StyleSheet.applyWidth(
                            GlobalStyles.TextStyles(theme)['screen_title_stock']
                              .style,
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
                            {'GISC Industry:\n'}
                          </Text>
                        </View>

                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)[
                            'screen_title_stock'
                          ].props}
                          style={StyleSheet.applyWidth(
                            GlobalStyles.TextStyles(theme)['screen_title_stock']
                              .style,
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
                            {'GISC Sub industry:\n'}
                          </Text>
                        </View>

                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)[
                            'screen_title_stock'
                          ].props}
                          style={StyleSheet.applyWidth(
                            GlobalStyles.TextStyles(theme)['screen_title_stock']
                              .style,
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
                          {...GlobalStyles.TextStyles(theme)[
                            'screen_title_stock'
                          ].props}
                          style={StyleSheet.applyWidth(
                            GlobalStyles.TextStyles(theme)['screen_title_stock']
                              .style,
                            dimensions.width
                          )}
                        >
                          {fetchData?.description}
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>
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
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['screen_title']
                              .style,
                            { fontFamily: 'Quicksand_400Regular' }
                          ),
                          dimensions.width
                        )}
                      >
                        {fetchData?.reporting_currency}
                        {' in millions'}
                      </Text>
                    </View>

                    <LinearGradient
                      color1={theme.colors.branding.primary}
                      color2={theme.colors.branding.secondary}
                      endX={100}
                      endY={100}
                      startX={0}
                      startY={0}
                      {...GlobalStyles.LinearGradientStyles(theme)[
                        'SectionName'
                      ].props}
                      color3={null}
                      style={StyleSheet.applyWidth(
                        GlobalStyles.LinearGradientStyles(theme)['SectionName']
                          .style,
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
                          drawTopBorder={false}
                          isTableHeader={false}
                          drawBottomBorder={false}
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
                            drawEndBorder={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { width: '16%' }
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
                            drawEndBorder={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                {
                                  margin: 0,
                                  overflow: 'hidden',
                                  padding: 0,
                                  width: '16%',
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
                              adjustsFontSizeToFit={true}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)[
                                    'screen_title_stockH'
                                  ].style,
                                  { fontSize: 12, margin: 0, padding: 0 }
                                ),
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.fy0_end_date,
                                undefined,
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
                            drawEndBorder={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { width: '16%' }
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
                              {transformNumber(
                                fetchData?.tt_end_date,
                                '(TTM)',
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
                            drawEndBorder={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { width: '16%' }
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
                              {transformNumber(
                                fetchData?.fy1_end_date,
                                'E',
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
                            drawEndBorder={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { width: '16%' }
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
                              {transformNumber(
                                fetchData?.fy2_end_date,
                                'E',
                                undefined
                              )}
                            </Text>
                          </TableCell>
                          {/* Table Cell 6 */}
                          <TableCell
                            drawBottomBorder={false}
                            drawStartBorder={false}
                            drawTopBorder={false}
                            {...GlobalStyles.TableCellStyles(theme)[
                              'Table Cell'
                            ].props}
                            drawEndBorder={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { width: '16%' }
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
                              {transformNumber(
                                fetchData?.fy3_end_date,
                                'E',
                                undefined
                              )}
                            </Text>
                          </TableCell>
                        </TableRow>
                      </Table>
                    </LinearGradient>
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
                              {transformNumber(
                                fetchData?.fy0_end_date,
                                undefined,
                                undefined
                              )}
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
                              {transformNumber(
                                fetchData?.tt_end_date,
                                undefined,
                                undefined
                              )}
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
                              {transformNumber(
                                fetchData?.fy1_end_date,
                                undefined,
                                undefined
                              )}
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
                              {transformNumber(
                                fetchData?.fy2_end_date,
                                undefined,
                                undefined
                              )}
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
                                    textAlign: 'right',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.ev_sales_fy0,
                                'x',
                                undefined
                              )}
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
                              {transformNumber(
                                fetchData?.ev_sales_ttm,
                                'x',
                                undefined
                              )}
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
                              {transformNumber(
                                fetchData?.ev_sales_fy1,
                                'x',
                                undefined
                              )}
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
                              {transformNumber(
                                fetchData?.ev_sales_fy2,
                                'x',
                                undefined
                              )}
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
                                    textAlign: 'right',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.ev_ebitda_fy0,
                                'x',
                                undefined
                              )}
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
                              {transformNumber(
                                fetchData?.ev_ebitda_ttm,
                                'x',
                                undefined
                              )}
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
                              {transformNumber(
                                fetchData?.ev_ebitda_fy1,
                                'x',
                                undefined
                              )}
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
                              {transformNumber(
                                fetchData?.ev_ebitda_fy2,
                                'x',
                                undefined
                              )}
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
                                    textAlign: 'right',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.ev_ebit_fy0,
                                'x',
                                undefined
                              )}
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
                              {transformNumber(
                                fetchData?.ev_ebit_ttm,
                                'x',
                                undefined
                              )}
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
                              {transformNumber(
                                fetchData?.ev_ebit_fy1,
                                'x',
                                undefined
                              )}
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
                              {transformNumber(
                                fetchData?.ev_ebit_fy2,
                                'x',
                                undefined
                              )}
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
                                    textAlign: 'right',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {transformNumber(
                                fetchData?.pe_fy0,
                                'x',
                                undefined
                              )}
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
                              {transformNumber(
                                fetchData?.pe_ttm,
                                'x',
                                undefined
                              )}
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
                              {transformNumber(
                                fetchData?.pe_fy1,
                                'x',
                                undefined
                              )}
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
                              {transformNumber(
                                fetchData?.pe_fy2,
                                'x',
                                undefined
                              )}
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
      {/* Fetch 2 */}
      <XanoCollectionApi.FetchGetPeersListGET>
        {({ loading, error, data, refetchGetPeersList }) => {
          const fetch2Data = data?.json;
          if (loading) {
            return <LoadingBlock />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <Modal
              supportedOrientations={['portrait', 'landscape']}
              animationType={'fade'}
              presentationStyle={'pageSheet'}
              transparent={true}
              visible={showModal}
            >
              <View
                onLayout={event => {
                  try {
                    console.log(newPeerGroup);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    height: '100%',
                    justifyContent: 'center',
                  },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'stretch',
                      justifyContent: 'flex-start',
                      maxWidth: 450,
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
                        {
                          borderColor: null,
                          borderWidth: null,
                          margin: null,
                          padding: 10,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {/* View 2 */}
                    <View
                      style={StyleSheet.applyWidth(
                        { alignItems: 'flex-end' },
                        dimensions.width
                      )}
                    >
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
                    </View>
                    {/* View 3 */}
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
                              fontFamily: 'Quicksand_700Bold',
                              fontSize: 16,
                              textAlign: 'center',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {companyName}
                        {' ('}
                        {ticker}
                        {')'}
                      </Text>
                    </View>
                    {/* Form */}
                    <>
                      {!(viewPeerGroup === false) ? null : (
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
                                  fontFamily: 'Quicksand_400Regular',
                                  padding: 10,
                                  paddingLeft: 20,
                                  paddingRight: 20,
                                  textAlign: 'center',
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {'add to the following peer group'}
                          </Text>

                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: {
                                  minWidth: Breakpoints.BigScreen,
                                  value: 'center',
                                },
                                flexDirection: 'row',
                                gap: 8,
                                justifyContent: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: 'space-between',
                                  },
                                  {
                                    minWidth: Breakpoints.BigScreen,
                                    value: 'center',
                                  },
                                  {
                                    minWidth: Breakpoints.Tablet,
                                    value: 'center',
                                  },
                                ],
                                marginBottom: 20,
                                width: {
                                  minWidth: Breakpoints.BigScreen,
                                  value: '100%',
                                },
                              },
                              dimensions.width
                            )}
                          >
                            <HStack
                              {...GlobalStyles.HStackStyles(theme)['H Stack']
                                .props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.HStackStyles(theme)['H Stack']
                                    .style,
                                  {
                                    gap: 10,
                                    justifyContent: [
                                      {
                                        minWidth: Breakpoints.BigScreen,
                                        value: 'center',
                                      },
                                      {
                                        minWidth: Breakpoints.Tablet,
                                        value: 'center',
                                      },
                                    ],
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              <Picker
                                autoDismissKeyboard={true}
                                dropDownBorderColor={theme.colors.border.brand}
                                dropDownBorderRadius={8}
                                dropDownBorderWidth={1}
                                iconSize={24}
                                onValueChange={newPickerValue => {
                                  try {
                                    setPeerGroupId(newPickerValue);
                                    /* hidden 'Log to Console' action */
                                    setSeletedPeerGroup(peerGroupId);
                                    setSelectedPeerGroupID(newPickerValue);
                                    console.log(selectedPeerGroupID);
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                                placeholder={'Select an option'}
                                selectedIconColor={theme.colors.text.strong}
                                selectedIconName={'Feather/check'}
                                selectedIconSize={20}
                                disabled={
                                  newPeerGroup !== ('' && newPeerGroup !== null)
                                }
                                dropDownBackgroundColor={
                                  theme.colors.background.brand
                                }
                                dropDownTextColor={theme.colors.text.strong}
                                leftIconMode={'outset'}
                                mode={'dropdown-modal'}
                                options={preparePeerGroupList(fetch2Data)}
                                placeholderTextColor={
                                  theme.colors.foreground.brand
                                }
                                style={StyleSheet.applyWidth(
                                  {
                                    color: palettes.Brand['Strong Inverse'],
                                    fontFamily: 'Quicksand_400Regular',
                                  },
                                  dimensions.width
                                )}
                                type={'underline'}
                                value={peerGroupId}
                              />
                              {/* Button 2 */}
                              <Button
                                iconPosition={'left'}
                                onPress={() => {
                                  const handler = async () => {
                                    try {
                                      setLoading_button('add');
                                      setSeletedPeerGroup(fetch2Data);
                                      const newData = (
                                        await xanoCollectionUpdatePeerGroupPATCH.mutateAsync(
                                          {
                                            peer_id: selectedPeerGroupID,
                                            stocksList: [
                                              props.route?.params?.stock_id ??
                                                1527,
                                            ].concat([]),
                                            type: 'Add',
                                          }
                                        )
                                      )?.json;
                                      setPeer_name(newData?.title);
                                      setPeer_id(newData?.id);
                                      setViewPeerGroup(true);
                                      setLoading_button('');
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  };
                                  handler();
                                }}
                                {...GlobalStyles.ButtonStyles(theme)['Button']
                                  .props}
                                disabled={!peerGroupId}
                                loading={loading_button === 'add'}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.ButtonStyles(theme)['Button']
                                      .style,
                                    {
                                      backgroundColor: palettes.App.Orange,
                                      fontFamily: 'Quicksand_500Medium',
                                      marginRight: 7,
                                      overflow: 'hidden',
                                      textTransform: 'uppercase',
                                      width: '47%',
                                    }
                                  ),
                                  dimensions.width
                                )}
                                title={'add'}
                              />
                            </HStack>
                          </View>
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
                                  fontFamily: 'Quicksand_400Regular',
                                  padding: 10,
                                  paddingLeft: 20,
                                  paddingRight: 20,
                                  textAlign: 'center',
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {'...or create and add to a new peer group'}
                          </Text>
                          {/* View 2 */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                flexDirection: 'row',
                                gap: 8,
                                justifyContent: 'space-between',
                                marginBottom: 20,
                              },
                              dimensions.width
                            )}
                          >
                            <TextInput
                              autoCapitalize={'none'}
                              autoCorrect={true}
                              changeTextDelay={500}
                              onChangeText={newTextInputValue => {
                                try {
                                  setNewPeerGroup(newTextInputValue);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              webShowOutline={true}
                              {...GlobalStyles.TextInputStyles(theme)[
                                'Text Input'
                              ].props}
                              disabled={peerGroupId > 0}
                              placeholder={'Pree group name...'}
                              placeholderTextColor={
                                theme.colors.foreground.brand
                              }
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextInputStyles(theme)[
                                    'Text Input'
                                  ].style,
                                  {
                                    borderColor: theme.colors.foreground.brand,
                                    color: palettes.Brand['Strong Inverse'],
                                    fontFamily: 'Quicksand_500Medium',
                                    paddingLeft: 16,
                                    width: '60%',
                                  }
                                ),
                                dimensions.width
                              )}
                              value={newPeerGroup}
                            />
                            {/* Button 2 */}
                            <Button
                              iconPosition={'left'}
                              onPress={() => {
                                const handler = async () => {
                                  try {
                                    setLoading_button('create');
                                    const newData = (
                                      await xanoCollectionCreateNewPeerPOST.mutateAsync(
                                        {
                                          access_type: 'Private',
                                          stocks: [].concat([
                                            props.route?.params?.stock_id ??
                                              1527,
                                          ]),
                                          title: newPeerGroup,
                                        }
                                      )
                                    )?.json;
                                    setPeer_name(newData?.title);
                                    setPeer_id(newData?.id);
                                    setViewPeerGroup(true);
                                    setLoading_button('');
                                  } catch (err) {
                                    console.error(err);
                                  }
                                };
                                handler();
                              }}
                              {...GlobalStyles.ButtonStyles(theme)['Button']
                                .props}
                              disabled={!newPeerGroup}
                              loading={loading_button === 'create'}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.ButtonStyles(theme)['Button']
                                    .style,
                                  {
                                    backgroundColor: palettes.App.Orange,
                                    fontFamily: 'Quicksand_500Medium',
                                    textTransform: 'uppercase',
                                    width: '37%',
                                  }
                                ),
                                dimensions.width
                              )}
                              title={'create'}
                            />
                          </View>
                        </View>
                      )}
                    </>
                    <>
                      {!viewPeerGroup ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            { alignItems: 'center', gap: 10, paddingTop: 10 },
                            dimensions.width
                          )}
                        >
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
                                  fontFamily: 'Quicksand_400Regular',
                                  padding: 10,
                                  paddingLeft: 20,
                                  paddingRight: 20,
                                  textAlign: 'center',
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {companyName}
                            {' was added to the following peer group'}
                          </Text>

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
                                  fontFamily: 'Quicksand_700Bold',
                                  fontSize: 16,
                                  paddingBottom: 5,
                                  textAlign: 'center',
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {peer_name}
                          </Text>
                          {/* Button 2 */}
                          <Button
                            iconPosition={'left'}
                            onPress={() => {
                              try {
                                navigation.push('PeerGroupDetailsScreen', {
                                  peer_group_id: peer_id,
                                });
                                setShowModal(false);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            {...GlobalStyles.ButtonStyles(theme)['Button']
                              .props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.ButtonStyles(theme)['Button']
                                  .style,
                                {
                                  backgroundColor: palettes.App.Orange,
                                  fontFamily: 'Quicksand_500Medium',
                                  marginBottom: 20,
                                  textTransform: 'uppercase',
                                  width: '37%',
                                }
                              ),
                              dimensions.width
                            )}
                            title={'VIEW'}
                          />
                        </View>
                      )}
                    </>
                  </LinearGradient>
                </View>
              </View>
            </Modal>
          );
        }}
      </XanoCollectionApi.FetchGetPeersListGET>
    </ScreenContainer>
  );
};

export default withTheme(StockDetailsScreen);
