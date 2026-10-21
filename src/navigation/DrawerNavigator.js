import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../screens/Home';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: 280,
          backgroundColor: '#FFFFFF',
        },
        drawerActiveTintColor: '#00BF63',
        drawerInactiveTintColor: '#333333',
        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: '600',
          marginLeft: -10,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerLabel: 'Home',
          drawerEmoji: '🏠',
        }}
      />

      <Drawer.Screen
        name="My Orders"
        component={Home}
        options={{
          drawerLabel: 'My Orders',
        }}
      />

      <Drawer.Screen
        name="Favorites"
        component={Home}
        options={{
          drawerLabel: 'Favorites',
        }}
      />

      <Drawer.Screen
        name="My Profile"
        component={Home}
        options={{
          drawerLabel: 'My Profile',
        }}
      />

      <Drawer.Screen
        name="My Addresses"
        component={Home}
        options={{
          drawerLabel: 'My Addresses',
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={Home}
        options={{
          drawerLabel: 'Settings',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;