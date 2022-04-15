import { ReactNode, createContext, useMemo, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import authReducer, { AuthActionTypes, AuthData } from '../stores/AuthStore';

type Props = {
  children: ReactNode;
};

type UserInput = {
  username: string;
  password: string;
};

interface AuthContextInterface {
  signIn: (data: UserInput) => void;
  signOut: () => void;
  signUp: () => void;
  payload: AuthData;
}

export const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);

export default function AuthProvider({ children }: Props) {
  const [state, dispatch] = authReducer();

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: AuthActionTypes.RestoreToken, token: userToken ?? null });
    };

    bootstrapAsync();
  }, [state.userToken]);

  const authContext = useMemo(
    () => ({
      signIn: async (data: UserInput) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        if (!data.username.length) return console.log('Not username submitted');
        const token = 'dummy-auth-token';
        await SecureStore.setItemAsync('userToken', token);
        dispatch({ type: AuthActionTypes.SignIn, token });
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync('userToken');
        dispatch({ type: AuthActionTypes.SignOut, token: null });
      },
      signUp: async () => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        const token = await SecureStore.getItemAsync('userToken');
        dispatch({ type: AuthActionTypes.RestoreToken, token });
      },
      payload: state,
    }),
    [state],
  );

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}
