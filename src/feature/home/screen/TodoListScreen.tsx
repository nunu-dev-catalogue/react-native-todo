import React, { useState } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import useTasks from '../../../core/hook/useTasks.ts';
import Header from '../component/Header.tsx';
import TaskList from '../component/TaskList.tsx';

function TodoListScreen(): React.JSX.Element {
  const { styles } = useStyles(stylesheet);
  const [isCompletedTaskShown, setIsCompletedTaskShown] = useState(true);
  const { progressingTasks, completedTasks, mutateLike, mutateComplete } =
    useTasks();

  return (
    <View style={styles.container}>
      <Header
        title="To-do"
        isCompletedTaskShown={isCompletedTaskShown}
        onToggleCompletedTaskVisibility={() => {
          setIsCompletedTaskShown(!isCompletedTaskShown);
        }}
      />
      <View style={styles.contents}>
        <TaskList
          title="하는 중"
          tasks={progressingTasks}
          onMutateComplete={mutateComplete}
          onMutateLike={mutateLike}
        />
        <TaskList
          title="완료"
          tasks={completedTasks}
          onMutateComplete={mutateComplete}
          onMutateLike={mutateLike}
        />
        <View>{/* 완료 */}</View>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    height: 56,
    backgroundColor: theme.colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: theme.typography.title.fontFamily,
    fontSize: theme.typography.title.fontSize,
    lineHeight: theme.typography.title.lineHeight,
    color: theme.colors.onSurface,
  },
  hide: {
    backgroundColor: theme.colors.onSurface,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
  },
  hideText: {
    fontFamily: theme.typography.bodyRegular.fontFamily,
    fontSize: theme.typography.bodyRegular.fontSize,
    lineHeight: theme.typography.bodyRegular.lineHeight,
    color: theme.colors.surface,
  },
  contents: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
}));

export default TodoListScreen;
