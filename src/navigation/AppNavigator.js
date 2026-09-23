import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Register from "../screens/auth/register";
import OtpVerification from "../screens/auth/otpVerification";


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="register"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="register"
          component={Register}
        />
        <Stack.Screen
          name="otpVerification"
          component={OtpVerification}
        />

       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;