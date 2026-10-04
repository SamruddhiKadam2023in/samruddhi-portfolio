import { MotionConfig } from 'framer-motion';
import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { ThemeProvider } from './components/common/ThemeProvider';
import { MainLayout } from './layouts/MainLayout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import RouteError from './pages/RouteError';

// Case studies are split out so the home page loads only what it needs.
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <RouteError />,
    children: [
      {
        // Pathless route so page errors render inside the layout (nav + footer stay visible).
        errorElement: <RouteError />,
        children: [
          { index: true, element: <Home /> },
          { path: 'projects/:slug', element: <ProjectDetails /> },
          { path: '*', element: <NotFound /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        {/* Honors prefers-reduced-motion for every Framer Motion animation. */}
        <MotionConfig reducedMotion="user">
          <RouterProvider router={router} />
        </MotionConfig>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
