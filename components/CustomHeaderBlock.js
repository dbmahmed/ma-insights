import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { HStack, IconButton, Pressable, Shadow, withTheme } from '@draftbit/ui';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, View } from 'react-native';

const CustomHeaderBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          backgroundColor: theme.colors.background.brand,
          height: 65,
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
                width: { minWidth: Breakpoints.Tablet, value: '5%' },
              },
              dimensions.width
            )}
          >
            {/* MENU */}
            <IconButton
              onPress={() => {
                try {
                  navigation.navigate('PeerGroupDetailsScreen');
                } catch (err) {
                  console.error(err);
                }
              }}
              size={32}
              color={theme.colors.text.strong}
              icon={'Feather/menu'}
            />
          </View>
          {/* View 2 */}
          <View
            style={StyleSheet.applyWidth(
              {
                minHeight: 35,
                minWidth: 35,
                width: { minWidth: Breakpoints.Tablet, value: '85%' },
              },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              {...GlobalStyles.TextStyles(theme)['screen_title'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['screen_title'].style,
                  { flex: 1, fontFamily: 'Poppins_400Regular' }
                ),
                dimensions.width
              )}
            >
              {Constants['pageName']}
            </Text>
          </View>
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
