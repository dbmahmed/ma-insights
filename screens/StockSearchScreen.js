import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import modifyArrays from '../global-functions/modifyArrays';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  Checkbox,
  HStack,
  IconButton,
  LinearGradient,
  Pressable,
  ScreenContainer,
  Shadow,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  Spacer,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { H5 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const StockSearchScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [austria, setAustria] = React.useState(false);
  const [communication_services, setCommunication_services] =
    React.useState(false);
  const [consumer_discretionary, setConsumer_discretionary] =
    React.useState(false);
  const [consumer_staples, setConsumer_staples] = React.useState(false);
  const [denmark, setDenmark] = React.useState(false);
  const [ebitda_giant, setEbitda_giant] = React.useState(false);
  const [ebitda_large, setEbitda_large] = React.useState(false);
  const [ebitda_medium, setEbitda_medium] = React.useState(false);
  const [ebitda_small, setEbitda_small] = React.useState(false);
  const [energy, setEnergy] = React.useState(false);
  const [eventType, setEventType] = React.useState([]);
  const [filterPressed, setFilterPressed] = React.useState(false);
  const [financials, setFinancials] = React.useState(false);
  const [finland, setFinland] = React.useState(false);
  const [from_3_to_5, setFrom_3_to_5] = React.useState(false);
  const [from_5_to_7, setFrom_5_to_7] = React.useState(false);
  const [future_opportunity, setFuture_opportunity] = React.useState(false);
  const [germany, setGermany] = React.useState(false);
  const [h_3_to_5, setH_3_to_5] = React.useState(false);
  const [h_5_to_7, setH_5_to_7] = React.useState(false);
  const [h_less_3, setH_less_3] = React.useState(false);
  const [h_more_7, setH_more_7] = React.useState(false);
  const [health_care, setHealth_care] = React.useState(false);
  const [industrials, setIndustrials] = React.useState(false);
  const [it_and_software, setIt_and_software] = React.useState(false);
  const [keywordSearch, setKeywordSearch] = React.useState('');
  const [last_3, setLast_3] = React.useState(false);
  const [materials, setMaterials] = React.useState(false);
  const [more_7, setMore_7] = React.useState(false);
  const [norway, setNorway] = React.useState(false);
  const [real_estate, setReal_estate] = React.useState(false);
  const [sweden, setSweden] = React.useState(false);
  const [switzerland, setSwitzerland] = React.useState(false);
  const [utilities, setUtilities] = React.useState(false);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <View style={StyleSheet.applyWidth({ padding: 10 }, dimensions.width)}>
        <Modal
          supportedOrientations={['portrait', 'landscape']}
          animationType={'fade'}
          presentationStyle={'pageSheet'}
          transparent={true}
          visible={filterPressed}
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
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'stretch',
                  justifyContent: 'flex-start',
                  width: 380,
                },
                dimensions.width
              )}
            >
              <LinearGradient
                endX={100}
                endY={100}
                startX={0}
                startY={0}
                {...GlobalStyles.LinearGradientStyles(theme)['Linear Gradient']
                  .props}
                color1={theme.colors.text.strong}
                color2={theme.colors.branding.primary}
                color3={null}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.LinearGradientStyles(theme)['Linear Gradient']
                      .style,
                    {
                      borderColor: null,
                      borderWidth: null,
                      margin: null,
                      padding: 10,
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
                        alignItems: 'flex-start',
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        justifyContent: 'space-between',
                        padding: 10,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  <H5
                    selectable={false}
                    {...GlobalStyles.H5Styles(theme)['H5'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.H5Styles(theme)['H5'].style,
                        {
                          color: palettes.Brand['Strong Inverse'],
                          fontSize: 16,
                          marginTop: 0,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Filtering CFS records'}
                  </H5>

                  <Shadow
                    offsetX={0}
                    paintInside={true}
                    showShadowCornerBottomEnd={true}
                    showShadowCornerBottomStart={true}
                    showShadowCornerTopEnd={true}
                    showShadowCornerTopStart={true}
                    showShadowSideBottom={true}
                    showShadowSideEnd={true}
                    showShadowSideStart={true}
                    showShadowSideTop={true}
                    distance={3}
                    offsetY={2}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          backgroundColor: theme.colors.background.brand,
                          borderRadius: 50,
                          height: 36,
                          justifyContent: 'center',
                          width: 36,
                        },
                        dimensions.width
                      )}
                    >
                      <IconButton
                        onPress={() => {
                          try {
                            setFilterPressed(false);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.App.Strong2}
                        icon={'AntDesign/close'}
                        size={24}
                      />
                    </View>
                  </Shadow>
                </HStack>
                {/* EBITDA */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'stretch',
                      flexDirection: 'column',
                      flexWrap: 'nowrap',
                      gap: 8,
                      padding: 10,
                    },
                    dimensions.width
                  )}
                >
                  <H5
                    selectable={false}
                    {...GlobalStyles.H5Styles(theme)['H5'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.H5Styles(theme)['H5'].style,
                        {
                          color: palettes.Brand['Strong Inverse'],
                          fontSize: 16,
                          marginBottom: 0,
                          marginTop: 0,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Portfolio firm EBITDA'}
                  </H5>

                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'stretch',
                        flex: 0,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: 8,
                        justifyContent: 'flex-start',
                      },
                      dimensions.width
                    )}
                  >
                    {/* EBTDA ≤ €5m */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 4,
                          width: '47%',
                        },
                        dimensions.width
                      )}
                    >
                      <Checkbox
                        onPress={newCheckboxValue => {
                          try {
                            setEbitda_small(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={ebitda_small}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setEbitda_small(ebitda_small ? false : true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'EBTDA ≤ €5m'}
                        </Text>
                      </Pressable>
                    </View>
                    {/* €5m < EBITDA ≤ €20m */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 4,
                          width: '47%',
                        },
                        dimensions.width
                      )}
                    >
                      <Checkbox
                        onPress={newCheckboxValue => {
                          try {
                            setEbitda_medium(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={ebitda_medium}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setEbitda_medium(ebitda_medium ? false : true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'€5m < EBITDA ≤ €20m'}
                        </Text>
                      </Pressable>
                    </View>
                    {/* €20m < EBITDA ≤ €50m */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 4,
                          width: '47%',
                        },
                        dimensions.width
                      )}
                    >
                      <Checkbox
                        onPress={newCheckboxValue => {
                          try {
                            setEbitda_large(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={ebitda_large}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setEbitda_large(ebitda_large ? false : true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'€20m < EBITDA ≤ €50m'}
                        </Text>
                      </Pressable>
                    </View>
                    {/* EBITDA >  €50m */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 4,
                          width: '47%',
                        },
                        dimensions.width
                      )}
                    >
                      <Checkbox
                        onPress={newCheckboxValue => {
                          try {
                            setEbitda_giant(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={ebitda_giant}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setEbitda_giant(ebitda_giant ? false : true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'EBITDA >  €50m'}
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
                {/* Current holding period */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'stretch',
                      flexDirection: 'column',
                      flexWrap: 'nowrap',
                      gap: 8,
                      padding: 10,
                    },
                    dimensions.width
                  )}
                >
                  <H5
                    selectable={false}
                    {...GlobalStyles.H5Styles(theme)['H5'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.H5Styles(theme)['H5'].style,
                        {
                          color: palettes.Brand['Strong Inverse'],
                          fontSize: 16,
                          marginBottom: 0,
                          marginTop: 0,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Current holding period'}
                  </H5>

                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'stretch',
                        flex: 0,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: 8,
                        justifyContent: 'flex-start',
                      },
                      dimensions.width
                    )}
                  >
                    {/* Holding ≤ 3 years */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 4,
                          width: '47%',
                        },
                        dimensions.width
                      )}
                    >
                      <Checkbox
                        onPress={newCheckboxValue => {
                          try {
                            setH_less_3(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={h_less_3}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setH_less_3(h_less_3 ? false : true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Holding ≤ 3 years'}
                        </Text>
                      </Pressable>
                    </View>
                    {/* 3 ys < holding ≤ 5 ys */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 4,
                          width: '47%',
                        },
                        dimensions.width
                      )}
                    >
                      <Checkbox
                        onPress={newCheckboxValue => {
                          try {
                            setH_3_to_5(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={h_3_to_5}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setH_3_to_5(h_3_to_5 ? false : true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'3 ys < holding ≤ 5 ys'}
                        </Text>
                      </Pressable>
                    </View>
                    {/* 5 ys < holding ≤ 7 ys */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 4,
                          width: '47%',
                        },
                        dimensions.width
                      )}
                    >
                      <Checkbox
                        onPress={newCheckboxValue => {
                          try {
                            setH_5_to_7(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={h_5_to_7}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setH_5_to_7(h_5_to_7 ? false : true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'5 ys < holding ≤ 7 ys'}
                        </Text>
                      </Pressable>
                    </View>
                    {/* Holding > 7 years */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 4,
                          width: '47%',
                        },
                        dimensions.width
                      )}
                    >
                      <Checkbox
                        onPress={newCheckboxValue => {
                          try {
                            setH_more_7(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={h_more_7}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setH_more_7(h_more_7 ? false : true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Holding > 7 years'}
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
                {/* vintage */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'stretch',
                      flexDirection: 'column',
                      flexWrap: 'nowrap',
                      gap: 8,
                      padding: 10,
                    },
                    dimensions.width
                  )}
                >
                  <H5
                    selectable={false}
                    {...GlobalStyles.H5Styles(theme)['H5'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.H5Styles(theme)['H5'].style,
                        {
                          color: palettes.Brand['Strong Inverse'],
                          fontSize: 16,
                          marginBottom: 0,
                          marginTop: 0,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Fund vintage'}
                  </H5>

                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'stretch',
                        flex: 0,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: 8,
                        justifyContent: 'flex-start',
                      },
                      dimensions.width
                    )}
                  >
                    {/* Within the last 3 years */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 4,
                          width: '47%',
                        },
                        dimensions.width
                      )}
                    >
                      <Checkbox
                        onPress={newCheckboxValue => {
                          try {
                            setLast_3(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={last_3}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setLast_3(last_3 ? false : true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Within the last 3 years'}
                        </Text>
                      </Pressable>
                    </View>
                    {/* 3 to 5 years ago */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 4,
                          width: '47%',
                        },
                        dimensions.width
                      )}
                    >
                      <Checkbox
                        onPress={newCheckboxValue => {
                          try {
                            setFrom_3_to_5(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={from_3_to_5}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setFrom_3_to_5(from_3_to_5 ? false : true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'3 to 5 years ago'}
                        </Text>
                      </Pressable>
                    </View>
                    {/* 5 to 7 years ago */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 4,
                          width: '47%',
                        },
                        dimensions.width
                      )}
                    >
                      <Checkbox
                        onPress={newCheckboxValue => {
                          try {
                            setFrom_5_to_7(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={from_5_to_7}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setFrom_5_to_7(from_5_to_7 ? false : true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'5 to 7 years ago'}
                        </Text>
                      </Pressable>
                    </View>
                    {/* More than 7 years ago */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 4,
                          width: '47%',
                        },
                        dimensions.width
                      )}
                    >
                      <Checkbox
                        onPress={newCheckboxValue => {
                          try {
                            setMore_7(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={more_7}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setMore_7(more_7 ? false : true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'More than 7 years ago'}
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
                {/* Country */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'stretch',
                      flexDirection: 'column',
                      gap: 8,
                      padding: 10,
                    },
                    dimensions.width
                  )}
                >
                  <H5
                    selectable={false}
                    {...GlobalStyles.H5Styles(theme)['H5'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.H5Styles(theme)['H5'].style,
                        {
                          color: palettes.Brand['Strong Inverse'],
                          fontSize: 16,
                          marginBottom: 0,
                          marginTop: 0,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Portfolio firm HQ'}
                  </H5>

                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'flex-start',
                        flex: 0,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: 8,
                        justifyContent: 'flex-start',
                      },
                      dimensions.width
                    )}
                  >
                    {/* Sweden */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 4,
                          width: '47%',
                        },
                        dimensions.width
                      )}
                    >
                      <Checkbox
                        onPress={newCheckboxValue => {
                          try {
                            setSweden(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={sweden}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setSweden(sweden ? false : true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Sweden'}
                        </Text>
                      </Pressable>
                    </View>
                    {/* Germany */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 4,
                          width: '47%',
                        },
                        dimensions.width
                      )}
                    >
                      <Checkbox
                        onPress={newCheckboxValue => {
                          try {
                            setGermany(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={germany}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setGermany(germany ? false : true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Germany'}
                        </Text>
                      </Pressable>
                    </View>
                    {/* Denmark */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 4,
                          width: '47%',
                        },
                        dimensions.width
                      )}
                    >
                      <Checkbox
                        onPress={newCheckboxValue => {
                          try {
                            setDenmark(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={denmark}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setDenmark(denmark ? false : true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Denmark'}
                        </Text>
                      </Pressable>
                    </View>
                    {/* Switzerland */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 4,
                          width: '47%',
                        },
                        dimensions.width
                      )}
                    >
                      <Checkbox
                        onPress={newCheckboxValue => {
                          try {
                            setSwitzerland(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={switzerland}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setSwitzerland(switzerland ? false : true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Switzerland'}
                        </Text>
                      </Pressable>
                    </View>
                    {/* Norway */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 4,
                          width: '47%',
                        },
                        dimensions.width
                      )}
                    >
                      <Checkbox
                        onPress={newCheckboxValue => {
                          try {
                            setNorway(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={norway}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setNorway(norway ? false : true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Norway'}
                        </Text>
                      </Pressable>
                    </View>
                    {/* Austria */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 4,
                          width: '47%',
                        },
                        dimensions.width
                      )}
                    >
                      <Checkbox
                        onPress={newCheckboxValue => {
                          try {
                            setAustria(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={austria}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setAustria(austria ? false : true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Austria'}
                        </Text>
                      </Pressable>
                    </View>
                    {/* Finland */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 4,
                          width: '47%',
                        },
                        dimensions.width
                      )}
                    >
                      <Checkbox
                        onPress={newCheckboxValue => {
                          try {
                            setFinland(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={finland}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setFinland(finland ? false : true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Finland'}
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
                {/* Sector */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'stretch',
                      flexDirection: 'column',
                      gap: 8,
                      padding: 10,
                    },
                    dimensions.width
                  )}
                >
                  <H5
                    selectable={false}
                    {...GlobalStyles.H5Styles(theme)['H5'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.H5Styles(theme)['H5'].style,
                        {
                          color: palettes.Brand['Strong Inverse'],
                          fontSize: 16,
                          marginBottom: 0,
                          marginTop: 0,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Sector (GICS)'}
                  </H5>

                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'flex-start',
                        flex: 0,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: 8,
                        justifyContent: 'flex-start',
                      },
                      dimensions.width
                    )}
                  >
                    {/* Communication Services */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 4,
                          width: '47%',
                        },
                        dimensions.width
                      )}
                    >
                      <Checkbox
                        onPress={newCheckboxValue => {
                          try {
                            setCommunication_services(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={communication_services}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setCommunication_services(
                              communication_services ? false : true
                            );
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Communication Services'}
                        </Text>
                      </Pressable>
                    </View>
                    {/* Industrials */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 4,
                          width: '47%',
                        },
                        dimensions.width
                      )}
                    >
                      <Checkbox
                        onPress={newCheckboxValue => {
                          try {
                            setIndustrials(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={industrials}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setIndustrials(industrials ? false : true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Industrials'}
                        </Text>
                      </Pressable>
                    </View>
                    {/* Consumer Discretionary */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 4,
                          width: '47%',
                        },
                        dimensions.width
                      )}
                    >
                      <Checkbox
                        onPress={newCheckboxValue => {
                          try {
                            setConsumer_discretionary(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={consumer_discretionary}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setConsumer_discretionary(
                              consumer_discretionary ? false : true
                            );
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Consumer Discretionary'}
                        </Text>
                      </Pressable>
                    </View>
                    {/* IT and Software */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 4,
                          width: '47%',
                        },
                        dimensions.width
                      )}
                    >
                      <Checkbox
                        onPress={newCheckboxValue => {
                          try {
                            setIt_and_software(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={it_and_software}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setIt_and_software(it_and_software ? false : true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'IT & Software'}
                        </Text>
                      </Pressable>
                    </View>
                    {/* Consumer Staples */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 4,
                          width: '47%',
                        },
                        dimensions.width
                      )}
                    >
                      <Checkbox
                        onPress={newCheckboxValue => {
                          try {
                            setConsumer_staples(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={consumer_staples}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setConsumer_staples(
                              consumer_staples ? false : true
                            );
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Consumer Staples'}
                        </Text>
                      </Pressable>
                    </View>
                    {/* Materials */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 4,
                          width: '47%',
                        },
                        dimensions.width
                      )}
                    >
                      <Checkbox
                        onPress={newCheckboxValue => {
                          try {
                            setMaterials(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={materials}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setMaterials(materials ? false : true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Materials'}
                        </Text>
                      </Pressable>
                    </View>
                    {/* Energy */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 4,
                          width: '47%',
                        },
                        dimensions.width
                      )}
                    >
                      <Checkbox
                        onPress={newCheckboxValue => {
                          try {
                            setEnergy(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={energy}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setEnergy(energy ? false : true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Energy'}
                        </Text>
                      </Pressable>
                    </View>
                    {/* Real Estate */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 4,
                          width: '47%',
                        },
                        dimensions.width
                      )}
                    >
                      <Checkbox
                        onPress={newCheckboxValue => {
                          try {
                            setReal_estate(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={real_estate}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setReal_estate(real_estate ? false : true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Real Estate'}
                        </Text>
                      </Pressable>
                    </View>
                    {/* Financials */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 4,
                          width: '47%',
                        },
                        dimensions.width
                      )}
                    >
                      <Checkbox
                        onPress={newCheckboxValue => {
                          try {
                            setFinancials(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={financials}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setFinancials(financials ? false : true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Financials'}
                        </Text>
                      </Pressable>
                    </View>
                    {/* Utilities */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 4,
                          width: '47%',
                        },
                        dimensions.width
                      )}
                    >
                      <Checkbox
                        onPress={newCheckboxValue => {
                          try {
                            setUtilities(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={utilities}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setUtilities(utilities ? false : true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Utilities'}
                        </Text>
                      </Pressable>
                    </View>
                    {/* Health Care */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 4,
                          width: '47%',
                        },
                        dimensions.width
                      )}
                    >
                      <Checkbox
                        onPress={newCheckboxValue => {
                          try {
                            setHealth_care(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={health_care}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setHealth_care(health_care ? false : true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['screen_title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['screen_title']
                                .style,
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'Quicksand_400Regular',
                                fontSize: 12,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Health Care'}
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
                <Spacer bottom={10} left={0} right={0} top={10} />
                {/* Buttons */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignContent: 'flex-start',
                      flexDirection: 'row',
                      flexGrow: 1,
                      gap: 8,
                      justifyContent: 'space-between',
                      marginBottom: 10,
                      padding: 10,
                    },
                    dimensions.width
                  )}
                >
                  {/* Select All */}
                  <Button
                    iconPosition={'left'}
                    onPress={() => {
                      try {
                        setEbitda_small(true);
                        setEbitda_medium(true);
                        setEbitda_large(true);
                        setEbitda_giant(true);
                        setSweden(true);
                        setGermany(true);
                        setDenmark(true);
                        setSwitzerland(true);
                        setNorway(true);
                        setAustria(true);
                        setFinland(true);
                        setCommunication_services(true);
                        setIndustrials(true);
                        setConsumer_discretionary(true);
                        setIt_and_software(true);
                        setConsumer_staples(true);
                        setMaterials(true);
                        setEnergy(true);
                        setReal_estate(true);
                        setFinancials(true);
                        setHealth_care(true);
                        setUtilities(true);
                        setLast_3(true);
                        setFrom_3_to_5(true);
                        setFrom_5_to_7(true);
                        setMore_7(true);
                        setH_less_3(true);
                        setH_3_to_5(true);
                        setH_5_to_7(true);
                        setH_more_7(true);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ButtonStyles(theme)['Button'].style,
                        {
                          backgroundColor: 'rgba(0, 0, 0, 0)',
                          borderColor: palettes.Brand['Strong Inverse'],
                          borderWidth: 1,
                          fontFamily: 'Quicksand_600SemiBold',
                          textTransform: 'uppercase',
                          width: '47%',
                        }
                      ),
                      dimensions.width
                    )}
                    title={'Select all'}
                  />
                  {/* Results */}
                  <Button
                    iconPosition={'left'}
                    onPress={() => {
                      const handler = async () => {
                        try {
                          (
                            await XanoCollectionApi.getOneCFSGET(Constants, {
                              cfs_id: 1,
                            })
                          )?.json;
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
                    }}
                    {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ButtonStyles(theme)['Button'].style,
                        {
                          backgroundColor: palettes.App.green,
                          fontFamily: 'Quicksand_600SemiBold',
                          textTransform: 'uppercase',
                          width: '47%',
                        }
                      ),
                      dimensions.width
                    )}
                    title={'Results\n'}
                  />
                </View>
              </LinearGradient>
            </View>
          </View>
        </Modal>
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              gap: 8,
              justifyContent: 'space-between',
              marginBottom: 20,
              padding: 10,
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
                { fontFamily: 'Quicksand_400Regular', fontSize: 16 }
              ),
              dimensions.width
            )}
          >
            {'Stock search'}
          </Text>
        </View>

        <HStack
          {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.HStackStyles(theme)['H Stack'].style,
              { gap: 10, justifyContent: 'space-between', marginLeft: 8 }
            ),
            dimensions.width
          )}
        >
          <TextInput
            autoCorrect={true}
            changeTextDelay={500}
            onChangeText={newTextInputValue => {
              try {
                setKeywordSearch(newTextInputValue);
              } catch (err) {
                console.error(err);
              }
            }}
            onSubmitEditing={() => {
              try {
                /* 'API Request' action requires configuration: choose an API endpoint */
              } catch (err) {
                console.error(err);
              }
            }}
            webShowOutline={true}
            {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
            autoCapitalize={'sentences'}
            clearButtonMode={'while-editing'}
            placeholder={'Search...'}
            returnKeyType={'search'}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextInputStyles(theme)['Text Input'].style,
                { width: '90%' }
              ),
              dimensions.width
            )}
            value={keywordSearch}
          />
          <Shadow
            offsetX={0}
            paintInside={true}
            showShadowCornerBottomEnd={true}
            showShadowCornerBottomStart={true}
            showShadowCornerTopEnd={true}
            showShadowCornerTopStart={true}
            showShadowSideBottom={true}
            showShadowSideEnd={true}
            showShadowSideStart={true}
            showShadowSideTop={true}
            distance={3}
            offsetY={2}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  backgroundColor: palettes.App.green,
                  borderRadius: 50,
                  height: 36,
                  justifyContent: 'center',
                  width: 36,
                },
                dimensions.width
              )}
            >
              <IconButton
                onPress={() => {
                  try {
                    setFilterPressed(true);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                color={palettes.App.Strong2}
                icon={'MaterialIcons/filter-alt'}
                size={24}
              />
            </View>
          </Shadow>
        </HStack>

        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'stretch',
              alignSelf: 'auto',
              flexDirection: 'column',
              paddingLeft: 8,
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
                {
                  color: palettes.App.green,
                  fontFamily: 'Quicksand_400Regular',
                  fontSize: 12,
                }
              ),
              dimensions.width
            )}
          >
            {'OBS: filters are applied'}
          </Text>
        </View>
      </View>
      {/* View 3 */}
      <View style={StyleSheet.applyWidth({ padding: 10 }, dimensions.width)}>
        <XanoCollectionApi.FetchGetAllStocksGET>
          {({ loading, error, data, refetchGetAllStocks }) => {
            const fetchData = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <>
                <Text
                  accessible={true}
                  {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['screen_title'].style,
                      {
                        alignSelf: 'flex-end',
                        fontFamily: 'Quicksand_600SemiBold',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {fetchData?.length}
                </Text>

                <SimpleStyleScrollView
                  bounces={true}
                  horizontal={false}
                  keyboardShouldPersistTaps={'never'}
                  nestedScrollEnabled={false}
                  showsHorizontalScrollIndicator={true}
                  showsVerticalScrollIndicator={true}
                >
                  <SimpleStyleFlatList
                    data={fetchData}
                    horizontal={false}
                    inverted={false}
                    keyExtractor={(listData, index) =>
                      listData?.id ?? listData?.uuid ?? index.toString()
                    }
                    keyboardShouldPersistTaps={'never'}
                    listKey={'7abPxawY'}
                    nestedScrollEnabled={false}
                    numColumns={1}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item, index }) => {
                      const listData = item;
                      return (
                        <Pressable
                          onPress={() => {
                            try {
                              /* 'Navigate' action requires configuration: choose a navigation destination */
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                        >
                          <Shadow
                            showShadowCornerBottomEnd={true}
                            showShadowCornerBottomStart={true}
                            showShadowCornerTopEnd={true}
                            showShadowCornerTopStart={true}
                            showShadowSideBottom={true}
                            showShadowSideEnd={true}
                            showShadowSideStart={true}
                            showShadowSideTop={true}
                            distance={4}
                            offsetX={0}
                            offsetY={0}
                            paintInside={true}
                            stretch={true}
                            style={StyleSheet.applyWidth(
                              {
                                borderRadius: 12,
                                width: {
                                  minWidth: Breakpoints.Laptop,
                                  value: '100%',
                                },
                              },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor:
                                    palettes.Brand['Strong Inverse'],
                                  borderColor: palettes.Brand['Light Inverse'],
                                  borderRadius: 8,
                                  borderWidth: 1,
                                  padding: 10,
                                },
                                dimensions.width
                              )}
                            >
                              <View>
                                <Text
                                  accessible={true}
                                  style={StyleSheet.applyWidth(
                                    {
                                      fontFamily: 'Quicksand_600SemiBold',
                                      fontSize: 16,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {null}
                                  {' ('}
                                  {null}
                                  {')'}
                                </Text>
                              </View>
                              {/* View 2 */}
                              <View>
                                <Text
                                  accessible={true}
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: palettes.App.green,
                                      fontFamily: 'Quicksand_400Regular',
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {null}
                                  {' - '}
                                  {null}
                                </Text>
                              </View>
                            </View>
                          </Shadow>
                        </Pressable>
                      );
                    }}
                    showsHorizontalScrollIndicator={true}
                    showsVerticalScrollIndicator={true}
                    style={StyleSheet.applyWidth({ gap: 8 }, dimensions.width)}
                  />
                </SimpleStyleScrollView>
              </>
            );
          }}
        </XanoCollectionApi.FetchGetAllStocksGET>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(StockSearchScreen);
