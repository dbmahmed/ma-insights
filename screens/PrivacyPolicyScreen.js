import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import CustomHeaderBlock from '../components/CustomHeaderBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  ScreenContainer,
  SimpleStyleScrollView,
  withTheme,
} from '@draftbit/ui';
import { H5, H6 } from '@expo/html-elements';
import { useIsFocused } from '@react-navigation/native';
import { Text, View } from 'react-native';

const PrivacyPolicyScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [country, setCountry] = React.useState([]);
  const [ebitdaRange, setEbitdaRange] = React.useState([]);
  const [filterPressed, setFilterPressed] = React.useState(false);
  const [keywordSearch, setKeywordSearch] = React.useState('');
  const [sector, setSector] = React.useState([]);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      setGlobalVariableValue({
        key: 'pageName',
        value: 'Privacy Policy',
      });
      setGlobalVariableValue({
        key: 'subPage',
        value: false,
      });
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={true}>
      <CustomHeaderBlock />
      {/* View 2 */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: [
              { minWidth: Breakpoints.Desktop, value: 'center' },
              { minWidth: Breakpoints.Mobile, value: 'center' },
            ],
          },
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'stretch',
              maxWidth: [
                { minWidth: Breakpoints.Desktop, value: 1200 },
                { minWidth: Breakpoints.Mobile, value: 1200 },
              ],
              padding: 10,
              width: [
                { minWidth: Breakpoints.Desktop, value: '100%' },
                { minWidth: Breakpoints.Mobile, value: '100%' },
              ],
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
                  StyleSheet.compose(GlobalStyles.H5Styles(theme)['H5'].style, {
                    fontFamily: 'Quicksand_600SemiBold',
                    fontSize: 25,
                    marginBottom: 20,
                    marginTop: [
                      { minWidth: Breakpoints.Mobile, value: 0 },
                      { minWidth: Breakpoints.Laptop, value: 20 },
                    ],
                    paddingLeft: 4,
                    textDecorationLine: 'none',
                  }),
                  dimensions.width
                )}
              >
                {'Privacy Policy'}
              </H5>
            )}
          </>
          <SimpleStyleScrollView
            bounces={true}
            horizontal={false}
            keyboardShouldPersistTaps={'never'}
            nestedScrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View>
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
              >
                {
                  'Your privacy and trust are important to us. This Statement explains how Nordic Knowledge Partners ApS (“NKP”) processes (e.g., collects, handles, stores, uses, and protects) personal information about you and your usage of this application (the "Application") as further described below. It also provides information about your rights and about how you can contact us if you have questions about how we handle your information.'
                }
              </Text>
            </View>
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
                {'Who this statement applies to and what it covers'}
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
              >
                {
                  'This statement applies to anyone who access, use, and or interact with this Application and related services provided as part of your/your Company\'s subscription or trial for NKP\'s information service, M&A Insights ("Services").'
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
                {'Who we are'}
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
              >
                {
                  'NKP is a privately-owned company headquartered and registered as a limited liability company in Denmark. NKP is owned by its founder and CEO, key employees, and a group of private investors.'
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
                {'Sources of personal information'}
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
              >
                {
                  'We collect personal information about you, e.g. your access, use, and/or interactions with us and our services. Specifically, we obtain personal information from you:\n\n(i) Through your interactions with us and our services, such as when you purchase or use our services, sign-up to use a service, request information or to receive other communications from us.\n\n(ii) Through your system/device when using the applications. Our servers, logs and other technologies may automatically collect certain information from or about you and your systems and devices and usage information to help us administer, protect (e.i. to detect and prevent fraud and security threats), and improve our Services, analyze usage and improve users’ experience.\n\nWe may also collect information about you from public domain sources (e.g. sources available to the public and typically over the internet (e.g. websites available to the general public), available in or through widely distributed media, and from government databases, records, and systems (e.g. the Danish CVR register).'
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
                {'What type of personal information we collect'}
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
              >
                {
                  'Depending upon the Services you use or your interactions with us, on the relevant Service(s), the personal information we collect may include:\n\n(i) Name and contact data such as first and last name, email address, postal address, phone number, and similar comtact data\n\n(ii) Employer and professional level data, such as the names of your current employer, job title, business contact information, industry etc.\n\n(iii) Account credentials, such as password and other security information for authentication and access to the Application\n\n(iv) User content, such as communication and files provided by you in relation to your user of the Services\n\n(v) usage information and browsing history, such as information about how you navigate within the Application and which parts of the Application you use the most.'
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
                {'How we use personal information'}
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
              >
                {
                  'This section includes details of the purposes for which we use personal information and also the different legal grounds upon which we process that personal information. Further information is set out below. For compliance with the EU’s GDPR directive we explain our lawful reason for processing your personal information. Personal information may be processed under more than one lawful reason/basis. We process personal information about you on the basis that it is:\n\n(i) Necessary for the performance of a contract: where we have a contract with you, we will process your personal information in order to fulfil that contract (i.e. to deliver the Services)\n\n(ii) In our or a third-party’s legitimate interests: details of those legitimate interests are set out in more detail below (e.g. provision of Services that we are contractually obliged by a third-party, such as your employer, to deliver to you\n\n(iii) Substantial public interest on the basis of applicable law (e.g., to help prevent and detect unlawful acts (e.g. money laundering, terrorism, fraud and or other criminal activity))\n\n(iv) Where you give us your consent (e.g. signing up to receive marketing and promotional communication from us: we only ask for your consent in relation to specific uses of personal information where we need to and, if we need it, we will collect it separately and make it clear that we are asking for consent\n\n(v) For compliance with a legal obligation (e.g. to respond to a court order or regulator as required by law'
                }
              </Text>
            </View>
            {/* View 7 */}
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
                {
                  'In the limited circumstances where we process sensitive personal information, we normally do so where it is:'
                }
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
              >
                {
                  '(i) Necessary in relation to employee obligations\n\n(ii) Personal information is within the Public domain\n\n(iii) Necessary for the establishment, exercise, or defense of legal claims or whenever courts are acting in their judicial capacity\n\n(iv) processing is necessary for reasons of substantial public interest, on the basis of applicable law'
                }
              </Text>
            </View>
            {/* View 8 */}
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
                {'Legitimate interest for use'}
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
              >
                {
                  'We use personal information for a number of legitimate interests. More detailed information about these legitimate interests is set out below. We use personal information:\n- To set up and administer your account and your use of our Services (including for access credentialing purposes, provide technical and customer support and training, verify your identity and performance authentication activities, facilitate and process transactions, provide suggestions and recommendations related to our Services, service our customers’ needs (including delivering the Services) and send important account, subscription, and Service information)\n- To administer our relationship with you, our business, and our third-party providers (e.g. to send invoices)\n- To understand the patterns, preferences, and interests of our customers to improve and enhance our Services\n- To handle inquiries and complaints\n- To contact you for participation in, and to conduct and manage, events, webinars, seminars, meetings, and/or other related gatherings or similar activities\n- To deliver and suggest tailored content such as news, research, reports, and business information. We analyze the way you use our Services to make suggestions to you for features or Services that we believe you will also be interested in, and so that we can make our Services more user-friendly\n- To personalize your experience with our Services. We may retain your browsing and usage information to make your searches within our Services more relevant and use those insights to target research or advertising to you online on our websites and apps. Your choices in relation to marketing are explained here. We may sometimes share your personal information across our Services so that we can make all of the Services we deliver to you more intuitive (e.g., rather than requiring you to enter the same data many times)\n- to contact you in relation to, and to conduct, surveys, polls or other research activities and to analyze the data collected for market research purposes, including, without limitation, related to creating and improving our Services\n- to provide any third-party, who has made our Services available to you (e.g., your employer or our subscriber), insights about use of the Services\n- for internal research and development purposes and to improve, test and enhance the features and functions of our Services\n- to meet our internal and external audit requirements, including our information security obligations (and if your employer or our subscriber provides for your access to our Services, to meet their internal and external audit requirements)\n- for regulatory reporting, oversight and co-operation\n- to enforce our terms and conditions\nfor the (i) onboarding of, and management of relationships with, clients/customers, vendors/service providers, business partners, professional advisors and/or any other counterparties; (ii) negotiation and finalization of, and/or participation in, any sale, merger, acquisition, restructure, joint venture, assignment, transfer or other disposition of all or any portion of our business, assets or stock (including in connection with any bankruptcy or similar proceedings) or any similar transaction(s)\n- to build, update, supplement and manage content databases made available to our customers in connection with our Services;\n- to comply with requests from courts, law enforcement agencies, regulatory agencies, and other public and government authorities, including where they are outside your country of residence\n- in order to exercise our rights, and to defend ourselves from claims and to comply with laws and regulations that apply to us or third parties with whom we work\n- Where we rely on legitimate interests as a lawful ground for processing your personal information, we balance those interests against your interests, fundamental rights and freedoms. '
                }
              </Text>
            </View>
            {/* View 9 */}
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
                {
                  'How we keep personal information confidential and on a "need-to-know" basis'
                }
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
              >
                {
                  'Personal information collected is only accessible to a few key members of the staff at NKP on a need-to-know basis, and the personal information is handled as strictly confidential information, i.e. never directly or indirectly shared with or made accessible to any third party or other user of the Services.\n\nWe share personal information with select third-party service providers (e.g. software developers), the party or person providing your access to our Services (if that is not you, e.g. your employer), in accordance with law and as otherwise described in this Statement. Our third-party service providers are not permitted to share or use personal information we make available to them for any purpose other than to provide services to us. In connection with the sharing of personal information, additional notice may be provided, and consent obtained, as required under applicable law.'
                }
              </Text>
            </View>
            {/* View 10 */}
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
                {'How we secure personal information'}
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
              >
                {
                  'NKP takes the security of personal information seriously and we use appropriate technologies, security controls, and procedures to protect personal information (including administrative, technical and physical safeguards) according to the risk level and the service provided.\nPersonal information collected is only accessible to a few key members of the staff at NKP on a need-to-know basis, and the personal information is handled as strictly confidential information, i.e. never directly or indirectly shared with or made accessible to any third party or other user of the Services.\n\nWe retain your information in accordance with the applicable records retention schedules/policies. These schedules/policies may be company and/or Service specific. You can find more information on the criteria used to calculate the retention periods set out below.\n\nWe calculate retention periods for your personal information in accordance with the following criteria:\n- the length of time necessary to fulfill the purposes we collected it for\n- when you or your employer (or other subscriber providing for your access to our Services) cease to use our Services\n- the length of time it is reasonable to keep records to demonstrate that we have fulfilled our duties and obligations\n- any limitation periods within which claims might be made\n- any retention periods prescribed by law or recommended by regulators, professional bodies or associations\n- the existence of any relevant proceedings'
                }
              </Text>
            </View>
            {/* View 11 */}
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
                {'Your rights'}
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
              >
                {
                  'You may have rights under European and other laws to have access to your personal information and to ask us to rectify, erase and restrict use of your personal information. You may also have rights to object to your personal information being used, to ask for the transfer of personal information you have made available to us and to withdraw consent to the use of your personal information. Further information on how to exercise your rights is set out below.\n\nWe will honor your rights under applicable data protection laws. You have the following rights under UK and European laws, and may have similar rights under the laws of other countries.\n\n- Right of subject access: The right to make a written request for details of your personal information and a copy of that personal information\n- Right to rectification: The right to have inaccurate information about you corrected or removed\n- Right to erasure (‘right to be forgotten’): The right to have certain personal information about you erased\n- Right to restriction of processing: The right to request that your personal information is only used for restricted purposes where:\n(i) the accuracy of personal information is contested;\n(ii) the processing is unlawful, but you object to the erasure of the personal information; or\n(iii) we no longer require the personal information, but it is still required for the establishment, exercise, or defense of a legal claim.\n- Right to opt out of marketing: The right to request that you not receive marketing communications from us, which can be for a specific type of marketing communication or for all marketing communications\n- Right to object: The right to object to processing of your personal information in cases where our processing is based on the performance of a task carried out in the public interest or we have let you know the processing is necessary for our or a third-party’s legitimate interests\n- Right to data portability: The right to ask for the personal information you have made available to us to be transferred to you or a third-party in machine-readable format\n- Right to withdraw consent: The right to withdraw any consent you have previously given us to handle your personal information. If you withdraw your consent, this will not affect the lawfulness of our use of your personal information prior to the withdrawal of your consent\n\nThese rights are not absolute and they do not always apply in all cases.\n\nIn response to a request, we will ask you to verify your identity if we need to, and to provide information that helps us to understand your request better. If we do not comply with your request, whether in whole or in part, we will explain why.'
                }
              </Text>
            </View>
            {/* View 12 */}
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
                {'Data protection officer'}
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
              >
                {
                  'Our designated data protection officer is Andreas von Buchwald who can be contacted at avb@nordicknowledgepartners.com or (+45) 40 99 38 22'
                }
              </Text>
            </View>
          </SimpleStyleScrollView>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(PrivacyPolicyScreen);
