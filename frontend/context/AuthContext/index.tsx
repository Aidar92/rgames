import { User } from "../../api/user";
import { Locale } from "../../types";
import { Auth } from "../../api/auth";
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useReducer,
} from "react";
import { authTokenStorage } from "../../lib/authTokenStorage";
import { useRouter } from "next/router";
import { parseJwt } from "../../lib";

enum ActionType {
  AUTH_ERROR = "AUTH_ERROR",
  AUTH_START = "AUTH_START",
  CLEAR_AUTH_ERROR = "CLEAR_AUTH_ERROR",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

type ReducerState = {
  authError: string | null;
  authInProgress: boolean;
  isAuthorized: boolean;
  userData: User.Model | null;
};

type ReducerAction = {
  type: ActionType;
  payload?: any;
};

const initReducerState = (storedAuthToken?: string | null): ReducerState => ({
  authError: null,
  authInProgress: Boolean(storedAuthToken),
  isAuthorized: false,
  userData: null,
});

const reducer = (
  state: ReducerState,
  { type, payload }: ReducerAction
): ReducerState => {
  switch (type) {
    case ActionType.AUTH_START:
      return {
        ...state,
        authError: null,
        authInProgress: true,
        isAuthorized: false,
      };
    case ActionType.LOGIN:
      return {
        ...state,
        authInProgress: false,
        isAuthorized: true,
        userData: payload,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        authInProgress: false,
        isAuthorized: false,
      };
    case ActionType.AUTH_ERROR:
      return {
        ...state,
        authError: payload,
        authInProgress: false,
        isAuthorized: false,
      };
    case ActionType.CLEAR_AUTH_ERROR:
      return {
        ...state,
        authError: null,
      };
    default:
      throw new Error("Invalid reducer action name at auth.");
  }
};

type AuthContextState = {
  authState: ReducerState;
  changeLocale: (locale: Locale) => void;
  clearAuthError: () => void;
  logIn: (params: Auth.LoginParams) => void;
  logOut: () => void;
  signup: (params: Auth.LoginParams) => void;
};

const AuthContext = createContext<AuthContextState>({
  authState: initReducerState(),
  changeLocale: () => null,
  clearAuthError: () => null,
  logIn: () => null,
  logOut: () => null,
  signup: () => null,
});

const AuthProvider: React.FC<PropsWithChildren<{}>> = (props) => {
  const { children } = props;

  const router = useRouter();

  const [state, dispatch] = useReducer(
    reducer,
    authTokenStorage.get(),
    initReducerState
  );

  const clearAuthError = useCallback(() => {
    dispatch({ type: ActionType.CLEAR_AUTH_ERROR });
  }, []);

  const logIn = useCallback(
    async (params: Auth.LoginParams) => {
      dispatch({ type: ActionType.AUTH_START });
      try {
        const authData = await Auth.controller.login(params);
        authTokenStorage.store(authData.token);
        const userData = parseJwt(authData.token);
        dispatch({ type: ActionType.LOGIN, payload: userData });
        await router.push("/profile");
      } catch (err) {
        dispatch({ type: ActionType.AUTH_ERROR, payload: err });
      }
    },
    [router]
  );

  const logOut = useCallback(() => {
    authTokenStorage.remove();
    dispatch({ type: ActionType.LOGOUT });
  }, []);

  const signup = useCallback(
    async (params: Auth.LoginParams) => {
      dispatch({ type: ActionType.AUTH_START });
      try {
        const authData = await Auth.controller.signup(params);
        authTokenStorage.store(authData.token);
        const userData = parseJwt(authData.token);
        dispatch({ type: ActionType.LOGIN, payload: userData });
        await router.push("/profile");
      } catch (err) {
        dispatch({ type: ActionType.AUTH_ERROR, payload: err });
      }
    },
    [router]
  );

  const renewToken = useCallback(async () => {
    const storedToken = authTokenStorage.get();
    if (storedToken) {
      dispatch({ type: ActionType.LOGIN, payload: parseJwt(storedToken) });
    }
  }, []);

  useEffect(() => {
    renewToken();
  }, [renewToken]);

  const changeLocale = useCallback(() => {}, []);

  return (
    <AuthContext.Provider
      value={{
        authState: state,
        changeLocale,
        clearAuthError,
        logIn,
        logOut,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
