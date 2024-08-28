import * as React from 'react';
import {
  useQuery,
  useMutation,
  useIsFetching,
  useQueryClient,
} from 'react-query';
import useFetch from 'react-fetch-hook';
import { useIsFocused } from '@react-navigation/native';
import { handleResponse, isOkStatus } from '../utils/handleRestApiResponse';
import usePrevious from '../utils/usePrevious';
import {
  encodeQueryParam,
  renderParam,
  renderQueryString,
} from '../utils/encodeQueryParam';
import * as GlobalVariables from '../config/GlobalVariableContext';

const cleanHeaders = headers =>
  Object.fromEntries(Object.entries(headers).filter(kv => kv[1] != null));

export const authMeGET = async (Constants, _args, handlers = {}) => {
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/auth/me`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useAuthMeGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(['Auth', args], () => authMeGET(Constants, args, handlers), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['Auths']),
  });
};

export const FetchAuthMeGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useAuthMeGET({}, { refetchInterval, handlers: { onData, ...handlers } });

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchAuthMe: refetch });
};

export const createNewPeerPOST = async (
  Constants,
  { access_type, stocks, title },
  handlers = {}
) => {
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/peer_group`;
  const options = {
    body: JSON.stringify({
      title: title,
      access_type: access_type,
      stocks: stocks,
    }),
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useCreateNewPeerPOST = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args => createNewPeerPOST(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('Peer Groups', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('Peer Group');
        queryClient.invalidateQueries('Peer Groups');
      },
    }
  );
};

export const FetchCreateNewPeerPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  access_type,
  stocks,
  title,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useCreateNewPeerPOST(
    { access_type, stocks, title },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchCreateNewPeer: refetch });
};

export const eventTransactionsGET = async (
  Constants,
  { keyword, page, region_in, sector_in },
  handlers = {}
) => {
  const paramsDict = {};
  if (sector_in !== undefined) {
    paramsDict['sector_in'] = renderParam(sector_in);
  }
  if (region_in !== undefined) {
    paramsDict['region_in'] = renderParam(region_in);
  }
  if (keyword !== undefined) {
    paramsDict['keyword'] = renderParam(keyword);
  }
  if (page !== undefined) {
    paramsDict['page'] = renderParam(page);
  }
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/event_transactions${renderQueryString(
    paramsDict
  )}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useEventTransactionsGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['Events', args],
    () => eventTransactionsGET(Constants, args, handlers),
    {
      refetchInterval,
    }
  );
};

export const FetchEventTransactionsGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  keyword,
  page,
  region_in,
  sector_in,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useEventTransactionsGET(
    { keyword, page, region_in, sector_in },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchEventTransactions: refetch });
};

export const getAdvisorGET = async (
  Constants,
  { advisor_id, country_in, sector_in },
  handlers = {}
) => {
  const paramsDict = {};
  if (sector_in !== undefined) {
    paramsDict['sector_in'] = renderParam(sector_in);
  }
  if (country_in !== undefined) {
    paramsDict['country_in'] = renderParam(country_in);
  }
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/advisor/${encodeQueryParam(
    advisor_id
  )}${renderQueryString(paramsDict)}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGetAdvisorGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['Advisor', args],
    () => getAdvisorGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['Advisors']),
    }
  );
};

export const FetchGetAdvisorGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  advisor_id,
  country_in,
  sector_in,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetAdvisorGET(
    { advisor_id, country_in, sector_in },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchGetAdvisor: refetch });
};

export const getAdvisorsGET = async (
  Constants,
  { eventType_in, keyword, page, region, sector_in, type },
  handlers = {}
) => {
  const paramsDict = {};
  if (type !== undefined) {
    paramsDict['type'] = renderParam(type);
  }
  if (region !== undefined) {
    paramsDict['region'] = renderParam(region);
  }
  if (keyword !== undefined) {
    paramsDict['keyword'] = renderParam(keyword);
  }
  if (page !== undefined) {
    paramsDict['page'] = renderParam(page);
  }
  if (eventType_in !== undefined) {
    paramsDict['eventType_in'] = renderParam(eventType_in);
  }
  if (sector_in !== undefined) {
    paramsDict['sector_in'] = renderParam(sector_in);
  }
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/advisor${renderQueryString(
    paramsDict
  )}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGetAdvisorsGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['Advisors', args],
    () => getAdvisorsGET(Constants, args, handlers),
    {
      refetchInterval,
    }
  );
};

