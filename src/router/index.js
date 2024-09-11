import React from 'react';
import authRoutes from 'src/modules/auth/config/routes';
import appRoutes from 'src/modules/app/config/routes';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const routes = [...authRoutes, ...appRoutes];

function AppRouter() {
  return (
    <>
      <Routes>
        {routes.map(({ title, component: Component, url, exact }) => {
          return <Route exact key={url} path={url} element={<Component />} />;
        })}
      </Routes>
    </>
  );
}

export default AppRouter;
