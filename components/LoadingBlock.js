import React from 'react';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { CircularProgress, withTheme } from '@draftbit/ui';
import { View } from 'react-native';

const LoadingBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
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
    Press_Release && sourceType.push('Press Release');
    Media_and_Other && sourceType.push('Media & Other');

    setSourceType(() => sourceType);
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
    setPress_Release((sourceType || []).includes('Press Release'));
    setMedia_and_Other((sourceType || []).includes('Media & Other'));
  };

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
  };

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          alignItems: 'center',
          height: dimensions.height / 2,
          justifyContent: 'center',
          padding: 20,
        },
        dimensions.width
      )}
    >
      <CircularProgress
        color={theme.colors.branding.primary}
        lineCap={'round'}
        showTrack={true}
        startPosition={'top'}
        trackColor={theme.colors.border.brand}
        trackLineCap={'round'}
        animationDuration={500}
        indeterminate={true}
        isAnimated={true}
        style={StyleSheet.applyWidth(
          { minWidth: 50, width: 50 },
          dimensions.width
        )}
        thickness={5}
      />
    </View>
  );
};

export default withTheme(LoadingBlock);
