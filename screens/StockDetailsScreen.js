import React from 'react';
import palettes from '../themes/palettes';
import useWindowDimensions from '../utils/useWindowDimensions';
import { ScreenContainer, withTheme } from '@draftbit/ui';

const StockDetailsScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return <ScreenContainer hasSafeArea={false} scrollable={false} />;
};

export default withTheme(StockDetailsScreen);
