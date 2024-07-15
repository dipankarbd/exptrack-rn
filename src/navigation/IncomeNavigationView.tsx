import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IncomeStackParams } from './types';
import IncomeScreen from '../components/income/IncomeScreen';
import AddIncomeScreen from '../components/income/AddIncomeScreen';
import EditIncomeScreen from '../components/income/EditIncomeScreen';

const IncomeStack = createNativeStackNavigator<IncomeStackParams>();

const IncomeNavigationView = () => {
  return (
    <IncomeStack.Navigator
      initialRouteName="IncomeHome"
      screenOptions={{
        headerShown: true,
      }}>
      <IncomeStack.Screen
        name="IncomeHome"
        component={IncomeScreen}
        options={{ title: 'Income' }}
      />
      <IncomeStack.Screen
        name="AddIncome"
        component={AddIncomeScreen}
        options={{ title: 'Add Income' }}
      />

      <IncomeStack.Screen
        name="EditIncome"
        component={EditIncomeScreen}
        options={{ title: 'Edit Income' }}
      />
    </IncomeStack.Navigator>
  );
};

export default IncomeNavigationView;
