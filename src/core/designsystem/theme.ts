import { TextStyle } from "react-native";
import color from './color.ts';
import typography from './typography.tsx';

type Theme = {
  colors: {
    background: string;
    onBackground: string;
    surface: string;
    onSurface: string;
    primary: string;
    surfaceContainer: string;
    onSurface500: string;
    onSurface400: string;
    onSurface300: string;
    onSurface200: string;
    onSurface100: string;
  };
  typography: {
    title: TextStyle;
    bodySemiBold: TextStyle;
    bodyMedium: TextStyle;
    bodyRegular: TextStyle;
    captionMedium: TextStyle;
    captionRegular: TextStyle;
  };
};

export const theme: Theme = {
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
