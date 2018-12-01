import WebsiteLayout from '../layouts/WebsiteLayout';

import RedirectToPathContext from '../pages/RedirectToPathContext';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';

/**
 * Layout: Componente de Layout (HOC)
 */
export default [
  {
    layout: WebsiteLayout,
    page: HomePage,
    path: '/',
    exact: true,
  },
  {
    layout: WebsiteLayout,
    page: AboutPage,
    path: '/sobre',
    exact: true,
  },
  {
    page: RedirectToPathContext,
  },
];
