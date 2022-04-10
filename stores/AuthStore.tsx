import { useReducer } from 'react';

const INITIALIZE_AUTH_DATA = {
  isLoading: true,
  isSignout: false,
  userToken: null,
};

export type AuthData = Omit<typeof INITIALIZE_AUTH_DATA, 'userToken'> & { userToken: string | null };

export enum AuthActionTypes {
  RestoreToken,
  SignIn,
  SignOut,
}

type AuthAction = {
  type: AuthActionTypes;
  token?: string | null;
};

function authStore(prevState: AuthData, action: AuthAction): AuthData {
  const { RestoreToken, SignIn, SignOut } = AuthActionTypes;
  const userToken = action.token as string | null;

  switch (action.type) {
    case RestoreToken:
      return {
        ...prevState,
        userToken,
        isLoading: false,
      };
    case SignIn:
      return {
        ...prevState,
        isSignout: false,
        userToken,
      };
    case SignOut:
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      };
    default:
      return prevState;
  }
}

export default function authReducer() {
  const [state, dispatch] = useReducer(authStore, INITIALIZE_AUTH_DATA);
  return [state, dispatch] as const;
}
