/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from 'expo-linking';
import { Platform } from 'react-native';

function renderLinkingPrefix() {
  try {
    return Linking.createURL('/');
  } catch (e) {
    return 'draftbit://';
  }
}

const prefix = renderLinkingPrefix();

const linking = {
  enabled: Platform.OS === 'web' ? false : true,
  prefixes: [prefix],
  config: {
    screens: {
      AdvisorDetailsScreen: {
        screens: {
          AdvisorDetailsScreen: {
            path: 'AdvisorDetailsScreen/:advisor_id?',
          },
        },
      },

      AdvisorsScreen: {
        screens: {
          AdvisorsScreen: {
            path: 'AdvisorsScreen',
          },
        },
      },

      AllEventsScreen: {
        screens: {
          AllEventsScreen: {
            path: 'AllEventsScreen',
          },
        },
      },

      CFSDetailsScreen: {
        screens: {
          CFSDetailsScreen: {
            path: 'CFSDetailsScreen/:cfs_id?',
          },
        },
      },

      CFSScreen: {
        screens: {
          CFSScreen: {
            path: 'CFSScreen',
          },
        },
      },

      EventDetailsScreen: {
        screens: {
          EventDetailsScreen: {
            path: 'EventDetailsScreen/:event_id?',
          },
        },
      },

      ForgotPasswordScreen: {
        screens: {
          ForgotPasswordScreen: {
            path: 'ForgotPasswordScreen/:page_state?',
          },
        },
      },

      LogInScreen: {
        screens: {
          LogInScreen: {
            path: 'LogInScreen',
          },
        },
      },

      MultiplesScreen: {
        screens: {
          MultiplesScreen: {
            path: 'MultiplesScreen',
          },
        },
      },

      NewsletterDetailsScreen: {
        screens: {
          NewsletterDetailsScreen: {
            path: 'NewsletterDetailsScreen/:news_id?',
          },
        },
      },

      NewslettersScreen: {
        screens: {
          NewslettersScreen: {
            path: 'NewslettersScreen',
          },
        },
      },

      PEPFDetailsScreen: {
        screens: {
          PEPFDetailsScreen: {
            path: 'PEPFDetailsScreen/:pepf_id?',
          },
        },
      },

      PEPFScreen: {
        screens: {
          PEPFScreen: {
            path: 'PEPFScreen',
          },
        },
      },

      PeerGroupDetailsScreen: {
        screens: {
          PeerGroupDetailsScreen: {
            path: 'PeerGroupDetailsScreen/:peer_group_id?',
          },
        },
      },

      PeerGroupsScreen: {
        screens: {
          PeerGroupsScreen: {
            path: 'PeerGroupsScreen',
          },
        },
      },

      PrivacyPolicyScreen: {
        screens: {
          PrivacyPolicyScreen: {
            path: 'PrivacyPolicyScreen',
          },
        },
      },

      ReportsScreen: {
        screens: {
          ReportsScreen: {
            path: 'ReportsScreen',
          },
        },
      },

      StockDetailsScreen: {
        screens: {
          StockDetailsScreen: {
            path: 'StockDetailsScreen/:stock_id?',
          },
        },
      },

      StockSearchScreen: {
        screens: {
          StockSearchScreen: {
            path: 'StockSearchScreen',
          },
        },
      },

      TermsAndConditionsScreen: {
        screens: {
          TermsAndConditionsScreen: {
            path: 'TermsAndConditionsScreen',
          },
        },
      },
    },
  },
};

export default linking;
