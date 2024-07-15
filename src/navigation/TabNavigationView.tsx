import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MoreNavigationView from './MoreNavigationView';
import ExpenseNavigationView from './ExpenseNavigationView';
import IncomeNavigationView from './IncomeNavigationView';

const Tab = createBottomTabNavigator();

const TabNavigationView = () => {
  return (
    <Tab.Navigator
      initialRouteName="Expense"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Expense"
        component={ExpenseNavigationView}
        options={{
          tabBarLabel: 'Expense',
          tabBarActiveTintColor: '#1F41BB',
          tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons name="basket" color="#1F41BB" size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Income"
        component={IncomeNavigationView}
        options={{
          tabBarLabel: 'Income',
          tabBarActiveTintColor: '#1F41BB',
          tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons name="cash" color="#1F41BB" size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreNavigationView}
        options={{
          tabBarLabel: 'More',
          tabBarActiveTintColor: '#1F41BB',
          tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons name="more" color="#1F41BB" size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigationView;
