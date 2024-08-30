import React from 'react';
import { Icon, Touchable, useTheme } from '@draftbit/ui';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { I18nManager, Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { systemWeights } from 'react-native-typography';
import LinkingConfiguration from './LinkingConfiguration';
import * as GlobalVariables from './config/GlobalVariableContext';
import assessAccess from './global-functions/assessAccess';
import customRouting from './global-functions/customRouting';
import AdvisorDetailsScreen from './screens/AdvisorDetailsScreen';
import AdvisorsScreen from './screens/AdvisorsScreen';
import AllEventsScreen from './screens/AllEventsScreen';
import CFSDetailsScreen from './screens/CFSDetailsScreen';
import CFSScreen from './screens/CFSScreen';
import EventDetailsScreen from './screens/EventDetailsScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import LogInScreen from './screens/LogInScreen';
import MultiplesScreen from './screens/MultiplesScreen';
import MyAccountScreen from './screens/MyAccountScreen';
import NewsletterDetailsScreen from './screens/NewsletterDetailsScreen';
import NewslettersScreen from './screens/NewslettersScreen';
import PEPFDetailsScreen from './screens/PEPFDetailsScreen';
import PEPFScreen from './screens/PEPFScreen';
import PeerGroupDetailsScreen from './screens/PeerGroupDetailsScreen';
import PeerGroupsScreen from './screens/PeerGroupsScreen';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';
import ReportsScreen from './screens/ReportsScreen';
import RequestDemoScreen from './screens/RequestDemoScreen';
import SplashScreen from './screens/SplashScreen';
import StockDetailsScreen from './screens/StockDetailsScreen';
import StockSearchScreen from './screens/StockSearchScreen';
import TermsAndConditionsScreen from './screens/TermsAndConditionsScreen';
import palettes from './themes/palettes';
import Breakpoints from './utils/Breakpoints';
import useWindowDimensions from './utils/useWindowDimensions';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function DefaultAndroidBackIcon({ tintColor }) {
  return (
    <View style={[styles.headerContainer, styles.headerContainerLeft]}>
      <Icon
        name="AntDesign/arrowleft"
        size={24}
        color={tintColor}
        style={[styles.headerIcon, styles.headerIconLeft]}
      />
    </View>
  );
}

function DefaultDrawerIcon({ tintColor, navigation }) {
  return (
    <Touchable
      onPress={() => navigation.toggleDrawer()}
      style={[styles.headerContainer, styles.headerContainerLeft]}
    >
      <Icon
        name="EvilIcons/navicon"
        size={27}
        color={tintColor}
        style={[styles.headerIcon, styles.headerIconLeft]}
      />
    </Touchable>
  );
}

export default function RootAppNavigator() {
  const theme = useTheme();

  const Constants = GlobalVariables.useValues();
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const dimensions = useWindowDimensions();

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: '#ffffffff',
        },
      }}
      linking={LinkingConfiguration}
    >
      <Stack.Navigator
        initialRouteName="SplashScreen"
        presentation="transparentModal"
        screenOptions={({ navigation }) => ({
          cardStyle: { flex: 1 },
          headerLeft: ({ tintColor, canGoBack }) =>
            canGoBack ? null : (
              <Touchable
                style={[styles.headerContainer, styles.headerContainerLeft]}
                onPress={() => {
                  try {
                    if (Constants['top_nav_pressed'] === true) {
                      setGlobalVariableValue({
                        key: 'top_nav_pressed',
                        value: false,
                      });
                    } else {
                      setGlobalVariableValue({
                        key: 'top_nav_pressed',
                        value: true,
                      });
                    }
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <Icon
                  name="MaterialCommunityIcons/menu"
                  size={Platform.OS === 'ios' ? 21 : 24}
                  color={theme.colors.text.strong}
                  style={[styles.headerIcon, styles.headerIconLeft]}
                />
              </Touchable>
            ),
          headerRight: ({ tintColor }) => (
            <Touchable
              style={[styles.headerContainer, styles.headerContainerRight]}
              onPress={() => {
                console.log('Dummy Component ON_RIGHT_ICON_PRESS Start');
                let error = null;
                try {
                  console.log('Start ON_RIGHT_ICON_PRESS:0 NAVIGATE');
                  /* hidden 'Navigate' action */ console.log(
                    'Complete ON_RIGHT_ICON_PRESS:0 NAVIGATE'
                  );
                  console.log('Start ON_RIGHT_ICON_PRESS:1 SET_VARIABLE');
                  /* hidden 'Set Variable' action */ console.log(
                    'Complete ON_RIGHT_ICON_PRESS:1 SET_VARIABLE'
                  );
                } catch (err) {
                  console.error(err);
                  error = err.message ?? err;
                }
                console.log(
                  'Dummy Component ON_RIGHT_ICON_PRESS Complete',
                  error ? { error } : 'no error'
                );
              }}
            >
              <Icon
                name=""
                size={Platform.OS === 'ios' ? 21 : 24}
                color={theme.colors.text.strong}
                style={[styles.headerIcon, styles.headerIconRight]}
              />
            </Touchable>
          ),
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.colors.background.brand,
            borderBottomColor: theme.colors.border.brand,
          },
          headerTintColor: theme.colors.text.strong,
          headerTitleStyle: { fontFamily: 'Quicksand_600SemiBold' },
        })}
      >
        <Stack.Screen
          name="LogInScreen"
          component={LogInScreen}
          options={({ navigation }) => ({
            headerShown: false,
            title: 'LogIn',
          })}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={({ navigation }) => ({
            headerLeft: ({ tintColor, canGoBack }) =>
              canGoBack ? (
                <Touchable
                  style={[styles.headerContainer, styles.headerContainerLeft]}
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
                >
                  <Icon
                    name="MaterialIcons/arrow-back-ios"
                    size={Platform.OS === 'ios' ? 21 : 24}
                    color={tintColor}
                    style={[styles.headerIcon, styles.headerIconLeft]}
                  />
                </Touchable>
              ) : null,
            headerRight: ({ tintColor }) => (
              <View
                style={[styles.headerContainer, styles.headerContainerRight]}
              >
                <Icon
                  name="MaterialCommunityIcons/border-none-variant"
                  size={Platform.OS === 'ios' ? 21 : 24}
                  color={theme.colors.background.brand}
                  style={[styles.headerIcon, styles.headerIconRight]}
                />
              </View>
            ),
            title: 'Forgot Password',
          })}
        />
        <Stack.Screen
          name="RequestDemoScreen"
          component={RequestDemoScreen}
          options={({ navigation }) => ({
            headerLeft: ({ tintColor, canGoBack }) =>
              canGoBack ? (
                <Touchable
                  style={[styles.headerContainer, styles.headerContainerLeft]}
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
                >
                  <Icon
                    name="MaterialIcons/arrow-back-ios"
                    size={Platform.OS === 'ios' ? 21 : 24}
                    color={tintColor}
                    style={[styles.headerIcon, styles.headerIconLeft]}
                  />
                </Touchable>
              ) : null,
            title: 'Request Demo',
          })}
        />
        <Stack.Screen
          name="NewslettersScreen"
          component={NewslettersScreen}
          options={({ navigation }) => ({
            headerShown: false,
            headerTitleStyle: { fontFamily: 'Quicksand_400Regular' },
            title: 'Newsletters',
          })}
        />
        <Stack.Screen
          name="AllEventsScreen"
          component={AllEventsScreen}
          options={({ navigation }) => ({
            headerTitleStyle: { fontFamily: 'Quicksand_400Regular' },
            title: 'All Events',
          })}
        />
        <Stack.Screen
          name="CFSScreen"
          component={CFSScreen}
          options={({ navigation }) => ({
            title: 'CFS',
          })}
        />
        <Stack.Screen
          name="PEPFScreen"
          component={PEPFScreen}
          options={({ navigation }) => ({
            title: 'PEPF',
          })}
        />
        <Stack.Screen
          name="NewsletterDetailsScreen"
          component={NewsletterDetailsScreen}
          options={({ navigation }) => ({
            headerLeft: ({ tintColor, canGoBack }) =>
              canGoBack ? (
                <Touchable
                  style={[styles.headerContainer, styles.headerContainerLeft]}
                  onPress={() => {
                    try {
                      navigation.goBack();
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <Icon
                    name="MaterialIcons/arrow-back-ios"
                    size={Platform.OS === 'ios' ? 21 : 24}
                    color={tintColor}
                    style={[styles.headerIcon, styles.headerIconLeft]}
                  />
                </Touchable>
              ) : null,
            headerTitleAllowFontScaling: false,
            title: 'Newsletter Details',
          })}
        />
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={({ navigation }) => ({
            headerShown: false,
            headerTitleStyle: { fontFamily: 'Quicksand_400Regular' },
            title: 'Splash Screen',
          })}
        />
        <Stack.Screen
          name="AdvisorsScreen"
          component={AdvisorsScreen}
          options={({ navigation }) => ({
            title: 'Advisors',
          })}
        />
        <Stack.Screen
          name="PeerGroupsScreen"
          component={PeerGroupsScreen}
          options={({ navigation }) => ({
            title: 'Peer Groups',
          })}
        />
        <Stack.Screen
          name="EventDetailsScreen"
          component={EventDetailsScreen}
          options={({ navigation }) => ({
            headerLeft: ({ tintColor, canGoBack }) =>
              canGoBack ? (
                <Touchable
                  style={[styles.headerContainer, styles.headerContainerLeft]}
                  onPress={() => {
                    try {
                      navigation.goBack();
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <Icon
                    name="MaterialIcons/arrow-back-ios"
                    size={Platform.OS === 'ios' ? 21 : 24}
                    color={tintColor}
                    style={[styles.headerIcon, styles.headerIconLeft]}
                  />
                </Touchable>
              ) : (
                <View
                  style={[styles.headerContainer, styles.headerContainerLeft]}
                >
                  <Icon
                    name="MaterialIcons/menu"
                    size={Platform.OS === 'ios' ? 21 : 24}
                    color={tintColor}
                    style={[styles.headerIcon, styles.headerIconLeft]}
                  />
                </View>
              ),
            title: 'Event Details',
          })}
        />
        <Stack.Screen
          name="CFSDetailsScreen"
          component={CFSDetailsScreen}
          options={({ navigation }) => ({
            title: 'CFS Details',
          })}
        />
        <Stack.Screen
          name="PeerGroupDetailsScreen"
          component={PeerGroupDetailsScreen}
          options={({ navigation }) => ({
            title: 'Peer Group Details',
          })}
        />
        <Stack.Screen
          name="PEPFDetailsScreen"
          component={PEPFDetailsScreen}
          options={({ navigation }) => ({
            title: 'PEPF Details',
          })}
        />
        <Stack.Screen
          name="StockSearchScreen"
          component={StockSearchScreen}
          options={({ navigation }) => ({
            title: 'Stock Search',
          })}
        />
        <Stack.Screen
          name="MultiplesScreen"
          component={MultiplesScreen}
          options={({ navigation }) => ({
            title: 'Multiples',
          })}
        />
        <Stack.Screen
          name="StockDetailsScreen"
          component={StockDetailsScreen}
          options={({ navigation }) => ({
            title: 'Stock Details',
          })}
        />
        <Stack.Screen
          name="TermsAndConditionsScreen"
          component={TermsAndConditionsScreen}
          options={({ navigation }) => ({
            title: 'Terms & Conditions',
          })}
        />
        <Stack.Screen
          name="PrivacyPolicyScreen"
          component={PrivacyPolicyScreen}
          options={({ navigation }) => ({
            title: 'Privacy Policy',
          })}
        />
        <Stack.Screen
          name="MyAccountScreen"
          component={MyAccountScreen}
          options={({ navigation }) => ({
            title: 'My Account',
          })}
        />
        <Stack.Screen
          name="ReportsScreen"
          component={ReportsScreen}
          options={({ navigation }) => ({
            title: 'Reports',
          })}
        />
        <Stack.Screen
          name="AdvisorDetailsScreen"
          component={AdvisorDetailsScreen}
          options={({ navigation }) => ({
            title: 'Advisor Details',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    ...Platform.select({
      ios: null,
      default: {
        marginVertical: 3,
        marginHorizontal: 11,
      },
    }),
  },
  headerContainerLeft: Platform.select({ ios: { marginLeft: 8 } }),
  headerContainerRight: Platform.select({ ios: { marginRight: 8 } }),
  headerIcon: Platform.select({
    ios: {
      marginVertical: 12,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
    default: {
      margin: 3,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
  }),
  headerIconLeft: Platform.select({ ios: { marginRight: 6 } }),
  headerIconRight: Platform.select({ ios: { marginLeft: 6 } }),
});
