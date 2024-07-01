import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import assessAccess from '../global-functions/assessAccess';
import setAccessToken from '../global-functions/setAccessToken';
import { parseBoolean } from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  KeyboardAvoidingView,
  Link,
  ScreenContainer,
  Surface,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Image, Keyboard, Text, View } from 'react-native';

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
      setGlobalVariableValue({
        key: 'AUTH_HEADER',
        value: '',
      });
      console.log('Complete ON_SCREEN_FOCUS:0 SET_VARIABLE');
      console.log('Start ON_SCREEN_FOCUS:1 CONSOLE_LOG');
      /* hidden 'Log to Console' action */ console.log(
        'Complete ON_SCREEN_FOCUS:1 CONSOLE_LOG'
      );
      console.log('Start ON_SCREEN_FOCUS:2 CONDITIONAL_STOP');
      /* hidden 'Conditional Stop' action */ console.log(
        'Complete ON_SCREEN_FOCUS:2 CONDITIONAL_STOP'
      );
      console.log('Start ON_SCREEN_FOCUS:3 NAVIGATE');
      /* hidden 'Navigate' action */ console.log(
        'Complete ON_SCREEN_FOCUS:3 NAVIGATE'
      );
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
        { backgroundColor: 'rgb(0, 0, 0)', justifyContent: 'center' },
        dimensions.width
      )}
    >
      <View
        style={StyleSheet.applyWidth(
          {
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            width: [
              { minWidth: Breakpoints.Laptop, value: '50%' },
              { minWidth: Breakpoints.Tablet, value: '50%' },
            ],
          },
          dimensions.width
        )}
      >
        {/* NKP Logo */}
        <Image
          {...GlobalStyles.ImageStyles(theme)['Image'].props}
          resizeMode={'contain'}
          source={Images.LogoMobileApp}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'].style, {
              width: 300,
            }),
            dimensions.width
          )}
        />
        <Text
          accessible={true}
          {...GlobalStyles.TextStyles(theme)['screen_title'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.TextStyles(theme)['screen_title'].style,
              {
                alignSelf: 'center',
                color: theme.colors['Surface'],
                fontFamily: 'Quicksand_400Regular',
                marginTop: 15,
                textAlign: 'center',
              }
            ),
            dimensions.width
          )}
        >
          {
            'You are about to log in to the M&A Insights mobile application available on the App Store and Play Store, respectively.'
          }
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={'padding'}
        enabled={true}
        keyboardVerticalOffset={0}
      >
        {/* Login Window */}
        <View
          style={StyleSheet.applyWidth(
            {
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
              GlobalStyles.SurfaceStyles(theme)['Surface'].style,
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
                try {
                  passwordyUSI8C8SRef.current.focus();
                } catch (err) {
                  console.error(err);
                }
              }}
              webShowOutline={true}
              {...GlobalStyles.TextInputStyles(theme)['Login Text Style'].props}
              autoComplete={'email'}
              autoCorrect={false}
              autoFocus={false}
              clearButtonMode={'while-editing'}
              keyboardType={'email-address'}
              numberOfLines={1}
              placeholder={'Enter email...'}
              placeholderTextColor={theme.colors['Medium']}
              returnKeyType={'next'}
              selectionColor={theme.colors['Strong']}
              spellcheck={true}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextInputStyles(theme)['Login Text Style'].style,
                  {
                    borderColor: theme.colors['Strong'],
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
                } catch (err) {
                  console.error(err);
                }
              }}
              webShowOutline={true}
              {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
              autoCorrect={false}
              placeholder={'Enter password...'}
              placeholderTextColor={theme.colors['Medium']}
              ref={passwordyUSI8C8SRef}
              returnKeyLabel={'Login'}
              returnKeyType={'go'}
              secureTextEntry={true}
              spellcheck={true}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextInputStyles(theme)['Text Input'].style,
                  {
                    borderColor: theme.colors['Strong'],
                    fontFamily: 'Quicksand_400Regular',
                    margin: 10,
                    padding: 10,
                  }
                ),
                dimensions.width
              )}
              value={passwordVarl}
            />
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
                        color: theme.colors['Error'],
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
              {!emailEntered ? null : (
                <Button
                  iconPosition={'left'}
                  onPress={() => {
                    console.log('Enter Email ON_PRESS Start');
                    let error = null;
                    try {
                      console.log('Start ON_PRESS:0 CUSTOM_FUNCTION');
                      loginFormValidator();
                      console.log('Complete ON_PRESS:0 CUSTOM_FUNCTION');
                    } catch (err) {
                      console.error(err);
                      error = err.message ?? err;
                    }
                    console.log(
                      'Enter Email ON_PRESS Complete',
                      error ? { error } : 'no error'
                    );
                  }}
                  {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                  disabled={emailVarl === ''}
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
                    console.log('Complete ON_PRESS:6 EXTRACT_KEY', { message });
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
                    backgroundColor: theme.colors['Secondary'],
                    borderColor: theme.colors['Strong'],
                    borderWidth: 2,
                    color: theme.colors['Strong'],
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
    </ScreenContainer>
  );
};

export default withTheme(LogInScreen);
