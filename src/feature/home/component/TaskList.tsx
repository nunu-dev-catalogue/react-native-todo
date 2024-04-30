import { FlashList } from '@shopify/flash-list';
import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Task } from '../../../core/type/task.ts';
import NotChecked from '../../../assets/images/ic_task_checked_default.svg';
import Checked from '../../../assets/images/ic_task_checked_done.svg';
import Liked from '../../../assets/images/ic_liked_filled.svg';
import NotLiked from '../../../assets/images/ic_liked_default.svg';

type Props = {
  title: string;
  tasks: Task[];
};

function TaskList({ title, tasks }: Props): React.JSX.Element {
  const { styles } = useStyles(stylesheet);
  const itemRenderer = useCallback(
    ({ item }: { item: Task }) => (
      <View style={styles.itemContainer}>
        <View style={styles.itemHeader}>
          {item.completed ? <Checked /> : <NotChecked />}
          <View style={styles.itemHeaderSpacer} />
          <Text style={styles.itemTitle}>{item.title}</Text>
        </View>
        {item.like ? <Liked /> : <NotLiked />}
      </View>
    ),
    [
      styles.itemContainer,
      styles.itemHeader,
      styles.itemHeaderSpacer,
      styles.itemTitle,
    ],
  );

  return (
    <View>
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
}));

export default TaskList;
