import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import CustomHeaderBlock from '../components/CustomHeaderBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import removeGlobalScroll from '../global-functions/removeGlobalScroll';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as DateUtils from '../utils/DateUtils';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  HStack,
  Link,
  ScreenContainer,
  SimpleStyleFlatList,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { H5 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import { ActivityIndicator, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const ReportsScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [lastPage, setLastPage] = React.useState(0);
  const [nextPage, setNextPage] = React.useState(parseInt(1, 10));
  const [reportItems, setReportItems] = React.useState([]);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
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
      hasLeftSafeArea={true}
    >
      <CustomHeaderBlock />
      <View
        style={StyleSheet.applyWidth(
          { maxWidth: 1200, padding: 10, paddingTop: 5, width: '100%' },
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
          >
            {
              'Our monthly advisor reports and rankings as well as periodic and ad-hoc special reports.'
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
          >
            {
              'Note: the weekly reports with opportunity-related headlines from a given week are found in the “Newsletters” tab.'
            }
          </Text>
        </View>
      </View>

      <XanoCollectionApi.FetchReportsGET
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
            <>
              {/* View 2 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: theme.colors.foreground.brand,
                    maxWidth: 1200,
                    padding: 5,
                    width: '100%',
                  },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flexDirection: 'row' },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      { padding: 2, paddingRight: 5, width: 100 },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
                          { fontFamily: 'Quicksand_600SemiBold' }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Published'}
                    </Text>
                  </View>
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      { padding: 2, paddingLeft: 5 },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
                          { fontFamily: 'Quicksand_600SemiBold' }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Title (PDF download)'}
                    </Text>
                  </View>
                </View>
                {/* View 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flexDirection: 'row' },
                    dimensions.width
                  )}
                >
                  <SimpleStyleFlatList
                    data={reportItems}
                    horizontal={false}
                    inverted={false}
                    keyExtractor={(listData, index) => index}
                    keyboardShouldPersistTaps={'never'}
                    listKey={'Vmku37z4'}
                    nestedScrollEnabled={false}
                    numColumns={1}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item, index }) => {
                      const listData = item;
                      return (
                        <>
                          <HStack
                            {...GlobalStyles.HStackStyles(theme)['H Stack']
                              .props}
                            style={StyleSheet.applyWidth(
                              GlobalStyles.HStackStyles(theme)['H Stack'].style,
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                { padding: 2, paddingRight: 5, width: 100 },
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
                                    { fontFamily: 'Quicksand_400Regular' }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {DateUtils.format(
                                  listData?.published,
                                  'dd/MM/yyyy'
                                )}
                              </Text>
                            </View>
                            {/* View 2 */}
                            <View
                              style={StyleSheet.applyWidth(
                                { padding: 2, paddingLeft: 5 },
                                dimensions.width
                              )}
                            >
                              <Touchable
                                onPress={() => {
                                  const handler = async () => {
                                    try {
                                      await WebBrowser.openBrowserAsync(
                                        `${listData?.file?.url}`
                                      );
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  };
                                  handler();
                                }}
                              >
                                <Text
                                  accessible={true}
                                  {...GlobalStyles.TextStyles(theme)[
                                    'screen_title'
                                  ].props}
                                  adjustsFontSizeToFit={true}
                                  numberOfLines={2}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.TextStyles(theme)[
                                        'screen_title'
                                      ].style,
                                      {
                                        color: [
                                          {
                                            minWidth: Breakpoints.Laptop,
                                            value:
                                              theme.colors.branding.primary,
                                          },
                                          {
                                            minWidth: Breakpoints.Mobile,
                                            value:
                                              theme.colors.branding.primary,
                                          },
                                        ],
                                        fontFamily: 'Quicksand_400Regular',
                                        textDecorationLine: [
                                          {
                                            minWidth: Breakpoints.Laptop,
                                            value: 'underline',
                                          },
                                          {
                                            minWidth: Breakpoints.Mobile,
                                            value: 'underline',
                                          },
                                        ],
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                  textBreakStrategy={'simple'}
                                >
                                  {listData?.title}
                                </Text>
                              </Touchable>
                            </View>
                          </HStack>
                        </>
                      );
                    }}
                    showsHorizontalScrollIndicator={true}
                    showsVerticalScrollIndicator={true}
                  />
                </View>
              </View>
            </>
          );
        }}
      </XanoCollectionApi.FetchReportsGET>
    </ScreenContainer>
  );
};

export default withTheme(ReportsScreen);
