import WebsiteLayout from '../layouts/WebsiteLayout';

import RedirectToPathContext from '../pages/RedirectToPathContext';
import HomePage from '../pages/HomePage';

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
    page: RedirectToPathContext,
  },
];
