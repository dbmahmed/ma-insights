import React from 'react';
import {
  Button,
  KeyboardAvoidingView,
  Link,
  ScreenContainer,
  Surface,
  TextInput,
  VStack,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Image, Keyboard, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import * as XanoResetPassApi from '../apis/XanoResetPassApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import removeGlobalScroll from '../global-functions/removeGlobalScroll';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import parseBoolean from '../utils/parseBoolean';
import useWindowDimensions from '../utils/useWindowDimensions';
import waitUtil from '../utils/wait';

const ForgotPasswordScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [confNewPass, setConfNewPass] = React.useState('');
  const [emailPressed, setEmailPressed] = React.useState(false);
  const [emailVarl, setEmailVarl] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [newPass, setNewPass] = React.useState('');
  const [newPassPressed, setNewPassPressed] = React.useState(false);
  const [pageState, setPageState] = React.useState('email');
  const [tempPassPressed, setTempPassPressed] = React.useState(false);
  const [tempPassVal, setTempPassVal] = React.useState('');
  const xanoResetPassResetPasswordPOST =
    XanoResetPassApi.useResetPasswordPOST();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      removeGlobalScroll();
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasRightSafeArea={true}
      style={StyleSheet.applyWidth(
        {
          alignContent: 'center',
          alignItems: 'stretch',
          backgroundColor: [
            {
              minWidth: Breakpoints.Laptop,
              value: palettes.App['Custom Color'],
            },
            {
              minWidth: Breakpoints.Mobile,
              value: palettes.App['Custom Color'],
            },
          ],
          justifyContent: 'center',
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
            source={Images['mainsightsfaviconlogo1024new']}
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
        {!(pageState === 'email') ? null : (
          <KeyboardAvoidingView
            behavior={'padding'}
            enabled={true}
            keyboardVerticalOffset={0}
          >
            {/* Enter Email View */}
            <>
              {!(pageState === 'email') ? null : (
                <Surface
                  {...GlobalStyles.SurfaceStyles(theme)['Surface'].props}
                  elevation={2}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SurfaceStyles(theme)['Surface'].style,
                      { padding: 10 }
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
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Enter email'}
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
                        }
                      ),
                      dimensions.width
                    )}
                    value={emailVarl}
                  />
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
                  {/* Temp Pass */}
                  <Button
                    iconPosition={'left'}
                    onPress={() => {
                      const handler = async () => {
                        console.log('Temp Pass ON_PRESS Start');
                        let error = null;
                        try {
                          console.log('Start ON_PRESS:0 SET_VARIABLE');
                          setEmailPressed(true);
                          console.log('Complete ON_PRESS:0 SET_VARIABLE');
                          console.log('Start ON_PRESS:1 DISMISS_KEYBOARD');
                          Keyboard.dismiss();
                          console.log('Complete ON_PRESS:1 DISMISS_KEYBOARD');
                          console.log('Start ON_PRESS:2 CONDITIONAL_STOP');
                          /* hidden 'Conditional Stop' action */ console.log(
                            'Complete ON_PRESS:2 CONDITIONAL_STOP'
                          );
                          console.log('Start ON_PRESS:3 FETCH_REQUEST');
                          /* hidden 'API Request' action */ console.log(
                            'Complete ON_PRESS:3 FETCH_REQUEST'
                          );
                          console.log('Start ON_PRESS:4 EXTRACT_KEY');
                          /* hidden 'Extract Key' action */ console.log(
                            'Complete ON_PRESS:4 EXTRACT_KEY'
                          );
                          console.log('Start ON_PRESS:5 EXTRACT_KEY');
                          /* hidden 'Extract Key' action */ console.log(
                            'Complete ON_PRESS:5 EXTRACT_KEY'
                          );
                          console.log('Start ON_PRESS:6 SET_VARIABLE');
                          /* hidden 'Set Variable' action */ console.log(
                            'Complete ON_PRESS:6 SET_VARIABLE'
                          );
                          console.log('Start ON_PRESS:7 CONSOLE_LOG');
                          /* hidden 'Log to Console' action */ console.log(
                            'Complete ON_PRESS:7 CONSOLE_LOG'
                          );
                          console.log('Start ON_PRESS:8 SET_VARIABLE');
                          /* hidden 'Set Variable' action */ console.log(
                            'Complete ON_PRESS:8 SET_VARIABLE'
                          );
                          console.log('Start ON_PRESS:9 CONDITIONAL_STOP');
                          /* hidden 'Conditional Stop' action */ console.log(
                            'Complete ON_PRESS:9 CONDITIONAL_STOP'
                          );
                          console.log('Start ON_PRESS:10 SET_VARIABLE');
                          /* hidden 'Set Variable' action */ console.log(
                            'Complete ON_PRESS:10 SET_VARIABLE'
                          );
                          console.log('Start ON_PRESS:12 FETCH_REQUEST');
                          const temp_pass = (
                            await XanoResetPassApi.requestTempPassGET(
                              Constants,
                              { email: emailVarl }
                            )
                          )?.json;
                          console.log('Complete ON_PRESS:12 FETCH_REQUEST', {
                            temp_pass,
                          });
                          console.log('Start ON_PRESS:13 SET_VARIABLE');
                          setEmailPressed(true);
                          console.log('Complete ON_PRESS:13 SET_VARIABLE');
                          console.log('Start ON_PRESS:14 SET_VARIABLE');
                          setPageState('temp_pass');
                          console.log('Complete ON_PRESS:14 SET_VARIABLE');
                        } catch (err) {
                          console.error(err);
                          error = err.message ?? err;
                        }
                        console.log(
                          'Temp Pass ON_PRESS Complete',
                          error ? { error } : 'no error'
                        );
                      };
                      handler();
                    }}
                    {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                    disabled={emailVarl === ''}
                    loading={parseBoolean(emailPressed)}
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
                    title={'CREATE TEMP PASSWORD'}
                  />
                  {/* Link 2 */}
                  <>
                    {!emailVarl ? null : (
                      <Link
                        accessible={true}
                        onPress={() => {
                          try {
                            /* hidden 'Navigate' action */
                            setPageState('temp_pass');
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
                        title={'I already have a temporary password'}
                      />
                    )}
                  </>
                  {/* Link 3 */}
                  <Link
                    accessible={true}
                    onPress={() => {
                      try {
                        if (navigation.canGoBack()) {
                          navigation.popToTop();
                        }
                        navigation.replace('LogInScreen');
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
                    title={'Go back'}
                  />
                </Surface>
              )}
            </>
          </KeyboardAvoidingView>
        )}
      </>
      {/* Keyboard Avoiding View 2 */}
      <>
        {!(pageState === 'temp_pass') ? null : (
          <KeyboardAvoidingView
            behavior={'padding'}
            enabled={true}
            keyboardVerticalOffset={0}
          >
            {/* Enter Temp Pass View */}
            <Surface
              {...GlobalStyles.SurfaceStyles(theme)['Surface'].props}
              elevation={2}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.SurfaceStyles(theme)['Surface'].style,
                  { maxWidth: 380, padding: 10 }
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
                      textAlign: 'center',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Enter temporary password'}
              </Text>
              {/* Password */}
              <TextInput
                autoCapitalize={'none'}
                changeTextDelay={500}
                onChangeText={newPasswordValue => {
                  try {
                    setTempPassVal(newPasswordValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                {...GlobalStyles.TextInputStyles(theme)['Login Text Style']
                  .props}
                autoCorrect={false}
                autoFocus={true}
                clearButtonMode={'while-editing'}
                keyboardType={'default'}
                numberOfLines={1}
                placeholder={'Enter temporary password...'}
                placeholderTextColor={theme.colors.text.medium}
                returnKeyType={'next'}
                secureTextEntry={true}
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
                    }
                  ),
                  dimensions.width
                )}
                value={tempPassVal}
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
              {/* Submit */}
              <Button
                iconPosition={'left'}
                onPress={() => {
                  const handler = async () => {
                    console.log('Submit ON_PRESS Start');
                    let error = null;
                    try {
                      console.log('Start ON_PRESS:0 SET_VARIABLE');
                      setTempPassPressed(true);
                      console.log('Complete ON_PRESS:0 SET_VARIABLE');
                      console.log('Start ON_PRESS:1 DISMISS_KEYBOARD');
                      Keyboard.dismiss();
                      console.log('Complete ON_PRESS:1 DISMISS_KEYBOARD');
                      console.log('Start ON_PRESS:2 CONDITIONAL_STOP');
                      /* hidden 'Conditional Stop' action */ console.log(
                        'Complete ON_PRESS:2 CONDITIONAL_STOP'
                      );
                      console.log('Start ON_PRESS:3 FETCH_REQUEST');
                      /* hidden 'API Request' action */ console.log(
                        'Complete ON_PRESS:3 FETCH_REQUEST'
                      );
                      console.log('Start ON_PRESS:4 EXTRACT_KEY');
                      /* hidden 'Extract Key' action */ console.log(
                        'Complete ON_PRESS:4 EXTRACT_KEY'
                      );
                      console.log('Start ON_PRESS:5 EXTRACT_KEY');
                      /* hidden 'Extract Key' action */ console.log(
                        'Complete ON_PRESS:5 EXTRACT_KEY'
                      );
                      console.log('Start ON_PRESS:6 SET_VARIABLE');
                      /* hidden 'Set Variable' action */ console.log(
                        'Complete ON_PRESS:6 SET_VARIABLE'
                      );
                      console.log('Start ON_PRESS:7 CONSOLE_LOG');
                      /* hidden 'Log to Console' action */ console.log(
                        'Complete ON_PRESS:7 CONSOLE_LOG'
                      );
                      console.log('Start ON_PRESS:8 SET_VARIABLE');
                      /* hidden 'Set Variable' action */ console.log(
                        'Complete ON_PRESS:8 SET_VARIABLE'
                      );
                      console.log('Start ON_PRESS:9 CONDITIONAL_STOP');
                      /* hidden 'Conditional Stop' action */ console.log(
                        'Complete ON_PRESS:9 CONDITIONAL_STOP'
                      );
                      console.log('Start ON_PRESS:10 SET_VARIABLE');
                      /* hidden 'Set Variable' action */ console.log(
                        'Complete ON_PRESS:10 SET_VARIABLE'
                      );
                      console.log('Start ON_PRESS:12 FETCH_REQUEST');
                      const temp_auth = (
                        await XanoResetPassApi.tempLoginPOST(Constants, {
                          email: emailVarl,
                          temp_pass: tempPassVal,
                        })
                      )?.json;
                      console.log('Complete ON_PRESS:12 FETCH_REQUEST', {
                        temp_auth,
                      });
                      console.log('Start ON_PRESS:13 EXTRACT_KEY');
                      const tempAuthToken = temp_auth?.tempToken;
                      console.log('Complete ON_PRESS:13 EXTRACT_KEY', {
                        tempAuthToken,
                      });
                      console.log('Start ON_PRESS:14 EXTRACT_KEY');
                      /* hidden 'Extract Key' action */ console.log(
                        'Complete ON_PRESS:14 EXTRACT_KEY'
                      );
                      console.log('Start ON_PRESS:15 SET_VARIABLE');
                      /* hidden 'Set Variable' action */ console.log(
                        'Complete ON_PRESS:15 SET_VARIABLE'
                      );
                      console.log('Start ON_PRESS:16 CONDITIONAL_STOP');
                      if (tempAuthToken === '') {
                        return console.log(
                          'Complete ON_PRESS:16 CONDITIONAL_STOP'
                        );
                      } else {
                        console.log(
                          'Skipped ON_PRESS:16 CONDITIONAL_STOP: condition not met'
                        );
                      }
                      console.log('Start ON_PRESS:17 SET_VARIABLE');
                      setGlobalVariableValue({
                        key: 'RESET_AUTH_HEADER',
                        value: 'Bearer ' + tempAuthToken,
                      });
                      console.log('Complete ON_PRESS:17 SET_VARIABLE');
                      console.log('Start ON_PRESS:18 CONSOLE_LOG');
                      console.log(Constants['RESET_AUTH_HEADER']);
                      console.log('Complete ON_PRESS:18 CONSOLE_LOG');
                      console.log('Start ON_PRESS:19 SET_VARIABLE');
                      setPageState('new_pass');
                      console.log('Complete ON_PRESS:19 SET_VARIABLE');
                    } catch (err) {
                      console.error(err);
                      error = err.message ?? err;
                    }
                    console.log(
                      'Submit ON_PRESS Complete',
                      error ? { error } : 'no error'
                    );
                  };
                  handler();
                }}
                {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                disabled={tempPassVal === ''}
                loading={parseBoolean(tempPassPressed)}
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
                title={'SUBMIT'}
              />
              {/* Link 2 */}
              <Link
                accessible={true}
                onPress={() => {
                  try {
                    /* hidden 'Navigate' action */
                    setPageState('email');
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
                title={'Go back'}
              />
            </Surface>
          </KeyboardAvoidingView>
        )}
      </>
      {/* Keyboard Avoiding View 3 */}
      <>
        {!(pageState === 'new_pass') ? null : (
          <KeyboardAvoidingView
            behavior={'padding'}
            enabled={true}
            keyboardVerticalOffset={0}
          >
            {/* Set New Pass View */}
            <Surface
              {...GlobalStyles.SurfaceStyles(theme)['Surface'].props}
              elevation={2}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.SurfaceStyles(theme)['Surface'].style,
                  { maxWidth: 380, padding: 10 }
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
                      textAlign: 'center',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Enter new password'}
              </Text>
              {/* Password */}
              <TextInput
                autoCapitalize={'none'}
                changeTextDelay={500}
                onChangeText={newPasswordValue => {
                  try {
                    setNewPass(newPasswordValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                {...GlobalStyles.TextInputStyles(theme)['Login Text Style']
                  .props}
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
                    GlobalStyles.TextInputStyles(theme)['Login Text Style']
                      .style,
                    {
                      borderColor: theme.colors.text.strong,
                      borderStyle: 'solid',
                      fontFamily: 'Quicksand_400Regular',
                      margin: 10,
                    }
                  ),
                  dimensions.width
                )}
                value={newPass}
              />
              {/* Confirm Password */}
              <TextInput
                autoCapitalize={'none'}
                changeTextDelay={500}
                onChangeText={newConfirmPasswordValue => {
                  try {
                    setConfNewPass(newConfirmPasswordValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                {...GlobalStyles.TextInputStyles(theme)['Login Text Style']
                  .props}
                autoCorrect={false}
                autoFocus={true}
                clearButtonMode={'while-editing'}
                keyboardType={'default'}
                numberOfLines={1}
                placeholder={'Confirm new password'}
                placeholderTextColor={theme.colors.text.medium}
                returnKeyType={'next'}
                secureTextEntry={true}
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
                    }
                  ),
                  dimensions.width
                )}
                value={confNewPass}
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
              {/* Submit */}
              <Button
                iconPosition={'left'}
                onPress={() => {
                  const handler = async () => {
                    console.log('Submit ON_PRESS Start');
                    let error = null;
                    try {
                      console.log('Start ON_PRESS:0 SET_VARIABLE');
                      setNewPassPressed(true);
                      console.log('Complete ON_PRESS:0 SET_VARIABLE');
                      console.log('Start ON_PRESS:1 DISMISS_KEYBOARD');
                      Keyboard.dismiss();
                      console.log('Complete ON_PRESS:1 DISMISS_KEYBOARD');
                      console.log('Start ON_PRESS:2 CONDITIONAL_STOP');
                      /* hidden 'Conditional Stop' action */ console.log(
                        'Complete ON_PRESS:2 CONDITIONAL_STOP'
                      );
                      console.log('Start ON_PRESS:3 FETCH_REQUEST');
                      /* hidden 'API Request' action */ console.log(
                        'Complete ON_PRESS:3 FETCH_REQUEST'
                      );
                      console.log('Start ON_PRESS:4 EXTRACT_KEY');
                      /* hidden 'Extract Key' action */ console.log(
                        'Complete ON_PRESS:4 EXTRACT_KEY'
                      );
                      console.log('Start ON_PRESS:5 EXTRACT_KEY');
                      /* hidden 'Extract Key' action */ console.log(
                        'Complete ON_PRESS:5 EXTRACT_KEY'
                      );
                      console.log('Start ON_PRESS:6 SET_VARIABLE');
                      /* hidden 'Set Variable' action */ console.log(
                        'Complete ON_PRESS:6 SET_VARIABLE'
                      );
                      console.log('Start ON_PRESS:7 CONSOLE_LOG');
                      /* hidden 'Log to Console' action */ console.log(
                        'Complete ON_PRESS:7 CONSOLE_LOG'
                      );
                      console.log('Start ON_PRESS:8 SET_VARIABLE');
                      /* hidden 'Set Variable' action */ console.log(
                        'Complete ON_PRESS:8 SET_VARIABLE'
                      );
                      console.log('Start ON_PRESS:9 CONDITIONAL_STOP');
                      /* hidden 'Conditional Stop' action */ console.log(
                        'Complete ON_PRESS:9 CONDITIONAL_STOP'
                      );
                      console.log('Start ON_PRESS:10 SET_VARIABLE');
                      /* hidden 'Set Variable' action */ console.log(
                        'Complete ON_PRESS:10 SET_VARIABLE'
                      );
                      console.log('Start ON_PRESS:12 WAIT');
                      await waitUtil({ milliseconds: 1000 });
                      console.log('Complete ON_PRESS:12 WAIT');
                      console.log('Start ON_PRESS:13 FETCH_REQUEST');
                      const new_pass_set = (
                        await xanoResetPassResetPasswordPOST.mutateAsync({
                          new_conf_pass: confNewPass,
                          new_pass: newPass,
                        })
                      )?.json;
                      console.log('Complete ON_PRESS:13 FETCH_REQUEST', {
                        new_pass_set,
                      });
                      console.log('Start ON_PRESS:14 EXTRACT_KEY');
                      /* hidden 'Extract Key' action */ console.log(
                        'Complete ON_PRESS:14 EXTRACT_KEY'
                      );
                      console.log('Start ON_PRESS:15 EXTRACT_KEY');
                      const Message = new_pass_set?.message;
                      console.log('Complete ON_PRESS:15 EXTRACT_KEY', {
                        Message,
                      });
                      console.log('Start ON_PRESS:16 SET_VARIABLE');
                      /* hidden 'Set Variable' action */ console.log(
                        'Complete ON_PRESS:16 SET_VARIABLE'
                      );
                      console.log('Start ON_PRESS:17 CONDITIONAL_STOP');
                      if (Message !== 'Password successfully updated') {
                        return console.log(
                          'Complete ON_PRESS:17 CONDITIONAL_STOP'
                        );
                      } else {
                        console.log(
                          'Skipped ON_PRESS:17 CONDITIONAL_STOP: condition not met'
                        );
                      }
                      console.log('Start ON_PRESS:18 SET_VARIABLE');
                      setGlobalVariableValue({
                        key: 'RESET_AUTH_HEADER',
                        value: '',
                      });
                      console.log('Complete ON_PRESS:18 SET_VARIABLE');
                      console.log('Start ON_PRESS:19 SET_VARIABLE');
                      /* hidden 'Set Variable' action */ console.log(
                        'Complete ON_PRESS:19 SET_VARIABLE'
                      );
                      console.log('Start ON_PRESS:20 NAVIGATE');
                      if (navigation.canGoBack()) {
                        navigation.popToTop();
                      }
                      navigation.replace('LogInScreen');
                      console.log('Complete ON_PRESS:20 NAVIGATE');
                    } catch (err) {
                      console.error(err);
                      error = err.message ?? err;
                    }
                    console.log(
                      'Submit ON_PRESS Complete',
                      error ? { error } : 'no error'
                    );
                  };
                  handler();
                }}
                {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                disabled={newPass === '' || confNewPass === ''}
                loading={newPassPressed}
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
                title={'SET NEW PASSWORD'}
              />
              {/* Link 2 */}
              <Link
                accessible={true}
                onPress={() => {
                  try {
                    if (navigation.canGoBack()) {
                      navigation.popToTop();
                    }
                    navigation.replace('ForgotPasswordScreen');
                    /* hidden 'Set Variable' action */
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
                title={'Go back'}
              />
            </Surface>
          </KeyboardAvoidingView>
        )}
      </>
    </ScreenContainer>
  );
};

export default withTheme(ForgotPasswordScreen);
