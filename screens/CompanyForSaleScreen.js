import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import modifyArrays from '../global-functions/modifyArrays';
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
  SimpleStyleFlashList,
  SimpleStyleScrollView,
  Spacer,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { H3, H4, H5 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const CompanyForSaleScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [acq_agenda, setAcq_agenda] = React.useState(false);
  const [austria, setAustria] = React.useState(false);
  const [communication_services, setCommunication_services] =
    React.useState(false);
  const [consumer_discretionary, setConsumer_discretionary] =
    React.useState(false);
  const [consumer_staples, setConsumer_staples] = React.useState(false);
  const [denmark, setDenmark] = React.useState(false);
  const [energy, setEnergy] = React.useState(false);
  const [eventType, setEventType] = React.useState([]);
  const [filterPressed, setFilterPressed] = React.useState(false);
  const [financials, setFinancials] = React.useState(false);
  const [finland, setFinland] = React.useState(false);
  const [future_opportunity, setFuture_opportunity] = React.useState(false);
  const [germany, setGermany] = React.useState(false);
  const [health_care, setHealth_care] = React.useState(false);
  const [industrials, setIndustrials] = React.useState(false);
  const [it_and_software, setIt_and_software] = React.useState(false);
  const [keywordSearch, setKeywordSearch] = React.useState('');
  const [materials, setMaterials] = React.useState(false);
  const [norway, setNorway] = React.useState(false);
  const [real_estate, setReal_estate] = React.useState(false);
  const [sweden, setSweden] = React.useState(false);
  const [switzerland, setSwitzerland] = React.useState(false);
  const [transaction, setTransaction] = React.useState(false);
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
                  backgroundColor: theme.colors['Primary'],
                  borderRadius: 8,
                  justifyContent: 'flex-start',
                  width: 380,
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
                        color: theme.colors['Strong Inverse'],
                        fontSize: 16,
                        marginTop: 0,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'Filtering events list'}
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
                        backgroundColor: theme.colors['Background'],
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
                      color={theme.colors['Strong2']}
                      icon={'AntDesign/close'}
                      size={24}
                    />
                  </View>
                </Shadow>
              </HStack>
              {/* Event type */}
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
                        color: theme.colors['Strong Inverse'],
                        fontSize: 16,
                        marginBottom: 0,
                        marginTop: 0,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'Event type'}
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
                  {/* Future opportunity */}
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
                      onCheck={() => {
                        try {
                          const valueMjYyQyei = modifyArrays(
                            eventType,
                            'Future Opportunity',
                            'push'
                          );
                          setEventType(valueMjYyQyei);
                          const event = valueMjYyQyei;
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      onPress={newCheckboxValue => {
                        try {
                          setFuture_opportunity(newCheckboxValue);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      color={theme.colors['Strong Inverse']}
                      size={24}
                      status={future_opportunity}
                      uncheckedColor={theme.colors['Strong Inverse']}
                    />
                    <Pressable
                      onPress={() => {
                        try {
                          setFuture_opportunity(
                            future_opportunity ? false : true
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
                              color: theme.colors['Strong Inverse'],
                              fontFamily: 'Quicksand_400Regular',
                              fontSize: 12,
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {'Future opportunity'}
                      </Text>
                    </Pressable>
                  </View>
                  {/* Acq agenda and other */}
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
                          setAcq_agenda(newCheckboxValue);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      color={theme.colors['Strong Inverse']}
                      size={24}
                      status={acq_agenda}
                      uncheckedColor={theme.colors['Strong Inverse']}
                    />
                    <Pressable
                      onPress={() => {
                        try {
                          setAcq_agenda(acq_agenda ? false : true);
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
                              color: theme.colors['Strong Inverse'],
                              fontFamily: 'Quicksand_400Regular',
                              fontSize: 12,
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {'Acq. agenda & other'}
                      </Text>
                    </Pressable>
                  </View>
                  {/* Transaction */}
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
                          setTransaction(newCheckboxValue);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      color={theme.colors['Strong Inverse']}
                      size={24}
                      status={transaction}
                      uncheckedColor={theme.colors['Strong Inverse']}
                    />
                    <Pressable
                      onPress={() => {
                        try {
                          setTransaction(transaction ? false : true);
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
                              color: theme.colors['Strong Inverse'],
                              fontFamily: 'Quicksand_400Regular',
                              fontSize: 12,
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {'Transaction'}
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
                        color: theme.colors['Strong Inverse'],
                        fontSize: 16,
                        marginBottom: 0,
                        marginTop: 0,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'Country'}
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
                      color={theme.colors['Strong Inverse']}
                      size={24}
                      status={sweden}
                      uncheckedColor={theme.colors['Strong Inverse']}
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
                              color: theme.colors['Strong Inverse'],
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
                      color={theme.colors['Strong Inverse']}
                      size={24}
                      status={germany}
                      uncheckedColor={theme.colors['Strong Inverse']}
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
                              color: theme.colors['Strong Inverse'],
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
                      color={theme.colors['Strong Inverse']}
                      size={24}
                      status={denmark}
                      uncheckedColor={theme.colors['Strong Inverse']}
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
                              color: theme.colors['Strong Inverse'],
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
                      color={theme.colors['Strong Inverse']}
                      size={24}
                      status={switzerland}
                      uncheckedColor={theme.colors['Strong Inverse']}
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
                              color: theme.colors['Strong Inverse'],
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
                      color={theme.colors['Strong Inverse']}
                      size={24}
                      status={norway}
                      uncheckedColor={theme.colors['Strong Inverse']}
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
                              color: theme.colors['Strong Inverse'],
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
                      color={theme.colors['Strong Inverse']}
                      size={24}
                      status={austria}
                      uncheckedColor={theme.colors['Strong Inverse']}
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
                              color: theme.colors['Strong Inverse'],
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
                      color={theme.colors['Strong Inverse']}
                      size={24}
                      status={finland}
                      uncheckedColor={theme.colors['Strong Inverse']}
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
                              color: theme.colors['Strong Inverse'],
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
              {/* Hint */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    justifyContent: 'flex-end',
                    marginBottom: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                  },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                  selectionColor={theme.colors['Strong Inverse']}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['screen_title'].style,
                      {
                        color: theme.colors['Strong Inverse'],
                        fontFamily: 'Quicksand_400Regular',
                        fontSize: 12,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {
                    'Your subscription only includes access to Nordic-related events'
                  }
                </Text>
                {/* Text 2 */}
                <Text
                  accessible={true}
                  {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                  selectionColor={theme.colors['Strong Inverse']}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['screen_title'].style,
                      {
                        color: theme.colors['Strong Inverse'],
                        fontFamily: 'Quicksand_400Regular',
                        fontSize: 12,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {
                    'Your subscription only includes access to DACH-related events'
                  }
                </Text>
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
                        color: theme.colors['Strong Inverse'],
                        fontSize: 16,
                        marginBottom: 0,
                        marginTop: 0,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'Sector'}
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
                      color={theme.colors['Strong Inverse']}
                      size={24}
                      status={communication_services}
                      uncheckedColor={theme.colors['Strong Inverse']}
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
                              color: theme.colors['Strong Inverse'],
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
                      color={theme.colors['Strong Inverse']}
                      size={24}
                      status={industrials}
                      uncheckedColor={theme.colors['Strong Inverse']}
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
                              color: theme.colors['Strong Inverse'],
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
                      color={theme.colors['Strong Inverse']}
                      size={24}
                      status={consumer_discretionary}
                      uncheckedColor={theme.colors['Strong Inverse']}
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
                              color: theme.colors['Strong Inverse'],
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
                      color={theme.colors['Strong Inverse']}
                      size={24}
                      status={it_and_software}
                      uncheckedColor={theme.colors['Strong Inverse']}
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
                              color: theme.colors['Strong Inverse'],
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
                      color={theme.colors['Strong Inverse']}
                      size={24}
                      status={consumer_staples}
                      uncheckedColor={theme.colors['Strong Inverse']}
                    />
                    <Pressable
                      onPress={() => {
                        try {
                          setConsumer_staples(consumer_staples ? false : true);
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
                              color: theme.colors['Strong Inverse'],
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
                      color={theme.colors['Strong Inverse']}
                      size={24}
                      status={materials}
                      uncheckedColor={theme.colors['Strong Inverse']}
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
                              color: theme.colors['Strong Inverse'],
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
                      color={theme.colors['Strong Inverse']}
                      size={24}
                      status={energy}
                      uncheckedColor={theme.colors['Strong Inverse']}
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
                              color: theme.colors['Strong Inverse'],
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
                      color={theme.colors['Strong Inverse']}
                      size={24}
                      status={real_estate}
                      uncheckedColor={theme.colors['Strong Inverse']}
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
                              color: theme.colors['Strong Inverse'],
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
                      color={theme.colors['Strong Inverse']}
                      size={24}
                      status={financials}
                      uncheckedColor={theme.colors['Strong Inverse']}
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
                              color: theme.colors['Strong Inverse'],
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
                      color={theme.colors['Strong Inverse']}
                      size={24}
                      status={utilities}
                      uncheckedColor={theme.colors['Strong Inverse']}
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
                              color: theme.colors['Strong Inverse'],
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
                      color={theme.colors['Strong Inverse']}
                      size={24}
                      status={health_care}
                      uncheckedColor={theme.colors['Strong Inverse']}
                    />
                    <Pressable
                      onPress={() => {
                        try {
                          setHealth_care(transaction ? false : true);
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
                              color: theme.colors['Strong Inverse'],
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
                      setFuture_opportunity(true);
                      setAcq_agenda(true);
                      setTransaction(true);
                      setSweden(true);
                      setGermany(true);
                      setDenmark(true);
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
                      setUtilities(true);
                      setHealth_care(true);
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
                        borderColor: theme.colors['Strong Inverse'],
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
                          await XanoCollectionApi.getAllEventsGET(Constants, {
                            keyword: 'Update',
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
                        backgroundColor: theme.colors['green'],
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
            </View>
          </View>
        </Modal>

        <H3
          selectable={false}
          {...GlobalStyles.H3Styles(theme)['H3'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.H3Styles(theme)['H3'].style, {
              fontFamily: 'Quicksand_700Bold',
              fontSize: 16,
              marginLeft: 8,
            }),
            dimensions.width
          )}
        >
          {'Companies for Sale (CFS)'}
        </H3>

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
                  backgroundColor: theme.colors['green'],
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
                color={theme.colors['Strong2']}
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
                  color: theme.colors['green'],
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

      <XanoCollectionApi.FetchGetCFSGET>
        {({ loading, error, data, refetchGetCFS }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <SimpleStyleScrollView
              bounces={true}
              horizontal={false}
              keyboardShouldPersistTaps={'never'}
              nestedScrollEnabled={false}
              showsHorizontalScrollIndicator={true}
              showsVerticalScrollIndicator={true}
            >
              <SimpleStyleFlashList
                data={fetchData}
                estimatedItemSize={50}
                inverted={false}
                keyExtractor={(flashListData, index) => flashListData?.id}
                listKey={'uyII1tlG'}
                onEndReachedThreshold={0.5}
                renderItem={({ item, index }) => {
                  const flashListData = item;
                  return (
                    <LinearGradient
                      endX={100}
                      endY={100}
                      startX={0}
                      startY={0}
                      {...GlobalStyles.LinearGradientStyles(theme)[
                        'Linear Gradient'
                      ].props}
                      color1={theme.colors['Strong']}
                      color2={theme.colors['Primary']}
                      color3={null}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.LinearGradientStyles(theme)[
                            'Linear Gradient'
                          ].style,
                          {
                            borderColor: theme.colors['Primary'],
                            borderRadius: 5,
                            flexDirection: 'column',
                            flexWrap: 'nowrap',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      <Pressable
                        onPress={() => {
                          try {
                            navigation.navigate('NewsletterDetailsScreen', {
                              news_id: flashListData?.id,
                            });
                            /* hidden 'Log to Console' action */
                            /* hidden 'If/Else' action */
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              flexDirection: 'column',
                              gap: 10,
                              justifyContent: 'space-between',
                              padding: 10,
                            },
                            dimensions.width
                          )}
                        >
                          <View>
                            <H4
                              selectable={false}
                              {...GlobalStyles.H4Styles(theme)['H4'].props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.H4Styles(theme)['H4'].style,
                                  {
                                    color: theme.colors['Strong Inverse'],
                                    marginBottom: 0,
                                    marginTop: 0,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {flashListData?.company}
                            </H4>
                            {/* Subtitle */}
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)['screen_title']
                                .props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)['screen_title']
                                    .style,
                                  {
                                    color: theme.colors['green'],
                                    marginBottom: 20,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {flashListData?.country}
                            </Text>
                          </View>
                          {/* View 2 */}
                          <View>
                            <Text
                              accessible={true}
                              {...GlobalStyles.TextStyles(theme)['screen_title']
                                .props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)['screen_title']
                                    .style,
                                  { color: theme.colors['Strong Inverse'] }
                                ),
                                dimensions.width
                              )}
                            >
                              {'Sector: '}
                              {flashListData?.gics}
                            </Text>
                          </View>
                        </View>
                      </Pressable>
                    </LinearGradient>
                  );
                }}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
                horizontal={false}
                numColumns={
                  (dimensions.width >= Breakpoints.Tablet ? 3 : 2) ?? 2
                }
                style={StyleSheet.applyWidth(
                  { paddingLeft: 10, paddingRight: 10 },
                  dimensions.width
                )}
              />
            </SimpleStyleScrollView>
          );
        }}
      </XanoCollectionApi.FetchGetCFSGET>
    </ScreenContainer>
  );
};

export default withTheme(CompanyForSaleScreen);
