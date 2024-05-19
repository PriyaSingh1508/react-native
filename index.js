import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import * as React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { persistor } from './src/redux/store.ts'; 
import store from './src/redux/store.ts'; 
import { PersistGate } from 'redux-persist/integration/react';


const Root = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
