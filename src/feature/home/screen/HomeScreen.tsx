import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TodoListScreen from './TodoListScreen.tsx';
import LikedTaskScreen from './LikedTaskScreen.tsx';

const Tab = createBottomTabNavigator();

function HomeScreen(): React.JSX.Element {
  return (
    <Tab.Navigator initialRouteName={'Todo'} backBehavior={'history'}>
      <Tab.Screen name="Todo" component={TodoListScreen} />
      <Tab.Screen name="Liked" component={LikedTaskScreen} />
    </Tab.Navigator>
  );
}

export default HomeScreen;
