import React from 'react';
import { withTheme } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoCollectionApi from '../apis/XanoCollectionApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const WatermarkerBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [parentHeight, setParentHeight] = React.useState(0);
  const [viewingEventId, setViewingEventId] = props.setViewingEventId
    ? [
        props.viewingEventId !== undefined ? props.viewingEventId : 0,
        props.setViewingEventId,
      ]
    : React.useState(0);
  const toggleAllFilters = flag => {
    setFuture_opportunity(flag);
    setAcq_agenda(flag);
    setTransaction(flag);
    setSweden(flag);
    setGermany(flag);
    setDenmark(flag);
    setSwitzerland(flag);
    setNorway(flag);
    setAustria(flag);
    setFinland(flag);
    setCommunication_services(flag);
    setIndustrials(flag);
    setConsumer_discretionary(flag);
    setIt_and_software(flag);
    setConsumer_staples(flag);
    setMaterials(flag);
    setEnergy(flag);
    setReal_estate(flag);
    setFinancials(flag);
    setUtilities(flag);
    setHealth_care(flag);
    setNKP_Proprietary(flag);
    setPress_Release(flag);
    setMedia_and_Other(flag);
    setDach(flag);
    setRow(flag);
    setNordic(flag);
  };

  const applyFilter = () => {
    //Event type
    const eventType = [];

    future_opportunity && eventType.push('Future Opportunity');
    acq_agenda && eventType.push('Acq. agenda & other');
    transaction && eventType.push('Transaction');

    setEventType(() => eventType);

    //country
    const countries = [];

    sweden && countries.push('Sweden');
    germany && countries.push('Germany');
    denmark && countries.push('Denmark');
    switzerland && countries.push('Switzerland');
    norway && countries.push('Norway');
    austria && countries.push('Austria');
    finland && countries.push('Finland');

    setCountry(() => countries);

    //sector
    const sectors = [];

    communication_services && sectors.push('Communication Services');
    industrials && sectors.push('Industrials');
    consumer_discretionary && sectors.push('Consumer Discretionary');
    it_and_software && sectors.push('IT & Software');
    consumer_staples && sectors.push('Consumer Staples');
    materials && sectors.push('Materials');
    energy && sectors.push('Energy');
    real_estate && sectors.push('Real Estate');
    financials && sectors.push('Financials');
    utilities && sectors.push('Utilities');
    health_care && sectors.push('Health Care');

    setSector(() => sectors);

    // source type
    const sourceType = [];

    NKP_Proprietary && sourceType.push('NKP Proprietary');
    Press_Release && sourceType.push('Publicly Confirmed');
    Media_and_Other && sourceType.push('Media Intelligence');

    setSourceType(() => sourceType);

    // Regions

    const regionsTemp = [];

    nordic && regionsTemp.push('Nordic');
    dach && regionsTemp.push('DACH');
    row && regionsTemp.push('RoW');

    setRegions(regionsTemp);
  };

  const matchingFilters = () => {
    setFuture_opportunity((eventType || []).includes('Future Opportunity'));
    setAcq_agenda((eventType || []).includes('Acq. agenda & other'));
    setTransaction((eventType || []).includes('Transaction'));

    setSweden((country || []).includes('Sweden'));
    setGermany((country || []).includes('Germany'));
    setDenmark((country || []).includes('Denmark'));
    setSwitzerland((country || []).includes('Switzerland'));
    setNorway((country || []).includes('Norway'));
    setAustria((country || []).includes('Austria'));
    setFinland((country || []).includes('Finland'));

    setCommunication_services(
      (sector || []).includes('Communication Services')
    );
    setIndustrials((sector || []).includes('Industrials'));
    setConsumer_discretionary(
      (sector || []).includes('Consumer Discretionary')
    );
    setIt_and_software((sector || []).includes('IT & Software'));
    setConsumer_staples((sector || []).includes('Consumer Staples'));
    setMaterials((sector || []).includes('Materials'));
    setEnergy((sector || []).includes('Energy'));
    setReal_estate((sector || []).includes('Real Estate'));
    setFinancials((sector || []).includes('Financials'));
    setUtilities((sector || []).includes('Utilities'));
    setHealth_care((sector || []).includes('Health Care'));
    console.log(sourceType);
    setNKP_Proprietary((sourceType || []).includes('NKP Proprietary'));
    setPress_Release((sourceType || []).includes('Publicly Confirmed'));
    setMedia_and_Other((sourceType || []).includes('Media Intelligence'));

    setNordic((regions || []).includes('Nordic'));
    setRow((regions || []).includes('RoW'));
    setDach((regions || []).includes('DACH'));
  };

  const calculateItems = () => {
    let dum = [];
    if (!parentHeight) return dum;

    for (let i = Math.round(parentHeight / 280); i > 0; i--) dum.push(0);

    return dum;
  };

  const cielValue = val => {
    return val; //return Math.ceil(val)
  };

  return (
    <View
      onLayout={event => {
        try {
          console.log(event?.nativeEvent?.layout?.height);
          setParentHeight(cielValue(event?.nativeEvent?.layout?.height / 250));
        } catch (err) {
          console.error(err);
        }
      }}
      style={[
        StyleSheet.applyWidth(
          {
            bottom: 0,
            flex: 1,
            height: '100%',
            justifyContent: 'center',
            left: 0,
            position: 'absolute',
            right: 0,
            top: 0,
            zIndex: -2,
          },
          dimensions.width
        ),
        { 'pointer-events': 'none' },
      ]}
    >
      <XanoCollectionApi.FetchAuthMeGET>
        {({ loading, error, data, refetchAuthMe }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flex: 1,
                  gap: 200,
                  justifyContent: 'space-evenly',
                  overflow: 'hidden',
                },
                dimensions.width
              )}
            >
              {/* Text 2 */}
              <>
                {!(parentHeight > 0) ? null : (
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['watermark text'].props}
                    numberOfLines={3}
                    style={[
                      StyleSheet.applyWidth(
                        GlobalStyles.TextStyles(theme)['watermark text'].style,
                        dimensions.width
                      ),
                      {
                        transform: [{ rotate: '-35deg' }],
                        'pointer-events': 'none',
                      },
                    ]}
                    contentContainerStyle={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['watermark text'].style,
                      dimensions.width
                    )}
                    textBreakStrategy={'simple'}
                  >
                    {fetchData?.email}
                  </Text>
                )}
              </>
              <>
                {!(parentHeight >= 2) ? null : (
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['watermark text'].props}
                    numberOfLines={3}
                    style={[
                      StyleSheet.applyWidth(
                        GlobalStyles.TextStyles(theme)['watermark text'].style,
                        dimensions.width
                      ),
                      {
                        transform: [{ rotate: '-35deg' }],
                        'pointer-events': 'none',
                      },
                    ]}
                    contentContainerStyle={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['watermark text'].style,
                      dimensions.width
                    )}
                    textBreakStrategy={'simple'}
                  >
                    {fetchData?.email}
                  </Text>
                )}
              </>
              {/* Text 3 */}
              <>
                {!(parentHeight >= 3) ? null : (
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['watermark text'].props}
                    numberOfLines={3}
                    style={[
                      StyleSheet.applyWidth(
                        GlobalStyles.TextStyles(theme)['watermark text'].style,
                        dimensions.width
                      ),
                      {
                        transform: [{ rotate: '-35deg' }],
                        'pointer-events': 'none',
                      },
                    ]}
                    contentContainerStyle={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['watermark text'].style,
                      dimensions.width
                    )}
                    textBreakStrategy={'simple'}
                  >
                    {fetchData?.email}
                  </Text>
                )}
              </>
              {/* Text 4 */}
              <>
                {!(parentHeight >= 4) ? null : (
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['watermark text'].props}
                    numberOfLines={3}
                    style={[
                      StyleSheet.applyWidth(
                        GlobalStyles.TextStyles(theme)['watermark text'].style,
                        dimensions.width
                      ),
                      {
                        transform: [{ rotate: '-35deg' }],
                        'pointer-events': 'none',
                      },
                    ]}
                    contentContainerStyle={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['watermark text'].style,
                      dimensions.width
                    )}
                    textBreakStrategy={'simple'}
                  >
                    {fetchData?.email}
                  </Text>
                )}
              </>
              {/* Text 5 */}
              <>
                {!(parentHeight >= 5) ? null : (
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['watermark text'].props}
                    numberOfLines={3}
                    style={[
                      StyleSheet.applyWidth(
                        GlobalStyles.TextStyles(theme)['watermark text'].style,
                        dimensions.width
                      ),
                      {
                        transform: [{ rotate: '-35deg' }],
                        'pointer-events': 'none',
                      },
                    ]}
                    contentContainerStyle={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['watermark text'].style,
                      dimensions.width
                    )}
                    textBreakStrategy={'simple'}
                  >
                    {fetchData?.email}
                  </Text>
                )}
              </>
              {/* Text 6 */}
              <>
                {!(parentHeight >= 6) ? null : (
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['watermark text'].props}
                    numberOfLines={3}
                    style={[
                      StyleSheet.applyWidth(
                        GlobalStyles.TextStyles(theme)['watermark text'].style,
                        dimensions.width
                      ),
                      {
                        transform: [{ rotate: '-35deg' }],
                        'pointer-events': 'none',
                      },
                    ]}
                    contentContainerStyle={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['watermark text'].style,
                      dimensions.width
                    )}
                    textBreakStrategy={'simple'}
                  >
                    {fetchData?.email}
                  </Text>
                )}
              </>
              {/* Text 7 */}
              <>
                {!(parentHeight >= 7) ? null : (
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['watermark text'].props}
                    numberOfLines={3}
                    style={[
                      StyleSheet.applyWidth(
                        GlobalStyles.TextStyles(theme)['watermark text'].style,
                        dimensions.width
                      ),
                      {
                        transform: [{ rotate: '-35deg' }],
                        'pointer-events': 'none',
                      },
                    ]}
                    contentContainerStyle={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['watermark text'].style,
                      dimensions.width
                    )}
                    textBreakStrategy={'simple'}
                  >
                    {fetchData?.email}
                  </Text>
                )}
              </>
              {/* Text 8 */}
              <>
                {!(parentHeight >= 8) ? null : (
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['watermark text'].props}
                    numberOfLines={3}
                    style={[
                      StyleSheet.applyWidth(
                        GlobalStyles.TextStyles(theme)['watermark text'].style,
                        dimensions.width
                      ),
                      {
                        transform: [{ rotate: '-35deg' }],
                        'pointer-events': 'none',
                      },
                    ]}
                    contentContainerStyle={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['watermark text'].style,
                      dimensions.width
                    )}
                    textBreakStrategy={'simple'}
                  >
                    {fetchData?.email}
                  </Text>
                )}
              </>
              {/* Text 9 */}
              <>
                {!(parentHeight >= 9) ? null : (
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['watermark text'].props}
                    numberOfLines={3}
                    style={[
                      StyleSheet.applyWidth(
                        GlobalStyles.TextStyles(theme)['watermark text'].style,
                        dimensions.width
                      ),
                      {
                        transform: [{ rotate: '-35deg' }],
                        'pointer-events': 'none',
                      },
                    ]}
                    contentContainerStyle={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['watermark text'].style,
                      dimensions.width
                    )}
                    textBreakStrategy={'simple'}
                  >
                    {fetchData?.email}
                  </Text>
                )}
              </>
              {/* Text 10 */}
              <>
                {!(parentHeight >= 10) ? null : (
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['watermark text'].props}
                    numberOfLines={3}
                    style={[
                      StyleSheet.applyWidth(
                        GlobalStyles.TextStyles(theme)['watermark text'].style,
                        dimensions.width
                      ),
                      {
                        transform: [{ rotate: '-35deg' }],
                        'pointer-events': 'none',
                      },
                    ]}
                    contentContainerStyle={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['watermark text'].style,
                      dimensions.width
                    )}
                    textBreakStrategy={'simple'}
                  >
                    {fetchData?.email}
                  </Text>
                )}
              </>
              {/* Text 11 */}
              <>
                {!(parentHeight >= 11) ? null : (
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['watermark text'].props}
                    numberOfLines={3}
                    style={[
                      StyleSheet.applyWidth(
                        GlobalStyles.TextStyles(theme)['watermark text'].style,
                        dimensions.width
                      ),
                      {
                        transform: [{ rotate: '-35deg' }],
                        'pointer-events': 'none',
                      },
                    ]}
                    contentContainerStyle={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['watermark text'].style,
                      dimensions.width
                    )}
                    textBreakStrategy={'simple'}
                  >
                    {fetchData?.email}
                  </Text>
                )}
              </>
              {/* Text 12 */}
              <>
                {!(parentHeight >= 12) ? null : (
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['watermark text'].props}
                    numberOfLines={3}
                    style={[
                      StyleSheet.applyWidth(
                        GlobalStyles.TextStyles(theme)['watermark text'].style,
                        dimensions.width
                      ),
                      {
                        transform: [{ rotate: '-35deg' }],
                        'pointer-events': 'none',
                      },
                    ]}
                    contentContainerStyle={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['watermark text'].style,
                      dimensions.width
                    )}
                    textBreakStrategy={'simple'}
                  >
                    {fetchData?.email}
                  </Text>
                )}
              </>
              {/* Text 13 */}
              <>
                {!(parentHeight >= 13) ? null : (
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['watermark text'].props}
                    numberOfLines={3}
                    style={[
                      StyleSheet.applyWidth(
                        GlobalStyles.TextStyles(theme)['watermark text'].style,
                        dimensions.width
                      ),
                      {
                        transform: [{ rotate: '-35deg' }],
                        'pointer-events': 'none',
                      },
                    ]}
                    contentContainerStyle={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['watermark text'].style,
                      dimensions.width
                    )}
                    textBreakStrategy={'simple'}
                  >
                    {fetchData?.email}
                  </Text>
                )}
              </>
              {/* Text 14 */}
              <>
                {!(parentHeight >= 14) ? null : (
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['watermark text'].props}
                    numberOfLines={3}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['watermark text'].style,
                      dimensions.width
                    )}
                    textBreakStrategy={'simple'}
                  >
                    {fetchData?.email}
                  </Text>
                )}
              </>
              {/* Text 15 */}
              <>
                {!(parentHeight >= 10) ? null : (
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['watermark text'].props}
                    numberOfLines={3}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['watermark text'].style,
                      dimensions.width
                    )}
                    textBreakStrategy={'simple'}
                  >
                    {fetchData?.email}
                  </Text>
                )}
              </>
              {/* Text 16 */}
              <>
                {!(parentHeight >= 10) ? null : (
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['watermark text'].props}
                    numberOfLines={3}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['watermark text'].style,
                      dimensions.width
                    )}
                    textBreakStrategy={'simple'}
                  >
                    {fetchData?.email}
                  </Text>
                )}
              </>
              {/* Text 17 */}
              <>
                {!(parentHeight >= 10) ? null : (
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['watermark text'].props}
                    numberOfLines={3}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['watermark text'].style,
                      dimensions.width
                    )}
                    textBreakStrategy={'simple'}
                  >
                    {fetchData?.email}
                  </Text>
                )}
              </>
              {/* Text 18 */}
              <>
                {!(parentHeight >= 10) ? null : (
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['watermark text'].props}
                    numberOfLines={3}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['watermark text'].style,
                      dimensions.width
                    )}
                    textBreakStrategy={'simple'}
                  >
                    {fetchData?.email}
                  </Text>
                )}
              </>
              {/* Text 19 */}
              <>
                {!(parentHeight >= 10) ? null : (
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['watermark text'].props}
                    numberOfLines={3}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['watermark text'].style,
                      dimensions.width
                    )}
                    textBreakStrategy={'simple'}
                  >
                    {fetchData?.email}
                  </Text>
                )}
              </>
              {/* Text 20 */}
              <>
                {!(parentHeight >= 10) ? null : (
                  <Text
                    accessible={true}
                    {...GlobalStyles.TextStyles(theme)['watermark text'].props}
                    numberOfLines={3}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['watermark text'].style,
                      dimensions.width
                    )}
                    textBreakStrategy={'simple'}
                  >
                    {fetchData?.email}
                  </Text>
                )}
              </>
            </View>
          );
        }}
      </XanoCollectionApi.FetchAuthMeGET>
    </View>
  );
};

export default withTheme(WatermarkerBlock);
