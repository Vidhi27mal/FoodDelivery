import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import Register from '../screens/auth/register';
import OtpVerification from '../screens/auth/otpVerification';
import Login from '../screens/auth/login';
import ForgotPassword from '../screens/auth/ForgotPassword';
import ResetPasswordOtp from '../screens/auth/ResetPasswordOtp';
import ResetPassword from '../screens/auth/ResetPassword';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="splash" component={SplashScreen} />

        <Stack.Screen name="register" component={Register} />

        <Stack.Screen
          name="otpVerification"
          component={OtpVerification}
        />

        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
        />

        <Stack.Screen
          name="ResetPasswordOtp"
          component={ResetPasswordOtp}
        />

        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;