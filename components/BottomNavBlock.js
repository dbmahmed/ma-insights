import React from 'react';
import { HStack, IconButton, Link, VStack, withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const BottomNavBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          backgroundColor: palettes.Brand.Surface,
          flexDirection: 'column',
          justifyContent: 'flex-end',
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
              backgroundColor: palettes.Brand.Surface,
              justifyContent: 'center',
            }
          ),
          dimensions.width
        )}
      >
        <VStack
          {...GlobalStyles.VStackStyles(theme)['V Stack'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.VStackStyles(theme)['V Stack'].style,
              { alignItems: 'center', width: '25%' }
            ),
            dimensions.width
          )}
        >
          <IconButton
            size={32}
            color={theme.colors.text.strong}
            icon={'Ionicons/newspaper'}
          />
          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['screen_title'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['screen_title'].style,
                { color: theme.colors.text.strong }
              ),
              dimensions.width
            )}
          >
            {'Newsletters'}
          </Text>
        </VStack>
        {/* V Stack 2 */}
        <VStack
          {...GlobalStyles.VStackStyles(theme)['V Stack'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.VStackStyles(theme)['V Stack'].style,
              { alignItems: 'center', width: '25%' }
            ),
            dimensions.width
          )}
        >
          <IconButton
            size={32}
            color={theme.colors.text.strong}
            icon={'FontAwesome/search'}
          />
          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['screen_title'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['screen_title'].style,
                { color: theme.colors.text.strong }
              ),
              dimensions.width
            )}
          >
            {'All Events'}
          </Text>
        </VStack>
        {/* V Stack 3 */}
        <VStack
          {...GlobalStyles.VStackStyles(theme)['V Stack'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.VStackStyles(theme)['V Stack'].style,
              { alignItems: 'center', width: '25%' }
            ),
            dimensions.width
          )}
        >
          <IconButton
            size={32}
            color={theme.colors.text.strong}
            icon={'FontAwesome/building'}
          />
          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['screen_title'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['screen_title'].style,
                { color: theme.colors.text.strong }
              ),
              dimensions.width
            )}
          >
            {'CFS'}
          </Text>
        </VStack>
        {/* V Stack 4 */}
        <VStack
          {...GlobalStyles.VStackStyles(theme)['V Stack'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.VStackStyles(theme)['V Stack'].style,
              { alignItems: 'center', width: '25%' }
            ),
            dimensions.width
          )}
        >
          <IconButton
            size={32}
            color={theme.colors.text.strong}
            icon={'MaterialIcons/waterfall-chart'}
          />
          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['screen_title'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['screen_title'].style,
                { color: theme.colors.text.strong }
              ),
              dimensions.width
            )}
          >
            {'PEPF'}
          </Text>
        </VStack>
      </HStack>
    </View>
  );
};

export default withTheme(BottomNavBlock);
