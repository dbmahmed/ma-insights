import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import * as XanoResetPassApi from '../apis/XanoResetPassApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import assessAccess from '../global-functions/assessAccess';
import setAccessToken from '../global-functions/setAccessToken';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import parseBoolean from '../utils/parseBoolean';
import useWindowDimensions from '../utils/useWindowDimensions';
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
import { Image, Keyboard, Modal, Text, View } from 'react-native';

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
      /* hidden 'Set Variable' action */ console.log(
        'Complete ON_SCREEN_FOCUS:0 SET_VARIABLE'
      );
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
      console.log('Start ON_SCREEN_FOCUS:3 NAVIGATE');
      if (navigation.canGoBack()) {
        navigation.popToTop();
      }
      navigation.replace('MAInsights');
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
            GlobalStyles.VStackStyles(theme)['V Stack'].style,
            dimensions.width
          )}
        >
          {/* NKP Logo */}
          <Image
            {...GlobalStyles.ImageStyles(theme)['Image'].props}
            resizeMode={'contain'}
            source={Images.mainsightsfaviconlogo1024new}
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
      <>
        {firstLogin ? null : (
          <KeyboardAvoidingView
            behavior={'padding'}
            enabled={true}
            keyboardVerticalOffset={0}
          >
            {/* Login Window */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignContent: {
                    minWidth: Breakpoints.Laptop,
                    value: 'center',
                  },
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
                {/* Password */}
                <>
                  {!emailEntered ? null : (
                    <TextInput
                      autoCapitalize={'none'}
                      changeTextDelay={500}
                      onBlur={() => {
                        try {
                          Keyboard.dismiss();
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
                      {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['screen_title'].style,
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
                              if (signIn?.Initial_Login_Complete === true) {
                              } else {
                                setEmailEntered(true);
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
                {/* Login */}
                <>
                  {!emailEntered ? null : (
                    <Button
                      iconPosition={'left'}
                      onPress={() => {
                        const handler = async () => {
                          console.log('Login ON_PRESS Start');
                          let error = null;
                          try {
                            console.log('Start ON_PRESS:0 SET_VARIABLE');
                            setLogInPressed(true);
                            console.log('Complete ON_PRESS:0 SET_VARIABLE');
                            console.log('Start ON_PRESS:1 CONDITIONAL_STOP');
                            if (!loginFormValidator()) {
                              return console.log(
                                'Complete ON_PRESS:1 CONDITIONAL_STOP'
                              );
                            } else {
                              console.log(
                                'Skipped ON_PRESS:1 CONDITIONAL_STOP: condition not met'
                              );
                            }
                            console.log('Start ON_PRESS:2 FETCH_REQUEST');
                            const Xano_Auth = (
                              await XanoCollectionApi.loginPOST(Constants, {
                                email: emailVarl,
                                password: passwordVarl,
                              })
                            )?.json;
                            console.log('Complete ON_PRESS:2 FETCH_REQUEST', {
                              Xano_Auth,
                            });
                            console.log('Start ON_PRESS:3 CONSOLE_LOG');
                            console.log('XANO_AUTH', Xano_Auth);
                            console.log('Complete ON_PRESS:3 CONSOLE_LOG');
                            console.log('Start ON_PRESS:4 CUSTOM_FUNCTION');
                            /* hidden 'Run a Custom Function' action */ console.log(
                              'Complete ON_PRESS:4 CUSTOM_FUNCTION'
                            );
                            console.log('Start ON_PRESS:5 EXTRACT_KEY');
                            const savedToken = Xano_Auth?.authToken;
                            console.log('Complete ON_PRESS:5 EXTRACT_KEY', {
                              savedToken,
                            });
                            console.log('Start ON_PRESS:6 EXTRACT_KEY');
                            const message = Xano_Auth?.message;
                            console.log('Complete ON_PRESS:6 EXTRACT_KEY', {
                              message,
                            });
                            console.log('Start ON_PRESS:7 SET_VARIABLE');
                            setErrorMessage(message);
                            console.log('Complete ON_PRESS:7 SET_VARIABLE');
                            console.log('Start ON_PRESS:8 SET_VARIABLE');
                            setLogInPressed(false);
                            console.log('Complete ON_PRESS:8 SET_VARIABLE');
                            console.log('Start ON_PRESS:9 CONDITIONAL_STOP');
                            if (!savedToken) {
                              return console.log(
                                'Complete ON_PRESS:9 CONDITIONAL_STOP'
                              );
                            } else {
                              console.log(
                                'Skipped ON_PRESS:9 CONDITIONAL_STOP: condition not met'
                              );
                            }
                            console.log('Start ON_PRESS:10 SET_VARIABLE');
                            setGlobalVariableValue({
                              key: 'AUTH_HEADER',
                              value: 'Bearer ' + savedToken,
                            });
                            console.log('Complete ON_PRESS:10 SET_VARIABLE');
                            console.log('Start ON_PRESS:11 FETCH_REQUEST');
                            /* hidden 'API Request' action */ console.log(
                              'Complete ON_PRESS:11 FETCH_REQUEST'
                            );
                            console.log('Start ON_PRESS:12 NAVIGATE');
                            navigation.navigate('SplashScreen');
                            console.log('Complete ON_PRESS:12 NAVIGATE');
                          } catch (err) {
                            console.error(err);
                            error = err.message ?? err;
                          }
                          console.log(
                            'Login ON_PRESS Complete',
                            error ? { error } : 'no error'
                          );
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
                        marginBottom: 20,
                      }
                    ),
                    dimensions.width
                  )}
                  title={'Request Demo'}
                />
              </Surface>
            </View>
          </KeyboardAvoidingView>
        )}
      </>
      <Modal
        animationType={'none'}
        supportedOrientations={['portrait', 'landscape']}
        presentationStyle={'fullScreen'}
        transparent={true}
        visible={firstLogin}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: { minWidth: Breakpoints.Desktop, value: 'center' },
              alignSelf: { minWidth: Breakpoints.Desktop, value: 'center' },
              backgroundColor: {
                minWidth: Breakpoints.Desktop,
                value: palettes.Brand.Surface,
              },
              borderRadius: { minWidth: Breakpoints.Desktop, value: 10 },
              borderWidth: { minWidth: Breakpoints.Desktop, value: 1 },
              bottom: { minWidth: Breakpoints.Desktop, value: 0 },
              height: { minWidth: Breakpoints.Desktop, value: '15%' },
              justifyContent: {
                minWidth: Breakpoints.Desktop,
                value: 'center',
              },
              position: { minWidth: Breakpoints.Desktop, value: 'absolute' },
              top: { minWidth: Breakpoints.Desktop, value: 0 },
              width: { minWidth: Breakpoints.Desktop, value: '35%' },
            },
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
                  alignSelf: { minWidth: Breakpoints.Desktop, value: 'center' },
                  fontFamily: {
                    minWidth: Breakpoints.Desktop,
                    value: 'Quicksand_400Regular',
                  },
                  marginBottom: { minWidth: Breakpoints.Desktop, value: 5 },
                  textAlign: { minWidth: Breakpoints.Desktop, value: 'center' },
                }
              ),
              dimensions.width
            )}
          >
            {
              "It looks like you're logging in for the first time. Please set your password to continue."
            }
          </Text>

          <HStack
            {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.HStackStyles(theme)['H Stack'].style,
                { gap: { minWidth: Breakpoints.Desktop, value: 5 } }
              ),
              dimensions.width
            )}
          >
            <Button
              iconPosition={'left'}
              {...GlobalStyles.ButtonStyles(theme)['Button'].props}
              style={StyleSheet.applyWidth(
                GlobalStyles.ButtonStyles(theme)['Button'].style,
                dimensions.width
              )}
              title={'Continue'}
            />
            {/* Button 2 */}
            <Button
              iconPosition={'left'}
              {...GlobalStyles.ButtonStyles(theme)['Button'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ButtonStyles(theme)['Button'].style,
                  {
                    backgroundColor: {
                      minWidth: Breakpoints.Desktop,
                      value: theme.colors.branding.secondary,
                    },
                    borderWidth: { minWidth: Breakpoints.Desktop, value: 1 },
                    color: {
                      minWidth: Breakpoints.Desktop,
                      value: theme.colors.text.strong,
                    },
                    fontFamily: {
                      minWidth: Breakpoints.Desktop,
                      value: 'Quicksand_700Bold',
                    },
                  }
                ),
                dimensions.width
              )}
              title={'Go Back'}
            />
          </HStack>
        </View>
      </Modal>
    </ScreenContainer>
  );
};

export default withTheme(LogInScreen);
