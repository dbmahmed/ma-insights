import * as ExpoScreenCapture from '../custom-files/ExpoScreenCapture';

const removeSSListener = (Variables, setGlobalVariableValue) => {
  const { ScreenCapture } = ExpoScreenCapture;

  const { SS_SUBSCRIPTION } = Variables;
  // if (SS_SUBSCRIPTION) {
  ScreenCapture.removeScreenshotListener(SS_SUBSCRIPTION);
  setGlobalVariableValue({
    key: 'SS_SUBSCRIPTION',
    value: null,
  });
  // }
};

export default removeSSListener;
