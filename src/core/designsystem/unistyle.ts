import { theme } from './theme.ts';
import { UnistylesRegistry } from 'react-native-unistyles';

export type AppThemes = {
  light: typeof theme;
};

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

UnistylesRegistry.addThemes({
  light: theme,
});


