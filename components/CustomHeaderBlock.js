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
          left: { minWidth: Breakpoints.Desktop, value: 0 },
          position: { minWidth: Breakpoints.Desktop, value: 'absolute' },
          right: { minWidth: Breakpoints.Desktop, value: 0 },
          top: { minWidth: Breakpoints.Desktop, value: 0 },
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
        style={StyleSheet.applyWidth({ width: '100%' }, dimensions.width)}
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
                  navigation.navigate('PeerGroupDetailsScreen');
                  /* hidden 'Set Variable' action */
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
                source={Images.mainsightsfaviconlogo1024cropped}
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
    </View>
  );
};

export default withTheme(CustomHeaderBlock);
