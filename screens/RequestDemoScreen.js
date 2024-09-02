import React from 'react';
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
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import removeGlobalScroll from '../global-functions/removeGlobalScroll';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import showAlertUtil from '../utils/showAlert';
import useWindowDimensions from '../utils/useWindowDimensions';

const RequestDemoScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [companyVar, setCompanyVar] = React.useState('');
  const [demoPressed, setDemoPressed] = React.useState(false);
  const [emailVar, setEmailVar] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [messageVar, setMessageVar] = React.useState('');
  const [mobileVar, setMobileVar] = React.useState('');
  const [nameVar, setNameVar] = React.useState('');
  const validationForm = () => {
    var emailPattern = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;
    // var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (!emailVar.match(emailPattern)) {
      setErrorMessage('*Invalid email address!');
      return false;
    }

    // if (!passwordValue.match(passwordPattern)) {
    //     setErrorMessage('*Password must be at least 8 characters, and contain at least one lowercase letter, one uppercase letter, and one digit.');
    //     return false;
    // }

    console.log('Inputs are valid!'); // All checks passed
    setErrorMessage(''); // Clear any previous error message
    return true;
  };
  const xanoCollectionRequestDemoPOST = XanoCollectionApi.useRequestDemoPOST();
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
  const fullName7AwDaCGdRef = React.useRef();
  const companyNameZZjKNDmJRef = React.useRef();
  const mobileBYuqOWrYRef = React.useRef();
  const messageMJ6KCxrqRef = React.useRef();

  return (
    <ScreenContainer
      hasSafeArea={false}
      hasLeftSafeArea={true}
      hasRightSafeArea={true}
      hasTopSafeArea={false}
      scrollable={false}
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
            maxWidth: 380,
            width: '100%',
          },
          dimensions.width
        )}
      >
        {/* NKP Logo */}
        <Image
          {...GlobalStyles.ImageStyles(theme)['Image'].props}
          resizeMode={'contain'}
          source={Images['mainsightsfaviconlogo1024new']}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'].style, {
              width: 300,
            }),
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
                  { minWidth: Breakpoints.Desktop, value: palettes.App.Orange },
                  { minWidth: Breakpoints.Mobile, value: palettes.App.Orange },
                ],
                fontFamily: [
                  { minWidth: Breakpoints.Desktop, value: 'Poppins_900Black' },
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
        {/* Title */}
        <Text
          accessible={true}
          {...GlobalStyles.TextStyles(theme)['screen_title'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.TextStyles(theme)['screen_title'].style,
              {
                alignSelf: 'center',
                color: '"rgb(255, 255, 255)"',
                fontFamily: 'Quicksand_700Bold',
                fontSize: 25,
                margin: 10,
                padding: 10,
              }
            ),
            dimensions.width
          )}
        >
          {'Request Demo'}
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={'padding'}
        enabled={true}
        keyboardVerticalOffset={0}
      >
        {/* Demo Window */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignContent: 'center',
              alignSelf: 'center',
              maxWidth: 380,
              width: '100%',
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
                { alignItems: 'stretch', padding: 10 }
              ),
              dimensions.width
            )}
          >
            {/* Emailt */}
            <Text
              accessible={true}
              {...GlobalStyles.TextStyles(theme)['screen_title'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['screen_title'].style,
                  { fontFamily: 'Quicksand_400Regular', marginLeft: 10 }
                ),
                dimensions.width
              )}
            >
              {'Email'}
            </Text>
            {/* Email */}
            <TextInput
              autoCapitalize={'none'}
              changeTextDelay={500}
              onChangeText={newEmailValue => {
                try {
                  setEmailVar(newEmailValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              onSubmitEditing={() => {
                try {
                  fullName7AwDaCGdRef.current.focus();
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
              placeholderTextColor={theme.colors.text.medium}
              selectionColor={theme.colors.text.strong}
              spellcheck={true}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextInputStyles(theme)['Login Text Style'].style,
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
              value={emailVar}
            />
            {/* Full Namet */}
            <Text
              accessible={true}
              {...GlobalStyles.TextStyles(theme)['screen_title'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['screen_title'].style,
                  { fontFamily: 'Quicksand_400Regular', marginLeft: 10 }
                ),
                dimensions.width
              )}
            >
              {'Full Name'}
            </Text>
            {/* Full Name */}
            <TextInput
              changeTextDelay={500}
              onChangeText={newFullNameValue => {
                try {
                  setNameVar(newFullNameValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              onSubmitEditing={() => {
                try {
                  companyNameZZjKNDmJRef.current.focus();
                } catch (err) {
                  console.error(err);
                }
              }}
              webShowOutline={true}
              {...GlobalStyles.TextInputStyles(theme)['Login Text Style'].props}
              autoCapitalize={'words'}
              autoComplete={'name'}
              autoCorrect={false}
              autoFocus={false}
              clearButtonMode={'while-editing'}
              keyboardType={'default'}
              numberOfLines={1}
              placeholder={'Enter full name...'}
              placeholderTextColor={theme.colors.text.medium}
              ref={fullName7AwDaCGdRef}
              returnKeyType={'next'}
              selectionColor={theme.colors.text.strong}
              spellcheck={true}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextInputStyles(theme)['Login Text Style'].style,
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
              value={nameVar}
            />
            {/* Company Namet */}
            <Text
              accessible={true}
              {...GlobalStyles.TextStyles(theme)['screen_title'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['screen_title'].style,
                  { fontFamily: 'Quicksand_400Regular', marginLeft: 10 }
                ),
                dimensions.width
              )}
            >
              {'Company Name'}
            </Text>
            {/* Company Name */}
            <TextInput
              autoCapitalize={'none'}
              changeTextDelay={500}
              onChangeText={newCompanyNameValue => {
                try {
                  setCompanyVar(newCompanyNameValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              onSubmitEditing={() => {
                try {
                  mobileBYuqOWrYRef.current.focus();
                } catch (err) {
                  console.error(err);
                }
              }}
              webShowOutline={true}
              {...GlobalStyles.TextInputStyles(theme)['Login Text Style'].props}
              autoCorrect={false}
              autoFocus={false}
              clearButtonMode={'while-editing'}
              numberOfLines={1}
              placeholder={'Enter company name...'}
              placeholderTextColor={theme.colors.text.medium}
              ref={companyNameZZjKNDmJRef}
              returnKeyType={'next'}
              selectionColor={theme.colors.text.strong}
              spellcheck={true}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextInputStyles(theme)['Login Text Style'].style,
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
              value={companyVar}
            />
            {/* Mobilet */}
            <Text
              accessible={true}
              {...GlobalStyles.TextStyles(theme)['screen_title'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['screen_title'].style,
                  { fontFamily: 'Quicksand_400Regular', marginLeft: 10 }
                ),
                dimensions.width
              )}
            >
              {'Mobile'}
            </Text>
            {/* Mobile */}
            <TextInput
              autoCapitalize={'none'}
              changeTextDelay={500}
              onChangeText={newMobileValue => {
                try {
                  setMobileVar(newMobileValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              onSubmitEditing={() => {
                try {
                  messageMJ6KCxrqRef.current.focus();
                } catch (err) {
                  console.error(err);
                }
              }}
              webShowOutline={true}
              {...GlobalStyles.TextInputStyles(theme)['Login Text Style'].props}
              autoComplete={'tel'}
              autoCorrect={false}
              autoFocus={false}
              clearButtonMode={'while-editing'}
              keyboardType={'phone-pad'}
              numberOfLines={1}
              placeholder={'Enter mobile...'}
              placeholderTextColor={theme.colors.text.medium}
              ref={mobileBYuqOWrYRef}
              returnKeyType={'next'}
              selectionColor={theme.colors.text.strong}
              spellcheck={true}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextInputStyles(theme)['Login Text Style'].style,
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
              value={mobileVar}
            />
            {/* Messaget */}
            <Text
              accessible={true}
              {...GlobalStyles.TextStyles(theme)['screen_title'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['screen_title'].style,
                  { fontFamily: 'Quicksand_400Regular', marginLeft: 10 }
                ),
                dimensions.width
              )}
            >
              {'Message'}
            </Text>
            {/* Message */}
            <TextInput
              autoCapitalize={'none'}
              changeTextDelay={500}
              onChangeText={newMessageValue => {
                try {
                  setMessageVar(newMessageValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              webShowOutline={true}
              {...GlobalStyles.TextInputStyles(theme)['Login Text Style'].props}
              autoCorrect={false}
              autoFocus={false}
              clearButtonMode={'while-editing'}
              keyboardType={'default'}
              numberOfLines={1}
              placeholder={'Enter message...'}
              placeholderTextColor={theme.colors.text.medium}
              ref={messageMJ6KCxrqRef}
              returnKeyType={'done'}
              selectionColor={theme.colors.text.strong}
              spellcheck={true}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextInputStyles(theme)['Login Text Style'].style,
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
              value={messageVar}
            />
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
            {/* Demo */}
            <Button
              iconPosition={'left'}
              onPress={() => {
                const handler = async () => {
                  console.log('Demo ON_PRESS Start');
                  let error = null;
                  try {
                    console.log('Start ON_PRESS:0 CONDITIONAL_STOP');
                    if (!validationForm()) {
                      return console.log(
                        'Complete ON_PRESS:0 CONDITIONAL_STOP'
                      );
                    } else {
                      console.log(
                        'Skipped ON_PRESS:0 CONDITIONAL_STOP: condition not met'
                      );
                    }
                    console.log('Start ON_PRESS:1 SET_VARIABLE');
                    setDemoPressed(true);
                    console.log('Complete ON_PRESS:1 SET_VARIABLE');
                    console.log('Start ON_PRESS:2 DISMISS_KEYBOARD');
                    Keyboard.dismiss();
                    console.log('Complete ON_PRESS:2 DISMISS_KEYBOARD');
                    console.log('Start ON_PRESS:3 FETCH_REQUEST');
                    const Xano_Auth = (
                      await xanoCollectionRequestDemoPOST.mutateAsync({
                        company: companyVar,
                        email: emailVar,
                        message: messageVar,
                        mobile: mobileVar,
                        name: nameVar,
                      })
                    )?.json;
                    console.log('Complete ON_PRESS:3 FETCH_REQUEST', {
                      Xano_Auth,
                    });
                    console.log('Start ON_PRESS:4 SHOW_ALERT');
                    showAlertUtil({
                      title: 'Request Received!',
                      message:
                        'Thanks for reaching out. Someone from our team will be in touch with you shortly.',
                      buttonText: undefined,
                    });
                    console.log('Complete ON_PRESS:4 SHOW_ALERT');
                    console.log('Start ON_PRESS:5 NAVIGATE');
                    navigation.push('LogInScreen');
                    console.log('Complete ON_PRESS:5 NAVIGATE');
                  } catch (err) {
                    console.error(err);
                    error = err.message ?? err;
                  }
                  console.log(
                    'Demo ON_PRESS Complete',
                    error ? { error } : 'no error'
                  );
                };
                handler();
              }}
              {...GlobalStyles.ButtonStyles(theme)['Button'].props}
              disabled={
                emailVar === '' ||
                nameVar === '' ||
                companyVar === '' ||
                mobileVar === '' ||
                messageVar === ''
              }
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
              title={'Request Demo'}
            />
            <Link
              accessible={true}
              onPress={() => {
                try {
                  navigation.push('LogInScreen');
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
                    textAlign: 'center',
                  }
                ),
                dimensions.width
              )}
              title={'Go back'}
            />
          </Surface>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

export default withTheme(RequestDemoScreen);
