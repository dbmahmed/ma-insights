import { I18nManager, Platform, StyleSheet, Text, View } from 'react-native';
import { systemWeights } from 'react-native-typography';
import { Icon, Touchable } from '@draftbit/ui';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import theme from './themes/Draftbit.js';
import LinkingConfiguration from './LinkingConfiguration.js';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';
import * as GlobalVariables from './config/GlobalVariableContext';
import assessAccess from './global-functions/assessAccess';
import Breakpoints from './utils/Breakpoints';
import useWindowDimensions from './utils/useWindowDimensions';

import AdvisorsScreen from './screens/AdvisorsScreen';
import AllEventsScreen from './screens/AllEventsScreen';
import CompanyForSaleScreen from './screens/CompanyForSaleScreen';
import EventDetailsScreen from './screens/EventDetailsScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import LogInScreen from './screens/LogInScreen';
import NewsletterDetailsScreen from './screens/NewsletterDetailsScreen';
import NewslewttersScreen from './screens/NewslewttersScreen';
import PEPFScreen from './screens/PEPFScreen';
import PeerGrroupsScreen from './screens/PeerGrroupsScreen';
import RequestDemoScreen from './screens/RequestDemoScreen';
import SplashScreen from './screens/SplashScreen';
import StockSearchScreen from './screens/StockSearchScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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

function MAInsights() {
  const Constants = GlobalVariables.useValues();
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const dimensions = useWindowDimensions();

  const tabBarIcons = {
    NewslewttersScreen: 'Ionicons/newspaper-outline',
    AllEventsScreen: 'MaterialIcons/search',
    CompanyForSaleScreen: 'MaterialIcons/business',
    PEPFScreen: 'MaterialIcons/waterfall-chart',
  };

  return (
    <Tab.Navigator
      initialRouteName="NewslewttersScreen"
      screenOptions={({ navigation }) => ({
        headerLeft: ({ tintColor, canGoBack }) =>
          canGoBack ? null : (
            <View style={[styles.headerContainer, styles.headerContainerLeft]}>
              <Icon
                name="MaterialIcons/menu-open"
                size={Platform.OS === 'ios' ? 21 : 24}
                color={theme.colors['Strong']}
                style={[styles.headerIcon, styles.headerIconLeft]}
              />
              <View style={styles.headerLabelWrapper}>
                <Text
                  style={[
                    styles.headerLabel,
                    { color: theme.colors['Strong'] },
                  ]}
                >
                  menu
                </Text>
              </View>
            </View>
          ),
        headerRight: ({ tintColor }) => (
          <Touchable
            style={[styles.headerContainer, styles.headerContainerRight]}
            onPress={() => {
              try {
                setGlobalVariableValue({
                  key: 'acc_pressed',
                  value: true,
                });
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <Icon
              name="MaterialCommunityIcons/account"
              size={Platform.OS === 'ios' ? 21 : 24}
              color={tintColor}
              style={[styles.headerIcon, styles.headerIconRight]}
            />
          </Touchable>
        ),
        headerShown: false,
        headerTitle: 'News',
        headerTitleStyle: { fontFamily: 'Quicksand_600SemiBold', fontSize: 20 },
        tabBarActiveBackgroundColor: 'rgba(0, 0, 0, 0)',
        tabBarActiveTintColor: theme.colors['Primary'],
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: theme.colors['Light'],
        tabBarLabelStyle: { fontFamily: 'Quicksand_600SemiBold' },
        tabBarStyle: { borderTopColor: theme.colors['Divider'] },
      })}
    >
      <Tab.Screen
        name="NewslewttersScreen"
        component={NewslewttersScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="Ionicons/newspaper-outline"
              size={25}
              color={focused ? color : color}
            />
          ),
          tabBarLabel: 'Newsletters',
          title: 'Newslewtters',
        })}
      />
      <Tab.Screen
        name="AllEventsScreen"
        component={AllEventsScreen}
        options={({ navigation }) => ({
          headerTitleStyle: { fontFamily: 'Quicksand_400Regular' },
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="MaterialIcons/search"
              size={25}
              color={focused ? color : color}
            />
          ),
          tabBarLabel: 'All events',
          title: 'All Events',
        })}
      />
      <Tab.Screen
        name="CompanyForSaleScreen"
        component={CompanyForSaleScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="MaterialIcons/business"
              size={25}
              color={focused ? color : color}
            />
          ),
          tabBarLabel: 'CFS',
          title: 'Company for Sale',
        })}
      />
      <Tab.Screen
        name="PEPFScreen"
        component={PEPFScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="MaterialIcons/waterfall-chart"
              size={25}
              color={focused ? color : color}
            />
          ),
          tabBarLabel: 'PEPF',
          title: 'PEPF',
        })}
      />
    </Tab.Navigator>
  );
}

export default function RootAppNavigator() {
  const Constants = GlobalVariables.useValues();
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: '#000000ff',
        },
      }}
      linking={LinkingConfiguration}
    >
      <Stack.Navigator
        initialRouteName="LogInScreen"
        screenOptions={({ navigation }) => ({
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
                  color={theme.colors['Strong']}
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
                  setGlobalVariableValue({
                    key: 'acc_pressed',
                    value: true,
                  });
                  console.log('Complete ON_RIGHT_ICON_PRESS:1 SET_VARIABLE');
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
                name="MaterialCommunityIcons/account"
                size={Platform.OS === 'ios' ? 21 : 24}
                color={theme.colors['Strong']}
                style={[styles.headerIcon, styles.headerIconRight]}
              />
            </Touchable>
          ),
          headerStyle: {
            backgroundColor: theme.colors['Background'],
            borderBottomColor: theme.colors['Divider'],
          },
          headerTintColor: theme.colors['Strong'],
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
                  color={theme.colors['Background']}
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
          name="StockSearchScreen"
          component={StockSearchScreen}
          options={({ navigation }) => ({
            title: 'Stock Search',
          })}
        />
        <Stack.Screen
          name="PeerGrroupsScreen"
          component={PeerGrroupsScreen}
          options={({ navigation }) => ({
            title: 'Peer Grroups',
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
        <Stack.Screen name="MAInsights" component={MAInsights} />
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
  headerLabel: { fontSize: 17, letterSpacing: 0.35 },
  headerLabelWrapper: { flexDirection: 'row', alignItems: 'flex-start' },
});
