import { useEffect } from 'react';

// import * as ScreenCapture from "expo-screen-capture";
import * as GlobalVariables from '../config/GlobalVariableContext';
import onScreenShotCapture from '../global-functions/onScreenShotCapture';
import * as AdminGroupApi from '../apis/AdminGroupApi.js';

export const useScreenShoot = scName => {
  // const setGlobalVariableValue = GlobalVariables.useSetValue();
  // const Variables = GlobalVariables.useValues();
  // const adminGroupSendNotificationForScreenshotPOST =
  //     AdminGroupApi.useSendNotificationForScreenshotPOST();
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
  //             subscription = ScreenCapture.addScreenshotListener(async () => {
  //                 console.log("handling listener");
  //                 onScreenShotCapture(scName, Variables);
  //                 console.log({
  //                     details: scName,
  //                     email: Variables.ME.email,
  //                     name: Variables.ME.name,
  //                     ts: new Date(),
  //                 });
  //                 const rest = (
  //                     await adminGroupSendNotificationForScreenshotPOST.mutateAsync({
  //                         details: scName,
  //                         email: Variables.ME.email,
  //                         name: Variables.ME.name,
  //                         ts: new Date(),
  //                     })
  //                 )?.json;
  //                 console.log("res ", rest);
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
  //             key: "SS_SCREEN_NAME",
  //             value: null,
  //         });
  //     };
  // }, []);
};
