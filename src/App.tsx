import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './playground/components/AppShell';
import { ErrorBoundary } from './playground/components/ErrorBoundary';
import { ComponentPage } from './playground/pages/ComponentPage';
import { HomePage } from './playground/pages/HomePage';
import { NotFound } from './playground/pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<HomePage />} />
            <Route path="/components/:slug" element={<ComponentPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
