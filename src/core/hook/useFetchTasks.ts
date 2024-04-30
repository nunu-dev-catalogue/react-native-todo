import { useQuery } from '@tanstack/react-query';
import supabase from '../../../supabase';

function useFetchTasks() {
  const { data, isFetching } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data: tasks, error } = await supabase.from('tasks').select('*');
      return { tasks, error };
    },
  });

  return {
    tasks: data?.tasks,
    isFetching,
  };
}

export default useFetchTasks;
