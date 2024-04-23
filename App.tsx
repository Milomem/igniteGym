import {  StatusBar } from 'react-native';

import { NativeBaseProvider } from 'native-base'
import { THEME } from 'src/theme';

import { useFonts, Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto'

import { Loading } from '@components/loading';
import { Routes } from '@routes/index';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold});

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
      barStyle="light-content" 
      backgroundColor="transparent"
      translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </NativeBaseProvider>
  );
}
