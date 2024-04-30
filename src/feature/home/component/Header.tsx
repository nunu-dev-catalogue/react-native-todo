import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import color from '../../../core/designsystem/color.ts';

function Header({
  title,
  isCompletedTaskShown,
  onToggleCompletedTaskVisibility,
}: {
  title: string;
  isCompletedTaskShown: boolean;
  onToggleCompletedTaskVisibility: () => void;
}): React.JSX.Element {
  const { styles } = useStyles(stylesheet);
  const text = isCompletedTaskShown ? '완료 숨기기' : '완료 보기';
  const backgroundColor = isCompletedTaskShown ? color.black : color.red;
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Pressable onPress={onToggleCompletedTaskVisibility}>
        <View style={StyleSheet.compose(styles.hide, { backgroundColor })}>
          <Text style={styles.hideText}>{text}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
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
}));

export default Header;
