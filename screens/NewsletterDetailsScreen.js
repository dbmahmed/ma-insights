import React from 'react';
import {
  AudioPlayer,
  Button,
  CircularProgress,
  HStack,
  IconButton,
  LinearGradient,
  Pressable,
  ScreenContainer,
  Shadow,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  withTheme,
} from '@draftbit/ui';
import { H1, H3, H5 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
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
import EventDetailsModalBlock from '../components/EventDetailsModalBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import assessAccess from '../global-functions/assessAccess';
import deviceType from '../global-functions/deviceType';
import isNKPProp from '../global-functions/isNKPProp';
import removeGlobalScroll from '../global-functions/removeGlobalScroll';
import resetAccess from '../global-functions/resetAccess';
import showNKPProp from '../global-functions/showNKPProp';
import transformNumber from '../global-functions/transformNumber';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';
import waitUtil from '../utils/wait';

const defaultProps = { news_id: 127 };

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
  const [selectedID, setSelectedID] = React.useState(0);
  const [showTempDiv, setShowTempDiv] = React.useState(true);
  const [refreshingdAZY73yw, setRefreshingdAZY73yw] = React.useState(false);
  const calculateMinsToSecs = seconds => {
    // Calculate minutes and remaining seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    // Format the result to always show two digits for seconds
    const formattedSeconds =
      remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
    // Return the formatted string
    return `${minutes}:${formattedSeconds}`;
  };
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      removeGlobalScroll();
      setGlobalVariableValue({
        key: 'pageName',
        value: 'Newsletter Details',
      });
      setGlobalVariableValue({
        key: 'subPage',
        value: true,
      });
      if (assessAccess(Variables, setGlobalVariableValue) === true) {
        return;
      }
      resetAccess(navigation, Variables, setGlobalVariableValue);
      if (navigation.canGoBack()) {
        navigation.popToTop();
      }
      navigation.replace('LogInScreen');
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);
  const audioPlayerSIxP9tJTRef = React.useRef();
  const audioPlayerHLcphF9xu9Ref = React.useRef();

  return (
    <ScreenContainer
      hasSafeArea={false}
      hasBottomSafeArea={false}
      hasLeftSafeArea={false}
      hasRightSafeArea={false}
      hasTopSafeArea={true}
      scrollable={false}
    >
      <CustomHeaderBlock />
      <XanoCollectionApi.FetchNewsletterEachGET
        device={deviceType(
          Platform.OS === 'web',
          Platform.OS === 'ios',
          Platform.OS === 'android'
        )}
        handlers={{
          on401: fetchData => {
            try {
              resetAccess(navigation, Variables, setGlobalVariableValue);
            } catch (err) {
              console.error(err);
            }
          },
          on4xx: fetchData => {
            console.log('Fetch ON_4XX Start');
            let error = null;
            try {
              console.log('Start ON_4XX:0 SET_VARIABLE');
              /* hidden 'Set Variable' action */ console.log(
                'Complete ON_4XX:0 SET_VARIABLE'
              );
              console.log('Start ON_4XX:1 CONSOLE_LOG');
              /* hidden 'Log to Console' action */ console.log(
                'Complete ON_4XX:1 CONSOLE_LOG'
              );
              console.log('Start ON_4XX:2 DECLARE_VARIABLE');
              /* hidden 'Declare Variable' action */ console.log(
                'Complete ON_4XX:2 DECLARE_VARIABLE'
              );
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
              setShowTempDiv(true);
            } catch (err) {
              console.error(err);
            }
          },
        }}
        newsletter_id={props.route?.params?.news_id ?? defaultProps.news_id}
      >
        {({ loading, error, data, refetchNewsletterEach }) => {
          const fetchData = data?.json;
          if (loading) {
            return (
              <>
                {/* View 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', padding: 20 },
                    dimensions.width
                  )}
                >
                  <CircularProgress
                    color={theme.colors.branding.primary}
                    isAnimated={true}
                    lineCap={'round'}
                    showTrack={true}
                    startPosition={'top'}
                    trackColor={theme.colors.border.brand}
                    trackLineCap={'round'}
                    animationDuration={500}
                    indeterminate={true}
                    style={StyleSheet.applyWidth(
                      { minWidth: 50, width: 50 },
                      dimensions.width
                    )}
                    thickness={5}
                  />
                </View>
              </>
            );
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return (
              <>
                {/* Error */}
                <>
                  {has_access === false ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                          justifyContent: [
                            {
                              minWidth: Breakpoints.BigScreen,
                              value: 'center',
                            },
                            { minWidth: Breakpoints.Tablet, value: 'center' },
                            { minWidth: Breakpoints.Mobile, value: 'center' },
                          ],
                          padding: 10,
                          width: {
                            minWidth: Breakpoints.Tablet,
                            value: '100%',
                          },
                        },
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            gap: 10,
                            maxWidth: 380,
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
                                alignContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                                flexDirection: 'column',
                                gap: 10,
                                margin: 0,
                                maxWidth: 380,
                                padding: 20,
                                width: '100%',
                              }
                            ),
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
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'Quicksand_700Bold',
                                  fontSize: 16,
                                  textAlign: 'center',
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {"You don't have access to newsletter details"}
                          </H3>

                          <Text
                            accessible={true}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.Brand['Strong Inverse'],
                                marginBottom: 10,
                                textAlign: 'center',
                              },
                              dimensions.width
                            )}
                          >
                            {
                              'The newsletter you are trying to access is not included in your current subscription. If you would like to enquire about options for expanding your subscription ma@nordicknowledgepartners.com or if you believe this is a mistake please contact us at '
                            }
                          </Text>
                          <Button
                            iconPosition={'left'}
                            onPress={() => {
                              try {
                                navigation.navigate('NewslettersScreen');
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
                                  backgroundColor:
                                    palettes.Brand['Strong Inverse'],
                                  color: theme.colors.text.strong,
                                  fontFamily: 'Quicksand_600SemiBold',
                                  textTransform: 'uppercase',
                                }
                              ),
                              dimensions.width
                            )}
                            title={'Newsletters'}
                          />
                        </LinearGradient>
                      </View>
                    </View>
                  )}
                </>
              </>
            );
          }

          return (
            <>
              {!(has_access === true) ? null : (
                <SimpleStyleScrollView
                  horizontal={false}
                  keyboardShouldPersistTaps={'never'}
                  nestedScrollEnabled={false}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshingdAZY73yw}
                      onRefresh={() => {
                        const handler = async () => {
                          try {
                            setRefreshingdAZY73yw(true);
                            await refetchNewsletterEach();
                            setRefreshingdAZY73yw(false);
                          } catch (err) {
                            console.error(err);
                            setRefreshingdAZY73yw(false);
                          }
                        };
                        handler();
                      }}
                    />
                  }
                  bounces={false}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      height: '100%',
                      marginTop: [
                        { minWidth: Breakpoints.Mobile, value: 65 },
                        {
                          minWidth: Breakpoints.Mobile,
                          value: Platform.OS === 'web' ? 0 : 0,
                        },
                      ],
                      maxHeight: dimensions.height - 67,
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
                        maxWidth: 900,
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
                            StyleSheet.compose(
                              GlobalStyles.H5Styles(theme)['H5'].style,
                              {
                                fontFamily: 'Quicksand_600SemiBold',
                                fontSize: 25,
                                marginBottom: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 0,
                                },
                                marginTop: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 10,
                                },
                                paddingLeft: [
                                  { minWidth: Breakpoints.Mobile, value: 5 },
                                  { minWidth: Breakpoints.Laptop, value: 10 },
                                ],
                                textDecorationLine: 'none',
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Newsletter details'}
                        </H5>
                      )}
                    </>
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
                      {/* date 1 */}
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

                      <View
                        onLayout={event => {
                          try {
                            /* hidden 'Log to Console' action */
                            /* hidden 'Wait' action */
                            /* hidden 'Play Media' action */
                            /* hidden 'Wait' action */
                            /* hidden 'Toggle Media Playback' action */
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <>
                          {!(fetchData?.audio_version_pvt !== null) ? null : (
                            <AudioPlayer
                              hideDuration={false}
                              hidePlaybackIcon={false}
                              hideSlider={false}
                              interruptionMode={'lower volume'}
                              isLooping={false}
                              onPlaybackStatusUpdate={playbackStatus => {
                                try {
                                  /* hidden 'Log to Console' action */
                                  /* hidden 'Play Media' action */
                                  /* hidden 'Wait' action */
                                  /* hidden 'Set Variable' action */
                                  if (
                                    Platform.OS === 'web' &&
                                    playbackStatus?.durationMillis
                                  ) {
                                    setShowTempDiv(false);
                                  }
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              playThroughEarpieceAndroid={false}
                              remainingTrackColor={theme.colors.border.brand}
                              thumbColor={theme.colors.branding.primary}
                              togglePlaybackIconColor={
                                theme.colors.branding.primary
                              }
                              togglePlaybackIconSize={24}
                              {...GlobalStyles.AudioPlayerStyles(theme)[
                                'Audio Player'
                              ].props}
                              completedTrackColor={
                                theme.colors.branding.primary
                              }
                              mode={'interface'}
                              playsInBackground={true}
                              playsInSilentModeIOS={true}
                              ref={audioPlayerSIxP9tJTRef}
                              source={{
                                uri: `${fetchData?.audio_version_pvt?.url}`,
                              }}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.AudioPlayerStyles(theme)[
                                    'Audio Player'
                                  ].style,
                                  { marginTop: 8 }
                                ),
                                dimensions.width
                              )}
                            />
                          )}
                        </>
                        <>
                          {!(Platform.OS === 'web' && showTempDiv) ? null : (
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor: 'rgba(0, 0, 0, 0)',
                                  bottom: 0,
                                  justifyContent: 'center',
                                  left: 32,
                                  position: 'absolute',
                                  top: 8,
                                },
                                dimensions.width
                              )}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    backgroundColor:
                                      theme.colors.background.brand,
                                    marginLeft: 8,
                                  },
                                  dimensions.width
                                )}
                              >
                                {/* dur */}
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
                                      { color: theme.colors.text.strong }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {'00:00 / '}
                                  {calculateMinsToSecs(
                                    fetchData?.audio_version_pvt?.meta?.duration
                                  )}
                                  {'  '}
                                </Text>
                              </View>
                            </View>
                          )}
                        </>
                      </View>
                    </View>
                    {/* Section Name */}
                    <>
                      {!(fetchData?.potd !== 0) ? null : (
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
                      )}
                    </>
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'space-around',
                          alignItems: 'flex-start',
                          alignSelf: 'flex-start',
                          flex: 1,
                          flexDirection: 'column',
                          justifyContent: 'space-evenly',
                        },
                        dimensions.width
                      )}
                    />
                    {/* View 7 */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'flex-end',
                          flexDirection: 'row',
                          gap: 8,
                          width: '100%',
                        },
                        dimensions.width
                      )}
                    >
                      <>
                        {!(fetchData?.potd !== 0) ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              { flex: 1 },
                              dimensions.width
                            )}
                          >
                            <>
                              {!(fetchData?.potd !== 0) ? null : (
                                <H3
                                  selectable={false}
                                  {...GlobalStyles.H3Styles(theme)['H3'].props}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.H3Styles(theme)['H3'].style,
                                      {
                                        alignSelf: 'flex-start',
                                        fontSize: 16,
                                        marginBottom: 10,
                                        marginTop: 0,
                                        padding: 10,
                                        textAlign: 'left',
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {showNKPProp(
                                    fetchData?._potd?.headline,
                                    undefined
                                  )}
                                </H3>
                              )}
                            </>
                          </View>
                        )}
                      </>
                    </View>
                    {/* potd settings */}
                    <>
                      {!(fetchData?.potd !== 0) ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              gap: 4,
                              marginBottom: 20,
                              padding: 10,
                              width: '100%',
                            },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              { flexDirection: 'row', gap: 8, width: '100%' },
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
                                {...GlobalStyles.TextStyles(theme)[
                                  'screen_title'
                                ].props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)[
                                      'screen_title'
                                    ].style,
                                    { fontFamily: 'Quicksand_700Bold' }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {'Target:'}
                              </Text>
                            </View>

                            <View
                              style={StyleSheet.applyWidth(
                                { flex: 1 },
                                dimensions.width
                              )}
                            >
                              {/* Value */}
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
                                {fetchData?._potd?.target}
                              </Text>
                            </View>
                          </View>
                          {/* View 2 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { flexDirection: 'row', gap: 8, width: '100%' },
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
                                {...GlobalStyles.TextStyles(theme)[
                                  'screen_title'
                                ].props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)[
                                      'screen_title'
                                    ].style,
                                    { fontFamily: 'Quicksand_700Bold' }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {'Advisor:'}
                              </Text>
                            </View>

                            <View
                              style={StyleSheet.applyWidth(
                                { flex: 1 },
                                dimensions.width
                              )}
                            >
                              {/* Value */}
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
                                {fetchData?._potd?.advisor}
                              </Text>
                            </View>
                          </View>
                          {/* View 3 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { flexDirection: 'row', gap: 8, width: '100%' },
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
                                {...GlobalStyles.TextStyles(theme)[
                                  'screen_title'
                                ].props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)[
                                      'screen_title'
                                    ].style,
                                    { fontFamily: 'Quicksand_700Bold' }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {'Stage:'}
                              </Text>
                            </View>

                            <View
                              style={StyleSheet.applyWidth(
                                { flex: 1 },
                                dimensions.width
                              )}
                            >
                              {/* Value */}
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
                                {fetchData?._potd?.stage}
                              </Text>
                            </View>
                          </View>
                          {/* View 4 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { flexDirection: 'row', gap: 8, width: '100%' },
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
                                {...GlobalStyles.TextStyles(theme)[
                                  'screen_title'
                                ].props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)[
                                      'screen_title'
                                    ].style,
                                    { fontFamily: 'Quicksand_700Bold' }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {'Financials:'}
                              </Text>
                            </View>

                            <View
                              style={StyleSheet.applyWidth(
                                { flex: 1 },
                                dimensions.width
                              )}
                            >
                              {/* Value */}
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
                                {fetchData?._potd?.financials}
                              </Text>
                            </View>
                          </View>
                          {/* View 5 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { flexDirection: 'row', gap: 8, width: '100%' },
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
                                {...GlobalStyles.TextStyles(theme)[
                                  'screen_title'
                                ].props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)[
                                      'screen_title'
                                    ].style,
                                    { fontFamily: 'Quicksand_700Bold' }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {'GICS:'}
                              </Text>
                            </View>

                            <View
                              style={StyleSheet.applyWidth(
                                { flex: 1 },
                                dimensions.width
                              )}
                            >
                              {/* Value */}
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
                                {fetchData?._potd?.gics}
                              </Text>
                            </View>
                          </View>
                          {/* View 6 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { flexDirection: 'row', gap: 8, width: '100%' },
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
                                {...GlobalStyles.TextStyles(theme)[
                                  'screen_title'
                                ].props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)[
                                      'screen_title'
                                    ].style,
                                    { fontFamily: 'Quicksand_700Bold' }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {'HQ:'}
                              </Text>
                            </View>

                            <View
                              style={StyleSheet.applyWidth(
                                { flex: 1 },
                                dimensions.width
                              )}
                            >
                              {/* Value */}
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
                                {fetchData?._potd?.hq}
                              </Text>
                            </View>
                          </View>
                        </View>
                      )}
                    </>
                    {/* container */}
                    <>
                      {!(fetchData?.potd !== 0) ? null : (
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
                      )}
                    </>
                    {/* Listed comparable */}
                    <>
                      {!fetchData?._potd?._peer_group ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              marginBottom: 20,
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
                                justifyContent: 'space-between',
                              },
                              dimensions.width
                            )}
                          >
                            {/* Name */}
                            <View
                              style={StyleSheet.applyWidth(
                                { flex: 1 },
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
                            </View>
                            {/* Metrics */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  flex: 1.2,
                                  flexDirection: 'row',
                                  gap: {
                                    minWidth: Breakpoints.BigScreen,
                                    value: 8,
                                  },
                                  justifyContent: {
                                    minWidth: Breakpoints.BigScreen,
                                    value: 'flex-end',
                                  },
                                },
                                dimensions.width
                              )}
                            >
                              {/* M1 */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: 'flex-end',
                                    flex: 1,
                                    justifyContent: 'center',
                                    width: {
                                      minWidth: Breakpoints.BigScreen,
                                      value: 100,
                                    },
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
                                        textAlign: 'right',
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {'EV/Sales (FY0)'}
                                </Text>
                              </View>
                              {/* M2 */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: 'flex-end',
                                    alignSelf: 'flex-end',
                                    flex: 1.1,
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
                                      { textAlign: 'right' }
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
                                <>
                                  {/* Row */}
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: 'flex-start',
                                        borderBottomWidth: 0.5,
                                        borderColor:
                                          theme.colors.foreground.brand,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginBottom: 4,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {/* Name */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        { flex: 1 },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        accessible={true}
                                        {...GlobalStyles.TextStyles(theme)[
                                          'screen_title'
                                        ].props}
                                        ellipsizeMode={'tail'}
                                        numberOfLines={1}
                                        style={StyleSheet.applyWidth(
                                          GlobalStyles.TextStyles(theme)[
                                            'screen_title'
                                          ].style,
                                          dimensions.width
                                        )}
                                      >
                                        {listData?.company_name}
                                      </Text>
                                    </View>
                                    {/* Metrics */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        { flex: 1.2, flexDirection: 'row' },
                                        dimensions.width
                                      )}
                                    >
                                      {/* M1 */}
                                      <View
                                        style={StyleSheet.applyWidth(
                                          {
                                            alignContent: 'flex-end',
                                            alignSelf: 'flex-end',
                                            flex: 1,
                                            paddingRight: 12,
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
                                          {transformNumber(
                                            listData?.ev_sales_fy0,
                                            'x',
                                            true
                                          )}
                                        </Text>
                                      </View>
                                      {/* M2 */}
                                      <View
                                        style={StyleSheet.applyWidth(
                                          {
                                            alignContent: 'flex-end',
                                            alignSelf: 'flex-end',
                                            flex: 1,
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
                                          {transformNumber(
                                            listData?.ev_ebitda_fy0,
                                            'x',
                                            true
                                          )}
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                </>
                              );
                            }}
                            showsHorizontalScrollIndicator={true}
                            showsVerticalScrollIndicator={true}
                          />
                          {/* Total */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'flex-start',
                                flexDirection: 'row',
                                gap: 8,
                                justifyContent: 'space-between',
                                width: '100%',
                              },
                              dimensions.width
                            )}
                          >
                            {/* Name */}
                            <View
                              style={StyleSheet.applyWidth(
                                { flex: 1 },
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
                                    { fontFamily: 'Quicksand_700Bold' }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {'Median = '}
                              </Text>
                            </View>
                            {/* Metrics */}
                            <View
                              style={StyleSheet.applyWidth(
                                { flex: 1.2, flexDirection: 'row', gap: 8 },
                                dimensions.width
                              )}
                            >
                              {/* M1 */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignContent: 'flex-end',
                                    alignSelf: 'flex-end',
                                    flex: 1,
                                    paddingRight: 12,
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
                                  {transformNumber(
                                    fetchData?._potd?._peer_group?.ev_sales_fy0,
                                    'x',
                                    true
                                  )}
                                </Text>
                              </View>
                              {/* M2 */}
                              <View
                                style={StyleSheet.applyWidth(
                                  { alignContent: 'flex-end', flex: 1 },
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
                                  {transformNumber(
                                    fetchData?._potd?._peer_group
                                      ?.ev_ebitda_fy0,
                                    'x',
                                    true
                                  )}
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
                        <View
                          style={StyleSheet.applyWidth(
                            { paddingBottom: 40 },
                            dimensions.width
                          )}
                        >
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
                              {':'}
                            </H3>
                            <SimpleStyleFlatList
                              data={fetchData?.events_list?.first}
                              inverted={false}
                              keyExtractor={(listData, index) => listData?.id}
                              keyboardShouldPersistTaps={'never'}
                              listKey={'BkWHiVbG'}
                              nestedScrollEnabled={false}
                              numColumns={1}
                              onEndReachedThreshold={0.5}
                              renderItem={({ item, index }) => {
                                const listData = item;
                                return (
                                  <>
                                    {!listData?.headline ? null : (
                                      <View
                                        style={StyleSheet.applyWidth(
                                          { padding: 5 },
                                          dimensions.width
                                        )}
                                      >
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
                                              bottom: 5,
                                              height: '100%',
                                              left: 5,
                                              position: 'absolute',
                                              right: 5,
                                              top: 5,
                                              width: [
                                                {
                                                  minWidth: Breakpoints.Laptop,
                                                  value: '100%',
                                                },
                                                {
                                                  minWidth: Breakpoints.Mobile,
                                                  value: '100%',
                                                },
                                              ],
                                            },
                                            dimensions.width
                                          )}
                                        />
                                        <Pressable
                                          onPress={() => {
                                            try {
                                              /* hidden 'Navigate' action */
                                              setSelectedID(listData?.id);
                                            } catch (err) {
                                              console.error(err);
                                            }
                                          }}
                                        >
                                          <View
                                            style={StyleSheet.applyWidth(
                                              {
                                                backgroundColor:
                                                  palettes.Brand[
                                                    'Strong Inverse'
                                                  ],
                                                borderColor:
                                                  palettes.Brand[
                                                    'Light Inverse'
                                                  ],
                                                borderRadius: 8,
                                                borderWidth: 1,
                                                padding: 10,
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            <HStack
                                              {...GlobalStyles.HStackStyles(
                                                theme
                                              )['H Stack'].props}
                                              style={StyleSheet.applyWidth(
                                                StyleSheet.compose(
                                                  GlobalStyles.HStackStyles(
                                                    theme
                                                  )['H Stack'].style,
                                                  {
                                                    alignItems: {
                                                      minWidth:
                                                        Breakpoints.Tablet,
                                                      value: 'flex-start',
                                                    },
                                                  }
                                                ),
                                                dimensions.width
                                              )}
                                            >
                                              <Text
                                                accessible={true}
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    color: palettes.App.Orange,
                                                    fontFamily:
                                                      'Quicksand_600SemiBold',
                                                    fontSize: 16,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {
                                                  listData?._gics_sub_industry
                                                    ?.GICS_Sector
                                                }{' '}
                                                <Text
                                                  accessible={true}
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      color:
                                                        theme.colors.text
                                                          .strong,
                                                      fontFamily:
                                                        'Quicksand_600SemiBold',
                                                      fontSize: 16,
                                                    },
                                                    dimensions.width
                                                  )}
                                                >
                                                  {'| '}
                                                  {showNKPProp(
                                                    listData?.headline,
                                                    listData?.source
                                                  )}
                                                </Text>
                                              </Text>
                                            </HStack>
                                            {/* View 3 */}
                                            <View>
                                              <Text
                                                accessible={true}
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    color:
                                                      theme.colors.text.strong,
                                                    fontFamily:
                                                      'Quicksand_400Regular',
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {listData?.description}
                                              </Text>
                                            </View>
                                            {/* View 2 */}
                                            <View>
                                              {/* Text 2 */}
                                              <Text
                                                accessible={true}
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    color: palettes.App.Orange,
                                                    fontFamily:
                                                      'Quicksand_400Regular',
                                                    fontSize: 14,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {'Source: '}
                                                {listData?.source}
                                              </Text>
                                            </View>
                                          </View>
                                        </Pressable>
                                      </View>
                                    )}
                                  </>
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
                                  marginLeft: -15,
                                  marginRight: -15,
                                  padding: 10,
                                  position: 'relative',
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
                              keyExtractor={(listData, index) => listData?.id}
                              keyboardShouldPersistTaps={'never'}
                              listKey={'kqofNM7m'}
                              nestedScrollEnabled={false}
                              numColumns={1}
                              onEndReachedThreshold={0.5}
                              renderItem={({ item, index }) => {
                                const listData = item;
                                return (
                                  <>
                                    {!listData?.headline ? null : (
                                      <View
                                        style={StyleSheet.applyWidth(
                                          { padding: 5 },
                                          dimensions.width
                                        )}
                                      >
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
                                              bottom: 5,
                                              height: '100%',
                                              left: 5,
                                              position: 'absolute',
                                              right: 5,
                                              top: 5,
                                              width: [
                                                {
                                                  minWidth: Breakpoints.Laptop,
                                                  value: '100%',
                                                },
                                                {
                                                  minWidth: Breakpoints.Mobile,
                                                  value: '100%',
                                                },
                                              ],
                                            },
                                            dimensions.width
                                          )}
                                        />
                                        <Pressable
                                          onPress={() => {
                                            try {
                                              /* hidden 'Navigate' action */
                                              setSelectedID(listData?.id);
                                            } catch (err) {
                                              console.error(err);
                                            }
                                          }}
                                        >
                                          <View
                                            style={StyleSheet.applyWidth(
                                              {
                                                backgroundColor:
                                                  palettes.Brand[
                                                    'Strong Inverse'
                                                  ],
                                                borderColor:
                                                  palettes.Brand[
                                                    'Light Inverse'
                                                  ],
                                                borderRadius: 8,
                                                borderWidth: 1,
                                                padding: 10,
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            <HStack
                                              {...GlobalStyles.HStackStyles(
                                                theme
                                              )['H Stack'].props}
                                              style={StyleSheet.applyWidth(
                                                StyleSheet.compose(
                                                  GlobalStyles.HStackStyles(
                                                    theme
                                                  )['H Stack'].style,
                                                  {
                                                    alignItems: {
                                                      minWidth:
                                                        Breakpoints.Tablet,
                                                      value: 'flex-start',
                                                    },
                                                  }
                                                ),
                                                dimensions.width
                                              )}
                                            >
                                              <Text
                                                accessible={true}
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    color: palettes.App.Orange,
                                                    fontFamily:
                                                      'Quicksand_600SemiBold',
                                                    fontSize: 16,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {
                                                  listData?._gics_sub_industry
                                                    ?.GICS_Sector
                                                }{' '}
                                                <Text
                                                  accessible={true}
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      color:
                                                        theme.colors.text
                                                          .strong,
                                                      fontFamily:
                                                        'Quicksand_600SemiBold',
                                                      fontSize: 16,
                                                    },
                                                    dimensions.width
                                                  )}
                                                >
                                                  {'| '}
                                                  {showNKPProp(
                                                    listData?.headline,
                                                    listData?.source
                                                  )}
                                                </Text>
                                              </Text>
                                            </HStack>
                                            {/* View 3 */}
                                            <View>
                                              <Text
                                                accessible={true}
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    color:
                                                      theme.colors.text.strong,
                                                    fontFamily:
                                                      'Quicksand_400Regular',
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {listData?.description}
                                              </Text>
                                            </View>
                                            {/* View 2 */}
                                            <View>
                                              {/* Text 2 */}
                                              <Text
                                                accessible={true}
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    color: palettes.App.Orange,
                                                    fontFamily:
                                                      'Quicksand_400Regular',
                                                    fontSize: 14,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {'Source: '}
                                                {listData?.source}
                                              </Text>
                                            </View>
                                          </View>
                                        </Pressable>
                                      </View>
                                    )}
                                  </>
                                );
                              }}
                              horizontal={false}
                              showsHorizontalScrollIndicator={false}
                              showsVerticalScrollIndicator={false}
                              style={StyleSheet.applyWidth(
                                {
                                  gap: 8,
                                  marginLeft: -15,
                                  marginRight: -15,
                                  padding: 10,
                                },
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
                              keyExtractor={(listData, index) => listData?.id}
                              keyboardShouldPersistTaps={'never'}
                              listKey={'y01Zzgwh'}
                              nestedScrollEnabled={false}
                              numColumns={1}
                              onEndReachedThreshold={0.5}
                              renderItem={({ item, index }) => {
                                const listData = item;
                                return (
                                  <>
                                    {!listData?.headline ? null : (
                                      <View
                                        style={StyleSheet.applyWidth(
                                          { padding: 5 },
                                          dimensions.width
                                        )}
                                      >
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
                                              bottom: 5,
                                              height: '100%',
                                              left: 5,
                                              position: 'absolute',
                                              right: 5,
                                              top: 5,
                                              width: [
                                                {
                                                  minWidth: Breakpoints.Laptop,
                                                  value: '100%',
                                                },
                                                {
                                                  minWidth: Breakpoints.Mobile,
                                                  value: '100%',
                                                },
                                              ],
                                            },
                                            dimensions.width
                                          )}
                                        />
                                        <Pressable
                                          onPress={() => {
                                            try {
                                              /* hidden 'Navigate' action */
                                              setSelectedID(listData?.id);
                                            } catch (err) {
                                              console.error(err);
                                            }
                                          }}
                                        >
                                          <View
                                            style={StyleSheet.applyWidth(
                                              {
                                                backgroundColor:
                                                  palettes.Brand[
                                                    'Strong Inverse'
                                                  ],
                                                borderColor:
                                                  palettes.Brand[
                                                    'Light Inverse'
                                                  ],
                                                borderRadius: 8,
                                                borderWidth: 1,
                                                padding: 10,
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            <HStack
                                              {...GlobalStyles.HStackStyles(
                                                theme
                                              )['H Stack'].props}
                                              style={StyleSheet.applyWidth(
                                                StyleSheet.compose(
                                                  GlobalStyles.HStackStyles(
                                                    theme
                                                  )['H Stack'].style,
                                                  {
                                                    alignItems: {
                                                      minWidth:
                                                        Breakpoints.Tablet,
                                                      value: 'flex-start',
                                                    },
                                                  }
                                                ),
                                                dimensions.width
                                              )}
                                            >
                                              {/* Text 2 */}
                                              <Text
                                                accessible={true}
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    color: palettes.App.Orange,
                                                    fontFamily:
                                                      'Quicksand_600SemiBold',
                                                    fontSize: 16,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {
                                                  listData?._gics_sub_industry
                                                    ?.GICS_Sector
                                                }{' '}
                                                <Text
                                                  accessible={true}
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      color:
                                                        theme.colors.text
                                                          .strong,
                                                      fontFamily:
                                                        'Quicksand_600SemiBold',
                                                      fontSize: 16,
                                                    },
                                                    dimensions.width
                                                  )}
                                                >
                                                  {'| '}
                                                  {showNKPProp(
                                                    listData?.headline,
                                                    undefined
                                                  )}
                                                </Text>
                                              </Text>
                                            </HStack>
                                            {/* View 3 */}
                                            <View>
                                              <Text
                                                accessible={true}
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    color:
                                                      theme.colors.text.strong,
                                                    fontFamily:
                                                      'Quicksand_400Regular',
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {listData?.description}
                                              </Text>
                                            </View>
                                            {/* View 2 */}
                                            <View>
                                              <Text
                                                accessible={true}
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    color: palettes.App.Orange,
                                                    fontFamily:
                                                      'Quicksand_400Regular',
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {'Source: '}
                                                {listData?.source}
                                              </Text>
                                            </View>
                                          </View>
                                        </Pressable>
                                      </View>
                                    )}
                                  </>
                                );
                              }}
                              horizontal={false}
                              showsHorizontalScrollIndicator={false}
                              showsVerticalScrollIndicator={false}
                              style={StyleSheet.applyWidth(
                                {
                                  gap: 8,
                                  marginLeft: -15,
                                  marginRight: -15,
                                  padding: 10,
                                },
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
                              keyExtractor={(listData, index) => listData?.id}
                              keyboardShouldPersistTaps={'never'}
                              listKey={'MXVhR479'}
                              nestedScrollEnabled={false}
                              numColumns={1}
                              onEndReachedThreshold={0.5}
                              renderItem={({ item, index }) => {
                                const listData = item;
                                return (
                                  <>
                                    {!listData?.headline ? null : (
                                      <View
                                        style={StyleSheet.applyWidth(
                                          { padding: 5 },
                                          dimensions.width
                                        )}
                                      >
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
                                              bottom: 5,
                                              height: '100%',
                                              left: 5,
                                              position: 'absolute',
                                              right: 5,
                                              top: 5,
                                              width: [
                                                {
                                                  minWidth: Breakpoints.Laptop,
                                                  value: '100%',
                                                },
                                                {
                                                  minWidth: Breakpoints.Mobile,
                                                  value: '100%',
                                                },
                                              ],
                                            },
                                            dimensions.width
                                          )}
                                        />
                                        <Pressable
                                          onPress={() => {
                                            try {
                                              /* hidden 'Navigate' action */
                                              setSelectedID(listData?.id);
                                            } catch (err) {
                                              console.error(err);
                                            }
                                          }}
                                        >
                                          <View
                                            style={StyleSheet.applyWidth(
                                              {
                                                backgroundColor:
                                                  palettes.Brand[
                                                    'Strong Inverse'
                                                  ],
                                                borderColor:
                                                  palettes.Brand[
                                                    'Light Inverse'
                                                  ],
                                                borderRadius: 8,
                                                borderWidth: 1,
                                                padding: 10,
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            <HStack
                                              {...GlobalStyles.HStackStyles(
                                                theme
                                              )['H Stack'].props}
                                              style={StyleSheet.applyWidth(
                                                StyleSheet.compose(
                                                  GlobalStyles.HStackStyles(
                                                    theme
                                                  )['H Stack'].style,
                                                  {
                                                    alignItems: [
                                                      {
                                                        minWidth:
                                                          Breakpoints.Tablet,
                                                        value: 'flex-start',
                                                      },
                                                      {
                                                        minWidth:
                                                          Breakpoints.Mobile,
                                                        value: 'flex-start',
                                                      },
                                                    ],
                                                  }
                                                ),
                                                dimensions.width
                                              )}
                                            >
                                              {/* Text 2 */}
                                              <Text
                                                accessible={true}
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    color: [
                                                      {
                                                        minWidth:
                                                          Breakpoints.Desktop,
                                                        value:
                                                          palettes.App.Orange,
                                                      },
                                                      {
                                                        minWidth:
                                                          Breakpoints.Mobile,
                                                        value:
                                                          palettes.App.Orange,
                                                      },
                                                    ],
                                                    fontFamily:
                                                      'Quicksand_600SemiBold',
                                                    fontSize: 16,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {
                                                  listData?._gics_sub_industry
                                                    ?.GICS_Sector
                                                }{' '}
                                                <Text
                                                  accessible={true}
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      color:
                                                        theme.colors.text
                                                          .strong,
                                                      fontFamily:
                                                        'Quicksand_600SemiBold',
                                                      fontSize: 16,
                                                    },
                                                    dimensions.width
                                                  )}
                                                >
                                                  {'| '}
                                                  {showNKPProp(
                                                    listData?.headline,
                                                    listData?.source
                                                  )}
                                                </Text>
                                              </Text>
                                            </HStack>
                                            {/* View 3 */}
                                            <View>
                                              <Text
                                                accessible={true}
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    color:
                                                      theme.colors.text.strong,
                                                    fontFamily:
                                                      'Quicksand_400Regular',
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {listData?.description}
                                              </Text>
                                            </View>
                                            {/* View 2 */}
                                            <View>
                                              <Text
                                                accessible={true}
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    color: [
                                                      {
                                                        minWidth:
                                                          Breakpoints.Desktop,
                                                        value:
                                                          palettes.App.Orange,
                                                      },
                                                      {
                                                        minWidth:
                                                          Breakpoints.Mobile,
                                                        value:
                                                          palettes.App.Orange,
                                                      },
                                                    ],
                                                    fontFamily:
                                                      'Quicksand_400Regular',
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {'Source: '}
                                                {listData?.source}
                                              </Text>
                                            </View>
                                          </View>
                                        </Pressable>
                                      </View>
                                    )}
                                  </>
                                );
                              }}
                              horizontal={false}
                              showsHorizontalScrollIndicator={false}
                              showsVerticalScrollIndicator={false}
                              style={StyleSheet.applyWidth(
                                {
                                  gap: 8,
                                  marginLeft: -15,
                                  marginRight: -15,
                                  padding: 10,
                                },
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
                        <View
                          style={StyleSheet.applyWidth(
                            { paddingBottom: 40 },
                            dimensions.width
                          )}
                        >
                          {/* Large Cap */}
                          <>
                            {!(
                              (fetchData?.events_list?.first &&
                                (fetchData?.events_list?.first)[0]) !== null &&
                              fetchData?.events_list?.first &&
                              (fetchData?.events_list?.first)[0]
                            ) ? null : (
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
                                    listData?.id
                                  }
                                  keyboardShouldPersistTaps={'never'}
                                  listKey={'cEbiegfV'}
                                  nestedScrollEnabled={false}
                                  numColumns={1}
                                  onEndReachedThreshold={0.5}
                                  renderItem={({ item, index }) => {
                                    const listData = item;
                                    return (
                                      <>
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
                                              bottom: 5,
                                              height: '100%',
                                              left: 5,
                                              position: 'absolute',
                                              right: 5,
                                              top: 5,
                                              width: [
                                                {
                                                  minWidth: Breakpoints.Laptop,
                                                  value: '100%',
                                                },
                                                {
                                                  minWidth: Breakpoints.Mobile,
                                                  value: '100%',
                                                },
                                              ],
                                            },
                                            dimensions.width
                                          )}
                                        />
                                        <>
                                          {!listData?.headline ? null : (
                                            <View
                                              style={StyleSheet.applyWidth(
                                                { padding: 5, width: '100%' },
                                                dimensions.width
                                              )}
                                            >
                                              <Pressable
                                                onPress={() => {
                                                  try {
                                                    /* hidden 'Navigate' action */
                                                    setSelectedID(listData?.id);
                                                  } catch (err) {
                                                    console.error(err);
                                                  }
                                                }}
                                              >
                                                <View
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      backgroundColor:
                                                        palettes.Brand[
                                                          'Strong Inverse'
                                                        ],
                                                      borderColor:
                                                        palettes.Brand[
                                                          'Light Inverse'
                                                        ],
                                                      borderRadius: 8,
                                                      borderWidth: 1,
                                                      padding: 10,
                                                    },
                                                    dimensions.width
                                                  )}
                                                >
                                                  <HStack
                                                    {...GlobalStyles.HStackStyles(
                                                      theme
                                                    )['H Stack'].props}
                                                    style={StyleSheet.applyWidth(
                                                      StyleSheet.compose(
                                                        GlobalStyles.HStackStyles(
                                                          theme
                                                        )['H Stack'].style,
                                                        {
                                                          alignItems: [
                                                            {
                                                              minWidth:
                                                                Breakpoints.Tablet,
                                                              value:
                                                                'flex-start',
                                                            },
                                                            {
                                                              minWidth:
                                                                Breakpoints.Mobile,
                                                              value:
                                                                'flex-start',
                                                            },
                                                          ],
                                                        }
                                                      ),
                                                      dimensions.width
                                                    )}
                                                  >
                                                    <View
                                                      style={StyleSheet.applyWidth(
                                                        { flex: 1 },
                                                        dimensions.width
                                                      )}
                                                    >
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
                                                        {showNKPProp(
                                                          listData?.headline,
                                                          listData?.source
                                                        )}
                                                      </Text>
                                                    </View>
                                                  </HStack>
                                                  {/* View 2 */}
                                                  <View>
                                                    <Text
                                                      accessible={true}
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          color:
                                                            palettes.App.Orange,
                                                          fontFamily:
                                                            'Quicksand_400Regular',
                                                        },
                                                        dimensions.width
                                                      )}
                                                    >
                                                      {listData?.country}
                                                      {' - '}
                                                      {
                                                        listData
                                                          ?._gics_sub_industry
                                                          ?.GICS_Sector
                                                      }
                                                    </Text>
                                                  </View>
                                                  {/* View 3 */}
                                                  <View>
                                                    <Text
                                                      accessible={true}
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          color:
                                                            theme.colors.text
                                                              .strong,
                                                          fontFamily:
                                                            'Quicksand_400Regular',
                                                        },
                                                        dimensions.width
                                                      )}
                                                    >
                                                      {listData?.description}
                                                    </Text>
                                                    {/* View 4 */}
                                                    <View>
                                                      <Text
                                                        accessible={true}
                                                        style={StyleSheet.applyWidth(
                                                          {
                                                            color:
                                                              palettes.App
                                                                .Orange,
                                                            fontFamily:
                                                              'Quicksand_400Regular',
                                                          },
                                                          dimensions.width
                                                        )}
                                                      >
                                                        {'Source: '}
                                                        {listData?.source}
                                                      </Text>
                                                    </View>
                                                  </View>
                                                </View>
                                              </Pressable>
                                            </View>
                                          )}
                                        </>
                                      </>
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
                                      marginLeft: -15,
                                      marginRight: -15,
                                      padding: 10,
                                    },
                                    dimensions.width
                                  )}
                                />
                              </View>
                            )}
                          </>
                          {/* Mid Cap */}
                          <>
                            {!(
                              (fetchData?.events_list?.second &&
                                (fetchData?.events_list?.second)[0]) !== null &&
                              fetchData?.events_list?.second?.length > 0
                            ) ? null : (
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
                                    listData?.id
                                  }
                                  keyboardShouldPersistTaps={'never'}
                                  listKey={'VSaJ4R1g'}
                                  nestedScrollEnabled={false}
                                  numColumns={1}
                                  onEndReachedThreshold={0.5}
                                  renderItem={({ item, index }) => {
                                    const listData = item;
                                    return (
                                      <>
                                        {!listData ? null : (
                                          <View
                                            style={StyleSheet.applyWidth(
                                              { padding: 5, width: '100%' },
                                              dimensions.width
                                            )}
                                          >
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
                                                  bottom: 5,
                                                  height: '100%',
                                                  left: 5,
                                                  position: 'absolute',
                                                  right: 5,
                                                  top: 5,
                                                  width: [
                                                    {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value: '100%',
                                                    },
                                                    {
                                                      minWidth:
                                                        Breakpoints.Mobile,
                                                      value: '100%',
                                                    },
                                                  ],
                                                },
                                                dimensions.width
                                              )}
                                            />
                                            <Pressable
                                              onPress={() => {
                                                try {
                                                  /* hidden 'Navigate' action */
                                                  setSelectedID(listData?.id);
                                                } catch (err) {
                                                  console.error(err);
                                                }
                                              }}
                                            >
                                              <View
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    backgroundColor:
                                                      palettes.Brand[
                                                        'Strong Inverse'
                                                      ],
                                                    borderColor:
                                                      palettes.Brand[
                                                        'Light Inverse'
                                                      ],
                                                    borderRadius: 8,
                                                    borderWidth: 1,
                                                    padding: 10,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                <HStack
                                                  {...GlobalStyles.HStackStyles(
                                                    theme
                                                  )['H Stack'].props}
                                                  style={StyleSheet.applyWidth(
                                                    StyleSheet.compose(
                                                      GlobalStyles.HStackStyles(
                                                        theme
                                                      )['H Stack'].style,
                                                      {
                                                        alignItems: [
                                                          {
                                                            minWidth:
                                                              Breakpoints.Tablet,
                                                            value: 'flex-start',
                                                          },
                                                          {
                                                            minWidth:
                                                              Breakpoints.Mobile,
                                                            value: 'flex-start',
                                                          },
                                                        ],
                                                      }
                                                    ),
                                                    dimensions.width
                                                  )}
                                                >
                                                  <View
                                                    style={StyleSheet.applyWidth(
                                                      { flex: 1 },
                                                      dimensions.width
                                                    )}
                                                  >
                                                    <Text
                                                      accessible={true}
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          alignSelf:
                                                            'flex-start',
                                                          fontFamily:
                                                            'Quicksand_600SemiBold',
                                                          fontSize: 16,
                                                        },
                                                        dimensions.width
                                                      )}
                                                    >
                                                      {showNKPProp(
                                                        listData?.headline,
                                                        listData?.source
                                                      )}
                                                    </Text>
                                                  </View>
                                                </HStack>
                                                {/* View 2 */}
                                                <View>
                                                  <Text
                                                    accessible={true}
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        color:
                                                          palettes.App.Orange,
                                                        fontFamily:
                                                          'Quicksand_400Regular',
                                                      },
                                                      dimensions.width
                                                    )}
                                                  >
                                                    {listData?.country}
                                                    {' - '}
                                                    {
                                                      listData
                                                        ?._gics_sub_industry
                                                        ?.GICS_Sector
                                                    }
                                                  </Text>
                                                </View>
                                                {/* View 3 */}
                                                <View>
                                                  <Text
                                                    accessible={true}
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        color:
                                                          theme.colors.text
                                                            .strong,
                                                        fontFamily:
                                                          'Quicksand_400Regular',
                                                      },
                                                      dimensions.width
                                                    )}
                                                  >
                                                    {listData?.description}
                                                  </Text>
                                                </View>
                                                {/* View 5 */}
                                                <View>
                                                  <Text
                                                    accessible={true}
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        color:
                                                          palettes.App.Orange,
                                                        fontFamily:
                                                          'Quicksand_400Regular',
                                                      },
                                                      dimensions.width
                                                    )}
                                                  >
                                                    {'Source: '}
                                                    {listData?.source}
                                                  </Text>
                                                </View>
                                              </View>
                                            </Pressable>
                                          </View>
                                        )}
                                      </>
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
                                      marginLeft: -15,
                                      marginRight: -15,
                                      padding: 10,
                                    },
                                    dimensions.width
                                  )}
                                />
                              </View>
                            )}
                          </>
                          {/* Small Cap */}
                          <>
                            {!(
                              (fetchData?.events_list?.third &&
                                (fetchData?.events_list?.third)[0]) !== null
                            ) ? null : (
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
                                  keyExtractor={(listData, index) =>
                                    listData?.id
                                  }
                                  keyboardShouldPersistTaps={'never'}
                                  listKey={'eZ4x76dS'}
                                  nestedScrollEnabled={false}
                                  numColumns={1}
                                  onEndReachedThreshold={0.5}
                                  renderItem={({ item, index }) => {
                                    const listData = item;
                                    return (
                                      <>
                                        {!listData?.headline ? null : (
                                          <View
                                            style={StyleSheet.applyWidth(
                                              { padding: 5, width: '100%' },
                                              dimensions.width
                                            )}
                                          >
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
                                                  bottom: 5,
                                                  height: '100%',
                                                  left: 5,
                                                  position: 'absolute',
                                                  right: 5,
                                                  top: 5,
                                                  width: [
                                                    {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value: '100%',
                                                    },
                                                    {
                                                      minWidth:
                                                        Breakpoints.Mobile,
                                                      value: '100%',
                                                    },
                                                  ],
                                                },
                                                dimensions.width
                                              )}
                                            />
                                            <Pressable
                                              onPress={() => {
                                                try {
                                                  /* hidden 'Navigate' action */
                                                  setSelectedID(listData?.id);
                                                } catch (err) {
                                                  console.error(err);
                                                }
                                              }}
                                            >
                                              <View
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    backgroundColor:
                                                      palettes.Brand[
                                                        'Strong Inverse'
                                                      ],
                                                    borderColor:
                                                      palettes.Brand[
                                                        'Light Inverse'
                                                      ],
                                                    borderRadius: 8,
                                                    borderWidth: 1,
                                                    padding: 10,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                <HStack
                                                  {...GlobalStyles.HStackStyles(
                                                    theme
                                                  )['H Stack'].props}
                                                  style={StyleSheet.applyWidth(
                                                    StyleSheet.compose(
                                                      GlobalStyles.HStackStyles(
                                                        theme
                                                      )['H Stack'].style,
                                                      {
                                                        alignItems: [
                                                          {
                                                            minWidth:
                                                              Breakpoints.Tablet,
                                                            value: 'flex-start',
                                                          },
                                                          {
                                                            minWidth:
                                                              Breakpoints.Mobile,
                                                            value: 'flex-start',
                                                          },
                                                        ],
                                                      }
                                                    ),
                                                    dimensions.width
                                                  )}
                                                >
                                                  <View
                                                    style={StyleSheet.applyWidth(
                                                      { flex: 1 },
                                                      dimensions.width
                                                    )}
                                                  >
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
                                                      {showNKPProp(
                                                        listData?.headline,
                                                        listData?.source
                                                      )}
                                                    </Text>
                                                  </View>
                                                </HStack>
                                                <View />
                                                {/* View 2 */}
                                                <View>
                                                  <Text
                                                    accessible={true}
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        color:
                                                          palettes.App.Orange,
                                                        fontFamily:
                                                          'Quicksand_400Regular',
                                                      },
                                                      dimensions.width
                                                    )}
                                                  >
                                                    {listData?.country}
                                                    {' - '}
                                                    {
                                                      listData
                                                        ?._gics_sub_industry
                                                        ?.GICS_Sector
                                                    }
                                                  </Text>
                                                </View>
                                                {/* View 3 */}
                                                <View>
                                                  <Text
                                                    accessible={true}
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        color:
                                                          theme.colors.text
                                                            .strong,
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
                                                {/* View 5 */}
                                                <View>
                                                  <Text
                                                    accessible={true}
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        color:
                                                          palettes.App.Orange,
                                                        fontFamily:
                                                          'Quicksand_400Regular',
                                                      },
                                                      dimensions.width
                                                    )}
                                                  >
                                                    {'Source: '}
                                                    {listData?.source}
                                                  </Text>
                                                </View>
                                              </View>
                                            </Pressable>
                                          </View>
                                        )}
                                      </>
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
                                      marginLeft: -15,
                                      marginRight: -15,
                                      padding: 10,
                                    },
                                    dimensions.width
                                  )}
                                />
                              </View>
                            )}
                          </>
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
      <CustomBottomNavBlock />
      <>
        {!selectedID ? null : (
          <EventDetailsModalBlock
            setViewingEventId={viewingEventId => setSelectedID(viewingEventId)}
            viewingEventId={selectedID}
          />
        )}
      </>
    </ScreenContainer>
  );
};

export default withTheme(NewsletterDetailsScreen);