export const FetchGetAdvisorsGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  eventType_in,
  keyword,
  page,
  region,
  sector_in,
  type,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetAdvisorsGET(
    { eventType_in, keyword, page, region, sector_in, type },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchGetAdvisors: refetch });
};

export const getAllEventsGET = async (
  Constants,
  { countryIn, eventTypeIn, keyword, page, sectorIn },
  handlers = {}
) => {
  const paramsDict = {};
  if (eventTypeIn !== undefined) {
    paramsDict['eventType_in'] = renderParam(eventTypeIn);
  }
  if (sectorIn !== undefined) {
    paramsDict['sector_in'] = renderParam(sectorIn);
  }
  if (page !== undefined) {
    paramsDict['page'] = renderParam(page);
  }
  if (keyword !== undefined) {
    paramsDict['keyword'] = renderParam(keyword);
  }
  if (countryIn !== undefined) {
    paramsDict['country_in'] = renderParam(countryIn);
  }
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/event${renderQueryString(
    paramsDict
  )}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGetAllEventsGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['Events', args],
    () => getAllEventsGET(Constants, args, handlers),
    {
      refetchInterval,
    }
  );
};

export const FetchGetAllEventsGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  countryIn,
  eventTypeIn,
  keyword,
  page,
  sectorIn,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetAllEventsGET(
    { countryIn, eventTypeIn, keyword, page, sectorIn },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchGetAllEvents: refetch });
};

export const getAllFundsGET = async (Constants, _args, handlers = {}) => {
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/fund`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGetAllFundsGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['Funds', args],
    () => getAllFundsGET(Constants, args, handlers),
    {
      refetchInterval,
    }
  );
};

export const FetchGetAllFundsGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetAllFundsGET(
    {},
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchGetAllFunds: refetch });
};

export const getAllGICSGET = async (Constants, _args, handlers = {}) => {
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/gics_sub_industry`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGetAllGICSGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['GICS', args],
    () => getAllGICSGET(Constants, args, handlers),
    {
      refetchInterval,
    }
  );
};

export const FetchGetAllGICSGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetAllGICSGET(
    {},
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchGetAllGICS: refetch });
};

