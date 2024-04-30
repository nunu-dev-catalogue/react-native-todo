import { FlashList } from '@shopify/flash-list';
import React, { useCallback } from 'react';
import { Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Task } from '../../../core/type/task.ts';
import NotChecked from '../../../assets/images/ic_task_checked_default.svg';
import Checked from '../../../assets/images/ic_task_checked_done.svg';
import Liked from '../../../assets/images/ic_liked_filled.svg';
import NotLiked from '../../../assets/images/ic_liked_default.svg';

type Props = {
  title: string;
  tasks: Task[];
  onMutateLike: ({ id, like }: { id: number; like: boolean }) => void;
  onMutateComplete: ({
    id,
    completed,
  }: {
    id: number;
    completed: boolean;
  }) => void;
};

function TaskList({
  title,
  tasks,
  onMutateComplete,
  onMutateLike,
}: Props): React.JSX.Element {
  const { styles } = useStyles(stylesheet);
  const itemRenderer = useCallback(
    ({ item }: { item: Task }) => {
      console.log({ item });
      return (
        <View style={styles.itemContainer}>
          <View style={styles.itemHeader}>
            <TouchableHighlight
              onPress={() =>
                onMutateComplete({ id: item.id, completed: !item.completed })
              }>
              <View>{item.completed ? <Checked /> : <NotChecked />}</View>
            </TouchableHighlight>
            <View style={styles.itemHeaderSpacer} />
            <Text style={styles.itemTitle}>{item.title}</Text>
          </View>
          <TouchableOpacity
            onPress={() => onMutateLike({ id: item.id, like: !item.like })}>
            <View>{item.like ? <Liked /> : <NotLiked />}</View>
          </TouchableOpacity>
        </View>
      );
    },
    [
      onMutateComplete,
      onMutateLike,
      styles.itemContainer,
      styles.itemHeader,
      styles.itemHeaderSpacer,
      styles.itemTitle,
    ],
  );

  return (
    <View style={styles.listContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.spacer} />
      <FlashList renderItem={itemRenderer} data={tasks} />
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  title: {
    fontSize: theme.typography.bodySemiBold.fontSize,
    lineHeight: theme.typography.bodySemiBold.lineHeight,
    fontFamily: theme.typography.bodySemiBold.fontFamily,
    color: theme.colors.onBackground,
  },
  spacer: {
    height: 12,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface,
    width: '100%',
    padding: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemHeaderSpacer: {
    width: 16,
  },
  itemTitle: {
    fontSize: theme.typography.bodyRegular.fontSize,
    lineHeight: theme.typography.bodyRegular.lineHeight,
    fontFamily: theme.typography.bodyRegular.fontFamily,
    color: theme.colors.onBackground,
  },
  listContainer: {
    flex: 1,
    width: '100%',
  },
}));

export default TaskList;
