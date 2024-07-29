import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import CustomHeaderBlock from '../components/CustomHeaderBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
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
  Spacer,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { H3, H5 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const TransactionsScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [RoW, setRoW] = React.useState(false);
  const [austria, setAustria] = React.useState(false);
  const [communication_services, setCommunication_services] =
    React.useState(false);
  const [consumer_discretionary, setConsumer_discretionary] =
    React.useState(false);
  const [consumer_staples, setConsumer_staples] = React.useState(false);
  const [dach, setDach] = React.useState(false);
  const [denmark, setDenmark] = React.useState(false);
  const [ebitda_giant, setEbitda_giant] = React.useState(false);
  const [ebitda_large, setEbitda_large] = React.useState(false);
  const [ebitda_medium, setEbitda_medium] = React.useState(false);
  const [ebitda_small, setEbitda_small] = React.useState(false);
  const [energy, setEnergy] = React.useState(false);
  const [ev_100_to_500, setEv_100_to_500] = React.useState(false);
  const [ev_500_to_1000, setEv_500_to_1000] = React.useState(false);
  const [ev_lase_100, setEv_lase_100] = React.useState(false);
  const [ev_less_100, setEv_less_100] = React.useState(false);
  const [ev_more_1000, setEv_more_1000] = React.useState(false);
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
  const [nordic, setNordic] = React.useState(false);
  const [norway, setNorway] = React.useState(false);
  const [real_estate, setReal_estate] = React.useState(false);
  const [sweden, setSweden] = React.useState(false);
  const [switzerland, setSwitzerland] = React.useState(false);
  const [utilities, setUtilities] = React.useState(false);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      setGlobalVariableValue({
        key: 'pageName',
        value: 'Transactions',
      });
      setGlobalVariableValue({
        key: 'subPage',
        value: false,
      });
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <CustomHeaderBlock />
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
                    {'Filtering stock search'}
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
                    {'GICS sector'}
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
                {/* Target region */}
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
                    {'Target region'}
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
                    {/* Nordic */}
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
                            setNordic(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={nordic}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setNordic(nordic ? false : true);
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
                    {/* Rest of World (RoW) */}
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
                            setRoW(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={RoW}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setRoW(RoW ? false : true);
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
                          {'Rest of World (RoW)'}
                        </Text>
                      </Pressable>
                    </View>
                    {/* DACH */}
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
                            setDach(newCheckboxValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.Brand['Strong Inverse']}
                        size={24}
                        status={dach}
                        uncheckedColor={palettes.Brand['Strong Inverse']}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            setDach(dach ? false : true);
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
                          {'DACH'}
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
                        setNordic(true);
                        setRoW(true);
                        setDach(true);
                        setUtilities(true);
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
                              cfs_id: 1094,
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
              flexDirection: 'row',
              gap: 8,
              justifyContent: 'space-between',
              marginBottom: 10,
            },
            dimensions.width
          )}
        >
          <H3
            selectable={false}
            {...GlobalStyles.H3Styles(theme)['H3'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.H3Styles(theme)['H3'].style, {
                fontFamily: 'Quicksand_500Medium',
                fontSize: 16,
                marginLeft: 8,
              }),
              dimensions.width
            )}
          >
            {'Multiples database'}
          </H3>
          <Button
            iconPosition={'left'}
            onPress={() => {
              try {
                navigation.push('MAInsights', { screen: 'AllEventsScreen' });
              } catch (err) {
                console.error(err);
              }
            }}
            {...GlobalStyles.ButtonStyles(theme)['Button'].props}
            icon={'AntDesign/left'}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ButtonStyles(theme)['Button'].style,
                {
                  backgroundColor: theme.colors.text.strong,
                  fontFamily: 'Quicksand_500Medium',
                  height: 30,
                  paddingBottom: 4,
                  paddingTop: 4,
                  textTransform: 'uppercase',
                  width: 150,
                }
              ),
              dimensions.width
            )}
            title={'All events'}
          />
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

      <XanoCollectionApi.FetchGetAllEventsGET keyword={'Update'} page={1}>
        {({ loading, error, data, refetchGetAllEvents }) => {
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
                      fontFamily: 'Quicksand_700Bold',
                      paddingBottom: 0,
                      paddingLeft: 10,
                      paddingRight: 10,
                      textAlign: 'right',
                    }
                  ),
                  dimensions.width
                )}
              >
                {fetchData?.length}
              </Text>
              <SimpleStyleFlatList
                data={fetchData}
                horizontal={false}
                inverted={false}
                keyExtractor={(listData, index) =>
                  listData?.id ?? listData?.uuid ?? index.toString()
                }
                keyboardShouldPersistTaps={'never'}
                listKey={'SfOccPiT'}
                nestedScrollEnabled={false}
                numColumns={1}
                onEndReachedThreshold={0.5}
                renderItem={({ item, index }) => {
                  const listData = item;
                  return (
                    <Pressable
                      onPress={() => {
                        try {
                          navigation.push('EventDetailsScreen', {
                            event_id: listData?.id,
                          });
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
                              alignContent: 'stretch',
                              backgroundColor: palettes.Brand['Strong Inverse'],
                              borderColor: palettes.Brand['Light Inverse'],
                              borderRadius: 8,
                              borderWidth: 0,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              padding: 0,
                            },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                gap: 4,
                                justifyContent: 'space-between',
                                padding: 10,
                                width: '50%',
                              },
                              dimensions.width
                            )}
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
                                    fontFamily: 'Quicksand_700Bold',
                                    fontSize: 12,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {listData?.target}
                            </Text>
                            {/* Text 2 */}
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)['screen_title']
                                .props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)['screen_title']
                                    .style,
                                  {
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {listData?.published}
                            </Text>
                            {/* Text 2 2 */}
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)['screen_title']
                                .props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)['screen_title']
                                    .style,
                                  {
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {'Acquiror: '}
                              {listData?.buyer}
                            </Text>
                            {/* Text 2 3 */}
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)['screen_title']
                                .props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)['screen_title']
                                    .style,
                                  {
                                    fontFamily: 'Quicksand_400Regular',
                                    fontSize: 12,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {listData?.gics}
                            </Text>
                          </View>
                          {/* View 2 */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                backgroundColor: theme.colors.foreground.brand,
                                borderBottomRightRadius: 8,
                                borderRadius: 0,
                                borderTopRightRadius: 8,
                                gap: 4,
                                justifyContent: 'space-between',
                                padding: 10,
                                width: '50%',
                              },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                { flexDirection: 'row', gap: 4 },
                                dimensions.width
                              )}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  { width: 70 },
                                  dimensions.width
                                )}
                              >
                                <Text
                                  accessible={true}
                                  {...GlobalStyles.TextStyles(theme)[
                                    'screen_title'
                                  ].props}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.TextStyles(theme)[
                                        'screen_title'
                                      ].style,
                                      {
                                        fontFamily: 'Quicksand_400Regular',
                                        fontSize: 12,
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {'EV/Sales:'}
                                </Text>
                              </View>

                              <Text
                                accessible={true}
                                {...GlobalStyles.TextStyles(theme)[
                                  'screen_title'
                                ].props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)[
                                      'screen_title'
                                    ].style,
                                    {
                                      fontFamily: 'Quicksand_400Regular',
                                      fontSize: 12,
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {listData?.ev_sales}
                                {' ('}
                                {listData?.fy_end}
                                {')'}
                              </Text>
                            </View>
                            {/* View 2 */}
                            <View
                              style={StyleSheet.applyWidth(
                                { flexDirection: 'row', gap: 4 },
                                dimensions.width
                              )}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  { width: 70 },
                                  dimensions.width
                                )}
                              >
                                <Text
                                  accessible={true}
                                  {...GlobalStyles.TextStyles(theme)[
                                    'screen_title'
                                  ].props}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.TextStyles(theme)[
                                        'screen_title'
                                      ].style,
                                      {
                                        fontFamily: 'Quicksand_400Regular',
                                        fontSize: 12,
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {'EV/EBITDA:'}
                                </Text>
                              </View>

                              <Text
                                accessible={true}
                                {...GlobalStyles.TextStyles(theme)[
                                  'screen_title'
                                ].props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)[
                                      'screen_title'
                                    ].style,
                                    {
                                      fontFamily: 'Quicksand_400Regular',
                                      fontSize: 12,
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {listData?.ebitda_local}
                                {' ('}
                                {listData?.fy_end}
                                {')'}
                              </Text>
                            </View>
                            {/* View 3 */}
                            <View
                              style={StyleSheet.applyWidth(
                                { flexDirection: 'row', gap: 4 },
                                dimensions.width
                              )}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  { width: 70 },
                                  dimensions.width
                                )}
                              >
                                <Text
                                  accessible={true}
                                  {...GlobalStyles.TextStyles(theme)[
                                    'screen_title'
                                  ].props}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.TextStyles(theme)[
                                        'screen_title'
                                      ].style,
                                      {
                                        fontFamily: 'Quicksand_400Regular',
                                        fontSize: 12,
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {'EV/EBIT:'}
                                </Text>
                              </View>

                              <Text
                                accessible={true}
                                {...GlobalStyles.TextStyles(theme)[
                                  'screen_title'
                                ].props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)[
                                      'screen_title'
                                    ].style,
                                    {
                                      fontFamily: 'Quicksand_400Regular',
                                      fontSize: 12,
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {listData?.ev_ebit}
                                {' ('}
                                {listData?.fy_end}
                                {')'}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </Shadow>
                    </Pressable>
                  );
                }}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
                style={StyleSheet.applyWidth(
                  { gap: 8, padding: 10 },
                  dimensions.width
                )}
              />
            </>
          );
        }}
      </XanoCollectionApi.FetchGetAllEventsGET>
    </ScreenContainer>
  );
};

export default withTheme(TransactionsScreen);
