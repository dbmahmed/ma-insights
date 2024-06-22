import React from 'react';
import useWindowDimensions from '../utils/useWindowDimensions';
import { ScreenContainer, withTheme } from '@draftbit/ui';

const StockSearchScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return <ScreenContainer hasSafeArea={false} scrollable={false} />;
};

export default withTheme(StockSearchScreen);
