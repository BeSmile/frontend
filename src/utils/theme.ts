import { Theme } from '@mui/material/styles';
import { CSSProperties } from '@mui/material/styles/createMixins';

/**
 * 获取mui组件的media尺寸
 * @param componentName
 * @param theme
 */
export const getThemeMedia = (componentName: 'toolbar', theme: Theme): CSSProperties | undefined => {
  const component = theme.mixins[componentName];
  const breakpoints = theme.breakpoints;
  const values = Object.values(breakpoints.values).sort((a, b) => a - b);
  let i = 0;
  let media: CSSProperties | undefined = undefined;
  while (i < values.length) {
    const mediaKey = `@media (min-width:${values[i]}${breakpoints.unit})`;
    if (!component?.[mediaKey]) {
      break;
    }
    i++;
    media = component?.[mediaKey] as CSSProperties;
  }
  return media;
};
