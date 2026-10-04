import { ArrowLeft } from 'lucide-react';
import { ButtonLink } from '../components/common/Button';
import { ErrorState } from '../components/common/ErrorState';
import { usePageMeta } from '../hooks/usePageMeta';

export default function NotFound() {
  usePageMeta({ title: 'Page not found', noindex: true });

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
