import { useEffect } from 'react';
import * as ScreenCapture from 'expo-screen-capture';

const hasPermissions = async () => {
  const { status } = await ScreenCapture.requestPermissionsAsync();
  console.log('has perpm', status);
  return status === 'granted';
};

useEffect(() => {
  let subscription;

  const addListenerAsync = async () => {
    if (await hasPermissions()) {
      await ScreenCapture.preventScreenCaptureAsync();
      console.log('add listner');
      subscription = ScreenCapture.addScreenshotListener(() => {
        console.log('handling listener');
        alert('Thanks for screenshotting my beautiful app 😊');
      });
    } else {
      console.error(
        'Permissions needed to subscribe to screenshot events are missing!'
      );
    }
  };
  addListenerAsync();

  return () => {
    subscription?.remove();
  };
}, []);
