import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import AccModalBlock from '../components/AccModalBlock';
import TopNavBlock from '../components/TopNavBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import assessAccess from '../global-functions/assessAccess';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  LinearGradient,
  Link,
  Pressable,
  ScreenContainer,
  SimpleStyleFlashList,
  SimpleStyleMasonryFlashList,
  Table,
  TableCell,
  TableRow,
  withTheme,
} from '@draftbit/ui';
import { H4, H5 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const NewslewttersScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
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
      hasLeftSafeArea={false}
      hasRightSafeArea={false}
      scrollable={true}
    >
      <H5
        selectable={false}
        {...GlobalStyles.H5Styles(theme)['H5'].props}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.H5Styles(theme)['H5'].style, {
            fontFamily: 'Quicksand_600SemiBold',
            fontSize: 25,
            marginLeft: 20,
          }),
          dimensions.width
        )}
      >
        {'Newsletters'}
      </H5>

      <Text
        accessible={true}
        {...GlobalStyles.TextStyles(theme)['screen_title'].props}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.TextStyles(theme)['screen_title'].style,
            {
              fontFamily: 'Quicksand_400Regular',
              marginLeft: 20,
              marginRight: 20,
            }
          ),
          dimensions.width
        )}
      >
        {
          'Released weekdays at 8.30 AM - enable notifications to get notified on release.'
        }
      </Text>

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
            <View
              style={StyleSheet.applyWidth({ margin: 10 }, dimensions.width)}
            >
              <SimpleStyleFlashList
                data={fetchData}
                estimatedItemSize={50}
                inverted={false}
                keyExtractor={(flashListData, index) => flashListData?.id}
                listKey={'JLhKN5ob'}
                onEndReachedThreshold={0.5}
                renderItem={({ item, index }) => {
                  const flashListData = item;
                  return (
                    <LinearGradient
                      color2={theme.colors.secondary}
                      endX={100}
                      endY={100}
                      startX={0}
                      startY={0}
                      {...GlobalStyles.LinearGradientStyles(theme)[
                        'Linear Gradient'
                      ].props}
                      color1={theme.colors['Surface']}
                      color3={theme.colors['Surface']}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.LinearGradientStyles(theme)[
                            'Linear Gradient'
                          ].style,
                          {
                            borderColor: theme.colors['Light'],
                            borderRadius: 10,
                            borderWidth: 1,
                            margin: 5,
                            opacity: 1,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      <Pressable
                        onPress={() => {
                          try {
                            /* hidden 'Log to Console' action */
                            if ((flashListData?.title).includes('Nordic')) {
                              navigation.push('NordicNewsletterDetailsScreen', {
                                news_id: flashListData?.id,
                              });
                            } else {
                              navigation.navigate(
                                'DACHNewsletterDetailsScreen',
                                { news_id: flashListData?.id }
                              );
                            }
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { padding: 5 },
                            dimensions.width
                          )}
                        >
                          <H4
                            selectable={false}
                            {...GlobalStyles.H4Styles(theme)['H4'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.H4Styles(theme)['H4'].style,
                                { marginBottom: 0, marginTop: 0 }
                              ),
                              dimensions.width
                            )}
                          >
                            {flashListData?.title}
                          </H4>

                          <H5
                            selectable={false}
                            {...GlobalStyles.H5Styles(theme)['H5'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.H5Styles(theme)['H5'].style,
                                { marginTop: 0 }
                              ),
                              dimensions.width
                            )}
                          >
                            {'PoTD: '}
                            {flashListData?._potd?.target}
                          </H5>

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
                numColumns={2}
                style={StyleSheet.applyWidth({ margin: 10 }, dimensions.width)}
              />
            </View>
          );
        }}
      </XanoCollectionApi.FetchNewslettersGET>
      <>{!Constants['acc_pressed'] ? null : <AccModalBlock />}</>
      <>{!Constants['top_nav_pressed'] ? null : <TopNavBlock />}</>
    </ScreenContainer>
  );
};

export default withTheme(NewslewttersScreen);
