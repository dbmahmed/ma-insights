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
  IconButton,
  Link,
  ScreenContainer,
  SimpleStyleScrollView,
  withTheme,
} from '@draftbit/ui';
import { H5, H6 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const MyAccountScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const joinStringArray = stringArray => {
    return stringArray.join(', ');
  };
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      setGlobalVariableValue({
        key: 'pageName',
        value: 'My account',
      });
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <CustomHeaderBlock />
      <XanoCollectionApi.FetchAuthMeGET>
        {({ loading, error, data, refetchAuthMe }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
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
              showsHorizontalScrollIndicator={true}
              showsVerticalScrollIndicator={true}
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  height: '100%',
                  marginTop: 65,
                  position: 'absolute',
                  width: '100%',
                },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  { maxWidth: 600, padding: 10, width: '100%' },
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
                            marginBottom: 20,
                            marginTop: [
                              { minWidth: Breakpoints.Mobile, value: 0 },
                              { minWidth: Breakpoints.Laptop, value: 20 },
                            ],
                            paddingLeft: 5,
                            textDecorationLine: 'none',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'All events'}
                    </H5>
                  )}
                </>
                <H6
                  selectable={false}
                  {...GlobalStyles.H6Styles(theme)['H6'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.H6Styles(theme)['H6'].style,
                      {
                        fontFamily: 'Quicksand_700Bold',
                        fontSize: 16,
                        marginBottom: 20,
                        marginTop: 10,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'Basic information'}
                </H6>

                <View
                  style={StyleSheet.applyWidth(
                    { gap: 6, marginBottom: 10 },
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
                        { width: 150 },
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
                            { fontFamily: 'Quicksand_500Medium' }
                          ),
                          dimensions.width
                        )}
                      >
                        {'User name:'}
                      </Text>
                    </View>

                    <Text
                      accessible={true}
                      {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
                          { fontFamily: 'Quicksand_500Medium' }
                        ),
                        dimensions.width
                      )}
                    >
                      {fetchData?.name}
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
                        { width: 150 },
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
                            { fontFamily: 'Quicksand_500Medium' }
                          ),
                          dimensions.width
                        )}
                      >
                        {'Email:'}
                      </Text>
                    </View>

                    <Text
                      accessible={true}
                      {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
                          { fontFamily: 'Quicksand_500Medium' }
                        ),
                        dimensions.width
                      )}
                    >
                      {fetchData?.email}
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
                        { justifyContent: 'center', width: 150 },
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
                            { fontFamily: 'Quicksand_500Medium' }
                          ),
                          dimensions.width
                        )}
                      >
                        {'Password:'}
                      </Text>
                    </View>
                    {/* View 2 */}
                    <View
                      style={StyleSheet.applyWidth(
                        { alignItems: 'center', flexDirection: 'row', gap: 4 },
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
                            { fontFamily: 'Quicksand_500Medium' }
                          ),
                          dimensions.width
                        )}
                      >
                        {'****************'}
                      </Text>
                      <IconButton
                        color={theme.colors.text.medium}
                        icon={'Entypo/edit'}
                        size={24}
                      />
                    </View>
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
                        { width: 150 },
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
                            { fontFamily: 'Quicksand_500Medium' }
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
                          { fontFamily: 'Quicksand_500Medium' }
                        ),
                        dimensions.width
                      )}
                    >
                      {fetchData?.country}
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
                        { width: 150 },
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
                            { fontFamily: 'Quicksand_500Medium' }
                          ),
                          dimensions.width
                        )}
                      >
                        {'Company:'}
                      </Text>
                    </View>

                    <Text
                      accessible={true}
                      {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
                          { fontFamily: 'Quicksand_500Medium' }
                        ),
                        dimensions.width
                      )}
                    >
                      {fetchData?.company}
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
                        { width: 150 },
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
                            { fontFamily: 'Quicksand_500Medium' }
                          ),
                          dimensions.width
                        )}
                      >
                        {'Job title:'}
                      </Text>
                    </View>

                    <Text
                      accessible={true}
                      {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
                          { fontFamily: 'Quicksand_500Medium' }
                        ),
                        dimensions.width
                      )}
                    >
                      {fetchData?.job_title}
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
                        { width: 150 },
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
                            { fontFamily: 'Quicksand_500Medium' }
                          ),
                          dimensions.width
                        )}
                      >
                        {'Sub.type:'}
                      </Text>
                    </View>

                    <Text
                      accessible={true}
                      {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
                          { fontFamily: 'Quicksand_500Medium' }
                        ),
                        dimensions.width
                      )}
                    >
                      {joinStringArray(fetchData?.accessible_regions)}
                    </Text>
                  </View>
                </View>

                <Text
                  accessible={true}
                  {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['screen_title'].style,
                      {
                        fontFamily: 'Quicksand_400Regular',
                        fontSize: 10,
                        marginBottom: 20,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {
                    'To update basic profile information, other than your password, please email Sahana at sg@nordicknowledgepartners.com'
                  }
                </Text>
                {/* H6 2 */}
                <H6
                  selectable={false}
                  {...GlobalStyles.H6Styles(theme)['H6'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.H6Styles(theme)['H6'].style,
                      {
                        fontFamily: 'Quicksand_700Bold',
                        fontSize: 16,
                        marginBottom: 20,
                        marginTop: 10,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'Notification preferences'}
                </H6>
                <Link
                  accessible={true}
                  onPress={() => {
                    try {
                      navigation.push('TermsAndConditionsScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  {...GlobalStyles.LinkStyles(theme)['Link'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.LinkStyles(theme)['Link'].style,
                      {
                        color: theme.colors.text.strong,
                        fontFamily: 'Quicksand_700Bold',
                        fontSize: 16,
                        marginBottom: 10,
                      }
                    ),
                    dimensions.width
                  )}
                  title={'Terms & Conditions (link)'}
                />
                {/* Link 2 */}
                <Link
                  accessible={true}
                  onPress={() => {
                    try {
                      navigation.push('PrivacyPolicyScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  {...GlobalStyles.LinkStyles(theme)['Link'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.LinkStyles(theme)['Link'].style,
                      {
                        color: theme.colors.text.strong,
                        fontFamily: 'Quicksand_700Bold',
                        fontSize: 16,
                      }
                    ),
                    dimensions.width
                  )}
                  title={'Privacy Policy (link)'}
                />
              </View>
            </SimpleStyleScrollView>
          );
        }}
      </XanoCollectionApi.FetchAuthMeGET>
    </ScreenContainer>
  );
};

export default withTheme(MyAccountScreen);
