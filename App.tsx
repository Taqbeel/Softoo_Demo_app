import React from 'react';
import {FC} from 'react';
import {Provider} from 'react-redux';
import AppNavigation from './src/navigation';
import {store} from './src/redux';
import {LogBox, StatusBar} from 'react-native';
import Wrapper from './src/components/Wrapper';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const App: FC = () => {
  return (
        <Provider store={store}>
          <Wrapper>
            <StatusBar hidden />
            <AppNavigation />
          </Wrapper>
        </Provider>
  );
};

export default App;
