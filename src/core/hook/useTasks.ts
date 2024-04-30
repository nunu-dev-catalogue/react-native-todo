import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import supabase from '../../../supabase';
import { Task } from '../type/task.ts';

function useTasks() {
  const [progressingTasks, setProgressingTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [likedTasks, setLikedTasks] = useState<Task[]>([]);
  const queryClient = useQueryClient();

  const { data: tasks, isFetching } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data: tasks } = await supabase.from('tasks').select('*');
      return tasks;
    },
  });

  useEffect(() => {
    if (tasks && !isEmpty(tasks)) {
      setProgressingTasks(tasks.filter(task => !task.completed));
      setCompletedTasks(tasks.filter(task => task.completed));
      setLikedTasks(tasks.filter(task => task.like));
    }
  }, [tasks, queryClient]);

  const { mutate: mutateLike } = useMutation({
    mutationFn: async ({ id, like }: { id: number; like: boolean }) => {
      try {
        await supabase.from('tasks').update({ like }).eq('id', id);
      } catch (error) {
        console.error(error);
      }
    },
    onMutate: async ({ id, like }: { id: number; like: boolean }) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousState = queryClient.getQueryData(['tasks']);

      queryClient.setQueryData(['tasks'], (previous: Task[]) => {
        return previous.map(task =>
          task.id === id ? { ...task, like } : task,
        );
      });
      return { previousState };
    },
    onError: (error, variables, context) => {
      if (context?.previousState) {
        queryClient.setQueryData(['tasks'], context.previousState);
      }
    },
  });

  const { mutate: mutateComplete } = useMutation({
    mutationFn: async ({
      id,
      completed,
    }: {
      id: number;
      completed: boolean;
    }) => {
      await supabase.from('tasks').update({ completed }).eq('id', id);
    },
    onMutate: async ({ id, completed }: { id: number; completed: boolean }) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousState = queryClient.getQueryData(['tasks']);

      queryClient.setQueryData(['tasks'], (previous: Task[]) => {
        return previous.map(task =>
          task.id === id ? { ...task, completed } : task,
        );
      });
      return { previousState };
    },
    onError: (error, variables, context) => {
      if (context?.previousState) {
        queryClient.setQueryData(['tasks'], context.previousState);
      }
    },
  });

  return {
    progressingTasks,
    completedTasks,
    likedTasks,
    isFetching,
    mutateLike,
    mutateComplete,
  };
}

export default useTasks;
