import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import assessAccess from '../global-functions/assessAccess';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  LinearGradient,
  Link,
  Pressable,
  ScreenContainer,
  SimpleStyleFlashList,
  Table,
  TableCell,
  TableRow,
  withTheme,
} from '@draftbit/ui';
import { H4, H5 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const NewslettersDraftbitSupportScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [keywordSearch, setKeywordSearch] = React.useState('');
  const isFocused = useIsFocused();
  React.useEffect(() => {
    console.log('Screen ON_SCREEN_FOCUS Start');
    let error = null;
    try {
      if (!isFocused) {
        return;
      }
      console.log('Start ON_SCREEN_FOCUS:0 CONSOLE_LOG');
      /* hidden 'Log to Console' action */ console.log(
        'Complete ON_SCREEN_FOCUS:0 CONSOLE_LOG'
      );
      console.log('Start ON_SCREEN_FOCUS:1 CONSOLE_LOG');
      /* hidden 'Log to Console' action */ console.log(
        'Complete ON_SCREEN_FOCUS:1 CONSOLE_LOG'
      );
      console.log('Start ON_SCREEN_FOCUS:2 CONDITIONAL_STOP');
      if (assessAccess(Variables, setGlobalVariableValue) === true) {
        return console.log('Complete ON_SCREEN_FOCUS:2 CONDITIONAL_STOP');
      } else {
        console.log(
          'Skipped ON_SCREEN_FOCUS:2 CONDITIONAL_STOP: condition not met'
        );
      }
      console.log('Start ON_SCREEN_FOCUS:3 NAVIGATE');
      navigation.navigate('LogInScreen');
      console.log('Complete ON_SCREEN_FOCUS:3 NAVIGATE');
    } catch (err) {
      console.error(err);
      error = err.message ?? err;
    }
    console.log(
      'Screen ON_SCREEN_FOCUS Complete',
      error ? { error } : 'no error'
    );
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={false}
      hasLeftSafeArea={true}
      hasRightSafeArea={true}
      scrollable={true}
    >
      <XanoCollectionApi.FetchNewslettersGET refetchInterval={300000}>
        {({ loading, error, data, refetchNewsletters }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <View>
              <SimpleStyleFlashList
                data={fetchData}
                estimatedItemSize={50}
                inverted={false}
                keyExtractor={(flashListData, index) =>
                  flashListData?.id ??
                  flashListData?.uuid ??
                  index?.toString() ??
                  JSON.stringify(flashListData)
                }
                listKey={'HEXECyrh'}
                onEndReachedThreshold={0.5}
                renderItem={({ item, index }) => {
                  const flashListData = item;
                  return (
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
                            borderColor: theme.colors.text.strong,
                            borderRadius: 5,
                            flexDirection: 'column',
                            padding: 0,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      <Pressable
                        onPress={() => {
                          try {
                            navigation.navigate('NewsletterDetailsScreen', {
                              news_id: flashListData?.id,
                            });
                            /* hidden 'Log to Console' action */
                            /* hidden 'If/Else' action */
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        style={StyleSheet.applyWidth(
                          {
                            width: {
                              minWidth: Breakpoints.Laptop,
                              value: '100%',
                            },
                          },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              flexDirection: 'column',
                              flexWrap: 'wrap',
                              justifyContent: 'space-between',
                              minHeight: 154,
                              padding: 5,
                            },
                            dimensions.width
                          )}
                        >
                          <H4
                            selectable={false}
                            {...GlobalStyles.H4Styles(theme)['H4'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.H4Styles(theme)['H4'].style,
                                {
                                  color: palettes.Brand['Strong Inverse'],
                                  fontSize: 14,
                                  marginBottom: 0,
                                  marginTop: 0,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {flashListData?.title}
                          </H4>
                          {/* Subtitle */}
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['screen_title']
                              .props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['screen_title']
                                  .style,
                                {
                                  alignSelf: 'flex-start',
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_400Regular',
                                  marginBottom: 20,
                                }
                              ),
                              dimensions.width
                            )}
                            textBreakStrategy={'highQuality'}
                          >
                            {'PoTD: '}
                            {flashListData?._potd?.target}
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
                                  flex: 1,
                                  fontSize: 12,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {'Stories: '}
                            {flashListData?.total_stories}
                            {'\nOpportunities: '}
                            {flashListData?.opportunities}
                            {'\nTransactional: '}
                            {flashListData?.transactional}
                          </Text>
                        </View>
                      </Pressable>
                    </LinearGradient>
                  );
                }}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
                horizontal={false}
                numColumns={
                  (dimensions.width >= Breakpoints.Desktop
                    ? 6
                    : dimensions.width >= Breakpoints.Tablet
                    ? 4
                    : 2) ?? 2
                }
                style={StyleSheet.applyWidth(
                  { paddingLeft: 10, paddingRight: 10 },
                  dimensions.width
                )}
              />
            </View>
          );
        }}
      </XanoCollectionApi.FetchNewslettersGET>
    </ScreenContainer>
  );
};

export default withTheme(NewslettersDraftbitSupportScreen);
