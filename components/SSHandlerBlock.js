import React from 'react';
import { withTheme } from '@draftbit/ui';
import { View } from 'react-native';
import * as AdminGroupApi from '../apis/AdminGroupApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import showAlertUtil from '../utils/showAlert';
import useWindowDimensions from '../utils/useWindowDimensions';

const SSHandlerBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [viewingEventId, setViewingEventId] = React.useState(0);
  const adminGroupSendNotificationForScreenshotPOST =
    AdminGroupApi.useSendNotificationForScreenshotPOST();

  return (
    <View
      onLayout={event => {
        const handler = async () => {
          try {
            if (!Constants['SS_SCREEN_NAME']) {
              return;
            }
            const updateRes = (
              await adminGroupSendNotificationForScreenshotPOST.mutateAsync({
                details: Constants['SS_SCREEN_NAME'],
                email: Constants['ME']?.email,
                name: Constants['ME']?.name,
                ts: new Date(),
              })
            )?.json;

            showAlertUtil({
              title: 'Screenshot detected',
              message:
                "External sharing/forwarding of content from M&A Insights without NKP's case-by-case consent is a violation of the terms of use - reach out to us at info@mainsights.io for any such requests",
              buttonText: 'OK',
            });

            /* hidden 'Log to Console' action */
            setGlobalVariableValue({
              key: 'SEND_SS_NOTIF',
              value: false,
            });
          } catch (err) {
            console.error(err);
          }
        };
        handler();
      }}
    />
  );
};

export default withTheme(SSHandlerBlock);
