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

export const loginPOST = async (
  Constants,
  { email, password },
  handlers = {}
) => {
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:Ax6hPdKr/auth/login`;
  const options = {
    body: JSON.stringify({ email: email, password: password }),
    headers: cleanHeaders({
      Accept: 'application/json',
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
  return useQuery(
    ['Reset Pass', args],
    () => loginPOST(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['Reset Passes']),
    }
  );
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
    refetch,
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

export const meGET = async (Constants, _args, handlers = {}) => {
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:Ax6hPdKr/auth/me`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['RESET_AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useMeGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['Reset Pass', args],
    () => meGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['Reset Passes']),
    }
  );
};

export const FetchMeGET = ({
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
  } = useMeGET({}, { refetchInterval, handlers: { onData, ...handlers } });

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
  return children({ loading, data, error, refetchMe: refetch });
};

export const requestTempPassGET = async (
  Constants,
  { email },
  handlers = {}
) => {
  const paramsDict = {};
  if (email !== undefined) {
    paramsDict['email'] = renderParam(email);
  }
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:Ax6hPdKr/auth/request_temp_password${renderQueryString(
    paramsDict
  )}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useRequestTempPassGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['Reset Pass', args],
    () => requestTempPassGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['Reset Passes']),
    }
  );
};

export const FetchRequestTempPassGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  email,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useRequestTempPassGET(
    { email },
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
  return children({ loading, data, error, refetchRequestTempPass: refetch });
};

export const resetPasswordPOST = async (
  Constants,
  { new_conf_pass, new_pass },
  handlers = {}
) => {
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:Ax6hPdKr/auth/reset_password`;
  const options = {
    body: JSON.stringify({
      password: new_pass,
      confirm_password: new_conf_pass,
    }),
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['RESET_AUTH_HEADER'],
      'Content-Type': 'application/json',
    }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useResetPasswordPOST = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args => resetPasswordPOST(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('Reset Pass', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('Reset Pass');
        queryClient.invalidateQueries('Reset Passes');
      },
    }
  );
};

export const FetchResetPasswordPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  new_conf_pass,
  new_pass,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useResetPasswordPOST(
    { new_conf_pass, new_pass },
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
  return children({ loading, data, error, refetchResetPassword: refetch });
};

export const tempLoginPOST = async (
  Constants,
  { email, temp_pass },
  handlers = {}
) => {
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:Ax6hPdKr/auth/temp_login`;
  const options = {
    body: JSON.stringify({ email: email, password: temp_pass }),
    headers: cleanHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useTempLoginPOST = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['Reset Pass', args],
    () => tempLoginPOST(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['Reset Passes']),
    }
  );
};

export const FetchTempLoginPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  email,
  temp_pass,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useTempLoginPOST(
    { email, temp_pass },
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
  return children({ loading, data, error, refetchTempLogin: refetch });
};

export const initialLoginGET = async (Constants, { email }, handlers = {}) => {
  const paramsDict = {};
  if (email !== undefined) {
    paramsDict['email'] = renderParam(email);
  }
  const url = `https://xne3-pdiu-8ysm.f2.xano.io/api:Ax6hPdKr/auth/first_signin${renderQueryString(
    paramsDict
  )}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useInitialLoginGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['Reset Pass', args],
    () => initialLoginGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['Reset Passes']),
    }
  );
};

export const FetchInitialLoginGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  email,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useInitialLoginGET(
    { email },
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
  return children({ loading, data, error, refetchInitialLogin: refetch });
};
