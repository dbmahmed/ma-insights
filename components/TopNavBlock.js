import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { HStack, Icon, Pressable, VStack, withTheme } from '@draftbit/ui';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';

const TopNavBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  return (
    <View
      collapsable={true}
      style={StyleSheet.applyWidth(
        {
          alignItems: [
            { minWidth: Breakpoints.Mobile, value: 'flex-start' },
            { minWidth: Breakpoints.Laptop, value: 'flex-start' },
          ],
          backgroundColor: theme.colors['Background'],
          borderColor: [
            { minWidth: Breakpoints.Mobile, value: theme.colors['Medium'] },
            { minWidth: Breakpoints.Laptop, value: theme.colors['Divider'] },
          ],
          borderWidth: [
            { minWidth: Breakpoints.Mobile, value: 0.5 },
            { minWidth: Breakpoints.Laptop, value: 0.5 },
          ],
          flex: 1,
          height: '100%',
          padding: { minWidth: Breakpoints.Laptop, value: 10 },
          position: { minWidth: Breakpoints.Laptop, value: 'absolute' },
          width: [
            { minWidth: Breakpoints.Mobile, value: '50%' },
            { minWidth: Breakpoints.Laptop, value: '25%' },
          ],
          zIndex: 10,
        },
        dimensions.width
      )}
    >
      {/* View 2 */}
      <View
        style={StyleSheet.applyWidth(
          { width: { minWidth: Breakpoints.Laptop, value: '100%' } },
          dimensions.width
        )}
      >
        <VStack
          {...GlobalStyles.VStackStyles(theme)['V Stack'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.VStackStyles(theme)['V Stack'].style,
              {
                borderBottomWidth: { minWidth: Breakpoints.Laptop, value: 0.5 },
                borderColor: {
                  minWidth: Breakpoints.Laptop,
                  value: theme.colors['Light'],
                },
                borderTopWidth: { minWidth: Breakpoints.Laptop, value: 0.5 },
                width: { minWidth: Breakpoints.Laptop, value: '100%' },
              }
            ),
            dimensions.width
          )}
        >
          <Pressable
            onPress={() => {
              try {
                navigation.navigate('MAInsights', {
                  screen: 'NewslewttersScreen',
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
                    padding: { minWidth: Breakpoints.Laptop, value: 10 },
                  }
                ),
                dimensions.width
              )}
            >
              <Icon size={24} name={'Ionicons/newspaper'} />
              <Text
                accessible={true}
                {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                style={StyleSheet.applyWidth(
                  GlobalStyles.TextStyles(theme)['screen_title'].style,
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
                borderBottomWidth: { minWidth: Breakpoints.Laptop, value: 0.5 },
                borderColor: {
                  minWidth: Breakpoints.Laptop,
                  value: theme.colors['Light'],
                },
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
                    padding: { minWidth: Breakpoints.Laptop, value: 10 },
                  }
                ),
                dimensions.width
              )}
            >
              <Icon size={24} name={'MaterialIcons/search'} />
              <Text
                accessible={true}
                {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                style={StyleSheet.applyWidth(
                  GlobalStyles.TextStyles(theme)['screen_title'].style,
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
                borderBottomWidth: { minWidth: Breakpoints.Laptop, value: 0.5 },
                borderColor: {
                  minWidth: Breakpoints.Laptop,
                  value: theme.colors['Light'],
                },
              }
            ),
            dimensions.width
          )}
        >
          <Pressable
            onPress={() => {
              try {
                navigation.navigate('MAInsights', { screen: 'CFSScreen' });
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
                    padding: { minWidth: Breakpoints.Laptop, value: 10 },
                  }
                ),
                dimensions.width
              )}
            >
              <Icon size={24} name={'MaterialIcons/business'} />
              <Text
                accessible={true}
                {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                style={StyleSheet.applyWidth(
                  GlobalStyles.TextStyles(theme)['screen_title'].style,
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
                borderBottomWidth: { minWidth: Breakpoints.Laptop, value: 0.5 },
                borderColor: {
                  minWidth: Breakpoints.Laptop,
                  value: theme.colors['Light'],
                },
              }
            ),
            dimensions.width
          )}
        >
          <Pressable
            onPress={() => {
              try {
                navigation.navigate('MAInsights', { screen: 'PEPFScreen' });
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
                    padding: { minWidth: Breakpoints.Laptop, value: 10 },
                  }
                ),
                dimensions.width
              )}
            >
              <Icon size={24} name={'MaterialIcons/waterfall-chart'} />
              <Text
                accessible={true}
                {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                style={StyleSheet.applyWidth(
                  GlobalStyles.TextStyles(theme)['screen_title'].style,
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
                borderBottomWidth: { minWidth: Breakpoints.Laptop, value: 0.5 },
                borderColor: {
                  minWidth: Breakpoints.Laptop,
                  value: theme.colors['Light'],
                },
              }
            ),
            dimensions.width
          )}
        >
          <Pressable
            onPress={() => {
              try {
                navigation.navigate('AdvisorsScreen');
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
                    padding: { minWidth: Breakpoints.Laptop, value: 10 },
                  }
                ),
                dimensions.width
              )}
            >
              <Icon size={24} name={'MaterialCommunityIcons/bank'} />
              <Text
                accessible={true}
                {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                style={StyleSheet.applyWidth(
                  GlobalStyles.TextStyles(theme)['screen_title'].style,
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
                borderBottomWidth: { minWidth: Breakpoints.Laptop, value: 0.5 },
                borderColor: {
                  minWidth: Breakpoints.Laptop,
                  value: theme.colors['Light'],
                },
              }
            ),
            dimensions.width
          )}
        >
          <Pressable
            onPress={() => {
              try {
                navigation.navigate('StockSearchScreen');
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
                    padding: { minWidth: Breakpoints.Laptop, value: 10 },
                  }
                ),
                dimensions.width
              )}
            >
              <Icon size={24} name={'Entypo/line-graph'} />
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
                borderBottomWidth: { minWidth: Breakpoints.Laptop, value: 0.5 },
                borderColor: {
                  minWidth: Breakpoints.Laptop,
                  value: theme.colors['Light'],
                },
              }
            ),
            dimensions.width
          )}
        >
          <Pressable
            onPress={() => {
              try {
                navigation.navigate('PeerGrroupsScreen');
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
                    padding: { minWidth: Breakpoints.Laptop, value: 10 },
                  }
                ),
                dimensions.width
              )}
            >
              <Icon size={24} name={'FontAwesome/bar-chart'} />
              <Text
                accessible={true}
                {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                style={StyleSheet.applyWidth(
                  GlobalStyles.TextStyles(theme)['screen_title'].style,
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
            borderColor: {
              minWidth: Breakpoints.Laptop,
              value: theme.colors['Light'],
            },
            borderTopWidth: { minWidth: Breakpoints.Laptop, value: 0.5 },
            justifyContent: { minWidth: Breakpoints.Laptop, value: 'flex-end' },
            top: { minWidth: Breakpoints.Laptop, value: '52%' },
            width: { minWidth: Breakpoints.Laptop, value: '100%' },
          },
          dimensions.width
        )}
      >
        {/* V Stack 8 */}
        <VStack
          {...GlobalStyles.VStackStyles(theme)['V Stack'].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.VStackStyles(theme)['V Stack'].style,
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
                    padding: { minWidth: Breakpoints.Laptop, value: 10 },
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
                  GlobalStyles.TextStyles(theme)['screen_title'].style,
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
  );
};

export default withTheme(TopNavBlock);