export const getAllInvestorsGET = async (Constants, _args, handlers = {}) => {
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/investor`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGetAllInvestorsGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['Investors', args],
    () => getAllInvestorsGET(Constants, args, handlers),
    {
      refetchInterval,
    }
  );
};

export const FetchGetAllInvestorsGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetAllInvestorsGET(
    {},
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchGetAllInvestors: refetch });
};

export const getAllPEPFGET = async (
  Constants,
  {
    countryIn,
    ebitdaIn,
    holdingPeriodIn,
    page,
    searchString,
    sectorIn,
    vintageIn,
  },
  handlers = {}
) => {
  const paramsDict = {};
  if (ebitdaIn !== undefined) {
    paramsDict['ebitda_in'] = renderParam(ebitdaIn);
  }
  if (holdingPeriodIn !== undefined) {
    paramsDict['holdingPeriod_in'] = renderParam(holdingPeriodIn);
  }
  if (vintageIn !== undefined) {
    paramsDict['vintage_in'] = renderParam(vintageIn);
  }
  if (countryIn !== undefined) {
    paramsDict['country_in'] = renderParam(countryIn);
  }
  if (sectorIn !== undefined) {
    paramsDict['sector_in'] = renderParam(sectorIn);
  }
  if (page !== undefined) {
    paramsDict['page'] = renderParam(page);
  }
  if (searchString !== undefined) {
    paramsDict['search_string'] = renderParam(searchString);
  }
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/pepf${renderQueryString(
    paramsDict
  )}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGetAllPEPFGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['PEPFS', args],
    () => getAllPEPFGET(Constants, args, handlers),
    {
      refetchInterval,
    }
  );
};

export const FetchGetAllPEPFGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  countryIn,
  ebitdaIn,
  holdingPeriodIn,
  page,
  searchString,
  sectorIn,
  vintageIn,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetAllPEPFGET(
    {
      countryIn,
      ebitdaIn,
      holdingPeriodIn,
      page,
      searchString,
      sectorIn,
      vintageIn,
    },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchGetAllPEPF: refetch });
};

export const getAllPeersGET = async (
  Constants,
  { keyword, my_peers, nkp_comps, page, type },
  handlers = {}
) => {
  const paramsDict = {};
  if (type !== undefined) {
    paramsDict['type'] = renderParam(type);
  }
  if (keyword !== undefined) {
    paramsDict['keyword'] = renderParam(keyword);
  }
  if (nkp_comps !== undefined) {
    paramsDict['nkp_comps'] = renderParam(nkp_comps);
  }
  if (my_peers !== undefined) {
    paramsDict['my_peers'] = renderParam(my_peers);
  }
  if (page !== undefined) {
    paramsDict['page'] = renderParam(page);
  }
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/peer_group${renderQueryString(
    paramsDict
  )}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGetAllPeersGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['Peer Groups', args],
    () => getAllPeersGET(Constants, args, handlers),
    {
      refetchInterval,
    }
  );
};

export const FetchGetAllPeersGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  keyword,
  my_peers,
  nkp_comps,
  page,
  type,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetAllPeersGET(
    { keyword, my_peers, nkp_comps, page, type },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchGetAllPeers: refetch });
};

export const getAllStocksGET = async (
  Constants,
  { evIn, page, regionIn, sectorIn, stockKeyword },
  handlers = {}
) => {
  const paramsDict = {};
  if (sectorIn !== undefined) {
    paramsDict['sector_in'] = renderParam(sectorIn);
  }
  if (regionIn !== undefined) {
    paramsDict['region_in'] = renderParam(regionIn);
  }
  if (stockKeyword !== undefined) {
    paramsDict['stock_keyword'] = renderParam(stockKeyword);
  }
  if (evIn !== undefined) {
    paramsDict['ev_in'] = renderParam(evIn);
  }
  if (page !== undefined) {
    paramsDict['page'] = renderParam(page);
  }
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/stock${renderQueryString(
    paramsDict
  )}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGetAllStocksGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['Stocks', args],
    () => getAllStocksGET(Constants, args, handlers),
    {
      refetchInterval,
    }
  );
};

export const FetchGetAllStocksGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  evIn,
  page,
  regionIn,
  sectorIn,
  stockKeyword,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetAllStocksGET(
    { evIn, page, regionIn, sectorIn, stockKeyword },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchGetAllStocks: refetch });
};

export const getCFSGET = async (
  Constants,
  { cfsSearchQuery, countryIn, ebitdaIn, page, sectorIn },
  handlers = {}
) => {
  const paramsDict = {};
  if (countryIn !== undefined) {
    paramsDict['country_in'] = renderParam(countryIn);
  }
  if (page !== undefined) {
    paramsDict['page'] = renderParam(page);
  }
  if (ebitdaIn !== undefined) {
    paramsDict['ebitda_in'] = renderParam(ebitdaIn);
  }
  if (sectorIn !== undefined) {
    paramsDict['sector_in'] = renderParam(sectorIn);
  }
  if (cfsSearchQuery !== undefined) {
    paramsDict['cfs_search_query'] = renderParam(cfsSearchQuery);
  }
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/cfs${renderQueryString(
    paramsDict
  )}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGetCFSGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(['CFS', args], () => getCFSGET(Constants, args, handlers), {
    refetchInterval,
  });
};

export const FetchGetCFSGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  cfsSearchQuery,
  countryIn,
  ebitdaIn,
  page,
  sectorIn,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetCFSGET(
    { cfsSearchQuery, countryIn, ebitdaIn, page, sectorIn },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchGetCFS: refetch });
};

export const getOneCFSGET = async (Constants, { cfs_id }, handlers = {}) => {
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/cfs/${encodeQueryParam(
    cfs_id
  )}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGetOneCFSGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(['CF', args], () => getOneCFSGET(Constants, args, handlers), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['CFS']),
  });
};

export const FetchGetOneCFSGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  cfs_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetOneCFSGET(
    { cfs_id },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchGetOneCFS: refetch });
};

export const getOneEventGET = async (
  Constants,
  { event_id },
  handlers = {}
) => {
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/event/${encodeQueryParam(
    event_id
  )}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGetOneEventGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['Event', args],
    () => getOneEventGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['Events']),
    }
  );
};

export const FetchGetOneEventGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  event_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetOneEventGET(
    { event_id },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchGetOneEvent: refetch });
};

export const getOneFundGET = async (Constants, { fund_id }, handlers = {}) => {
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/fund/${encodeQueryParam(
    fund_id
  )}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGetOneFundGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['Fund', args],
    () => getOneFundGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['Funds']),
    }
  );
};

export const FetchGetOneFundGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  fund_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetOneFundGET(
    { fund_id },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchGetOneFund: refetch });
};

export const getOneGiCSGET = async (Constants, { gics_id }, handlers = {}) => {
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/gics_sub_industry/${encodeQueryParam(
    gics_id
  )}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGetOneGiCSGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['GIC', args],
    () => getOneGiCSGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['GICS']),
    }
  );
};

export const FetchGetOneGiCSGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  gics_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetOneGiCSGET(
    { gics_id },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchGetOneGiCS: refetch });
};

export const getOneInvestorGET = async (
  Constants,
  { investor_id },
  handlers = {}
) => {
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/investor/${encodeQueryParam(
    investor_id
  )}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGetOneInvestorGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['Investor', args],
    () => getOneInvestorGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['Investors']),
    }
  );
};

export const FetchGetOneInvestorGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  investor_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetOneInvestorGET(
    { investor_id },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchGetOneInvestor: refetch });
};

export const getOnePEPFGET = async (Constants, { pepf_id }, handlers = {}) => {
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/pepf/${encodeQueryParam(
    pepf_id
  )}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGetOnePEPFGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['PEPF', args],
    () => getOnePEPFGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['PEPFS']),
    }
  );
};

export const FetchGetOnePEPFGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  pepf_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetOnePEPFGET(
    { pepf_id },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchGetOnePEPF: refetch });
};

export const getOnePeerGET = async (
  Constants,
  { peer_group_id },
  handlers = {}
) => {
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/peer_group/${encodeQueryParam(
    peer_group_id
  )}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGetOnePeerGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['Peer Group', args],
    () => getOnePeerGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['Peer Groups']),
    }
  );
};

export const FetchGetOnePeerGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  peer_group_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetOnePeerGET(
    { peer_group_id },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchGetOnePeer: refetch });
};

export const getOneStockGET = async (
  Constants,
  { stock_id },
  handlers = {}
) => {
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/stock/${encodeQueryParam(
    stock_id
  )}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGetOneStockGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['Stock', args],
    () => getOneStockGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['Stocks']),
    }
  );
};

export const FetchGetOneStockGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  stock_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetOneStockGET(
    { stock_id },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchGetOneStock: refetch });
};

export const getPeersListGET = async (Constants, _args, handlers = {}) => {
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/peer_group_user`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGetPeersListGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['Peer Groups', args],
    () => getPeersListGET(Constants, args, handlers),
    {
      refetchInterval,
    }
  );
};

