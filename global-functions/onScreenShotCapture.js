const onScreenShotCapture = async Variables => {
  const {
    SEND_SS_NOTIF,
    SS_SCREEN_NAME,
    ME: { email, name },
  } = Variables;
  if (SEND_SS_NOTIF) {
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
