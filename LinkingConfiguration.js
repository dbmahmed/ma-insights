/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from 'expo-linking';
import { Platform } from 'react-native';

function renderLinkingPrefix() {
  try {
    return Linking.createURL('/pwa/');
  } catch (e) {
    return 'draftbit://';
  }
}

const prefix = renderLinkingPrefix();

const linking = {
  enabled:  true,
  prefixes: [prefix],
  config: {
    screens: {
      SplashScreen: '/pwa',
      AdvisorDetailsScreen: '/pwa/advisor_details/:advisor_id?',

      AdvisorsScreen: '/pwa/advisors',

      AllEventsScreen: '/pwa/all_events/:event_id?',

      CFSDetailsScreen: '/pwa/cfs_details/:cfs_id?',

      CFSScreen: '/pwa/cfs',

      EventDetailsScreen: '/pwa/event_details/:event_id?',

      ForgotPasswordScreen: '/pwa/forgot_password',

      LogInScreen: '/pwa/login',

      MultiplesScreen: '/pwa/multiple',

      NewsletterDetailsScreen:  '/pwa/newsletter_details/:news_id?',

      NewslettersScreen: '/pwa/newsletters',

      PEPFDetailsScreen: 'pwa/pepf_details/:pepf_id?',

      PEPFScreen: '/pwa/pepf',

      PeerGroupDetailsScreen:  'peer_group_details/:peer_group_id?',

      PeerGroupsScreen: '/pwa/peer_group',

      PrivacyPolicyScreen: '/pwa/privacy_policy',

      ReportsScreen: '/pwa/report',

      StockDetailsScreen:  '/pwa/storck_details/:stock_id?',

      StockSearchScreen: '/pwa/stock_search',

      TermsAndConditionsScreen: '/pwa/terms_conditions',
    },
  },
};

export default linking;
