import DefaultTheme from 'vitepress/theme';
import CustomLayout from './components/CustomLayout.vue';

import './scripts/edit-link';
import './styles/index.scss';

export default {
  ...DefaultTheme,
  Layout: CustomLayout,
};
