import { useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import supabase from '../../../supabase';
import { Task } from '../type/task.ts';
import useFetchTasks from './useFetchTasks.ts';

function useTasks() {
  const [progressingTasks, setProgressingTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [likedTasks, setLikedTasks] = useState<Task[]>([]);
  const queryClient = useQueryClient();

  const { tasks, isFetching } = useFetchTasks();

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
      if (tasks) {
        const updatedTasks = produce(tasks, draft => {
          const index = draft.findIndex(it => it.id === id);
          draft[index].like = !like;
        });
        queryClient.setQueryData(['tasks'], updatedTasks);
      }
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
      if (tasks) {
        const updatedTasks = produce(tasks, draft => {
          const index = draft.findIndex(it => it.id === id);
          draft[index].completed = !completed;
        });
        queryClient.setQueryData(['tasks'], updatedTasks);
      }
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
