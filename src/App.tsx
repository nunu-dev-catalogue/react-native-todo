import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DevToolsBubble } from 'react-native-react-query-devtools';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './feature/home/screen/HomeScreen.tsx';
import TaskRegisterScreen from './feature/register/screen/TaskRegisterScreen.tsx';
import DetailScreen from './feature/detail/screen/DetailScreen.tsx';
import './core/designsystem/unistyle.ts';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  // const [_, setTasks] = useState<Tables<'tasks'>[]>([]);
  // useEffect(() => {
  //   async function fetchTasks() {
  //     const {data} = await supabase.from('tasks').select();
  //     if (data !== null) {
  //       setTasks(data);
  //     }
  //   }
  //
  //   fetchTasks().then(() => {
  //     console.log('Tasks fetched');
  //   });
  // }, []);

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
      <DevToolsBubble />
    </QueryClientProvider>
  );
}

export default App;
