import { lazy } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { APP_ROUTES } from './constants';
import { Layout } from './layout/Layout';

const TodoPage = lazy(() => import('@pages/Todo'));
const NotFoundPage = lazy(() => import('@pages/NotFound'));

const AppRouter = () => {
  const { home, todo, notFound } = APP_ROUTES;
  return (
    <BrowserRouter>
      <Routes>
        <Route path={home} element={<Navigate to={todo} />} />
        <Route path={home} element={<Layout />}>
          <Route index path={todo} element={<TodoPage />} />
          <Route path={notFound} element={<NotFoundPage />} />
        </Route>
        <Route path="*" element={<Navigate to={notFound} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
