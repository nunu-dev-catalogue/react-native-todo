import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './feature/home/screen/HomeScreen.tsx';
import TaskRegisterScreen from './feature/register/screen/TaskRegisterScreen.tsx';
import DetailScreen from './feature/detail/screen/DetailScreen.tsx';
import './core/designsystem/unistyle.ts';
import 'react-native-reanimated';
import 'react-native-gesture-handler';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={'Home'}
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name={'Register'} component={TaskRegisterScreen} />
          <Stack.Screen name={'Detail'} component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
