import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import CartScreen from '../../screens/CartScreen';
import { FC } from 'react';
import TabBarGenerator from './TabBarGenerator';

const Tab = createBottomTabNavigator();

const TabNavigator: FC = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: 'blue'
        }
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => (
          <TabBarGenerator route={route} focused={focused} />
        ),
        tabBarLabel: () => null
      })}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="CartScreen" component={CartScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
