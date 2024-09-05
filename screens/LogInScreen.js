import React from 'react';
import {
  Button,
  HStack,
  KeyboardAvoidingView,
  Link,
  ScreenContainer,
  Surface,
  TextInput,
  VStack,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Image, Keyboard, Modal, Platform, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import * as XanoResetPassApi from '../apis/XanoResetPassApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import assessAccess from '../global-functions/assessAccess';
import deviceType from '../global-functions/deviceType';
import removeGlobalScroll from '../global-functions/removeGlobalScroll';
import setAccessToken from '../global-functions/setAccessToken';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import parseBoolean from '../utils/parseBoolean';
import useWindowDimensions from '../utils/useWindowDimensions';

const LogInScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [LogInPressed, setLogInPressed] = React.useState(false);
  const [emailEntered, setEmailEntered] = React.useState(false);
  const [emailVarl, setEmailVarl] = React.useState('');
  const [enterPressed, setEnterPressed] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [firstLogin, setFirstLogin] = React.useState(false);
  const [passwordVarl, setPasswordVarl] = React.useState('');
  const [resetNeeded, setResetNeeded] = React.useState(false);
  const loginFormValidator = () => {
    var emailPattern = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;
    var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

    if (!emailVarl.match(emailPattern)) {
      setErrorMessage('*Invalid email address!');
      return false;
    }

    if (!passwordVarl.match(passwordPattern)) {
      setErrorMessage(
        '*Password must be at least 6 characters, and contain at least one lowercase letter, one uppercase letter, and one digit.'
      );
      return false;
    }

    console.log('Inputs are valid!'); // All checks passed
    setErrorMessage(''); // Clear any previous error message
    return true;
  };
  const isFocused = useIsFocused();
  React.useEffect(() => {
    console.log('Screen ON_SCREEN_FOCUS Start');
    let error = null;
    try {
      if (!isFocused) {
        return;
      }
      console.log('Start ON_SCREEN_FOCUS:0 SET_VARIABLE');
      setGlobalVariableValue({
        key: 'top_nav_pressed',
        value: false,
      });
      console.log('Complete ON_SCREEN_FOCUS:0 SET_VARIABLE');
      console.log('Start ON_SCREEN_FOCUS:1 CONSOLE_LOG');
      /* hidden 'Log to Console' action */ console.log(
        'Complete ON_SCREEN_FOCUS:1 CONSOLE_LOG'
      );
      console.log('Start ON_SCREEN_FOCUS:2 CONDITIONAL_STOP');
      if (assessAccess(Variables, setGlobalVariableValue) === false) {
        return console.log('Complete ON_SCREEN_FOCUS:2 CONDITIONAL_STOP');
      } else {
        console.log(
          'Skipped ON_SCREEN_FOCUS:2 CONDITIONAL_STOP: condition not met'
        );
      }
      console.log('Start ON_SCREEN_FOCUS:4 CUSTOM_FUNCTION');
      removeGlobalScroll();
      console.log('Complete ON_SCREEN_FOCUS:4 CUSTOM_FUNCTION');
    } catch (err) {
      console.error(err);
      error = err.message ?? err;
    }
    console.log(
      'Screen ON_SCREEN_FOCUS Complete',
      error ? { error } : 'no error'
    );
  }, [isFocused]);
  const passwordyUSI8C8SRef = React.useRef();

  return (
    <ScreenContainer
      hasSafeArea={false}
      hasLeftSafeArea={true}
      hasRightSafeArea={true}
      hasTopSafeArea={true}
      scrollable={true}
      style={StyleSheet.applyWidth(
        { backgroundColor: '"rgb(0, 0, 0)"', justifyContent: 'center' },
        dimensions.width
      )}
    >
      <View
        style={StyleSheet.applyWidth(
          {
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            maxWidth: { minWidth: Breakpoints.Tablet, value: 380 },
            width: [
              { minWidth: Breakpoints.Laptop, value: '50%' },
              { minWidth: Breakpoints.Tablet, value: '100%' },
            ],
          },
          dimensions.width
        )}
      >
        <VStack
          {...GlobalStyles.VStackStyles(theme)['V Stack'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.VStackStyles(theme)['V Stack'].style,
              { gap: 5 }
            ),
            dimensions.width
          )}
        >
          {/* NKP Logo */}
          <Image
            {...GlobalStyles.ImageStyles(theme)['Image'].props}
            resizeMode={'contain'}
            source={imageSource(Images['mainsightsfaviconlogo1024new'])}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ImageStyles(theme)['Image'].style,
                { width: 300 }
              ),
              dimensions.width
            )}
          />
          {/* Text 2 */}
          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['screen_title'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['screen_title'].style,
                {
                  color: [
                    {
                      minWidth: Breakpoints.Desktop,
                      value: palettes.App.Orange,
                    },
                    {
                      minWidth: Breakpoints.Mobile,
                      value: palettes.App.Orange,
                    },
                  ],
                  fontFamily: [
                    {
                      minWidth: Breakpoints.Desktop,
                      value: 'Poppins_900Black',
                    },
                    { minWidth: Breakpoints.Mobile, value: 'Poppins_900Black' },
                  ],
                  fontSize: 30,
                  lineHeight: 30,
                  paddingBottom: { minWidth: Breakpoints.Desktop, value: 0 },
                  textAlign: 'center',
                }
              ),
              dimensions.width
            )}
          >
            {dimensions.width >= Breakpoints.Laptop
              ? 'M&A INSIGHTS'
              : 'M&A\nINSIGHTS'}
          </Text>

          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['screen_title'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['screen_title'].style,
                {
                  alignSelf: 'center',
                  color: palettes.Brand.Surface,
                  fontFamily: 'Poppins_400Regular',
                  fontSize: 15,
                  marginTop: 15,
                  textAlign: 'center',
                }
              ),
              dimensions.width
            )}
          >
            {'Creating visibility in unlisted markets'}
          </Text>
        </VStack>
      </View>

      <KeyboardAvoidingView
        enabled={true}
        keyboardVerticalOffset={0}
        behavior={'position'}
      >
        {/* Login Window */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignContent: { minWidth: Breakpoints.Laptop, value: 'center' },
              alignItems: { minWidth: Breakpoints.Laptop, value: 'center' },
              alignSelf: [
                { minWidth: Breakpoints.Laptop, value: 'center' },
                { minWidth: Breakpoints.Tablet, value: 'center' },
              ],
              width: [
                { minWidth: Breakpoints.Laptop, value: '50%' },
                { minWidth: Breakpoints.Tablet, value: '50%' },
              ],
            },
            dimensions.width
          )}
        >
          <Surface
            {...GlobalStyles.SurfaceStyles(theme)['Surface'].props}
            elevation={2}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.SurfaceStyles(theme)['Surface'].style,
                {
                  margin: { minWidth: Breakpoints.Laptop, value: null },
                  maxWidth: { minWidth: Breakpoints.Tablet, value: 380 },
                  width: { minWidth: Breakpoints.Laptop, value: '100%' },
                }
              ),
              dimensions.width
            )}
          >
            <>
              {firstLogin ? null : (
                <View>
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['screen_title'].style,
                        {
                          alignSelf: 'center',
                          fontFamily: 'Quicksand_700Bold',
                          fontSize: 25,
                          margin: 10,
                          padding: 10,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Login'}
                  </Text>
                  {/* Email */}
                  <TextInput
                    autoCapitalize={'none'}
                    changeTextDelay={500}
                    onChangeText={newEmailValue => {
                      try {
                        setEmailVarl(newEmailValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    onSubmitEditing={() => {
                      const handler = async () => {
                        try {
                          /* hidden 'Focus Text Input' action */
                          Keyboard.dismiss();
                          setEnterPressed(true);
                          const signIn = (
                            await XanoResetPassApi.initialLoginGET(Constants, {
                              email: emailVarl,
                            })
                          )?.json;
                          if (signIn?.message === null) {
                            setEmailEntered(true);
                          } else {
                            setErrorMessage(signIn?.message);
                          }
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
                    }}
                    webShowOutline={true}
                    {...GlobalStyles.TextInputStyles(theme)['Login Text Style']
                      .props}
                    autoComplete={'email'}
                    autoCorrect={false}
                    autoFocus={false}
                    clearButtonMode={'while-editing'}
                    keyboardType={'email-address'}
                    numberOfLines={1}
                    placeholder={'Enter email...'}
                    placeholderTextColor={theme.colors.text.medium}
                    returnKeyType={'next'}
                    selectionColor={theme.colors.text.strong}
                    spellcheck={true}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextInputStyles(theme)['Login Text Style']
                          .style,
                        {
                          borderColor: theme.colors.text.strong,
                          borderStyle: 'solid',
                          fontFamily: 'Quicksand_400Regular',
                          margin: 10,
                          padding: 10,
                        }
                      ),
                      dimensions.width
                    )}
                    value={emailVarl}
                  />
                  {/* Enter Email */}
                  <>
                    {!(emailEntered === false) ? null : (
                      <Button
                        iconPosition={'left'}
                        onPress={() => {
                          const handler = async () => {
                            console.log('Enter Email ON_PRESS Start');
                            let error = null;
                            try {
                              console.log('Start ON_PRESS:0 CUSTOM_FUNCTION');
                              /* hidden 'Run a Custom Function' action */ console.log(
                                'Complete ON_PRESS:0 CUSTOM_FUNCTION'
                              );
                              console.log('Start ON_PRESS:1 SET_VARIABLE');
                              setEnterPressed(true);
                              console.log('Complete ON_PRESS:1 SET_VARIABLE');
                              console.log('Start ON_PRESS:2 FETCH_REQUEST');
                              const signIn = (
                                await XanoResetPassApi.initialLoginGET(
                                  Constants,
                                  { email: emailVarl }
                                )
                              )?.json;
                              console.log('Complete ON_PRESS:2 FETCH_REQUEST', {
                                signIn,
                              });
                              console.log('Start ON_PRESS:3 IF');
                              if (signIn?.email !== null) {
                                setErrorMessage('');
                                console.log(signIn?.Initial_Login_Complete);
                                if (signIn?.Initial_Login_Complete === true) {
                                  setEmailEntered(true);
                                } else {
                                  setFirstLogin(true);
                                  setEmailVarl('');
                                }
                              } else {
                                setErrorMessage(signIn?.message);
                              }
                              console.log('Complete ON_PRESS:3 IF');
                            } catch (err) {
                              console.error(err);
                              error = err.message ?? err;
                            }
                            console.log(
                              'Enter Email ON_PRESS Complete',
                              error ? { error } : 'no error'
                            );
                          };
                          handler();
                        }}
                        {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                        disabled={emailVarl === ''}
                        loading={emailEntered}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ButtonStyles(theme)['Button'].style,
                            {
                              fontFamily: 'Quicksand_600SemiBold',
                              marginLeft: 10,
                              marginRight: 10,
                              marginTop: 10,
                            }
                          ),
                          dimensions.width
                        )}
                        title={'Enter'}
                      />
                    )}
                  </>
                  {/* Password */}
                  <>
                    {!emailEntered ? null : (
                      <TextInput
                        autoCapitalize={'none'}
                        changeTextDelay={500}
                        onBlur={() => {
                          try {
                            /* hidden 'Dismiss Keyboard' action */
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        onChangeText={newPasswordValue => {
                          try {
                            setPasswordVarl(newPasswordValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        onSubmitEditing={() => {
                          try {
                            Keyboard.dismiss();
                            /* hidden 'API Request' action */
                            /* hidden 'If/Else' action */
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        webShowOutline={true}
                        {...GlobalStyles.TextInputStyles(theme)['Text Input']
                          .props}
                        autoCorrect={false}
                        placeholder={'Enter password...'}
                        placeholderTextColor={theme.colors.text.medium}
                        ref={passwordyUSI8C8SRef}
                        returnKeyLabel={'Login'}
                        returnKeyType={'go'}
                        secureTextEntry={true}
                        spellcheck={true}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextInputStyles(theme)['Text Input']
                              .style,
                            {
                              borderColor: theme.colors.text.strong,
                              fontFamily: 'Quicksand_400Regular',
                              margin: 10,
                              padding: 10,
                            }
                          ),
                          dimensions.width
                        )}
                        value={passwordVarl}
                      />
                    )}
                  </>
                  {/* err message */}
                  <>
                    {!errorMessage ? null : (
                      <Text
                        accessible={true}
                        {...GlobalStyles.TextStyles(theme)['screen_title']
                          .props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['screen_title']
                              .style,
                            {
                              color: theme.colors.background.danger,
                              fontFamily: 'Quicksand_700Bold',
                              marginLeft: 10,
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {errorMessage}
                      </Text>
                    )}
                  </>
                  {/* Login */}
                  <>
                    {!emailEntered ? null : (
                      <Button
                        iconPosition={'left'}
                        onPress={() => {
                          const handler = async () => {
                            try {
                              setLogInPressed(true);
                              if (!loginFormValidator()) {
                                return;
                              }
                              const Xano_Auth = (
                                await XanoCollectionApi.loginPOST(Constants, {
                                  deviceType: deviceType(
                                    Platform.OS === 'web',
                                    Platform.OS === 'ios',
                                    Platform.OS === 'android'
                                  ),
                                  email: emailVarl,
                                  password: passwordVarl,
                                })
                              )?.json;
                              console.log('XANO_AUTH', Xano_Auth);
                              /* hidden 'Run a Custom Function' action */
                              const savedToken = Xano_Auth?.authToken;
                              const message = Xano_Auth?.message;
                              setErrorMessage(message);
                              setLogInPressed(false);
                              if (!savedToken) {
                                return;
                              }
                              setGlobalVariableValue({
                                key: 'AUTH_HEADER',
                                value: 'Bearer ' + savedToken,
                              });
                              /* hidden 'API Request' action */
                              navigation.navigate('SplashScreen');
                            } catch (err) {
                              console.error(err);
                            }
                          };
                          handler();
                        }}
                        {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                        disabled={emailVarl === '' || passwordVarl === ''}
                        loading={parseBoolean(LogInPressed)}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ButtonStyles(theme)['Button'].style,
                            {
                              fontFamily: 'Quicksand_600SemiBold',
                              marginLeft: 10,
                              marginRight: 10,
                              marginTop: 10,
                            }
                          ),
                          dimensions.width
                        )}
                        title={'Log In'}
                      />
                    )}
                  </>
                  <Link
                    accessible={true}
                    onPress={() => {
                      try {
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
                          fontFamily: 'Quicksand_400Regular',
                          fontSize: 12,
                          marginRight: 10,
                          marginTop: 5,
                          textAlign: 'right',
                        }
                      ),
                      dimensions.width
                    )}
                    title={'Reset Password'}
                  />
                  {/* Request Demo */}
                  <Button
                    iconPosition={'left'}
                    onPress={() => {
                      try {
                        navigation.navigate('RequestDemoScreen');
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ButtonStyles(theme)['Button'].style,
                        {
                          backgroundColor: theme.colors.branding.secondary,
                          borderColor: theme.colors.text.strong,
                          borderWidth: 2,
                          color: theme.colors.text.strong,
                          fontFamily: 'Quicksand_600SemiBold',
                          margin: 10,
                          marginBottom: 0,
                        }
                      ),
                      dimensions.width
                    )}
                    title={'Request Demo'}
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
                          fontFamily: 'Quicksand_400Regular',
                          fontSize: 12,
                          marginBottom: 20,
                          marginRight: 10,
                          marginTop: 5,
                          textAlign: 'right',
                        }
                      ),
                      dimensions.width
                    )}
                    title={'Privacy Policy'}
                  />
                </View>
              )}
            </>
            {/* View 2 */}
            <>
              {!firstLogin ? null : (
                <View>
                  {/* Text 2 */}
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['screen_title'].style,
                        {
                          alignSelf: 'center',
                          fontFamily: 'Quicksand_700Bold',
                          fontSize: 25,
                          margin: 10,
                          padding: 10,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'You need to set a new password to proceed.'}
                  </Text>
                  {/* Reset Password */}
                  <>
                    {!(emailEntered === false) ? null : (
                      <Button
                        iconPosition={'left'}
                        onPress={() => {
                          console.log('Reset Password ON_PRESS Start');
                          let error = null;
                          try {
                            console.log('Start ON_PRESS:0 NAVIGATE');
                            if (navigation.canGoBack()) {
                              navigation.popToTop();
                            }
                            navigation.replace('ForgotPasswordScreen');
                            console.log('Complete ON_PRESS:0 NAVIGATE');
                          } catch (err) {
                            console.error(err);
                            error = err.message ?? err;
                          }
                          console.log(
                            'Reset Password ON_PRESS Complete',
                            error ? { error } : 'no error'
                          );
                        }}
                        {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ButtonStyles(theme)['Button'].style,
                            {
                              fontFamily: 'Quicksand_600SemiBold',
                              marginBottom: 20,
                              marginLeft: 10,
                              marginRight: 10,
                              marginTop: 10,
                            }
                          ),
                          dimensions.width
                        )}
                        title={'Reset Password'}
                      />
                    )}
                  </>
                </View>
              )}
            </>
          </Surface>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

export default withTheme(LogInScreen);
