import { Dispatch, useCallback, useEffect, useReducer, useRef } from "react";

interface State<T = {}> {
  loading: boolean;
  response?: T;
  error?: string;
}

type Action<T = {}> =
  | { type: "ERROR"; error: string }
  | { type: "COMPLETE"; data: T }
  | { type: "CLEAN" }
  | { type: "LOADING"; loading?: boolean };

type ReducerType<T> = (state: State<T>, action: Action<T>) => State<T>;
const reducer = <T extends {}>(
  state: State<T>,
  action: Action<T>
): State<T> => {
  switch (action.type) {
    case "ERROR":
      return { response: undefined, error: action.error, loading: false };
    case "COMPLETE": {
      return { response: action.data, error: undefined, loading: false };
    }
    case "LOADING":
      return {
        ...state,
        loading: action.loading === undefined ? true : action.loading,
      };
    case "CLEAN":
      return { loading: false, error: undefined, response: undefined };
    default:
      return state;
  }
};

type GetParams = { url?: string; params?: {} } & RequestInit;

interface UseFetchProps {
  onInit: GetParams;
}

const fetchData = async <T extends {}>(
  dispatch: Dispatch<Action<T>>,
  onInit: GetParams
) => {
  dispatch({ type: "LOADING" });
  const { url, params, ...request } = onInit;
  const qp = new URLSearchParams(params || {}).toString();
  const finalURL = `${url}${qp === "" ? "" : `?${qp}`}`;
  try {
    const response = await fetch(finalURL, request);
    const data: T = await response.json();
    dispatch({ type: "COMPLETE", data });
  } catch (ex) {
    console.error(ex);
    dispatch({ type: "ERROR", error: "Ocurrió un error" });
  }
};

type UseFetchResponse<T> = [
  T | undefined,
  boolean,
  (params: GetParams) => void,
  () => void
];

export default <T extends {} = {}>(
  props?: UseFetchProps
): UseFetchResponse<T> => {
  const lastCall = useRef<GetParams | null>(null);
  const callRef = useRef<number>(0);
  const { onInit } = props || {};
  const [{ loading, error, response }, dispatch] = useReducer<ReducerType<T>>(
    reducer,
    {
      loading: false,
      response: undefined,
      error: undefined,
    }
  );

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  useEffect(() => {
    if (onInit && callRef.current === 0) {
      callRef.current = callRef.current + 1;
      lastCall.current = onInit;
      fetchData<T>(dispatch, onInit);
    }
  }, [onInit]);

  const call = useCallback(
    (params: GetParams) => {
      if (!loading) {
        callRef.current = callRef.current + 1;
        fetchData<T>(dispatch, {
          url: lastCall.current?.url || params.url,
          ...params,
        });
      }
    },
    [dispatch, loading]
  );

  const clean = useCallback(() => {
    dispatch({ type: "CLEAN" });
  }, []);

  return [response, loading, call, clean];
};
