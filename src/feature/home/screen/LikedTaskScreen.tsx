import React from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { AppThemes } from '../../../core/designsystem/unistyle.ts';

function LikedTaskScreen(): React.JSX.Element {
  const { styles } = useStyles(stylesheet);
  return <View style={styles.container}>{/* Your code here */}</View>;
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

export default LikedTaskScreen;
