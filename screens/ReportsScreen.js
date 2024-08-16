import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import CustomHeaderBlock from '../components/CustomHeaderBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import removeGlobalScroll from '../global-functions/removeGlobalScroll';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  ScreenContainer,
  SimpleStyleScrollView,
  withTheme,
} from '@draftbit/ui';
import { H5 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { Text, View } from 'react-native';

const ReportsScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      const Reports = setGlobalVariableValue({
        key: 'pageName',
        value: 'Reports',
      });
      removeGlobalScroll();
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasLeftSafeArea={true}
    >
      <CustomHeaderBlock />
      <SimpleStyleScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            height: '100%',
            marginTop: 65,
            paddingBottom: 65,
            position: 'absolute',
            width: '100%',
          },
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            { maxWidth: 1200, padding: 10, paddingTop: 5, width: '100%' },
            dimensions.width
          )}
        >
          <>
            {!(dimensions.width >= Breakpoints.Laptop) ? null : (
              <H5
                selectable={false}
                {...GlobalStyles.H5Styles(theme)['H5'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.H5Styles(theme)['H5'].style, {
                    fontFamily: 'Quicksand_600SemiBold',
                    fontSize: 25,
                    marginBottom: 20,
                    marginTop: [
                      { minWidth: Breakpoints.Mobile, value: 0 },
                      { minWidth: Breakpoints.Laptop, value: 20 },
                    ],
                    paddingLeft: 5,
                    textDecorationLine: 'none',
                  }),
                  dimensions.width
                )}
              >
                {'Reports'}
              </H5>
            )}
          </>
          <View
            style={StyleSheet.applyWidth(
              { gap: 10, marginBottom: 10 },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              {...GlobalStyles.TextStyles(theme)['screen_title'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['screen_title'].style,
                  { fontFamily: 'Quicksand_400Regular' }
                ),
                dimensions.width
              )}
            >
              {
                'Our monthly advisor reports and rankings as well as periodic and ad-hoc special reports.'
              }
            </Text>
            {/* Text 2 */}
            <Text
              accessible={true}
              {...GlobalStyles.TextStyles(theme)['screen_title'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['screen_title'].style,
                  { fontFamily: 'Quicksand_400Regular' }
                ),
                dimensions.width
              )}
            >
              {
                'Note: the weekly reports with opportunity-related headlines from a given week are found in the “Newsletters” tab.'
              }
            </Text>
          </View>
        </View>
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors.foreground.brand,
              maxWidth: 1200,
              padding: 5,
              width: '100%',
            },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', flexDirection: 'row' },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                { padding: 2, paddingRight: 5, width: 100 },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['screen_title'].style,
                    { fontFamily: 'Quicksand_600SemiBold' }
                  ),
                  dimensions.width
                )}
              >
                {'Published'}
              </Text>
            </View>
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                { padding: 2, paddingLeft: 5 },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['screen_title'].style,
                    { fontFamily: 'Quicksand_600SemiBold' }
                  ),
                  dimensions.width
                )}
              >
                {'Title (PDF download)'}
              </Text>
            </View>
          </View>
          {/* View 2 */}
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', flexDirection: 'row' },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                { padding: 2, paddingRight: 5, width: 100 },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['screen_title'].style,
                    { fontFamily: 'Quicksand_400Regular' }
                  ),
                  dimensions.width
                )}
              >
                {'01/07/2024\n'}
              </Text>
            </View>
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                { padding: 2, paddingLeft: 5 },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['screen_title'].style,
                    { fontFamily: 'Quicksand_400Regular' }
                  ),
                  dimensions.width
                )}
              >
                {'Monthly Advisor Report Nordic June 2024'}
              </Text>
            </View>
          </View>
        </View>
      </SimpleStyleScrollView>
    </ScreenContainer>
  );
};

export default withTheme(ReportsScreen);
