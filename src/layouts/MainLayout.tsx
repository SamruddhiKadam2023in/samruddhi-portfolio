import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { ScrollManager } from '../components/common/ScrollManager';
import { Footer } from '../components/navigation/Footer';
import { Navbar } from '../components/navigation/Navbar';
import { PageLoader } from '../components/common/PageLoader';

export function MainLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-contrast focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <ScrollManager />
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