export const FetchGetPeersListGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetPeersListGET(
    {},
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchGetPeersList: refetch });
};

export const loginPOST = async (
  Constants,
  { email, password },
  handlers = {}
) => {
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/auth/login`;
  const options = {
    body: JSON.stringify({ email: email, password: password }),
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useLoginPOST = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(['Auth', args], () => loginPOST(Constants, args, handlers), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['Auths']),
  });
};

export const FetchLoginPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  email,
  password,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useLoginPOST(
    { email, password },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchLogin: refetch });
};

export const newsletterEachGET = async (
  Constants,
  { newsletter_id },
  handlers = {}
) => {
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/newsletter/${encodeQueryParam(
    newsletter_id
  )}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useNewsletterEachGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['Newsletter', args],
    () => newsletterEachGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['Newsletters']),
    }
  );
};

export const FetchNewsletterEachGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  newsletter_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useNewsletterEachGET(
    { newsletter_id },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchNewsletterEach: refetch });
};

export const newslettersGET = async (
  Constants,
  { dach, keyword, newsletters, nordic, page, reports },
  handlers = {}
) => {
  const paramsDict = {};
  if (nordic !== undefined) {
    paramsDict['nordic'] = renderParam(nordic);
  }
  if (reports !== undefined) {
    paramsDict['reports'] = renderParam(reports);
  }
  if (dach !== undefined) {
    paramsDict['dach'] = renderParam(dach);
  }
  if (newsletters !== undefined) {
    paramsDict['newsletters'] = renderParam(newsletters);
  }
  if (keyword !== undefined) {
    paramsDict['keyword'] = renderParam(keyword);
  }
  if (page !== undefined) {
    paramsDict['page'] = renderParam(page);
  }
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/newsletter${renderQueryString(
    paramsDict
  )}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useNewslettersGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['Newsletters', args],
    () => newslettersGET(Constants, args, handlers),
    {
      refetchInterval,
    }
  );
};

export const FetchNewslettersGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  dach,
  keyword,
  newsletters,
  nordic,
  page,
  reports,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useNewslettersGET(
    { dach, keyword, newsletters, nordic, page, reports },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchNewsletters: refetch });
};

export const reportsGET = async (Constants, { page }, handlers = {}) => {
  const paramsDict = {};
  if (page !== undefined) {
    paramsDict['page'] = renderParam(page);
  }
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/report${renderQueryString(
    paramsDict
  )}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useReportsGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['Reports', args],
    () => reportsGET(Constants, args, handlers),
    {
      refetchInterval,
    }
  );
};

export const FetchReportsGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  page,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useReportsGET(
    { page },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchReports: refetch });
};

export const requestDemoPOST = async (
  Constants,
  { company, email, message, mobile, name },
  handlers = {}
) => {
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/demo_request`;
  const options = {
    body: JSON.stringify({
      email: email,
      full_name: name,
      company: company,
      phone: mobile,
      message: message,
    }),
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useRequestDemoPOST = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args => requestDemoPOST(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('Demo', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('Demo');
        queryClient.invalidateQueries('Demos');
      },
    }
  );
};

