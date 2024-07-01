import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import AccModalBlock from '../components/AccModalBlock';
import TopNavBlock from '../components/TopNavBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import assessAccess from '../global-functions/assessAccess';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  HStack,
  IconButton,
  ScreenContainer,
  SimpleStyleFlashList,
  Spacer,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { H3, H6 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const AllEventsScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [Country, setCountry] = React.useState([]);
  const [Sector, setSector] = React.useState([]);
  const [eventSearch, setEventSearch] = React.useState('');
  const [eventType, setEventType] = React.useState([]);
  const [filterPressed, setFilterPressed] = React.useState(false);
  const [keywordSearch, setKeywordSearch] = React.useState('');
  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        console.log(Constants['AUTH_HEADER'], 'AUTH HEADER:', 'ALL EVENTS');
        const getEvent = (await XanoCollectionApi.getAllEventsGET(Constants))
          ?.json;
        console.log(Constants['ME'], getEvent, 'ALLEVENTS:');
        /* hidden 'Conditional Stop' action */
        /* hidden 'Navigate' action */
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={false}
      hasLeftSafeArea={true}
      hasRightSafeArea={false}
      scrollable={true}
    >
      <AccModalBlock />
      <>{!Constants['top_nav_pressed'] ? null : <TopNavBlock />}</>
      <View style={StyleSheet.applyWidth({ margin: 10 }, dimensions.width)}>
        <Modal
          supportedOrientations={['portrait', 'landscape']}
          transparent={false}
          animationType={'fade'}
          presentationStyle={'pageSheet'}
          visible={filterPressed}
        >
          <HStack
            {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
            style={StyleSheet.applyWidth(
              GlobalStyles.HStackStyles(theme)['H Stack'].style,
              dimensions.width
            )}
          >
            <H6
              selectable={false}
              {...GlobalStyles.H6Styles(theme)['H6'].props}
              style={StyleSheet.applyWidth(
                GlobalStyles.H6Styles(theme)['H6'].style,
                dimensions.width
              )}
            >
              {'Double click me to edit 👀'}
            </H6>
            <IconButton
              icon={'FontAwesome/photo'}
              onPress={() => {
                try {
                  setFilterPressed(false);
                } catch (err) {
                  console.error(err);
                }
              }}
              size={32}
            />
          </HStack>
        </Modal>

        <H3
          selectable={false}
          {...GlobalStyles.H3Styles(theme)['H3'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.H3Styles(theme)['H3'].style, {
              fontFamily: 'Quicksand_400Regular',
              marginLeft: 8,
            }),
            dimensions.width
          )}
        >
          {'All events'}
        </H3>

        <HStack
          {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.HStackStyles(theme)['H Stack'].style,
              { justifyContent: 'space-between', marginLeft: 8 }
            ),
            dimensions.width
          )}
        >
          <TextInput
            autoCorrect={true}
            changeTextDelay={500}
            onChangeText={newTextInputValue => {
              try {
                setEventSearch(newTextInputValue);
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
            value={eventSearch}
          />
          <IconButton
            onPress={() => {
              try {
                setFilterPressed(true);
              } catch (err) {
                console.error(err);
              }
            }}
            size={32}
            color={theme.colors['Strong2']}
            icon={'MaterialIcons/filter-alt'}
          />
        </HStack>
        <Spacer left={8} right={8} bottom={2.5} top={2.5} />
        <XanoCollectionApi.FetchGetAllEventsGET
          handlers={{
            onData: fetchData => {
              try {
                console.log(fetchData, 'FETCHDATA ONSCREEN');
              } catch (err) {
                console.error(err);
              }
            },
          }}
        >
          {({ loading, error, data, refetchGetAllEvents }) => {
            const fetchData = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <SimpleStyleFlashList
                data={fetchData}
                estimatedItemSize={50}
                horizontal={false}
                inverted={false}
                keyExtractor={(flashListData, index) => flashListData?.id}
                listKey={'4bid5IFF'}
                onEndReachedThreshold={0.5}
                renderItem={({ item, index }) => {
                  const flashListData = item;
                  return (
                    <Touchable
                      onPress={() => {
                        try {
                          navigation.navigate('EventDetailsScreen', {
                            event_id: flashListData?.id,
                          });
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            borderBottomWidth: 0.5,
                            borderColor: theme.colors['Light'],
                            marginLeft: 8,
                            paddingBottom: 5,
                            paddingTop: 5,
                          },
                          dimensions.width
                        )}
                      >
                        <H6
                          selectable={false}
                          {...GlobalStyles.H6Styles(theme)['H6'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.H6Styles(theme)['H6'].style,
                              {
                                fontFamily: 'Quicksand_700Bold',
                                fontSize: 12,
                                margin: 0,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {flashListData?.headline}
                        </H6>

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
                                fontSize: 10,
                                marginTop: 4,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {flashListData?.published}
                          {' | Source: '}
                          {flashListData?.source}
                        </Text>
                      </View>
                    </Touchable>
                  );
                }}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
                numColumns={1}
              />
            );
          }}
        </XanoCollectionApi.FetchGetAllEventsGET>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(AllEventsScreen);
