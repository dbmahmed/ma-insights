import React from 'react';
import { IconButton, Link, VStack, withTheme } from '@draftbit/ui';
import { H2, H4 } from '@expo/html-elements';
import { useNavigation } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { Modal, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const AccModalBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      transparent={false}
      animationType={'slide'}
      presentationStyle={'pageSheet'}
      visible={Constants['acc_pressed']}
    >
      {/* View 2 */}
      <View style={StyleSheet.applyWidth({ margin: 15 }, dimensions.width)}>
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center' },
            dimensions.width
          )}
        >
          <H2
            selectable={false}
            {...GlobalStyles.H2Styles(theme)['H2'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.H2Styles(theme)['H2'].style, {
                fontFamily: 'Quicksand_700Bold',
              }),
              dimensions.width
            )}
          >
            {'Settings'}
          </H2>
        </View>

        <VStack
          {...GlobalStyles.VStackStyles(theme)['V Stack'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.VStackStyles(theme)['V Stack'].style,
              { borderRadius: 10, borderWidth: 0.5, padding: 10 }
            ),
            dimensions.width
          )}
        >
          <H4
            selectable={false}
            style={StyleSheet.applyWidth(
              { marginBottom: 5, marginTop: 5 },
              dimensions.width
            )}
          >
            {'ACCOUNT INFO'}
          </H4>

          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['screen_title'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['screen_title'].style,
                { marginBottom: 2, marginTop: 2 }
              ),
              dimensions.width
            )}
          >
            {Constants['ME']?.name}
            {' ('}
            {Constants['ME']?.email}
            {')'}
          </Text>
          {/* Text 2 */}
          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['screen_title'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['screen_title'].style,
                { marginBottom: 2, marginTop: 2 }
              ),
              dimensions.width
            )}
          >
            {'Subscription status - '}
            {Constants['ME']?.user_status}
          </Text>
          <Link
            accessible={true}
            {...GlobalStyles.LinkStyles(theme)['Link'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.LinkStyles(theme)['Link'].style, {
                marginBottom: 2,
                marginTop: 2,
              }),
              dimensions.width
            )}
            title={'Manage Your Account'}
          />
          {/* Link 2 */}
          <Link
            accessible={true}
            onPress={() => {
              try {
                setGlobalVariableValue({
                  key: 'ME',
                  value: {
                    id: 0,
                    name: '',
                    email: '',
                    paid_dach: false,
                    trial_end: '',
                    created_at: 0,
                    paid_nordic: false,
                    trial_start: '',
                    user_status: '',
                    subscription_type: '',
                  },
                });
                setGlobalVariableValue({
                  key: 'acc_pressed',
                  value: false,
                });
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
              StyleSheet.compose(GlobalStyles.LinkStyles(theme)['Link'].style, {
                color: theme.colors.background.danger,
                marginBottom: 2,
                marginTop: 2,
                textAlign: 'center',
              }),
              dimensions.width
            )}
            title={'Logout'}
          />
        </VStack>
        {/* V Stack 2 */}
        <VStack
          {...GlobalStyles.VStackStyles(theme)['V Stack'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.VStackStyles(theme)['V Stack'].style,
              { borderRadius: 10, borderWidth: 0.5, marginTop: 15, padding: 10 }
            ),
            dimensions.width
          )}
        >
          <H4
            selectable={false}
            style={StyleSheet.applyWidth(
              { marginBottom: 5, marginTop: 5 },
              dimensions.width
            )}
          >
            {'SUBSCRIPTION INFO'}
          </H4>

          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['screen_title'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['screen_title'].style,
                { marginBottom: 2, marginTop: 2 }
              ),
              dimensions.width
            )}
          >
            {'Subscription Type - '}
            {Constants['ME']?.subscription_type}
          </Text>
          {/* Text 2 */}
          <>
            {!(Constants['ME']?.subscription_type === 'Trial') ? null : (
              <Text
                accessible={true}
                {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['screen_title'].style,
                    { marginBottom: 2, marginTop: 2 }
                  ),
                  dimensions.width
                )}
              >
                {'Trial start - '}
                {Constants['ME']?.trial_start}
                {'\nTrial end - '}
                {Constants['ME']?.trial_end}
              </Text>
            )}
          </>
        </VStack>
        {/* V Stack 3 */}
        <VStack
          {...GlobalStyles.VStackStyles(theme)['V Stack'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.VStackStyles(theme)['V Stack'].style,
              { borderRadius: 10, borderWidth: 0.5, marginTop: 15, padding: 10 }
            ),
            dimensions.width
          )}
        >
          <H4
            selectable={false}
            style={StyleSheet.applyWidth(
              { marginBottom: 5, marginTop: 5 },
              dimensions.width
            )}
          >
            {'APP INFO'}
          </H4>
          <Link
            accessible={true}
            onPress={() => {
              console.log('Link ON_PRESS Start');
              let error = null;
              try {
                console.log('Start ON_PRESS:0 LINKING_OPENURL');
                Linking.openURL('mailto:am@nordicknowledgepartners.com');
                console.log('Complete ON_PRESS:0 LINKING_OPENURL');
              } catch (err) {
                console.error(err);
                error = err.message ?? err;
              }
              console.log(
                'Link ON_PRESS Complete',
                error ? { error } : 'no error'
              );
            }}
            {...GlobalStyles.LinkStyles(theme)['Link'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.LinkStyles(theme)['Link'].style, {
                marginBottom: 2,
                marginTop: 2,
              }),
              dimensions.width
            )}
            title={'Report a bug'}
          />
          {/* Link 2 */}
          <Link
            accessible={true}
            onPress={() => {
              const handler = async () => {
                try {
                  await WebBrowser.openBrowserAsync(
                    'https://node.nordicknowledgepartners.com/static/NKP%20Privacy%20Policy%20Document.pdf'
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
            title={'Privacy Policy'}
          />
          {/* Link 3 */}
          <Link
            accessible={true}
            onPress={() => {
              try {
                Linking.openURL('mailto:ma@nordicknowledgepartners.com');
              } catch (err) {
                console.error(err);
              }
            }}
            {...GlobalStyles.LinkStyles(theme)['Link'].props}
            style={StyleSheet.applyWidth(
              GlobalStyles.LinkStyles(theme)['Link'].style,
              dimensions.width
            )}
            title={'Contact Us'}
          />
        </VStack>
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center', justifyContent: 'flex-end', marginTop: 10 },
            dimensions.width
          )}
        >
          <IconButton
            onPress={() => {
              try {
                setGlobalVariableValue({
                  key: 'acc_pressed',
                  value: false,
                });
              } catch (err) {
                console.error(err);
              }
            }}
            size={32}
            icon={'AntDesign/closecircle'}
          />
          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['screen_title'].props}
            style={StyleSheet.applyWidth(
              GlobalStyles.TextStyles(theme)['screen_title'].style,
              dimensions.width
            )}
          >
            {Constants['AUTH_HEADER']}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default withTheme(AccModalBlock);
