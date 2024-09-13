import React from 'react';
import {
  LinearGradient,
  Link,
  ScreenContainer,
  Table,
  TableCell,
  TableRow,
  withTheme,
} from '@draftbit/ui';
import { H5 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import { ActivityIndicator, Platform, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import CustomBottomNavBlock from '../components/CustomBottomNavBlock';
import CustomHeaderBlock from '../components/CustomHeaderBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import deviceType from '../global-functions/deviceType';
import removeGlobalScroll from '../global-functions/removeGlobalScroll';
import screenNameGen from '../global-functions/screenNameGen';
import setPadding from '../global-functions/setPadding';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as DateUtils from '../utils/DateUtils';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const ReportsScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [lastPage, setLastPage] = React.useState(0);
  const [nextPage, setNextPage] = React.useState(parseInt(1, 10));
  const [reportItems, setReportItems] = React.useState([]);
  const [screenCode, setScreenCode] = React.useState('');
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      setGlobalVariableValue({
        key: 'SS_SCREEN_NAME',
        value: null,
      });
      setScreenCode(screenNameGen());
      const Reports = setGlobalVariableValue({
        key: 'pageName',
        value: 'Reports',
      });
      removeGlobalScroll();
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasLeftSafeArea={false}
      hasRightSafeArea={false}
      hasTopSafeArea={true}
    >
      <CustomHeaderBlock />
      {/* View 2 */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignSelf: { minWidth: Breakpoints.Desktop, value: 'center' },
            width: '100%',
          },
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              alignSelf: { minWidth: Breakpoints.Desktop, value: 'center' },
              maxWidth: 1200,
              padding: 10,
              paddingTop: 5,
              width: '100%',
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
                  StyleSheet.compose(GlobalStyles.H5Styles(theme)['H5'].style, {
                    fontFamily: 'Quicksand_600SemiBold',
                    fontSize: 25,
                    marginBottom: 20,
                    marginTop: [
                      { minWidth: Breakpoints.Mobile, value: 0 },
                      { minWidth: Breakpoints.Laptop, value: 20 },
                    ],
                    paddingLeft: 5,
                    textDecorationLine: 'none',
                  }),
                  dimensions.width
                )}
              >
                {'Reports'}
              </H5>
            )}
          </>
          <View
            style={StyleSheet.applyWidth(
              { gap: 10, marginBottom: 10 },
              dimensions.width
            )}
          >
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
              {
                'Repository of the Monthly Advisor Report, Quarterly Survey Report, and other special reports'
              }
            </Text>
            {/* Text 2 */}
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
              {
                'Note: the weekly reports with opportunity-related headlines from a given week are found in the “Newsletters” tab.'
              }
            </Text>
          </View>
        </View>

        <XanoCollectionApi.FetchReportsGET
          device={deviceType(
            Platform.OS === 'web',
            Platform.OS === 'ios',
            Platform.OS === 'android'
          )}
          handlers={{
            onData: fetchData => {
              try {
                setReportItems(fetchData?.items);
                setNextPage(fetchData?.nextPage);
                setLastPage(fetchData?.pageTotal);
                console.log(fetchData);
              } catch (err) {
                console.error(err);
              }
            },
          }}
          page={1}
          screenCode={screenCode}
        >
          {({ loading, error, data, refetchReports }) => {
            const fetchData = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <View
                style={StyleSheet.applyWidth(
                  {
                    paddingLeft: {
                      minWidth: Breakpoints.Desktop,
                      value: setPadding(dimensions.width),
                    },
                    paddingRight: {
                      minWidth: Breakpoints.Desktop,
                      value: setPadding(dimensions.width),
                    },
                    width: { minWidth: Breakpoints.Desktop, value: '100%' },
                  },
                  dimensions.width
                )}
              >
                {/* Reports */}
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
                    cellHorizontalPadding={10}
                    cellVerticalPadding={10}
                    data={reportItems}
                    drawBottomBorder={false}
                    drawEndBorder={false}
                    drawStartBorder={false}
                    keyExtractor={(tableData, index) =>
                      tableData?.id ??
                      tableData?.uuid ??
                      index?.toString() ??
                      JSON.stringify(tableData)
                    }
                    listKey={'It6pLxEO'}
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
                                StyleSheet.compose(
                                  GlobalStyles.TableCellStyles(theme)[
                                    'Table Cell'
                                  ].style,
                                  { alignItems: 'flex-start', width: '20%' }
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
                                suppressHighlighting={true}
                              >
                                {' Published'}
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
                                    flex: 2,
                                    justifyContent: 'flex-start',
                                    width: '80%',
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
                                suppressHighlighting={true}
                              >
                                {'Title (PDF download)'}
                              </Text>
                            </TableCell>
                          </TableRow>
                          {/* reports */}
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
                                suppressHighlighting={true}
                              >
                                {DateUtils.format(
                                  tableData?.published,
                                  'dd/MM/yyyy'
                                )}
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
                                    flex: 2,
                                    flexWrap: 'wrap',
                                    justifyContent: 'flex-start',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              <Link
                                accessible={true}
                                onPress={() => {
                                  const handler = async () => {
                                    try {
                                      await WebBrowser.openBrowserAsync(
                                        `${tableData?.file?.url}`
                                      );
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  };
                                  handler();
                                }}
                                {...GlobalStyles.LinkStyles(theme)['Link']
                                  .props}
                                adjustsFontSizeToFit={true}
                                ellipsizeMode={'clip'}
                                numberOfLines={1}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.LinkStyles(theme)['Link']
                                      .style,
                                    {
                                      color: palettes.App.Orange,
                                      textDecorationLine: 'underline',
                                    }
                                  ),
                                  dimensions.width
                                )}
                                title={`${tableData?.title?.name}`}
                              />
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    }}
                    showsVerticalScrollIndicator={true}
                    {...GlobalStyles.TableStyles(theme)['Table'].props}
                    drawTopBorder={false}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TableStyles(theme)['Table'].style,
                        { flex: null }
                      ),
                      dimensions.width
                    )}
                  />
                </LinearGradient>
              </View>
            );
          }}
        </XanoCollectionApi.FetchReportsGET>
      </View>
      <CustomBottomNavBlock />
    </ScreenContainer>
  );
};

export default withTheme(ReportsScreen);
