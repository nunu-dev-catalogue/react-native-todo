import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { AppThemes } from '../../../core/designsystem/unistyle.ts';

function TodoListScreen(): React.JSX.Element {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>To-do</Text>
        <Pressable onPress={() => {}}>
          <View style={styles.hide}>
            <Text style={styles.hideText}>완료 숨기기</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.contents}>{/* Your code here */}</View>
    </View>
  );
}

const stylesheet = createStyleSheet(({ light: theme }: AppThemes) => ({
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
  },
}));

export default TodoListScreen;
