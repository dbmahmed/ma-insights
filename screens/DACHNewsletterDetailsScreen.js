import React from 'react';
import useWindowDimensions from '../utils/useWindowDimensions';
import { ScreenContainer, withTheme } from '@draftbit/ui';

const DACHNewsletterDetailsScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();

  return <ScreenContainer hasSafeArea={false} scrollable={false} />;
};

export default withTheme(DACHNewsletterDetailsScreen);
