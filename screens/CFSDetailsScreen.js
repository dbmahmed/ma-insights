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
  LinearGradient,
  ScreenContainer,
  WebView,
  withTheme,
} from '@draftbit/ui';
import { H3 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const CFSDetailsScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      setGlobalVariableValue({
        key: 'pageName',
        value: 'Company For Sale Details',
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
      <XanoCollectionApi.FetchGetOneCFSGET
        cfs_id={props.route?.params?.cfs_id ?? 1}
      >
        {({ loading, error, data, refetchGetOneCFS }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <View
              style={StyleSheet.applyWidth({ padding: 10 }, dimensions.width)}
            >
              <LinearGradient
                endX={100}
                endY={100}
                startX={0}
                startY={0}
                {...GlobalStyles.LinearGradientStyles(theme)['Linear Gradient']
                  .props}
                color1={theme.colors.text.strong}
                color2={theme.colors.branding.primary}
                color3={null}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.LinearGradientStyles(theme)['Linear Gradient']
                      .style,
                    {
                      borderColor: null,
                      borderRadius: 8,
                      borderWidth: null,
                      gap: 8,
                      margin: null,
                      marginBottom: 20,
                      maxWidth: 400,
                      padding: 10,
                      width: '100%',
                    }
                  ),
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    { flexDirection: 'row', gap: 8 },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      { width: 100 },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
                          {
                            color: palettes.Brand['Strong Inverse'],
                            fontFamily: 'Quicksand_500Medium',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Target:'}
                    </Text>
                  </View>

                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['screen_title'].style,
                        {
                          color: palettes.Brand['Strong Inverse'],
                          fontFamily: 'Quicksand_500Medium',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {fetchData?.company}
                  </Text>
                </View>
                {/* View 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    { flexDirection: 'row', gap: 8 },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      { width: 100 },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
                          {
                            color: palettes.Brand['Strong Inverse'],
                            fontFamily: 'Quicksand_500Medium',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Advisor:'}
                    </Text>
                  </View>

                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['screen_title'].style,
                        {
                          color: palettes.Brand['Strong Inverse'],
                          fontFamily: 'Quicksand_500Medium',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {fetchData?._advisor?.name}
                  </Text>
                </View>
                {/* View 3 */}
                <View
                  style={StyleSheet.applyWidth(
                    { flexDirection: 'row', gap: 8 },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      { width: 100 },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
                          {
                            color: palettes.Brand['Strong Inverse'],
                            fontFamily: 'Quicksand_500Medium',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Stage:'}
                    </Text>
                  </View>

                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['screen_title'].style,
                        {
                          color: palettes.Brand['Strong Inverse'],
                          fontFamily: 'Quicksand_500Medium',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {fetchData?.stage}
                  </Text>
                </View>
                {/* View 4 */}
                <View
                  style={StyleSheet.applyWidth(
                    { flexDirection: 'row', gap: 8 },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      { width: 100 },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
                          {
                            color: palettes.Brand['Strong Inverse'],
                            fontFamily: 'Quicksand_500Medium',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Revenue:'}
                    </Text>
                  </View>

                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['screen_title'].style,
                        {
                          color: palettes.Brand['Strong Inverse'],
                          fontFamily: 'Quicksand_500Medium',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'€ '}
                    {fetchData?.revenue}
                  </Text>
                </View>
                {/* View 5 */}
                <View
                  style={StyleSheet.applyWidth(
                    { flexDirection: 'row', gap: 8 },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      { width: 100 },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
                          {
                            color: palettes.Brand['Strong Inverse'],
                            fontFamily: 'Quicksand_500Medium',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'EBITDA:'}
                    </Text>
                  </View>

                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['screen_title'].style,
                        {
                          color: palettes.Brand['Strong Inverse'],
                          fontFamily: 'Quicksand_500Medium',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'€ '}
                    {fetchData?.ebitda}
                  </Text>
                </View>
                {/* View 6 */}
                <View
                  style={StyleSheet.applyWidth(
                    { flexDirection: 'row', gap: 8 },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      { width: 100 },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
                          {
                            color: palettes.Brand['Strong Inverse'],
                            fontFamily: 'Quicksand_500Medium',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Fiscal year:'}
                    </Text>
                  </View>

                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['screen_title'].style,
                        {
                          color: palettes.Brand['Strong Inverse'],
                          fontFamily: 'Quicksand_500Medium',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {fetchData?.fy_end}
                  </Text>
                </View>
                {/* View 7 */}
                <View
                  style={StyleSheet.applyWidth(
                    { flexDirection: 'row', gap: 8 },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      { width: 100 },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
                          {
                            color: palettes.Brand['Strong Inverse'],
                            fontFamily: 'Quicksand_500Medium',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'GICS:'}
                    </Text>
                  </View>

                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['screen_title'].style,
                        {
                          color: palettes.Brand['Strong Inverse'],
                          fontFamily: 'Quicksand_500Medium',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {fetchData?._gics?.GICS_Industry}
                  </Text>
                </View>
                {/* View 8 */}
                <View
                  style={StyleSheet.applyWidth(
                    { flexDirection: 'row', gap: 8 },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      { width: 100 },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
                          {
                            color: palettes.Brand['Strong Inverse'],
                            fontFamily: 'Quicksand_500Medium',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Country:'}
                    </Text>
                  </View>

                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['screen_title'].style,
                        {
                          color: palettes.Brand['Strong Inverse'],
                          fontFamily: 'Quicksand_500Medium',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {fetchData?.country}
                  </Text>
                </View>
              </LinearGradient>

              <H3
                selectable={false}
                {...GlobalStyles.H3Styles(theme)['H3'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.H3Styles(theme)['H3'].style, {
                    fontFamily: 'Quicksand_700Bold',
                    fontSize: 20,
                    marginTop: 0,
                  }),
                  dimensions.width
                )}
              >
                {fetchData?._event?.headline}
              </H3>

              <Text
                accessible={true}
                {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['screen_title'].style,
                    {
                      color: palettes.App.green,
                      fontFamily: 'Quicksand_400Regular',
                      fontSize: 12,
                      marginBottom: 20,
                    }
                  ),
                  dimensions.width
                )}
              >
                {fetchData?._event?.created_at}
                {' ('}
                {fetchData?._event?.source}
                {')'}
              </Text>
              <WebView
                allowFileAccessFromFileURLs={false}
                allowUniversalAccessFromFileURLs={false}
                cacheEnabled={true}
                incognito={false}
                javaScriptCanOpenWindowsAutomatically={false}
                javaScriptEnabled={true}
                mediaPlaybackRequiresUserAction={false}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
                startInLoadingState={false}
                {...GlobalStyles.WebViewStyles(theme)['HTML View'].props}
                source={{ html: `${fetchData?._event?.description}` }}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.WebViewStyles(theme)['HTML View'].style,
                    { flex: 0, height: 300 }
                  ),
                  dimensions.width
                )}
              />
            </View>
          );
        }}
      </XanoCollectionApi.FetchGetOneCFSGET>
    </ScreenContainer>
  );
};

export default withTheme(CFSDetailsScreen);
