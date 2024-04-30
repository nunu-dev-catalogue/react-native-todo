import { TextStyle } from 'react-native';

interface Typography {
  title: TextStyle;
  bodySemiBold: TextStyle;
  bodyMedium: TextStyle;
  bodyRegular: TextStyle;
  captionMedium: TextStyle;
  captionRegular: TextStyle;
}

const typography: Typography = {
  title: {
    fontSize: 24,
    fontFamily: 'stretch_pro',
    lineHeight: 36,
  },
  bodySemiBold: {
    fontSize: 16,
    fontFamily: 'pretendard_semibold',
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 16,
    fontFamily: 'pretendard_medium',
    lineHeight: 24,
  },
  bodyRegular: {
    fontSize: 16,
    fontFamily: 'pretendard_regular',
    lineHeight: 24,
  },
  captionMedium: {
    fontSize: 13,
    fontFamily: 'pretendard_medium',
    lineHeight: 20,
  },
  captionRegular: {
    fontSize: 12,
    fontFamily: 'pretendard_regular',
    lineHeight: 18,
  },
};

export default typography;
