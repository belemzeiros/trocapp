import WebsiteLayout from '../layouts/WebsiteLayout';

import RedirectToPathContext from '../pages/RedirectToPathContext';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import ContactPage from '../pages/ContactPage';

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
    path: '/produto/:id',
    exact: true,
  },
  {
    layout: WebsiteLayout,
    page: ContactPage,
    path: '/fale-conosco',
    exact: true,
  },
  {
    page: RedirectToPathContext,
  },
];
