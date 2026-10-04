import { isRouteErrorResponse, useRouteError } from 'react-router';
import { ErrorState } from '../components/common/ErrorState';
import NotFound from './NotFound';

/** Router-level error element: 404s get the not-found page, anything else a recoverable error. */
export default function RouteError() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) return <NotFound />;

  console.error(error);
  return (
    <ErrorState
      code="error"
      title="This page failed to load."
      message="Something went wrong while loading this page. Try reloading, or head back home."
      showReload
    />
  );
}
