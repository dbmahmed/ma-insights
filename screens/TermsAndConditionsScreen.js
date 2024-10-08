import React from 'react';
import {
  ScreenContainer,
  SimpleStyleScrollView,
  withTheme,
} from '@draftbit/ui';
import { H5, H6 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import CustomBottomNavBlock from '../components/CustomBottomNavBlock';
import CustomHeaderBlock from '../components/CustomHeaderBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import removeGlobalScroll from '../global-functions/removeGlobalScroll';
import screenNameGen from '../global-functions/screenNameGen';
import setPadding from '../global-functions/setPadding';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const TermsAndConditionsScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [screenCode, setScreenCode] = React.useState('');
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      setGlobalVariableValue({
        key: 'SS_SCREEN_NAME',
        value: null,
      });
      setScreenCode(screenNameGen());
      setGlobalVariableValue({
        key: 'pageName',
        value: 'Terms & Conditions',
      });
      setGlobalVariableValue({
        key: 'subPage',
        value: true,
      });
      removeGlobalScroll();
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer
      scrollable={false}
      hasBottomSafeArea={false}
      hasLeftSafeArea={false}
      hasRightSafeArea={false}
      hasSafeArea={false}
      hasTopSafeArea={true}
    >
      <CustomHeaderBlock />
      {/* View 2 */}
      <>
        {!(dimensions.width >= Breakpoints.Laptop) ? null : (
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: [
                  { minWidth: Breakpoints.Mobile, value: 'center' },
                  { minWidth: Breakpoints.Desktop, value: 'flex-start' },
                ],
                alignSelf: [
                  { minWidth: Breakpoints.Desktop, value: 'center' },
                  { minWidth: Breakpoints.Laptop, value: 'flex-start' },
                ],
                marginBottom: { minWidth: Breakpoints.Laptop, value: 10 },
                marginTop: { minWidth: Breakpoints.Laptop, value: 10 },
                maxWidth: { minWidth: Breakpoints.Desktop, value: 1200 },
                padding: { minWidth: Breakpoints.Laptop, value: 10 },
                width: { minWidth: Breakpoints.Desktop, value: '100%' },
              },
              dimensions.width
            )}
          >
            <>
              {!(dimensions.width >= Breakpoints.Laptop) ? null : (
                <H5
                  selectable={false}
                  {...GlobalStyles.H5Styles(theme)['H5'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.H5Styles(theme)['H5'].style,
                      {
                        fontFamily: 'Quicksand_600SemiBold',
                        fontSize: 25,
                        margin: { minWidth: Breakpoints.Laptop, value: 0 },
                        marginTop: 0,
                        padding: { minWidth: Breakpoints.Laptop, value: 0 },
                        textDecorationLine: 'none',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'Terms & Conditions'}
                </H5>
              )}
            </>
          </View>
        )}
      </>
      <SimpleStyleScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={StyleSheet.applyWidth(
          {
            paddingBottom: dimensions.width >= Breakpoints.Laptop ? 0 : 70,
            paddingLeft: setPadding(dimensions.width),
            paddingRight: setPadding(dimensions.width),
            width: '100%',
          },
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              paddingLeft: { minWidth: Breakpoints.Laptop, value: 5 },
              paddingRight: { minWidth: Breakpoints.Laptop, value: 5 },
            },
            dimensions.width
          )}
        >
          {/* View 2 */}
          <View>
            <H6
              selectable={false}
              {...GlobalStyles.H6Styles(theme)['H6'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.H6Styles(theme)['H6'].style, {
                  fontFamily: 'Quicksand_500Medium',
                  fontSize: 14,
                  marginBottom: 5,
                  marginTop: 15,
                }),
                dimensions.width
              )}
            >
              {'Access to the platform and intellectual property rights'}
            </H6>

            <Text
              accessible={true}
              {...GlobalStyles.TextStyles(theme)['screen_title'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['screen_title'].style,
                  {
                    fontFamily: 'Quicksand_400Regular',
                    fontSize: 14,
                    textAlign: 'justify',
                    whiteSpace: 'pre-line',
                  }
                ),
                dimensions.width
              )}
              suppressHighlighting={true}
            >
              {
                'The content, data, and subject-matter of the M&A Insights application (the "application") and any information delivered as part of the service included in a subscription for M&A Insights is the property of Nordic Knowledge Partners ("NKP") and cannot be shared or reproduced publicly in any form, including online. The Information is made available to customers (subscribers) with a subscription for M&A Insights on an internal-use-basis only, however it can be used for private client meetings, presentations and similar as part of the customer\'s natural course of business. Each user is granted a unique and personal login for the application, which is strictly personal and cannot be shared for use with anyone else internally or externally.'
              }
            </Text>
          </View>
          {/* View 3 */}
          <View>
            <H6
              selectable={false}
              {...GlobalStyles.H6Styles(theme)['H6'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.H6Styles(theme)['H6'].style, {
                  fontFamily: 'Quicksand_500Medium',
                  fontSize: 14,
                  marginBottom: 5,
                  marginTop: 15,
                }),
                dimensions.width
              )}
            >
              {'Access to the platform and intellectual property rights'}
            </H6>

            <Text
              accessible={true}
              {...GlobalStyles.TextStyles(theme)['screen_title'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['screen_title'].style,
                  {
                    fontFamily: 'Quicksand_400Regular',
                    fontSize: 14,
                    textAlign: 'justify',
                    whiteSpace: 'pre-line',
                  }
                ),
                dimensions.width
              )}
              suppressHighlighting={true}
            >
              {
                'The information contained in the application has been provided by NKP for information purposes only. This information does not constitute legal, professional or commercial advice. While every care has been taken to ensure that the content is useful and accurate, NKP gives no guarantees, undertakings or warranties in this regard, and does not accept any legal liability or responsibility for the information or the accuracy of the information so provided, or, for any loss or damage caused arising directly or indirectly in connection with reliance on the use of such information. Any errors or omissions brought to the attention of NKP will be corrected as soon as possible. The Information may contain technical inaccuracies and typographical errors. The information in this Application may be updated from time to time and may at times be out of date. NKP accepts no responsibility for keeping the Information in the Application up to date or any liability whatsoever for any failure to do so.'
              }
            </Text>
          </View>
          {/* View 4 */}
          <View>
            <H6
              selectable={false}
              {...GlobalStyles.H6Styles(theme)['H6'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.H6Styles(theme)['H6'].style, {
                  fontFamily: 'Quicksand_500Medium',
                  fontSize: 14,
                  marginBottom: 5,
                  marginTop: 15,
                }),
                dimensions.width
              )}
            >
              {'No legal or professional advice'}
            </H6>

            <Text
              accessible={true}
              {...GlobalStyles.TextStyles(theme)['screen_title'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['screen_title'].style,
                  {
                    fontFamily: 'Quicksand_400Regular',
                    fontSize: 14,
                    textAlign: 'justify',
                    whiteSpace: 'pre-line',
                  }
                ),
                dimensions.width
              )}
              suppressHighlighting={true}
            >
              {
                'Any views, opinions and guidance set out in the application are provided for information purposes only, and do not purport to be legal and/or professional advice or a definitive interpretation of any law. Anyone contemplating action in respect of matters set out in this application should obtain advice from a suitably qualified professional adviser based on their unique requirements.'
              }
            </Text>
          </View>
          {/* View 5 */}
          <View>
            <H6
              selectable={false}
              {...GlobalStyles.H6Styles(theme)['H6'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.H6Styles(theme)['H6'].style, {
                  fontFamily: 'Quicksand_500Medium',
                  fontSize: 14,
                  marginBottom: 5,
                  marginTop: 15,
                }),
                dimensions.width
              )}
            >
              {'No warranty or endorsement'}
            </H6>

            <Text
              accessible={true}
              {...GlobalStyles.TextStyles(theme)['screen_title'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['screen_title'].style,
                  {
                    fontFamily: 'Quicksand_400Regular',
                    fontSize: 14,
                    textAlign: 'justify',
                    whiteSpace: 'pre-line',
                  }
                ),
                dimensions.width
              )}
              suppressHighlighting={true}
            >
              {
                'NKP does not make any warranty, express or implied, including warranties of merchantability and fitness for a particular purpose, nor does it assume any legal liability or responsibility for the accuracy, completeness, or usefulness of any Information, apparatus, product, or process disclosed, nor does it represent that its use would not infringe privately owned rights. \n\nReference in this Application to any specific commercial products, process or service by trade name, trademark, manufacturer, or otherwise, does not necessarily constitute or imply its endorsement, recommendation, or favouring by NKP. The views and opinions of editors expressed herein do not necessarily state or reflect those of NKP and shall not be used for advertising or product endorsement purposes.'
              }
            </Text>
          </View>
          {/* View 6 */}
          <View>
            <H6
              selectable={false}
              {...GlobalStyles.H6Styles(theme)['H6'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.H6Styles(theme)['H6'].style, {
                  fontFamily: 'Quicksand_500Medium',
                  fontSize: 14,
                  marginBottom: 5,
                  marginTop: 15,
                }),
                dimensions.width
              )}
            >
              {'No responsibility for other websites'}
            </H6>

            <Text
              accessible={true}
              {...GlobalStyles.TextStyles(theme)['screen_title'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['screen_title'].style,
                  {
                    fontFamily: 'Quicksand_400Regular',
                    fontSize: 14,
                    textAlign: 'justify',
                    whiteSpace: 'pre-line',
                  }
                ),
                dimensions.width
              )}
              suppressHighlighting={true}
            >
              {
                'When you access other external websites through a link from the Application, please note that that NKP has no control over the content on external websites. The links to external websites are provided as a matter of convenience only, and should not be taken as an endorsement by NKP of the contents or practices of those external websites, for which NKP assumes no responsibility or liability.'
              }
            </Text>
          </View>
        </View>
      </SimpleStyleScrollView>
      <CustomBottomNavBlock />
    </ScreenContainer>
  );
};

export default withTheme(TermsAndConditionsScreen);
