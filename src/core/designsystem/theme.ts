import color from './color.ts';
import typography from './typography.tsx';

export const theme = {
  colors: {
    background: color.lightblue,
    onBackground: color.black,
    surface: color.white,
    onSurface: color.black,
    primary: color.red,
    surfaceContainer: color.gray500,
    onSurface500: color.gray500,
    onSurface400: color.gray400,
    onSurface300: color.gray300,
    onSurface200: color.gray200,
    onSurface100: color.gray100,
  },
  typography: {
    title: typography.title,
    bodySemiBold: typography.bodySemiBold,
    bodyMedium: typography.bodyMedium,
    bodyRegular: typography.bodyRegular,
    captionMedium: typography.captionMedium,
    captionRegular: typography.captionRegular,
  },
} as const;
