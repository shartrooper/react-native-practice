import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createContext, useContext, useState } from 'react';
import { Props } from '../generaltypes';
import { RootStackParamList, RootTabParamList } from '../types';

export const MODAL_STACK_NAME = 'ErrorModal';

type Navigator = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface ErrorMessageContextInterface {
  message: string;
  displayErrorModal: (msg: string, navigator: Navigator) => void;
}

export const ErrorContext = createContext<ErrorMessageContextInterface>({} as ErrorMessageContextInterface);

export default function ErrorMsgProvider({ children }: Props) {
  const [msgContent, setMsgContent] = useState<string>('');

  const errorContext = {
    message: msgContent,
    displayErrorModal: (message: string, navigator: Navigator) => {
      setMsgContent(message);
      navigator.navigate(MODAL_STACK_NAME);
    },
  };

  return <ErrorContext.Provider value={errorContext}>{children}</ErrorContext.Provider>;
}
