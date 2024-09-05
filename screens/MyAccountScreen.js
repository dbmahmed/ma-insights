import React from 'react';
import {
  Button,
  Checkbox,
  CircularProgress,
  HStack,
  IconButton,
  LinearGradient,
  Link,
  ScreenContainer,
  Shadow,
  SimpleStyleScrollView,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { H5, H6 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import CustomBottomNavBlock from '../components/CustomBottomNavBlock';
import CustomHeaderBlock from '../components/CustomHeaderBlock';
import LoadingBlock from '../components/LoadingBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import assessAccess from '../global-functions/assessAccess';
import linkGen from '../global-functions/linkGen';
import passwordValidate from '../global-functions/passwordValidate';
import removeGlobalScroll from '../global-functions/removeGlobalScroll';
import resetAccess from '../global-functions/resetAccess';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import waitUtil from '../utils/wait';

const MyAccountScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [confirmPass, setConfirmPass] = React.useState('');
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [ed_loading, setEd_loading] = React.useState(false);
  const [emailDach, setEmailDach] = React.useState(
    Constants['ME']?.email_notification_dach
  );
  const [emailNordic, setEmailNordic] = React.useState(
    Constants['ME']?.email_notification_nordic
  );
  const [en_loading, setEn_loading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [newPass, setNewPass] = React.useState('');
  const [pd_loading, setPd_loading] = React.useState(false);
  const [pn_loading, setPn_loading] = React.useState(false);
  const [pushNotificationDach, setPushNotificationDach] = React.useState(
    Constants['ME']?.push_notification_nl_dach
  );
  const [pushNotificationNordic, setPushNotificationNordic] = React.useState(
    Constants['ME']?.push_notification_nl_nordic
  );
  const [showModal, setShowModal] = React.useState(false);
  const resetPasswordsFields = () => {
    setConfirmPass('');
    setNewPass('');
    setCurrentPassword('');
  };

  const joinStringArray = stringArray => {
    return stringArray.join(', ');
  };
  const xanoCollectionUpdateNotificationPUT =
    XanoCollectionApi.useUpdateNotificationPUT();
  const xanoCollectionResetPasswordPUT =
    XanoCollectionApi.useResetPasswordPUT();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      console.log(Constants['ME']);
      removeGlobalScroll();
      setGlobalVariableValue({
        key: 'pageName',
        value: 'My account',
      });
      setGlobalVariableValue({
        key: 'subPage',
        value: false,
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
  const password6FVhvLAWRef = React.useRef();

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasLeftSafeArea={false}
      hasRightSafeArea={false}
      hasTopSafeArea={true}
    >
      <CustomHeaderBlock />
      <XanoCollectionApi.FetchAuthMeGET
        handlers={{
          on2xx: fetchData => {
            try {
              /* hidden 'Set Variable' action */
              /* hidden 'Set Variable' action */
              /* hidden 'Set Variable' action */
              /* hidden 'Set Variable' action */
              /* hidden 'Set Variable' action */
            } catch (err) {
              console.error(err);
            }
          },
        }}
      >
        {({ loading, error, data, refetchAuthMe }) => {
          const fetchData = data?.json;
          if (loading) {
            return <LoadingBlock />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <>
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
                        {'My account'}
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
                        {...GlobalStyles.TextStyles(theme)['screen_title']
                          .props}
                        adjustsFontSizeToFit={true}
                        numberOfLines={2}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['screen_title']
                              .style,
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
                          {
                            alignItems: 'center',
                            flexDirection: 'row',
                            gap: 4,
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
                              { fontFamily: 'Quicksand_500Medium' }
                            ),
                            dimensions.width
                          )}
                        >
                          {'****************'}
                        </Text>
                        <IconButton
                          onPress={() => {
                            try {
                              setShowModal(true);
                              resetPasswordsFields();
                            } catch (err) {
                              console.error(err);
                            }
                          }}
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
                          fontSize: [
                            { minWidth: Breakpoints.Laptop, value: 12 },
                            { minWidth: Breakpoints.Mobile, value: 12 },
                          ],
                          marginBottom: 20,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {
                      'To update basic profile information, other than your password, please email Sahana at '
                    }
                    <Link
                      accessible={true}
                      onPress={() => {
                        const handler = async () => {
                          try {
                            await WebBrowser.openBrowserAsync(
                              'mailto:sg@mainsights.io'
                            );
                          } catch (err) {
                            console.error(err);
                          }
                        };
                        handler();
                      }}
                      {...GlobalStyles.LinkStyles(theme)['Link'].props}
                      style={StyleSheet.applyWidth(
                        GlobalStyles.LinkStyles(theme)['Link'].style,
                        dimensions.width
                      )}
                      title={'sg@mainsights.io'}
                    />
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
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flexDirection: 'column', gap: 8, marginBottom: 20 },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        { flexDirection: 'row', gap: 0, width: '100%' },
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          { paddingRight: 2, width: '30%' },
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
                          {'Event'}
                        </Text>
                      </View>
                      {/* View 2 */}
                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', width: '70%' },
                          dimensions.width
                        )}
                      >
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { paddingLeft: 2, paddingRight: 2, width: '50%' },
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
                                  fontFamily: 'Quicksand_700Bold',
                                  textAlign: 'center',
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {'Email'}
                          </Text>
                        </View>
                      </View>
                    </View>
                    {/* View 2 */}
                    <View
                      style={StyleSheet.applyWidth(
                        { flexDirection: 'row', gap: 0, width: '100%' },
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            justifyContent: 'center',
                            paddingRight: 2,
                            width: '30%',
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
                              { fontFamily: 'Quicksand_500Medium' }
                            ),
                            dimensions.width
                          )}
                        >
                          {'New Nordic NL'}
                        </Text>
                      </View>
                      {/* View 2 */}
                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', width: '70%' },
                          dimensions.width
                        )}
                      >
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              paddingLeft: 2,
                              paddingRight: 2,
                              width: '50%',
                            },
                            dimensions.width
                          )}
                        >
                          <Checkbox
                            onPress={newCheckboxValue => {
                              const handler = async () => {
                                try {
                                  setEmailNordic(newCheckboxValue);
                                  setEn_loading(true);
                                  await waitUtil({ milliseconds: 100 });
                                  (
                                    await xanoCollectionUpdateNotificationPUT.mutateAsync(
                                      {
                                        email_dach: emailDach,
                                        email_nordic: newCheckboxValue,
                                        push_dach: pushNotificationDach,
                                        push_nordic: pushNotificationNordic,
                                      }
                                    )
                                  )?.json;
                                  /* hidden 'Refetch Data' action */
                                  /* hidden 'Set Variable' action */
                                } catch (err) {
                                  console.error(err);
                                }
                              };
                              handler();
                            }}
                            color={theme.colors.text.medium}
                            status={emailNordic}
                            uncheckedColor={theme.colors.text.medium}
                          />
                        </View>
                      </View>
                    </View>
                    {/* View 2 2 */}
                    <View
                      style={StyleSheet.applyWidth(
                        { flexDirection: 'row', gap: 0, width: '100%' },
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            justifyContent: 'center',
                            paddingRight: 2,
                            width: '30%',
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
                              { fontFamily: 'Quicksand_500Medium' }
                            ),
                            dimensions.width
                          )}
                        >
                          {'New DACH NL'}
                        </Text>
                      </View>
                      {/* View 2 */}
                      <View
                        style={StyleSheet.applyWidth(
                          { flexDirection: 'row', width: '70%' },
                          dimensions.width
                        )}
                      >
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              paddingLeft: 2,
                              paddingRight: 2,
                              width: '50%',
                            },
                            dimensions.width
                          )}
                        >
                          <Checkbox
                            onPress={newCheckboxValue => {
                              const handler = async () => {
                                try {
                                  setEmailDach(newCheckboxValue);
                                  setEd_loading(true);
                                  await waitUtil({ milliseconds: 100 });
                                  (
                                    await xanoCollectionUpdateNotificationPUT.mutateAsync(
                                      {
                                        email_dach: newCheckboxValue,
                                        email_nordic: emailNordic,
                                        push_dach: pushNotificationDach,
                                        push_nordic: pushNotificationNordic,
                                      }
                                    )
                                  )?.json;
                                  /* hidden 'Refetch Data' action */
                                  /* hidden 'Set Variable' action */
                                } catch (err) {
                                  console.error(err);
                                }
                              };
                              handler();
                            }}
                            color={theme.colors.text.medium}
                            status={emailDach}
                            uncheckedColor={theme.colors.text.medium}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
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
                          alignSelf: [
                            {
                              minWidth: Breakpoints.Mobile,
                              value: 'flex-start',
                            },
                            {
                              minWidth: Breakpoints.Laptop,
                              value: 'flex-start',
                            },
                          ],
                          color: theme.colors.text.strong,
                          fontFamily: 'Quicksand_700Bold',
                          fontSize: 16,
                          marginBottom: 10,
                          marginTop: {
                            minWidth: Breakpoints.Laptop,
                            value: 10,
                          },
                        }
                      ),
                      dimensions.width
                    )}
                    title={'Terms & Conditions'}
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
                          alignSelf: [
                            {
                              minWidth: Breakpoints.Mobile,
                              value: 'flex-start',
                            },
                            {
                              minWidth: Breakpoints.Laptop,
                              value: 'flex-start',
                            },
                          ],
                          color: theme.colors.text.strong,
                          fontFamily: 'Quicksand_700Bold',
                          fontSize: 16,
                          marginBottom: [
                            { minWidth: Breakpoints.Laptop, value: 10 },
                            { minWidth: Breakpoints.Mobile, value: 10 },
                          ],
                          marginTop: {
                            minWidth: Breakpoints.Laptop,
                            value: 10,
                          },
                        }
                      ),
                      dimensions.width
                    )}
                    title={'Privacy Policy'}
                  />
                  {/* Link 3 */}
                  <Link
                    accessible={true}
                    onPress={() => {
                      try {
                        resetAccess(
                          navigation,
                          Variables,
                          setGlobalVariableValue
                        );
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    {...GlobalStyles.LinkStyles(theme)['Link'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.LinkStyles(theme)['Link'].style,
                        {
                          alignSelf: [
                            {
                              minWidth: Breakpoints.Mobile,
                              value: 'flex-start',
                            },
                            {
                              minWidth: Breakpoints.Laptop,
                              value: 'flex-start',
                            },
                          ],
                          color: theme.colors.text.strong,
                          fontFamily: 'Quicksand_700Bold',
                          fontSize: 16,
                          marginTop: {
                            minWidth: Breakpoints.Laptop,
                            value: 10,
                          },
                        }
                      ),
                      dimensions.width
                    )}
                    title={'Logout'}
                  />
                </View>
              </SimpleStyleScrollView>
              {/* Modal 2 */}
              <Modal
                supportedOrientations={['portrait', 'landscape']}
                animationType={'fade'}
                presentationStyle={'pageSheet'}
                transparent={true}
                visible={showModal}
              >
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
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      height: '100%',
                      justifyContent: [
                        { minWidth: Breakpoints.Mobile, value: 'center' },
                        { minWidth: Breakpoints.Tablet, value: 'flex-start' },
                      ],
                      paddingTop: { minWidth: Breakpoints.Tablet, value: 100 },
                      width: '100%',
                    },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: [
                          { minWidth: Breakpoints.Laptop, value: 'center' },
                          { minWidth: Breakpoints.Mobile, value: 'center' },
                        ],
                        borderRadius: 8,
                        justifyContent: 'center',
                        maxWidth: [
                          { minWidth: Breakpoints.Mobile, value: 380 },
                          { minWidth: Breakpoints.Desktop, value: 900 },
                          { minWidth: Breakpoints.Laptop, value: 900 },
                        ],
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
                          { margin: null, maxWidth: 380, width: '100%' }
                        ),
                        dimensions.width
                      )}
                    >
                      <HStack
                        {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.HStackStyles(theme)['H Stack'].style,
                            {
                              alignItems: 'flex-start',
                              backgroundColor: 'rgba(0, 0, 0, 0)',
                              justifyContent: 'space-between',
                              padding: 10,
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        <H5
                          selectable={false}
                          {...GlobalStyles.H5Styles(theme)['H5'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.H5Styles(theme)['H5'].style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontSize: 16,
                                marginTop: 0,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Change password'}
                        </H5>

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
                      </HStack>

                      <View
                        onLayout={event => {
                          try {
                            /* hidden 'Focus Text Input' action */
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <H5
                          selectable={false}
                          {...GlobalStyles.H5Styles(theme)['H5'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.H5Styles(theme)['H5'].style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontSize: 16,
                                margin: 0,
                                marginBottom: 0,
                                padding: 10,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Current password'}
                        </H5>
                        {/* Password */}
                        <TextInput
                          autoCapitalize={'none'}
                          changeTextDelay={500}
                          onChangeText={newPasswordValue => {
                            try {
                              setCurrentPassword(newPasswordValue);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          webShowOutline={true}
                          {...GlobalStyles.TextInputStyles(theme)[
                            'Login Text Style'
                          ].props}
                          autoCorrect={false}
                          autoFocus={true}
                          clearButtonMode={'while-editing'}
                          keyboardType={'default'}
                          numberOfLines={1}
                          placeholder={'Enter current password'}
                          placeholderTextColor={theme.colors.text.medium}
                          ref={password6FVhvLAWRef}
                          returnKeyType={'next'}
                          secureTextEntry={true}
                          selectionColor={theme.colors.text.strong}
                          spellcheck={true}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextInputStyles(theme)[
                                'Login Text Style'
                              ].style,
                              {
                                backgroundColor: theme.colors.background.brand,
                                borderColor: theme.colors.text.strong,
                                borderStyle: 'solid',
                                fontFamily: 'Quicksand_400Regular',
                                margin: 10,
                                marginBottom: 10,
                                marginTop: 0,
                                padding: 8,
                                paddingBottom: null,
                                paddingLeft: null,
                                paddingRight: null,
                                paddingTop: null,
                              }
                            ),
                            dimensions.width
                          )}
                          value={currentPassword}
                        />
                        <Link
                          accessible={true}
                          onPress={() => {
                            try {
                              resetAccess(
                                navigation,
                                Variables,
                                setGlobalVariableValue
                              );
                              navigation.push('ForgotPasswordScreen');
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          {...GlobalStyles.LinkStyles(theme)['Link'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.LinkStyles(theme)['Link'].style,
                              {
                                color: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: palettes.App.Orange,
                                  },
                                  {
                                    minWidth: Breakpoints.Laptop,
                                    value: palettes.App.Orange,
                                  },
                                ],
                                fontFamily: [
                                  {
                                    minWidth: Breakpoints.Laptop,
                                    value: 'Quicksand_500Medium',
                                  },
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: 'Quicksand_500Medium',
                                  },
                                ],
                                fontSize: 12,
                                marginRight: 10,
                                marginTop: 5,
                                textAlign: 'right',
                                textDecorationLine: 'underline',
                              }
                            ),
                            dimensions.width
                          )}
                          title={'Forgot Password'}
                        />
                        {/* H5 2 */}
                        <H5
                          selectable={false}
                          {...GlobalStyles.H5Styles(theme)['H5'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.H5Styles(theme)['H5'].style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontSize: 16,
                                margin: 0,
                                marginBottom: 0,
                                padding: 10,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'New password'}
                        </H5>
                        {/* New Password */}
                        <TextInput
                          autoCapitalize={'none'}
                          changeTextDelay={500}
                          onChangeText={newNewPasswordValue => {
                            try {
                              setNewPass(newNewPasswordValue);
                              if (newNewPasswordValue === currentPassword) {
                                setErrorMessage(
                                  'New password cannot be the same as current password'
                                );
                              } else {
                                setErrorMessage('');
                              }
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          webShowOutline={true}
                          {...GlobalStyles.TextInputStyles(theme)[
                            'Login Text Style'
                          ].props}
                          autoCorrect={false}
                          autoFocus={true}
                          clearButtonMode={'while-editing'}
                          keyboardType={'default'}
                          numberOfLines={1}
                          placeholder={'Enter new password'}
                          placeholderTextColor={theme.colors.text.medium}
                          returnKeyType={'next'}
                          secureTextEntry={true}
                          selectionColor={theme.colors.text.strong}
                          spellcheck={true}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextInputStyles(theme)[
                                'Login Text Style'
                              ].style,
                              {
                                backgroundColor: theme.colors.background.brand,
                                borderColor: theme.colors.text.strong,
                                borderStyle: 'solid',
                                fontFamily: 'Quicksand_400Regular',
                                margin: 10,
                                marginTop: 0,
                              }
                            ),
                            dimensions.width
                          )}
                          value={newPass}
                        />
                        {/* H5 3 */}
                        <H5
                          selectable={false}
                          {...GlobalStyles.H5Styles(theme)['H5'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.H5Styles(theme)['H5'].style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontSize: 16,
                                margin: 0,
                                marginBottom: 0,
                                padding: 10,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Confirm password'}
                        </H5>
                        {/* Confirm password */}
                        <TextInput
                          autoCapitalize={'none'}
                          changeTextDelay={500}
                          onChangeText={newConfirmPasswordValue => {
                            try {
                              setConfirmPass(newConfirmPasswordValue);
                              if (newPass !== newConfirmPasswordValue) {
                                setErrorMessage("Passwords don't match");
                              } else {
                                setErrorMessage('');
                              }
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          webShowOutline={true}
                          {...GlobalStyles.TextInputStyles(theme)[
                            'Login Text Style'
                          ].props}
                          autoCorrect={false}
                          autoFocus={true}
                          clearButtonMode={'while-editing'}
                          keyboardType={'default'}
                          numberOfLines={1}
                          placeholder={'Enter confirm password'}
                          placeholderTextColor={theme.colors.text.medium}
                          returnKeyType={'next'}
                          secureTextEntry={true}
                          selectionColor={theme.colors.text.strong}
                          spellcheck={true}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextInputStyles(theme)[
                                'Login Text Style'
                              ].style,
                              {
                                backgroundColor: theme.colors.background.brand,
                                borderColor: theme.colors.text.strong,
                                borderStyle: 'solid',
                                fontFamily: 'Quicksand_400Regular',
                                margin: 10,
                                marginTop: 0,
                              }
                            ),
                            dimensions.width
                          )}
                          value={confirmPass}
                        />
                        <>
                          {!(errorMessage !== '') ? null : (
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)['screen_title']
                                .props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)['screen_title']
                                    .style,
                                  {
                                    color: [
                                      {
                                        minWidth: Breakpoints.Laptop,
                                        value: palettes.App.Orange,
                                      },
                                      {
                                        minWidth: Breakpoints.Laptop,
                                        value:
                                          errorMessage !== 'password reset!'
                                            ? palettes.App.Orange
                                            : palettes.App.green,
                                      },
                                    ],
                                    fontFamily: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 'Quicksand_600SemiBold',
                                    },
                                    marginLeft: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 10,
                                    },
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {errorMessage}
                            </Text>
                          )}
                        </>
                      </View>
                      {/* Buttons */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignContent: 'flex-start',
                            flexDirection: 'row',
                            flexGrow: 1,
                            gap: [
                              { minWidth: Breakpoints.Mobile, value: 8 },
                              { minWidth: Breakpoints.Laptop, value: 10 },
                            ],
                            justifyContent: [
                              {
                                minWidth: Breakpoints.Laptop,
                                value: 'flex-end',
                              },
                              {
                                minWidth: Breakpoints.Mobile,
                                value: 'flex-end',
                              },
                            ],
                            marginBottom: 10,
                            padding: 10,
                          },
                          dimensions.width
                        )}
                      >
                        {/* save */}
                        <Button
                          iconPosition={'left'}
                          onPress={() => {
                            const handler = async () => {
                              try {
                                setButtonLoading(true);
                                if (currentPassword === newPass) {
                                  setErrorMessage(
                                    'New password cannot be same as Current Password'
                                  );
                                } else {
                                  if (passwordValidate(newPass)) {
                                    setErrorMessage('');
                                    const resetPass = (
                                      await xanoCollectionResetPasswordPUT.mutateAsync(
                                        {
                                          current_password: currentPassword,
                                          new_password: newPass,
                                        }
                                      )
                                    )?.json;
                                    setErrorMessage(resetPass?.message);
                                    if (
                                      resetPass?.message ===
                                      'Your current password is incorrect!'
                                    ) {
                                      setErrorMessage(resetPass?.message);
                                    } else {
                                      setErrorMessage(resetPass?.message);
                                      await waitUtil({ milliseconds: 500 });
                                      setShowModal(false);
                                    }
                                  } else {
                                    setErrorMessage(
                                      'This is a weak password. Please try again.'
                                    );
                                  }
                                }

                                setButtonLoading(false);
                              } catch (err) {
                                console.error(err);
                              }
                            };
                            handler();
                          }}
                          {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                          disabled={
                            newPass &&
                            confirmPass &&
                            currentPassword &&
                            newPass === confirmPass
                              ? false
                              : true
                          }
                          loading={buttonLoading}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ButtonStyles(theme)['Button'].style,
                              {
                                backgroundColor: palettes.App.Orange,
                                fontFamily: 'Quicksand_600SemiBold',
                                textTransform: 'uppercase',
                                width: [
                                  { minWidth: Breakpoints.Laptop, value: 150 },
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: '100%',
                                  },
                                ],
                              }
                            ),
                            dimensions.width
                          )}
                          title={'Save'}
                        />
                      </View>
                    </LinearGradient>
                  </View>
                </SimpleStyleScrollView>
              </Modal>
            </>
          );
        }}
      </XanoCollectionApi.FetchAuthMeGET>
      <CustomBottomNavBlock />
    </ScreenContainer>
  );
};

export default withTheme(MyAccountScreen);
