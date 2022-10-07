import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../../types';
import LinkingConfiguration from './LinkingConfiguration';
import SignUpScreen from "../screens/SignUpScreen";
import {useAuthContext} from "../contexts/authContext";
import DrawerNavigator from "./DrawerNavigator";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    const {userId} = useAuthContext();

  return (
    <Stack.Navigator>
        {!userId ? (
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
        ) : (
            <>
                {/* @ts-ignore */}
                <Stack.Screen name="Root" component={DrawerNavigator} options={{headerShown: false}}/>
                {/*   @ts-ignore */}
                <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
            </>
        )}

    </Stack.Navigator>
  );
}
