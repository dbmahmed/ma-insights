import React from 'react';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import useWindowDimensions from '../utils/useWindowDimensions';
import { withTheme } from '@draftbit/ui';
import { View } from 'react-native';

const CustomHeaderBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View>
      <Utils.CustomCodeErrorBoundary>
        <></>
      </Utils.CustomCodeErrorBoundary>
    </View>
  );
};

export default withTheme(CustomHeaderBlock);
