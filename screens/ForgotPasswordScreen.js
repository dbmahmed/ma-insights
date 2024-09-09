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
import passwordValidate from '../global-functions/passwordValidate';
import removeGlobalScroll from '../global-functions/removeGlobalScroll';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import parseBoolean from '../utils/parseBoolean';
import useWindowDimensions from '../utils/useWindowDimensions';
import waitUtil from '../utils/wait';

const defaultProps = { email: null, page_state: null };

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
      setEmailVarl(props.route?.params?.email ?? defaultProps.email);
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);
  const passwordAklNpn0KRef = React.useRef();

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
            disabled={true}
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
            suppressHighlighting={true}
          >
            {dimensions.width >= Breakpoints.Laptop
              ? 'M&A INSIGHTS'
              : 'M&A\nINSIGHTS'}
          </Text>

          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['screen_title'].props}
            disabled={true}
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
            suppressHighlighting={true}
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
            style={StyleSheet.applyWidth(
              {
                alignItems: [
                  { minWidth: Breakpoints.Desktop, value: 'center' },
                  { minWidth: Breakpoints.Laptop, value: 'center' },
                  { minWidth: Breakpoints.Tablet, value: 'center' },
                ],
              },
              dimensions.width
            )}
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
                      {
                        maxWidth: [
                          { minWidth: Breakpoints.BigScreen, value: 380 },
                          { minWidth: Breakpoints.Tablet, value: 380 },
                        ],
                        minWidth: [
                          { minWidth: Breakpoints.BigScreen, value: 380 },
                          { minWidth: Breakpoints.Tablet, value: 380 },
                        ],
                        padding: 10,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                    disabled={true}
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
                    suppressHighlighting={true}
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
                        disabled={true}
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
                        suppressHighlighting={true}
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
                          console.log('Start ON_PRESS:2 FETCH_REQUEST');
                          const temp_pass = (
                            await XanoResetPassApi.requestTempPassGET(
                              Constants,
                              { email: emailVarl }
                            )
                          )?.json;
                          console.log('Complete ON_PRESS:2 FETCH_REQUEST', {
                            temp_pass,
                          });
                          console.log('Start ON_PRESS:3 SET_VARIABLE');
                          setEmailPressed(true);
                          console.log('Complete ON_PRESS:3 SET_VARIABLE');
                          console.log('Start ON_PRESS:4 SET_VARIABLE');
                          setPageState('temp_pass');
                          console.log('Complete ON_PRESS:4 SET_VARIABLE');
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
            style={StyleSheet.applyWidth(
              {
                alignItems: [
                  { minWidth: Breakpoints.Laptop, value: 'center' },
                  { minWidth: Breakpoints.Tablet, value: 'center' },
                ],
              },
              dimensions.width
            )}
          >
            {/* Enter Temp Pass View */}
            <Surface
              {...GlobalStyles.SurfaceStyles(theme)['Surface'].props}
              elevation={2}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.SurfaceStyles(theme)['Surface'].style,
                  {
                    maxWidth: 380,
                    minWidth: [
                      { minWidth: Breakpoints.BigScreen, value: 380 },
                      { minWidth: Breakpoints.Tablet, value: 380 },
                    ],
                    padding: 10,
                  }
                ),
                dimensions.width
              )}
            >
              {/* Text 2 */}
              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  { fontFamily: 'Quicksand_400Regular', textAlign: 'center' },
                  dimensions.width
                )}
              >
                {
                  'If you have an account with us, a temporary password will be sent to you in a moment from support@mainsights.io. If you don’t receive it, but used to have access, please contact sg@mainsights.io and we’ll set it up for you.'
                }
              </Text>
              {/* Submit */}
              <Button
                iconPosition={'left'}
                onPress={() => {
                  console.log('Submit ON_PRESS Start');
                  let error = null;
                  try {
                    console.log('Start ON_PRESS:0 NAVIGATE');
                    if (navigation.canGoBack()) {
                      navigation.popToTop();
                    }
                    navigation.replace('LogInScreen');
                    console.log('Complete ON_PRESS:0 NAVIGATE');
                  } catch (err) {
                    console.error(err);
                    error = err.message ?? err;
                  }
                  console.log(
                    'Submit ON_PRESS Complete',
                    error ? { error } : 'no error'
                  );
                }}
                {...GlobalStyles.ButtonStyles(theme)['Button'].props}
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
                title={'PROCEED TO LOG IN'}
              />
            </Surface>
          </KeyboardAvoidingView>
        )}
      </>
    </ScreenContainer>
  );
};

export default withTheme(ForgotPasswordScreen);
