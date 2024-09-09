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
  { access_type, device, screenCode, stocks, title },
  handlers = {}
) => {
  const paramsDict = {};
  if (device !== undefined) {
    paramsDict['device'] = renderParam(device);
  }
  if (screenCode !== undefined) {
    paramsDict['screenCode'] = renderParam(screenCode);
  }
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/peer_group${renderQueryString(
    paramsDict
  )}`;
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
  device,
  screenCode,
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
    { access_type, device, screenCode, stocks, title },
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
  { device, ebitda_in, keyword, page, region_in, screenCode, sector_in },
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
  if (device !== undefined) {
    paramsDict['device'] = renderParam(device);
  }
  if (ebitda_in !== undefined) {
    paramsDict['ebitda_in'] = renderParam(ebitda_in);
  }
  if (screenCode !== undefined) {
    paramsDict['screenCode'] = renderParam(screenCode);
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
  device,
  ebitda_in,
  keyword,
  page,
  region_in,
  screenCode,
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
    { device, ebitda_in, keyword, page, region_in, screenCode, sector_in },
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
  { advisor_id, country_in, device, screenCode, sector_in },
  handlers = {}
) => {
  const paramsDict = {};
  if (sector_in !== undefined) {
    paramsDict['sector_in'] = renderParam(sector_in);
  }
  if (country_in !== undefined) {
    paramsDict['country_in'] = renderParam(country_in);
  }
  if (device !== undefined) {
    paramsDict['device'] = renderParam(device);
  }
  if (screenCode !== undefined) {
    paramsDict['screenCode'] = renderParam(screenCode);
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
  device,
  screenCode,
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
    { advisor_id, country_in, device, screenCode, sector_in },
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
  { device, eventType_in, keyword, page, region, screenCode, sector_in, type },
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
  if (device !== undefined) {
    paramsDict['device'] = renderParam(device);
  }
  if (screenCode !== undefined) {
    paramsDict['screenCode'] = renderParam(screenCode);
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
  device,
  eventType_in,
  keyword,
  page,
  region,
  screenCode,
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
    {
      device,
      eventType_in,
      keyword,
      page,
      region,
      screenCode,
      sector_in,
      type,
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
  return children({ loading, data, error, refetchGetAdvisors: refetch });
};

export const getAllEventsGET = async (
  Constants,
  {
    countryIn,
    device,
    eventTypeIn,
    keyword,
    page,
    region_in,
    screenCode,
    sectorIn,
    sourceType_in,
  },
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
  if (device !== undefined) {
    paramsDict['device'] = renderParam(device);
  }
  if (region_in !== undefined) {
    paramsDict['region_in'] = renderParam(region_in);
  }
  if (device !== undefined) {
    paramsDict['device'] = renderParam(device);
  }
  if (sourceType_in !== undefined) {
    paramsDict['sourceType_in'] = renderParam(sourceType_in);
  }
  if (screenCode !== undefined) {
    paramsDict['screenCode'] = renderParam(screenCode);
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
    ['Events solos', args],
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
  device,
  eventTypeIn,
  keyword,
  page,
  region_in,
  screenCode,
  sectorIn,
  sourceType_in,
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
    {
      countryIn,
      device,
      eventTypeIn,
      keyword,
      page,
      region_in,
      screenCode,
      sectorIn,
      sourceType_in,
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
  return children({ loading, data, error, refetchGetAllEvents: refetch });
};

export const getAllFundsGET = async (
  Constants,
  { device, screenCode },
  handlers = {}
) => {
  const paramsDict = {};
  if (device !== undefined) {
    paramsDict['device'] = renderParam(device);
  }
  if (screenCode !== undefined) {
    paramsDict['screenCode'] = renderParam(screenCode);
  }
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/fund${renderQueryString(
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
  device,
  screenCode,
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
    { device, screenCode },
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
    device,
    ebitdaIn,
    holdingPeriodIn,
    page,
    region_in,
    screenCode,
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
  if (device !== undefined) {
    paramsDict['device'] = renderParam(device);
  }
  if (region_in !== undefined) {
    paramsDict['region_in'] = renderParam(region_in);
  }
  if (screenCode !== undefined) {
    paramsDict['screenCode'] = renderParam(screenCode);
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
  device,
  ebitdaIn,
  holdingPeriodIn,
  page,
  region_in,
  screenCode,
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
      device,
      ebitdaIn,
      holdingPeriodIn,
      page,
      region_in,
      screenCode,
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
  { device, keyword, my_peers, nkp_comps, page, screenCode, type },
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
  if (device !== undefined) {
    paramsDict['device'] = renderParam(device);
  }
  if (screenCode !== undefined) {
    paramsDict['screenCode'] = renderParam(screenCode);
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
  device,
  keyword,
  my_peers,
  nkp_comps,
  page,
  screenCode,
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
    { device, keyword, my_peers, nkp_comps, page, screenCode, type },
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
  { device, evIn, page, regionIn, screenCode, sectorIn, stockKeyword },
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
  if (device !== undefined) {
    paramsDict['device'] = renderParam(device);
  }
  if (screenCode !== undefined) {
    paramsDict['screenCode'] = renderParam(screenCode);
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
  device,
  evIn,
  page,
  regionIn,
  screenCode,
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
    { device, evIn, page, regionIn, screenCode, sectorIn, stockKeyword },
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
  {
    cfsSearchQuery,
    countryIn,
    device,
    ebitdaIn,
    ownershipIn,
    page,
    screenCode,
    sectorIn,
  },
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
  if (device !== undefined) {
    paramsDict['device'] = renderParam(device);
  }
  if (ownershipIn !== undefined) {
    paramsDict['ownership_In'] = renderParam(ownershipIn);
  }
  if (screenCode !== undefined) {
    paramsDict['screenCode'] = renderParam(screenCode);
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
  device,
  ebitdaIn,
  ownershipIn,
  page,
  screenCode,
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
    {
      cfsSearchQuery,
      countryIn,
      device,
      ebitdaIn,
      ownershipIn,
      page,
      screenCode,
      sectorIn,
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
  return children({ loading, data, error, refetchGetCFS: refetch });
};

export const getOneCFSGET = async (
  Constants,
  { cfs_id, device, screenCode },
  handlers = {}
) => {
  const paramsDict = {};
  if (device !== undefined) {
    paramsDict['device'] = renderParam(device);
  }
  if (screenCode !== undefined) {
    paramsDict['screenCode'] = renderParam(screenCode);
  }
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/cfs/${encodeQueryParam(
    cfs_id
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
  device,
  screenCode,
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
    { cfs_id, device, screenCode },
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
  { device, event_id, screenCode },
  handlers = {}
) => {
  const paramsDict = {};
  if (device !== undefined) {
    paramsDict['device'] = renderParam(device);
  }
  if (screenCode !== undefined) {
    paramsDict['screenCode'] = renderParam(screenCode);
  }
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/event/${encodeQueryParam(
    event_id
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
  device,
  event_id,
  screenCode,
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
    { device, event_id, screenCode },
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

export const getOneFundGET = async (
  Constants,
  { device, fund_id },
  handlers = {}
) => {
  const paramsDict = {};
  if (device !== undefined) {
    paramsDict['device'] = renderParam(device);
  }
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/fund/${encodeQueryParam(
    fund_id
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
  device,
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
    { device, fund_id },
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

export const getOnePEPFGET = async (
  Constants,
  { device, pepf_id, screenCode },
  handlers = {}
) => {
  const paramsDict = {};
  if (device !== undefined) {
    paramsDict['device'] = renderParam(device);
  }
  if (screenCode !== undefined) {
    paramsDict['screenCode'] = renderParam(screenCode);
  }
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/pepf/${encodeQueryParam(
    pepf_id
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
  device,
  pepf_id,
  screenCode,
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
    { device, pepf_id, screenCode },
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
  { device, peer_group_id, screenCode },
  handlers = {}
) => {
  const paramsDict = {};
  if (device !== undefined) {
    paramsDict['device'] = renderParam(device);
  }
  if (screenCode !== undefined) {
    paramsDict['screenCode'] = renderParam(screenCode);
  }
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/peer_group/${encodeQueryParam(
    peer_group_id
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
  device,
  peer_group_id,
  screenCode,
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
    { device, peer_group_id, screenCode },
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
  { device, screenCode, stock_id },
  handlers = {}
) => {
  const paramsDict = {};
  if (device !== undefined) {
    paramsDict['device'] = renderParam(device);
  }
  if (screenCode !== undefined) {
    paramsDict['screenCode'] = renderParam(screenCode);
  }
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/stock/${encodeQueryParam(
    stock_id
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
  device,
  screenCode,
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
    { device, screenCode, stock_id },
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

export const getPeersListGET = async (Constants, { query }, handlers = {}) => {
  const paramsDict = {};
  if (query !== undefined) {
    paramsDict['query'] = renderParam(query);
  }
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/peer_group_user${renderQueryString(
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
  query,
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
    { query },
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
  { deviceType, email, password },
  handlers = {}
) => {
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/auth/login`;
  const options = {
    body: JSON.stringify({
      email: email,
      password: password,
      Device: deviceType,
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
  deviceType,
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
    { deviceType, email, password },
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
  { device, newsletter_id, screenCode },
  handlers = {}
) => {
  const paramsDict = {};
  if (device !== undefined) {
    paramsDict['device'] = renderParam(device);
  }
  if (screenCode !== undefined) {
    paramsDict['screenCode'] = renderParam(screenCode);
  }
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/newsletter/${encodeQueryParam(
    newsletter_id
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
  device,
  newsletter_id,
  screenCode,
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
    { device, newsletter_id, screenCode },
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
  { dach, device, keyword, newsletters, nordic, page, reports, screenCode },
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
  if (device !== undefined) {
    paramsDict['device'] = renderParam(device);
  }
  if (screenCode !== undefined) {
    paramsDict['screenCode'] = renderParam(screenCode);
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
  device,
  keyword,
  newsletters,
  nordic,
  page,
  reports,
  screenCode,
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
    { dach, device, keyword, newsletters, nordic, page, reports, screenCode },
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

export const reportsGET = async (
  Constants,
  { device, page, screenCode },
  handlers = {}
) => {
  const paramsDict = {};
  if (page !== undefined) {
    paramsDict['page'] = renderParam(page);
  }
  if (device !== undefined) {
    paramsDict['device'] = renderParam(device);
  }
  if (screenCode !== undefined) {
    paramsDict['screenCode'] = renderParam(screenCode);
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
  device,
  page,
  screenCode,
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
    { device, page, screenCode },
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
  { device, peer_id, screenCode, stocksList, title, type },
  handlers = {}
) => {
  const paramsDict = {};
  if (type !== undefined) {
    paramsDict['type'] = renderParam(type);
  }
  if (device !== undefined) {
    paramsDict['device'] = renderParam(device);
  }
  if (screenCode !== undefined) {
    paramsDict['screenCode'] = renderParam(screenCode);
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

export const expoTokenPUT = async (Constants, { expoToken }, handlers = {}) => {
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:abjrBkC8/user/expo_token`;
  const options = {
    body: JSON.stringify({ expo_token: expoToken }),
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

export const useExpoTokenPUT = (initialArgs = {}, { handlers = {} } = {}) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args => expoTokenPUT(Constants, { ...initialArgs, ...args }, handlers),
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
