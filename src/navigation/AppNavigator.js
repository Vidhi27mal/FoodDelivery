import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Register from "../screens/auth/register";


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

       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;