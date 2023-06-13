import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationState } from '../redux';
import { connect } from 'react-redux';
import { FC } from 'react';
import SplashScreen from '../screens/SplashScreen';
import TabNavigator from './TabNavigator';

const AppNavigation: FC = props => {
  const [loading, setLoading] = useState(true);

  return loading ? (
    <SplashScreen loading={loading} setLoading={setLoading} />
  ) : (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

const mapToStateProps = (state: ApplicationState) => ({
});

export default connect(mapToStateProps)(AppNavigation);
