import {theme} from './theme.ts';
import {UnistylesRegistry} from 'react-native-unistyles';

export type AppThemes = {
  light: typeof theme;
};

UnistylesRegistry.addThemes({
  light: theme,
});
