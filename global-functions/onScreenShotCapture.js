const onScreenShotCapture = async Variables => {
  const {
    SEND_SS_NOTIF,
    SS_SCREEN_NAME,
    ME: { email, name },
  } = Variables;
  console.log(SS_SCREEN_NAME);
  if (SS_SCREEN_NAME) {
    const rest = (
      await xanoCollectionSendScreenshotNotficationPOST.mutateAsync({
        details: SS_SCREEN_NAME,
        email,
        name,
        ts: new Date(),
      })
    )?.json;

    console.log('send notification res');
  }
};

export default onScreenShotCapture;
