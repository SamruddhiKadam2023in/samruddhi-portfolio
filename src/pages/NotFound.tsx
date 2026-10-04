import { ArrowLeft } from 'lucide-react';
import { ButtonLink } from '../components/common/Button';
import { ErrorState } from '../components/common/ErrorState';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle('Page not found');

  return (
    <ErrorState
      code="404"
      title="This page doesn’t exist."
      message="The link may be broken, or the page may have moved."
    >
      <ButtonLink href="/" icon={<ArrowLeft size={16} aria-hidden />} iconPosition="start">
        Back to home
      </ButtonLink>
      <ButtonLink href="/#projects" variant="secondary">
        View projects
      </ButtonLink>
    </ErrorState>
  );
}
