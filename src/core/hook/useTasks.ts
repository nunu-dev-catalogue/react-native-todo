import { useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import supabase from '../../../supabase';
import { Task } from '../type/task.ts';
import useFetchTasks from './useFetchTasks.ts';

function useTasks() {
  const [totalTasks, setTotalTasks] = useState<Task[]>([]);
  const [progressingTasks, setProgressingTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [likedTasks, setLikedTasks] = useState<Task[]>([]);
  const queryClient = useQueryClient();

  const { tasks, isFetching } = useFetchTasks();

  useEffect(() => {
    if (tasks) {
      setTotalTasks(tasks);
    }
  }, [tasks]);

  useEffect(() => {
    if (!isEmpty(totalTasks)) {
      setProgressingTasks(totalTasks.filter(task => !task.completed));
      setCompletedTasks(totalTasks.filter(task => task.completed));
      setLikedTasks(totalTasks.filter(task => task.like));
    }
  }, [totalTasks]);

  const { mutate: mutateLike } = useMutation({
    mutationFn: async ({ id, like }: { id: number; like: boolean }) => {
      await supabase.from('tasks').update({ id, like });
    },
    onMutate: async ({ id, like }: { id: number; like: boolean }) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousState = queryClient.getQueryData(['tasks']);
      const updatedTasks = produce(totalTasks, draft => {
        const task = draft.find(it => it.id === id);
        if (task) {
          task.like = like;
        }
      });
      queryClient.setQueryData(['tasks'], updatedTasks);
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
      await supabase.from('tasks').update({ id, completed });
    },
    onMutate: async ({ id, completed }: { id: number; completed: boolean }) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousState = queryClient.getQueryData(['tasks']);
      const updatedTasks = produce(totalTasks, draft => {
        const task = draft.find(it => it.id === id);
        if (task) {
          task.completed = completed;
        }
      });
      queryClient.setQueryData(['tasks'], updatedTasks);
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
