import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import CustomHeaderBlock from '../components/CustomHeaderBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import assessAccess from '../global-functions/assessAccess';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  LinearGradient,
  ScreenContainer,
  Shadow,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  withTheme,
} from '@draftbit/ui';
import { H1, H3 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const NewsletterDetailsScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [has_access, setHas_access] = React.useState(true);
  const [nordic_nl_section_1, setNordic_nl_section_1] = React.useState(
    'nordic_nl_section_1'
  );
  const [nordic_nl_section_2, setNordic_nl_section_2] = React.useState(
    'nordic_nl_section_2'
  );
  const [nordic_nl_section_3, setNordic_nl_section_3] = React.useState(
    'nordic_nl_section_3'
  );
  const [nordic_nl_section_4, setNordic_nl_section_4] = React.useState(
    'nordic_nl_section_4'
  );
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      if (assessAccess(Variables, setGlobalVariableValue) === true) {
        return;
      }
      navigation.push('LogInScreen');
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={false}
      hasLeftSafeArea={true}
      hasRightSafeArea={true}
      scrollable={false}
    >
      <CustomHeaderBlock />
      <XanoCollectionApi.FetchNewsletterEachGET
        handlers={{
          on4xx: fetchData => {
            console.log('Fetch ON_4XX Start');
            let error = null;
            try {
              console.log('Start ON_4XX:0 SET_VARIABLE');
              const valueboPVcDtF = false;
              setHas_access(valueboPVcDtF);
              const access = valueboPVcDtF;
              console.log('Complete ON_4XX:0 SET_VARIABLE');
              console.log('Start ON_4XX:1 CONSOLE_LOG');
              console.log(has_access);
              console.log('Complete ON_4XX:1 CONSOLE_LOG');
              console.log('Start ON_4XX:2 DECLARE_VARIABLE');
              const error = true;
              console.log('Complete ON_4XX:2 DECLARE_VARIABLE', { error });
            } catch (err) {
              console.error(err);
              error = err.message ?? err;
            }
            console.log(
              'Fetch ON_4XX Complete',
              error ? { error } : 'no error'
            );
          },
          onData: fetchData => {
            try {
              console.log(fetchData);
            } catch (err) {
              console.error(err);
            }
          },
        }}
        newsletter_id={props.route?.params?.news_id ?? 34}
      >
        {({ loading, error, data, refetchNewsletterEach }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <>
              {!(has_access === true) ? null : (
                <SimpleStyleScrollView
                  bounces={true}
                  horizontal={false}
                  keyboardShouldPersistTaps={'never'}
                  nestedScrollEnabled={false}
                  showsHorizontalScrollIndicator={true}
                  showsVerticalScrollIndicator={true}
                  style={StyleSheet.applyWidth(
                    {
                      height: '100%',
                      marginTop: 65,
                      paddingBottom: 65,
                      position: 'absolute',
                    },
                    dimensions.width
                  )}
                >
                  <View>
                    <View
                      style={StyleSheet.applyWidth(
                        { marginBottom: 10, padding: 10 },
                        dimensions.width
                      )}
                    >
                      {/* title */}
                      <H1
                        selectable={false}
                        {...GlobalStyles.H1Styles(theme)['H1'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.H1Styles(theme)['H1'].style,
                            { fontSize: 16, marginBottom: 0 }
                          ),
                          dimensions.width
                        )}
                      >
                        {fetchData?.title}
                      </H1>
                      {/* date */}
                      <Text
                        accessible={true}
                        {...GlobalStyles.TextStyles(theme)['screen_title']
                          .props}
                        style={StyleSheet.applyWidth(
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
                          dimensions.width
                        )}
                      >
                        {fetchData?.date}
                      </Text>
                    </View>
                    {/* Section Name */}
                    <View
                      style={StyleSheet.applyWidth(
                        { marginBottom: 10 },
                        dimensions.width
                      )}
                    >
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
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.LinearGradientStyles(theme)[
                              'SectionName'
                            ].style,
                            { margin: null }
                          ),
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
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_700Bold',
                                fontSize: 16,
                                textTransform: 'uppercase',
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'PITCH OF THE DAY'}
                        </Text>
                      </LinearGradient>
                    </View>
                    {/* potd settings */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          gap: 4,
                          marginBottom: 20,
                          maxWidth: 450,
                          padding: 10,
                        },
                        dimensions.width
                      )}
                    >
                      <H3
                        selectable={false}
                        {...GlobalStyles.H3Styles(theme)['H3'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.H3Styles(theme)['H3'].style,
                            { fontSize: 16, marginBottom: 10, marginTop: 0 }
                          ),
                          dimensions.width
                        )}
                      >
                        {fetchData?._potd?.headline}
                      </H3>

                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', gap: 8 },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { width: 80 },
                            dimensions.width
                          )}
                        >
                          {/* Lable */}
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['screen_title']
                              .props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['screen_title']
                                  .style,
                                { fontFamily: 'Quicksand_700Bold' }
                              ),
                              dimensions.width
                            )}
                          >
                            {'Target:'}
                          </Text>
                        </View>
                        {/* Value */}
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
                          {fetchData?._potd?.target}
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
                            { width: 80 },
                            dimensions.width
                          )}
                        >
                          {/* Lable */}
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['screen_title']
                              .props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['screen_title']
                                  .style,
                                { fontFamily: 'Quicksand_700Bold' }
                              ),
                              dimensions.width
                            )}
                          >
                            {'Advisor:'}
                          </Text>
                        </View>
                        {/* Value */}
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
                          {fetchData?._potd?.advisor}
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
                            { width: 80 },
                            dimensions.width
                          )}
                        >
                          {/* Lable */}
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['screen_title']
                              .props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['screen_title']
                                  .style,
                                { fontFamily: 'Quicksand_700Bold' }
                              ),
                              dimensions.width
                            )}
                          >
                            {'Stage:'}
                          </Text>
                        </View>
                        {/* Value */}
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
                          {fetchData?._potd?.stage}
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
                            { width: 80 },
                            dimensions.width
                          )}
                        >
                          {/* Lable */}
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['screen_title']
                              .props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['screen_title']
                                  .style,
                                { fontFamily: 'Quicksand_700Bold' }
                              ),
                              dimensions.width
                            )}
                          >
                            {'Financials:'}
                          </Text>
                        </View>
                        {/* Value */}
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
                          {fetchData?._potd?.financials}
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
                            { width: 80 },
                            dimensions.width
                          )}
                        >
                          {/* Lable */}
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['screen_title']
                              .props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['screen_title']
                                  .style,
                                { fontFamily: 'Quicksand_700Bold' }
                              ),
                              dimensions.width
                            )}
                          >
                            {'GICS:'}
                          </Text>
                        </View>
                        {/* Value */}
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
                          {fetchData?._potd?.gics}
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
                            { width: 80 },
                            dimensions.width
                          )}
                        >
                          {/* Lable */}
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['screen_title']
                              .props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['screen_title']
                                  .style,
                                { fontFamily: 'Quicksand_700Bold' }
                              ),
                              dimensions.width
                            )}
                          >
                            {'HQ:'}
                          </Text>
                        </View>
                        {/* Value */}
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
                          {fetchData?._potd?.hq}
                        </Text>
                      </View>
                    </View>
                    {/* container */}
                    <View
                      style={StyleSheet.applyWidth(
                        { gap: 20, marginBottom: 20, padding: 10 },
                        dimensions.width
                      )}
                    >
                      {/* Content */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'flex-start',
                            flexDirection: 'column',
                            gap: 8,
                          },
                          dimensions.width
                        )}
                      >
                        {/* Lable */}
                        <Text
                          accessible={true}
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors.text.light,
                              fontFamily: 'Quicksand_500Medium',
                              fontSize: 16,
                            },
                            dimensions.width
                          )}
                        >
                          {'Company profile:'}
                        </Text>
                        {/* Value */}
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
                                fontSize: 16,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {fetchData?._potd?.story_company_profile}
                        </Text>
                      </View>
                      {/* Content */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'flex-start',
                            flexDirection: 'column',
                            gap: 8,
                          },
                          dimensions.width
                        )}
                      >
                        {/* Lable */}
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: theme.colors.text.light,
                                fontFamily: 'Quicksand_500Medium',
                                fontSize: 16,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'The opportunity:'}
                        </Text>
                        {/* Value */}
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
                                fontSize: 16,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {fetchData?._potd?.story_opportunity}
                        </Text>
                      </View>
                      {/* Content */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'flex-start',
                            flexDirection: 'column',
                            gap: 8,
                          },
                          dimensions.width
                        )}
                      >
                        {/* Lable */}
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: theme.colors.text.light,
                                fontFamily: 'Quicksand_500Medium',
                                fontSize: 16,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Comps & precedents:'}
                        </Text>
                        {/* Value */}
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
                                fontSize: 16,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {fetchData?._potd?.story_comps}
                        </Text>
                      </View>
                    </View>
                    {/* Listed comparable */}
                    <>
                      {!fetchData?._potd?._peer_group ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              maxWidth: 450,
                              padding: 10,
                              width: {
                                minWidth: Breakpoints.BigScreen,
                                value: 450,
                              },
                            },
                            dimensions.width
                          )}
                        >
                          {/* header */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'flex-start',
                                flexDirection: 'row',
                                gap: 8,
                                justifyContent: 'space-between',
                              },
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)[
                                'listed_header_title'
                              ].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)[
                                  'listed_header_title'
                                ].style,
                                dimensions.width
                              )}
                            >
                              {'Listed comparable'}
                            </Text>

                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  flexDirection: 'row',
                                  gap: [
                                    { minWidth: Breakpoints.Mobile, value: 8 },
                                    {
                                      minWidth: Breakpoints.BigScreen,
                                      value: 8,
                                    },
                                  ],
                                  justifyContent: {
                                    minWidth: Breakpoints.BigScreen,
                                    value: 'flex-end',
                                  },
                                },
                                dimensions.width
                              )}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: 'flex-end',
                                    width: [
                                      {
                                        minWidth: Breakpoints.BigScreen,
                                        value: 100,
                                      },
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: 100,
                                      },
                                    ],
                                  },
                                  dimensions.width
                                )}
                              >
                                {/* Text 2 */}
                                <Text
                                  accessible={true}
                                  {...GlobalStyles.TextStyles(theme)[
                                    'listed_header_title'
                                  ].props}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.TextStyles(theme)[
                                        'listed_header_title'
                                      ].style,
                                      {
                                        alignSelf: {
                                          minWidth: Breakpoints.BigScreen,
                                          value: 'flex-end',
                                        },
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {'EV/Sales (FY0)'}
                                </Text>
                              </View>
                              {/* View 2 */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: 'flex-end',
                                    alignSelf: 'flex-end',
                                    width: {
                                      minWidth: Breakpoints.BigScreen,
                                      value: 100,
                                    },
                                  },
                                  dimensions.width
                                )}
                              >
                                {/* Text 3 */}
                                <Text
                                  accessible={true}
                                  {...GlobalStyles.TextStyles(theme)[
                                    'listed_header_title'
                                  ].props}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.TextStyles(theme)[
                                        'listed_header_title'
                                      ].style,
                                      {
                                        alignSelf: {
                                          minWidth: Breakpoints.BigScreen,
                                          value: 'flex-start',
                                        },
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {'EV/EBITDA (FY0)'}
                                </Text>
                              </View>
                            </View>
                          </View>
                          <SimpleStyleFlatList
                            data={fetchData?._potd?._peer_group?.stocks}
                            horizontal={false}
                            inverted={false}
                            keyExtractor={(listData, index) => listData?.id}
                            keyboardShouldPersistTaps={'never'}
                            listKey={'gAHpjOpB'}
                            nestedScrollEnabled={false}
                            numColumns={1}
                            onEndReachedThreshold={0.5}
                            renderItem={({ item, index }) => {
                              const listData = item;
                              return (
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'flex-start',
                                      borderBottomWidth: 0.5,
                                      borderColor:
                                        theme.colors.foreground.brand,
                                      flexDirection: 'row',
                                      gap: 8,
                                      justifyContent: 'space-between',
                                      marginBottom: 4,
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
                                      GlobalStyles.TextStyles(theme)[
                                        'screen_title'
                                      ].style,
                                      dimensions.width
                                    )}
                                  >
                                    {listData?.company_name}
                                  </Text>

                                  <View
                                    style={StyleSheet.applyWidth(
                                      { flexDirection: 'row', gap: 8 },
                                      dimensions.width
                                    )}
                                  >
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignContent: 'flex-end',
                                          alignSelf: 'flex-end',
                                          width: 100,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {/* Text 2 */}
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
                                            { textAlign: 'right' }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {listData?.ev_sales_fy0}
                                        {'x'}
                                      </Text>
                                    </View>
                                    {/* View 2 */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignContent: 'flex-end',
                                          alignSelf: 'flex-end',
                                          width: 100,
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
                                            { textAlign: 'right' }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {listData?.ev_ebitda_fy0}
                                        {'x'}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                              );
                            }}
                            showsHorizontalScrollIndicator={true}
                            showsVerticalScrollIndicator={true}
                          />
                          {/* View 2 */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'flex-start',
                                flexDirection: 'row',
                                gap: 8,
                                justifyContent: 'space-between',
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
                                  { fontFamily: 'Quicksand_700Bold' }
                                ),
                                dimensions.width
                              )}
                            >
                              {'Median = '}
                            </Text>

                            <View
                              style={StyleSheet.applyWidth(
                                { flexDirection: 'row', gap: 8 },
                                dimensions.width
                              )}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignContent: 'flex-end',
                                    alignSelf: 'flex-end',
                                    width: 100,
                                  },
                                  dimensions.width
                                )}
                              >
                                {/* Text 2 */}
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
                                        alignSelf: 'flex-end',
                                        fontFamily: 'Quicksand_700Bold',
                                        textAlign: 'right',
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {fetchData?._potd?._peer_group?.ev_sales_fy0}
                                  {'x'}
                                </Text>
                              </View>
                              {/* View 2 */}
                              <View
                                style={StyleSheet.applyWidth(
                                  { width: 100 },
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
                                        fontFamily: 'Quicksand_700Bold',
                                        textAlign: 'right',
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {fetchData?._potd?._peer_group?.ev_ebitda_fy0}
                                  {'x'}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      )}
                    </>
                    {/* Section Name */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: theme.colors.text.strong,
                          marginBottom: 10,
                        },
                        dimensions.width
                      )}
                    >
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
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.LinearGradientStyles(theme)[
                              'SectionName'
                            ].style,
                            { margin: null }
                          ),
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
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_700Bold',
                                fontSize: 16,
                                textTransform: 'uppercase',
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'NEWSFLOW'}
                        </Text>
                      </LinearGradient>
                    </View>
                    {/* Nordic Newsflow */}
                    <>
                      {!(fetchData?.version === 'Nordic') ? null : (
                        <View>
                          {/* DK */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 10 },
                              dimensions.width
                            )}
                          >
                            <H3
                              selectable={false}
                              {...GlobalStyles.H3Styles(theme)['H3'].props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.H3Styles(theme)['H3'].style,
                                  {
                                    marginBottom: 10,
                                    marginTop: 0,
                                    paddingLeft: 2,
                                    paddingRight: 2,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fetchData?.country_order?.[0]}
                            </H3>
                            <SimpleStyleFlatList
                              data={fetchData?.events_list?.first}
                              inverted={false}
                              keyExtractor={(listData, index) =>
                                listData?.id ??
                                listData?.uuid ??
                                index.toString()
                              }
                              keyboardShouldPersistTaps={'never'}
                              listKey={'BkWHiVbG'}
                              nestedScrollEnabled={false}
                              numColumns={1}
                              onEndReachedThreshold={0.5}
                              renderItem={({ item, index }) => {
                                const listData = item;
                                return (
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
                                    stretch={true}
                                    style={StyleSheet.applyWidth(
                                      {
                                        borderRadius: 12,
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
                                          backgroundColor:
                                            palettes.Brand['Strong Inverse'],
                                          borderColor:
                                            palettes.Brand['Light Inverse'],
                                          borderRadius: 8,
                                          borderWidth: 1,
                                          padding: 10,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <View>
                                        <Text
                                          accessible={true}
                                          style={StyleSheet.applyWidth(
                                            {
                                              fontFamily:
                                                'Quicksand_600SemiBold',
                                              fontSize: 16,
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {listData?.headline}
                                          {' ('}
                                          {listData?.source}
                                          {')'}
                                        </Text>
                                      </View>
                                      {/* View 2 */}
                                      <View>
                                        <Text
                                          accessible={true}
                                          style={StyleSheet.applyWidth(
                                            {
                                              color: palettes.App.green,
                                              fontFamily:
                                                'Quicksand_400Regular',
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {
                                            listData?._gics_sub_industry
                                              ?.GICS_Sub_Industry
                                          }
                                        </Text>
                                      </View>
                                      {/* View 3 */}
                                      <View>
                                        <Text
                                          accessible={true}
                                          style={StyleSheet.applyWidth(
                                            {
                                              color: theme.colors.text.strong,
                                              fontFamily:
                                                'Quicksand_400Regular',
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {listData?.description}
                                        </Text>
                                      </View>
                                    </View>
                                  </Shadow>
                                );
                              }}
                              horizontal={false}
                              showsHorizontalScrollIndicator={false}
                              showsVerticalScrollIndicator={false}
                              style={StyleSheet.applyWidth(
                                {
                                  alignContent: 'stretch',
                                  alignSelf: [
                                    {
                                      minWidth: Breakpoints.Laptop,
                                      value: 'stretch',
                                    },
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: 'stretch',
                                    },
                                  ],
                                  gap: 8,
                                  padding: 2,
                                  position: 'relative',
                                  width: '100%',
                                },
                                dimensions.width
                              )}
                            />
                          </View>
                          {/* SE */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 10 },
                              dimensions.width
                            )}
                          >
                            <H3
                              selectable={false}
                              {...GlobalStyles.H3Styles(theme)['H3'].props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.H3Styles(theme)['H3'].style,
                                  {
                                    marginBottom: 10,
                                    marginTop: 0,
                                    paddingLeft: 2,
                                    paddingRight: 2,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {(fetchData?.country_order).slice(1, 2)}
                            </H3>
                            <SimpleStyleFlatList
                              data={fetchData?.events_list?.second}
                              inverted={false}
                              keyExtractor={(listData, index) =>
                                listData?.id ??
                                listData?.uuid ??
                                index.toString()
                              }
                              keyboardShouldPersistTaps={'never'}
                              listKey={'kqofNM7m'}
                              nestedScrollEnabled={false}
                              numColumns={1}
                              onEndReachedThreshold={0.5}
                              renderItem={({ item, index }) => {
                                const listData = item;
                                return (
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
                                    stretch={true}
                                    style={StyleSheet.applyWidth(
                                      {
                                        borderRadius: 12,
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
                                          backgroundColor:
                                            palettes.Brand['Strong Inverse'],
                                          borderColor:
                                            palettes.Brand['Light Inverse'],
                                          borderRadius: 8,
                                          borderWidth: 1,
                                          padding: 10,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <View>
                                        <Text
                                          accessible={true}
                                          style={StyleSheet.applyWidth(
                                            {
                                              fontFamily:
                                                'Quicksand_600SemiBold',
                                              fontSize: 16,
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {listData?.headline}
                                          {' ('}
                                          {listData?.source}
                                          {')'}
                                        </Text>
                                      </View>
                                      {/* View 2 */}
                                      <View>
                                        <Text
                                          accessible={true}
                                          style={StyleSheet.applyWidth(
                                            {
                                              color: palettes.App.green,
                                              fontFamily:
                                                'Quicksand_400Regular',
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {
                                            listData?._gics_sub_industry
                                              ?.GICS_Sub_Industry
                                          }
                                        </Text>
                                      </View>
                                      {/* View 3 */}
                                      <View>
                                        <Text
                                          accessible={true}
                                          style={StyleSheet.applyWidth(
                                            {
                                              color: theme.colors.text.strong,
                                              fontFamily:
                                                'Quicksand_400Regular',
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {listData?.description}
                                        </Text>
                                      </View>
                                    </View>
                                  </Shadow>
                                );
                              }}
                              horizontal={false}
                              showsHorizontalScrollIndicator={false}
                              showsVerticalScrollIndicator={false}
                              style={StyleSheet.applyWidth(
                                { gap: 8, padding: 2 },
                                dimensions.width
                              )}
                            />
                          </View>
                          {/* NO */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 10 },
                              dimensions.width
                            )}
                          >
                            <H3
                              selectable={false}
                              {...GlobalStyles.H3Styles(theme)['H3'].props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.H3Styles(theme)['H3'].style,
                                  {
                                    marginBottom: 10,
                                    marginTop: 0,
                                    paddingLeft: 2,
                                    paddingRight: 2,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {(fetchData?.country_order).slice(2, 3)}
                            </H3>
                            <SimpleStyleFlatList
                              data={fetchData?.events_list?.third}
                              inverted={false}
                              keyExtractor={(listData, index) =>
                                listData?.id ??
                                listData?.uuid ??
                                index.toString()
                              }
                              keyboardShouldPersistTaps={'never'}
                              listKey={'y01Zzgwh'}
                              nestedScrollEnabled={false}
                              numColumns={1}
                              onEndReachedThreshold={0.5}
                              renderItem={({ item, index }) => {
                                const listData = item;
                                return (
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
                                    stretch={true}
                                    style={StyleSheet.applyWidth(
                                      {
                                        borderRadius: 12,
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
                                          backgroundColor:
                                            palettes.Brand['Strong Inverse'],
                                          borderColor:
                                            palettes.Brand['Light Inverse'],
                                          borderRadius: 8,
                                          borderWidth: 1,
                                          padding: 10,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <View>
                                        <Text
                                          accessible={true}
                                          style={StyleSheet.applyWidth(
                                            {
                                              fontFamily:
                                                'Quicksand_600SemiBold',
                                              fontSize: 16,
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {listData?.headline}
                                          {' ('}
                                          {listData?.source}
                                          {')'}
                                        </Text>
                                      </View>
                                      {/* View 2 */}
                                      <View>
                                        <Text
                                          accessible={true}
                                          style={StyleSheet.applyWidth(
                                            {
                                              color: palettes.App.green,
                                              fontFamily:
                                                'Quicksand_400Regular',
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {
                                            listData?._gics_sub_industry
                                              ?.GICS_Sub_Industry
                                          }
                                        </Text>
                                      </View>
                                      {/* View 3 */}
                                      <View>
                                        <Text
                                          accessible={true}
                                          style={StyleSheet.applyWidth(
                                            {
                                              color: theme.colors.text.strong,
                                              fontFamily:
                                                'Quicksand_400Regular',
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {listData?.description}
                                        </Text>
                                      </View>
                                    </View>
                                  </Shadow>
                                );
                              }}
                              horizontal={false}
                              showsHorizontalScrollIndicator={false}
                              showsVerticalScrollIndicator={false}
                              style={StyleSheet.applyWidth(
                                { gap: 8, padding: 2 },
                                dimensions.width
                              )}
                            />
                          </View>
                          {/* FI */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 10 },
                              dimensions.width
                            )}
                          >
                            <H3
                              selectable={false}
                              {...GlobalStyles.H3Styles(theme)['H3'].props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.H3Styles(theme)['H3'].style,
                                  {
                                    marginBottom: 10,
                                    marginTop: 0,
                                    paddingLeft: 2,
                                    paddingRight: 2,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {(fetchData?.country_order).slice(3, 4)}
                            </H3>
                            <SimpleStyleFlatList
                              data={fetchData?.events_list?.fourth}
                              inverted={false}
                              keyExtractor={(listData, index) =>
                                listData?.id ??
                                listData?.uuid ??
                                index.toString()
                              }
                              keyboardShouldPersistTaps={'never'}
                              listKey={'MXVhR479'}
                              nestedScrollEnabled={false}
                              numColumns={1}
                              onEndReachedThreshold={0.5}
                              renderItem={({ item, index }) => {
                                const listData = item;
                                return (
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
                                    stretch={true}
                                    style={StyleSheet.applyWidth(
                                      {
                                        borderRadius: 12,
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
                                          backgroundColor:
                                            palettes.Brand['Strong Inverse'],
                                          borderColor:
                                            palettes.Brand['Light Inverse'],
                                          borderRadius: 8,
                                          borderWidth: 1,
                                          padding: 10,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <View>
                                        <Text
                                          accessible={true}
                                          style={StyleSheet.applyWidth(
                                            {
                                              fontFamily:
                                                'Quicksand_600SemiBold',
                                              fontSize: 16,
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {listData?.headline}
                                          {' ('}
                                          {listData?.source}
                                          {')'}
                                        </Text>
                                      </View>
                                      {/* View 2 */}
                                      <View>
                                        <Text
                                          accessible={true}
                                          style={StyleSheet.applyWidth(
                                            {
                                              color: palettes.App.green,
                                              fontFamily:
                                                'Quicksand_400Regular',
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {
                                            listData?._gics_sub_industry
                                              ?.GICS_Sub_Industry
                                          }
                                        </Text>
                                      </View>
                                      {/* View 3 */}
                                      <View>
                                        <Text
                                          accessible={true}
                                          style={StyleSheet.applyWidth(
                                            {
                                              color: theme.colors.text.strong,
                                              fontFamily:
                                                'Quicksand_400Regular',
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {listData?.description}
                                        </Text>
                                      </View>
                                    </View>
                                  </Shadow>
                                );
                              }}
                              horizontal={false}
                              showsHorizontalScrollIndicator={false}
                              showsVerticalScrollIndicator={false}
                              style={StyleSheet.applyWidth(
                                { gap: 8, padding: 2 },
                                dimensions.width
                              )}
                            />
                          </View>
                        </View>
                      )}
                    </>
                    {/* DACH newsflow */}
                    <>
                      {!(fetchData?.version === 'DACH') ? null : (
                        <View>
                          {/* Large Cap */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 10 },
                              dimensions.width
                            )}
                          >
                            <H3
                              selectable={false}
                              {...GlobalStyles.H3Styles(theme)['H3'].props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.H3Styles(theme)['H3'].style,
                                  {
                                    marginBottom: 10,
                                    marginTop: 0,
                                    paddingLeft: 2,
                                    paddingRight: 2,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {'Large Cap:'}
                            </H3>
                            <SimpleStyleFlatList
                              data={fetchData?.events_list?.first}
                              inverted={false}
                              keyExtractor={(listData, index) =>
                                listData?.id ??
                                listData?.uuid ??
                                index.toString()
                              }
                              keyboardShouldPersistTaps={'never'}
                              listKey={'cEbiegfV'}
                              nestedScrollEnabled={false}
                              numColumns={1}
                              onEndReachedThreshold={0.5}
                              renderItem={({ item, index }) => {
                                const listData = item;
                                return (
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
                                    stretch={true}
                                    style={StyleSheet.applyWidth(
                                      {
                                        borderRadius: 12,
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
                                          backgroundColor:
                                            palettes.Brand['Strong Inverse'],
                                          borderColor:
                                            palettes.Brand['Light Inverse'],
                                          borderRadius: 8,
                                          borderWidth: 1,
                                          padding: 10,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <View>
                                        <Text
                                          accessible={true}
                                          style={StyleSheet.applyWidth(
                                            {
                                              fontFamily:
                                                'Quicksand_600SemiBold',
                                              fontSize: 16,
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {listData?.headline}
                                          {' ('}
                                          {listData?.source}
                                          {')'}
                                        </Text>
                                      </View>
                                      {/* View 2 */}
                                      <View>
                                        <Text
                                          accessible={true}
                                          style={StyleSheet.applyWidth(
                                            {
                                              color: palettes.App.green,
                                              fontFamily:
                                                'Quicksand_400Regular',
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {listData?.country}
                                          {' - '}
                                          {
                                            listData?._gics_sub_industry
                                              ?.GICS_Sub_Industry
                                          }
                                        </Text>
                                      </View>
                                      {/* View 3 */}
                                      <View>
                                        <Text
                                          accessible={true}
                                          style={StyleSheet.applyWidth(
                                            {
                                              color: theme.colors.text.strong,
                                              fontFamily:
                                                'Quicksand_400Regular',
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {listData?.description}
                                        </Text>
                                      </View>
                                    </View>
                                  </Shadow>
                                );
                              }}
                              horizontal={false}
                              showsHorizontalScrollIndicator={false}
                              showsVerticalScrollIndicator={false}
                              style={StyleSheet.applyWidth(
                                {
                                  alignSelf: [
                                    {
                                      minWidth: Breakpoints.Laptop,
                                      value: 'stretch',
                                    },
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: 'stretch',
                                    },
                                  ],
                                  gap: 8,
                                  padding: 2,
                                },
                                dimensions.width
                              )}
                            />
                          </View>
                          {/* Mid Cap */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 10 },
                              dimensions.width
                            )}
                          >
                            <H3
                              selectable={false}
                              {...GlobalStyles.H3Styles(theme)['H3'].props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.H3Styles(theme)['H3'].style,
                                  {
                                    marginBottom: 10,
                                    marginTop: 0,
                                    paddingLeft: 2,
                                    paddingRight: 2,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {'Mid Cap:'}
                            </H3>
                            <SimpleStyleFlatList
                              data={fetchData?.events_list?.second}
                              inverted={false}
                              keyExtractor={(listData, index) =>
                                listData?.id ??
                                listData?.uuid ??
                                index.toString()
                              }
                              keyboardShouldPersistTaps={'never'}
                              listKey={'VSaJ4R1g'}
                              nestedScrollEnabled={false}
                              numColumns={1}
                              onEndReachedThreshold={0.5}
                              renderItem={({ item, index }) => {
                                const listData = item;
                                return (
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
                                    stretch={true}
                                    style={StyleSheet.applyWidth(
                                      {
                                        borderRadius: 12,
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
                                          backgroundColor:
                                            palettes.Brand['Strong Inverse'],
                                          borderColor:
                                            palettes.Brand['Light Inverse'],
                                          borderRadius: 8,
                                          borderWidth: 1,
                                          padding: 10,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <View>
                                        <Text
                                          accessible={true}
                                          style={StyleSheet.applyWidth(
                                            {
                                              fontFamily:
                                                'Quicksand_600SemiBold',
                                              fontSize: 16,
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {listData?.headline}
                                          {' ('}
                                          {listData?.source}
                                          {')'}
                                        </Text>
                                      </View>
                                      {/* View 2 */}
                                      <View>
                                        <Text
                                          accessible={true}
                                          style={StyleSheet.applyWidth(
                                            {
                                              color: palettes.App.green,
                                              fontFamily:
                                                'Quicksand_400Regular',
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {listData?.country}
                                          {' - '}
                                          {
                                            listData?._gics_sub_industry
                                              ?.GICS_Sub_Industry
                                          }
                                        </Text>
                                      </View>
                                      {/* View 3 */}
                                      <View>
                                        <Text
                                          accessible={true}
                                          style={StyleSheet.applyWidth(
                                            {
                                              color: theme.colors.text.strong,
                                              fontFamily:
                                                'Quicksand_400Regular',
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {listData?.description}
                                        </Text>
                                      </View>
                                    </View>
                                  </Shadow>
                                );
                              }}
                              horizontal={false}
                              showsHorizontalScrollIndicator={false}
                              showsVerticalScrollIndicator={false}
                              style={StyleSheet.applyWidth(
                                {
                                  alignSelf: {
                                    minWidth: Breakpoints.Laptop,
                                    value: 'stretch',
                                  },
                                  gap: 8,
                                  padding: 2,
                                },
                                dimensions.width
                              )}
                            />
                          </View>
                          {/* Small Cap */}
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 10 },
                              dimensions.width
                            )}
                          >
                            <H3
                              selectable={false}
                              {...GlobalStyles.H3Styles(theme)['H3'].props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.H3Styles(theme)['H3'].style,
                                  {
                                    marginBottom: 10,
                                    marginTop: 0,
                                    paddingLeft: 2,
                                    paddingRight: 2,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {'Small Cap & Growth Equity:'}
                            </H3>
                            <SimpleStyleFlatList
                              data={fetchData?.events_list?.third}
                              inverted={false}
                              keyExtractor={(listData, index) => listData}
                              keyboardShouldPersistTaps={'never'}
                              listKey={'eZ4x76dS'}
                              nestedScrollEnabled={false}
                              numColumns={1}
                              onEndReachedThreshold={0.5}
                              renderItem={({ item, index }) => {
                                const listData = item;
                                return (
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
                                    stretch={true}
                                    style={StyleSheet.applyWidth(
                                      {
                                        borderRadius: 12,
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
                                          backgroundColor:
                                            palettes.Brand['Strong Inverse'],
                                          borderColor:
                                            palettes.Brand['Light Inverse'],
                                          borderRadius: 8,
                                          borderWidth: 1,
                                          padding: 10,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <View>
                                        <Text
                                          accessible={true}
                                          style={StyleSheet.applyWidth(
                                            {
                                              fontFamily:
                                                'Quicksand_600SemiBold',
                                              fontSize: 16,
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {listData?.headline}
                                          {' ('}
                                          {listData?.source}
                                          {')'}
                                        </Text>
                                      </View>
                                      {/* View 2 */}
                                      <View>
                                        <Text
                                          accessible={true}
                                          style={StyleSheet.applyWidth(
                                            {
                                              color: palettes.App.green,
                                              fontFamily:
                                                'Quicksand_400Regular',
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {listData?.country}
                                          {' - '}
                                          {
                                            listData?._gics_sub_industry
                                              ?.GICS_Sub_Industry
                                          }
                                          {'\n\n'}
                                        </Text>
                                      </View>
                                      {/* View 3 */}
                                      <View>
                                        <Text
                                          accessible={true}
                                          style={StyleSheet.applyWidth(
                                            {
                                              color: theme.colors.text.strong,
                                              fontFamily:
                                                'Quicksand_400Regular',
                                              textAlign: 'left',
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {listData?.description}
                                        </Text>
                                      </View>
                                    </View>
                                  </Shadow>
                                );
                              }}
                              horizontal={false}
                              showsHorizontalScrollIndicator={false}
                              showsVerticalScrollIndicator={false}
                              style={StyleSheet.applyWidth(
                                {
                                  alignSelf: {
                                    minWidth: Breakpoints.Laptop,
                                    value: 'stretch',
                                  },
                                  gap: 8,
                                  padding: 2,
                                },
                                dimensions.width
                              )}
                            />
                          </View>
                        </View>
                      )}
                    </>
                  </View>
                </SimpleStyleScrollView>
              )}
            </>
          );
        }}
      </XanoCollectionApi.FetchNewsletterEachGET>
    </ScreenContainer>
  );
};

export default withTheme(NewsletterDetailsScreen);
