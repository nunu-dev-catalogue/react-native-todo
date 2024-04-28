/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import supabase from '../supabase';
import {Tables} from '../supabase/supabase.type.ts';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {DevToolsBubble} from "react-native-react-query-devtools";

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [tasks, setTasks] = useState<Tables<'tasks'>[]>([]);
  useEffect(() => {
    async function fetchTasks() {
      const {data} = await supabase.from('tasks').select();
      if (data !== null) {
        setTasks(data);
      }
    }

    fetchTasks().then(() => {
      console.log('Tasks fetched');
    });
  }, []);
  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}>
            <Header />
          </ScrollView>
        </SafeAreaView>
      </NavigationContainer>
      <DevToolsBubble />
    </QueryClientProvider>
  );
}

export default App;
