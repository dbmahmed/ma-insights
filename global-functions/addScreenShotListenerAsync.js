import * as ExpoScreenCapture from '../custom-files/ExpoScreenCapture';

const addScreenShotListenerAsync = (Variables, setGlobalVariableValue) => {
  const { ScreenCapture } = ExpoScreenCapture;
  const { SS_SUBSCRIPTION } = Variables;
  const hasPermissions = async () => {
    const { status } = await ScreenCapture.requestPermissionsAsync();
    console.log('has perpm', status);
    return status === 'granted';
  };

  let subscription = ScreenCapture.addScreenshotListener(() => {
    console.log('handling listener');
    setGlobalVariableValue({
      key: 'SEND_SS_NOTIF',
      value: true,
    });
  });
  console.log('subs obj ', subscription);

  setGlobalVariableValue({
    key: 'SS_SUBSCRIPTION',
    value: subscription,
  });
  // }
};

export default addScreenShotListenerAsync;
