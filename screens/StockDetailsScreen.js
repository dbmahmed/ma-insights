import React from 'react';
import {
  Button,
  HStack,
  IconButton,
  LinearGradient,
  Link,
  Picker,
  Pressable,
  ScreenContainer,
  Shadow,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  Table,
  TableCell,
  TableRow,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { H3 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  Modal,
  Platform,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import CustomBottomNavBlock from '../components/CustomBottomNavBlock';
import CustomHeaderBlock from '../components/CustomHeaderBlock';
import LoadingBlock from '../components/LoadingBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import assessAccess from '../global-functions/assessAccess';
import deviceType from '../global-functions/deviceType';
import removeGlobalScroll from '../global-functions/removeGlobalScroll';
import screenNameGen from '../global-functions/screenNameGen';
import transformEuroM from '../global-functions/transformEuroM';
import transformNumber from '../global-functions/transformNumber';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import waitUtil from '../utils/wait';

const defaultProps = { peer_name: null, stock_id: 1527 };

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
  const [peerGroupList, setPeerGroupList] = React.useState([]);
  const [peerQuery, setPeerQuery] = React.useState('');
  const [peerQueryRaw, setPeerQueryRaw] = React.useState('');
  const [peer_id, setPeer_id] = React.useState(0);
  const [peer_name, setPeer_name] = React.useState('');
  const [screenCode, setScreenCode] = React.useState('');
  const [selectedPeerGroup, setSelectedPeerGroup] = React.useState({});
  const [selectedPeerGroupID, setSelectedPeerGroupID] = React.useState(0);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [ticker, setTicker] = React.useState('');
  const [viewPeerGroup, setViewPeerGroup] = React.useState(false);
  const [textInputValue, setTextInputValue] = React.useState('');
  const [refreshingn5IjwgJe, setRefreshingn5IjwgJe] = React.useState(false);
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
      setScreenCode(screenNameGen());
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
      hasLeftSafeArea={false}
      hasRightSafeArea={false}
      hasTopSafeArea={true}
      scrollable={false}
    >
      <CustomHeaderBlock />
      <XanoCollectionApi.FetchGetOneStockGET
        device={deviceType(
          Platform.OS === 'web',
          Platform.OS === 'ios',
          Platform.OS === 'android'
        )}
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
        screenCode={screenCode}
        stock_id={props.route?.params?.stock_id ?? defaultProps.stock_id}
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
              refreshControl={
                <RefreshControl
                  refreshing={refreshingn5IjwgJe}
                  onRefresh={() => {
                    const handler = async () => {
                      try {
                        setRefreshingn5IjwgJe(true);
                        await refetchGetOneStock();
                        setRefreshingn5IjwgJe(false);
                      } catch (err) {
                        console.error(err);
                        setRefreshingn5IjwgJe(false);
                      }
                    };
                    handler();
                  }}
                />
              }
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={StyleSheet.applyWidth(
                {
                  alignItems: [
                    { minWidth: Breakpoints.BigScreen, value: 'center' },
                    { minWidth: Breakpoints.Desktop, value: 'center' },
                  ],
                  height: '100%',
                  marginTop: [
                    { minWidth: Breakpoints.Mobile, value: 65 },
                    {
                      minWidth: Breakpoints.Mobile,
                      value: Platform.OS === 'web' ? 30 : 65,
                    },
                  ],
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
                      suppressHighlighting={true}
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
                        { padding: 10, width: '100%' },
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
                            width: '100%',
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
                            suppressHighlighting={true}
                          >
                            {'Enterprise value:'}
                          </Text>
                        </View>

                        <View
                          style={StyleSheet.applyWidth(
                            { flex: 1 },
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
                            suppressHighlighting={true}
                          >
                            {transformEuroM(fetchData?.ev_eur)}
                          </Text>
                        </View>
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
                            width: '100%',
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
                            suppressHighlighting={true}
                          >
                            {'Market capitalisation:'}
                          </Text>
                        </View>

                        <View
                          style={StyleSheet.applyWidth(
                            { flex: 1 },
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
                            suppressHighlighting={true}
                          >
                            {transformEuroM(fetchData?.capitalisation_eur)}
                          </Text>
                        </View>
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
                            width: '100%',
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
                            suppressHighlighting={true}
                          >
                            {'Country (HQ):'}
                          </Text>
                        </View>

                        <View
                          style={StyleSheet.applyWidth(
                            { flex: 1 },
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
                            suppressHighlighting={true}
                          >
                            {fetchData?.country}
                          </Text>
                        </View>
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
                            width: '100%',
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
                            suppressHighlighting={true}
                          >
                            {'GICS Sector:'}
                          </Text>
                        </View>

                        <View
                          style={StyleSheet.applyWidth(
                            { flex: 1 },
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
                            suppressHighlighting={true}
                          >
                            {fetchData?._gics_sub_industry?.GICS_Sector}
                          </Text>
                        </View>
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
                            width: '100%',
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
                            suppressHighlighting={true}
                          >
                            {'GICS Industry Group:'}
                          </Text>
                        </View>

                        <View
                          style={StyleSheet.applyWidth(
                            { flex: 1 },
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
                            suppressHighlighting={true}
                          >
                            {fetchData?._gics_sub_industry?.GICS_Industry_Group}
                          </Text>
                        </View>
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
                            width: '100%',
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
                            suppressHighlighting={true}
                          >
                            {'GISC Industry:'}
                          </Text>
                        </View>

                        <View
                          style={StyleSheet.applyWidth(
                            { flex: 1 },
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
                            suppressHighlighting={true}
                          >
                            {fetchData?._gics_sub_industry?.GICS_Industry}
                          </Text>
                        </View>
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
                            width: '100%',
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
                            suppressHighlighting={true}
                          >
                            {'GISC Sub industry:'}
                          </Text>
                        </View>

                        <View
                          style={StyleSheet.applyWidth(
                            { flex: 1 },
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
                            suppressHighlighting={true}
                          >
                            {fetchData?._gics_sub_industry?.GICS_Sub_Industry}
                          </Text>
                        </View>
                      </View>
                      {/* View 2 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            paddingTop: {
                              minWidth: Breakpoints.BigScreen,
                              value: 10,
                            },
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
                          style={StyleSheet.applyWidth(
                            GlobalStyles.TextStyles(theme)['screen_title_stock']
                              .style,
                            dimensions.width
                          )}
                          suppressHighlighting={true}
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
                        suppressHighlighting={true}
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
                      {/* Table 3 */}
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
                              suppressHighlighting={true}
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
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)[
                                    'screen_title_stockH'
                                  ].style,
                                  { fontSize: 10 }
                                ),
                                dimensions.width
                              )}
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.fy0_end_date,
                                undefined,
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
                                'screen_title_stockH'
                              ].props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)[
                                    'screen_title_stockH'
                                  ].style,
                                  {
                                    alignSelf: 'flex-end',
                                    fontSize: 10,
                                    textAlign: 'right',
                                  }
                                ),
                                dimensions.width
                              )}
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.tt_end_date,
                                dimensions.width >= Breakpoints.Tablet
                                  ? ' (TTM)'
                                  : '\n(TTM)',
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
                                'screen_title_stockH'
                              ].props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)[
                                    'screen_title_stockH'
                                  ].style,
                                  { fontSize: 10 }
                                ),
                                dimensions.width
                              )}
                              suppressHighlighting={true}
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
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)[
                                    'screen_title_stockH'
                                  ].style,
                                  { fontSize: 10 }
                                ),
                                dimensions.width
                              )}
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.fy2_end_date,
                                'E',
                                undefined
                              )}
                            </Text>
                          </TableCell>
                        </TableRow>
                        {/* Revenue */}
                        <TableRow
                          drawEndBorder={false}
                          drawTopBorder={false}
                          isTableHeader={false}
                          drawBottomBorder={false}
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
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                {
                                  alignItems: {
                                    minWidth: Breakpoints.Tablet,
                                    value: 'flex-start',
                                  },
                                  paddingBottom: [
                                    { minWidth: Breakpoints.Tablet, value: 0 },
                                    { minWidth: Breakpoints.Mobile, value: 0 },
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
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                              suppressHighlighting={true}
                            >
                              {'Revenue'}
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
                                {
                                  justifyContent: 'flex-end',
                                  paddingBottom: [
                                    { minWidth: Breakpoints.Tablet, value: 0 },
                                    { minWidth: Breakpoints.Mobile, value: 0 },
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
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.revenue_fy0,
                                undefined,
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
                                {
                                  justifyContent: 'flex-end',
                                  paddingBottom: [
                                    { minWidth: Breakpoints.Tablet, value: 0 },
                                    { minWidth: Breakpoints.Mobile, value: 0 },
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
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.revenue_ttm,
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
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                {
                                  justifyContent: 'flex-end',
                                  paddingBottom: [
                                    { minWidth: Breakpoints.Tablet, value: 0 },
                                    { minWidth: Breakpoints.Mobile, value: 0 },
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
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.revenue_fy1,
                                undefined,
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
                                {
                                  justifyContent: 'flex-end',
                                  paddingBottom: [
                                    { minWidth: Breakpoints.Tablet, value: 0 },
                                    { minWidth: Breakpoints.Mobile, value: 0 },
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
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.revenue_fy2,
                                undefined,
                                undefined
                              )}
                            </Text>
                          </TableCell>
                        </TableRow>
                        {/* Growth */}
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
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                {
                                  paddingTop: [
                                    { minWidth: Breakpoints.Tablet, value: 0 },
                                    { minWidth: Breakpoints.Mobile, value: 0 },
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
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                              suppressHighlighting={true}
                            >
                              {'Growth'}
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
                                {
                                  justifyContent: 'flex-end',
                                  paddingTop: [
                                    { minWidth: Breakpoints.Tablet, value: 0 },
                                    { minWidth: Breakpoints.Mobile, value: 0 },
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
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.growth_fy0,
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
                                {
                                  justifyContent: 'flex-end',
                                  paddingTop: [
                                    { minWidth: Breakpoints.Tablet, value: 0 },
                                    { minWidth: Breakpoints.Mobile, value: 0 },
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
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.growth_ttm,
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
                                {
                                  justifyContent: 'flex-end',
                                  paddingTop: [
                                    { minWidth: Breakpoints.Tablet, value: 0 },
                                    { minWidth: Breakpoints.Mobile, value: 0 },
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
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.growth_fy1,
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
                                {
                                  justifyContent: 'flex-end',
                                  paddingTop: [
                                    { minWidth: Breakpoints.Tablet, value: 0 },
                                    { minWidth: Breakpoints.Mobile, value: 0 },
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
                                GlobalStyles.TextStyles(theme)[
                                  'screen_title_stock'
                                ].style,
                                dimensions.width
                              )}
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.growth_fy2,
                                '%',
                                undefined
                              )}
                            </Text>
                          </TableCell>
                        </TableRow>
                        {/* ebitda */}
                        <TableRow
                          drawEndBorder={false}
                          drawTopBorder={false}
                          isTableHeader={false}
                          drawBottomBorder={false}
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
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { paddingBottom: 0 }
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
                              suppressHighlighting={true}
                            >
                              {'EBITDA'}
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
                                { justifyContent: 'flex-end', paddingBottom: 0 }
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.ebitda_fy0,
                                undefined,
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
                                { justifyContent: 'flex-end', paddingBottom: 0 }
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.ebitda_ttm,
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
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end', paddingBottom: 0 }
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.ebitda_fy1,
                                undefined,
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
                                { justifyContent: 'flex-end', paddingBottom: 0 }
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.ebitda_fy2,
                                undefined,
                                undefined
                              )}
                            </Text>
                          </TableCell>
                        </TableRow>
                        {/* ebitda_margin */}
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
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { paddingTop: 0 }
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
                              suppressHighlighting={true}
                            >
                              {'Margin'}
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
                                { justifyContent: 'flex-end', paddingTop: 0 }
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.ebitda_margin_fy0,
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
                                { justifyContent: 'flex-end', paddingTop: 0 }
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.ebitda_margin_ttm,
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
                                { justifyContent: 'flex-end', paddingTop: 0 }
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.ebitda_margin_fy1,
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
                                { justifyContent: 'flex-end', paddingTop: 0 }
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.ebitda_margin_fy2,
                                '%',
                                undefined
                              )}
                            </Text>
                          </TableCell>
                        </TableRow>
                        {/* ebit */}
                        <TableRow
                          drawEndBorder={false}
                          drawTopBorder={false}
                          isTableHeader={false}
                          drawBottomBorder={false}
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
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { paddingBottom: 0 }
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
                              suppressHighlighting={true}
                            >
                              {'EBIT'}
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
                                { justifyContent: 'flex-end', paddingBottom: 0 }
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.ebit_fy0,
                                undefined,
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
                                { justifyContent: 'flex-end', paddingBottom: 0 }
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.ebit_ttm,
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
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end', paddingBottom: 0 }
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.ebit_fy1,
                                undefined,
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
                                { justifyContent: 'flex-end', paddingBottom: 0 }
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.ebit_fy2,
                                undefined,
                                undefined
                              )}
                            </Text>
                          </TableCell>
                        </TableRow>
                        {/* ebit_margin */}
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
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { paddingTop: 0 }
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
                              suppressHighlighting={true}
                            >
                              {'Margin'}
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
                                { justifyContent: 'flex-end', paddingTop: 0 }
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.ebit_margin_fy0,
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
                                { justifyContent: 'flex-end', paddingTop: 0 }
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.ebit_margin_ttm,
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
                                { justifyContent: 'flex-end', paddingTop: 0 }
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.ebit_margin_fy1,
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
                                { justifyContent: 'flex-end', paddingTop: 0 }
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.ebit_margin_fy2,
                                '%',
                                undefined
                              )}
                            </Text>
                          </TableCell>
                        </TableRow>
                        {/* netprofit */}
                        <TableRow
                          drawEndBorder={false}
                          drawTopBorder={false}
                          isTableHeader={false}
                          drawBottomBorder={false}
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
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { paddingBottom: 0 }
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
                              suppressHighlighting={true}
                            >
                              {'Net Profit'}
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
                                { justifyContent: 'flex-end', paddingBottom: 0 }
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.np_fy0,
                                undefined,
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
                                { justifyContent: 'flex-end', paddingBottom: 0 }
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.np_ttm,
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
                            drawEndBorder={false}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { justifyContent: 'flex-end', paddingBottom: 0 }
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.np_fy1,
                                undefined,
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
                                { justifyContent: 'flex-end', paddingBottom: 0 }
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.np_fy2,
                                undefined,
                                undefined
                              )}
                            </Text>
                          </TableCell>
                        </TableRow>
                        {/* netprofit_margin */}
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
                              StyleSheet.compose(
                                GlobalStyles.TableCellStyles(theme)[
                                  'Table Cell'
                                ].style,
                                { paddingTop: 0 }
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
                              suppressHighlighting={true}
                            >
                              {'Margin'}
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
                                { justifyContent: 'flex-end', paddingTop: 0 }
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.np_margin_fy0,
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
                                { justifyContent: 'flex-end', paddingTop: 0 }
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.np_margin_ttm,
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
                                { justifyContent: 'flex-end', paddingTop: 0 }
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.np_margin_fy1,
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
                                { justifyContent: 'flex-end', paddingTop: 0 }
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.np_margin_fy2,
                                '%',
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
                            borderRadius: [
                              { minWidth: Breakpoints.Tablet, value: 0 },
                              { minWidth: Breakpoints.Mobile, value: 0 },
                            ],
                            borderWidth: [
                              { minWidth: Breakpoints.Tablet, value: 0 },
                              { minWidth: Breakpoints.Mobile, value: 0 },
                            ],
                            flex: null,
                            margin: [
                              { minWidth: Breakpoints.Tablet, value: 0 },
                              { minWidth: Breakpoints.Mobile, value: 0 },
                            ],
                            marginBottom: 10,
                            padding: [
                              { minWidth: Breakpoints.Tablet, value: 10 },
                              { minWidth: Breakpoints.Mobile, value: 10 },
                            ],
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {/* Table 3 */}
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
                              suppressHighlighting={true}
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
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)[
                                    'screen_title_stockH'
                                  ].style,
                                  { fontSize: 10 }
                                ),
                                dimensions.width
                              )}
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.fy0_end_date,
                                undefined,
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
                                'screen_title_stockH'
                              ].props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)[
                                    'screen_title_stockH'
                                  ].style,
                                  {
                                    alignSelf: 'flex-end',
                                    fontSize: 10,
                                    textAlign: 'right',
                                  }
                                ),
                                dimensions.width
                              )}
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.tt_end_date,
                                dimensions.width >= Breakpoints.Tablet
                                  ? ' (TTM)'
                                  : '\n(TTM)',
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
                                'screen_title_stockH'
                              ].props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)[
                                    'screen_title_stockH'
                                  ].style,
                                  { fontSize: 10 }
                                ),
                                dimensions.width
                              )}
                              suppressHighlighting={true}
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
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)[
                                    'screen_title_stockH'
                                  ].style,
                                  { fontSize: 10 }
                                ),
                                dimensions.width
                              )}
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.fy2_end_date,
                                'E',
                                undefined
                              )}
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
                              suppressHighlighting={true}
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
                              suppressHighlighting={true}
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
                              suppressHighlighting={true}
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
                              suppressHighlighting={true}
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
                              suppressHighlighting={true}
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
                              suppressHighlighting={true}
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
                              suppressHighlighting={true}
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
                              suppressHighlighting={true}
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
                              suppressHighlighting={true}
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
                              suppressHighlighting={true}
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
                              suppressHighlighting={true}
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.ev_ebit_fy0,
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.ev_ebit_ttm,
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.ev_ebit_fy1,
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(
                                fetchData?.ev_ebit_fy2,
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
                              suppressHighlighting={true}
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(fetchData?.pe_fy0, 'x', true)}
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(fetchData?.pe_ttm, 'x', true)}
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(fetchData?.pe_fy1, 'x', true)}
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
                              suppressHighlighting={true}
                            >
                              {transformNumber(fetchData?.pe_fy2, 'x', true)}
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
      </XanoCollectionApi.FetchGetOneStockGET>
      <Modal
        animationType={'none'}
        supportedOrientations={['portrait', 'landscape']}
        presentationStyle={'pageSheet'}
        transparent={true}
        visible={showModal}
      >
        {/* Fetch 2 */}
        <XanoCollectionApi.FetchGetPeersListGET
          handlers={{
            on2xx: fetch2Data => {
              try {
                setPeerGroupList(fetch2Data?.json);
              } catch (err) {
                console.error(err);
              }
            },
            onData: fetch2Data => {
              try {
                /* hidden 'Set Variable' action */
                console.log(fetch2Data);
              } catch (err) {
                console.error(err);
              }
            },
          }}
        >
          {({ loading, error, data, refetchGetPeersList }) => {
            const fetch2Data = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <>
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
                      zIndex: { minWidth: Breakpoints.Desktop, value: 10 },
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
                        minHeight: 300,
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
                                textAlign: 'left',
                              }
                            ),
                            dimensions.width
                          )}
                          suppressHighlighting={true}
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
                                    paddingLeft: 0,
                                    paddingRight: 20,
                                    textAlign: [
                                      {
                                        minWidth: Breakpoints.Desktop,
                                        value: 'left',
                                      },
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: 'left',
                                      },
                                    ],
                                  }
                                ),
                                dimensions.width
                              )}
                              suppressHighlighting={true}
                            >
                              {'add to the following peer group'}
                            </Text>

                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: [
                                    {
                                      minWidth: Breakpoints.BigScreen,
                                      value: 'center',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: 'center',
                                    },
                                  ],
                                  flexDirection: 'row',
                                  gap: 8,
                                  justifyContent: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: 'space-between',
                                    },
                                    {
                                      minWidth: Breakpoints.Desktop,
                                      value: 'flex-start',
                                    },
                                    {
                                      minWidth: Breakpoints.Tablet,
                                      value: 'space-between',
                                    },
                                    {
                                      minWidth: Breakpoints.BigScreen,
                                      value: 'flex-start',
                                    },
                                  ],
                                  width: {
                                    minWidth: Breakpoints.BigScreen,
                                    value: '100%',
                                  },
                                },
                                dimensions.width
                              )}
                            >
                              <TextInput
                                autoCapitalize={'none'}
                                autoCorrect={true}
                                changeTextDelay={500}
                                onBlur={() => {
                                  const handler = async () => {
                                    try {
                                      await waitUtil({ milliseconds: 1000 });
                                      setShowDropdown(false);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  };
                                  handler();
                                }}
                                onChangeText={newTextInputValue => {
                                  const handler = async () => {
                                    try {
                                      setPeerQueryRaw(newTextInputValue);
                                      const newData = (
                                        await XanoCollectionApi.getPeersListGET(
                                          Constants,
                                          { query: newTextInputValue }
                                        )
                                      )?.json;
                                      setPeerGroupList(newData);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  };
                                  handler();
                                }}
                                onFocus={() => {
                                  try {
                                    setShowDropdown(true);
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                                onSubmitEditing={() => {
                                  try {
                                    /* hidden 'Set Variable' action */
                                    /* hidden 'Refetch Data' action */
                                    /* hidden 'API Request' action */
                                    /* hidden 'Set Variable' action */
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                                {...GlobalStyles.TextInputStyles(theme)[
                                  'peerTextInput'
                                ].props}
                                clearButtonMode={'while-editing'}
                                placeholder={'Search for existing peer'}
                                style={StyleSheet.applyWidth(
                                  GlobalStyles.TextInputStyles(theme)[
                                    'peerTextInput'
                                  ].style,
                                  dimensions.width
                                )}
                                value={peerQueryRaw}
                                webShowOutline={false}
                              />
                              <>
                                {!showDropdown ? null : (
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        backgroundColor: palettes.Brand.Surface,
                                        borderBottomLeftRadius: 10,
                                        borderBottomRightRadius: 10,
                                        flex: 1,
                                        position: 'absolute',
                                        top: 40,
                                        width: '60%',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    <SimpleStyleFlatList
                                      data={peerGroupList}
                                      horizontal={false}
                                      inverted={false}
                                      keyExtractor={(listData, index) =>
                                        listData?.id
                                      }
                                      keyboardShouldPersistTaps={'never'}
                                      listKey={'pMFeLWae'}
                                      nestedScrollEnabled={false}
                                      numColumns={1}
                                      onEndReachedThreshold={0.5}
                                      renderItem={({ item, index }) => {
                                        const listData = item;
                                        return (
                                          <Pressable
                                            onPress={() => {
                                              try {
                                                /* hidden 'Log to Console' action */
                                                setPeerQueryRaw(
                                                  listData?.title
                                                );
                                                setShowDropdown(false);
                                                setSelectedPeerGroupID(
                                                  listData?.id
                                                );
                                              } catch (err) {
                                                console.error(err);
                                              }
                                            }}
                                          >
                                            <View
                                              style={StyleSheet.applyWidth(
                                                { zIndex: 12 },
                                                dimensions.width
                                              )}
                                            >
                                              <Text
                                                accessible={true}
                                                {...GlobalStyles.TextStyles(
                                                  theme
                                                )['screen_title_stockH'].props}
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(
                                                    GlobalStyles.TextStyles(
                                                      theme
                                                    )['screen_title_stockH']
                                                      .style,
                                                    {
                                                      color:
                                                        theme.colors.text
                                                          .strong,
                                                    }
                                                  ),
                                                  dimensions.width
                                                )}
                                                suppressHighlighting={true}
                                              >
                                                {listData?.title}
                                              </Text>
                                            </View>
                                          </Pressable>
                                        );
                                      }}
                                      showsHorizontalScrollIndicator={false}
                                      showsVerticalScrollIndicator={false}
                                      style={StyleSheet.applyWidth(
                                        { padding: 3 },
                                        dimensions.width
                                      )}
                                    />
                                  </View>
                                )}
                              </>
                              {/* Button 2 */}
                              <Button
                                iconPosition={'left'}
                                onPress={() => {
                                  const handler = async () => {
                                    try {
                                      setLoading_button('add');
                                      /* hidden 'Run a Custom Function' action */
                                      const newData = (
                                        await xanoCollectionUpdatePeerGroupPATCH.mutateAsync(
                                          {
                                            device: 'ios',
                                            peer_id: selectedPeerGroupID,
                                            stocksList: [
                                              props.route?.params?.stock_id ??
                                                defaultProps.stock_id,
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
                                disabled={!selectedPeerGroupID}
                                loading={loading_button === 'add'}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.ButtonStyles(theme)['Button']
                                      .style,
                                    {
                                      backgroundColor: palettes.App.Orange,
                                      fontFamily: 'Quicksand_500Medium',
                                      height: {
                                        minWidth: Breakpoints.Tablet,
                                        value: '80%',
                                      },
                                      overflow: 'hidden',
                                      textTransform: 'uppercase',
                                      width: [
                                        {
                                          minWidth: Breakpoints.Desktop,
                                          value: '37%',
                                        },
                                        {
                                          minWidth: Breakpoints.Tablet,
                                          value: '37%',
                                        },
                                        {
                                          minWidth: Breakpoints.Mobile,
                                          value: '37%',
                                        },
                                      ],
                                    }
                                  ),
                                  dimensions.width
                                )}
                                title={'add'}
                              />
                            </View>
                            <>
                              {!(selectedPeerGroupID > 0) ? null : (
                                <Link
                                  accessible={true}
                                  onPress={() => {
                                    try {
                                      setSelectedPeerGroupID(0);
                                      setPeerQueryRaw('');
                                      setShowDropdown(false);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  {...GlobalStyles.LinkStyles(theme)['Link']
                                    .props}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.LinkStyles(theme)['Link']
                                        .style,
                                      {
                                        color: palettes.App.Orange,
                                        fontFamily: 'Quicksand_500Medium',
                                        marginTop: 5,
                                        paddingTop: 0,
                                        textAlign: 'left',
                                        textDecorationLine: 'underline',
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                  title={'Clear'}
                                />
                              )}
                            </>
                            {/* Text 2 */}
                            <>
                              {showDropdown ? null : (
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
                                        color: palettes.Brand['Strong Inverse'],
                                        fontFamily: 'Quicksand_400Regular',
                                        marginTop: 20,
                                        padding: 10,
                                        paddingLeft: [
                                          {
                                            minWidth: Breakpoints.Mobile,
                                            value: 0,
                                          },
                                          {
                                            minWidth: Breakpoints.Tablet,
                                            value: 0,
                                          },
                                        ],
                                        paddingRight: 20,
                                        textAlign: [
                                          {
                                            minWidth: Breakpoints.Tablet,
                                            value: 'left',
                                          },
                                          {
                                            minWidth: Breakpoints.Mobile,
                                            value: 'left',
                                          },
                                        ],
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                  suppressHighlighting={true}
                                >
                                  {'...or create and add to a new peer group'}
                                </Text>
                              )}
                            </>
                            {/* View 2 */}
                            <>
                              {showDropdown ? null : (
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
                                    {...GlobalStyles.TextInputStyles(theme)[
                                      'peerTextInput'
                                    ].props}
                                    clearButtonMode={'while-editing'}
                                    disabled={selectedPeerGroupID > 0}
                                    placeholder={'Peer group name...'}
                                    style={StyleSheet.applyWidth(
                                      GlobalStyles.TextInputStyles(theme)[
                                        'peerTextInput'
                                      ].style,
                                      dimensions.width
                                    )}
                                    value={newPeerGroup}
                                    webShowOutline={false}
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
                                                device: 'ios',
                                                stocks: [].concat([
                                                  props.route?.params
                                                    ?.stock_id ??
                                                    defaultProps.stock_id,
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
                                    {...GlobalStyles.ButtonStyles(theme)[
                                      'Button'
                                    ].props}
                                    disabled={!newPeerGroup}
                                    loading={loading_button === 'create'}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.ButtonStyles(theme)[
                                          'Button'
                                        ].style,
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
                              )}
                            </>
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
                              suppressHighlighting={true}
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
                              suppressHighlighting={true}
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
              </>
            );
          }}
        </XanoCollectionApi.FetchGetPeersListGET>
      </Modal>
      <CustomBottomNavBlock />
    </ScreenContainer>
  );
};

export default withTheme(StockDetailsScreen);
