import { domAnimation, LazyMotion, MotionConfig } from 'framer-motion';
import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { ThemeProvider } from './components/common/ThemeProvider';
import { MainLayout } from './layouts/MainLayout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import RouteError from './pages/RouteError';

// Case studies are split out so the home page loads only what it needs,
// then fetched in the background once the browser is idle so navigation stays instant.
// A failed load (offline, interrupted prefetch) is not cached, so the next attempt retries.
let projectDetails: Promise<typeof import('./pages/ProjectDetails')> | undefined;
const loadProjectDetails = () =>
  (projectDetails ??= import('./pages/ProjectDetails').catch((error: unknown) => {
    projectDetails = undefined;
    throw error;
  }));
const ProjectDetails = lazy(loadProjectDetails);

if (typeof window !== 'undefined') {
  const prefetch = () => void loadProjectDetails().catch(() => undefined);
  if ('requestIdleCallback' in window) window.requestIdleCallback(prefetch, { timeout: 4000 });
  else setTimeout(prefetch, 2500);
}

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
        {/* Only the DOM animation features are bundled (strict: no full `motion` components). */}
        <LazyMotion features={domAnimation} strict>
          {/* Honors prefers-reduced-motion for every animation. */}
          <MotionConfig reducedMotion="user">
            <RouterProvider router={router} />
          </MotionConfig>
        </LazyMotion>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
