import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import CustomHeaderBlock from '../components/CustomHeaderBlock';
import LoadingBlock from '../components/LoadingBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import removeGlobalScroll from '../global-functions/removeGlobalScroll';
import setPadding from '../global-functions/setPadding';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  Checkbox,
  HStack,
  Pressable,
  ScreenContainer,
  Shadow,
  SimpleStyleFlatList,
  Spacer,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { H5 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const PeerGroupsScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [RoW, setRoW] = React.useState(false);
  const [SelectButton, setSelectButton] = React.useState('');
  const [communication_services, setCommunication_services] =
    React.useState(false);
  const [consumer_discretionary, setConsumer_discretionary] =
    React.useState(false);
  const [consumer_staples, setConsumer_staples] = React.useState(false);
  const [dach, setDach] = React.useState(false);
  const [energy, setEnergy] = React.useState(false);
  const [filterPressed, setFilterPressed] = React.useState(false);
  const [financials, setFinancials] = React.useState(false);
  const [health_care, setHealth_care] = React.useState(false);
  const [industrials, setIndustrials] = React.useState(false);
  const [it_and_software, setIt_and_software] = React.useState(false);
  const [keywordSearch, setKeywordSearch] = React.useState('');
  const [materials, setMaterials] = React.useState(false);
  const [my_peer_groups, setMy_peer_groups] = React.useState(false);
  const [nextPage, setNextPage] = React.useState(1);
  const [nkp_comps, setNkp_comps] = React.useState(false);
  const [nordic, setNordic] = React.useState(false);
  const [peerItems, setPeerItems] = React.useState([]);
  const [real_estate, setReal_estate] = React.useState(false);
  const [sector, setSector] = React.useState([]);
  const [sweden, setSweden] = React.useState(false);
  const [transaction, setTransaction] = React.useState(false);
  const [utilities, setUtilities] = React.useState(false);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      removeGlobalScroll();
      setGlobalVariableValue({
        key: 'pageName',
        value: 'Peer Groups',
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
      {/* box */}
      <View
        style={StyleSheet.applyWidth(
          { alignItems: 'center', width: '100%' },
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              margin: 0,
              maxWidth: 1200,
              padding: 10,
              paddingTop: [
                { minWidth: Breakpoints.Mobile, value: 20 },
                { minWidth: Breakpoints.Laptop, value: 0 },
              ],
              width: '100%',
            },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                alignContent: 'space-between',
                alignItems: { minWidth: Breakpoints.Laptop, value: 'center' },
                flexDirection: { minWidth: Breakpoints.Laptop, value: 'row' },
                gap: { minWidth: Breakpoints.Laptop, value: 10 },
                justifyContent: {
                  minWidth: Breakpoints.Laptop,
                  value: 'space-between',
                },
                marginBottom: 10,
              },
              dimensions.width
            )}
          >
            <>
              {!(dimensions.width >= Breakpoints.Laptop) ? null : (
                <H5
                  selectable={false}
                  {...GlobalStyles.H5Styles(theme)['H5'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.H5Styles(theme)['H5'].style,
                      {
                        fontFamily: 'Quicksand_600SemiBold',
                        fontSize: 25,
                        marginBottom: 20,
                        marginTop: [
                          { minWidth: Breakpoints.Mobile, value: 0 },
                          { minWidth: Breakpoints.Laptop, value: 20 },
                        ],
                        paddingLeft: 5,
                        textDecorationLine: 'none',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'Peer Group'}
                </H5>
              )}
            </>
            <Button
              iconPosition={'left'}
              onPress={() => {
                try {
                  navigation.push('StockSearchScreen');
                } catch (err) {
                  console.error(err);
                }
              }}
              {...GlobalStyles.ButtonStyles(theme)['Header menu'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ButtonStyles(theme)['Header menu'].style,
                  {
                    backgroundColor: [
                      {
                        minWidth: Breakpoints.Mobile,
                        value: theme.colors.text.strong,
                      },
                      {
                        minWidth: Breakpoints.Laptop,
                        value: theme.colors.text.strong,
                      },
                    ],
                    borderColor: {
                      minWidth: Breakpoints.Laptop,
                      value: theme.colors.text.strong,
                    },
                    color: [
                      {
                        minWidth: Breakpoints.Mobile,
                        value: palettes.Brand['Strong Inverse'],
                      },
                      {
                        minWidth: Breakpoints.Laptop,
                        value: palettes.Brand['Strong Inverse'],
                      },
                    ],
                    fontFamily: [
                      {
                        minWidth: Breakpoints.Mobile,
                        value: 'Quicksand_500Medium',
                      },
                      {
                        minWidth: Breakpoints.Laptop,
                        value: 'Quicksand_500Medium',
                      },
                    ],
                    maxWidth: { minWidth: Breakpoints.Tablet, value: 200 },
                  }
                ),
                dimensions.width
              )}
              title={'STOCKS'}
            />
          </View>

          <HStack
            {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.HStackStyles(theme)['H Stack'].style,
                {
                  flexDirection: 'column',
                  gap: 5,
                  justifyContent: 'space-between',
                }
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
                  /* hidden 'Set Variable' action */
                  /* hidden 'API Request' action */
                  /* 'Refetch Data' action requires configuration: choose an API endpoint */
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
                  { width: '100%' }
                ),
                dimensions.width
              )}
              value={keywordSearch}
            />
            <View
              style={StyleSheet.applyWidth(
                { flexDirection: 'row', width: '100%' },
                dimensions.width
              )}
            >
              {/* My peer groups */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 4,
                    maxWidth: '50%',
                    padding: 4,
                    width: [
                      { minWidth: Breakpoints.Tablet, value: '33.33%' },
                      { minWidth: Breakpoints.Desktop, value: '25%' },
                      { minWidth: Breakpoints.Laptop, value: '25%' },
                      { minWidth: Breakpoints.Mobile, value: 200 },
                    ],
                  },
                  dimensions.width
                )}
              >
                <Checkbox
                  onPress={newCheckboxValue => {
                    try {
                      setMy_peer_groups(newCheckboxValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  color={theme.colors.text.medium}
                  size={24}
                  status={my_peer_groups}
                  uncheckedColor={theme.colors.text.medium}
                />
                <Pressable
                  onPress={() => {
                    try {
                      setMy_peer_groups(my_peer_groups ? false : true);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['screen_title'].style,
                        { fontFamily: 'Quicksand_400Regular', fontSize: 12 }
                      ),
                      dimensions.width
                    )}
                  >
                    {'My peer groups'}
                  </Text>
                </Pressable>
              </View>
              {/* NKP comps */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 4,
                    maxWidth: '50%',
                    padding: 4,
                    width: [
                      { minWidth: Breakpoints.Tablet, value: '33.33%' },
                      { minWidth: Breakpoints.Desktop, value: '25%' },
                      { minWidth: Breakpoints.Laptop, value: '25%' },
                      { minWidth: Breakpoints.Mobile, value: 200 },
                    ],
                  },
                  dimensions.width
                )}
              >
                <Checkbox
                  onPress={newCheckboxValue => {
                    try {
                      setNkp_comps(newCheckboxValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  color={theme.colors.text.medium}
                  size={24}
                  status={nkp_comps}
                  uncheckedColor={theme.colors.text.medium}
                />
                <Pressable
                  onPress={() => {
                    try {
                      setNkp_comps(nkp_comps ? false : true);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['screen_title'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['screen_title'].style,
                        { fontFamily: 'Quicksand_400Regular', fontSize: 12 }
                      ),
                      dimensions.width
                    )}
                  >
                    {'NKP comps'}
                  </Text>
                </Pressable>
              </View>
            </View>
          </HStack>
          <Spacer left={8} right={8} bottom={2.5} top={2.5} />
        </View>
      </View>

      <XanoCollectionApi.FetchGetAllPeersGET
        handlers={{
          on2xx: fetchData => {
            try {
              setPeerItems(fetchData?.json?.items);
              setNextPage(fetchData?.json?.nextPage);
            } catch (err) {
              console.error(err);
            }
          },
          onData: fetchData => {
            try {
              /* hidden 'Set Variable' action */
              setNextPage(nextPage);
            } catch (err) {
              console.error(err);
            }
          },
        }}
        keyword={keywordSearch}
        my_peers={my_peer_groups}
        nkp_comps={nkp_comps}
        page={1}
        type={''}
      >
        {({ loading, error, data, refetchGetAllPeers }) => {
          const fetchData = data?.json;
          if (loading) {
            return <LoadingBlock />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <>
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', padding: 10 },
                  dimensions.width
                )}
              >
                {/* View 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'stretch',
                      alignSelf: 'auto',
                      flexDirection: 'column',
                      marginTop: { minWidth: Breakpoints.Tablet, value: 5 },
                      maxWidth: 1200,
                      paddingLeft: { minWidth: Breakpoints.Tablet, value: 15 },
                      width: '100%',
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
                          color: [
                            {
                              minWidth: Breakpoints.Tablet,
                              value: theme.colors.text.strong,
                            },
                            {
                              minWidth: Breakpoints.Mobile,
                              value: theme.colors.text.strong,
                            },
                          ],
                          fontFamily: 'Quicksand_400Regular',
                          fontSize: 12,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {fetchData?.itemsTotal}
                    {' peer groups matching filter'}
                  </Text>
                </View>
              </View>
              <SimpleStyleFlatList
                data={peerItems}
                horizontal={false}
                inverted={false}
                keyExtractor={(listData, index) =>
                  listData?.id ??
                  listData?.uuid ??
                  index?.toString() ??
                  JSON.stringify(listData)
                }
                keyboardShouldPersistTaps={'never'}
                listKey={'O0u33Gng'}
                nestedScrollEnabled={false}
                onEndReached={() => {
                  const handler = async () => {
                    try {
                      setNextPage(fetchData?.nextPage);
                      if (nextPage === null) {
                        return;
                      }
                      const newData = (
                        await XanoCollectionApi.getAllPeersGET(Constants, {
                          keyword: keywordSearch,
                          my_peers: my_peer_groups,
                          nkp_comps: nkp_comps,
                          page: nextPage,
                          type: '',
                        })
                      )?.json;
                      setNextPage(newData?.nextPage);
                      if (fetchData?.items === 0) {
                        return;
                      }
                      setPeerItems(peerItems.concat(newData?.items));
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                onEndReachedThreshold={0.5}
                renderItem={({ item, index }) => {
                  const listData = item;
                  return (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          height: 100,
                          maxWidth: [
                            { minWidth: Breakpoints.Laptop, value: '33.33%' },
                            { minWidth: Breakpoints.Tablet, value: '50%' },
                          ],
                          padding: 5,
                          width: '100%',
                        },
                        dimensions.width
                      )}
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
                            bottom: 5,
                            height: '100%',
                            left: 5,
                            position: 'absolute',
                            right: 5,
                            top: 5,
                            width: {
                              minWidth: Breakpoints.Laptop,
                              value: '100%',
                            },
                          },
                          dimensions.width
                        )}
                      />
                      <Pressable
                        onPress={() => {
                          try {
                            navigation.push('PeerGroupDetailsScreen', {
                              peer_group_id: listData?.id,
                            });
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
                              alignContent: 'stretch',
                              backgroundColor: palettes.Brand['Strong Inverse'],
                              borderColor: palettes.Brand['Light Inverse'],
                              borderRadius: 8,
                              borderWidth: 0,
                              flexDirection: 'row',
                              height: '100%',
                              justifyContent: 'space-between',
                              padding: 0,
                              width: '100%',
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
                                width: '100%',
                              },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                },
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
                                      fontFamily: 'Quicksand_700Bold',
                                      fontSize: 12,
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {listData?.title}
                              </Text>
                              {/* Text 2 */}
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
                                {listData?.created_at}
                              </Text>
                            </View>
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
                              {listData?.access_type}
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
                              {'Companies: '}
                              {listData?.number_of_stocks}
                            </Text>
                          </View>
                        </View>
                      </Pressable>
                    </View>
                  );
                }}
                numColumns={
                  dimensions.width >= Breakpoints.Laptop
                    ? 3
                    : dimensions.width >= Breakpoints.Tablet
                    ? 2
                    : 1
                }
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'stretch',
                    flexWrap: { minWidth: Breakpoints.Laptop, value: 'wrap' },
                    height: [
                      { minWidth: Breakpoints.Mobile, value: '100%' },
                      {
                        minWidth: Breakpoints.Mobile,
                        value: dimensions.height,
                      },
                    ],
                    marginBottom:
                      dimensions.width >= Breakpoints.Laptop ? 0 : 65,
                    maxHeight: dimensions.height - 270,
                    padding: 5,
                    paddingLeft: setPadding(dimensions.width),
                    paddingRight: setPadding(dimensions.width),
                    width: '100%',
                  },
                  dimensions.width
                )}
              />
            </>
          );
        }}
      </XanoCollectionApi.FetchGetAllPeersGET>
    </ScreenContainer>
  );
};

export default withTheme(PeerGroupsScreen);
