import { useEffect } from 'react';

// import * as ScreenCapture from "expo-screen-capture";
import * as GlobalVariables from '../config/GlobalVariableContext';
import onScreenShotCapture from '../global-functions/onScreenShotCapture';

export const useScreenShoot = () => {
  // const setGlobalVariableValue = GlobalVariables.useSetValue();
  // const hasPermissions = async () => {
  //     const { status } = await ScreenCapture.requestPermissionsAsync();
  //     console.log("has perpm", status);
  //     return status === "granted";
  // };
  // useEffect(() => {
  //     let subscription;
  //     const addListenerAsync = async () => {
  //         if (await hasPermissions()) {
  //             await ScreenCapture.preventScreenCaptureAsync();
  //             console.log("add listner");
  //             subscription = ScreenCapture.addScreenshotListener(() => {
  //                 console.log("handling listener");
  //                 onScreenShotCapture()
  //                 // alert("Thanks for screenshotting my beautiful app 😊");
  //             });
  //         } else {
  //             console.error(
  //                 "Permissions needed to subscribe to screenshot events are missing!"
  //             );
  //         }
  //     };
  //     addListenerAsync();
  //     return () => {
  //         subscription?.remove();
  //         setGlobalVariableValue({
  //             key: 'SS_SCREEN_NAME',
  //             value: null
  //         })
  //     };
  // }, []);
};
