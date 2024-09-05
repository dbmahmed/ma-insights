import React from 'react';
import { HStack, Icon, Pressable, Shadow, withTheme } from '@draftbit/ui';
import { useNavigation } from '@react-navigation/native';
import { Platform, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const CustomBottomNavBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          backgroundColor: palettes.Brand.Surface,
          bottom: 0,
          height: dimensions.width >= Breakpoints.Laptop ? 0 : 65,
          left: 0,
          position: [
            { minWidth: Breakpoints.Desktop, value: 'relative' },
            { minWidth: Breakpoints.Mobile, value: 'absolute' },
          ],
          right: 0,
          width: '100%',
          zIndex: 10,
        },
        dimensions.width
      )}
    >
      {/* Shadow 2 */}
      <>
        {dimensions.width >= Breakpoints.Laptop ? null : (
          <Shadow
            offsetX={0}
            offsetY={0}
            paintInside={true}
            showShadowCornerBottomEnd={true}
            showShadowCornerBottomStart={true}
            showShadowCornerTopEnd={true}
            showShadowCornerTopStart={true}
            showShadowSideBottom={true}
            showShadowSideEnd={true}
            showShadowSideStart={true}
            showShadowSideTop={true}
            {...GlobalStyles.ShadowStyles(theme)['bot_nav'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ShadowStyles(theme)['bot_nav'].style,
                {
                  top: {
                    minWidth: Breakpoints.Laptop,
                    value: dimensions.height - 65,
                  },
                }
              ),
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
                    backgroundColor: theme.colors.background.brand,
                    height: 65,
                    justifyContent: 'space-between',
                    overflow: { minWidth: Breakpoints.Laptop, value: 'hidden' },
                    width: '100%',
                  }
                ),
                dimensions.width
              )}
            >
              {/* View 4 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignContent: 'center',
                    alignItems: 'stretch',
                    alignSelf: 'center',
                    borderColor: [
                      {
                        minWidth: Breakpoints.Tablet,
                        value: theme.colors.foreground.brand,
                      },
                      {
                        minWidth: Breakpoints.Mobile,
                        value: theme.colors.foreground.brand,
                      },
                    ],
                    borderRightWidth: [
                      { minWidth: Breakpoints.Tablet, value: 0.5 },
                      { minWidth: Breakpoints.Mobile, value: 0.5 },
                    ],
                    borderStyle: 'dashed',
                    height: '100%',
                    justifyContent: 'center',
                    width: '25%',
                  },
                  dimensions.width
                )}
              >
                {/* Pressable 2 */}
                <Pressable
                  onPress={() => {
                    try {
                      navigation.navigate('NewslettersScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    { height: '100%', width: '100%' },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        height: '100%',
                        justifyContent: 'center',
                      },
                      dimensions.width
                    )}
                  >
                    <Icon
                      size={24}
                      color={
                        Constants['pageName'] === 'Newsletters'
                          ? palettes.Brand.Primary
                          : palettes.Brand.Strong
                      }
                      name={'Ionicons/newspaper-outline'}
                      style={StyleSheet.applyWidth(
                        { width: '100%' },
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
                            color:
                              Constants['pageName'] === 'Newsletters'
                                ? palettes.Brand.Primary
                                : palettes.Brand.Strong,
                            fontFamily: 'Quicksand_400Regular',
                            marginTop: 2,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Newsletters'}
                    </Text>
                  </View>
                </Pressable>
              </View>
              {/* View 5 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignContent: 'center',
                    alignItems: 'stretch',
                    alignSelf: 'center',
                    height: '100%',
                    justifyContent: 'center',
                    width: '25%',
                  },
                  dimensions.width
                )}
              >
                {/* Pressable 2 */}
                <Pressable
                  onPress={() => {
                    try {
                      navigation.navigate('AllEventsScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    {
                      borderColor: [
                        {
                          minWidth: Breakpoints.Tablet,
                          value: theme.colors.foreground.brand,
                        },
                        {
                          minWidth: Breakpoints.Mobile,
                          value: theme.colors.foreground.brand,
                        },
                      ],
                      borderRightWidth: [
                        { minWidth: Breakpoints.Tablet, value: 0.5 },
                        { minWidth: Breakpoints.Mobile, value: 0.5 },
                      ],
                      borderStyle: 'dashed',
                      height: '100%',
                      width: '100%',
                    },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        height: '100%',
                        justifyContent: 'center',
                      },
                      dimensions.width
                    )}
                  >
                    <Icon
                      size={24}
                      color={
                        Constants['pageName'] === 'All events'
                          ? palettes.Brand.Primary
                          : palettes.Brand.Strong
                      }
                      name={'AntDesign/search1'}
                      style={StyleSheet.applyWidth(
                        { width: '100%' },
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
                            color:
                              Constants['pageName'] === 'All events'
                                ? palettes.Brand.Primary
                                : palettes.Brand.Strong,
                            fontFamily: 'Quicksand_400Regular',
                            marginTop: 2,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'All events'}
                    </Text>
                  </View>
                </Pressable>
              </View>
              {/* View 6 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignContent: 'center',
                    alignItems: 'stretch',
                    alignSelf: 'center',
                    height: '100%',
                    justifyContent: 'center',
                    width: '25%',
                  },
                  dimensions.width
                )}
              >
                {/* Pressable 2 */}
                <Pressable
                  onPress={() => {
                    try {
                      navigation.navigate('CFSScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    {
                      borderColor: [
                        {
                          minWidth: Breakpoints.Tablet,
                          value: theme.colors.foreground.brand,
                        },
                        {
                          minWidth: Breakpoints.Mobile,
                          value: theme.colors.foreground.brand,
                        },
                      ],
                      borderRightWidth: [
                        { minWidth: Breakpoints.Tablet, value: 0.5 },
                        { minWidth: Breakpoints.Mobile, value: 0.5 },
                      ],
                      borderStyle: 'dashed',
                      height: '100%',
                      width: '100%',
                    },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        height: '100%',
                        justifyContent: 'center',
                      },
                      dimensions.width
                    )}
                  >
                    <Icon
                      size={24}
                      color={
                        Constants['pageName'] === 'Companies For Sale'
                          ? palettes.Brand.Primary
                          : palettes.Brand.Strong
                      }
                      name={'MaterialIcons/business'}
                      style={StyleSheet.applyWidth(
                        { width: '100%' },
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
                            color:
                              Constants['pageName'] === 'Companies For Sale'
                                ? palettes.Brand.Primary
                                : palettes.Brand.Strong,
                            fontFamily: 'Quicksand_400Regular',
                            marginTop: 2,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'CFS'}
                    </Text>
                  </View>
                </Pressable>
              </View>
              {/* View 7 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignContent: 'center',
                    alignItems: 'stretch',
                    alignSelf: 'center',
                    height: '100%',
                    justifyContent: 'center',
                    width: '25%',
                  },
                  dimensions.width
                )}
              >
                {/* Pressable 2 */}
                <Pressable
                  onPress={() => {
                    try {
                      navigation.navigate('PEPFScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    { height: '100%', width: '100%' },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        height: '100%',
                        justifyContent: 'center',
                      },
                      dimensions.width
                    )}
                  >
                    <Icon
                      size={24}
                      color={
                        Constants['pageName'] === 'PEPF'
                          ? palettes.Brand.Primary
                          : palettes.Brand.Strong
                      }
                      name={'MaterialIcons/waterfall-chart'}
                      style={StyleSheet.applyWidth(
                        { width: '100%' },
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
                            color:
                              Constants['pageName'] === 'PEPF'
                                ? palettes.Brand.Primary
                                : palettes.Brand.Strong,
                            fontFamily: 'Quicksand_400Regular',
                            marginTop: 2,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'PEPF'}
                    </Text>
                  </View>
                </Pressable>
              </View>
            </HStack>
          </Shadow>
        )}
      </>
    </View>
  );
};

export default withTheme(CustomBottomNavBlock);
