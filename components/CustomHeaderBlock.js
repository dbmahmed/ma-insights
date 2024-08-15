import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  HStack,
  Icon,
  IconButton,
  Link,
  Pressable,
  Shadow,
  VStack,
  withTheme,
} from '@draftbit/ui';
import { useNavigation } from '@react-navigation/native';
import { Image, Modal, Text, View } from 'react-native';

const CustomHeaderBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          backgroundColor: theme.colors.background.brand,
          height: 65,
          position: { minWidth: Breakpoints.Desktop, value: 'relative' },
          zIndex: 10,
        },
        dimensions.width
      )}
    >
      <Shadow
        offsetX={0}
        offsetY={0}
        showShadowCornerBottomEnd={true}
        showShadowCornerBottomStart={true}
        showShadowCornerTopEnd={true}
        showShadowCornerTopStart={true}
        showShadowSideBottom={true}
        showShadowSideEnd={true}
        showShadowSideStart={true}
        showShadowSideTop={true}
        paintInside={false}
        style={StyleSheet.applyWidth(
          {
            width: '100%',
            zIndex: { minWidth: Breakpoints.Desktop, value: 1000 },
          },
          dimensions.width
        )}
      >
        <HStack
          {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.HStackStyles(theme)['H Stack'].style,
              {
                alignContent: 'center',
                alignSelf: 'center',
                height: 65,
                justifyContent: 'space-between',
                paddingLeft: 15,
                paddingRight: 15,
                width: '100%',
              }
            ),
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                flexDirection: 'row',
              },
              dimensions.width
            )}
          >
            {/* Back */}
            <>
              {!Constants['subPage'] ? null : (
                <IconButton
                  onPress={() => {
                    try {
                      navigation.goBack();
                      setGlobalVariableValue({
                        key: 'top_nav_pressed',
                        value: false,
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  size={32}
                  color={theme.colors.text.strong}
                  icon={'Entypo/chevron-thin-left'}
                />
              )}
            </>
            {/* MENU */}
            <IconButton
              onPress={() => {
                try {
                  setGlobalVariableValue({
                    key: 'top_nav_pressed',
                    value: true,
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
              size={32}
              color={theme.colors.text.strong}
              icon={'Feather/menu'}
            />
            <>
              {dimensions.width >= Breakpoints.Laptop ? null : (
                <Text
                  accessible={true}
                  {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['screen_title'].style,
                      {
                        flex: 1,
                        fontFamily: 'Poppins_400Regular',
                        fontSize: { minWidth: Breakpoints.Laptop, value: 16 },
                        paddingLeft: 5,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {Constants['pageName']}
                </Text>
              )}
            </>
          </View>
          {/* View 2 */}
          <>
            {!(dimensions.width >= Breakpoints.Laptop) ? null : (
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignContent: {
                      minWidth: Breakpoints.Laptop,
                      value: 'stretch',
                    },
                    alignItems: {
                      minWidth: Breakpoints.Laptop,
                      value: 'center',
                    },
                    alignSelf: {
                      minWidth: Breakpoints.Laptop,
                      value: 'center',
                    },
                    flexDirection: {
                      minWidth: Breakpoints.Tablet,
                      value: 'row',
                    },
                    gap: { minWidth: Breakpoints.Laptop, value: 10 },
                    position: {
                      minWidth: Breakpoints.Laptop,
                      value: 'absolute',
                    },
                    right: { minWidth: Breakpoints.Laptop, value: 100 },
                  },
                  dimensions.width
                )}
              >
                <Link
                  accessible={true}
                  onPress={() => {
                    try {
                      navigation.navigate('MAInsights', {
                        screen: 'NewslettersScreen',
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  {...GlobalStyles.LinkStyles(theme)['Link'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.LinkStyles(theme)['Link'].style,
                      {
                        color: {
                          minWidth: Breakpoints.Laptop,
                          value:
                            Constants['pageName'] === 'Newsletters'
                              ? palettes.App.Orange
                              : palettes.Brand.Primary,
                        },
                        fontFamily: {
                          minWidth: Breakpoints.Laptop,
                          value: 'Quicksand_500Medium',
                        },
                      }
                    ),
                    dimensions.width
                  )}
                  title={'NEWSLETTERS'}
                />
                <Text
                  accessible={true}
                  {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['screen_title'].style,
                      {
                        alignSelf: {
                          minWidth: Breakpoints.Laptop,
                          value: 'center',
                        },
                        color: {
                          minWidth: Breakpoints.Laptop,
                          value: theme.colors.foreground.brand,
                        },
                        fontFamily: {
                          minWidth: Breakpoints.Laptop,
                          value: 'Quicksand_300Light',
                        },
                        fontSize: { minWidth: Breakpoints.Laptop, value: 35 },
                        marginBottom: {
                          minWidth: Breakpoints.Laptop,
                          value: 0,
                        },
                        marginTop: { minWidth: Breakpoints.Laptop, value: 0 },
                        textAlign: {
                          minWidth: Breakpoints.Laptop,
                          value: 'center',
                        },
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'|'}
                </Text>
                {/* Link 2 */}
                <Link
                  accessible={true}
                  onPress={() => {
                    try {
                      navigation.navigate('MAInsights', {
                        screen: 'AllEventsScreen',
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  {...GlobalStyles.LinkStyles(theme)['Link'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.LinkStyles(theme)['Link'].style,
                      {
                        color: {
                          minWidth: Breakpoints.Laptop,
                          value:
                            Constants['pageName'] === 'All events'
                              ? palettes.App.Orange
                              : palettes.Brand.Primary,
                        },
                      }
                    ),
                    dimensions.width
                  )}
                  title={'ALL EVENTS'}
                />
                {/* Text 2 */}
                <Text
                  accessible={true}
                  {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['screen_title'].style,
                      {
                        alignSelf: {
                          minWidth: Breakpoints.Laptop,
                          value: 'center',
                        },
                        color: {
                          minWidth: Breakpoints.Laptop,
                          value: theme.colors.foreground.brand,
                        },
                        fontFamily: {
                          minWidth: Breakpoints.Laptop,
                          value: 'Quicksand_300Light',
                        },
                        fontSize: { minWidth: Breakpoints.Laptop, value: 35 },
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'|'}
                </Text>
                {/* Link 3 */}
                <Link
                  accessible={true}
                  onPress={() => {
                    try {
                      navigation.navigate('MAInsights', {
                        screen: 'CFSScreen',
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  {...GlobalStyles.LinkStyles(theme)['Link'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.LinkStyles(theme)['Link'].style,
                      {
                        color: {
                          minWidth: Breakpoints.Laptop,
                          value:
                            Constants['pageName'] === 'Companies For Sale'
                              ? palettes.App.Orange
                              : palettes.Brand.Primary,
                        },
                      }
                    ),
                    dimensions.width
                  )}
                  title={'CFS'}
                />
                {/* Text 3 */}
                <Text
                  accessible={true}
                  {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['screen_title'].style,
                      {
                        alignSelf: {
                          minWidth: Breakpoints.Laptop,
                          value: 'center',
                        },
                        color: {
                          minWidth: Breakpoints.Laptop,
                          value: theme.colors.foreground.brand,
                        },
                        fontFamily: {
                          minWidth: Breakpoints.Laptop,
                          value: 'Quicksand_300Light',
                        },
                        fontSize: { minWidth: Breakpoints.Laptop, value: 35 },
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'|'}
                </Text>
                {/* Link 4 */}
                <Link
                  accessible={true}
                  onPress={() => {
                    try {
                      navigation.navigate('MAInsights', {
                        screen: 'PEPFScreen',
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  {...GlobalStyles.LinkStyles(theme)['Link'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.LinkStyles(theme)['Link'].style,
                      {
                        color: {
                          minWidth: Breakpoints.Laptop,
                          value:
                            Constants['pageName'] ===
                            'Private Equity Firms (PEPF)'
                              ? palettes.App.Orange
                              : palettes.Brand.Primary,
                        },
                      }
                    ),
                    dimensions.width
                  )}
                  title={'PEPF'}
                />
                {/* Text 4 */}
                <Text
                  accessible={true}
                  {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['screen_title'].style,
                      {
                        alignSelf: {
                          minWidth: Breakpoints.Laptop,
                          value: 'center',
                        },
                        color: {
                          minWidth: Breakpoints.Laptop,
                          value: theme.colors.foreground.brand,
                        },
                        fontFamily: {
                          minWidth: Breakpoints.Laptop,
                          value: 'Quicksand_300Light',
                        },
                        fontSize: { minWidth: Breakpoints.Laptop, value: 35 },
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'|'}
                </Text>
              </View>
            )}
          </>
          {/* View 3 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'stretch',
                justifyContent: 'center',
                position: 'relative',
              },
              dimensions.width
            )}
          >
            <Pressable
              onPress={() => {
                try {
                  navigation.navigate('MAInsights', {
                    screen: 'NewslettersScreen',
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <Image
                {...GlobalStyles.ImageStyles(theme)['Image'].props}
                resizeMode={'contain'}
                source={Images['mainsightsfaviconlogo1024cropped']}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ImageStyles(theme)['Image'].style,
                    { height: 50, width: 75 }
                  ),
                  dimensions.width
                )}
              />
            </Pressable>
          </View>
        </HStack>
      </Shadow>
      {/* Side Menu */}
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        animationType={'fade'}
        presentationStyle={'pageSheet'}
        transparent={true}
        visible={Constants['top_nav_pressed']}
      >
        {/* View 3 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              flexDirection: 'row',
              height: 65,
              paddingLeft: 15,
              width: '100%',
            },
            dimensions.width
          )}
        >
          {/* Back */}
          <>
            {!Constants['subPage'] ? null : (
              <IconButton
                onPress={() => {
                  try {
                    navigation.goBack();
                    setGlobalVariableValue({
                      key: 'top_nav_pressed',
                      value: false,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
                size={32}
                color={theme.colors.text.strong}
                icon={'Entypo/chevron-thin-left'}
              />
            )}
          </>
          {/* MENU */}
          <IconButton
            onPress={() => {
              try {
                setGlobalVariableValue({
                  key: 'top_nav_pressed',
                  value: false,
                });
              } catch (err) {
                console.error(err);
              }
            }}
            size={32}
            color={theme.colors.text.strong}
            icon={'Feather/menu'}
          />
        </View>

        <View
          collapsable={true}
          style={StyleSheet.applyWidth(
            {
              alignItems: [
                { minWidth: Breakpoints.Mobile, value: 'flex-start' },
                { minWidth: Breakpoints.Laptop, value: 'flex-start' },
              ],
              backgroundColor: theme.colors.background.brand,
              borderBottomWidth: 0,
              borderColor: [
                {
                  minWidth: Breakpoints.Mobile,
                  value: theme.colors.border.brand,
                },
                {
                  minWidth: Breakpoints.Laptop,
                  value: theme.colors.border.brand,
                },
              ],
              borderLeftWidth: 0,
              borderTopWidth: 0,
              borderWidth: [
                { minWidth: Breakpoints.Mobile, value: 0.5 },
                { minWidth: Breakpoints.Laptop, value: 0.5 },
              ],
              flex: 1,
              gap: 0,
              height: '100%',
              justifyContent: 'space-between',
              maxWidth: 300,
              padding: 10,
              paddingTop: 5,
              width: '100%',
              zIndex: 10,
            },
            dimensions.width
          )}
        >
          {/* View 2 */}
          <View
            style={StyleSheet.applyWidth(
              {
                width: [
                  { minWidth: Breakpoints.Mobile, value: '100%' },
                  { minWidth: Breakpoints.Laptop, value: '100%' },
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
                  {
                    borderBottomWidth: 0.5,
                    borderColor: theme.colors.foreground.brand,
                    borderTopWidth: 0.5,
                    width: '100%',
                  }
                ),
                dimensions.width
              )}
            >
              <Pressable
                onPress={() => {
                  try {
                    navigation.navigate('MAInsights', {
                      screen: 'NewslettersScreen',
                    });
                    setGlobalVariableValue({
                      key: 'top_nav_pressed',
                      value: false,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <HStack
                  {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.HStackStyles(theme)['H Stack'].style,
                      { gap: 10, padding: 10 }
                    ),
                    dimensions.width
                  )}
                >
                  <Icon
                    size={24}
                    color={
                      Constants['pageName'] === 'Newsletters'
                        ? palettes.App.Orange
                        : palettes.Brand.Strong
                    }
                    name={'Ionicons/newspaper'}
                  />
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['screen_title'].style,
                        {
                          color: {
                            minWidth: Breakpoints.Laptop,
                            value:
                              Constants['pageName'] === 'Newsletters'
                                ? palettes.App.Orange
                                : palettes.Brand.Strong,
                          },
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'NEWSLETTERS'}
                  </Text>
                </HStack>
              </Pressable>
            </VStack>
            {/* V Stack 2 */}
            <VStack
              {...GlobalStyles.VStackStyles(theme)['V Stack'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.VStackStyles(theme)['V Stack'].style,
                  {
                    borderBottomWidth: 0.5,
                    borderColor: theme.colors.foreground.brand,
                  }
                ),
                dimensions.width
              )}
            >
              <Pressable
                onPress={() => {
                  try {
                    navigation.navigate('MAInsights', {
                      screen: 'AllEventsScreen',
                    });
                    setGlobalVariableValue({
                      key: 'top_nav_pressed',
                      value: false,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <HStack
                  {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.HStackStyles(theme)['H Stack'].style,
                      { gap: 10, padding: 10 }
                    ),
                    dimensions.width
                  )}
                >
                  <Icon
                    size={24}
                    color={
                      Constants['pageName'] === 'All events'
                        ? palettes.App.Orange
                        : palettes.Brand.Strong
                    }
                    name={'MaterialIcons/search'}
                  />
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['screen_title'].style,
                        {
                          color: {
                            minWidth: Breakpoints.Laptop,
                            value:
                              Constants['pageName'] === 'All events'
                                ? palettes.App.Orange
                                : palettes.Brand.Strong,
                          },
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'ALL EVENTS'}
                  </Text>
                </HStack>
              </Pressable>
            </VStack>
            {/* V Stack 3 */}
            <VStack
              {...GlobalStyles.VStackStyles(theme)['V Stack'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.VStackStyles(theme)['V Stack'].style,
                  {
                    borderBottomWidth: 0.5,
                    borderColor: theme.colors.foreground.brand,
                  }
                ),
                dimensions.width
              )}
            >
              <Pressable
                onPress={() => {
                  try {
                    navigation.navigate('MAInsights', { screen: 'CFSScreen' });
                    setGlobalVariableValue({
                      key: 'top_nav_pressed',
                      value: false,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <HStack
                  {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.HStackStyles(theme)['H Stack'].style,
                      { gap: 10, padding: 10 }
                    ),
                    dimensions.width
                  )}
                >
                  <Icon
                    size={24}
                    color={
                      Constants['pageName'] === 'Companies For Sale'
                        ? palettes.App.Orange
                        : palettes.Brand.Strong
                    }
                    name={'MaterialIcons/business'}
                  />
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['screen_title'].style,
                        {
                          color: {
                            minWidth: Breakpoints.Laptop,
                            value:
                              Constants['pageName'] === 'Companies For Sale'
                                ? palettes.App.Orange
                                : palettes.Brand.Strong,
                          },
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'CFS'}
                  </Text>
                </HStack>
              </Pressable>
            </VStack>
            {/* V Stack 4 */}
            <VStack
              {...GlobalStyles.VStackStyles(theme)['V Stack'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.VStackStyles(theme)['V Stack'].style,
                  {
                    borderBottomWidth: 0.5,
                    borderColor: theme.colors.foreground.brand,
                  }
                ),
                dimensions.width
              )}
            >
              <Pressable
                onPress={() => {
                  try {
                    navigation.navigate('MAInsights', { screen: 'PEPFScreen' });
                    setGlobalVariableValue({
                      key: 'top_nav_pressed',
                      value: false,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <HStack
                  {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.HStackStyles(theme)['H Stack'].style,
                      { gap: 10, padding: 10 }
                    ),
                    dimensions.width
                  )}
                >
                  <Icon
                    size={24}
                    color={
                      Constants['pageName'] === 'Private Equity Firms (PEPF)'
                        ? palettes.App.Orange
                        : palettes.Brand.Strong
                    }
                    name={'MaterialIcons/waterfall-chart'}
                  />
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['screen_title'].style,
                        {
                          color: {
                            minWidth: Breakpoints.Laptop,
                            value:
                              Constants['pageName'] ===
                              'Private Equity Firms (PEPF)'
                                ? palettes.App.Orange
                                : palettes.Brand.Strong,
                          },
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'PE PORTFOLIOS'}
                  </Text>
                </HStack>
              </Pressable>
            </VStack>
            {/* V Stack 5 */}
            <VStack
              {...GlobalStyles.VStackStyles(theme)['V Stack'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.VStackStyles(theme)['V Stack'].style,
                  {
                    borderBottomWidth: 0.5,
                    borderColor: theme.colors.foreground.brand,
                    width: '100%',
                  }
                ),
                dimensions.width
              )}
            >
              <Pressable
                onPress={() => {
                  try {
                    navigation.navigate('AdvisorsScreen');
                    setGlobalVariableValue({
                      key: 'top_nav_pressed',
                      value: false,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <HStack
                  {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.HStackStyles(theme)['H Stack'].style,
                      { gap: 10, padding: 10 }
                    ),
                    dimensions.width
                  )}
                >
                  <Icon
                    size={24}
                    color={
                      Constants['pageName'] === 'Advisor league tables'
                        ? palettes.App.Orange
                        : palettes.Brand.Strong
                    }
                    name={'MaterialCommunityIcons/bank'}
                  />
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['screen_title'].style,
                        {
                          color: {
                            minWidth: Breakpoints.Laptop,
                            value:
                              Constants['pageName'] === 'Advisor league tables'
                                ? palettes.App.Orange
                                : palettes.Brand.Strong,
                          },
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'ADVISORS'}
                  </Text>
                </HStack>
              </Pressable>
            </VStack>
            {/* V Stack 6 */}
            <VStack
              {...GlobalStyles.VStackStyles(theme)['V Stack'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.VStackStyles(theme)['V Stack'].style,
                  {
                    borderBottomWidth: 0.5,
                    borderColor: theme.colors.foreground.brand,
                    width: '100%',
                  }
                ),
                dimensions.width
              )}
            >
              <Pressable
                onPress={() => {
                  try {
                    navigation.navigate('StockSearchScreen');
                    setGlobalVariableValue({
                      key: 'top_nav_pressed',
                      value: false,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <HStack
                  {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.HStackStyles(theme)['H Stack'].style,
                      { gap: 10, padding: 10 }
                    ),
                    dimensions.width
                  )}
                >
                  <Icon
                    size={24}
                    color={
                      Constants['pageName'] === 'Stock search'
                        ? palettes.App.Orange
                        : palettes.Brand.Strong
                    }
                    name={'Entypo/line-graph'}
                  />
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['screen_title'].style,
                      dimensions.width
                    )}
                  >
                    {'STOCKS SEARCH'}
                  </Text>
                </HStack>
              </Pressable>
            </VStack>
            {/* V Stack 7 */}
            <VStack
              {...GlobalStyles.VStackStyles(theme)['V Stack'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.VStackStyles(theme)['V Stack'].style,
                  {
                    borderBottomWidth: 0.5,
                    borderColor: theme.colors.foreground.brand,
                    width: '100%',
                  }
                ),
                dimensions.width
              )}
            >
              <Pressable
                onPress={() => {
                  try {
                    navigation.navigate('PeerGroupsScreen');
                    setGlobalVariableValue({
                      key: 'top_nav_pressed',
                      value: false,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <HStack
                  {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.HStackStyles(theme)['H Stack'].style,
                      { gap: 10, padding: 10 }
                    ),
                    dimensions.width
                  )}
                >
                  <Icon
                    size={24}
                    color={
                      Constants['pageName'] === 'Peer Groups'
                        ? palettes.App.Orange
                        : palettes.Brand.Strong
                    }
                    name={'FontAwesome/bar-chart'}
                  />
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['screen_title'].style,
                        {
                          color: {
                            minWidth: Breakpoints.Laptop,
                            value:
                              Constants['pageName'] === 'Peer Groups'
                                ? palettes.App.Orange
                                : palettes.Brand.Strong,
                          },
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'PEER GROUPS'}
                  </Text>
                </HStack>
              </Pressable>
            </VStack>
          </View>

          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: { minWidth: Breakpoints.Laptop, value: 'center' },
                justifyContent: {
                  minWidth: Breakpoints.Laptop,
                  value: 'flex-end',
                },
                paddingBottom: 10,
                width: [
                  { minWidth: Breakpoints.Mobile, value: '100%' },
                  { minWidth: Breakpoints.Laptop, value: '100%' },
                ],
              },
              dimensions.width
            )}
          >
            {/* V Stack 8 */}
            <VStack
              {...GlobalStyles.VStackStyles(theme)['V Stack'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.VStackStyles(theme)['V Stack'].style,
                  { width: '100%' }
                ),
                dimensions.width
              )}
            >
              <Pressable
                onPress={() => {
                  try {
                    setGlobalVariableValue({
                      key: 'top_nav_pressed',
                      value: false,
                    });
                    setGlobalVariableValue({
                      key: 'acc_pressed',
                      value: true,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <HStack
                  {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.HStackStyles(theme)['H Stack'].style,
                      {
                        gap: { minWidth: Breakpoints.Laptop, value: 10 },
                        justifyContent: 'flex-start',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  <Icon size={24} name={'MaterialCommunityIcons/account'} />
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['screen_title'].style,
                        { textAlign: 'center' }
                      ),
                      dimensions.width
                    )}
                  >
                    {'MY ACCOUNT'}
                  </Text>
                </HStack>
              </Pressable>
            </VStack>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default withTheme(CustomHeaderBlock);