export const FetchRequestDemoPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  company,
  email,
  message,
  mobile,
  name,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useRequestDemoPOST(
    { company, email, message, mobile, name },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchRequestDemo: refetch });
};

export const resetPasswordPUT = async (
  Constants,
  { current_password, new_password },
  handlers = {}
) => {
  const paramsDict = {};
  if (current_password !== undefined) {
    paramsDict['current_password'] = renderParam(current_password);
  }
  if (new_password !== undefined) {
    paramsDict['new_password'] = renderParam(new_password);
  }
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/user/reset_password${renderQueryString(
    paramsDict
  )}`;
  const options = {
    body: JSON.stringify({ key: 'value' }),
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
    method: 'PUT',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useResetPasswordPUT = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args => resetPasswordPUT(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('Auth', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('Auth');
        queryClient.invalidateQueries('Auths');
      },
    }
  );
};

export const updateNotificationPUT = async (
  Constants,
  { email_dach, email_nordic, push_dach, push_nordic },
  handlers = {}
) => {
  const paramsDict = {};
  if (push_nordic !== undefined) {
    paramsDict['push_nordic'] = renderParam(push_nordic);
  }
  if (push_dach !== undefined) {
    paramsDict['push_dach'] = renderParam(push_dach);
  }
  if (email_nordic !== undefined) {
    paramsDict['email_nordic'] = renderParam(email_nordic);
  }
  if (email_dach !== undefined) {
    paramsDict['email_dach'] = renderParam(email_dach);
  }
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/user/update_notifications${renderQueryString(
    paramsDict
  )}`;
  const options = {
    body: JSON.stringify({ key: 'value' }),
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
    method: 'PUT',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useUpdateNotificationPUT = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args =>
      updateNotificationPUT(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('User', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('User');
        queryClient.invalidateQueries('Users');
      },
    }
  );
};

export const updatePeerGroupPATCH = async (
  Constants,
  { peer_id, stocksList, title, type },
  handlers = {}
) => {
  const paramsDict = {};
  if (type !== undefined) {
    paramsDict['type'] = renderParam(type);
  }
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/peer_group/${encodeQueryParam(
    peer_id
  )}${renderQueryString(paramsDict)}`;
  const options = {
    body: JSON.stringify({
      peer_group_id: peer_id,
      stocks: stocksList,
      tyoe: type,
      title: title,
    }),
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
    method: 'PATCH',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useUpdatePeerGroupPATCH = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args =>
      updatePeerGroupPATCH(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('Peer Groups', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('Peer Group');
        queryClient.invalidateQueries('Peer Groups');
      },
    }
  );
};
