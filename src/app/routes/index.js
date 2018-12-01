import WebsiteLayout from '../layouts/WebsiteLayout';

import RedirectToPathContext from '../pages/RedirectToPathContext';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ProductDetailPage from '../pages/ProductDetailPage';

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
    layout: WebsiteLayout,
    page: ProductDetailPage,
    path: '/detalhe-produto',
    exact: true,
  },
  {
    page: RedirectToPathContext,
  },
];
