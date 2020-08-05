import React from 'react';
import { Switch, Route } from 'react-router-dom';

export const layoutHoc = (route, extraProps) => props =>
  route.layout ? (
    route.layout({ ...props, ...extraProps, route })
  ) : (
    <route.page {...props} {...extraProps} route={route} />
  );

const renderRoutes = (routes, extraProps = {}, switchProps = {}) =>
  routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={layoutHoc(route, extraProps)}
        />
      ))}
    </Switch>
  ) : null;

export default renderRoutes;
